"use client";

import { signupAction } from "@/actions/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Field, FieldError, FieldGroup } from "./ui/field";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z.email({ error: "This email as already been used before" }),
  name: z.string({ error: "this name as already been taken" }),
  password: z.string({
    error: "password required",
  }),
});
export function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const response = await signupAction(
      data.email,
      data.name,
      data.password,
    );

    if (!response?.success) {
      toast.error("Wrong email or password", {});
    }
  }
  return (
    <form action="" className="mt-8" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <Input
                {...field}
                placeholder="Name"
                type="text"
                className={cn(
                  "bg-foreground/5 focus:bg-foreground/0  text-foreground focus:ring-0 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400",
                  //   fieldState.isDirty && "border-blue-500",
                  fieldState.invalid ? "border-red-500" : "border-none",
                )}
              />
              {/* {JSON.stringify(fieldState)} */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <Input
                {...field}
                placeholder="Email"
                type="email"
                className={cn(
                  "bg-foreground/5 focus:bg-foreground/0  text-foreground focus:ring-0 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400",
                  //   fieldState.isDirty && "border-blue-500",
                  fieldState.invalid ? "border-red-500" : "border-none",
                )}
              />
              {/* {JSON.stringify(fieldState)} */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <Input
                {...field}
                placeholder="Password"
                // value={field.value}
                // onChange={field.onChange}
                type="password"
                className={cn(
                  "bg-foreground/5 focus:bg-foreground/0  text-foreground focus:ring-0 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400",
                  //   fieldState.isDirty && "border-blue-500",
                  fieldState.invalid ? "border-red-500" : "border-none",
                )}
              />
              {/* {JSON.stringify(fieldState)} */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      {/* <input className="bg-gray-100 outline-blue-500 rounded-md p-2 placeholder:text-gray-400 w-60 block" type="email" placeholder="Email" /> */}
      {/* <input className="bg-gray-100 focus:bg-white outline-blue-500 rounded-md p-2 placeholder:text-gray-400 w-60 block mt-2" type="password" placeholder="Password" /> */}
      {/* <button className="bg-gray-950 hover:bg-gray-800 rounded-md p-2 text-white w-60 block mt-4">Sign in</button> */}
      <Button
        // type="button"
        // onClick={login}
        className="w-full mt-4 dark:bg-blue-500 dark:text-foreground"
      >
        Sign up
      </Button>
    </form>
  );
}
