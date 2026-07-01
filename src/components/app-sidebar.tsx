"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Home,
  CheckCircle,
  Calendar,
  Plus,
  Square,
  MoveDownIcon,
  MoveDown,
  BookDown,
  ArrowDown,
  ChevronDown,
} from "lucide-react";
import { title } from "process";
import { Input } from "./ui/input";

import { useDonaStore } from "@/store/dona";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "./ui/field";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { SideCategoryItem } from "./side-category-item";

import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { CategoryIcon } from "./category-icon";
import { useState } from "react";
import { GetSidebarCategories } from "@/actions/todo";
import { createCategoryAction } from "@/actions/create-category";

// const items=[
//     {
//         title:'Home',
//         url:'#',
//         Icon:Home,
//     },

//     {
//         title:'Completed',
//         url:'#',
//         Icon:CheckCircle,
//     },

//     {
//         title:'Today',
//         url:'#',
//         Icon:Calendar,
//     }
// ]

const categorySchema = z.object({
  title: z.string({ error: "type something here" }).min(1),
  id: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  slug: z.string(),
});

const theColors = [
  "#0065b4",
  "#0092ff",
  "#00c4ff",
  "#00bcae",
  "#00bc65",
  "#e3bb00",
  "#fff1a5",
  "#ff5d4a",
  "#ff0030",
  "#bd0000",
  "#cf0092",
  "#ff62e8",
  "#883fff",
  "#4843ff",
  "#9195a4",
  "#7f6f63",
];

interface Props {
  categories: GetSidebarCategories;
}
export function AppSidebar({ categories }: Props) {
  const [dropOpen, setDropOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Colors");
  // const { categories } = useDonaStore();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: "",
      id: "",
      color: "#7f6f63",
      icon: "square",
      slug: "",
    },
  });
  const updateCategory = useDonaStore((state) => state.updateCategory);

  async function onSubmit(data: any) {
    console.log("category created");
    // const newCategory = {
    //   ...data,
    //   id: Date.now().toString(),
    //   slug: data.title.toLowerCase().trim().replace(/\s+/g, "-"),
    //   icon: data.icon,
    // };
    // // updateCategory(newCategory);
    const generatedSlug = data.title.toLowerCase().trim().replace(/\s+/g, "-");
    await createCategoryAction(
      data.title,
      data.icon || "square",
      data.color || "#7f6f63",
      generatedSlug,
    );
    form.reset();
  }
  return (
    <Sidebar className="mt-3 mb-3 ml-3 h-130 w-80 p-10 rounded-4xl dark:bg-gray-700 border-none">
      <SidebarContent className="dark:bg-gray-700">
        <SidebarGroupContent className="dark:bg-gray-700">
          <SidebarMenu className="bg-gray-700">
            {categories.map((category) => (
              <SideCategoryItem
                key={category.title}
                category={category}
              />
            ))}
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <InputGroup className="group">
                <InputGroupAddon>
                  <DropdownMenu open={dropOpen} onOpenChange={setDropOpen}>
                    <DropdownMenuTrigger>
                      <InputGroupButton className="group-focus-within:hidden">
                        <Plus />
                      </InputGroupButton>
                      <InputGroupButton
                        className="hidden group-focus-within:flex "
                        style={{ color: form.watch("color") ?? undefined }}
                      >
                        <CategoryIcon
                          icon={form.watch("icon") ?? undefined}
                          color={form.watch("color") ?? undefined}
                        />
                        <ChevronDown size={14} className="ml-1 opacity-50" />
                      </InputGroupButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Tabs
                        defaultValue={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                      >
                        <TabsList>
                          <TabsTrigger value="Colors">Colors</TabsTrigger>
                          <TabsTrigger value="Emojis">Emojis</TabsTrigger>
                        </TabsList>
                        <TabsContent
                          value="Colors"
                          className="grid grid-cols-8"
                        >
                          {theColors.map((color, index) => {
                            return (
                              <DropdownMenuItem
                                key={color}
                                onClick={() => form.setValue("color", color)}
                              >
                                <div
                                  className={cn(` w-2 p-2 rounded-sm`)}
                                  style={{ backgroundColor: color }}
                                />
                              </DropdownMenuItem>
                            );
                          })}
                        </TabsContent>
                        <TabsContent value="Colors">
                          <span>Custom color</span>
                          <InputGroup>
                            <InputGroupAddon>
                              {" "}
                              <div
                                className={cn(` w-2 p-2 rounded-sm `)}
                                style={{ backgroundColor: form.watch("color") }}
                              />
                            </InputGroupAddon>
                            <Controller
                              name="color"
                              control={form.control}
                              render={({ field, fieldState }) => (
                                <Field>
                                  <InputGroupInput
                                    {...form.register("color")}
                                    placeholder=""
                                    type="text"
                                    {...field}
                                  />
                                </Field>
                              )}
                            />
                          </InputGroup>
                        </TabsContent>
                        <TabsContent value="Emojis" className="">
                          <Controller
                            name="icon"
                            control={form.control}
                            render={({ field }) => (
                              <EmojiPicker
                                className="w-80"
                                emojiStyle={EmojiStyle.APPLE}
                                lazyLoadEmojis={true}
                                width="250px"
                                theme="dark"
                                emojiSize={2}
                                onEmojiClick={(emojiData: any) => {
                                  field.onChange(emojiData.emoji);
                                  setActiveTab("Colors");
                                  setDropOpen(false);
                                }}
                              />
                            )}
                          />
                        </TabsContent>
                      </Tabs>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </InputGroupAddon>
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <InputGroupInput
                        {...form.register("title")}
                        placeholder="Create new list"
                        type="text"
                        {...field}
                      />
                    </Field>
                  )}
                />
              </InputGroup>
            </form>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
    </Sidebar>
  );
}
