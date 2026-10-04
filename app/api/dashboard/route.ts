import { NextResponse } from "next/server";
import { db } from "@/lib/mock-db";

export async function GET() {
  const user = db.getUser();
  const goals = db.getGoals();
  const transactions = db.getTransactions();
  const investments = db.getInvestments();
  const budgets = db.getBudgets();

  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalInvested = investments.reduce(
    (sum, i) => sum + i.currentValue,
    0
  );

  return NextResponse.json({
    user,
    summary: {
      totalBalance: user.totalBalance,
      monthlySalary: user.monthlySalary,
      totalIncome,
      totalExpense,
      totalInvested,
      savingsRate: Math.round(((totalIncome - totalExpense) / (totalIncome || 1)) * 100),
      financialHealthScore: user.financialScore,
    },
    goals,
    recentTransactions: transactions.slice(0, 5),
    investmentsPreview: investments,
    budgets,
  });
}
