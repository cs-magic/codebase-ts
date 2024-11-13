import { Brolog } from "brolog"
import { FileBox } from "file-box"
import { MemoryCard } from "memory-card"
import { StateSwitch } from "state-switch"

import * as envVars from "src/env-vars"
import { packageJson } from "src/package-json"

const log = new Brolog()
const logLevel = process.env["WECHATY_LOG"]
if (logLevel) {
  log.level(logLevel.toLowerCase() as any)
  log.silly("Puppet", "Config: WECHATY_LOG set level to %s", logLevel)
}

const VERSION = packageJson.version || "0.0.0"
const NAME = packageJson.name || "NONAME"

export { envVars, FileBox, log, MemoryCard, NAME, StateSwitch, VERSION }
