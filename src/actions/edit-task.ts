"use server";

import { prisma } from "@/lib/prisma";
import getAuth from "./auth";
import { title } from "process";
import { revalidatePath } from "next/cache";

export async function editTaskAction(
  id: number,
  title?: string,
  note?: string,
  isCompleted?: boolean,
  dueDate?: Date | null,
  categoryId?: number,
) {
  const auth = await getAuth();

  const updateData: any = {};
  if (title !== undefined) updateData.title = title;
  if (note !== undefined) updateData.note = note;
  if (isCompleted !== undefined) updateData.isCompleted = isCompleted;
  if (dueDate !== undefined) updateData.dueDate = dueDate;
  if (categoryId !== undefined) updateData.categoryId = categoryId;

  const task = await prisma.todo.update({
    where: {
      id: id,
      userId: auth.id,
    },
    data: updateData,

    // {
    //   ...(title !== undefined && { title }),
    //   ...(note !== undefined && { note }),
    //   ...(categoryId !== undefined && { categoryId }),

    //   isCompleted: isCompleted,
    //   dueDate: dueDate,
    //   categoryId: categoryId,
    // },
  });
  revalidatePath("/app/[...categorySlugAndTodold]");
  return { success: true, task };
}
