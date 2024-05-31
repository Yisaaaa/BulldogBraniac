"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

const subjects = [
  {
    value: "Math",
    label: "Math",
  },
  {
    value: "English",
    label: "English",
  },
  {
    value: "Computer",
    label: "Computer",
  },
  {
    value: "Humanities",
    label: "Humanities",
  },
  {
    value: "Science",
    label: "Science",
  },
  {
    value: "PE",
    label: "PE",
  },
];

export default function SubjectComboBox({ value, setValue }) {
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
              ? subjects.find((subject) => subject.value === value)?.label
              : "Select subject..."}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-5  shrink-0 bg-opacity-100" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="bg-white">
          <CommandInput placeholder="Search subject..." />
          <CommandEmpty>No subject found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {subjects.map((subject) => (
                <CommandItem
                  className="font-semibold"
                  key={subject.value}
                  value={subject.value}
                  onSelect={() => {
                    setValue(subject.value === value ? "" : subject.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === subject.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {subject.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
