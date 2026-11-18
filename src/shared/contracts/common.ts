import { z } from 'zod';

export const idSchema = z.string().uuid();

export const errorResponseSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional(),
  }),
});

export const fieldErrorsSchema = z.record(z.array(z.string()));

export const dataResponse = <TSchema extends z.ZodTypeAny>(schema: TSchema) =>
  z.object({ data: schema });

export type ErrorResponse = z.infer<typeof errorResponseSchema>;
