import { and, eq } from "drizzle-orm";
import type { Adapter } from "next-auth/adapters";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { accounts, sessions, users, verificationTokens } from "./schema";

export function DrizzleAdapter(database: typeof db): Adapter {
  return {
    createUser: (data) => {
      return database
        .insert(users)
        .values({ ...data, id: uuidv4() })
        .returning()
        .get();
    },
    getUser: (id) => {
      return database.select().from(users).where(eq(users.id, id)).get() ?? null;
    },
    getUserByEmail: (email) => {
      return database.select().from(users).where(eq(users.email, email)).get() ?? null;
    },
    createSession: (session) => {
      return database.insert(sessions).values(session).returning().get();
    },
    getSessionAndUser: (sessionToken) => {
      return (
        database
          .select({
            session: sessions,
            user: users,
          })
          .from(sessions)
          .where(eq(sessions.sessionToken, sessionToken))
          .innerJoin(users, eq(users.id, sessions.userId))
          .get() ?? null
      );
    },
    updateUser: (user) => {
      return database.update(users).set(user).where(eq(users.id, user.id)).returning().get();
    },
    updateSession: (session) => {
      return database
        .update(sessions)
        .set(session)
        .where(eq(sessions.sessionToken, session.sessionToken))
        .returning()
        .get();
    },
    linkAccount: (rawAccount) => {
      const updatedAccount = database.insert(accounts).values(rawAccount).returning().get();

      const account: ReturnType<Adapter["linkAccount"]> = {
        ...updatedAccount,
        access_token: updatedAccount.access_token ?? undefined,
        token_type: updatedAccount.token_type ?? undefined,
        id_token: updatedAccount.id_token ?? undefined,
        refresh_token: updatedAccount.refresh_token ?? undefined,
        scope: updatedAccount.scope ?? undefined,
        expires_at: updatedAccount.expires_at ?? undefined,
        session_state: updatedAccount.session_state ?? undefined,
      };

      return account;
    },
    getUserByAccount: (account) => {
      return (
        database
          .select({
            id: users.id,
            email: users.email,
            emailVerified: users.emailVerified,
            image: users.image,
            name: users.name,
          })
          .from(users)
          .innerJoin(
            accounts,
            and(eq(accounts.providerAccountId, account.providerAccountId), eq(accounts.provider, account.provider)),
          )
          .get() ?? null
      );
    },
    deleteSession: (sessionToken) => {
      return database.delete(sessions).where(eq(sessions.sessionToken, sessionToken)).returning().get() ?? null;
    },
    createVerificationToken: (verificationToken) => {
      return database.insert(verificationTokens).values(verificationToken).returning().get();
    },
    useVerificationToken: (verificationToken) => {
      try {
        return (
          database
            .delete(verificationTokens)
            .where(
              and(
                eq(verificationTokens.identifier, verificationToken.identifier),
                eq(verificationTokens.token, verificationToken.token),
              ),
            )
            .returning()
            .get() ?? null
        );
      } catch (err) {
        throw new Error("No verification token found.");
      }
    },
    deleteUser: (id) => {
      return database.delete(users).where(eq(users.id, id)).returning().get();
    },
    unlinkAccount: (account) => {
      database
        .delete(accounts)
        .where(and(eq(accounts.providerAccountId, account.providerAccountId), eq(accounts.provider, account.provider)))
        .run();

      return undefined;
    },
  };
}
