#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
import { function as FP } from "fp-ts"
import { sinon, test } from "tstest"

import { gErrorMixin } from "src/wechaty-mixins/mod"

/**
 * Huan(202201): must import `./wechaty-impl.js` first
 *
 * Or will throw error:
 *
 * ReferenceError: Cannot access 'wechatifyUserModuleMixin' before initialization
 *   at file:///home2/huan/git/wechaty/wechaty/src/wechaty/wechaty-base.ts:58:3 *
 *
 * TODO: find out why
 */
import "src/wechaty/wechaty-impl"
import { WechatySkeleton } from "src/wechaty/wechaty-skeleton"

import { ioMixin } from "src/wechaty-mixins/io-mixin"
import { miscMixin } from "src/wechaty-mixins/misc-mixin"
import { PluginMixin, ProtectedPropertyPluginMixin, pluginMixin } from "src/wechaty-mixins/plugin-mixin"
import { puppetMixin } from "src/wechaty-mixins/puppet-mixin"
import { wechatifyUserModuleMixin } from "src/wechaty-mixins/wechatify-user-module-mixin"

test("ProtectedPropertyPluginMixin", async (t) => {
  type NotExistInMixin = Exclude<ProtectedPropertyPluginMixin, keyof InstanceType<PluginMixin>>
  type NotExistTest = NotExistInMixin extends never ? true : false

  const noOneLeft: NotExistTest = true
  t.ok(noOneLeft, "should match Mixin properties for every protected property")
})

test("PluginMixin smoke testing", async (t) => {
  const sandbox = sinon.createSandbox({
    useFakeTimers: true,
  })

  const mixinBase = FP.pipe(
    WechatySkeleton,
    gErrorMixin,
    ioMixin,
    wechatifyUserModuleMixin,
    puppetMixin,
    miscMixin,
    pluginMixin,
  )

  class PluginMixinTest extends mixinBase {
    counter = 0
  }

  const Plugin = (wechaty: any) => {
    wechaty.counter++
    return () => wechaty.counter--
  }

  const pluginMixinTest = new PluginMixinTest({ puppet: "wechaty-puppet-mock" })
  let future

  const unuse = pluginMixinTest.use(Plugin)

  t.equal(pluginMixinTest.counter, 1, "should call plugin function right after use before start")
  future = pluginMixinTest.start()
  t.equal(pluginMixinTest.counter, 1, "should call plugin function right after start")

  /**
   * finish initializing the system
   */
  await sandbox.clock.runAllAsync()
  await future
  // t.equal(pluginMixinTest.counter, 1, 'should call plugin function after start')

  future = pluginMixinTest.stop()
  await sandbox.clock.runAllAsync()
  await future
  t.equal(pluginMixinTest.counter, 1, "should not clean plugin context after stop")

  unuse()
  t.equal(pluginMixinTest.counter, 0, "should clean plugin context after call unuse()")

  sandbox.restore()
})
