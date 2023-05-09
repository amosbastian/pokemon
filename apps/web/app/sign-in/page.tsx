import { BRAND_NAME } from "@pokemon/configuration";
import { Button, GithubButton, Input } from "@pokemon/ui";
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
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="text-gray-12 block text-sm font-medium leading-6">
                Email address
              </label>
              <div className="mt-2">
                <Input id="email" name="email" type="email" autoComplete="email" required />
              </div>
            </div>

            <div>
              <Button size="lg" type="submit" className="w-full">
                Sign in
              </Button>
            </div>
          </form>

          <div>
            <div className="relative mt-10">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="border-gray-6 w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="text-gray-12 bg-gray-1 dark:bg-gray-2 px-6">Or continue with</span>
              </div>
            </div>

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
