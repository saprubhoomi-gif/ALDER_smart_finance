"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, ArrowRight, Menu, X, User } from "lucide-react";
import "@/app/page.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="logo">
          <span className="logo-mark">
            <Sparkles size={18} />
          </span>
          <span>ALDER</span>
        </Link>

        <div className={`nav-links ${menuOpen ? "mobile-open" : ""}`}>
          <Link
            href="/dashboard"
            className={pathname === "/dashboard" ? "active-link" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            href="/goals"
            className={pathname === "/goals" ? "active-link" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Goals (Plan)
          </Link>

          <Link
            href="/budget"
            className={pathname === "/budget" ? "active-link" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Budget (Manage)
          </Link>

          <Link
            href="/invest"
            className={pathname === "/invest" ? "active-link" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Invest (Grow)
          </Link>

          <Link
            href="/community"
            className={pathname === "/community" ? "active-link" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Community (Learn)
          </Link>

          <Link
            href="/insights"
            className={pathname === "/insights" ? "active-link" : ""}
            onClick={() => setMenuOpen(false)}
          >
            AI Insights
          </Link>

          {!isAuthPage && (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                style={{ marginLeft: "10px" }}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="nav-button"
                onClick={() => setMenuOpen(false)}
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
            </>
          )}
        </div>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
}
