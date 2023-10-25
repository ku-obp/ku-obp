import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.text();

    let gameName;
    try {
      const json = JSON.parse(body);
      gameName = json.gameName;
    } catch (error) {
      console.error("Invalid JSON:", error);
      return NextResponse.json({ message: "Invalid JSON format" });
    }

    const query = sql`SELECT * FROM rooms WHERE game = ${gameName}`;
    const rooms = await query;

    return NextResponse.json({
      message: "success",
      data: rooms,
    });
  } catch (error) {
    console.log(error);
    // 'Error' 인스턴스인지 확인한 후 메시지를 추출합니다.
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message: errorMessage });
  }
}
