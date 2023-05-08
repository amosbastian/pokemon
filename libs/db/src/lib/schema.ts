import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

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
