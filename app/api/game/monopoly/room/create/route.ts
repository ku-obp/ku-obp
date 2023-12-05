import { kv } from "@vercel/kv";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

type MonopolyMode = {
  WinningMode: "last-standing" | "monopols" | "monopols & trains";
  // BuyingSystem: "following-order" | "card-firsts" | "everything";
  AllowDeals: boolean;
  Name: string;
  startingCash: number;
  mortageAllowed: boolean;
  turnTimer?: number;
}

export async function POST(request: Request) {
  const body = await request.text();

  let gameName, hostEmail;
  let maxParticipants: number;
  let mode: MonopolyMode;
  try {
    const json = JSON.parse(body);
    gameName = json.gameName;
    hostEmail = json.hostEmail;
    maxParticipants = json.maxParticipants as number;
    const {
      WinningMode,
      AllowDeals,
      Name,
      startingCash,
      mortageAllowed,
      turnTimer,
    } = json.mode as MonopolyMode
    mode = {
      WinningMode,
      AllowDeals,
      Name,
      startingCash,
      mortageAllowed,
      turnTimer,
    };
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
    mode
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
