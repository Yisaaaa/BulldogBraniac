"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const yearLevels = [
  {
    value: "First Year",
    label: "First Year",
  },
  {
    value: "Second Year",
    label: "Second Year",
  },
  {
    value: "Third Year",
    label: "Third Year",
  },
  {
    value: "Fourth Year",
    label: "Fourth Year",
  },
];

export default function yearComboBox({ value, setValue }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className="flex items-center border-[1px] border-[#aaa] rounded-md px-2 py-1 self-start font-semibold"
        >
          <span>
            {value
              ? yearLevels.find((year) => year.value === value)?.label
              : "Select year..."}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-5  shrink-0 bg-opacity-100" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="bg-white">
          <CommandInput placeholder="Search year..." />
          <CommandEmpty>No year found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {yearLevels.map((year) => (
                <CommandItem
                  className="font-semibold"
                  key={year.value}
                  value={year.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === year.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {year.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
