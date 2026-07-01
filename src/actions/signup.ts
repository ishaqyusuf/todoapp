"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

type DefaultTodo = {
  title: string;
  isCompleted: boolean;
  dueDate?: Date;
};

type DefaultCategory = {
  title: string;
  slug: string;
  iconName?: string;
  color?: string;
  todos: DefaultTodo[];
};

export async function signupAction(
  email: string,
  name: string,
  password: string,
) {
  if (email.endsWith("yahoo.com")) {
    return {
      success: false,
      message: "wrong email type does not support yahoo",
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const today = new Date();

    const defaultCategories: DefaultCategory[] = [
      {
        title: "Home",
        slug: "home",
        iconName: "home",
        todos: [{ title: "Welcome to your first task!", isCompleted: false }],
      },
      {
        title: "Completed",
        slug: "completed",
        iconName: "completed",
        todos: [{ title: "this task is completed", isCompleted: true }],
      },
      {
        title: "Today",
        slug: "today",
        iconName: "today",
        todos: [{ title: "Do this today", isCompleted: false, dueDate: today }],
      },
      {
        title: "Personal",
        slug: "personal",
        color: "purple",
        todos: [
          {
            title: "Double-click this for quick edit",
            isCompleted: false,
            dueDate: today,
          },
          {
            title: "Complete you first task",
            isCompleted: false,
            dueDate: today,
          },
        ],
      },
      {
        title: "Work",
        slug: "work",
        color: "blue",
        todos: [
          {
            title: "Drag & Drop task for quick actions",
            isCompleted: false,
            dueDate: today,
          },
          {
            title: "Complete you first task",
            isCompleted: false,
            dueDate: today,
          },
        ],
      },
      {
        title: "Errand",
        slug: "errand",
        iconName: "errand",
        todos: [
          {
            title: "Add a note to your task",
            isCompleted: false,
            dueDate: today,
          },
          {
            title: "Customize shortcuts & appearance in Settings",
            isCompleted: false,
            dueDate: today,
          },
        ],
      },
      {
        title: "Road Trip List",
        slug: "roadTripList",
        iconName: "roadTripList",
        todos: [
          {
            title: "Share Dona on Twitter",
            isCompleted: false,
            dueDate: today,
          },
          {
            title: "Fill out questionary",
            isCompleted: false,
            dueDate: today,
          },
        ],
      },
    ];

    const user = await prisma.$transaction(async (tx) => {
      const createdUser = await tx.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      for (const category of defaultCategories) {
        await tx.category.create({
          data: {
            title: category.title,
            slug: category.slug,
            iconName: category.iconName,
            color: category.color,
            userId: createdUser.id,
            todos: {
              create: category.todos.map((todo) => ({
                title: todo.title,
                isCompleted: todo.isCompleted,
                dueDate: todo.dueDate,
                userId: createdUser.id,
              })),
            },
          },
        });
      }

      return createdUser;
    });

    const cookie = await cookies();
    cookie.set(
      "auth",
      JSON.stringify({
        id: user.id,
        name: user.name,
      }),
    );

    redirect("/app/home");
  } catch (error) {
    console.error("Signup Database Error:", error);
    return { success: false, message: "user already exsists" };
  }
}
