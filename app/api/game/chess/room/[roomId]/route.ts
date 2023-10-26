import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text();

  let gameName, roomId, fen, from, to, userEmail;
  try {
    const json = JSON.parse(body);
    gameName = json.gameName;
    roomId = json.roomId;
    fen = json.fen;
    from = json.from;
    to = json.to;
    userEmail = json.userEmail;
  } catch (error) {
    console.error("Invalid JSON:", error);
    return NextResponse.json({ message: "Invalid JSON format" });
  }
  const roomKey = `${gameName}:${roomId}`;

  const roomStatus: any = await kv.get(roomKey);

  const updatedRoomStatus = {
    ...roomStatus,
    history: [roomStatus.history, fen],
    turnIndex: roomStatus.turnIndex + 1,
    turnColor: roomStatus.turnColor === "w" ? "b" : "w",
    lastMoveFrom: from,
    lastMoveTo: to,
  };

  await kv.set(roomKey, JSON.stringify(updatedRoomStatus));

  const { hostEmail, hostColor, opponentColor } = updatedRoomStatus;
  const myColor = userEmail === hostEmail ? hostColor : opponentColor;

  return NextResponse.json({
    status: "success",
    message: "Update Successful",
    roomStatus: updatedRoomStatus,
    myColor,
  });
}
