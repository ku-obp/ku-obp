import { NextResponse } from "next/server";
import { query } from "@/database/db";

export async function POST(req: Request) {
  try {
    const { id, pw } = await req.json();
    if (!id || !pw) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const result = await query("SELECT * FROM signin($1, $2)", [id, pw]);
    const users = result.rows[0];

    return NextResponse.json(users);
  } catch (error) {
    console.log("[DATABASE_ERROR]", error);
    return new NextResponse("Login Failed. Check ID and PW again.", {
      status: 500,
    });
  }
}
