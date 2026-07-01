import { ChevronDown, Square } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { InputGroupButton } from "./ui/input-group";
import { CategoryIcon } from "./category-icon";
import { useState } from "react";
import { useDonaStore } from "@/store/dona";
interface Props {
  value?: string | null | undefined;
  onChange?: (e: any) => void;
  categories: any[];
}

export default function GlobalCategoryDropDownMenu(props: Props) {
  // const categories = useDonaStore((state) => state.categories).filter(
  //   (category, i) => i > 2,
  // );
  const [dropdownTrigger, setDropdownTrigger] = useState(false);
  const excludedSlugs = ["home", "completed", "today"];
  const categoriesFilter = (props.categories || []).filter(
    (category) => !excludedSlugs.includes(category.slug),
  );
  const formCategories = [
    ...categoriesFilter,
    { title: "No List", color: undefined, icon: undefined, id: undefined },
  ];
  const selecteCategory = formCategories.find((category) => {
    // if (!field.value && !category.id) {
    //   return category;
    // }

    return category.id?.toString() === props.value?.toString();
  });
  return (
    <>
      <DropdownMenu open={dropdownTrigger} onOpenChange={setDropdownTrigger}>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <InputGroupButton className="cursor-pointer dark:bg-gray-600">
            <Square className="cursor-pointer" />
            {selecteCategory?.title || "Select list"}
            <ChevronDown />
          </InputGroupButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="dark:bg-gray-600 w-50 rounded-sm p-2 z-50">
          {formCategories.map((category, i) => (
            <DropdownMenuItem
              key={i}
              onClick={(e) => {
                e.preventDefault();

                props?.onChange?.(category.id);
                setDropdownTrigger(false);
              }}
            >
              <InputGroupButton size={"icon-sm"} className="justify-start">
                <CategoryIcon
                  icon={category.iconName || category.icon}
                  color={category.color}
                />
                {category.title}
              </InputGroupButton>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
