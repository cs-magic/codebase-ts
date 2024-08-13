import dynamic from "next/dynamic"

const Card = dynamic(
  () => import("@cs-magic/common-frontend/dist/components/card.js"),
  { ssr: false },
)

export const metadata = {
  title: "卡片渲染 | 飞脑",
}

export default async function GenCardViaFrontendPage() {
  return <Card />
}
