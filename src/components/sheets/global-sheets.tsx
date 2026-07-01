"use client";
import { useEffect, useState } from "react";
import TodoOverviewSheet from "./todo-overview-sheet";
import { getSidebarCategories } from "@/actions/todo";

export default function GlobalSheet({ todos }: { todos: any[] }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCats() {
      const data = await getSidebarCategories();
      setCategories(data);
    }
    fetchCats();
  }, []);
  return (
    <>
      <TodoOverviewSheet todos={todos} categories={categories} />
    </>
  );
}
