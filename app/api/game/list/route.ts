import { NextResponse } from "next/server";
import { query } from "@/database/db";

export async function GET() {
  let gameList;

  try {
    gameList = await query("SELECT * FROM games");
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

  return NextResponse.json({ message: "success", data: gameList });
}
