import { IPusherServerConfig } from "@/lib/puser/schema"

export const pusherConfigAws: IPusherServerConfig = {
  host: "54.222.157.162",
  port: 6001,
  useTLS: false,
  cluster: "0.0.0.0",
}

export const pusherConfigTencent: IPusherServerConfig = {
  host: "socket.cs-magic.cn",
  port: 443, // tls 下这个参数是直接无视的
  useTLS: true,
  cluster: "0.0.0.0",
}

export const pusherConfig = pusherConfigTencent
