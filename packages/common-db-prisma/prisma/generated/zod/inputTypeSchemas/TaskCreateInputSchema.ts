import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskStatusSchema } from './TaskStatusSchema';
import { WechatUserCreateNestedOneWithoutTasksInputSchema } from './WechatUserCreateNestedOneWithoutTasksInputSchema';

export const TaskCreateInputSchema: z.ZodType<Prisma.TaskCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => TaskStatusSchema).optional(),
  owner: z.lazy(() => WechatUserCreateNestedOneWithoutTasksInputSchema).optional()
}).strict();

export default TaskCreateInputSchema;