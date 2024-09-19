export const DEVICE_TYPES = [
  "the-iphone",
  "iphone-x",
  "iphone-14-pro",
  "ipad-pro",
  "surface-pro-2017",
  "macbook-pro",
  "imac",
  "imac-pro",
] as const
export type DEVICE_TYPE = (typeof DEVICE_TYPES)[number]

export interface IDevice {
  w: number
  h: number
  r?: number
}

export const DEVICES: { [key in DEVICE_TYPE]: IDevice } = {
  "the-iphone": { w: 320, h: 610 },
  "iphone-x": { w: 428, h: 868 },
  "iphone-14-pro": { w: 428, h: 868, r: 68 },

  "ipad-pro": { w: 560, h: 778 },
  "surface-pro-2017": { w: 561, h: 394, r: 10 },

  "macbook-pro": { w: 740, h: 434 },
  imac: { w: 640, h: 540 },
  "imac-pro": { w: 624, h: 484, r: 18 },
}
