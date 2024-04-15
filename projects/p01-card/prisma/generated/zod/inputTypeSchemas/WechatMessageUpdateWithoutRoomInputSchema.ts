import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { WechatMessageUpdatementionIdListInputSchema } from './WechatMessageUpdatementionIdListInputSchema';
import { WechatUserUpdateOneRequiredWithoutSentMessagesNestedInputSchema } from './WechatUserUpdateOneRequiredWithoutSentMessagesNestedInputSchema';
import { WechatUserUpdateOneWithoutReceivedMessagesNestedInputSchema } from './WechatUserUpdateOneWithoutReceivedMessagesNestedInputSchema';

export const WechatMessageUpdateWithoutRoomInputSchema: z.ZodType<Prisma.WechatMessageUpdateWithoutRoomInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timestamp: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mentionIdList: z.union([ z.lazy(() => WechatMessageUpdatementionIdListInputSchema),z.string().array() ]).optional(),
  filename: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  talker: z.lazy(() => WechatUserUpdateOneRequiredWithoutSentMessagesNestedInputSchema).optional(),
  listener: z.lazy(() => WechatUserUpdateOneWithoutReceivedMessagesNestedInputSchema).optional()
}).strict();

export default WechatMessageUpdateWithoutRoomInputSchema;