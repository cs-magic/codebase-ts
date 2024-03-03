import { proxy } from "valtio"
import { IListConversation } from "@/schema/core/conversation"
import { last } from "lodash"
import { IMessageInChat } from "@/schema/core/message"
import { IAppInChat } from "@/schema/core/app"

class ConversationStore {
  /**
   * 数据库里所有的 app，一次获取，然后持久化
   */
  public allApps: IAppInChat[] = []
  /**
   * 当前选中的 apps，如果服务器有，就从服务器刷新
   */
  public apps: IAppInChat[] = []
  /**
   * 当前被选中的 app
   */
  public curPApp: IAppInChat | null = null

  /**
   * 从服务器加载的会话列表
   */
  public conversations: IListConversation[] = []
  /**
   * 会话列表是否在拉取
   */
  public conversationsValid = false
  /**
   * 当前选中的会话
   */
  public conversation: IListConversation | null = null

  /**
   * 当前会话的所有消息
   */
  public messages: IMessageInChat[] = []
  /**
   * 当前会话的主要消息
   */
  public context: IMessageInChat[] = []

  /**
   * 用户当前发送的消息，需要被作为父结点引用
   */
  public get lastUserMessage(): IMessageInChat | null {
    const replied = this.messages.filter((m) => m.role === "user")
    return last(replied) ?? null
  }

  /**
   * 被选中的回答
   */
  public get lastRepliedMessage(): IMessageInChat | null {
    const replied = this.messages.filter((m) => m.pAppId === this.curPApp?.id)
    return last(replied) ?? null
  }
}

export const conversationStore = proxy(new ConversationStore())
