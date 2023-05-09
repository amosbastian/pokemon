import { nextAuthOptions } from "@pokemon/configuration/server";
import { HomeIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { ButtonLink } from "../button/button";
import { ThemeToggle } from "../theme-toggle/theme-toggle";
import { UserButton } from "../user-button/user-button";

export async function Header() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <header className="absolute inset-x-0 top-0 z-50 py-5">
      <nav className="mx-auto flex max-w-2xl items-center justify-between gap-x-6" aria-label="Global">
        <div className="flex lg:flex-1">
          <ButtonLink
            href="/"
            variant="ghost"
            className="group flex h-7 w-7 items-center justify-center rounded-md p-0 transition"
            aria-label="Go home"
          >
            <HomeIcon className="text-slate-11 group-hover:text-slate-12 absolute h-4 w-4" />
          </ButtonLink>
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-2">
          <ThemeToggle />
          {session && session.user ? (
            <UserButton user={session.user} />
          ) : (
            <ButtonLink href="/sign-in">Sign in</ButtonLink>
          )}
        </div>
      </nav>
    </header>
  );
}
