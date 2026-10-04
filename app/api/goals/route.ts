import { NextResponse } from "next/server";
import { db } from "@/lib/mock-db";

export async function GET() {
  const goals = db.getGoals();
  return NextResponse.json({ goals });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, targetAmount, savedAmount, targetDate, icon, color } = body;

    if (!title || !targetAmount) {
      return NextResponse.json(
        { error: "Title and target amount are required" },
        { status: 400 }
      );
    }

    const newGoal = db.addGoal({
      title,
      category: category || "General",
      icon: icon || "Goal",
      targetAmount: Number(targetAmount),
      savedAmount: Number(savedAmount || 0),
      targetDate: targetDate || "Dec 2028",
      color: color || "blue",
    });

    return NextResponse.json({ success: true, goal: newGoal });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create goal" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, savedAmount } = await req.json();
    const updated = db.updateGoalProgress(id, Number(savedAmount));
    return NextResponse.json({ success: true, goal: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update goal" }, { status: 500 });
  }
}
