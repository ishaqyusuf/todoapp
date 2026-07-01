"use server";

import { prisma } from "@/lib/prisma";
import getAuth from "./auth";
import { title } from "process";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(
  title: string,
  iconName: string,
  color: string,
  slug: string,
) {
  const auth = await getAuth();
  const category = await prisma.category.create({
    data: {
      title: title,
      iconName: iconName,
      color: color,
      slug: slug,
      userId: auth.id,
    },
  });
  revalidatePath("/app/[...categorySlugAndTodold]");
  return { success: true, category };
}
