"use client";

import { useState, useEffect } from "react";

interface ApplyVerseModalProps {
  isOpen: boolean;
  onClose: () => void;
  verseReference: string;
  verseText: string;
}

const SUGGESTION_CHIPS = [
  "Work stress",
  "Relationship conflict",
  "Anxiety or worry",
  "Forgiveness",
  "Parenting",
  "Life decisions",
];

function parseResult(raw: string): {
  meaning: string;
  application: string;
  question: string;
} {
  const meaningMatch = raw.match(
    /\*\*Meaning\*\*\s*([\s\S]*?)(?=\*\*Life Application\*\*)/
  );
  const applicationMatch = raw.match(
    /\*\*Life Application\*\*\s*([\s\S]*?)(?=\*\*Reflection Question\*\*)/
  );
  const questionMatch = raw.match(/\*\*Reflection Question\*\*\s*([\s\S]*)/);

  return {
    meaning: meaningMatch?.[1]?.trim() || "",
    application: applicationMatch?.[1]?.trim() || "",
    question: questionMatch?.[1]?.trim() || "",
  };
}

export default function ApplyVerseModal({
  isOpen,
  onClose,
  verseReference,
  verseText,
}: ApplyVerseModalProps) {
  const [userContext, setUserContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    meaning: string;
    application: string;
    question: string;
  } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setUserContext("");
      setLoading(false);
      setError(null);
      setResult(null);
    }
  }, [isOpen]);

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/apply-verse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          verse_reference: verseReference,
          verse_text: verseText,
          user_context: userContext || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate");
      }

      const data = await res.json();
      const parsed = parseResult(data.result);

      if (!parsed.meaning && !parsed.application && !parsed.question) {
        setResult({
          meaning: "",
          application: data.result,
          question: "",
        });
      } else {
        setResult(parsed);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleChipTap(chip: string) {
    setUserContext(chip);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-5"
      style={{
        backgroundColor: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "var(--card)",
          border: "0.5px solid var(--border)",
          maxWidth: "min(32rem, 100%)",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span style={{ color: "var(--accent)" }}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <span
              className="text-[15px] font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Apply This Verse
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[13px] font-medium px-2 py-1"
            style={{ color: "var(--secondary)" }}
          >
            Close
          </button>
        </div>

        {/* Verse reference */}
        <div className="px-4 pb-2 flex-shrink-0">
          <p
            className="text-[13px] font-medium m-0"
            style={{ color: "var(--accent)" }}
          >
            {verseReference}
          </p>
        </div>

        {/* Content area */}
        <div
          className="flex-1 overflow-y-auto px-4 pb-4"
          style={{ minHeight: 0 }}
        >
          {/* Input form - shown before result */}
          {!result && !loading && (
            <>
              <p
                className="text-[14px] mb-3 mt-1"
                style={{
                  color: "var(--foreground)",
                  lineHeight: 1.6,
                }}
              >
                What situation are you thinking about today?{" "}
                <span style={{ color: "var(--secondary)" }}>(optional)</span>
              </p>

              {/* Suggestion chips */}
              <div className="flex flex-wrap gap-2 mb-3">
                {SUGGESTION_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleChipTap(chip)}
                    className="px-3 py-1.5 rounded-full text-[12px] font-medium transition-all active:scale-95"
                    style={{
                      backgroundColor:
                        userContext === chip
                          ? "var(--accent)"
                          : "var(--background)",
                      color:
                        userContext === chip ? "#fff" : "var(--foreground)",
                      border:
                        userContext === chip
                          ? "1px solid var(--accent)"
                          : "1px solid var(--border)",
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Text input */}
              <textarea
                value={userContext}
                onChange={(e) => setUserContext(e.target.value)}
                placeholder="Or type your own..."
                rows={2}
                className="w-full rounded-xl px-3 py-2.5 text-[14px] resize-none outline-none mb-3"
                style={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />

              {/* Submit button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-2.5 rounded-xl text-[14px] font-semibold transition-opacity active:opacity-80"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "#fff",
                }}
              >
                Apply This Verse
              </button>
            </>
          )}

          {/* Loading */}
          {loading && (
            <div className="text-center py-8">
              <div
                className="inline-block w-6 h-6 border-2 rounded-full animate-spin mb-2"
                style={{
                  borderColor: "var(--border)",
                  borderTopColor: "var(--accent)",
                }}
              />
              <p
                className="text-[13px]"
                style={{ color: "var(--secondary)" }}
              >
                Reflecting on this verse...
              </p>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="text-center py-6">
              <p
                className="text-[13px] mb-3"
                style={{ color: "#c0392b" }}
              >
                {error}
              </p>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 rounded-xl text-[13px] font-medium"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "#fff",
                }}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Result */}
          {result && !loading && (
            <>
              {result.meaning && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider"
                      style={{ color: "var(--accent)", letterSpacing: "0.08em" }}
                    >
                      Meaning
                    </span>
                  </div>
                  <p
                    className="text-[14px] m-0 leading-relaxed"
                    style={{ color: "var(--foreground)", lineHeight: 1.7 }}
                  >
                    {result.meaning}
                  </p>
                </div>
              )}

              {result.application && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider"
                      style={{ color: "var(--accent)", letterSpacing: "0.08em" }}
                    >
                      Life Application
                    </span>
                  </div>
                  <p
                    className="text-[14px] m-0 leading-relaxed"
                    style={{ color: "var(--foreground)", lineHeight: 1.7 }}
                  >
                    {result.application}
                  </p>
                </div>
              )}

              {result.question && (
                <div
                  className="mb-4 rounded-xl p-3"
                  style={{
                    background: "var(--background)",
                    border: "1px solid var(--border)",
                    borderLeftWidth: 3,
                    borderLeftColor: "var(--accent)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider"
                      style={{ color: "var(--accent)", letterSpacing: "0.08em" }}
                    >
                      Reflection Question
                    </span>
                  </div>
                  <p
                    className="text-[14px] m-0 leading-relaxed italic"
                    style={{ color: "var(--foreground)", lineHeight: 1.7 }}
                  >
                    {result.question}
                  </p>
                </div>
              )}

              {/* Disclaimer */}
              <p
                className="text-[11px] text-center mt-4 mb-1"
                style={{ color: "var(--secondary)" }}
              >
                This feature provides biblical reflection and is not
                professional advice.
              </p>

              {/* Start over button */}
              <button
                type="button"
                onClick={() => {
                  setResult(null);
                  setUserContext("");
                }}
                className="w-full py-2 rounded-xl text-[13px] font-medium mt-2 transition-opacity active:opacity-80"
                style={{
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  border: "1px solid var(--border)",
                }}
              >
                Ask Again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
