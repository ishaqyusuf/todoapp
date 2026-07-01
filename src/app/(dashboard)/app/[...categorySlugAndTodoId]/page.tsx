// "use client";
import getAuth from "@/actions/auth";
import { getSidebarCategories, getTodos } from "@/actions/todo";
import GlobalCategoryDropDownMenu from "@/components/global-category-dropdown-menue";
import GlobalSheet from "@/components/sheets/global-sheets";
import TodoOverviewSheet from "@/components/sheets/todo-overview-sheet";
import TaskCounter from "@/components/task-counter";
import TaskInput from "@/components/task-input";
import TaskList from "@/components/task-list";
import { Input } from "@/components/ui/input";
import { useDonaStore } from "@/store/dona";
import { formatDate } from "date-fns";
// import { useParams } from "next/navigation";
import { use } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ categorySlugAndTodoId: string[] }>;
}) {
  const auth = await getAuth();

  // const { categorySlug } = use(params); this one is for use client
  const { categorySlugAndTodoId } = await params;
  // const [categorySlug, todoId] = categorySlugAndTodoId;
  const categorySlug = categorySlugAndTodoId?.[0] || "home";
  const todos = await getTodos(categorySlug);
  const categories = await getSidebarCategories();

  return (
    <>
      {/* the task */}
      <div className="">
        {/* The greetings and date */}
        <div className="mt-10 -ml-10">
          <h4 className="text-xl font-medium">
            Good morning <span>{auth.name}</span>,
          </h4>
          <p className="text-xl font-medium text-gray-500">
            It's <span>{formatDate(new Date(), "EEEE")}</span>{" "}
            <span>{formatDate(new Date(), "MMM d")}</span>-
            <span>
              <TaskCounter />
            </span>{" "}
            task
          </p>
        </div>

        {/* The input creating a new task */}
        {categorySlug === "completed" ? (
          ""
        ) : (
          <TaskInput categories={categories} />
        )}

        {/* The task list */}
        <TaskList categorySlug={categorySlug} todos={todos} />
        <GlobalSheet todos={todos} />
      </div>
    </>
  );
}
