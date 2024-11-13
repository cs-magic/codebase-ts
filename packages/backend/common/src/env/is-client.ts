import { isServer } from "src/env/is-server"

export const isClient = !isServer
