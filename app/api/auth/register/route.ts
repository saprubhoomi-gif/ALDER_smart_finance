import { NextResponse } from "next/server";
import { db } from "@/lib/mock-db";

export async function POST(req: Request) {
  try {
    const { name, email, password, monthlySalary } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }

    const user = db.getUser();
    if (name) user.name = name;
    if (email) user.email = email;
    if (monthlySalary) user.monthlySalary = Number(monthlySalary);

    return NextResponse.json({
      success: true,
      user,
      token: "demo-jwt-token-newuser",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
