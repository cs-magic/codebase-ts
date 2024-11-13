import type { InputValidatorType } from "src/schema/utils"

import { dumpInputValidator } from "src/utils/dump-input-validator"

export const formatInvalidInput = (input: string, validator: InputValidatorType) => {
  return `操作失败，原因：${input} ∉ {${dumpInputValidator(validator)}`
}
