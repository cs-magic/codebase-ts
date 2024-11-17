import { isServer } from "@/env/is-server"

export const isClient = !isServer
