import { kv } from "@vercel/kv";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { startFen } from "@/lib/chess-utils";

export async function POST(request: Request) {
  const body = await request.text();

  let hostEmail, hostColor;
  try {
    const json = JSON.parse(body);
    hostEmail = json.hostEmail;
    hostColor = json.hostColor;
  } catch (error) {
    console.error("Invalid JSON:", error);
    return NextResponse.json({ message: "Invalid JSON format" });
  }
  const opponentColor = hostColor === "w" ? "b" : "w";

  const roomId = uuidv4();
  const roomKey = `chess:${roomId}`;
  const roomStatus = {
    roomId,
    hostEmail,
    hostColor,
    opponentEmail: "",
    opponentColor,
    history: [startFen],
    turnIndex: 0,
    turnColor: "w",
    lastMoveFrom: "",
    lastMoveTo: "",
    isStarted: false,
    isEnd: false,
  };
  try {
    await kv.set(roomKey, JSON.stringify(roomStatus), { ex: 100, nx: true }); // 1시간 후 만료
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed to Create Room" });
  }
  return NextResponse.json({
    message: "Room Created Successfully",
    roomStatus,
  });
}
