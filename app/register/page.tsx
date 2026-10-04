"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Lock, Mail, User, Wallet, Goal } from "lucide-react";
import Navbar from "@/components/Navbar";
import "../login/login.css";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [salary, setSalary] = useState("85000");
  const [primaryGoal, setPrimaryGoal] = useState("Buy a Home");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, monthlySalary: salary }),
      });
      router.push("/dashboard");
    } catch (err) {
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Navbar />

      <div className="auth-container">
        <div className="auth-card" style={{ maxWidth: "480px" }}>
          <div className="auth-header">
            <div className="auth-logo">
              <Sparkles size={22} />
            </div>
            <h2>Build Your ALDER Financial Plan</h2>
            <p>Start tracking, planning and learning in under 2 minutes</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aditya Sharma"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Create Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="input-group">
                <label>Monthly Salary (₹)</label>
                <div className="input-wrapper">
                  <Wallet size={18} className="input-icon" />
                  <input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="85000"
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Primary Goal</label>
                <div className="input-wrapper">
                  <Goal size={18} className="input-icon" />
                  <select
                    value={primaryGoal}
                    onChange={(e) => setPrimaryGoal(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "13px 14px 13px 44px",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  >
                    <option value="Buy a Home">Buy a Home</option>
                    <option value="Higher Education">Higher Education</option>
                    <option value="Emergency Fund">Emergency Fund</option>
                    <option value="Retirement">Retirement</option>
                  </select>
                </div>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Creating Plan..." : "Create My Account"}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-footer">
            Already have an account? <Link href="/login">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
