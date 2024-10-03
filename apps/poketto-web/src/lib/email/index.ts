import { emailProvider } from "@/config";
import { sendViaAWS } from "@/lib/email/providers/aws";
import { sendViaPostmark } from "@/lib/email/providers/postmark";
import { SendVerificationRequestParams } from "next-auth/providers/email";

export interface ISendVerificationRequest
  extends SendVerificationRequestParams {
  locale: string;
  origin: string;
}

export const sendVerificationRequest = async (
  params: ISendVerificationRequest,
): Promise<void> => {
  console.log("sendVerificationRequest: ", params);

  const send = emailProvider === "aws" ? sendViaAWS : sendViaPostmark;
  try {
    const result = await send(params);
    console.log({ result });
  } catch (error) {
    console.error(error);
    throw new Error("failed to send verification request");
  }
};
