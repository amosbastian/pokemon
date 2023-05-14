import "dotenv/config";

import { createClient } from "@libsql/client";
import { InferModel, and, eq, placeholder, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import { pokemonTable, pokemonTeamsTable, pokemonTypesTable, teamsTable, typesTable } from "./schema";

type Pokemon = InferModel<typeof pokemonTable>;
type Type = InferModel<typeof typesTable>;

const client = createClient({
  url: process.env["DATABASE_URL"] as string,
  authToken: process.env["DATABASE_AUTH_TOKEN"] as string,
});

export const db = drizzle(client);

if (process.env["NODE_ENV"] !== "production") {
  migrate(db, { migrationsFolder: "./libs/db/src/lib/drizzle" });
}

export const getSinglePokemon = async (id: number) => {
  const rows = await db
    .select({
      pokemon: pokemonTable,
      type: typesTable,
    })
    .from(pokemonTable)
    .leftJoin(pokemonTypesTable, eq(pokemonTypesTable.pokemonId, pokemonTable.id))
    .leftJoin(typesTable, eq(typesTable.id, pokemonTypesTable.typeId))
    .where(eq(pokemonTable.id, id))
    .all();

  const result = rows.reduce<Record<number, { pokemon: Pokemon; types: Type[] }>>((accumulator, row) => {
    const pokemon = row.pokemon;
    const type = row.type;

    if (!accumulator[pokemon.id]) {
      accumulator[pokemon.id] = { pokemon, types: [] };
    }

    if (type) {
      accumulator[pokemon.id].types.push(type);
    }

    return accumulator;
  }, {});

  return result[id] ? result[id] : null;
};

interface GetAllPokemonParams {
  search?: string;
  type?: string;
}

export const getAllPokemon = async (params?: GetAllPokemonParams) => {
  const { search, type } = params ?? {};

  let pokemonList: { pokemon: Pokemon; type: Type | null }[];

  let query = db
    .select({
      pokemon: pokemonTable,
      type: typesTable,
    })
    .from(pokemonTable)
    .leftJoin(pokemonTypesTable, eq(pokemonTypesTable.pokemonId, pokemonTable.id))
    .leftJoin(typesTable, eq(pokemonTypesTable.typeId, typesTable.id));

  if (type) {
    query = query.where(eq(typesTable.name, type));
  }

  // TODO: figure out better where to do conditional .where()
  if (search) {
    if (type) {
      query = query.where(and(sql`lower(${pokemonTable.name}) like ${placeholder("name")}`, eq(typesTable.name, type)));
    } else {
      query = query.where(sql`lower(${pokemonTable.name}) like ${placeholder("name")}`);
    }
    pokemonList = await query.prepare().all({ name: `%${search}%` });
  } else {
    pokemonList = await query.all();
  }

  const reducedPokemonList = pokemonList.reduce<Record<number, { pokemon: Pokemon; types: Type[] }>>(
    (accumulator, row) => {
      const pokemon = row.pokemon;
      const type = row.type;

      if (!accumulator[pokemon.id]) {
        accumulator[pokemon.id] = { pokemon, types: [] };
      }

      if (type) {
        accumulator[pokemon.id].types.push(type);
      }

      return accumulator;
    },
    {},
  );

  return Object.values(reducedPokemonList);
};

export const getUserTeam = async (userId: string) => {
  const rows = await db
    .select({
      team: teamsTable,
      pokemon: pokemonTable,
      position: pokemonTeamsTable.position,
    })
    .from(teamsTable)
    .where(eq(teamsTable.userId, userId))
    .leftJoin(pokemonTeamsTable, eq(pokemonTeamsTable.teamId, teamsTable.id))
    .leftJoin(pokemonTable, eq(pokemonTable.id, pokemonTeamsTable.pokemonId))
    .all();

  const pokemon = rows.reduce<(Pokemon & { position: number })[]>((accumulator, row) => {
    const pokemon = row.pokemon;
    const position = row.position;

    if (pokemon && position) {
      accumulator.push({ ...pokemon, position });
    }

    return accumulator;
  }, []);

  return {
    ...rows[0].team,
    pokemon,
  };
};
