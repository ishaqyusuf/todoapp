"use server";

import { title } from "process";

export default async function enterTask(
  title: string,
  id: string,
  categoryId: string,
  dueDate: string,
) {
  if (title == "") return false;
}
