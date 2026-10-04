"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Goal,
  GraduationCap,
  Home,
  LineChart,
  Menu,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  X,
} from "lucide-react";

import "./page.css";

const pillars = [
  {
    number: "01",
    icon: Goal,
    title: "PLAN",
    subtitle: "Turn dreams into goals",
    description:
      "Set meaningful financial goals and get a clear roadmap showing how much you need to save and when.",
    color: "blue",
    link: "/goals",
  },
  {
    number: "02",
    icon: Wallet,
    title: "MANAGE",
    subtitle: "Know where your money goes",
    description:
      "Track income, expenses, bills, subscriptions, savings and cash flow from one simple dashboard.",
    color: "teal",
    link: "/budget",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "GROW",
    subtitle: "Make your money work",
    description:
      "Explore investment concepts, understand risk and time horizon, and track your investment journey.",
    color: "purple",
    link: "/invest",
  },
  {
    number: "04",
    icon: Users,
    title: "LEARN",
    subtitle: "Learn from people like you",
    description:
      "Discover anonymous financial journeys, strategies, mistakes and lessons from people with similar goals.",
    color: "orange",
    link: "/community",
  },
];

const goals = [
  {
    icon: Home,
    title: "Buy a Home",
    saved: "₹8.4L",
    target: "₹20L",
    progress: 42,
  },
  {
    icon: GraduationCap,
    title: "Higher Education",
    saved: "₹3.2L",
    target: "₹8L",
    progress: 40,
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="site">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="logo">
            <span className="logo-mark">
              <Sparkles size={18} />
            </span>
            <span>ALDER</span>
          </Link>

          <div className={`nav-links ${menuOpen ? "mobile-open" : ""}`}>
            <Link href="#features" onClick={() => setMenuOpen(false)}>
              Features
            </Link>

            <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>

            <Link href="/community" onClick={() => setMenuOpen(false)}>
              Community
            </Link>

            <Link href="/login" onClick={() => setMenuOpen(false)}>
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

      {/* HERO */}
      <section className="hero">
        <div className="hero-background">
          <div className="glow glow-one"></div>
          <div className="glow glow-two"></div>
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="eyebrow">
              <Sparkles size={15} />
              Your financial journey, simplified
            </div>

            <h1>
              PLAN.
              <span> MANAGE.</span>
              <span> GROW.</span>
              <span> LEARN.</span>
            </h1>

            <p className="hero-description">
              Set your financial goals, manage your everyday money, explore
              investment opportunities and learn from people on a similar
              financial journey.
            </p>

            <div className="hero-buttons">
              <Link href="/register" className="primary-button">
                Build My Financial Plan
                <ArrowRight size={18} />
              </Link>

              <Link href="/community" className="secondary-button">
                Explore Journeys
                <Users size={18} />
              </Link>
            </div>

            <div className="trust-row">
              <div className="trust-item">
                <CheckCircle2 size={17} />
                Goal focused
              </div>

              <div className="trust-item">
                <CheckCircle2 size={17} />
                Simple tracking
              </div>

              <div className="trust-item">
                <CheckCircle2 size={17} />
                Community learning
              </div>
            </div>
          </div>

          {/* DASHBOARD PREVIEW */}
          <div className="hero-dashboard">
            <div className="dashboard-window">
              <div className="dashboard-top">
                <div>
                  <span className="small-label">FINANCIAL OVERVIEW</span>
                  <h3>Good morning 👋</h3>
                </div>

                <div className="profile-circle">AS</div>
              </div>

              <div className="money-card">
                <div>
                  <span>Total balance</span>
                  <strong>₹4,82,500</strong>
                </div>

                <div className="balance-growth">
                  <TrendingUp size={15} />
                  +12.8%
                </div>
              </div>

              <div className="stats-grid">
                <div className="mini-card">
                  <div className="mini-icon income">
                    <Wallet size={17} />
                  </div>
                  <span>Income</span>
                  <strong>₹85,000</strong>
                  <small>This month</small>
                </div>

                <div className="mini-card">
                  <div className="mini-icon spending">
                    <CreditCard size={17} />
                  </div>
                  <span>Spending</span>
                  <strong>₹52,000</strong>
                  <small>This month</small>
                </div>

                <div className="mini-card">
                  <div className="mini-icon saving">
                    <PiggyBank size={17} />
                  </div>
                  <span>Saved</span>
                  <strong>₹33,000</strong>
                  <small>38.8% rate</small>
                </div>
              </div>

              <div className="goal-preview">
                <div className="goal-heading">
                  <div>
                    <span className="small-label">ACTIVE GOAL</span>
                    <h4>Buy a Home</h4>
                  </div>

                  <span className="goal-percentage">42%</span>
                </div>

                <div className="progress-track">
                  <div className="progress-fill" style={{ width: "42%" }}></div>
                </div>

                <div className="goal-bottom">
                  <span>₹8.4L saved</span>
                  <span>₹20L target</span>
                </div>
              </div>

              <div className="dashboard-footer">
                <div className="community-mini">
                  <div className="avatar-stack">
                    <span>R</span>
                    <span>P</span>
                    <span>A</span>
                  </div>

                  <div>
                    <strong>1,284</strong>
                    <small>similar journeys</small>
                  </div>
                </div>

                <Link href="/dashboard" className="view-link">
                  View command center
                  <ChevronRight size={15} />
                </Link>
              </div>
            </div>

            <div className="floating-card floating-save">
              <div className="floating-icon">
                <PiggyBank size={17} />
              </div>

              <div>
                <small>Monthly saving</small>
                <strong>₹33,000</strong>
              </div>
            </div>

            <div className="floating-card floating-growth">
              <div className="floating-icon">
                <TrendingUp size={17} />
              </div>

              <div>
                <small>Financial health</small>
                <strong>Good</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-container">
          <div>
            <strong>4</strong>
            <span>Financial pillars</span>
          </div>

          <div>
            <strong>∞</strong>
            <span>Possible goals</span>
          </div>

          <div>
            <strong>1</strong>
            <span>Financial command center</span>
          </div>

          <div>
            <strong>24/7</strong>
            <span>Your financial journey</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <div className="section-container">
          <div className="section-heading">
            <div className="eyebrow">
              <Sparkles size={15} />
              Everything in one place
            </div>

            <h2>
              Your money has four
              <span> important dimensions.</span>
            </h2>

            <p>
              Financial stability is not only about saving money. It is about
              planning, managing, growing and learning.
            </p>
          </div>

          <div className="pillars-grid">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <Link
                  href={pillar.link}
                  className={`pillar-card ${pillar.color}`}
                  key={pillar.title}
                >
                  <div className="pillar-top">
                    <span className="pillar-number">{pillar.number}</span>

                    <div className="pillar-icon">
                      <Icon size={23} />
                    </div>
                  </div>

                  <div className="pillar-content">
                    <h3>{pillar.title}</h3>
                    <h4>{pillar.subtitle}</h4>
                    <p>{pillar.description}</p>
                  </div>

                  <div className="card-arrow">
                    <ArrowRight size={18} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="journey-section" id="how-it-works">
        <div className="section-container">
          <div className="journey-grid">
            <div className="journey-content">
              <div className="eyebrow">
                <LineChart size={15} />
                Your financial journey
              </div>

              <h2>
                From where you are
                <span> to where you want to be.</span>
              </h2>

              <p>
                ALDER brings your financial life together so you can understand
                your current position and build a path toward the goals that
                matter to you.
              </p>

              <div className="journey-steps">
                <div className="journey-step">
                  <div className="step-number">1</div>
                  <div>
                    <h4>Define your goals</h4>
                    <p>Tell us what you want to achieve.</p>
                  </div>
                </div>

                <div className="journey-step">
                  <div className="step-number">2</div>
                  <div>
                    <h4>Understand your money</h4>
                    <p>Track income, expenses and savings.</p>
                  </div>
                </div>

                <div className="journey-step">
                  <div className="step-number">3</div>
                  <div>
                    <h4>Build your roadmap</h4>
                    <p>Create practical milestones toward your goals.</p>
                  </div>
                </div>

                <div className="journey-step">
                  <div className="step-number">4</div>
                  <div>
                    <h4>Learn and improve</h4>
                    <p>Compare your journey with relevant community insights.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="goal-panel">
              <div className="panel-header">
                <div>
                  <span className="small-label">MY GOALS</span>
                  <h3>Financial roadmap</h3>
                </div>

                <span className="active-badge">2 active</span>
              </div>

              {goals.map((goal) => {
                const Icon = goal.icon;

                return (
                  <div className="goal-item" key={goal.title}>
                    <div className="goal-icon">
                      <Icon size={19} />
                    </div>

                    <div className="goal-info">
                      <div className="goal-title-row">
                        <strong>{goal.title}</strong>
                        <span>{goal.progress}%</span>
                      </div>

                      <div className="goal-progress">
                        <div style={{ width: `${goal.progress}%` }}></div>
                      </div>

                      <div className="goal-values">
                        <span>{goal.saved}</span>
                        <span>{goal.target}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              <Link href="/goals" className="panel-button">
                View all goals
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="community-section" id="community">
        <div className="community-background"></div>

        <div className="section-container">
          <div className="community-card">
            <div className="community-content">
              <div className="eyebrow light">
                <Users size={15} />
                Community intelligence
              </div>

              <h2>
                You don't have to figure
                <span> everything out alone.</span>
              </h2>

              <p>
                Learn from anonymous financial journeys of people who share
                similar goals, income ranges, spending patterns and financial
                situations.
              </p>

              <div className="community-features">
                <div>
                  <CheckCircle2 size={18} />
                  Similar financial journeys
                </div>

                <div>
                  <CheckCircle2 size={18} />
                  Real strategies and lessons
                </div>

                <div>
                  <CheckCircle2 size={18} />
                  Common mistakes to avoid
                </div>
              </div>

              <Link href="/community" className="community-button">
                Explore Similar Journeys
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="people-visual">
              <div className="people-orbit orbit-one"></div>
              <div className="people-orbit orbit-two"></div>

              <div className="person person-one">R</div>
              <div className="person person-two">A</div>
              <div className="person person-three">P</div>
              <div className="person person-four">S</div>

              <div className="center-person">
                <Users size={30} />
              </div>

              <div className="match-bubble">
                <strong>94%</strong>
                <span>journey match</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="security-section">
        <div className="section-container">
          <div className="security-card">
            <div className="security-icon">
              <ShieldCheck size={28} />
            </div>

            <div>
              <h3>Built around your financial privacy</h3>
              <p>
                Your personal financial information should remain under your
                control. Privacy and security will be core principles as we build
                the platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="section-container">
          <div className="cta-card">
            <div className="cta-glow"></div>

            <div className="eyebrow light">
              <Sparkles size={15} />
              Start your journey
            </div>

            <h2>
              Your goals deserve
              <span> a financial plan.</span>
            </h2>

            <p>
              Start building a clearer picture of your money, your goals and
              your next steps.
            </p>

            <Link href="/register" className="cta-button">
              Build My Financial Plan
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="section-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="#" className="logo footer-logo">
                <span className="logo-mark">
                  <Sparkles size={17} />
                </span>
                ALDER
              </Link>

              <p>Your money, your goals, your journey.</p>
            </div>

            <div>
              <h4>Platform</h4>
              <Link href="#features">Features</Link>
              <Link href="#how-it-works">How It Works</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/community">Community</Link>
            </div>

            <div>
              <h4>Financial</h4>
              <Link href="/goals">Goals</Link>
              <Link href="/budget">Budget</Link>
              <Link href="/invest">Invest</Link>
              <Link href="/insights">Insights</Link>
            </div>

            <div>
              <h4>Account</h4>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 ALDER FinPath. All rights reserved.</span>

            <span>PLAN. MANAGE. GROW. LEARN.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
