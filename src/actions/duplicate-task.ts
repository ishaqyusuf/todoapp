"use server";

import { prisma } from "@/lib/prisma";
import getAuth from "./auth";
import { revalidatePath } from "next/cache";

export async function duplicateTaskAction(id: number) {
  const auth = await getAuth();
  const originalTask = await prisma.todo.findUnique({
    where: {
      id: id,
      userId: auth.id,
    },
  });

  if (!originalTask) {
    return { success: false, message: "Task not found." };
  }

  const duplicateTask = await prisma.todo.create({
    data: {
      title: `${originalTask.title} (copy)`,
      categoryId: originalTask.categoryId,
      dueDate: originalTask.dueDate,
      isCompleted: false,
      userId: auth.id,
    },
  });
  revalidatePath("/app/[...categorySlugAndTodold]");
  return { success: true, task: duplicateTask };
}
