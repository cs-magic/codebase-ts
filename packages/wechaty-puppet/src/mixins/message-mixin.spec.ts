#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
import { test } from "tstest"

import type { MessageMixin, ProtectedPropertyMessageMixin } from "./message-mixin.js"

test("ProtectedPropertyMessageMixin", async (t) => {
  type NotExistInMixin = Exclude<ProtectedPropertyMessageMixin, keyof InstanceType<MessageMixin>>
  type NotExistTest = NotExistInMixin extends never ? true : false

  const noOneLeft: NotExistTest = true
  t.ok(noOneLeft, "should match Mixin properties for every protected property")
})
