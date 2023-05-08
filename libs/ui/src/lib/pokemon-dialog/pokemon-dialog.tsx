"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "../dialog/dialog";

interface PokemonDialogProps {
  children: React.ReactNode;
}

export async function PokemonDialog({ children }: PokemonDialogProps) {
  const router = useRouter();

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
