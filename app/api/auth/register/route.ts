import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
// npm i --save-dev @types/bcrypt

export async function POST(request: Request) {
  try {
    // validate email and password
    const { email, password, name } = await request.json();
    const hashedPassword = await hash(password, 10);

    const checkEmail =
      await sql`SELECT EXISTS (SELECT 1 FROM users WHERE email = ${email})`;
    if (checkEmail.rows[0].exists) {
      return NextResponse.json({
        errorCode: "email",
        message: "Register failed. The email already exists.",
      });
    }

    const checkName =
      await sql`SELECT EXISTS (SELECT 1 FROM users WHERE name = ${name})`;
    if (checkName.rows[0].exists) {
      return NextResponse.json({
        errorCode: "name",
        message: "Register failed. The name already exists.",
      });
    }

    const response =
      await sql`INSERT INTO users (email, password, name) VALUES (${email}, ${hashedPassword}, ${name})`;
    console.log(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

  return NextResponse.json({ message: "success" });
}
