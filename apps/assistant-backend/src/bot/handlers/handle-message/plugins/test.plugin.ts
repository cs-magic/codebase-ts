import { FileBox } from "file-box";
import { last } from "lodash-es";
import { types } from "wechaty";
import yargsParser from "yargs-parser";

import logger from "@cs-magic/common/dist/log/index.js";
import { safeCallLLM } from "@cs-magic/llm/dist/utils/safe-call-llm.js";

import { BasePlugin } from "./base.plugin.js";

export class TestPlugin extends BasePlugin {
  async run(args: string) {
    const programme = yargsParser(args);

    const s = programme._[0]?.toString().trim();

    if (!s) return;

    if (s === "contact") {
      const contact = this.message.talker();
      if (!contact) return logger.warn("no contact");
      logger.info("sending contact");
      // todo: Wechaty Puppet Unsupported API Error at PuppetWechat4u.messageSendContact (file:///Users/mark/@cs-magic/coding/codebase-ts/packages/wechaty-puppet-wechat4u/esm/src/puppet-wechat4u:665:16)
      await this.message.say(contact);
      return;
    }

    if (s.includes("recall-last-one")) await this.testRecallLastOne();

    if (s.includes("reply-link")) await this.testReplyLink();

    if (s.includes("describe-last-image")) await this.testDescribeLastImage();

    if (/^\d+\.(png|jpg|gif|webp|jpeg)$/.test(s)) {
      await this.reply(FileBox.fromFile(`./.generated/${s}`));
    }
  }

  async testDescribeLastImage() {
    const messages = await this.getLatestMessages();
    const lastImageInDB = last(
      messages.filter((m) => m.type === Number(types.Message.Image)),
    );
    if (!lastImageInDB) return logger.debug("no lastImageInDB");

    const lastImageInContext = await this.bot.Message.find({
      id: lastImageInDB.id,
    });
    if (!lastImageInContext) return logger.debug("no lastImageInContext");

    const image = await lastImageInContext.toFileBox();
    const result = await safeCallLLM({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "描述一下这张图里的内容",
            },
            {
              type: "image_url",
              image_url: {
                url: await image.toDataURL(),
              },
            },
          ],
        },
      ],
    });
    const content = result.response?.choices[0]?.message.content;
    if (content) await this.reply(content);
  }

  async testReplyLink() {
    void this.reply(
      new this.bot.UrlLink({
        title:
          "自定义内容 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890",
        description:
          "自定义摘要 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890",
        url: "https://assistant.cs-magic.cn",
        thumbnailUrl:
          "https://avatars.githubusercontent.com/u/33591398?s=80&v=4",
      }),
    );
  }

  async testRecallLastOne() {
    const messages = await this.getLatestMessages();
    const wxid = this.bot.context?.wxid;
    logger.debug({ wxid });
    const lastBotMessageInDB = last(
      messages.filter((m) => m.talkerId === wxid),
    );
    if (!lastBotMessageInDB) return logger.debug("no lastBotMessageInDB");

    const lastBotMessageInContext = await this.bot.Message.find({
      id: lastBotMessageInDB.id,
    });
    if (!lastBotMessageInContext)
      return logger.debug("no lastBotMessageInContext");

    await lastBotMessageInContext.recall();
  }
}
