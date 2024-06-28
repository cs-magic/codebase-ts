import {
  ResponseFinalStatus,
  ResponseStatus,
} from "@cs-magic/common/schema/sse"
import Pusher from "pusher"
import { redis } from "@cs-magic/common/deps/db/providers/redis"
import { pusherServerConfigs } from "@cs-magic/common/deps/pusher/config"
import { PusherServerId } from "@cs-magic/common/deps/pusher/schema"
import { initPusherServer } from "@cs-magic/common/deps/pusher/server/init"
import { ITransEvent } from "@cs-magic/common/deps/sse/schema"

import { ILLMManagerPusher } from "./schema"

/**
 *
 * note:
 * - 因为server-action的机制， 所有state需要用redis等中心化管理
 */
export class PusherLLMManager implements ILLMManagerPusher {
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

  async onEvent(event: ITransEvent) {
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

  private async push(event: ITransEvent) {
    // event.data = { time: Date.now(), ...event.data }
    console.log(`[PUSHER] >> ${this.channel}: `, event)
    await this.pusher.trigger(this.channel, event.event, event.data)
  }
}