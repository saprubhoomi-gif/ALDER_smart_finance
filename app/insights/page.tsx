"use client";

import Sidebar from "@/components/Sidebar";
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  PieChart,
  Wallet,
} from "lucide-react";
import "./insights.css";

export default function InsightsPage() {
  return (
    <div className="app-container">
      <Sidebar />

      <main className="app-main-content">
        <header className="page-header">
          <div>
            <span className="eyebrow-mini">AI FINANCIAL ENGINE</span>
            <h1>AI Financial Health & Insights</h1>
            <p className="header-subtitle">
              Personalized algorithmic diagnostics to optimize your saving, tax, and investment growth.
            </p>
          </div>
        </header>

        {/* HEALTH SCORE HERO */}
        <div className="insights-hero-card">
          <div className="score-circle-container">
            <div className="score-circle">
              <span className="score-num">84</span>
              <span className="score-max">/ 100</span>
            </div>
            <div className="score-label">EXCELLENT HEALTH</div>
          </div>

          <div className="score-details">
            <h2>Your Financial Health is Strong 👍</h2>
            <p>
              Your saving rate is 38.8% (above the benchmark 30%), emergency fund covers 5.8 months of expenses, and high-interest debt is 0%.
            </p>

            <div className="pillar-scores-grid">
              <div className="pillar-score-item">
                <span>PLAN (Goals)</span>
                <strong>88%</strong>
              </div>
              <div className="pillar-score-item">
                <span>MANAGE (Cash Flow)</span>
                <strong>80%</strong>
              </div>
              <div className="pillar-score-item">
                <span>GROW (Investing)</span>
                <strong>82%</strong>
              </div>
              <div className="pillar-score-item">
                <span>LEARN (Peer Match)</span>
                <strong>90%</strong>
              </div>
            </div>
          </div>
        </div>

        {/* RECOMMENDATION CARDS */}
        <div className="section-title-row" style={{ marginTop: "30px" }}>
          <h3>Smart Actionable Recommendations</h3>
        </div>

        <div className="insights-recommendations-grid">
          <div className="rec-card priority-high">
            <div className="rec-header">
              <div className="rec-icon high-icon">
                <AlertTriangle size={20} />
              </div>
              <div>
                <span className="rec-tag">PRIORITY ACTION</span>
                <h4>Complete Emergency Fund Buffer</h4>
              </div>
            </div>
            <p>
              You currently have ₹4,50,000 saved for emergency buffer against your ₹5,00,000 target. Adding ₹50,000 completes 6 full months of living expenses.
            </p>
            <div className="rec-footer">
              <span>Impact: High Security</span>
              <button className="rec-action-btn">Top Up ₹50,000</button>
            </div>
          </div>

          <div className="rec-card priority-medium">
            <div className="rec-header">
              <div className="rec-icon medium-icon">
                <Sparkles size={20} />
              </div>
              <div>
                <span className="rec-tag">TAX OPTIMIZATION</span>
                <h4>Claim ₹25,000 Tax Deduction (Sec 80C)</h4>
              </div>
            </div>
            <p>
              You have utilized ₹1.25L out of ₹1.50L under Section 80C. Investing ₹25,000 in an ELSS Mutual Fund will save you up to ₹7,800 in income tax.
            </p>
            <div className="rec-footer">
              <span>Save ₹7,800 Tax</span>
              <button className="rec-action-btn">Explore ELSS Funds</button>
            </div>
          </div>

          <div className="rec-card priority-green">
            <div className="rec-header">
              <div className="rec-icon green-icon">
                <TrendingUp size={20} />
              </div>
              <div>
                <span className="rec-tag">WEALTH STEP-UP</span>
                <h4>Annual 10% SIP Step-Up Strategy</h4>
              </div>
            </div>
            <p>
              Stepping up your monthly SIP by 10% annually (from ₹20,000 to ₹22,000) will yield an additional ₹24.5 Lakhs by 2036.
            </p>
            <div className="rec-footer">
              <span>Accelerate Goals</span>
              <button className="rec-action-btn">Enable Auto Step-Up</button>
            </div>
          </div>

          <div className="rec-card priority-green">
            <div className="rec-header">
              <div className="rec-icon green-icon">
                <ShieldCheck size={20} />
              </div>
              <div>
                <span className="rec-tag">DEBT HEALTH</span>
                <h4>Zero High-Interest Credit Debt</h4>
              </div>
            </div>
            <p>
              You carry 0% credit card roll-over balance. Maintaining a 100% full payment habit protects your CIBIL score above 780+.
            </p>
            <div className="rec-footer">
              <span>Status: Optimal</span>
              <span className="verified-text"><CheckCircle2 size={16} /> Verified</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
