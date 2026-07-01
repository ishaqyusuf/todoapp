"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import getAuth from "./auth";
import { ReturnTypeAsync } from "@/lib/utils";
import { title } from "process";

export type GetTodos = ReturnTypeAsync<typeof getTodos>;
export async function getTodos(categorySlug: string) {
  const auth = await getAuth();

  const wherClause: any = {
    userId: auth.id,
  };
  if (categorySlug === "home") {
    wherClause.isCompleted = false;
  } else if (categorySlug === "completed") {
    wherClause.isCompleted = true;
  } else if (categorySlug === "today") {
    // start
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    // end
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    // where
    wherClause.dueDate = {
      gte: startOfToday,
      lte: endOfToday,
    };
    wherClause.isCompleted = false;
  } else {
    wherClause.category = { slug: categorySlug };
    wherClause.isCompleted = false;
  }

  const todos = await prisma.todo.findMany({
    where: wherClause,
    select: {
      id: true,
      title: true,
      //   category:true
      category: {
        select: {
          id: true,
          slug: true,
          title: true,
          iconName: true,
          color: true,
        },
      },
      isCompleted: true,
      dueDate: true,
    },
  });
  return todos;
}

export type GetSidebarCategories = ReturnTypeAsync<typeof getSidebarCategories>;
export async function getSidebarCategories() {
  const auth = await getAuth();
  const categories = await prisma.category.findMany({
    where: {
      userId: auth.id,
    },
    select: {
      id: true,
      title: true,
      color: true,
      iconName: true,
      slug: true,
      _count: {
        // todo:{}
        select: {
          //   todos: true,
          todos: {
            where: {
              isCompleted: false,
              deletedAt: null,
              // wont count deleted todos
            },
          },
        },
      },
    },
    orderBy: {
      //   createdAt: "asc",
      id: "asc",
    },
  });
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const [home, completed, today] = await Promise.all([
    prisma.todo.count({
      where: {
        userId: auth.id,
        isCompleted: false,
      },
    }),
    prisma.todo.count({
      where: {
        userId: auth.id,
        isCompleted: true,
      },
    }),
    prisma.todo.count({
      where: {
        userId: auth.id,
        dueDate: {
          gte: startOfToday,
        },
        isCompleted: false,
      },
    }),
  ]);
  return categories.map(({ _count, slug, ...c }) => ({
    ...c,
    slug,
    todosCount:
      slug == "home"
        ? home
        : slug == "completed"
          ? completed
          : slug == "today"
            ? today
            : _count.todos,
  }));
}

export async function getSelectableCategories() {
  const categories = await getSidebarCategories();

  return categories.filter((c) =>
    // [1,].every((a) => a !== c.id),
    ["home", "completed", "today"].every((a) => a !== c.iconName),
  );
}
