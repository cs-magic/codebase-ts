import { Prisma } from "@prisma/client";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import OpenAI, { APIError as OpenAIAPIError } from "openai";
import {
  ChatCompletionMessage,
  ChatCompletionMessageParam,
} from "openai/resources/chat/index";
// import { ChatCompletionMessage, ChatCompletionMessageParam } from "openai/resources/chat"
import superjson from "superjson";

import { CHAT_MESSAGE_CID_LEN, ERR_MSG_BALANCE_NOT_ENOUGH } from "@/config";
import { MemoryMode, defaultModelQuota } from "@/ds";
import { baseEnv } from "@/env.mjs";
import { nanoid } from "@/lib/id";
import { type RootRouter } from "@/server/routers/_root.router";

import ChatMessageUncheckedCreateInput = Prisma.ChatMessageUncheckedCreateInput;

export const runtime = "edge"; // IMPORTANT! nodejs 好像不支持 stream ！

/**
 * ref:
 *  ChatOpenAI + StreamingTextResponse: https://sdk.vercel.ai/docs/api-reference/langchain-stream
 *
 * @param req
 * @constructor
 */
export async function POST(req: Request) {
  console.log("calling chat in [EDGE ENVIRONMENT]");
  const data = await req.json();
  const {
    messages: receivedMessages,
    conversationId,
    userId,
    modelType,
  } = data;
  const memoryMode = data.memoryMode as MemoryMode;

  const proxy = createTRPCProxyClient<RootRouter>({
    links: [
      // loggerLink(),
      httpBatchLink({ url: `${req.headers.get("origin")}/api/trpc` }),
    ],
    transformer: superjson,
  });

  /**
   * validate balance
   */
  const {
    user,
    app: { prompts: context },
  } = await proxy.conv.getForChat.query({ id: conversationId });

  if (user.balance <= 0 && (user.quota || defaultModelQuota)[modelType] <= 0)
    return new Response(ERR_MSG_BALANCE_NOT_ENOUGH, {
      status: 406,
    });

  /**
   * 1. 先存储用户的消息，谨防丢失
   */

  // console.log("req: ", { data })
  const pushMessage = async (msg: ChatCompletionMessage & { id?: string }) => {
    const { role, content } = msg;
    const newMessage: ChatMessageUncheckedCreateInput = {
      role,
      content,
      conversationId,
      modelType,
      isUsingFree: user.balance <= 0,
    };
    console.log("pushing message: ", newMessage);
    // do not await, to speed up (backend process)
    void proxy.message.push.mutate(newMessage);
  };

  await pushMessage(receivedMessages[receivedMessages.length - 1]);

  /**
   * 2. 检查频率等相关
   * note:
   *  1. 因为我们已经有了用户系统，所以不需要检查频率了
   *  2. 这个基于 KV 的对于大陆来说，太慢了，真要做，可以使用本地的 redis，参考：rate-limit-redis - npm, https://www.npmjs.com/package/rate-limit-redis
   */

  const { content } = receivedMessages[receivedMessages.length - 1];
  if (memoryMode === "one-time") {
    context.push({ content, role: "user" });
  } else if (memoryMode === "recent") {
    // 最近5条记录
    context.push(...receivedMessages.slice(-5));
  } else {
    // 读取 memory: p ∪ q 条记忆;  p=5: 过往最相关记忆; q=4: 最新记忆
    context.push(
      ...(await proxy.message.getContext.query({
        conversationId,
        content,
        modelType,
      })),
    );
  }
  const messages = context.map((m) => {
    return { role: m.role, content: m.content } as ChatCompletionMessageParam;
  });
  console.log("context: ", { messages });

  const replyId = nanoid(CHAT_MESSAGE_CID_LEN);
  const headers = new Headers();
  headers.set("replyId", replyId);

  try {
    const response = await new OpenAI({
      apiKey: baseEnv.OPENAI_API_KEY,
      timeout: 3000,
      /**
       *
       * ref:
       *  - https://github.com/openai/openai-node/tree/v4#configuring-an-https-agent-eg-for-proxies
       *  - https://github.com/openai/openai-node/issues/85
       *  - https://www.npmjs.com/package/https-proxy-agent
       *
       * edge 环境中 不支持 http / https-proxy-agent 等库
       *
       * 大陆服务器需要开启 clash tun mode !
       */
      httpAgent: undefined,
    }).chat.completions.create({
      model: modelType,
      stream: true,
      messages,
      temperature: 0.7,
    });

    const stream = OpenAIStream(response, {
      onStart: async () => {
        // console.log("onStart")
      },
      onToken: async (token) => {
        // console.log("onToken: ", { token })
      },
      onCompletion: async (completion) => {
        console.log("onCompletion: ", { completion });
        await pushMessage({
          content: completion,
          role: "assistant",
          id: replyId,
          refusal: null,
        });
      },
      onFinal: (final) => {
        // 之前直接监听这个回调，结果拿不到数据，监听 onCompletion就好了，很奇怪……现在两个都拿的到。。
        // console.log("onFinal: ", { final })
      },
    });

    return new StreamingTextResponse(stream, { headers });
  } catch (e) {
    console.log({ e });
    if (e instanceof OpenAIAPIError)
      return NextResponse.json(
        `OpenAI响应错误，请稍后再试！错误原因：${e.message}`,
        {
          status: 400,
        },
      );

    return NextResponse.json("服务器未知错误，请稍后再试！", {
      status: 400,
    });
  }
}
