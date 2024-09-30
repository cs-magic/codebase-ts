export const getOrigin = () =>
  typeof window === "undefined" ? process.env.NEXT_PUBLIC_APP_URL! : window.location.origin
export const isDomestic = () => getOrigin().includes(".cn")
export const getServerId = () => Number(isDomestic())
