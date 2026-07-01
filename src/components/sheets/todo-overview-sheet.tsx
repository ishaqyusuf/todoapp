import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "../ui/input-group";
import { CheckSquare, Square } from "lucide-react";
import { useDonaStore } from "@/store/dona";
import { cn } from "@/lib/utils";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CalendarEdit from "../calender-edit";
import { Field, FieldLabel } from "../ui/field";
import GlobalCategoryDropDownMenu from "../global-category-dropdown-menue";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { deleteTaskAction } from "@/actions/delete-task";
import { completeTaskAction } from "@/actions/complete-task";
import { editTaskAction } from "@/actions/edit-task";
import { useEffect, useState } from "react";

export default function TodoOverviewSheet({ todos }: { todos: any[] }) {
  // from dona
  const params = useParams();

  const [categorySlug, todoId] = params?.categorySlugAndTodoId ?? [];
  const task = todos?.find((t) => t.id === Number(todoId));
  // const slugArray = params?.categorySlugAndTodoId as string[];

  // const todoId = Array.isArray(slugArray) ? slugArray[1] : null;
  // const task = useDonaStore((state) => state.todos).find(
  //   (todo) => todo.id === Number(todoId),
  // );

  // clse the sde sheet
  const router = useRouter();
  const closeSheet = () => {
    router.push(`/app/${categorySlug}`);
  };
  // const categories = useDonaStore((state) => state.categories);
  // const todo = useDonaStore((state) => state.todos);
  // const updateTodo = useDonaStore((state) => state.updateTodo);
  // const deleteTodo = useDonaStore((state) => state.deleteTodo);
  // const duplicateTodo = useDonaStore((state) => state.duplicateTodo);
  // const completeTodo = useDonaStore((state) => state.completeTodo);

  if (!task) return null;

  return (
    <>
      <Sheet open={!!todoId} onOpenChange={(open) => !open && closeSheet()}>
        {/* <Sheet> */}
        <SheetContent className="dark:bg-gray-700 border-0 outline-0 right-0">
          <SheetHeader></SheetHeader>
          <Field>
            <InputGroup className="group/item mt-1 dark:bg-gray-700 border-0 outline-0 right-0">
              {/* check button */}
              <InputGroupAddon align={"inline-start"}>
                <InputGroupButton
                  onClick={async () =>
                    await completeTaskAction(task.id, task?.isCompleted)
                  }
                >
                  {task.isCompleted ? <CheckSquare /> : <Square />}
                </InputGroupButton>
              </InputGroupAddon>

              {/* the input */}
              {/* <Controller/> */}
              <InputGroupInput
                defaultValue={task.title}
                // readOnly
                className={cn(
                  task.isCompleted
                    ? "line-through dark:shadow-none"
                    : "no-underline dark:shadow-none",
                )}
                onBlur={(e) => editTaskAction(Number(todoId), e.target.value)}
              />
            </InputGroup>
          </Field>
          <Field className="flex">
            {/* todos */}

            <FieldLabel>List </FieldLabel>

            <GlobalCategoryDropDownMenu
              value={task?.categoryId?.toString()}
              onChange={async (newId) =>
                await editTaskAction(
                  task.id,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  Number(newId),
                )
              }
            />

            {/* date */}
            <Field className="flex">
              {" "}
              <FieldLabel>Due Date </FieldLabel>{" "}
              <CalendarEdit
                showDate
                value={task.dueDate}
                onChange={(newDate) =>
                  editTaskAction(
                    Number(todoId),
                    undefined,
                    undefined,
                    undefined,
                    newDate,
                  )
                }
              />
            </Field>

            {/* note section */}

            <InputGroupTextarea
              placeholder="Write a note..."
              defaultValue={task.note}
              key={task.id + (task.note ?? "")}
              onBlur={async (e) => {
                const newNote = e.target.value;
                if (newNote !== task.note) {
                  await editTaskAction(task.id, undefined, newNote);
                }
              }}
            />
          </Field>

          <SheetFooter>
            <Button
              type="submit"
              onClick={async () => {
                await deleteTaskAction(Number(todoId));
                closeSheet();
              }}
            >
              Delete
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
