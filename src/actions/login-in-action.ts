"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logInAction(email: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
      deletedAt: null,
      // email_deletedAt: {
      //   email,
      //   deletedAt: null as any,
      // },
    },
  });
  if (!user) return { error: "user not found" };
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) return { error: "wrong password" };
  // else {
  //   error: "Invalid password";
  // }

  const authData = {
    name: user.name,
    id: user.id,
  };
  const cookie = await cookies();
  cookie.set("auth", JSON.stringify(authData));

  redirect("/app/home");
}
