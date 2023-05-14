# Pokémon

A Next.js 13 application built using the new router, server components and server actions, as well as [NextAuth.js](https://github.com/nextauthjs/next-auth), [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) and [Turso](https://turso.tech/) in an [Nx monorepo](https://github.com/nrwl/nx)

> **Warning**
> This app is more than likely not using best practices. Server actions are still in alpha and some things currently don't work in an Nx monorepo.

## About this project

I built this project to play around with server actions as well as server components, Drizzle ORM and the new intercepting / parallel routes. Take everything you see in here with a grain of salt.

## Note on performance / thoughts

> **Warning**
> This app is using server actions, which are in alpha, and do not (yet) have the best UX or DX.
> **Expect to see some jank when playing around with the app**.
> As for a personal recommendation, I'd stick to something like tRPC for now and wait until they improve things.

## Some highlights

- Using [the new Next.js app directory](https://nextjs.org/docs) and nearly everything that comes with it (dynamic open graph images, metadata etc.)
- [Intercepting](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes) / [parallel routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)
- Authentication using **[NextAuth.js](https://github.com/nextauthjs/next-auth)**
- **[Drizzle ORM](https://github.com/drizzle-team/drizzle-orm)**
- Using **[Turso](https://turso.tech/)** for the database
- **TypeScript**

## Known Issues

A list of things not working right now:

1. Constant warnings in the terminal, probably caused by Nx
2. Loading state when adding / removing Pokémon is janky because of server actions

## Running Locally

1. Install dependencies using npm:
2. Copy `.env.example` to `.env` and update the variables (you will need to [set up GitHub OAuth](https://github.com/settings/developers))

```sh
cp .env.example .env.local
```

3. Run the migrations & seed the database

```sh
npx drizzle-kit generate:sqlite
npx drizzle-kit up:sqlite
npm run seed
```

4. Start the development server:

```sh
npx nx serve web
```

## Acknowledgements

Just a few things that helped to build this app

- Adapted a lot of components from @shadcn's [UI library](https://github.com/shadcn/ui)
- Used @anthonyshrew's [Drizzle adapter for NextAuth](https://github.com/nextauthjs/next-auth/pull/7165) as a base
- @samselikoff's [Build UI](https://buildui.com/) for inspiration for the Pokémon ball dock
- [Ryan Toronto's tweet](https://twitter.com/ryantotweets/status/1622632894278533130) about implementing search with search params

## License

Licensed under the [MIT license](https://github.com/amosbastian/pokemon/blob/main/LICENSE.md).
