import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskStatusSchema } from './TaskStatusSchema';
import { TaskCreatenotesInputSchema } from './TaskCreatenotesInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { WechatUserCreateNestedOneWithoutTasksInputSchema } from './WechatUserCreateNestedOneWithoutTasksInputSchema';
import { WechatRoomCreateNestedOneWithoutTaskInputSchema } from './WechatRoomCreateNestedOneWithoutTaskInputSchema';

export const TaskCreateInputSchema: z.ZodType<Prisma.TaskCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => TaskStatusSchema).optional(),
  notes: z.union([ z.lazy(() => TaskCreatenotesInputSchema),z.string().array() ]).optional(),
  priority: z.number().int().optional(),
  timer: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  owner: z.lazy(() => WechatUserCreateNestedOneWithoutTasksInputSchema).optional(),
  room: z.lazy(() => WechatRoomCreateNestedOneWithoutTaskInputSchema).optional()
}).strict();

export default TaskCreateInputSchema;
