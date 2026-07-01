"use server";
import { prisma } from "@/lib/prisma";
import getAuth from "./auth";
import { revalidatePath } from "next/cache";

export async function createTaskAction(
  title: string,
  categoryId: number | undefined,
  isCompleted: boolean,
  dueDate: Date | null,
) {
  const auth = await getAuth();
  const resolvedCategoryId =
    categoryId ??
    (
      await prisma.category.findFirst({
        where: {
          userId: auth.id,
          slug: "home",
          deletedAt: null,
        },
        select: {
          id: true,
        },
      })
    )?.id;

  if (!resolvedCategoryId) {
    return { success: false, message: "No category available for this task." };
  }

  const task = await prisma.todo.create({
    data: {
      title: title,
      categoryId: resolvedCategoryId,
      dueDate: dueDate || null,

      isCompleted: isCompleted,
      userId: auth.id,
    },
  });
  revalidatePath("/app/[...categorySlugAndTodold]");
  return { success: true, task };
}
