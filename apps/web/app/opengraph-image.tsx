// Adapted from https://github.com/shadcn/taxonomy
import { ImageResponse } from "next/server";

async function handler() {
  try {
    const fontSize = "100px";

    return new ImageResponse(
      (
        <div tw="flex relative flex-col p-12 w-full h-full items-start text-white bg-zinc-900">
          <img
            tw="bg-gray-300 dark:bg-gray-4 h-16 w-16 flex-none rounded-full"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            height={64}
            width={64}
            alt=""
          />
          <div tw="flex flex-col flex-1 py-10">
            <div
              tw="flex leading-[1.1] text-[80px] font-bold"
              style={{
                fontFamily: "InterBold",
                fontWeight: "bold",
                marginLeft: "-3px",
                fontSize,
              }}
            >
              Pokémon RSC
            </div>
          </div>
          <div tw="flex items-center w-full justify-between">
            <div tw="flex text-xl" style={{ fontFamily: "Inter", fontWeight: "normal" }}>
              pokemon-rsc.vercel.app
            </div>
            <div tw="flex items-center text-xl" style={{ fontFamily: "Inter", fontWeight: "normal" }}>
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                <path
                  d="M30 44v-8a9.6 9.6 0 0 0-2-7c6 0 12-4 12-11 .16-2.5-.54-4.96-2-7 .56-2.3.56-4.7 0-7 0 0-2 0-6 3-5.28-1-10.72-1-16 0-4-3-6-3-6-3-.6 2.3-.6 4.7 0 7a10.806 10.806 0 0 0-2 7c0 7 6 11 12 11a9.43 9.43 0 0 0-1.7 3.3c-.34 1.2-.44 2.46-.3 3.7v8"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18 36c-9.02 4-10-4-14-4"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div tw="flex ml-2">github.com/amosbastian/pokemon</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}

export const runtime = "edge";

export default handler;
