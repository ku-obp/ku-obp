import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { gameName } = await request.json();

    const rooms = await sql`SELECT * FROM rooms WHERE game = ${gameName}`;

    return NextResponse.json({
      message: "success",
      data: rooms,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

  return NextResponse.json({ message: "success" });
}
