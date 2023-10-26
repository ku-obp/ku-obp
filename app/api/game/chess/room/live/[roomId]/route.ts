import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  let gameList;

  try {
    gameList = await sql`SELECT * FROM games`;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

  return NextResponse.json({ message: "success", data: gameList });
}
