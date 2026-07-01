import getAuth from "@/actions/auth";
import { getSidebarCategories } from "@/actions/todo";
import { AppSidebar } from "@/components/app-sidebar";
import HomeHeader from "@/components/homeheader";
import MainMenu from "@/components/mainmenu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { prisma } from "@/lib/prisma";
import { Sidebar } from "lucide-react";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  const categories = await getSidebarCategories();

  return (
    <div className="relative">
      {/* <HomeHeader/> */}
      <SidebarProvider>
        <AppSidebar categories={categories} />
        <main className="ml-80 z-10">
          <SidebarTrigger className="lg:hidden" />
          {children}
          <MainMenu />
        </main>
      </SidebarProvider>
      <div className="bg-blue-400 opacity-10 blur-2xl rounded-[240px] w-200 h-200 p-5 absolute -top-150 rotate-20 left-50"></div>
    </div>
  );
}
