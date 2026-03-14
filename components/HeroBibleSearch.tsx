"use client";

import { useState } from "react";
import Link from "next/link";

const DEMO_QUESTION = "Who was Samson?";

const DEMO_ANSWER_SHORT =
  "Samson was a judge of Israel known for his incredible strength, which God gave him to help defend Israel from the Philistines. His strength was tied to a Nazirite vow, meaning his hair was never to be cut.\n\nSamson performed many powerful acts. In one famous story, he killed 1,000 Philistine soldiers using only the jawbone of a donkey (Judges 15:15). Despite his strength, Samson often made poor choices, especially in relationships. Delilah eventually betrayed him, and his enemies captured him after cutting his hair.";

const DEMO_ANSWER_MORE =
  "At the end of his life, Samson prayed for strength one last time. While chained inside a Philistine temple, he pushed apart the two central pillars, collapsing the building and killing the Philistine rulers and many others inside. The Bible says he killed more Philistines in his death than during his life (Judges 16:30).\n\nSamson\u2019s story is about strength, failure, and redemption\u2014showing that even after serious mistakes, turning back to God still matters.";

const DEMO_VERSES = [
  {
    reference: "Judges 13:24",
    text: "The woman gave birth to a son and named him Samson. The boy grew up, and the LORD blessed him.",
  },
  {
    reference: "Judges 16:30",
    text: "Samson said, \u201CLet me die with the Philistines!\u201D Then he pushed with all his might, and down came the temple on the rulers and all the people in it.",
  },
];

const SUGGESTION_CHIPS = [
  "Who was Moses?",
  "What is grace?",
  "Explain John 3:16",
];

const STATS = [
  { label: "Verses", value: "31,102" },
  { label: "Books", value: "66" },
  { label: "Chapters", value: "1,189" },
];

export default function HeroBibleSearch() {
  const [showDemo, setShowDemo] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState("");

  const handleChipClick = (question: string) => {
    setActiveQuestion(question);
    setShowDemo(true);
  };

  const displayQuestion = activeQuestion || DEMO_QUESTION;

  return (
    <>
      <style>{`
        @keyframes floatChip0 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatChip1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes floatChip2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(124, 92, 252, 0.15), 0 0 60px rgba(124, 92, 252, 0.08), 0 10px 40px rgba(18, 5, 65, 0.12); }
          50% { box-shadow: 0 0 30px rgba(124, 92, 252, 0.25), 0 0 80px rgba(124, 92, 252, 0.12), 0 10px 40px rgba(18, 5, 65, 0.12); }
        }
        @keyframes pulseGlowFocused {
          0%, 100% { box-shadow: 0 0 25px rgba(124, 92, 252, 0.3), 0 0 70px rgba(124, 92, 252, 0.15), 0 10px 40px rgba(18, 5, 65, 0.15); }
          50% { box-shadow: 0 0 40px rgba(124, 92, 252, 0.4), 0 0 90px rgba(124, 92, 252, 0.2), 0 10px 40px rgba(18, 5, 65, 0.15); }
        }
        .hero-search-layout {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
        }
        .hero-search-center {
          flex: 0 1 640px;
          min-width: 0;
          text-align: left;
        }
        .hero-search-side {
          flex: 0 0 180px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .hero-search-side-left {
          align-items: flex-end;
          padding-top: 10px;
        }
        .hero-search-side-right {
          align-items: flex-start;
          padding-top: 10px;
        }
        .hero-suggestion-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 18px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(124, 92, 252, 0.15);
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          color: #5a4a8a;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
          font-family: 'Inter', 'DM Sans', sans-serif;
        }
        .hero-suggestion-chip:hover {
          background: rgba(255, 255, 255, 0.9);
          border-color: rgba(124, 92, 252, 0.4);
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 16px rgba(124, 92, 252, 0.15);
        }
        .hero-stats-card {
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(124, 92, 252, 0.12);
          border-radius: 20px;
          padding: 20px 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-width: 160px;
        }
        .hero-stats-title {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #7c5cfc;
          font-family: 'Inter', 'DM Sans', sans-serif;
        }
        .hero-stat-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .hero-stat-value {
          font-size: 20px;
          font-weight: 800;
          color: #1a1528;
          letter-spacing: -0.02em;
          font-family: 'Inter', 'DM Sans', sans-serif;
        }
        .hero-stat-label {
          font-size: 12px;
          font-weight: 500;
          color: #8a8a9a;
          font-family: 'Inter', 'DM Sans', sans-serif;
        }
        .hero-search-container {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(124, 92, 252, 0.1);
          border-radius: 28px;
          padding: 20px 24px;
        }
        .hero-ai-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-bottom: 14px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #9b82fc;
          font-family: 'Inter', 'DM Sans', sans-serif;
        }
        .hero-search-bar {
          display: flex;
          width: 100%;
          gap: 0;
          align-items: center;
          background: linear-gradient(135deg, #fdfcff 0%, #f8f5ff 100%);
          border-radius: 50px;
          border: 2px solid transparent;
          background-clip: padding-box;
          position: relative;
          padding: 5px 5px 5px 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          animation: pulseGlow 3s ease-in-out infinite;
        }
        .hero-search-bar::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 52px;
          background: linear-gradient(135deg, #7c5cfc, #a78bfa, #c4b5fd, #7c5cfc);
          z-index: -1;
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }
        .hero-search-bar:hover::before {
          opacity: 1;
        }
        .hero-search-bar:hover {
          animation: pulseGlowFocused 2s ease-in-out infinite;
        }
        .hero-search-bar.active::before {
          opacity: 1;
        }
        .hero-search-bar.active {
          animation: pulseGlowFocused 2s ease-in-out infinite;
        }
        .hero-sparkle-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          color: #7c5cfc;
        }
        .hero-search-text {
          flex: 1;
          padding: 14px 12px;
          font-size: 15px;
          font-weight: 400;
          font-family: 'Inter', 'DM Sans', sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .hero-search-text.placeholder {
          color: #a09aaf;
          font-style: italic;
        }
        .hero-search-text.filled {
          color: #2a2520;
          font-style: normal;
        }
        .hero-ask-btn {
          padding: 12px 28px;
          border-radius: 50px;
          background: linear-gradient(135deg, #7c5cfc 0%, #5a3fd4 100%);
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Inter', 'DM Sans', sans-serif;
          flex-shrink: 0;
          border: none;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 16px rgba(124, 92, 252, 0.35);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .hero-ask-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 24px rgba(124, 92, 252, 0.45);
          background: linear-gradient(135deg, #8b6dff 0%, #6344e0 100%);
        }
        .hero-search-subtitle {
          margin-top: 10px;
          font-size: 13px;
          color: #8a85a0;
          font-family: 'Inter', 'DM Sans', sans-serif;
          text-align: center;
        }
        @media (max-width: 900px) {
          .hero-search-side {
            display: none !important;
          }
          .hero-search-layout {
            gap: 0;
          }
        }
      `}</style>

      <div className="hero-search-layout">
        {/* Left side: floating suggestion chips */}
        <div className="hero-search-side hero-search-side-left">
          {SUGGESTION_CHIPS.map((chip, i) => (
            <button
              key={chip}
              type="button"
              className="hero-suggestion-chip"
              style={{
                animation: `floatChip${i} ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
              onClick={() => handleChipClick(chip)}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              {chip}
            </button>
          ))}
        </div>

        {/* Center: search bar */}
        <div className="hero-search-center">
          <div className="hero-search-container">
            <div className="hero-ai-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#9b82fc">
                <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
              </svg>
              AI-Powered Bible Search
            </div>

            <button
              type="button"
              onClick={() => {
                if (!activeQuestion) setActiveQuestion("");
                setShowDemo(!showDemo);
              }}
              className={`hero-search-bar ${showDemo ? "active" : ""}`}
            >
              <span className="hero-sparkle-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l1.912 5.813L20 10.125l-4.85 3.987L16.888 20 12 16.65 7.112 20l1.738-5.875L4 10.125l6.088-1.312z" />
                </svg>
              </span>
              <span className={`hero-search-text ${showDemo ? "filled" : "placeholder"}`}>
                {showDemo ? displayQuestion : "Ask anything about the Bible..."}
              </span>
              <span className="hero-ask-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l1.912 5.813L20 10.125l-4.85 3.987L16.888 20 12 16.65 7.112 20l1.738-5.875L4 10.125l6.088-1.312z" />
                </svg>
                {showDemo ? "Hide" : "Ask AI"}
              </span>
            </button>

            <div className="hero-search-subtitle">
              Get instant Bible answers with supporting verses.
            </div>
          </div>

          {/* Demo answer card */}
          {showDemo && (
            <div
              style={{
                marginTop: 16,
                animation: "slideDown 0.35s ease",
              }}
            >
              {/* AI Answer */}
              <div
                style={{
                  padding: "20px 22px",
                  background: "linear-gradient(135deg, #f8f6ff 0%, #f0edff 100%)",
                  borderRadius: 14,
                  borderLeft: "3px solid #7c5cfc",
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#7c5cfc">
                    <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
                  </svg>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#7c5cfc",
                      letterSpacing: 0.8,
                      textTransform: "uppercase" as const,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    AI Answer
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 15,
                    lineHeight: 1.75,
                    color: "#4a4550",
                    margin: 0,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {DEMO_ANSWER_SHORT.split("\n\n").map((para, i) => (
                    <p key={i} style={{ margin: i === 0 ? 0 : "12px 0 0" }}>{para}</p>
                  ))}
                  {!showMore && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setShowMore(true); }}
                      style={{
                        display: "inline-block",
                        marginTop: 10,
                        padding: "6px 16px",
                        fontSize: 13,
                        fontWeight: 600,
                        fontFamily: "'DM Sans', sans-serif",
                        color: "#7c5cfc",
                        background: "rgba(124, 92, 252, 0.08)",
                        border: "1px solid rgba(124, 92, 252, 0.2)",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
                      More
                    </button>
                  )}
                  {showMore && DEMO_ANSWER_MORE.split("\n\n").map((para, i) => (
                    <p key={`more-${i}`} style={{ margin: "12px 0 0" }}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Supporting verses */}
              <div
                style={{
                  padding: 14,
                  borderRadius: 14,
                  background: "#fff",
                  border: "1px solid #e8e5e0",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#8a8580",
                    letterSpacing: 0.8,
                    textTransform: "uppercase" as const,
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: 10,
                  }}
                >
                  Supporting Verses
                </div>
                {DEMO_VERSES.map((v) => (
                  <div
                    key={v.reference}
                    style={{
                      padding: "10px 10px 12px",
                      borderRadius: 10,
                      border: "1px solid #eee7dd",
                      background: "#fff",
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#7c5cfc",
                        marginBottom: 4,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {v.reference}
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        margin: 0,
                        color: "#3a3530",
                        lineHeight: 1.6,
                      }}
                    >
                      {v.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <Link
                  href="/signup"
                  style={{
                    display: "inline-block",
                    padding: "12px 28px",
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#fff",
                    background: "linear-gradient(135deg, #7c5cfc 0%, #5a3fd4 100%)",
                    borderRadius: 50,
                    textDecoration: "none",
                    boxShadow: "0 4px 16px rgba(124,92,252,0.3)",
                  }}
                >
                  Create a free account to ask your own questions
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right side: Quick Stats card */}
        <div className="hero-search-side hero-search-side-right">
          <div className="hero-stats-card">
            <div className="hero-stats-title">The Bible</div>
            {STATS.map((stat) => (
              <div key={stat.label} className="hero-stat-row">
                <span className="hero-stat-value">{stat.value}</span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
