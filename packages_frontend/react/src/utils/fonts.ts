import localFont from "next/font/local"

// const interFont = Inter({ subsets: ["latin"] })
export const fontChinese = localFont({
  src: [
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Thin.otf', weight: '100', style: 'normal' },
    {
      path: "../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Light.otf', weight: '300', style: 'normal' },
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Regular.otf', weight: '400', style: 'normal' },
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Book.otf', weight: '500', style: 'normal' },
    {
      path: "../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Medium.otf",
      weight: "600",
      style: "normal",
    },
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Bold.otf', weight: '700', style: 'normal' },
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-ExtraBold.otf', weight: '800', style: 'normal' },
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Heavy.otf', weight: '900', style: 'normal' },
  ],
  fallback: ["system-ui", "arial"],
})

export const FontWeightGlowSansSC = [
  "Thin",
  "ExtraLight",
  "Light",
  "Regular",
  "Book",
  "Medium",
  "Bold",
  "ExtraBold",
  "Heavy",
] as const

export const FontWeightTailwind = [
  "thin",
  "extralight",
  "light",
  "normal",
  "medium",
  "semibold",
  "bold",
  "extrabold",
  "black",
] as const
