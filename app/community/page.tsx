"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  Users,
  Sparkles,
  Heart,
  Plus,
  Filter,
  CheckCircle2,
  X,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import "./community.css";

export default function CommunityPage() {
  const [journeys, setJourneys] = useState<any[]>([]);
  const [activeTag, setActiveTag] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);

  // Form states for new journey
  const [storyTitle, setStoryTitle] = useState("");
  const [story, setStory] = useState("");
  const [profession, setProfession] = useState("Software Engineer");
  const [salaryRange, setSalaryRange] = useState("₹10L - ₹15L");
  const [savingsRate, setSavingsRate] = useState("45");
  const [tagsInput, setTagsInput] = useState("Home Buying, SIP");

  const fetchJourneys = async () => {
    try {
      const res = await fetch("/api/community");
      const data = await res.json();
      setJourneys(data.journeys || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchJourneys();
  }, []);

  const handleLike = async (id: string) => {
    try {
      await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like", id }),
      });
      fetchJourneys();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateJourney = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyTitle || !story) return;

    try {
      await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storyTitle,
          story,
          profession,
          salaryRange,
          savingsRate: parseFloat(savingsRate),
          tags: tagsInput.split(",").map((t) => t.trim()),
        }),
      });

      setModalOpen(false);
      setStoryTitle("");
      setStory("");
      fetchJourneys();
    } catch (e) {
      console.error(e);
    }
  };

  const filteredJourneys = journeys.filter((j) => {
    if (activeTag === "ALL") return true;
    return j.tags?.some((t: string) =>
      t.toLowerCase().includes(activeTag.toLowerCase())
    );
  });

  return (
    <div className="app-container">
      <Sidebar />

      <main className="app-main-content">
        <header className="page-header">
          <div>
            <span className="eyebrow-mini">PILLAR 04: LEARN</span>
            <h1>Community Journeys & Intelligence</h1>
            <p className="header-subtitle">
              Learn from real, anonymous financial paths of people with similar income and goals.
            </p>
          </div>

          <button className="primary-action-btn" onClick={() => setModalOpen(true)}>
            <Plus size={18} />
            Share Your Journey
          </button>
        </header>

        {/* HERO BANNER */}
        <div className="community-hero-banner">
          <div className="banner-left">
            <div className="eyebrow light">
              <Users size={14} />
              Anonymous Peer Matching
            </div>
            <h2>94% Financial Profile Match</h2>
            <p>
              We paired your profile with 1,284 members earning ₹8L - ₹15L pursuing home ownership & retirement stability.
            </p>
          </div>

          <div className="banner-avatars">
            <div className="avatar-circle">PN</div>
            <div className="avatar-circle">RK</div>
            <div className="avatar-circle">AM</div>
            <div className="avatar-circle">VS</div>
          </div>
        </div>

        {/* TAG FILTER BAR */}
        <div className="community-filter-bar">
          <button
            className={`tag-filter-btn ${activeTag === "ALL" ? "active" : ""}`}
            onClick={() => setActiveTag("ALL")}
          >
            All Stories
          </button>
          <button
            className={`tag-filter-btn ${activeTag === "Home Buying" ? "active" : ""}`}
            onClick={() => setActiveTag("Home Buying")}
          >
            Home Buying
          </button>
          <button
            className={`tag-filter-btn ${activeTag === "Debt Free" ? "active" : ""}`}
            onClick={() => setActiveTag("Debt Free")}
          >
            Debt Free
          </button>
          <button
            className={`tag-filter-btn ${activeTag === "Budgeting" ? "active" : ""}`}
            onClick={() => setActiveTag("Budgeting")}
          >
            Budgeting
          </button>
          <button
            className={`tag-filter-btn ${activeTag === "Asset Allocation" ? "active" : ""}`}
            onClick={() => setActiveTag("Asset Allocation")}
          >
            Asset Allocation
          </button>
        </div>

        {/* STORIES LIST */}
        <div className="stories-grid">
          {filteredJourneys.map((j) => (
            <div className="story-card" key={j.id}>
              <div className="story-header">
                <div className="author-info">
                  <div className="story-avatar">{j.avatar}</div>
                  <div>
                    <strong>{j.authorName}</strong>
                    <small>{j.profession} • {j.location}</small>
                  </div>
                </div>

                <div className="match-score-badge">
                  <Sparkles size={14} />
                  {j.matchPct}% Match
                </div>
              </div>

              <div className="story-meta-row">
                <div className="meta-item">
                  <small>Salary Range</small>
                  <strong>{j.salaryRange}</strong>
                </div>
                <div className="meta-item">
                  <small>Net Worth</small>
                  <strong>{j.netWorth}</strong>
                </div>
                <div className="meta-item">
                  <small>Savings Rate</small>
                  <strong style={{ color: "#16a34a" }}>{j.savingsRate}%</strong>
                </div>
              </div>

              <div className="story-body">
                <h3>{j.storyTitle}</h3>
                <p>{j.story}</p>
              </div>

              <div className="story-footer">
                <div className="story-tags">
                  {j.tags?.map((tag: string, idx: number) => (
                    <span className="story-tag-pill" key={idx}>
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  className="like-btn"
                  onClick={() => handleLike(j.id)}
                >
                  <Heart size={16} className="heart-icon" />
                  <span>{j.likesCount} Helpful</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SHARE JOURNEY MODAL */}
        {modalOpen && (
          <div className="modal-overlay">
            <div className="modal-card">
              <div className="modal-header">
                <h3>Share Your Anonymous Journey</h3>
                <button className="modal-close" onClick={() => setModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateJourney}>
                <div className="form-group">
                  <label>Story Title</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. How I built a ₹5L emergency cushion"
                    value={storyTitle}
                    onChange={(e) => setStoryTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Your Financial Story / Strategy</label>
                  <textarea
                    className="form-textarea"
                    rows={4}
                    placeholder="Describe your practical steps, mistakes avoided, or saving habits..."
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Profession</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Product Manager"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Salary Range & Savings Rate (%)</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="₹10L - ₹15L"
                      value={salaryRange}
                      onChange={(e) => setSalaryRange(e.target.value)}
                    />
                    <input
                      type="number"
                      className="form-input"
                      placeholder="45"
                      value={savingsRate}
                      onChange={(e) => setSavingsRate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Tags (Comma separated)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Home Buying, Budgeting, SIP"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                  />
                </div>

                <button type="submit" className="modal-submit">
                  Publish Anonymous Journey
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
