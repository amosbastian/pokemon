import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { ProviderType } from "next-auth/providers";

export const pokemonTable = sqliteTable("pokemon", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  weight: integer("weight").notNull(),
  height: integer("height").notNull(),
  hp: integer("hp").notNull(),
  attack: integer("attack").notNull(),
  defense: integer("defense").notNull(),
  specialAttack: integer("special_attack").notNull(),
  specialDefense: integer("special_defense").notNull(),
  speed: integer("speed").notNull(),
  sprite: text("sprite").notNull(),
});

export const pokemonTypesTable = sqliteTable(
  "pokemon_types",
  {
    pokemonId: integer("pokemon_id")
      .notNull()
      .references(() => pokemonTable.id),
    typeId: integer("type_id")
      .notNull()
      .references(() => typesTable.id),
  },
  // (table) => ({
  //   compositePk: primaryKey(table.pokemonId, table.typeId),
  // }),
);

export const typesTable = sqliteTable("types", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

// NextAuth
export const users = sqliteTable("users", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
});

export const accounts = sqliteTable(
  "accounts",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<ProviderType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compositePk: primaryKey(account.provider, account.providerAccountId),
  }),
);

export const sessions = sqliteTable("sessions", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (vt) => ({
    compositePk: primaryKey(vt.identifier, vt.token),
  }),
);
