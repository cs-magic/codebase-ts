import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CardCreateInputSchema } from '../inputTypeSchemas/CardCreateInputSchema'
import { CardUncheckedCreateInputSchema } from '../inputTypeSchemas/CardUncheckedCreateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CardSelectSchema: z.ZodType<Prisma.CardSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.boolean().optional(),
  platformType: z.boolean().optional(),
  platformId: z.boolean().optional(),
  platformData: z.boolean().optional(),
  sourceUrl: z.boolean().optional(),
  author: z.boolean().optional(),
  time: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  cover: z.boolean().optional(),
  images: z.boolean().optional(),
  iFrames: z.boolean().optional(),
  videos: z.boolean().optional(),
  html: z.boolean().optional(),
  contentMd: z.boolean().optional(),
  contentSummary: z.boolean().optional(),
  stat: z.boolean().optional(),
  ossUrl: z.boolean().optional(),
}).strict()

export const CardCreateArgsSchema: z.ZodType<Prisma.CardCreateArgs> = z.object({
  select: CardSelectSchema.optional(),
  data: z.union([ CardCreateInputSchema,CardUncheckedCreateInputSchema ]),
}).strict() ;

export default CardCreateArgsSchema;