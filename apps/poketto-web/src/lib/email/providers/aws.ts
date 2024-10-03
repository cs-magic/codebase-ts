import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { rootDir } from "@cs-magic/common/path";
import { promises as fs } from "fs";
import Mustache from "mustache";
import path from "path";

import { AWS_REGION, siteConfig } from "@/config";
import { authEnv } from "@/env.mjs";
import d from "@cs-magic/common/datetime";

export const sendViaAWS = async ({
  identifier,
  url,
  provider,
  token,
  locale,
  origin,
}) => {
  if (!AWS_REGION) throw new Error("no AWS_REGION");
  if (!authEnv.AWS_AK) throw new Error("no AWS_AK");
  if (!authEnv.AWS_SK) throw new Error("no AWS_SK");

  const sesClient = new SESClient({
    region: AWS_REGION,
    credentials: {
      accessKeyId: authEnv.AWS_AK,
      secretAccessKey: authEnv.AWS_SK,
    },
  });

  const t = await fs.readFile(
    path.resolve(rootDir, `assets/docs/welcome/welcome_email_${locale}.html`),
    {
      encoding: "utf-8",
    },
  );

  return sesClient.send(
    new SendEmailCommand({
      Destination: {
        /* required */
        CcAddresses: [
          // 'EMAIL_ADDRESS',
          /* more items */
        ],
        ToAddresses: [
          identifier,
          /* more items */
        ],
      },
      Message: {
        /* required */
        Body: {
          /* required */
          Html: {
            Charset: "UTF-8",
            Data: Mustache.render(t, {
              CompanyName: siteConfig.companyName,
              companyUrl: siteConfig.companyUrl,
              ProductName: siteConfig.name,
              username: identifier,
              action_url: url,
              login_url: `${origin}/login`,
              support_mail: siteConfig.links.customerSupportEmail,

              trial_length: " 7 Days",
              trial_start_date: d(new Date()).toDate().toLocaleDateString(),
              trial_end_date: d(new Date())
                .add(7, "days")
                .toDate()
                .toLocaleDateString(),
            }),
          },
          Text: {
            Charset: "UTF-8",
            Data: "TEXT_FORMAT_BODY",
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data:
            (locale === "en" ? `Welcome to` : `欢迎来到`) +
            ` ${siteConfig.name} !`,
        },
      },
      Source: siteConfig.welcomeEmailAddress /* required */,
      ReplyToAddresses: [
        siteConfig.supportEmailAddress,
        /* more items */
      ],
    }),
    {
      requestTimeout: 300,
    },
  );
};
