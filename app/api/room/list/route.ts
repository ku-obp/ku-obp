import { NextResponse } from "next/server";
import { query } from "@/database/db";

export async function POST(request: Request) {
  try {
    const { gameName } = await request.json();

    const rooms = await query("SELECT * FROM rooms WHERE game = $1", [
      gameName,
    ]);

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
