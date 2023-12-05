import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text();

  let gameName;
  try {
    const json = JSON.parse(body);
    gameName = json.gameName;
  } catch (error) {
    console.error("Invalid JSON:", error);
    return NextResponse.json({ message: "Invalid JSON format" });
  }

  let roomKeys = [];
  try {
    for await (const key of kv.scanIterator()) {
      if (key.slice(0, 10) === "two-worlds") {
        roomKeys.push(key);
      }
    }
    if (roomKeys.length === 0) {
      return NextResponse.json({ status: "failed", message: "Room Not Found" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "failed", message: "Room Error" });
  }

  let rooms = [];
  for (let key of roomKeys) {
    let room = await kv.get(key);
    if (room !== null) {
      rooms.push(room);
    }
  }

  return NextResponse.json({
    status: "success",
    message: "Room List Successful",
    rooms,
  });
}
