"use server";

import { cookies } from "next/headers";

export async function loginAction(email: string, password: string) {
  if (email.endsWith("yahoo.com")) return false;
  if (!/\d/.test(password)) return false;
  // quesstions to ask /\d/ and the one for symbols

  const cookie = await cookies();
  const authData = {
    email: email,
    password: password,
  };
  cookie.set("auth", JSON.stringify(authData));
  // guess we're storing the object to string version of
  //  the auth data to the "auth", intead of using the one below so auth
  // holds the value to be used

  // cookie.set("email", email);
  // cookie.set("password", password);
  return true;
}
