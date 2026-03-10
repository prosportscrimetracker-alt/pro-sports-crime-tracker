import { useState, useRef, useEffect } from "react";

const CRIME_DATABASE = {
  "Aaron Hernandez": { sport: "NFL", team: "New England Patriots", position: "TE", crimes: [{ year: 2013, charge: "First-degree murder (Odin Lloyd)", outcome: "Convicted, sentenced to life without parole" }, { year: 2014, charge: "Double murder charges (Daniel de Abreu & Safiro Furtado)", outcome: "Acquitted" }], status: "Deceased (2017)" },
  "Michael Vick": { sport: "NFL", team: "Atlanta Falcons", position: "QB", crimes: [{ year: 2007, charge: "Conspiracy to operate an illegal dogfighting ring", outcome: "Guilty plea, 21 months federal prison" }], status: "Released, returned to NFL" },
  "Ray Rice": { sport: "NFL", team: "Baltimore Ravens", position: "RB", crimes: [{ year: 2014, charge: "Aggravated assault (domestic violence)", outcome: "Pretrial intervention program, charges dismissed" }], status: "Released by Ravens, indefinitely suspended" },
  "O.J. Simpson": { sport: "NFL", team: "Buffalo Bills", position: "RB", crimes: [{ year: 1995, charge: "Double murder (Nicole Brown Simpson & Ron Goldman)", outcome: "Acquitted (found liable in civil trial)" }, { year: 2007, charge: "Armed robbery & kidnapping", outcome: "Convicted, sentenced to 33 years (paroled 2017)" }], status: "Deceased (2024)" },
  "Rae Carruth": { sport: "NFL", team: "Carolina Panthers", position: "WR", crimes: [{ year: 1999, charge: "Conspiracy to commit murder (Cherica Adams)", outcome: "Convicted, sentenced to 18-24 years" }], status: "Released from prison (2018)" },
  "Plaxico Burress": { sport: "NFL", team: "New York Giants", position: "WR", crimes: [{ year: 2008, charge: "Criminal possession of a weapon (accidental self-shooting)", outcome: "Guilty plea, 2 years prison" }], status: "Served sentence, returned to NFL" },
  "Darren Sharper": { sport: "NFL", team: "Multiple teams", position: "S", crimes: [{ year: 2014, charge: "Multiple counts of rape across several states", outcome: "Convicted, sentenced to 18 years federal prison" }], status: "Incarcerated" },
  "Adam 'Pacman' Jones": { sport: "NFL", team: "Tennessee Titans / Bengals", position: "CB", crimes: [{ year: 2007, charge: "Involvement in strip club shooting (Las Vegas)", outcome: "No criminal charges filed, NFL suspension" }, { year: 2013, charge: "Assault", outcome: "Misdemeanor charges" }], status: "Multiple arrests throughout career" },
  "Donte Stallworth": { sport: "NFL", team: "Cleveland Browns", position: "WR", crimes: [{ year: 2009, charge: "DUI manslaughter (Mario Reyes)", outcome: "Guilty plea, 30 days jail + 2 years house arrest" }], status: "Returned to NFL after suspension" },
  "Henry Ruggs III": { sport: "NFL", team: "Las Vegas Raiders", position: "WR", crimes: [{ year: 2021, charge: "DUI resulting in death (Tina Tintor)", outcome: "Guilty plea, sentenced to 3-10 years prison" }], status: "Released by Raiders, incarcerated" },
  "Tyreek Hill": { sport: "NFL", team: "Kansas City Chiefs / Miami Dolphins", position: "WR", crimes: [{ year: 2015, charge: "Domestic assault & battery of pregnant girlfriend", outcome: "Guilty plea, 3 years probation, anger management" }], status: "Active in NFL" },
  "Deshaun Watson": { sport: "NFL", team: "Houston Texans / Cleveland Browns", position: "QB", crimes: [{ year: 2021, charge: "Multiple civil lawsuits alleging sexual misconduct (24+ women)", outcome: "Two grand juries declined criminal charges; civil settlements" }], status: "11-game NFL suspension, $5M fine" },
  "Greg Hardy": { sport: "NFL", team: "Carolina Panthers / Dallas Cowboys", position: "DE", crimes: [{ year: 2014, charge: "Assault on a female & communicating threats", outcome: "Initially convicted, charges dismissed on appeal (victim did not appear)" }], status: "Left NFL" },
  "Kobe Bryant": { sport: "NBA", team: "Los Angeles Lakers", position: "SG", crimes: [{ year: 2003, charge: "Sexual assault allegation (Eagle, Colorado)", outcome: "Criminal case dropped after accuser refused to testify; civil settlement" }], status: "Deceased (2020)" },
  "Allen Iverson": { sport: "NBA", team: "Philadelphia 76ers", position: "PG", crimes: [{ year: 1993, charge: "Maiming by mob (bowling alley brawl)", outcome: "Convicted, later granted clemency by governor" }, { year: 2002, charge: "Threats, carrying a firearm", outcome: "Charges dropped or reduced" }], status: "Retired" },
  "Jayson Williams": { sport: "NBA", team: "New Jersey Nets", position: "C", crimes: [{ year: 2002, charge: "Manslaughter (Costas Christofi, limousine driver)", outcome: "Guilty plea to aggravated assault, 18 months prison" }], status: "Served sentence" },
  "Gilbert Arenas": { sport: "NBA", team: "Washington Wizards", position: "PG", crimes: [{ year: 2009, charge: "Carrying a pistol without a license (guns in locker room)", outcome: "Guilty plea, 30 days halfway house, 2 years probation" }], status: "Suspended by NBA, career declined" },
  "Ron Artest (Metta World Peace)": { sport: "NBA", team: "Indiana Pacers", position: "SF", crimes: [{ year: 2004, charge: "Assault (Malice at the Palace brawl)", outcome: "Season-long suspension, misdemeanor assault charge" }, { year: 2007, charge: "Domestic violence", outcome: "Guilty plea, 20 days community service" }], status: "Retired" },
  "Dennis Rodman": { sport: "NBA", team: "Chicago Bulls / Detroit Pistons", position: "PF", crimes: [{ year: 1999, charge: "DUI & multiple domestic disturbance incidents", outcome: "Various fines, probation, community service" }], status: "Retired, multiple legal issues" },
  "Sebastian Janikowski": { sport: "NFL", team: "Oakland Raiders", position: "K", crimes: [{ year: 2000, charge: "Attempted bribery of a police officer & GHB possession", outcome: "GHB charge dropped, acquitted of bribery" }], status: "Retired" },
  "Pete Rose": { sport: "MLB", team: "Cincinnati Reds", position: "Manager/Player", crimes: [{ year: 1990, charge: "Tax evasion (failure to report gambling income)", outcome: "Guilty plea, 5 months prison" }], status: "Deceased (2024), permanently banned from MLB" },
  "Darryl Strawberry": { sport: "MLB", team: "New York Mets / Yankees", position: "OF", crimes: [{ year: 1999, charge: "Drug possession (cocaine), solicitation of prostitution", outcome: "Multiple arrests, probation violations, prison time" }], status: "Retired, recovered" },
  "Dwight Gooden": { sport: "MLB", team: "New York Mets", position: "P", crimes: [{ year: 1994, charge: "Multiple drug-related charges (cocaine)", outcome: "Suspensions, probation, brief jail time" }], status: "Retired" },
  "Denny McLain": { sport: "MLB", team: "Detroit Tigers", position: "P", crimes: [{ year: 1985, charge: "Racketeering, extortion, cocaine possession", outcome: "Convicted, 23 years sentence (reduced on appeal)" }, { year: 1996, charge: "Theft, mail fraud, money laundering", outcome: "Convicted, 8 years prison" }], status: "Served multiple sentences" },
  "Milton Bradley": { sport: "MLB", team: "Multiple teams", position: "OF", crimes: [{ year: 2011, charge: "Spousal abuse / domestic violence", outcome: "Convicted, 32 months prison" }], status: "Left MLB" },
  "Slava Voynov": { sport: "NHL", team: "Los Angeles Kings", position: "D", crimes: [{ year: 2014, charge: "Domestic violence (felony corporal injury)", outcome: "Guilty plea to misdemeanor, 90 days jail" }], status: "Contract terminated, deported to Russia" },
  "Mike Danton": { sport: "NHL", team: "St. Louis Blues", position: "C", crimes: [{ year: 2004, charge: "Conspiracy to commit murder (hiring hitman against agent)", outcome: "Guilty plea, 7.5 years prison" }], status: "Released, played in minor leagues" },
  "Craig MacTavish": { sport: "NHL", team: "Boston Bruins / Edmonton Oilers", position: "C", crimes: [{ year: 1984, charge: "Vehicular homicide (DUI death)", outcome: "Convicted, 1 year prison" }], status: "Returned to NHL as player and coach" },
  "Patrick Kane": { sport: "NHL", team: "Chicago Blackhawks", position: "RW", crimes: [{ year: 2009, charge: "Assault & robbery (altercation with cab driver)", outcome: "Charges reduced, non-criminal disposition" }], status: "Active in NHL" },
  "Tiger Woods": { sport: "Golf (PGA)", team: "N/A", position: "Golfer", crimes: [{ year: 2017, charge: "DUI (found asleep at wheel under influence of medications)", outcome: "Guilty plea to reckless driving, probation, community service" }], status: "Active on PGA Tour" },
  "Oscar Pistorius": { sport: "Track & Field (Paralympics)", team: "South Africa", position: "Sprinter", crimes: [{ year: 2013, charge: "Murder (Reeva Steenkamp)", outcome: "Convicted of murder, sentenced to 13 years 5 months" }], status: "Paroled (2024)" },
  "Tonya Harding": { sport: "Figure Skating", team: "USA", position: "Singles skater", crimes: [{ year: 1994, charge: "Conspiracy to hinder prosecution (Nancy Kerrigan attack)", outcome: "Guilty plea, 3 years probation, $160K fine, community service" }], status: "Banned from US Figure Skating for life" },
};

const ALL_NAMES = Object.keys(CRIME_DATABASE).sort();

const sportColors = {
  "NFL": { bg: "#1a3a1a", border: "#2d6b2d", text: "#4ade80", badge: "#166534" },
  "NBA": { bg: "#3a1a1a", border: "#6b2d2d", text: "#f87171", badge: "#7f1d1d" },
  "MLB": { bg: "#1a2a3a", border: "#2d4d6b", text: "#60a5fa", badge: "#1e3a5f" },
  "NHL": { bg: "#2a2a3a", border: "#4d4d6b", text: "#a78bfa", badge: "#3b3560" },
  "Golf (PGA)": { bg: "#3a3a1a", border: "#6b6b2d", text: "#facc15", badge: "#554400" },
  "Track & Field (Paralympics)": { bg: "#3a2a1a", border: "#6b4d2d", text: "#fb923c", badge: "#5c3310" },
  "Figure Skating": { bg: "#1a3a3a", border: "#2d6b6b", text: "#2dd4bf", badge: "#134e4a" },
};

const getColor = (sport) => sportColors[sport] || { bg: "#2a2a2a", border: "#555", text: "#ccc", badge: "#444" };

function NoiseOverlay() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.04,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    }} />
  );
}

function ScanLine() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.03,
      background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
    }} />
  );
}

function AthleteCard({ name, data }) {
  const [expanded, setExpanded] = useState(false);
  const colors = getColor(data.sport);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        background: `linear-gradient(135deg, ${colors.bg}, #0d0d0d)`,
        border: `1px solid ${colors.border}`,
        borderRadius: 6,
        padding: "20px 24px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        position: "relative",
        overflow: "hidden",
        animation: "fadeSlideIn 0.4s ease forwards",
        opacity: 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = colors.text; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 30px ${colors.border}44`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${colors.text}, transparent)` }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 700, color: "#f0f0f0", letterSpacing: "0.5px", textTransform: "uppercase" }}>{name}</h3>
          <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ background: colors.badge, color: colors.text, padding: "2px 10px", borderRadius: 3, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>{data.sport}</span>
            <span style={{ color: "#888", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>{data.team}</span>
            {data.position && <span style={{ color: "#666", fontSize: 12 }}>• {data.position}</span>}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <span style={{
            background: data.crimes.length >= 3 ? "#7f1d1d" : data.crimes.length >= 2 ? "#78350f" : "#1c1917",
            color: data.crimes.length >= 3 ? "#fca5a5" : data.crimes.length >= 2 ? "#fbbf24" : "#a8a29e",
            padding: "3px 10px", borderRadius: 3, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700
          }}>
            {data.crimes.length} CHARGE{data.crimes.length !== 1 ? "S" : ""}
          </span>
          <span style={{ color: "#555", fontSize: 18, transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▾</span>
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: 20, borderTop: `1px solid ${colors.border}44`, paddingTop: 16 }}>
          {data.crimes.map((crime, i) => (
            <div key={i} style={{ marginBottom: i < data.crimes.length - 1 ? 16 : 0, paddingLeft: 16, borderLeft: `2px solid ${colors.text}33` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: colors.text, fontWeight: 700 }}>{crime.year}</span>
              </div>
              <p style={{ margin: "0 0 4px", fontSize: 14, color: "#d4d4d4", lineHeight: 1.5 }}>{crime.charge}</p>
              <p style={{ margin: 0, fontSize: 13, color: "#888", lineHeight: 1.4, fontStyle: "italic" }}>↳ {crime.outcome}</p>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(name + " " + crime.charge + " " + crime.year + " court case")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 5, marginTop: 8,
                  fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
                  color: colors.text, textDecoration: "none", letterSpacing: "0.5px",
                  padding: "4px 10px", border: `1px solid ${colors.text}44`, borderRadius: 3,
                  background: `${colors.text}0a`, transition: "all 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${colors.text}22`; e.currentTarget.style.borderColor = `${colors.text}88`; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${colors.text}0a`; e.currentTarget.style.borderColor = `${colors.text}44`; }}
              >
                🔍 SEARCH CASE RECORDS
              </a>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(name + " criminal record court documents")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
                color: "#e0e0e0", textDecoration: "none", letterSpacing: "0.5px",
                padding: "7px 14px", border: "1px solid #ffffff22", borderRadius: 4,
                background: "#ffffff0a", transition: "all 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#ffffff18"; e.currentTarget.style.borderColor = "#ffffff44"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#ffffff0a"; e.currentTarget.style.borderColor = "#ffffff22"; }}
            >
              📄 COURT RECORDS
            </a>
            <a
              href={`https://news.google.com/search?q=${encodeURIComponent(name + " arrest charges")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
                color: "#e0e0e0", textDecoration: "none", letterSpacing: "0.5px",
                padding: "7px 14px", border: "1px solid #ffffff22", borderRadius: 4,
                background: "#ffffff0a", transition: "all 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#ffffff18"; e.currentTarget.style.borderColor = "#ffffff44"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#ffffff0a"; e.currentTarget.style.borderColor = "#ffffff22"; }}
            >
              📰 NEWS COVERAGE
            </a>
          </div>
          {data.status && (
            <div style={{ marginTop: 14, padding: "8px 12px", background: "#ffffff06", borderRadius: 4, fontSize: 12, color: "#999", fontFamily: "'JetBrains Mono', monospace" }}>
              STATUS: {data.status}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProSportsCrimeTracker() {
  const [query, setQuery] = useState("");
  const [sportFilter, setSportFilter] = useState("ALL");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const sports = ["ALL", ...new Set(Object.values(CRIME_DATABASE).map(d => d.sport))].sort();

  const filtered = ALL_NAMES.filter(name => {
    const data = CRIME_DATABASE[name];
    const matchesQuery = name.toLowerCase().includes(query.toLowerCase()) || data.team.toLowerCase().includes(query.toLowerCase());
    const matchesSport = sportFilter === "ALL" || data.sport === sportFilter;
    return matchesQuery && matchesSport;
  });

  const suggestions = query.length > 0
    ? ALL_NAMES.filter(n => n.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setShowSuggestions(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const totalCrimes = Object.values(CRIME_DATABASE).reduce((sum, d) => sum + d.crimes.length, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#e0e0e0", position: "relative", overflow: "hidden" }}>
      <NoiseOverlay />
      <ScanLine />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Barlow:wght@300;400;500;600&display=swap');
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes headerGlow { 0%,100% { text-shadow: 0 0 20px #ef444444, 0 0 40px #ef444422; } 50% { text-shadow: 0 0 30px #ef444466, 0 0 60px #ef444433; } }
        * { box-sizing: border-box; }
        input::placeholder { color: #555; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
      `}</style>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 800, margin: "0 auto", padding: "40px 20px 60px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#ef4444", letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>Live Database</span>
          </div>
          <h1 style={{
            fontFamily: "'Oswald', sans-serif", fontSize: "clamp(36px, 7vw, 56px)", fontWeight: 700,
            margin: 0, letterSpacing: 2, textTransform: "uppercase", lineHeight: 1.1,
            background: "linear-gradient(180deg, #ffffff 0%, #ef4444 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "headerGlow 4s ease-in-out infinite",
          }}>
            Pro Sports<br />Crime Tracker
          </h1>
          <p style={{ fontFamily: "'Barlow', sans-serif", color: "#666", fontSize: 14, marginTop: 12, fontWeight: 300, letterSpacing: 1 }}>
            SEARCHABLE DATABASE OF ATHLETE CRIMINAL RECORDS
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 20 }}>
            {[
              { label: "ATHLETES", value: ALL_NAMES.length },
              { label: "CHARGES", value: totalCrimes },
              { label: "SPORTS", value: sports.length - 1 },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 28, fontWeight: 700, color: "#ef4444" }}>{stat.value}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#555", letterSpacing: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Search */}
        <div ref={containerRef} style={{ position: "relative", marginBottom: 20 }}>
          <div style={{
            display: "flex", alignItems: "center", background: "#111", border: "1px solid #2a2a2a",
            borderRadius: 6, padding: "0 16px", transition: "border-color 0.2s",
          }}
            onFocus={() => { }}
          >
            <span style={{ color: "#ef4444", fontSize: 18, marginRight: 12 }}>⌕</span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search athlete name or team..."
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none", color: "#e0e0e0",
                fontFamily: "'Barlow', sans-serif", fontSize: 16, padding: "14px 0", fontWeight: 400,
              }}
            />
            {query && (
              <span onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                style={{ color: "#555", cursor: "pointer", fontSize: 14, padding: 4 }}>✕</span>
            )}
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div style={{
              position: "absolute", top: "100%", left: 0, right: 0, zIndex: 10,
              background: "#151515", border: "1px solid #2a2a2a", borderTop: "none",
              borderRadius: "0 0 6px 6px", overflow: "hidden",
            }}>
              {suggestions.map(name => {
                const d = CRIME_DATABASE[name];
                const c = getColor(d.sport);
                return (
                  <div key={name}
                    onClick={() => { setQuery(name); setShowSuggestions(false); }}
                    style={{ padding: "10px 16px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#1a1a1a"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "#ccc" }}>{name}</span>
                    <span style={{ fontSize: 10, color: c.text, fontFamily: "'JetBrains Mono', monospace", background: c.badge, padding: "1px 6px", borderRadius: 2 }}>{d.sport}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sport filters */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 28 }}>
          {sports.map(sport => {
            const active = sportFilter === sport;
            const c = sport === "ALL" ? { text: "#ef4444", badge: "#1c1917", border: "#333" } : getColor(sport);
            return (
              <button key={sport} onClick={() => setSportFilter(sport)}
                style={{
                  background: active ? (sport === "ALL" ? "#ef4444" : c.badge) : "transparent",
                  color: active ? "#fff" : "#666",
                  border: `1px solid ${active ? (sport === "ALL" ? "#ef4444" : c.text) : "#222"}`,
                  borderRadius: 4, padding: "5px 12px", cursor: "pointer",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600,
                  letterSpacing: "0.5px", textTransform: "uppercase", transition: "all 0.15s",
                }}
              >
                {sport === "ALL" ? "ALL" : sport}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#444", marginBottom: 16, letterSpacing: 1 }}>
          {filtered.length} RESULT{filtered.length !== 1 ? "S" : ""} {query && `FOR "${query.toUpperCase()}"`}
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: 60, color: "#333" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>⊘</div>
              <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16 }}>No records found</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, marginTop: 8, color: "#444" }}>Try a different search or filter</div>
            </div>
          ) : (
            filtered.map((name, i) => (
              <div key={name} style={{ animationDelay: `${i * 0.05}s` }}>
                <AthleteCard name={name} data={CRIME_DATABASE[name]} />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 48, padding: "20px 0", borderTop: "1px solid #1a1a1a" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#333", letterSpacing: 1 }}>
            DISCLAIMER: THIS IS A SAMPLE DATABASE FOR DEMONSTRATION PURPOSES.<br />
            ALL INFORMATION IS SOURCED FROM PUBLIC RECORDS AND NEWS REPORTS.<br />
            INCLUSION DOES NOT IMPLY GUILT WHERE ACQUITTALS OR DISMISSALS OCCURRED.
          </p>
        </div>
      </div>
    </div>
  );
}
