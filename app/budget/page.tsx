"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  Wallet,
  CreditCard,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  X,
  PieChart,
} from "lucide-react";
import "./budget.css";

export default function BudgetPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);

  // New Tx states
  const [txTitle, setTxTitle] = useState("");
  const [txAmount, setTxAmount] = useState("");
  const [txType, setTxType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [txCategory, setTxCategory] = useState("Food");

  const fetchBudgetData = async () => {
    try {
      const res = await fetch("/api/dashboard");
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetData();
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
      fetchBudgetData();
    } catch (e) {
      console.error(e);
    }
  };

  const filteredTransactions = (data?.recentTransactions || []).filter((tx: any) => {
    const matchesSearch = tx.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tx.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "ALL" || tx.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="app-container">
      <Sidebar />

      <main className="app-main-content">
        <header className="page-header">
          <div>
            <span className="eyebrow-mini">PILLAR 02: MANAGE</span>
            <h1>Budget & Spending Command Center</h1>
            <p className="header-subtitle">
              Monitor your cash flow, track expenses, and control your monthly budgets.
            </p>
          </div>

          <button className="primary-action-btn" onClick={() => setModalOpen(true)}>
            <Plus size={18} />
            Log New Transaction
          </button>
        </header>

        {/* CASH FLOW BAR */}
        <div className="budget-hero-row">
          <div className="cashflow-card income-bg">
            <div className="cf-icon">
              <ArrowUpRight size={22} />
            </div>
            <div>
              <span>OCTOBER INFLOW (INCOME)</span>
              <h2>₹{data?.summary?.totalIncome?.toLocaleString("en-IN")}</h2>
              <small>From Salary & Side Projects</small>
            </div>
          </div>

          <div className="cashflow-card expense-bg">
            <div className="cf-icon">
              <ArrowDownRight size={22} />
            </div>
            <div>
              <span>OCTOBER OUTFLOW (EXPENSES)</span>
              <h2>₹{data?.summary?.totalExpense?.toLocaleString("en-IN")}</h2>
              <small>Across 5 Budget Categories</small>
            </div>
          </div>

          <div className="cashflow-card net-bg">
            <div className="cf-icon">
              <Wallet size={22} />
            </div>
            <div>
              <span>NET MONTHLY SAVINGS</span>
              <h2>₹{( (data?.summary?.totalIncome || 0) - (data?.summary?.totalExpense || 0) ).toLocaleString("en-IN")}</h2>
              <small>{data?.summary?.savingsRate}% Savings Rate</small>
            </div>
          </div>
        </div>

        {/* BUDGET CATEGORY BREAKDOWN */}
        <div className="section-title-row" style={{ marginTop: "30px" }}>
          <h3>Category Budget Limits & Progress</h3>
        </div>

        <div className="categories-grid">
          {data?.budgets?.map((cat: any) => {
            const pct = Math.round((cat.spent / cat.allocated) * 100);
            return (
              <div className="category-card" key={cat.id}>
                <div className="cat-top">
                  <strong>{cat.name}</strong>
                  <span className={`cat-pct ${pct > 90 ? "warning" : ""}`}>{pct}% Spent</span>
                </div>

                <div className="progress-track-bg">
                  <div
                    className={`progress-fill-bar ${pct > 90 ? "warning-fill" : ""}`}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  ></div>
                </div>

                <div className="cat-foot">
                  <span>₹{cat.spent?.toLocaleString("en-IN")} spent</span>
                  <span>Limit: ₹{cat.allocated?.toLocaleString("en-IN")}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* TRANSACTIONS TABLE */}
        <div className="section-title-row" style={{ marginTop: "35px" }}>
          <h3>All Logged Transactions</h3>
        </div>

        <div className="tx-table-container">
          <div className="table-controls">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search transactions or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-buttons">
              <button
                className={`filter-btn ${typeFilter === "ALL" ? "active" : ""}`}
                onClick={() => setTypeFilter("ALL")}
              >
                All
              </button>
              <button
                className={`filter-btn ${typeFilter === "INCOME" ? "active" : ""}`}
                onClick={() => setTypeFilter("INCOME")}
              >
                Income Only
              </button>
              <button
                className={`filter-btn ${typeFilter === "EXPENSE" ? "active" : ""}`}
                onClick={() => setTypeFilter("EXPENSE")}
              >
                Expenses Only
              </button>
            </div>
          </div>

          <table className="tx-table">
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Category</th>
                <th>Date</th>
                <th>Type</th>
                <th style={{ textAlign: "right" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx: any) => (
                <tr key={tx.id}>
                  <td className="tx-title-cell">
                    <strong>{tx.title}</strong>
                    {tx.notes && <small>{tx.notes}</small>}
                  </td>
                  <td>
                    <span className="category-pill">{tx.category}</span>
                  </td>
                  <td>{tx.date}</td>
                  <td>
                    <span className={`type-badge ${tx.type.toLowerCase()}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td
                    style={{ textAlign: "right" }}
                    className={`amount-cell ${tx.type.toLowerCase()}`}
                  >
                    {tx.type === "INCOME" ? "+" : "-"}₹
                    {tx.amount?.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ADD TRANSACTION MODAL */}
        {modalOpen && (
          <div className="modal-overlay">
            <div className="modal-card">
              <div className="modal-header">
                <h3>Add New Transaction</h3>
                <button className="modal-close" onClick={() => setModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddTransaction}>
                <div className="form-group">
                  <label>Type</label>
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
                  <label>Description</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Electricity Bill"
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
                    placeholder="e.g. 3500"
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
                  Save & Update Cash Flow
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
