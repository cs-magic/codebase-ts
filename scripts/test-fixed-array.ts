import { FixedArray } from "@/schema/array"
import {sum} from "lodash"

export const testFixedArray = () => {
  const arr = new FixedArray(10)
  arr.push(3)
  arr.push(2)
  const total = sum(arr)
  const length = arr.length
  console.log({ total, length })
}

testFixedArray()
