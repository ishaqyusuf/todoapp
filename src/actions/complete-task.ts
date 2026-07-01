"use server";

import { prisma } from "@/lib/prisma";
import getAuth from "./auth";
import { revalidatePath } from "next/cache";

export async function completeTaskAction(id: number, completeStatus: boolean) {
  const auth = await getAuth();

  const task = await prisma.todo.update({
    where: {
      id: id,
      userId: auth.id,
    },
    data: {
      userId: auth.id,
      isCompleted: !completeStatus,
    },
  });
  revalidatePath("/app/[...categorySlugAndTodold]");
  return { success: true, task };
}
