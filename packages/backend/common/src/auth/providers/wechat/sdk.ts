import type { IWechatProfile, IWechatRefreshedToken } from "@/auth/providers/wechat/schema"
import {
  getWechatAuthToken,
  getWechatUserProfile,
  refreshWechatAuthToken,
} from "@/auth/providers/wechat/utils"

/**
 * 用于稳定地获取用户信息
 */
export class WechatAuth {
  private code: string
  private token?: IWechatRefreshedToken

  constructor(code: string) {
    this.code = code
  }

  public async getUserInfo(): Promise<IWechatProfile> {
    if (!this.token)
      // init token
      this.token = await getWechatAuthToken(this.code)

    try {
      return getWechatUserProfile(this.token.access_token, this.token.openid)
    } catch (e) {
      // refresh token
      this.token = await refreshWechatAuthToken(this.token.refresh_token)
      return this.getUserInfo() // again since the token refreshed
    }
  }
}
