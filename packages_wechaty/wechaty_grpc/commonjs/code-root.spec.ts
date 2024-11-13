#!/usr/bin/env -S ts-node --project tsconfig.cjs.json

import { test } from 'tstest'

import { codeRoot } from 'packages_wechaty/wechaty_grpc/commonjs/code-root.cjs'

test('CJS: codeRoot()', async t => {
  t.ok(codeRoot, 'should exist codeRoot')
})
