import { prisma } from "@cs-magic/common/db/prisma";
import { Client } from "postmark";

import { siteConfig } from "@/config";
import { authEnv } from "@/env.mjs";

export const sendViaPostmark = async ({
  identifier,
  url,
  provider,
  token,
  locale,
  origin,
}) => {
  const api_token = authEnv.POSTMARK_API_TOKEN;
  if (!api_token) throw new Error("no POSTMARK_API_TOKEN in env");
  const postmarkClient = new Client(api_token);

  const user = await prisma.user.findUnique({
    where: {
      email: identifier,
    },
    select: {
      emailVerified: true,
    },
  });

  const templateId = user?.emailVerified
    ? authEnv.POSTMARK_SIGN_IN_TEMPLATE
    : authEnv.POSTMARK_ACTIVATION_TEMPLATE;
  if (!templateId) {
    throw new Error("Missing template id");
  }

  return postmarkClient.sendEmailWithTemplate({
    TemplateId: parseInt(templateId),
    To: identifier,
    From: provider.from as string,
    TemplateModel: {
      action_url: url,
      product_name: siteConfig.name,
    },
    Headers: [
      {
        // Set this to prevent Gmail from threading emails.
        // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
        Name: "X-Entity-Ref-ID",
        Value: `${new Date().getTime()}`,
      },
    ],
  });
};
