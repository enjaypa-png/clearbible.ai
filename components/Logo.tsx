/**
 * Logo component — single source of truth for the ClearBible.ai logo.
 *
 * Uses inline SVG so that <text> elements can access page fonts.
 * SVG loaded via <img> tags cannot access page fonts, which causes
 * the logo text to disappear — only the book icon renders.
 *
 * To update the logo, edit this file. All instances across the app
 * will update automatically.
 */

interface LogoProps {
  height?: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function Logo({ height = 40, style, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 64"
      fill="none"
      style={{ height, width: "auto", ...style }}
      className={className}
      role="img"
      aria-label="ClearBible.ai Logo"
    >
      {/* Book body */}
      <rect x="4" y="6" width="42" height="52" rx="6" fill="#7c5cfc" />
      {/* Book pages */}
      <path d="M8 54 L8 56 C8 58 10 60 12 60 L40 60 C42 60 44 58 44 56 L44 54" fill="#e8e4f0" stroke="#d4d0e0" strokeWidth="0.5" />
      <path d="M8 52 L8 54 C8 56 10 58 12 58 L40 58 C42 58 44 56 44 54 L44 52" fill="#f0ecf8" stroke="#d4d0e0" strokeWidth="0.5" />
      {/* Cross */}
      <rect x="22" y="16" width="6" height="28" rx="1.5" fill="#f0c040" />
      <rect x="15" y="23" width="20" height="6" rx="1.5" fill="#f0c040" />
      {/* Text */}
      <text x="58" y="34" fontFamily="'DM Sans', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" fontSize="26" fontWeight="700" fill="#2d2b4e">
        ClearBible<tspan fill="#7c5cfc">.ai</tspan>
      </text>
      <text x="58" y="48" fontFamily="'DM Sans', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" fontSize="9" fontWeight="400" fill="#8b87a0">
        AI Verse Explanations &amp; Chapter Summaries
      </text>
      <text x="58" y="59" fontFamily="'DM Sans', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" fontSize="9" fontWeight="400" fill="#8b87a0">
        AI Bible Ask/Search Feature
      </text>
    </svg>
  );
}
