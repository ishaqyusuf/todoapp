import Link from "next/link";

export default function Page(){
    return <div className="ml-20 mt-20">
        <h1 className="text-7xl font-bold text-gray-800 dark:text-foreground"><span className="text-gray-300 opacity-45 dark:text-foreground/80">A more humane</span><br/>to-do list</h1>
        <p className=" text-xl font-medium text-gray-800 mt-6 dark:text-foreground">Dona is a back to basic to-do list focused on fast and<br/>delightful user experience.</p>
        <div className="flex mt-6 gap-4">
            <Link href={""} className="text-sm text-gray-800 bg-gray-100 hover:bg-gray-200 p-6 pt-3 pb-3 rounded-3xl font-medium">Watch video</Link>
            <Link href={""} className="text-sm text-white bg-blue-500 hover:bg-blue-600 p-6 pt-3 pb-3 rounded-3xl font-medium">Try for free</Link>
        </div>
    </div>
}