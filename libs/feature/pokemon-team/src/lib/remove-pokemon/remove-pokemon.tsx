import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@pokemon/ui";
import { TrashIcon } from "lucide-react";
import { removePokemon } from "../remove-pokemon/action";
import { Submit } from "../submit/submit";

interface RemovePokemonProps {
  pokemonId: number;
  userId: string;
}

export function RemovePokemon({ pokemonId, userId }: RemovePokemonProps) {
  // I am doing it like this because I'm getting an error when trying with `zact` or
  // using `startTransition`: https://github.com/nrwl/nx/issues/16956
  return (
    <form className="z-10" action={removePokemon}>
      <input className="hidden" name="pokemonId" readOnly value={pokemonId} />
      <input className="hidden" name="userId" readOnly value={userId} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Submit
              variant="ghost"
              className="group flex h-7 w-7 items-center justify-center rounded-md p-0 transition"
              aria-label="Remove Pokémon"
            >
              <TrashIcon className="text-slate-11 group-hover:text-slate-12 h-4 w-4" />
            </Submit>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove Pokémon from your team</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}
