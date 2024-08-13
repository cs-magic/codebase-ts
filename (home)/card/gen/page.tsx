import dynamic from "next/dynamic"

// ref: https://nextjs.org/docs/messages/react-hydration-error#solution-2-disabling-ssr-on-specific-components
const CardNoSSR = dynamic(
  () => import("@cs-magic/common-frontend/dist/components/card.js"),
  {
    ssr: false,
  },
)

export const metadata = {
  title: "卡片渲染 | 飞脑",
}

export default async function GenCardViaFrontendPage() {
  return <CardNoSSR />
  // return "hello"
}
