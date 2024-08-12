import { NewCard } from "@cs-magic/common-frontend/components/new-card"
import { genPageTitle } from "@cs-magic/common-frontend/utils/get-page-title"

export const metadata = {
  title: genPageTitle("新建卡片"),
}

export default async function NewCardPage() {
  return <NewCard />
}
