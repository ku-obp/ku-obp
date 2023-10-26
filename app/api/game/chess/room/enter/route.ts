import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text();

  let userEmail, roomId;
  try {
    const json = JSON.parse(body);
    userEmail = json.userEmail;
    roomId = json.roomId;
  } catch (error) {
    console.error("Invalid JSON:", error);
    return NextResponse.json({ message: "Invalid JSON format" });
  }
  const roomKey = `chess:${roomId}`;

  let roomStatus;
  try {
    roomStatus = await kv.get(roomKey);
    if (!roomStatus) {
      return NextResponse.json({ status: "failed", message: "Room Not Found" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "failed", message: "Entry Failed" });
  }

  return NextResponse.json({
    status: "success",
    message: "Entry Successful",
    roomStatus,
  });
}
