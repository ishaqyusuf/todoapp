"use client";

import z, { email } from "zod";
import { InputGroup, InputGroupButton } from "./ui/input-group";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
  oldPassword: z.string({}).min(8, { error: "mininum of 20 characters" }),
  newPassword: z.string({}).min(8, { error: "mininum of 20 characters" }),
});

export default function PasswordSettings() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {}
  return (
    <>
      <form action={""} onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="oldPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="text-white text-xs ">
                  Old password
                </FieldLabel>
                <Input {...field} placeholder="" type="password" />
              </Field>
            )}
          />

          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="-mt-5">
                <FieldLabel className="text-white text-xs">
                  New password
                </FieldLabel>
                <Input {...field} placeholder="" type="password" />
              </Field>
            )}
          />
        </FieldGroup>
        <Button className="mt-2 dark:bg-blue-500 text-gray-400">Save</Button>
      </form>
    </>
  );
}
