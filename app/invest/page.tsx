"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  TrendingUp,
  PieChart,
  Plus,
  Calculator,
  Shield,
  Layers,
  X,
  Sparkles,
} from "lucide-react";
import "./invest.css";

export default function InvestPage() {
  const [investments, setInvestments] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  // New Holding states
  const [assetName, setAssetName] = useState("");
  const [category, setCategory] = useState("Mutual Funds");
  const [investedAmount, setInvestedAmount] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [riskLevel, setRiskLevel] = useState("Moderate");
  const [monthlySIP, setMonthlySIP] = useState("5000");

  // SIP Calculator state
  const [sipMonthly, setSipMonthly] = useState(10000);
  const [sipYears, setSipYears] = useState(10);
  const [sipReturnRate, setSipReturnRate] = useState(12);

  const fetchInvestments = async () => {
    try {
      const res = await fetch("/api/investments");
      const data = await res.json();
      setInvestments(data.investments || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  const handleAddInvestment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetName || !investedAmount) return;

    const inv = parseFloat(investedAmount);
    const cur = currentValue ? parseFloat(currentValue) : inv * 1.15;
    const retPct = Math.round(((cur - inv) / inv) * 100);

    try {
      await fetch("/api/investments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assetName,
          category,
          investedAmount: inv,
          currentValue: cur,
          returnsPct: retPct,
          riskLevel,
          monthlySIP: parseFloat(monthlySIP || "0"),
        }),
      });

      setModalOpen(false);
      setAssetName("");
      setInvestedAmount("");
      setCurrentValue("");
      fetchInvestments();
    } catch (e) {
      console.error(e);
    }
  };

  // Portfolio calculations
  const totalInvested = investments.reduce((s, i) => s + i.investedAmount, 0);
  const totalCurrent = investments.reduce((s, i) => s + i.currentValue, 0);
  const totalGain = totalCurrent - totalInvested;
  const overallReturnPct = totalInvested > 0 ? ((totalGain / totalInvested) * 100).toFixed(1) : 0;
  const totalSIPMonthly = investments.reduce((s, i) => s + (i.monthlySIP || 0), 0);

  // SIP Calculator calculation formula: M * ({[1 + i]^n - 1} / i) * (1 + i)
  const i = sipReturnRate / 12 / 100;
  const n = sipYears * 12;
  const futureValue = Math.round(
    sipMonthly * (((Math.pow(1 + i, n) - 1) / i) * (1 + i))
  );
  const investedVal = sipMonthly * n;
  const wealthGained = futureValue - investedVal;

  return (
    <div className="app-container">
      <Sidebar />

      <main className="app-main-content">
        <header className="page-header">
          <div>
            <span className="eyebrow-mini">PILLAR 03: GROW</span>
            <h1>Investment & Wealth Portfolio</h1>
            <p className="header-subtitle">
              Make your money work for you through compounding and disciplined SIP investments.
            </p>
          </div>

          <button className="primary-action-btn" onClick={() => setModalOpen(true)}>
            <Plus size={18} />
            Add Investment Holding
          </button>
        </header>

        {/* PORTFOLIO STATS CARD */}
        <div className="invest-hero-card">
          <div className="portfolio-stat">
            <span>TOTAL CURRENT PORTFOLIO VALUE</span>
            <h2>₹{totalCurrent.toLocaleString("en-IN")}</h2>
            <div className="gain-badge">
              <TrendingUp size={16} />
              +{overallReturnPct}% Total Returns (+₹{totalGain.toLocaleString("en-IN")})
            </div>
          </div>

          <div className="invest-metrics-grid">
            <div className="invest-metric-item">
              <small>Invested Principal</small>
              <strong>₹{totalInvested.toLocaleString("en-IN")}</strong>
            </div>
            <div className="invest-metric-item">
              <small>Active Monthly SIPs</small>
              <strong style={{ color: "#34d399" }}>₹{totalSIPMonthly.toLocaleString("en-IN")} / mo</strong>
            </div>
            <div className="invest-metric-item">
              <small>Asset Diversification</small>
              <strong>{investments.length} Holdings</strong>
            </div>
          </div>
        </div>

        {/* HOLDINGS TABLE */}
        <div className="section-title-row" style={{ marginTop: "30px" }}>
          <h3>Your Investment Assets</h3>
        </div>

        <div className="holdings-table-card">
          <table className="holdings-table">
            <thead>
              <tr>
                <th>Asset Name</th>
                <th>Category</th>
                <th>Risk Level</th>
                <th>Monthly SIP</th>
                <th>Invested Principal</th>
                <th>Current Value</th>
                <th style={{ textAlign: "right" }}>Returns</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((inv) => (
                <tr key={inv.id}>
                  <td className="asset-name-cell">
                    <strong>{inv.assetName}</strong>
                  </td>
                  <td>
                    <span className="category-pill">{inv.category}</span>
                  </td>
                  <td>
                    <span className={`risk-tag ${inv.riskLevel.toLowerCase()}`}>
                      {inv.riskLevel} Risk
                    </span>
                  </td>
                  <td>
                    {inv.monthlySIP > 0 ? (
                      <span className="sip-pill">₹{inv.monthlySIP.toLocaleString("en-IN")}/mo</span>
                    ) : (
                      <span className="no-sip">—</span>
                    )}
                  </td>
                  <td>₹{inv.investedAmount.toLocaleString("en-IN")}</td>
                  <td>
                    <strong>₹{inv.currentValue.toLocaleString("en-IN")}</strong>
                  </td>
                  <td style={{ textAlign: "right" }} className="return-cell">
                    <span className="return-positive">+{inv.returnsPct}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SIP COMPOUNDING CALCULATOR */}
        <div className="sip-calc-card" style={{ marginTop: "35px" }}>
          <div className="sim-header">
            <Calculator size={22} className="sim-icon" />
            <div>
              <h3>SIP Compounding Calculator</h3>
              <p>See how regular monthly investments accumulate wealth over time</p>
            </div>
          </div>

          <div className="calc-controls-grid">
            <div className="calc-group">
              <label>Monthly SIP (₹): <strong>₹{sipMonthly.toLocaleString("en-IN")}</strong></label>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={sipMonthly}
                onChange={(e) => setSipMonthly(Number(e.target.value))}
                className="slider-input"
              />
            </div>

            <div className="calc-group">
              <label>Duration (Years): <strong>{sipYears} Years</strong></label>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={sipYears}
                onChange={(e) => setSipYears(Number(e.target.value))}
                className="slider-input"
              />
            </div>

            <div className="calc-group">
              <label>Expected Return Rate (%): <strong>{sipReturnRate}% CAGR</strong></label>
              <input
                type="range"
                min="6"
                max="20"
                step="0.5"
                value={sipReturnRate}
                onChange={(e) => setSipReturnRate(Number(e.target.value))}
                className="slider-input"
              />
            </div>
          </div>

          <div className="calc-summary-row">
            <div className="calc-box">
              <span>INVESTED PRINCIPAL</span>
              <h4>₹{investedVal.toLocaleString("en-IN")}</h4>
            </div>

            <div className="calc-box">
              <span>ESTIMATED GAINS</span>
              <h4 style={{ color: "#34d399" }}>+₹{wealthGained.toLocaleString("en-IN")}</h4>
            </div>

            <div className="calc-box total-box">
              <span>TOTAL FUTURE WEALTH</span>
              <h3>₹{futureValue.toLocaleString("en-IN")}</h3>
            </div>
          </div>
        </div>

        {/* ADD INVESTMENT MODAL */}
        {modalOpen && (
          <div className="modal-overlay">
            <div className="modal-card">
              <div className="modal-header">
                <h3>Add Investment Holding</h3>
                <button className="modal-close" onClick={() => setModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddInvestment}>
                <div className="form-group">
                  <label>Asset / Fund Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Axis Small Cap Fund"
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
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
                    <option value="Mutual Funds">Mutual Funds</option>
                    <option value="Equity Stocks">Equity Stocks</option>
                    <option value="Gold">Gold / SGB</option>
                    <option value="Fixed Deposit">Fixed Deposit</option>
                    <option value="Crypto">Crypto</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Invested Amount (₹)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g. 50000"
                    value={investedAmount}
                    onChange={(e) => setInvestedAmount(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Current Market Value (₹)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="Leave empty for auto estimation"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Monthly SIP (₹)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g. 5000 (or 0 for lump sum)"
                    value={monthlySIP}
                    onChange={(e) => setMonthlySIP(e.target.value)}
                  />
                </div>

                <button type="submit" className="modal-submit">
                  Save Holding To Portfolio
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
