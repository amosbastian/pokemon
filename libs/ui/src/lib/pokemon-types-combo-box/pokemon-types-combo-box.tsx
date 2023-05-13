"use client";

import { classnames } from "@pokemon/utility/shared";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { Button } from "../button/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../command/command";
import { ColorMap } from "../pokemon-type/pokemon-type";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";

interface PokemonTypesComboBoxProps {
  types: { id: number; name: string }[];
}

export function PokemonTypesComboBox({ types }: PokemonTypesComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [id, setValue] = React.useState<number | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-full w-full justify-between font-normal"
        >
          {id ? types.find((type) => type.id === id)?.name : "Select type..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search type..." />
          <CommandEmpty>No type found.</CommandEmpty>
          <CommandGroup>
            {types.map((type) => (
              <CommandItem
                key={type.id}
                onSelect={(currentValue) => {
                  const parsedValue = Number.parseInt(currentValue, 10);
                  setValue(parsedValue === id ? null : parsedValue);
                  setOpen(false);
                }}
                className="flex flex-row items-center gap-2 capitalize"
              >
                <Check className={classnames("h-4 w-4", id === type.id ? "opacity-100" : "opacity-0")} />
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
