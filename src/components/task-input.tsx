"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Input } from "./ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { Calendar } from "@/components/ui/calendar";
import {
  CalendarCheckIcon,
  CalendarIcon,
  ChevronDown,
  Square,
  SquareActivityIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React, { useEffect, useRef, useState } from "react";

import { useDonaStore } from "@/store/dona";
import { CategoryIcon } from "./category-icon";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Field } from "./ui/field";
import { formatDate } from "date-fns";
import { cn } from "@/lib/utils";
import enterTask from "@/actions/enter-task";
import CalendarEdit from "./calender-edit";
import GlobalCategoryDropDownMenu from "./global-category-dropdown-menue";
import { useCategoryTodoParams } from "@/hooks/use-category-todo-params";
import { title } from "process";
import { taskSchema, TaskSchema } from "@/lib/schema";
import { createTaskAction } from "@/actions/create-task";

// const taskSchema = z.object({
//   title: z.string({ error: "type something here" }).min(1),
//   id: z.string().optional().nullable(),
//   categoryId: z.string().optional().nullable(),
//   dueDate: z.date().optional().nullable(),
// });

export default function TaskInput({ categories }: { categories: any[] }) {
  const { categorySlug } = useCategoryTodoParams();

  const categoryId = useDonaStore((state) => state.categories).find(
    (category, i) => category.slug == categorySlug,
  )?.id;

  // from server
  const currentCategory = categories.find(
    (category) => category.slug == categorySlug,
  );
  const homeCategory = categories.find((cat) => cat.slug === "home");

  const storeForm = useDonaStore((state) => state.form);

  // form schema
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      dueDate: null,
      title: "",
      id: "",
      ...storeForm,
      categoryId:
        currentCategory?.id?.toString() || homeCategory?.id?.toString() || "",
    },
  });

  // const [date, setDate] = React.useState<Date>();
  const selectedDate = form.watch("dueDate");
  const formdata = form.watch();
  const { updateForm, updateTodo, resetForm } = useDonaStore((state) => state);
  useEffect(() => {
    console.log("data changes in form", formdata);
    // updateForm(fo)
  }, [formdata]);

  async function onSubmit(data: z.infer<typeof taskSchema>) {
    const categoryIdNumber = data.categoryId
      ? Number.parseInt(String(data.categoryId), 10)
      : undefined;
    const finalDate =
      data.dueDate || (categorySlug === "today" ? new Date() : null);
    console.log(data);
    // updateTodo({
    //   ...data,
    //   // id: Math.random().toString(36).substr(2, 9),
    //   isCompleted: false,
    //   dueDate: data.dueDate || (categorySlug === "today" ? new Date() : null),
    // });
    const { success } = await createTaskAction(
      data.title,
      categoryIdNumber,
      false,
      finalDate,
    );
    if (success) {
      resetForm();
      form.reset();
    }
  }
  return (
    // add on submit.
    <form className="-ml-10" onSubmit={form.handleSubmit(onSubmit)}>
      <InputGroup className="group dark:bg-gray-700 border-0 outline-0 right-0">
        <InputGroupAddon
          align={"inline-start"}
          className="hidden group-focus-within:flex w-10 -translate-x-10 group-focus-within:translate-x-0"
        >
          <InputGroupButton className="">
            <Square className="" />
          </InputGroupButton>
        </InputGroupAddon>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <InputGroupInput
                // {...form.register("title")}

                placeholder="Create new task"
                type="text"
                className="border-0 right-0 outline-0 transition-all transform"
                {...field}
                onChange={(e) => {
                  updateForm({ title: e.target.value });
                  field.onChange(e);
                }}
              />
              {/* {JSON.stringify(fieldState)} */}
            </Field>
          )}
        />

        <InputGroupAddon
          align={"inline-end"}
          className={cn(
            " group-focus-within:flex",
            selectedDate
              ? "opacity-100 visible"
              : "opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible",
          )}
        >
          {/* date */}

          <Controller
            name="dueDate"
            control={form.control}
            render={({ field, fieldState }) => (
              <CalendarEdit
                value={field.value}
                onChange={field.onChange}
                hasDot
              />
            )}
          />

          {/* dropdown */}
          <Controller
            name="categoryId"
            control={form.control}
            render={({ field, fieldState }) => (
              <GlobalCategoryDropDownMenu
                categories={categories}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}
