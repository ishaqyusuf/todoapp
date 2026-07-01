"use client";

import z, { email } from "zod";
import { InputGroup, InputGroupButton } from "./ui/input-group";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

const formSchema = z.object({
  email: z.email({ error: "wrong email" }),
  name: z.string({}).min(20, { error: "mininum of 20 characters" }),
});

export default function PersonalSettings() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {}
  return (
    <>
      <form action={""} onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="text-white text-xs ">Email</FieldLabel>
                <Input {...field} placeholder="" type="email" />
              </Field>
            )}
          />

          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="-mt-5">
                <FieldLabel className="text-white text-xs">Name</FieldLabel>
                <Input {...field} placeholder="" type="text" />
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <div className="mt-4">
        <h4 className=" text-white font-bold ">Close account</h4>
        <p>Delete your account and all the data.</p>
        <button className="text-white dark:bg-gray-500 p-2 mt-2 rounded-sm">
          Delete account
        </button>
      </div>
    </>
  );
}
