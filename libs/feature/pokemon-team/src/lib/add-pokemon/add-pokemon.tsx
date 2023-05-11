import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@pokemon/ui";
import { PlusIcon } from "lucide-react";
import { addPokemon } from "../add-pokemon/action";
import { Submit } from "../submit/submit";

interface AddPokemonProps {
  pokemonId: number;
  userId: string;
}

export function AddPokemon({ pokemonId, userId }: AddPokemonProps) {
  // I am doing it like this because I'm getting an error when trying with `zact` or
  // using `startTransition`: https://github.com/nrwl/nx/issues/16956
  return (
    <form className="z-10" action={addPokemon}>
      <input className="hidden" name="pokemonId" readOnly value={pokemonId} />
      <input className="hidden" name="userId" readOnly value={userId} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Submit
              variant="ghost"
              className="group flex h-7 w-7 items-center justify-center rounded-md p-0 transition"
              aria-label="Add Pokémon"
            >
              <PlusIcon className="text-slate-11 group-hover:text-slate-12 h-4 w-4" />
            </Submit>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add Pokémon to your team</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}
