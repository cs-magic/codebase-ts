"use client"

import { toBlob } from "html-to-image"
import { useAtom } from "jotai"
import { useRef, useState } from "react"
import { toast } from "sonner"
import { getBilibiliDetail } from "../../../../../packages/common-bilibili/actions-client"
import {
  getBilibiliIFrameUrl,
  getBvidFromUrl,
} from "../../../../../packages/common-bilibili/utils"
import { Button } from "../../../../../packages/common-ui-shadcn/components/button"
import { Input } from "../../../../../packages/common-ui-shadcn/components/input"
import { Label } from "../../../../../packages/common-ui-shadcn/components/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../packages/common-ui-shadcn/components/select"
import { Switch } from "../../../../../packages/common-ui-shadcn/components/switch"
import { ButtonWithLoading } from "../../../../../packages/common-ui/components/button-with-loading"
import { FlexContainer } from "../../../../../packages/common-ui/components/flex-container"
import { parseXiaoHongShuPage } from "../../../../../packages/common-xiaohongshu/actions"
import { Card, CardType, ICard } from "../../../../components/card"
import { useUserSummary } from "../../../../hooks/use-user-summary"
import {
  bilibiliIFrameUrlAtom,
  bilibiliVideoControlEnabledAtom,
  cardContentAtom,
  cardCoverUrlAtom,
  cardTypeAtom,
  SourceType,
  sourceTypeAtom,
  urlToParseAtom,
} from "./store"

export default function GenCardPage() {
  const user = useUserSummary()
  const [cardType] = useAtom(cardTypeAtom)
  const [bilibiliVideoControlEnabled] = useAtom(bilibiliVideoControlEnabledAtom)
  const [bilibiliIFrameUrl] = useAtom(bilibiliIFrameUrlAtom)
  const [cover] = useAtom(cardCoverUrlAtom)
  const [content] = useAtom(cardContentAtom)
  const [urlToParse] = useAtom(urlToParseAtom)
  const refCard = useRef<HTMLDivElement>(null)
  const [sourceType] = useAtom(sourceTypeAtom)

  const card: ICard = {
    user: user ?? undefined,
    updatedAt: new Date(),
    content,
    resourceUrl:
      cardType === "text-video"
        ? bilibiliIFrameUrl
        : cardType === "text-image"
          ? cover
          : "",
    type: cardType,
    sourceUrl: urlToParse,
    coverRatio: sourceType === "xiaohongshu" ? 3 / 4 : 16 / 9,
  }

  // const [copied, copy] = useCopyToClipboard()
  // useEffect(() => {
  //   if (copied.value) toast.success(`copied ok: ${copied.value}`)
  //   else if (copied.error) toast.error(`copied error: ${copied.error.message}`)
  // }, [copied])

  const copyCard = async () => {
    if (!refCard.current) return console.error("no refCard current")

    // 保存原始尺寸以便恢复
    const originalHeight = refCard.current.clientHeight
    // 计算应有的高度来容纳所有内容，可能需要根据实际情况调整这里的计算方法
    const scrollHeight = refCard.current.scrollHeight
    console.log({ originalHeight, scrollHeight })

    // 临时调整高度以包含所有内容
    refCard.current.style.height = `${scrollHeight}px`

    const blob = await toBlob(refCard.current, {
      pixelRatio: 4 /* 这个因子非常重要，否则低端浏览器图片会很糊 */,
    })

    // 恢复原始高度
    // refCard.current.style.height = `${originalHeight}px`

    if (!blob) return

    await navigator.clipboard.write([
      new ClipboardItem({
        "image/png": blob,
      }),
    ])
    toast.success("copied image to clipboard")
  }

  return (
    <FlexContainer
      orientation={"vertical"}
      className={"justify-start overflow-auto"}
    >
      <InputLine />

      <Controls copyCard={copyCard} />

      {!card ? (
        "You should login first."
      ) : (
        <Card
          ref={refCard}
          style={{
            width: bilibiliVideoControlEnabled ? 420 : 419,
          }}
          card={card}
        />
      )}
    </FlexContainer>
  )
}

const InputLine = () => {
  const [urlToParse, setUrlToParse] = useAtom(urlToParseAtom)
  const [sourceType, setSourceType] = useAtom(sourceTypeAtom)
  const [, setBilibiliIFrameUrl] = useAtom(bilibiliIFrameUrlAtom)
  const [, setCover] = useAtom(cardCoverUrlAtom)
  const [, setContent] = useAtom(cardContentAtom)

  return (
    <div className={"w-full flex items-center gap-4"}>
      <Input
        className={"grow"}
        value={urlToParse}
        onChange={(event) => {
          setUrlToParse(event.currentTarget.value)
        }}
      />

      <Select
        value={sourceType}
        onValueChange={(v) => setSourceType(v as SourceType)}
      >
        <SelectTrigger className={"w-32"}>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value={"bilibili" as SourceType}>哔哩哔哩</SelectItem>
            <SelectItem value={"xiaohongshu" as SourceType}>小红书</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        onClick={async () => {
          console.log("-- generating ...")

          switch (sourceType) {
            case "bilibili":
              const bvid = getBvidFromUrl(urlToParse)
              if (!bvid) return toast.error("invalid bilibili url")
              const bilibiliDetail = await getBilibiliDetail(bvid)
              setCover(bilibiliDetail.View.pic)
              setBilibiliIFrameUrl(getBilibiliIFrameUrl({ url: urlToParse }))
              setContent(bilibiliDetail.View.desc)
              break

            case "xiaohongshu":
              const data = await parseXiaoHongShuPage(urlToParse)
              setContent(`# ${data.title}\n\n${data.description}\n\n`)
              if (data.images.length) setCover(data.images[0]!)
              console.log({ content: data })
              break

            default:
              console.error("unexpected")
          }
        }}
      >
        Generate
      </Button>
    </div>
  )
}

const Controls = ({ copyCard }: { copyCard: () => Promise<void> }) => {
  const [cardType, setCardType] = useAtom(cardTypeAtom)
  const [bilibiliVideoControlEnabled, setBilibiliVideoControlEnabled] = useAtom(
    bilibiliVideoControlEnabledAtom,
  )
  const [coping, setCoping] = useState(false)
  const [sourceType] = useAtom(sourceTypeAtom)

  return (
    <div className={"flex items-center gap-2"}>
      <Label className={"shrink-0"}>Display Type</Label>
      <Select
        value={cardType}
        onValueChange={(v) => setCardType(v as CardType)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value={"text-image" as CardType}>
              Text with Image
            </SelectItem>
            <SelectItem
              value={"text-video" as CardType}
              disabled={sourceType !== "bilibili"}
            >
              Text with Video
            </SelectItem>
            <SelectItem value={"text" as CardType} disabled>
              Plain Text (todo)
            </SelectItem>
            <SelectItem value={"text-gif" as CardType} disabled>
              Text with GIF (todo)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {cardType === "text-video" && (
        <>
          <Label className={"shrink-0"}>Show Video Controls</Label>
          <Switch
            checked={bilibiliVideoControlEnabled}
            onCheckedChange={setBilibiliVideoControlEnabled}
          />
        </>
      )}

      <ButtonWithLoading
        loading={coping}
        onClick={async () => {
          setCoping(true)
          await copyCard()
          setCoping(false)
        }}
      >
        Copy Card
      </ButtonWithLoading>
    </div>
  )
}
