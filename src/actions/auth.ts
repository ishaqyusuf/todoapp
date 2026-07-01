"use server";
import { cookies } from "next/headers";
import { email } from "zod";

export default async function getAuth() {
  const cookie = await cookies();
  const authString = cookie.get("auth")?.value;
  // const o = {
  //   name: "ssss",
  // };
  // console.log({ o, os: JSON.stringify({ o }) });
  return JSON.parse(authString || "{}") as { id: number; name: string };
  // if (!authString?.value) {
  //   return { email: "", password: "" };
  // }
  // try {
  //   return JSON.parse(authString.value);
  // } catch (error) {
  //   return { email: "", password: "" };
  // }

  //   const email=cookie.get("email");

  //   return {email}
  //
  // return { email: cookie.get("email")?.value };
}
