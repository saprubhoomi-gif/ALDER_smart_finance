"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import {
  TrendingUp,
  Wallet,
  CreditCard,
  PiggyBank,
  Plus,
  ArrowRight,
  Goal as GoalIcon,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  X,
  RefreshCw,
} from "lucide-react";
import "./dashboard.css";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Form states for quick transaction add
  const [txTitle, setTxTitle] = useState("");
  const [txAmount, setTxAmount] = useState("");
  const [txType, setTxType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [txCategory, setTxCategory] = useState("Food");

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dashboard");
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error("Dashboard fetch error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txTitle || !txAmount) return;

    try {
      await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: txTitle,
          amount: parseFloat(txAmount),
          type: txType,
          category: txCategory,
        }),
      });

      setModalOpen(false);
      setTxTitle("");
      setTxAmount("");
      fetchDashboard();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="app-container">
      <Sidebar />

      <main className="app-main-content">
        {/* TOP BAR */}
        <header className="dashboard-header">
          <div>
            <span className="eyebrow-mini">COMMAND CENTER</span>
            <h1>Good morning, Aditya 👋</h1>
            <p className="header-subtitle">
              Here is your financial status overview across all four pillars.
            </p>
          </div>

          <div className="header-actions">
            <button className="quick-add-btn" onClick={() => setModalOpen(true)}>
              <Plus size={18} />
              Quick Log Entry
            </button>
          </div>
        </header>

        {loading ? (
          <div className="loading-state">
            <RefreshCw size={24} className="spin-icon" />
            <span>Updating your financial roadmap...</span>
          </div>
        ) : (
          <>
            {/* OVERVIEW HERO CARDS */}
            <div className="dashboard-overview-grid">
              <div className="main-balance-card">
                <div className="balance-header">
                  <div>
                    <span>TOTAL LIQUID BALANCE</span>
                    <h2>₹{data?.summary?.totalBalance?.toLocaleString("en-IN")}</h2>
                  </div>
                  <div className="networth-badge">
                    <TrendingUp size={16} />
                    +12.8% YoY
                  </div>
                </div>

                <div className="balance-breakdown">
                  <div>
                    <small>Monthly Salary</small>
                    <strong>₹{data?.user?.monthlySalary?.toLocaleString("en-IN")}</strong>
                  </div>
                  <div>
                    <small>Target Savings Rate</small>
                    <strong>{data?.summary?.savingsRate}%</strong>
                  </div>
                  <div>
                    <small>Financial Score</small>
                    <strong style={{ color: "#34d399" }}>{data?.summary?.financialHealthScore}/100</strong>
                  </div>
                </div>
              </div>

              <div className="metric-cards-col">
                <div className="metric-card income-theme">
                  <div className="metric-icon">
                    <Wallet size={20} />
                  </div>
                  <div>
                    <span>This Month Income</span>
                    <strong>₹{data?.summary?.totalIncome?.toLocaleString("en-IN")}</strong>
                  </div>
                </div>

                <div className="metric-card spending-theme">
                  <div className="metric-icon">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <span>This Month Expense</span>
                    <strong>₹{data?.summary?.totalExpense?.toLocaleString("en-IN")}</strong>
                  </div>
                </div>

                <div className="metric-card saving-theme">
                  <div className="metric-icon">
                    <PiggyBank size={20} />
                  </div>
                  <div>
                    <span>Invested Assets</span>
                    <strong>₹{data?.summary?.totalInvested?.toLocaleString("en-IN")}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* AI RECOMMENDATION BANNER */}
            <div className="ai-insight-banner">
              <div className="ai-icon">
                <Sparkles size={20} />
              </div>
              <div className="ai-content">
                <h4>AI Financial Insight: Potential ₹5,000 Step-up Savings</h4>
                <p>
                  Based on your current ₹{data?.summary?.totalIncome?.toLocaleString("en-IN")} income, increasing your Index Fund SIP by 5% will accelerate your "Buy a Home" goal by 14 months.
                </p>
              </div>
              <Link href="/insights" className="ai-action-btn">
                View Full Analysis
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* MAIN TWO-COLUMN DASHBOARD */}
            <div className="dashboard-content-grid">
              {/* LEFT COLUMN: ACTIVE GOALS */}
              <div className="dash-section-card">
                <div className="card-top-row">
                  <div>
                    <span className="small-label">PILLAR 01: PLAN</span>
                    <h3>Active Financial Goals</h3>
                  </div>
                  <Link href="/goals" className="section-link">
                    Manage Goals
                    <ChevronRight size={16} />
                  </Link>
                </div>

                <div className="dash-goals-list">
                  {data?.goals?.map((goal: any) => {
                    const pct = Math.round((goal.savedAmount / goal.targetAmount) * 100);
                    return (
                      <div className="dash-goal-row" key={goal.id}>
                        <div className="goal-row-icon">
                          <GoalIcon size={18} />
                        </div>
                        <div className="goal-row-main">
                          <div className="goal-title-flex">
                            <strong>{goal.title}</strong>
                            <span className="goal-pct">{pct}% Target</span>
                          </div>

                          <div className="progress-track-bg">
                            <div
                              className="progress-fill-bar"
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            ></div>
                          </div>

                          <div className="goal-val-row">
                            <span>₹{goal.savedAmount?.toLocaleString("en-IN")} saved</span>
                            <span>Target: ₹{goal.targetAmount?.toLocaleString("en-IN")} ({goal.targetDate})</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT COLUMN: RECENT TRANSACTIONS & BUDGET */}
              <div className="dash-section-card">
                <div className="card-top-row">
                  <div>
                    <span className="small-label">PILLAR 02: MANAGE</span>
                    <h3>Recent Transactions</h3>
                  </div>
                  <Link href="/budget" className="section-link">
                    View Budget
                    <ChevronRight size={16} />
                  </Link>
                </div>

                <div className="recent-tx-list">
                  {data?.recentTransactions?.map((tx: any) => (
                    <div className="tx-item" key={tx.id}>
                      <div
                        className={`tx-badge ${
                          tx.type === "INCOME" ? "income-badge" : "expense-badge"
                        }`}
                      >
                        {tx.type === "INCOME" ? "+" : "-"}
                      </div>
                      <div className="tx-details">
                        <strong>{tx.title}</strong>
                        <small>{tx.category} • {tx.date}</small>
                      </div>
                      <div
                        className={`tx-amount ${
                          tx.type === "INCOME" ? "positive" : "negative"
                        }`}
                      >
                        {tx.type === "INCOME" ? "+" : "-"}₹
                        {tx.amount?.toLocaleString("en-IN")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* MODAL FOR QUICK ENTRY */}
        {modalOpen && (
          <div className="modal-overlay">
            <div className="modal-card">
              <div className="modal-header">
                <h3>Quick Transaction Log</h3>
                <button
                  className="modal-close"
                  onClick={() => setModalOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddTransaction}>
                <div className="form-group">
                  <label>Transaction Type</label>
                  <select
                    className="form-select"
                    value={txType}
                    onChange={(e) => setTxType(e.target.value as any)}
                  >
                    <option value="EXPENSE">Expense</option>
                    <option value="INCOME">Income</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Title / Description</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Supermarket Grocery"
                    value={txTitle}
                    onChange={(e) => setTxTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Amount (₹)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g. 2500"
                    value={txAmount}
                    onChange={(e) => setTxAmount(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    className="form-select"
                    value={txCategory}
                    onChange={(e) => setTxCategory(e.target.value)}
                  >
                    <option value="Housing">Housing</option>
                    <option value="Food">Food & Dining</option>
                    <option value="Investment">Investment / SIP</option>
                    <option value="Utilities">Utilities & Bills</option>
                    <option value="Salary">Salary / Bonus</option>
                    <option value="Entertainment">Entertainment</option>
                  </select>
                </div>

                <button type="submit" className="modal-submit">
                  Save Transaction & Update Balance
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
