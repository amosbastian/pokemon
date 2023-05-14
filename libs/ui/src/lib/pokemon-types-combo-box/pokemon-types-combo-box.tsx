"use client";

import { classnames } from "@pokemon/utility/shared";
import { Check, ChevronsUpDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "../button/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../command/command";
import styles from "../loading-dots.module.css";
import { ColorMap } from "../pokemon-type/pokemon-type";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";

interface PokemonTypesComboBoxProps {
  defaultValue?: string;
  types: { id: number; name: string }[];
}

export function PokemonTypesComboBox({ defaultValue, types }: PokemonTypesComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | undefined>(defaultValue);
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();

  const onSelect = (newValue: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (newValue === value) {
      searchParams.delete("type");
      setValue(undefined);
    } else {
      searchParams.set("type", newValue);
      setValue(newValue);
    }
    setOpen(false);

    startTransition(() => {
      replace(`${pathname}?${searchParams.toString()}`);
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="relative h-full w-full justify-between font-normal capitalize"
        >
          {value ? types.find((type) => type.name === value)?.name : "Select type..."}
          {isPending ? (
            <span className={`pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 ${styles.loading}`}>
              <span style={{ backgroundColor: "hsl(var(--primary))" }} />
              <span style={{ backgroundColor: "hsl(var(--primary))" }} />
              <span style={{ backgroundColor: "hsl(var(--primary))" }} />
            </span>
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search type..." />
          <CommandEmpty>No type found.</CommandEmpty>
          <CommandGroup>
            {types.map((type) => (
              <CommandItem
                value={type.name}
                key={type.id}
                onSelect={onSelect}
                className="flex flex-row items-center gap-2 capitalize"
              >
                <Check className={classnames("h-4 w-4", value === type.name ? "opacity-100" : "opacity-0")} />
                <svg className={`h-1.5 w-1.5 ${ColorMap[type.name]}`} viewBox="0 0 6 6" aria-hidden="true">
                  <circle cx={3} cy={3} r={3} />
                </svg>
                {type.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
