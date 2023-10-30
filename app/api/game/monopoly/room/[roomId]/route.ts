import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text();

  let gameName, roomId, commandType, args, userEmail;
  try {
    const json = JSON.parse(body);
    gameName = json.gameName;
    roomId = json.roomId;
    commandType = json.commandType;
    args = json.args;
    userEmail = json.userEmail;
  } catch (error) {
    console.error("Invalid JSON:", error);
    return NextResponse.json({ message: "Invalid JSON format" });
  }
  const roomKey = `${gameName}:${roomId}`;
  const roomTrajectoriesKey = `${gameName}:${roomId}:trajectories`;
  const roomStatus: any = await kv.get(roomKey);
  const roomTrajectories: any = await kv.get(roomTrajectoriesKey);

  const doCommand: {[cmdKey: string]: (args?: any) => typeof roomStatus} = {
    "diceResult": (args: [number, number]) => {
        // ...
        return {
            ...roomStatus,
            // ...
        };
    },
    "arrest": () => {
        // ...
        return {
            ...roomStatus,
            // ...
        };
    },

  }
  const updatedRoomStatus = doCommand[commandType](args)
  const updatedRoomTrajectories = [
    ...roomTrajectories,
    updatedRoomStatus,
  ]

  await kv.set(roomKey, JSON.stringify(updatedRoomStatus));
  await kv.set(roomTrajectoriesKey, JSON.stringify(updatedRoomTrajectories));

  const result = await kv.get(roomKey);
  console.log(result);

  return NextResponse.json({
    status: "success",
    message: "Update Successful",
    roomStatus: updatedRoomStatus,
  });
}   

export async function PATCH(request: Request) {
  const body = await request.text();

  let gameName, roomId, userEmail;
  try {
    const json = JSON.parse(body);
    gameName = json.gameName;
    roomId = json.roomId;
    userEmail = json.userEmail;
  } catch (error) {
    console.error("Invalid JSON:", error);
    return NextResponse.json({ message: "Invalid JSON format" });
  }

  const roomKey = `${gameName}:${roomId}`;
  const roomStatus: any = await kv.get(roomKey);

  const result = await kv.get(roomKey);
  console.log(result);

  return NextResponse.json({
    status: "success",
    message: "Update Successful",
    roomStatus,
  });
}
