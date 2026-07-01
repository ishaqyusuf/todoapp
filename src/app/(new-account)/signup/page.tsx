import { LoginForm } from "@/components/login-form";
import { SignUpForm } from "@/components/signup-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Login() {
  return (
    <div className="bg-white dark:bg-black/20 grid justify-center mt-10 w-100 h-100 ml-auto mr-auto pt-10 pb-10 pl-8 pr-8 rounded-3xl">
      <div className="">
        <h3 className="text-3xl font-medium text-gray-800 dark:text-foreground">
          Sign up
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Create an account and start using Dona.
        </p>
      </div>

      <SignUpForm />

      <div className="mt-8 text-sm text-gray-800 dark:text-gray-500">
        <p className="text-blue-500 dark:text-blue-400 hover:text-blue-700">
          Forgot your password?
        </p>
        <p>
          Already have an account{" "}
          <Link
            href={"/login"}
            className="text-blue-500 dark:text-blue-400 hover:text-blue-700"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
