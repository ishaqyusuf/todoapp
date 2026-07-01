"use server";

import { prisma } from "@/lib/prisma";
import getAuth from "./auth";
import { revalidatePath } from "next/cache";

export async function deleteTaskAction(id: number) {
  const auth = await getAuth();
  const task = await prisma.todo.delete({
    where: {
      id: id,
      userId: auth.id,
    },
  });
  revalidatePath("/app/[...categorySlugAndTodold]");
  return { success: true, task };
}
