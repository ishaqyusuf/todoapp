import { prisma } from "@/lib/prisma";

export async function updateTodo(ctx, input) {
  const task = await prisma.todo.update({
    where: {
      id: input.id,
    },
    data: {
      ...(input.title !== undefined && { title: input.title }),
      ...(input.note !== undefined && { note: input.note }),
      ...(input.isCompleted !== undefined && {
        isCompleted: input.isCompleted,
      }),
      ...(input.dueDate !== undefined && { dueDate: input.dueDate }),
      ...(input.categoryId !== undefined && {
        categoryId: input.categoryId,
      }),
    },
  });
  return {
    success: true,
    task,
  };
}
