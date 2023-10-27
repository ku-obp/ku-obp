import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text();

  let gameName, userEmail, roomId;
  try {
    const json = JSON.parse(body);
    gameName = json.gameName;
    userEmail = json.userEmail;
    roomId = json.roomId;
  } catch (error) {
    console.error("Invalid JSON:", error);
    return NextResponse.json({ message: "Invalid JSON format" });
  }
  const roomKey = `${gameName}:${roomId}`;

  let roomStatus;
  try {
    roomStatus = await kv.get(roomKey);
    if (!roomStatus) {
      return NextResponse.json({ status: "failed", message: "Room Not Found" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "failed", message: "Entry Error" });
  }

  const { hostEmail, hostColor, opponentEmail, opponentColor }: any =
    roomStatus;

  const isHost = hostEmail === userEmail;

  if (!isHost && !opponentEmail) {
    roomStatus = { ...roomStatus, opponentEmail: userEmail };
    try {
      await kv.set(roomKey, JSON.stringify(roomStatus));
    } catch (error) {
      console.log(error);
      return NextResponse.json({ status: "failed", message: "Entry Error" });
    }
  } else if (opponentEmail) {
    return NextResponse.json({ status: "failed", message: "Room Is Full" });
  }

  const myColor = userEmail === hostEmail ? hostColor : opponentColor;

  return NextResponse.json({
    status: "success",
    message: "Entry Successful",
    roomStatus,
    myColor,
  });
}
