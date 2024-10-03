import { isDomestic } from "@/packages/common/src/router";

/**
 * 在没有配置 tun mode 下，需要使用这个函数，并且只能用 nodejs 环境了，否则可以用edge
 * nodejs 环境下貌似响应更慢、回复更短，以及不支持stream！
 */
export const createHttpAgent = async () => {
  return undefined; // todo: test clash tun mode
  if (!isDomestic()) return undefined;
  const { HttpsProxyAgent } = await import("https-proxy-agent");
  return new HttpsProxyAgent("http://localhost:7890");
};
