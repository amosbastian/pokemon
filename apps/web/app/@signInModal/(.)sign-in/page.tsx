import { GithubButton, InterceptDialog } from "@pokemon/ui";

export default async function Page() {
  return (
    <InterceptDialog>
      <p className="text-gray-12 mb-2 font-semibold">Sign in with</p>
      <GithubButton />
    </InterceptDialog>
  );
}
