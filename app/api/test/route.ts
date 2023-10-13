import { NextResponse } from "next/server";

import { query } from "@/database/db";

export async function GET(req: Request) {
  try {
    const res = await query("SELECT * FROM users");
    const users = res.rows[0];

    return NextResponse.json(users);
  } catch (error) {
    console.log("[DATABASE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
