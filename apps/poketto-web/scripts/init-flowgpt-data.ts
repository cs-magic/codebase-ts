import { Prisma } from "@prisma/client";
import { MongoClient } from "mongodb";

import { prisma } from "@cs-magic/common/db/prisma";

import type sampleBasicPrompt from "./data/flowgpt/prompt-basic_2.json";

export type IFlowgptPromptBasic = typeof sampleBasicPrompt;

const init = async () => {
  const mongoClient = new MongoClient("mongodb://localhost");

  let p;
  try {
    console.log("initializing flowgpt apps");
    let k = 0;
    for await (p of mongoClient
      .db("flowgpt")
      .collection("basic")
      .find() as unknown as IFlowgptPromptBasic[]) {
      const appPrompts: Prisma.PokettoAppPromptsCreateManyAppInput[] = [];
      if (p.systemMessage)
        appPrompts.push({
          role: "system",
          content: p.systemMessage,
        });
      if (p.initPrompt)
        appPrompts.push({
          role: "user",
          content: p.initPrompt,
        });
      if (p.welcomeMessage)
        appPrompts.push({
          role: "assistant",
          content: p.welcomeMessage,
        });
      // console.log({ p })

      // 不能直接用 new PrismaClient 应该

      await prisma.pokettoApp.upsert({
        where: { platform: { platformId: p.id, platformType: "FlowGPT" } },
        update: {},
        create: {
          platformId: p.id,
          platformType: "FlowGPT",
          avatar: p.thumbnailURL,
          desc: p.description,
          language: p.language ?? "en",
          name: p.title,
          isOpenSource: p.visibility,
          state: {
            create: {
              views: p.views,
              calls: p.uses,
              forks: 0,
              tips: p.tip,
              stars: p.saves,
              shares: p.shares,
            },
          },
          modelName: p.model,
          prompts: {
            create: appPrompts,
          },
          temperature: p.temperature,
          category: {
            connectOrCreate: {
              where: { category: { main: p.categoryId, sub: p.subCategoryId } },
              create: { main: p.categoryId, sub: p.subCategoryId },
            },
          },

          creator: {
            connectOrCreate: {
              where: {
                platform: { platformId: p.User.id, platformType: "FlowGPT" },
              },
              create: {
                platformId: p.User.id,
                platformType: "FlowGPT",
                platformArgs: {
                  uri: p.User.uri,
                },
                image: p.User.image,
              },
            },
          },
          tags: {
            connectOrCreate: p.Tag.map((t) => ({
              where: { name: t.name },
              create: { name: t.name },
            })),
          },
        },
      });
      if (++k % 100 === 0) {
        console.log(`dumping ${k}`);
      }
    }

    console.log("successfully initialized");
  } catch (e) {
    console.error({ e, p });
  } finally {
    await mongoClient.close();
  }
};

void init();
