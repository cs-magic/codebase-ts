"use server"

import "colors"

let n = 0
export const testColor = () => {
  ++n
  console.log("hello".red)
  console.log("hello".bgBlue)
  console.log(`wow #${n}`.bgYellow)
}
