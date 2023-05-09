import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { DrizzleAdapter, db } from "@pokemon/db";
import GitHubProvider from "next-auth/providers/github";

export const nextAuthOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/sign-in",
    newUser: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
