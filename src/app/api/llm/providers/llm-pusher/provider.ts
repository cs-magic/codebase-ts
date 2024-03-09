import Pusher from "pusher"
import { redis } from "../../../../../../packages/common-db"
import {
  pusherServerConfigs,
  PusherServerId,
} from "../../../../../../packages/common-puser/config"
import { initPusherServer } from "../../../../../../packages/common-puser/server/init"
import { ISseEvent } from "../../../../../../packages/common-sse/schema"
import {
  getTriggerIdFromSseRequest,
  ILLMRequest,
  ResponseFinalStatus,
  ResponseStatus,
} from "../../../../../schema/sse"

import { ILlmManagerPusher } from "./schema"

/**
 *
 * note:
 * - 因为server-action的机制， 所有state需要用redis等中心化管理
 */
export class PusherLlmManager implements ILlmManagerPusher {
  private pusher: Pusher
  private channel: string

  constructor(channelId: string, pusherServerId: PusherServerId) {
    this.channel = channelId
    this.pusher = initPusherServer(pusherServerConfigs[pusherServerId])
  }

  //////////////////////////////
  // state
  //////////////////////////////
  public get status() {
    return redis.get(this.channel)
  }

  public setStatus(status: ResponseStatus) {
    return redis.set(this.channel, status)
  }

  //////////////////////////////
  // server
  //////////////////////////////
  async onTriggerStarts() {
    await this.setStatus("responding")
    await this.push({ event: "init", data: {} })
  }

  async onTriggerEnds(reason: ResponseFinalStatus) {
    await this.setStatus(reason)
    await this.push({ event: "close", data: { reason } })
  }

  async onEvent(event: ISseEvent) {
    await this.push(event)
  }

  //////////////////////////////
  // client
  //////////////////////////////

  async onClientConnected(clientId: string) {
    await this.push({ event: "onClientConnected", data: { id: clientId } })
  }

  async onClientDisconnected(clientId: string) {
    await this.push({
      event: "onClientDisconnected",
      data: { id: clientId },
    })
  }

  //////////////////////////////
  // general
  //////////////////////////////

  private async push(event: ISseEvent) {
    event.data = { time: Date.now(), ...event.data }
    console.log(`[PUSHER] >> ${this.channel}: `, event)
    await this.pusher.trigger(this.channel, event.event, event.data)
  }
}
