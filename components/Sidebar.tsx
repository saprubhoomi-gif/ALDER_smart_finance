"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Goal,
  Wallet,
  TrendingUp,
  Users,
  Sparkles,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Goals (PLAN)", href: "/goals", icon: Goal },
    { name: "Budget (MANAGE)", href: "/budget", icon: Wallet },
    { name: "Invest (GROW)", href: "/invest", icon: TrendingUp },
    { name: "Community (LEARN)", href: "/community", icon: Users },
    { name: "AI Insights", href: "/insights", icon: Sparkles },
  ];

  return (
    <aside className="app-sidebar">
      <div className="sidebar-top">
        <Link href="/" className="logo">
          <span className="logo-mark">
            <Sparkles size={18} />
          </span>
          <span>ALDER</span>
        </Link>
      </div>

      <nav className="sidebar-menu">
        <span className="sidebar-section-title">COMMAND CENTER</span>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive ? "active" : ""}`}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile-badge">
          <div className="profile-avatar">AS</div>
          <div className="profile-info">
            <strong>Aditya Sharma</strong>
            <small>aditya@alder.com</small>
          </div>
        </div>
        <Link href="/" className="sidebar-logout">
          <LogOut size={16} />
          <span>Exit App</span>
        </Link>
      </div>
    </aside>
  );
}
