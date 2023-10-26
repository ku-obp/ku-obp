import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

// const roomStatus = {
//   roomId,
//   hostEmail,
//   hostColor,
//   opponentEmail: "",
//   opponentColor,
//   history: [startFen],
//   turnIndex: 0,
//   turnColor: "w",
//   lastMoveFrom: "",
//   lastMoveTo: "",
//   isStarted: false,
//   isEnd: false,
// };

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

  let myColor;
  const isHost = hostEmail === userEmail;
  const isOpponent = opponentEmail === userEmail;

  // 1. 호스트인 경우
  if (isHost) {
    myColor = hostColor;
  }

  // 2. 호스트가 아니면서 opponent가 비어있는 경우 opponent에 배정
  else if (!isHost && !opponentEmail) {
    myColor = opponentColor;
    roomStatus = { ...roomStatus, opponentEmail: userEmail };
    try {
      await kv.set(roomKey, JSON.stringify(roomStatus));
    } catch (error) {
      console.log(error);
      return NextResponse.json({ status: "failed", message: "Entry Error" });
    }
  }

  // 3. 호스트가 아니면서 opponent가 존재하는데 user가 그 opponent인 경우
  else if (isOpponent) {
    myColor = opponentColor;
  }

  // 4. 호스트가 아니면서 opponent가 존재하는데 user가 그 opponent가 아닌 경우
  else {
    return NextResponse.json({ status: "failed", message: "Room Is Full" });
  }

  return NextResponse.json({
    status: "success",
    message: "Entry Successful",
    roomStatus,
    myColor,
  });
}
