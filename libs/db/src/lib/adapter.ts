// Most of the code is taken from: https://github.com/nextauthjs/next-auth/pull/7165
import { and, eq } from "drizzle-orm";
import type { Adapter, VerificationToken } from "next-auth/adapters";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { accountsTable, sessionsTable, usersTable, verificationTokensTable } from "./schema";

export function DrizzleAdapter(database: typeof db): Adapter {
  return {
    createUser: (data) => {
      return database
        .insert(usersTable)
        .values({ ...data, id: uuidv4() })
        .returning()
        .get();
    },
    getUser: (id) => {
      return database.select().from(usersTable).where(eq(usersTable.id, id)).get() ?? null;
    },
    getUserByEmail: (email) => {
      return database.select().from(usersTable).where(eq(usersTable.email, email)).get() ?? null;
    },
    createSession: (session) => {
      return database.insert(sessionsTable).values(session).returning().get();
    },
    getSessionAndUser: (sessionToken) => {
      return (
        database
          .select({
            session: sessionsTable,
            user: usersTable,
          })
          .from(sessionsTable)
          .where(eq(sessionsTable.sessionToken, sessionToken))
          .innerJoin(usersTable, eq(usersTable.id, sessionsTable.userId))
          .get() ?? null
      );
    },
    updateUser: (user) => {
      return database.update(usersTable).set(user).where(eq(usersTable.id, user.id)).returning().get();
    },
    updateSession: (session) => {
      return database
        .update(sessionsTable)
        .set(session)
        .where(eq(sessionsTable.sessionToken, session.sessionToken))
        .returning()
        .get();
    },
    linkAccount: async (rawAccount) => {
      const updatedAccount = await database.insert(accountsTable).values(rawAccount).returning().get();

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
            id: usersTable.id,
            email: usersTable.email,
            emailVerified: usersTable.emailVerified,
            image: usersTable.image,
            name: usersTable.name,
          })
          .from(usersTable)
          .innerJoin(
            accountsTable,
            and(
              eq(accountsTable.providerAccountId, account.providerAccountId),
              eq(accountsTable.provider, account.provider),
            ),
          )
          .get() ?? null
      );
    },
    deleteSession: (sessionToken) => {
      return (
        database.delete(sessionsTable).where(eq(sessionsTable.sessionToken, sessionToken)).returning().get() ?? null
      );
    },
    createVerificationToken: (verificationToken) => {
      return database.insert(verificationTokensTable).values(verificationToken).returning().get();
    },
    useVerificationToken: async (verificationToken) => {
      try {
        return (database
          .delete(verificationTokensTable)
          .where(
            and(
              eq(verificationTokensTable.identifier, verificationToken.identifier),
              eq(verificationTokensTable.token, verificationToken.token),
            ),
          )
          .returning()
          .get() ?? null) as Promise<VerificationToken | null>;
      } catch {
        throw new Error("No verification token found.");
      }
    },
    deleteUser: (id) => {
      return database.delete(usersTable).where(eq(usersTable.id, id)).returning().get();
    },
    unlinkAccount: (account) => {
      database
        .delete(accountsTable)
        .where(
          and(
            eq(accountsTable.providerAccountId, account.providerAccountId),
            eq(accountsTable.provider, account.provider),
          ),
        )
        .run();

      return undefined;
    },
  };
}
