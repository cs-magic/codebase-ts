import { FlexContainer } from "@cs-magic/react/components/flex-container";
import { getWechatAuthorizationUrl } from "@cs-magic/common/auth/providers/wechat/utils";
import { QRCodeSVG } from "qrcode.react";

export const AuthQrcode = () => {
  const authorizationUrl = getWechatAuthorizationUrl();
  console.log(authorizationUrl);
  return (
    <FlexContainer>
      <QRCodeSVG size={256} value={authorizationUrl} />
    </FlexContainer>
  );
};
