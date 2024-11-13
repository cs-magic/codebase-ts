#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
import { test } from "tstest"

import type { Puppet } from "src/puppet/mod"
import type { PuppetProtectedProperty } from "src/puppet/puppet-interface"

test("ProtectedProperties", async (t) => {
  type NotExistInPuppet = Exclude<PuppetProtectedProperty, keyof Puppet>
  type NotExistTest = NotExistInPuppet extends never ? true : false

  const noOneLeft: NotExistTest = true
  t.ok(noOneLeft, "should match Puppet properties for every protected property")
})
