#!/usr/bin/env -S node --no-warnings --loader ts-node/esm

import { test }  from 'tstest'

import type { Puppet } from 'packages_wechaty/wechaty-puppet/src/mods/mod'

import {
  PuppetServer,
  PuppetServerOptions,
}                          from 'src/server/puppet-server'

test('version()', async t => {
  const options: PuppetServerOptions = {
    endpoint : '127.0.0.1:8788',
    puppet   : {} as Puppet,
    token    : 'secret',
  }

  const puppet = new PuppetServer(options)
  t.ok(puppet.version(), 'should have version() method')
})
