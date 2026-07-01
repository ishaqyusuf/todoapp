import { InputGroupButton } from "./ui/input-group";
import { CalendarCheckIcon, CalendarIcon } from "lucide-react";
import { Field } from "./ui/field";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { formatDate } from "date-fns";

interface Props {
  value?: Date | null | undefined;
  onChange?: (e: any) => void;
  hasDot?: boolean;
  showDate?: boolean;
}
export default function CalendarEdit(props: Props) {
  //   const [dropdownTrigger, setDropdownTrigger] = useState(false);
  const [calenderTrigger, setCalenderTrigger] = useState(false);
  return (
    <>
      <Popover open={calenderTrigger} onOpenChange={setCalenderTrigger}>
        <PopoverTrigger className="cursor-pointer" asChild>
          <InputGroupButton className="cursor-pointer dark:bg-gray-600 relative text-white">
            {props.value && props.hasDot ? (
              <>
                <CalendarCheckIcon className="text-white" />

                <div className="absolute bg-blue-400 w-3 h-3 p2 rounded-full -top-1 -right-1 border-2 border-gray-700"></div>
                {/* TODO: add blue dot */}
              </>
            ) : (
              <>
                <CalendarIcon className="text-white" />
                {props.showDate ? (
                  <>
                    {props.value
                      ? formatDate(props.value, "d.MMM")
                      : "schedule"}
                  </>
                ) : null}
              </>
            )}
            {/* {formatDate(field.value, "Y")} for dsiplaying the date */}
          </InputGroupButton>
        </PopoverTrigger>
        <PopoverContent className="z-50">
          <Field>
            <Calendar
              mode="single"
              selected={props.value!}
              onSelect={(e) => {
                props?.onChange?.(e);
                setCalenderTrigger(false);
              }}
              // defaultMonth={date}
            />
          </Field>
        </PopoverContent>
      </Popover>
    </>
  );
}
