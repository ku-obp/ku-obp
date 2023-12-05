import { kv } from "@vercel/kv";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const body = await request.text();

  let gameName, hostEmail;
  let maxParticipants: number;
  try {
    const json = JSON.parse(body);
    gameName = json.gameName;
    hostEmail = json.hostEmail;
    maxParticipants = json.maxParticipants as number;
  } catch (error) {
    console.error("Invalid JSON:", error);
    return NextResponse.json({ message: "Invalid JSON format" });
  }

  const roomId = uuidv4();
  const roomKey = `${gameName}:${roomId}`;
  const roomStatus = {
    roomID: roomId,
    size: 1,
    maxSize: 1 + maxParticipants,
    host: hostEmail,
    guests: [] as string[],
  };

  try {
    await kv.set(roomKey, JSON.stringify(roomStatus), {
      ex: 600,
      nx: true,
    }); // 20분 후 만료
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed to Create Room" });
  }

  return NextResponse.json({
    message: "Room Created Successfully",
    roomStatus,
  });
}
