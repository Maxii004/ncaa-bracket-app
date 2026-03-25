import { useState } from "react";
import DATA from "./data";
import { T } from "./components/theme";
import TabBar from "./components/TabBar";
import BracketView from "./components/BracketView";
import nccaLogo from "./assets/NCAA.png";
import marchMadnessLogo from "./assets/March-Madness.png";

const PICKS_ORDER = [
  { key: "mineth", label: "MINETH", accent: "#a855f7" },
  { key: "claude", label: "CLAUDE", accent: "#f5a623" },
  { key: "data", label: "DATA", accent: "#00b4d8" },
];

export default function App() {
  const years = Object.keys(DATA).sort().reverse();

  const [year, setYear] = useState(years[0]);
  const [gender, setGender] = useState("mens");
  const [picker, setPicker] = useState("mineth");

  const yearData = DATA[year];
  const genderData = yearData?.[gender];
  const bracket = genderData?.bracket;
  const picks = genderData?.picks?.[picker];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        color: T.text,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* ── HEADER ── */}
      <div
        style={{
          background: T.panel,
          borderBottom: `1px solid ${T.line}`,
          padding: "18px 24px 0",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Title row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              marginBottom: 2,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img
                src={nccaLogo}
                alt="NCAA"
                style={{ height: 100, width: "auto" }}
              />
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  letterSpacing: -1,
                  color: T.text,
                }}
              >
                NCAA BRACKET TRACKER
              </span>
            </div>
            <img
              src={marchMadnessLogo}
              alt="March Madness"
              style={{ height: 200, width: "auto" }}
            />
          </div>
          <p style={{ fontSize: 11, color: T.muted, margin: "0 0 16px" }}>
            Three perspectives — My picks, Claude's gut, and what the data says
          </p>

          {/* Row 1: Year tabs */}
          <div style={{ marginBottom: 2 }}>
            <div
              style={{
                fontSize: 8,
                color: T.muted,
                letterSpacing: 2,
                fontFamily: "monospace",
                marginBottom: 4,
              }}
            >
              SEASON
            </div>
            <TabBar
              options={years.map((y) => ({ key: y, label: y }))}
              active={year}
              onSelect={setYear}
            />
          </div>

          {/* Row 2: Gender tabs */}
          <div style={{ marginTop: 10, marginBottom: 2 }}>
            <div
              style={{
                fontSize: 8,
                color: T.muted,
                letterSpacing: 2,
                fontFamily: "monospace",
                marginBottom: 4,
              }}
            >
              TOURNAMENT
            </div>
            <TabBar
              options={[
                { key: "mens", label: "MEN'S" },
                { key: "womens", label: "WOMEN'S" },
              ]}
              active={gender}
              onSelect={setGender}
            />
          </div>

          {/* Row 3: Picks tabs */}
          <div style={{ marginTop: 10 }}>
            <div
              style={{
                fontSize: 8,
                color: T.muted,
                letterSpacing: 2,
                fontFamily: "monospace",
                marginBottom: 4,
              }}
            >
              BRACKET
            </div>
            <TabBar
              options={PICKS_ORDER}
              active={picker}
              onSelect={setPicker}
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: 24 }}>
        {bracket && picks ? (
          <div
            style={{
              background: T.card,
              borderRadius: 12,
              border: `1px solid ${picks.accent}28`,
              padding: 20,
            }}
          >
            {/* Picks header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 4,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: picks.accent,
                }}
              />
              <span
                style={{
                  fontWeight: 800,
                  fontSize: 13,
                  color: picks.accent,
                  letterSpacing: 1,
                  fontFamily: "monospace",
                }}
              >
                {picks.label}
              </span>
            </div>
            <p style={{ fontSize: 11, color: T.muted, margin: "0 0 18px" }}>
              {picks.sub}
            </p>

            <BracketView bracketData={bracket} picks={picks} />
          </div>
        ) : (
          <div
            style={{
              color: T.muted,
              padding: 40,
              textAlign: "center",
              fontSize: 13,
            }}
          >
            No data available for {year} {gender}
          </div>
        )}
      </div>
    </div>
  );
}
