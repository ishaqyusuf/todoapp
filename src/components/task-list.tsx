"use client";

import { DonaState, useDonaStore } from "@/store/dona";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import {
  CheckSquare,
  Copy,
  Edit2Icon,
  MoreVertical,
  Square,
  Trash,
} from "lucide-react";
import { Controller } from "react-hook-form";
import { Field } from "./ui/field";
// import { todo } from "node:test";
import Link from "next/link";
import { CategoryIcon } from "./category-icon";
import { formatDate, isToday } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { GetTodos } from "@/actions/todo";
import { deleteTaskAction } from "@/actions/delete-task";
import { duplicateTaskAction } from "@/actions/duplicate-task";
import { completeTaskAction } from "@/actions/complete-task";
type Todo = DonaState["todos"][number];
interface Props {
  categorySlug: string;
  // todos: {
  //   title: string;
  //   id: number;
  //   category: {
  //     id: number;
  //     title: string;
  //     slug: string;
  //   };
  //   isCompleted: boolean;
  //   dueDate: Date;
  // }[];
  todos: GetTodos;
}

export default function TaskList({ categorySlug, todos }: Props) {
  const tasks = useDonaStore((state) => state.todos);
  const categories = useDonaStore((state) => state.categories);
  // const deleteTodo = useDonaStore((state) => state.deleteTodo);

  // const duplicateTodo = useDonaStore((state) => state.duplicateTodo);
  // const completeTodo = useDonaStore((state) => state.completeTodo);
  const currentCategory = categories.find(
    (category) => category.slug == categorySlug,
  )!;
  async function deleteTodo(id: number) {
    const { success } = await deleteTaskAction(id);
    if (success) {
    }
  }

  async function duplicateTodo(id: number) {
    const { success } = await duplicateTaskAction(id);
    if (success) {
    }
  }
  async function completeTodo(id: number, isCompleted: boolean) {
    const { success } = await completeTaskAction(id, isCompleted);
    if (success) {
    }
  }
  // const filterTodos = tasks.filter((todo) => {
  //   if (todo.isCompleted && currentCategory.slug !== "completed") return false;
  //   if (currentCategory.slug == "completed") return todo.isCompleted;
  //   if (currentCategory.id == "1") return !todo.isCompleted;
  //   if (currentCategory?.slug == "today")
  //     return todo.dueDate && isToday(new Date(todo.dueDate));
  //   if (currentCategory == null) return (todo.id = null);

  //   return todo.categoryId === currentCategory?.id;
  // });

  return (
    <form className="mt-5 -ml-10">
      {todos.map((todo, index) => {
        const taskCategory = todo.category;
        return (
          <InputGroup
            key={todo.id}
            className="group/item mt-1 dark:bg-gray-700 border-0 outline-0 right-0"
          >
            {/* the linkiing */}
            <Link
              href={`/app/${categorySlug}/${todo.id}`}
              className="flex-1 flex items-center min-w-0"
            >
              {/* the check mark input */}
              <InputGroupAddon align={"inline-start"}>
                <InputGroupButton
                  onClick={() => {
                    todo.id && completeTodo(todo.id, todo.isCompleted);

                    console.log("mil");
                  }}
                >
                  {todo.isCompleted ? <CheckSquare /> : <Square />}
                </InputGroupButton>
              </InputGroupAddon>

              {/* the list input */}
              <InputGroupInput
                value={todo.title}
                readOnly
                className={cn(
                  todo.isCompleted ? "line-through" : "no-underline",
                )}
              />
            </Link>

            {/* the date and category input */}
            <InputGroupAddon
              align={"inline-end"}
              className="more visible group-hover/item:invisible"
            >
              {/* date is here */}
              {todo.dueDate ? formatDate(todo.dueDate, "d. MMM") : ""}

              {/* category is here */}
              {taskCategory && (
                <CategoryIcon
                  icon={taskCategory.iconName}
                  color={taskCategory.color}
                />
              )}
            </InputGroupAddon>

            {/* drop down is here */}
            <InputGroupAddon
              align={"inline-end"}
              className="more transition-opacity opacity-0 group-hover/item:opacity-100"
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <InputGroupButton
                    variant="ghost"
                    aria-label="More"
                    size="icon-xs"
                    className="z-10 text-xs cursor-pointer hover:outline-none focus:ring-none dark:hover:bg-white/30"
                  >
                    <MoreVertical className="cursor-pointer more invisible group-hover/item:visible text-white" />
                  </InputGroupButton>
                </DropdownMenuTrigger>

                {/* the dropdown content */}
                <DropdownMenuPortal>
                  <DropdownMenuContent
                    className="z-50"
                    align="end"
                    sideOffset={18}
                    alignOffset={-14}
                  >
                    <DropdownMenuGroup className="bg-gray-600 text-foreground p-2 rounded-sm w-40 ">
                      <DropdownMenuItem className="flex p-1 hover:outline-none hover:bg-gray-500 rounded-sm cursor-pointer">
                        <Link
                          href={`/app/${categorySlug}/${todo.id}`}
                          // href={`${todo.id}`}
                          className="flex w-full items-center p-1 hover:outline-none hover:bg-gray-500 rounded-sm cursor-pointer"
                        >
                          {" "}
                          <Edit2Icon className="w-4 mr-2" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          if (todo.id) duplicateTodo(todo.id);
                        }}
                        className="flex p-1 hover:outline-none hover:bg-gray-500 rounded-sm cursor-pointer"
                      >
                        <Copy className="w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          if (todo.id) deleteTodo(todo.id);
                        }}
                        className="flex p-1 hover:outline-none hover:bg-gray-500 rounded-sm cursor-pointer"
                      >
                        <Trash className="w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenu>
            </InputGroupAddon>
          </InputGroup>
        );
      })}
    </form>
  );
}
