import { staticCreate } from "@/lib/utils"

import { IRequest } from "@/app/api/llm/schema"

export const manager = staticCreate<Record<string, IRequest>>(() => ({}))
