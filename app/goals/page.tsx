"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  Goal as GoalIcon,
  Home,
  GraduationCap,
  ShieldCheck,
  PiggyBank,
  Plus,
  Calculator,
  X,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import "./goals.css";

export default function GoalsPage() {
  const [goals, setGoals] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [addFundsModalOpen, setAddFundsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<any>(null);
  const [addedAmount, setAddedAmount] = useState("");

  // Form states for new goal
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Home");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("Dec 2028");

  // Simulator state
  const [simMonthly, setSimMonthly] = useState(15000);
  const [simTarget, setSimTarget] = useState(2000000);

  const fetchGoals = async () => {
    try {
      const res = await fetch("/api/goals");
      const data = await res.json();
      setGoals(data.goals || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !targetAmount) return;

    try {
      await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          targetAmount: parseFloat(targetAmount),
          savedAmount: 0,
          targetDate,
        }),
      });

      setModalOpen(false);
      setTitle("");
      setTargetAmount("");
      fetchGoals();
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateFunds = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGoal || !addedAmount) return;

    const newSaved = selectedGoal.savedAmount + parseFloat(addedAmount);

    try {
      await fetch("/api/goals", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedGoal.id,
          savedAmount: newSaved,
        }),
      });

      setAddFundsModalOpen(false);
      setSelectedGoal(null);
      setAddedAmount("");
      fetchGoals();
    } catch (e) {
      console.error(e);
    }
  };

  // Calculator logic
  const monthsNeeded = Math.max(1, Math.ceil(simTarget / (simMonthly || 1)));
  const yearsNeeded = (monthsNeeded / 12).toFixed(1);

  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const overallPct = Math.round((totalSaved / (totalTarget || 1)) * 100);

  return (
    <div className="app-container">
      <Sidebar />

      <main className="app-main-content">
        <header className="page-header">
          <div>
            <span className="eyebrow-mini">PILLAR 01: PLAN</span>
            <h1>Financial Roadmap & Goals</h1>
            <p className="header-subtitle">
              Turn your long-term aspirations into achievable saving milestones.
            </p>
          </div>

          <button className="primary-action-btn" onClick={() => setModalOpen(true)}>
            <Plus size={18} />
            Create New Goal
          </button>
        </header>

        {/* OVERALL ROADMAP PROGRESS CARDS */}
        <div className="goals-summary-card">
          <div className="summary-left">
            <span>COMBINED GOALS PROGRESS</span>
            <h2>
              ₹{totalSaved.toLocaleString("en-IN")}{" "}
              <small>/ ₹{totalTarget.toLocaleString("en-IN")}</small>
            </h2>

            <div className="progress-track-large">
              <div
                className="progress-fill-large"
                style={{ width: `${Math.min(overallPct, 100)}%` }}
              ></div>
            </div>
            <div className="summary-foot">
              <span>{overallPct}% Achieved overall</span>
              <span>{goals.length} Active Financial Milestones</span>
            </div>
          </div>

          <div className="summary-right">
            <div className="stat-box">
              <Sparkles size={20} className="stat-icon" />
              <div>
                <small>Est. Completion</small>
                <strong>Dec 2028</strong>
              </div>
            </div>

            <div className="stat-box">
              <TrendingUp size={20} className="stat-icon" />
              <div>
                <small>Monthly Goal Contribution</small>
                <strong>₹25,000 / mo</strong>
              </div>
            </div>
          </div>
        </div>

        {/* GOALS GRID */}
        <div className="section-title-row">
          <h3>Your Active Milestones</h3>
        </div>

        <div className="goals-grid">
          {goals.map((goal) => {
            const pct = Math.round((goal.savedAmount / goal.targetAmount) * 100);
            const remaining = goal.targetAmount - goal.savedAmount;

            return (
              <div className="goal-card" key={goal.id}>
                <div className="goal-card-top">
                  <div className="goal-badge">{goal.category}</div>
                  <span className="target-date">Due: {goal.targetDate}</span>
                </div>

                <div className="goal-card-body">
                  <h4>{goal.title}</h4>
                  <div className="goal-amount-display">
                    <strong>₹{goal.savedAmount?.toLocaleString("en-IN")}</strong>
                    <small>Target: ₹{goal.targetAmount?.toLocaleString("en-IN")}</small>
                  </div>

                  <div className="progress-track-bg">
                    <div
                      className="progress-fill-bar"
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    ></div>
                  </div>

                  <div className="goal-card-foot">
                    <span>{pct}% Saved</span>
                    <span>₹{remaining > 0 ? remaining.toLocaleString("en-IN") : 0} left</span>
                  </div>
                </div>

                <button
                  className="add-money-btn"
                  onClick={() => {
                    setSelectedGoal(goal);
                    setAddFundsModalOpen(true);
                  }}
                >
                  <Plus size={16} />
                  Add Funds To Goal
                </button>
              </div>
            );
          })}
        </div>

        {/* GOAL TIMELINE SIMULATOR */}
        <div className="simulator-card">
          <div className="sim-header">
            <Calculator size={22} className="sim-icon" />
            <div>
              <h3>Interactive Goal Timeline Simulator</h3>
              <p>Estimate how fast you will reach your target based on monthly savings</p>
            </div>
          </div>

          <div className="sim-controls-grid">
            <div className="sim-input-group">
              <label>Monthly Contribution (₹): <strong>₹{simMonthly.toLocaleString("en-IN")}</strong></label>
              <input
                type="range"
                min="5000"
                max="100000"
                step="5000"
                value={simMonthly}
                onChange={(e) => setSimMonthly(Number(e.target.value))}
                className="slider-input"
              />
            </div>

            <div className="sim-input-group">
              <label>Target Goal Amount (₹): <strong>₹{simTarget.toLocaleString("en-IN")}</strong></label>
              <input
                type="range"
                min="100000"
                max="10000000"
                step="100000"
                value={simTarget}
                onChange={(e) => setSimTarget(Number(e.target.value))}
                className="slider-input"
              />
            </div>
          </div>

          <div className="sim-result-box">
            <div>
              <span>ESTIMATED TIME TO ACHIEVE</span>
              <h3>{yearsNeeded} Years ({monthsNeeded} Months)</h3>
            </div>
            <p>
              By investing ₹{simMonthly.toLocaleString("en-IN")}/month, your ₹{simTarget.toLocaleString("en-IN")} target will be fully funded in ~{yearsNeeded} years.
            </p>
          </div>
        </div>

        {/* CREATE GOAL MODAL */}
        {modalOpen && (
          <div className="modal-overlay">
            <div className="modal-card">
              <div className="modal-header">
                <h3>Create New Financial Goal</h3>
                <button className="modal-close" onClick={() => setModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateGoal}>
                <div className="form-group">
                  <label>Goal Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Electric Vehicle Purchase"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Home">Home / Real Estate</option>
                    <option value="Education">Education</option>
                    <option value="Emergency">Emergency Fund</option>
                    <option value="Retirement">Retirement</option>
                    <option value="Travel">Travel & Lifestyle</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Target Amount (₹)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g. 500000"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Target Date</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Dec 2028"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                  />
                </div>

                <button type="submit" className="modal-submit">
                  Save Goal To Roadmap
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ADD FUNDS MODAL */}
        {addFundsModalOpen && selectedGoal && (
          <div className="modal-overlay">
            <div className="modal-card">
              <div className="modal-header">
                <h3>Add Contribution to {selectedGoal.title}</h3>
                <button
                  className="modal-close"
                  onClick={() => setAddFundsModalOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdateFunds}>
                <div className="form-group">
                  <label>Current Saved: ₹{selectedGoal.savedAmount?.toLocaleString("en-IN")}</label>
                </div>

                <div className="form-group">
                  <label>Additional Amount (₹)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g. 10000"
                    value={addedAmount}
                    onChange={(e) => setAddedAmount(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="modal-submit">
                  Update Goal Savings
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
