import { NextResponse } from "next/server";
import { query } from "@/database/db";

export async function POST(req: Request) {
  try {
    const { email, pw, name } = await req.json();
    if (!email || !pw || !name) {
      return new NextResponse("Not Enough Arguments", { status: 400 });
    }

    const value = [email, pw, name];
    const result = await query("SELECT signup($1, $2, $3)", value);
    const message = result.rows[0].signup;

    return NextResponse.json(message);
  } catch (error) {
    console.log("[DATABASE_ERROR]", error);
    // @ts-ignore
    const errorMessage = error?.message;
    if (errorMessage === "The same email already exists.") {
      return new NextResponse(errorMessage, { status: 500 });
    } else {
      return new NextResponse("Register Failed.", { status: 500 });
    }
  }
}
