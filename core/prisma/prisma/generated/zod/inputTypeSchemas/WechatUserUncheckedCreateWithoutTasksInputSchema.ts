import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatUserCreatephoneInputSchema } from './WechatUserCreatephoneInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { WechatMessageUncheckedCreateNestedManyWithoutTalkerInputSchema } from './WechatMessageUncheckedCreateNestedManyWithoutTalkerInputSchema';
import { WechatMessageUncheckedCreateNestedManyWithoutListenerInputSchema } from './WechatMessageUncheckedCreateNestedManyWithoutListenerInputSchema';

export const WechatUserUncheckedCreateWithoutTasksInputSchema: z.ZodType<Prisma.WechatUserUncheckedCreateWithoutTasksInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  avatar: z.string(),
  friend: z.boolean().optional().nullable(),
  gender: z.number().int().optional().nullable(),
  type: z.number().int().optional().nullable(),
  weixin: z.string().optional().nullable(),
  alias: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  province: z.string().optional().nullable(),
  signature: z.string().optional().nullable(),
  phone: z.union([ z.lazy(() => WechatUserCreatephoneInputSchema),z.string().array() ]).optional(),
  preference: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  sentMessages: z.lazy(() => WechatMessageUncheckedCreateNestedManyWithoutTalkerInputSchema).optional(),
  receivedMessages: z.lazy(() => WechatMessageUncheckedCreateNestedManyWithoutListenerInputSchema).optional()
}).strict();

export default WechatUserUncheckedCreateWithoutTasksInputSchema;