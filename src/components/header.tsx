import Link from "next/link";

export default function Header() {
  return (
    <div>
      <div className="bg-blue-400 opacity-10 blur-xl rounded-full w-200 h-200 p-5 absolute -top-150 left-50"></div>
      <header className="flex justify-center gap-110 mt-10">
        <Link
          href={"/todos"}
          className="font-light text-sm hover:bg-gray-100 p-6 pt-2 pb-2 rounded-3xl"
        >
          About
        </Link>

        <div className="flex gap-2">
          <div className="border-3 border-blue-400 inline p-2 w-6 h-6 rounded-md"></div>
          <p className="text-xl font-semibold text-gray-900 relative -top-1 dark:text-foreground ">
            dona
          </p>
        </div>

        <Link
          href={"/login"}
          className="font-light text-sm bg-gray-100 hover:bg-gray-200 p-6 pt-2 pb-2 rounded-3xl dark:text-background"
        >
          Login
        </Link>
      </header>
    </div>
  );
}
