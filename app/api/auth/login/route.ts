import { NextResponse } from "next/server";
import { db } from "@/lib/mock-db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = db.getUser();
    return NextResponse.json({
      success: true,
      user,
      token: "demo-jwt-token-123456",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid login credentials" },
      { status: 500 }
    );
  }
}
