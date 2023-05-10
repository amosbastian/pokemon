import { BRAND_NAME } from "@pokemon/configuration";
import { GithubButton } from "@pokemon/ui";
import { Metadata } from "next";

export default async function Page() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-gray-12 mt-6 text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-gray-1 dark:bg-gray-2 px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <div>
            <div className="mt-6 grid gap-4">
              <GithubButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Sign in",
  description: `Sign in to ${BRAND_NAME} and assemble your own Pokémon team`,
};
