import { NextResponse } from "next/server";
import { query } from "@/database/db";

export async function POST(req: Request) {
  try {
    const { email, pw } = await req.json();
    if (!email || !pw) {
      return new NextResponse("Not Enough Arguments", { status: 400 });
    }

    const value = [email, pw];
    const result = await query("SELECT * FROM signin($1, $2)", value);
    const users = result.rows[0];

    return NextResponse.json(users);
  } catch (error) {
    console.log("[DATABASE_ERROR]", error);
    return new NextResponse("Login Failed", { status: 500 });
  }
}
