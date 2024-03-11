import ansiColors from "ansi-colors"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSnapshot } from "valtio"
import { convStore } from "../store/conv.valtio"

export const useConvClean = (reqId: string | undefined) => {
  // const [conv, setConv] = useAtom(convAtom)
  // const [convs] = useAtom(convsAtom)
  // const convId = conv?.id
  const { conv, convId, convs } = useSnapshot(convStore)

  const router = useRouter()

  // 首页
  useEffect(() => {
    if (reqId) return
    console.log(ansiColors.red("clear conv since no id"))
    convStore.conv = null
    // setConv(null)
  }, [reqId])

  // 3. 当会话列表变动后（比如清除或者清空），如果命中了当前会话，则清除，可以涵盖单删或者多删
  useEffect(() => {
    if (convId && !convs.find((c) => c.id === convId)) {
      console.log(ansiColors.red("clear conv since not existed now"))
      convStore.conv = null
      // setConv(null)
      if (reqId) {
        router.push("/tt") // 如果不在列表页，还要退回去
      }
    }
  }, [convs])
}
