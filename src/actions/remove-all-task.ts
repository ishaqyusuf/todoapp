"use server";

import { prisma } from "@/lib/prisma";
import getAuth from "./auth";
import { revalidatePath } from "next/cache";

export async function removeAllTaskAction(categoryId: number, slug: string) {
  const auth = await getAuth();
  const whereClause: any = {
    userId: auth.id,
  };
  if (slug == "completed") {
    whereClause.isCompleted = true;
  } else if (slug == "today") {
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    whereClause.dueDate = { lte: endOfToday };
    whereClause.isCompleted = false;
  } else {
    whereClause.categoryId = categoryId;
  }
  const category = await prisma.todo.deleteMany({
    where: whereClause,
  });
  revalidatePath("/app/[...categorySlugAndTodold]");
  return { success: true, count: category.count };
}
