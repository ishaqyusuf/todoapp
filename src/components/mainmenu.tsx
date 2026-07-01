"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Circle,
  CircleArrowOutUpRight,
  Copy,
  Copyright,
  File,
  Info,
  LogOut,
  MessageCircleCode,
  MoonIcon,
  MoreVertical,
  Settings,
  StarIcon,
  SunIcon,
  SuperscriptIcon,
} from "lucide-react";
import { InputGroupButton } from "./ui/input-group";
import { useRouter } from "next/navigation";
import getAuth from "@/actions/auth";
import logoutAction from "@/actions/logout";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Separator } from "@radix-ui/react-separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";
import Link from "next/link";
import { DonaState, useDonaStore } from "@/store/dona";
import constants from "@/lib/constants";
import LegalPrivacy from "./legal-privacy";
import SettingsPannel from "./settings-panel";

export default function MainMenu() {
  const menuItems = constants.menueItems;
  const [showDialog, setShowDialog] = useState<string | null>(null);
  const activeMenuItem = menuItems.find((item) => item.id == showDialog);
  async function loggingOut() {
    const auth = await logoutAction();
    router.push("/login");
  }

  const router = useRouter();
  return (
    <>
      <div className="absolute top-3 left-280">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <InputGroupButton
              asChild
              size="icon-xs"
              className=" pt center text-sm bg-gray-600 cursor-pointer dark:hover:bg-gray-600"
            >
              <MoreVertical className="cursor-pointer text-white" />
            </InputGroupButton>
          </DropdownMenuTrigger>

          {/* the content here */}
          <DropdownMenuContent className="dark:bg-gray-700 p-8 w-100 rounded-2xl m-5">
            {/* the title */}
            <DropdownMenuGroup>
              <DropdownMenuLabel className="mb-2">Theme</DropdownMenuLabel>
            </DropdownMenuGroup>

            {/* the tabs */}
            <DropdownMenuGroup className="dark:bg-gray-600  rounded-md">
              <Tabs defaultValue="Dark" className="w-[400px] pl-8">
                <TabsList className="flex  justify-start gap-18 rounded-xl">
                  <TabsTrigger value="Light" className="dark:bg-gray-800 p-1 ">
                    <InputGroupButton
                      size={"icon-sm"}
                      className="flex justify-cente"
                    >
                      <SunIcon />
                      Light
                    </InputGroupButton>
                  </TabsTrigger>

                  <TabsTrigger value="Dark">
                    <InputGroupButton size={"icon-sm"}>
                      <MoonIcon />
                      Dark
                    </InputGroupButton>
                  </TabsTrigger>

                  <TabsTrigger value="Black">
                    <InputGroupButton size={"icon-sm"}>
                      <StarIcon />
                      Black
                    </InputGroupButton>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </DropdownMenuGroup>

            {/* the seperator */}
            <DropdownMenuSeparator className="h-px mt-5 bg-gray-200" />

            {/* the menue items */}
            <DropdownMenuGroup className="p-6">
              {menuItems.map((items, index) => {
                return (
                  <DropdownMenuItem
                    asChild
                    key={items.id}
                    className=""
                    onSelect={() => {
                      setShowDialog(items.id);
                    }}
                  >
                    <InputGroupButton
                      size={"icon-sm"}
                      className="p w-xs justify-start"
                    >
                      {items.title === "Settings" && <Settings />}
                      {items.title === "Feedback" && <MessageCircleCode />}
                      {items.title === "About" && <Info />}
                      {items.title === "Support" && <CircleArrowOutUpRight />}
                      {items.title === "Legal" && <File />}
                      {items.title}
                    </InputGroupButton>
                  </DropdownMenuItem>
                );
              })}

              {/* logout item */}
              <DropdownMenuItem className="" onClick={loggingOut} asChild>
                <InputGroupButton
                  size={"icon-sm"}
                  className="p w-xs justify-start"
                >
                  <LogOut /> Log out
                </InputGroupButton>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            {/* the seperator */}
            <DropdownMenuSeparator className="h-px mt-5 bg-gray-200" />
            {/* copyright */}
            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex justify-center">
                <InputGroupButton
                  size={"icon-sm"}
                  className="p w-xs justify-start"
                >
                  <Copyright /> 2026 Dona
                  <span>Follow us on Twitter</span>
                </InputGroupButton>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog
          open={showDialog !== null}
          onOpenChange={(open) => {
            if (!open) setShowDialog(null);
          }}
        >
          <DialogContent className="dark:bg-gray-700 ">
            <DialogHeader>
              <DialogTitle>{activeMenuItem?.title}</DialogTitle>
              <DialogDescription>{activeMenuItem?.subtitle}</DialogDescription>
            </DialogHeader>
            {activeMenuItem?.title == "Legal" ? (
              <>
                <LegalPrivacy />
              </>
            ) : activeMenuItem?.title == "Settings" ? (
              <>
                <SettingsPannel />
              </>
            ) : (
              <>
                <p>{activeMenuItem?.content}</p>
                {activeMenuItem?.contentlink && (
                  <Link
                    href={activeMenuItem.contentlink}
                    className="text-blue-700 hover:text-blue-500"
                  >
                    {activeMenuItem?.contentlink}
                  </Link>
                )}

                <p>{activeMenuItem?.contentend}</p>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
