"use server";

import { prisma } from "@/lib/prisma";
import getAuth from "./auth";
import { revalidatePath } from "next/cache";

export async function deleteCategoryAction(id: number) {
  const auth = await getAuth();
  const category = await prisma.category.delete({
    where: {
      id: id,
      userId: auth.id,
    },
  });
  revalidatePath("/app/[...categorySlugAndTodold]");
  return { success: true, category };
}
