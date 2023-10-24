import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const data = await kv.hgetall("user:me");
    console.log(data);
    return NextResponse.json({ message: "success", data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}
