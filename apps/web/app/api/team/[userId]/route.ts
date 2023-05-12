import { getUserTeam } from "@pokemon/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { userId: string };
  },
) {
  const userId = params.userId;
  const team = getUserTeam(userId);

  return NextResponse.json({ team });
}
