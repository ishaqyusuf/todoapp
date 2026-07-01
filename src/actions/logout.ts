"use server";
import { cookies } from "next/headers";

export default async function logoutAction() {
  const cookie = await cookies();
  cookie.delete("auth");
  // previously we used email now we're deletin auth
  // cause it now hold both email and password stored in it
  // cookie.delete("email");
}
