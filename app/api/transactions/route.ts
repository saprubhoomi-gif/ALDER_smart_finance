import { NextResponse } from "next/server";
import { db } from "@/lib/mock-db";

export async function GET() {
  const transactions = db.getTransactions();
  return NextResponse.json({ transactions });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, amount, type, category, notes, date } = body;

    if (!title || !amount || !type || !category) {
      return NextResponse.json(
        { error: "Title, amount, type and category are required" },
        { status: 400 }
      );
    }

    const newTx = db.addTransaction({
      title,
      amount: Number(amount),
      type: type as "INCOME" | "EXPENSE",
      category,
      notes: notes || "",
      date: date || new Date().toISOString().split("T")[0],
    });

    return NextResponse.json({ success: true, transaction: newTx });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to log transaction" },
      { status: 500 }
    );
  }
}
