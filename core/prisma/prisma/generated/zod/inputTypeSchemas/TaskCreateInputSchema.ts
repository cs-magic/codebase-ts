import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskStatusSchema } from './TaskStatusSchema';
import { TaskCreatenotesInputSchema } from './TaskCreatenotesInputSchema';
import { WechatUserCreateNestedOneWithoutTasksInputSchema } from './WechatUserCreateNestedOneWithoutTasksInputSchema';

export const TaskCreateInputSchema: z.ZodType<Prisma.TaskCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => TaskStatusSchema).optional(),
  notes: z.union([ z.lazy(() => TaskCreatenotesInputSchema),z.string().array() ]).optional(),
  priority: z.number().int().optional(),
  owner: z.lazy(() => WechatUserCreateNestedOneWithoutTasksInputSchema).optional()
}).strict();

export default TaskCreateInputSchema;