import { useAtom } from "jotai";

import { UnexpectedError } from "@cs-magic/common/schema/error";
import { smsStageAtom } from "@cs-magic/react/store/sms.atom";

import { AuthSmsStage1SendCode } from "./auth-sms-stage-1-send-code";
import { AuthSmsStage2InputCode } from "./auth-sms-stage-2-input-code";

export const AuthSmsSignIn = () => {
  const [stage] = useAtom(smsStageAtom);

  switch (stage) {
    case "toSendSms":
      return <AuthSmsStage1SendCode />;

    case "toAuth":
      return <AuthSmsStage2InputCode />;

    default:
      throw new UnexpectedError();
  }
};
