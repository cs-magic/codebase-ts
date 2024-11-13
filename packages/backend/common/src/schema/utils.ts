import { ZodBoolean, ZodEnum, ZodString, z } from "zod"

export type LiteralUnionSchema = z.ZodUnion<[z.ZodLiteral<string>, ...z.ZodLiteral<string>[]]>
export type CompressLineFunction = (line: string, ratio?: number) => string
export type CompressLinesFunction = (lines: string[]) => string[]
export type InputValidatorSchema = ZodBoolean | ZodString | ZodEnum<[string, ...string[]]>
export type InputValidatorType = string[] | InputValidatorSchema
