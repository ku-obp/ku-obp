import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { query } from "@/database/db";
// npm i --save-dev @types/bcrypt

export async function POST(request: Request) {
  try {
    // validate email and password
    const { email, password, name } = await request.json();
    const hashedPassword = await hash(password, 10);

    const checkEmail = await query(
      "SELECT EXISTS (SELECT 1 FROM users WHERE email = $1)",
      [email]
    );

    if (checkEmail.rows[0].exists) {
      return NextResponse.json({
        errorCode: "email",
        message: "Register failed. The email already exists.",
      });
    }

    const checkName = await query(
      "SELECT EXISTS (SELECT 1 FROM users WHERE name = $1)",
      [name]
    );

    if (checkName.rows[0].exists) {
      return NextResponse.json({
        errorCode: "name",
        message: "Register failed. The name already exists.",
      });
    }

    const response = await query(
      "INSERT INTO users (email, password, name) VALUES ($1, $2, $3)",
      [email, hashedPassword, name]
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }

  return NextResponse.json({ message: "success" });
}
