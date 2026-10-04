"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import "./login.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("aditya@alder.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Redirecting to demo dashboard...");
      setTimeout(() => router.push("/dashboard"), 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Navbar />

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <Sparkles size={22} />
            </div>
            <h2>Welcome Back to ALDER</h2>
            <p>Log in to access your financial command center</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
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
              <div className="label-row">
                <label>Password</label>
                <a href="#" className="forgot-link">Forgot?</a>
              </div>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Logging in..." : "Enter Command Center"}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-divider">
            <span>or demo access</span>
          </div>

          <button
            type="button"
            className="demo-btn"
            onClick={() => router.push("/dashboard")}
          >
            Instant Demo Sign In (Aditya Sharma)
          </button>

          <div className="auth-footer">
            Don't have an account?{" "}
            <Link href="/register">Get Started Free</Link>
          </div>

          <div className="auth-security-notice">
            <ShieldCheck size={14} />
            Encrypted & Secure 256-bit Connection
          </div>
        </div>
      </div>
    </div>
  );
}
