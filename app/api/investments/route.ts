import { NextResponse } from "next/server";
import { db } from "@/lib/mock-db";

export async function GET() {
  const investments = db.getInvestments();
  return NextResponse.json({ investments });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { assetName, category, investedAmount, currentValue, returnsPct, riskLevel, monthlySIP } = body;

    if (!assetName || !investedAmount) {
      return NextResponse.json(
        { error: "Asset name and invested amount are required" },
        { status: 400 }
      );
    }

    const newInv = db.addInvestment({
      assetName,
      category: category || "Mutual Funds",
      investedAmount: Number(investedAmount),
      currentValue: Number(currentValue || investedAmount),
      returnsPct: Number(returnsPct || 10.0),
      riskLevel: riskLevel || "Moderate",
      monthlySIP: Number(monthlySIP || 0),
    });

    return NextResponse.json({ success: true, investment: newInv });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add investment" }, { status: 500 });
  }
}
