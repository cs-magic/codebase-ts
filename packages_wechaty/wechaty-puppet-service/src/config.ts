/// <reference path="./typings.d.ts" />

import { log } from 'packages_wechaty/wechaty-puppet/src/mods/mod'

import { packageJson } from 'src/package-json'

import * as rootEnvVars from 'src/env-vars'
import * as authEnvVars from 'src/auth/env-vars'

const VERSION = packageJson.version || '0.0.0'

const envVars = {
  ...rootEnvVars,
  ...authEnvVars,
}

/**
 * gRPC default options
 */
const GRPC_OPTIONS = {
  // https://github.com/wechaty/wechaty-puppet-service/issues/86
  // 'grpc.max_receive_message_length': 1024 * 1024 * 150,
  // 'grpc.max_send_message_length': 1024 * 1024 * 150,
}

export {
  envVars,
  log,
  GRPC_OPTIONS,
  VERSION,
}
