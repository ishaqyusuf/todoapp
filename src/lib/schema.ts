import z from "zod";

export const taskSchema = z.object({
  title: z.string({ error: "type something here" }).min(1),
  id: z.string().optional().nullable(),
  categoryId: z.union([z.string(), z.number()]).optional().nullable(),
  dueDate: z.date().optional().nullable(),
});

export type TaskSchema = typeof taskSchema.shape;
