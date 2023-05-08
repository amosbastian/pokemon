import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const pokemon = sqliteTable("pokemon", {
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

export const pokemonTypes = sqliteTable(
  "pokemon_types",
  {
    pokemonId: integer("pokemon_id")
      .notNull()
      .references(() => pokemon.id),
    typeId: integer("type_id")
      .notNull()
      .references(() => types.id),
  },
  // (table) => ({
  //   compositePk: primaryKey(table.pokemonId, table.typeId),
  // }),
);

export const types = sqliteTable("types", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});
