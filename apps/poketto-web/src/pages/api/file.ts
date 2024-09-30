import fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"
import path from "path"

import type { IMAGE_SIZE } from "@/ds"

// ref: https://github.com/vercel/next.js/discussions/40270#discussioncomment-3571223
export const config = {
  api: {
    externalResolver: true,
  },
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Extract the filename from the URL
  const filename = req.query.filename as string
  const filesize: IMAGE_SIZE = (req.query.filesize as IMAGE_SIZE) ?? "sm"

  // console.log("file api: ", req.query)

  if (!filename) {
    res.status(404)
    return
  }

  // Set the path for images - adjust this as needed
  const imagesDir = path.join(process.cwd(), "../scrapy-flowgpt/__data__/images")
  const imagePath = path.join(imagesDir, filesize, `${filename}.jpg`)

  // console.log({ imagePath })
  try {
    await fs.promises.access(imagePath)
    const readStream = fs.createReadStream(imagePath)
    readStream.pipe(res)
  } catch (err) {
    // 有些图片是找不到的
    // console.warn({ imagePath })
    // If error, file doesn't exist or there's an access issue
    res.status(404).end()
  }
}

export default handler
