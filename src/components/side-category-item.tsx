"use client";
import React, { useState } from "react";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Input } from "./ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "./ui/input-group";
import {
  MoreVertical,
  EditIcon,
  DeleteIcon,
  Edit2Icon,
  Trash,
  icons,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DonaState, useDonaStore } from "@/store/dona";
import { Badge } from "./ui/badge";
import { isEqual, isToday } from "date-fns";
import { CategoryIcon } from "./category-icon";
import { useParams, useRouter } from "next/navigation";
import z, { number } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategoryTodoParams } from "@/hooks/use-category-todo-params";
import { GetSidebarCategories } from "@/actions/todo";
import Link from "next/link";
import { deleteCategoryAction } from "@/actions/delete-category";
import { removeAllTaskAction } from "@/actions/remove-all-task";

type Category = GetSidebarCategories[number];
interface Props {
  category: Category;
}
export function SideCategoryItem({ category }: Props) {
  const { slug, color, iconName: icon, id, title, todosCount } = category;
  const { categorySlug, todoId } = useCategoryTodoParams();
  const todos = useDonaStore((state) => state.todos);

  // const deleteCategory = useDonaStore((state) => state.deleteCategory);
  const updateCategory = useDonaStore((state) => state.updateCategory);
  // const removeAllTodo = useDonaStore((state) => state.removeAllTodo);
  const theCategory = useDonaStore((state) => state.categories).find(
    (category) => category.id === category.id,
  );

  async function deleteCategory(id: number) {
    const { success } = await deleteCategoryAction(id);
    if (success) {
    }
  }
  async function removeAllTodo(categoryId: number, categorySlug: string) {
    const { success } = await removeAllTaskAction(categoryId, categorySlug);
    if (success) {
    }
  }

  // const todosCount = todos.filter((todo) => {
  //   if (id == "1") {
  //     // this handles home category
  //     // return todo.id !== "2";
  //     return !todo.isCompleted;
  //   }
  //   if (id == "2") {
  //     // this handles completed category
  //     return todo.isCompleted;
  //   }
  //   if (id == "3") {
  //     //  this handles toda's category
  //     // return isEqual(todo.dueDate, new Date()); cna't work cause differecne in time
  //     return isToday(new Date(todo.dueDate!));
  //   }
  //   return todo.categoryId === id;
  // }).length;
  todos.length;
  todos[0];
  const todoIds = todos.map((todo, i) => ({ id: todo.id }));
  const todoIds2 = todos.map((todo) => todo.id);
  todos.at(56);
  todos.every((todo) => true);
  // const results = [
  //   { id: 1, mark: 50 },
  //   { id: 2, mark: 100 },
  //   { id: 3, mark: 55 },
  //   { id: 4, mark: 50 },
  //   { id: 5, mark: 30 },
  //   { id: 6, mark: 50 },
  //   { id: 7, mark: 30 },
  //   { id: 8, mark: 50 },
  //   { id: 9, mark: 50 },
  // ];
  // const allPassed = results.every((result) => {
  //   const passed = result.mark > 49;
  //   console.log(`student with id ${result.id} ${passed ? "passed" : "failed"}`);
  //   return passed;
  // });
  // const somePassed = results.some((result) => result.mark > 49);
  // results.push(); // puts items to the end of the list
  // results.unshift(); // insert eleent to the start
  // results.pop();
  // console.log({ allPassed, somePassed });
  const route = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <SidebarMenuItem
        onClick={() => {
          if (open) return;
          route.push(`/app/${slug}`);
          // console.log("hello");
        }}
      >
        <SidebarMenuButton asChild>
          {/* default category */}
          <Link href={`/app/${slug}`} className="w-full">
            <InputGroup className=" group/item border-none shadow-none dark:bg-gray-700 cursor-pointer dark:hover:bg-gray-600">
              {/* THE ICON */}
              <InputGroupAddon
                className="cursor-pointer text-white"
                align={"inline-start"}
              >
                <CategoryIcon icon={icon} color={color} />
              </InputGroupAddon>

              {/* the input */}
              <InputGroupInput
                readOnly
                type="text"
                defaultValue={title}
                className="cursor-pointer "
                // onChange={(e)=>{
                //   updateCategory({
                //     id: theCategory?.id,
                //     title: e.target.value
                //   })

                // }}
              />

              {/* the more drop down */}
              <InputGroupAddon align={"inline-end"}>
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger asChild className="">
                    <InputGroupButton
                      variant="ghost"
                      aria-label="More"
                      size="icon-xs"
                      className="text-xs cursor-pointer hover:outline-none focus:ring-none dark:hover:bg-white/30"
                    >
                      <MoreVertical className="cursor-pointer more invisible group-hover/item:visible text-white" />
                    </InputGroupButton>
                  </DropdownMenuTrigger>

                  {/* drop down menue content */}
                  <DropdownMenuContent
                    className="z-10"
                    align="end"
                    sideOffset={18}
                    alignOffset={-14}
                  >
                    <DropdownMenuGroup className="bg-gray-600 text-foreground p-2 rounded-sm w-40">
                      <DropdownMenuItem
                        className="flex p-1 hover:outline-none hover:bg-gray-500 rounded-sm cursor-pointer"
                        onClick={(e) => {}}
                      >
                        <Edit2Icon className="w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      {slug == "home" || slug == "today" ? (
                        ""
                      ) : (
                        <DropdownMenuItem
                          className="flex p-1 hover:outline-none hover:bg-gray-500 rounded-sm cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            removeAllTodo(id, slug);
                            setOpen(false);
                          }}
                        >
                          <DeleteIcon className="w-4 mr-2" />
                          Remove all tasks
                        </DropdownMenuItem>
                      )}
                      {slug == "home" ||
                      slug == "completed" ||
                      slug == "today" ? (
                        ""
                      ) : (
                        <DropdownMenuItem
                          className="flex p-1 hover:outline-none hover:bg-gray-500 rounded-sm cursor-pointer"
                          onClick={(e) => {
                            // e.preventDefault();
                            setOpen(false);
                            if (slug == categorySlug) route.push(`/app/home`);
                            deleteCategory(id);
                          }}
                        >
                          <Trash className="w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* the text showing the amount of tasks */}
                <Badge
                  variant="secondary"
                  className="rounded-sm dark:bg-white/20 dark:text-white/40 cursor-pointer"
                >
                  {todosCount}
                </Badge>
              </InputGroupAddon>
            </InputGroup>
          </Link>

          {/* Create List */}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  );
}
