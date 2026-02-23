import { useState, useMemo } from "react";

const stateData = [
  { st: "AL", name: "Alabama", voterID: "Photo ID requested", voterIDStrict: false, onlineReg: true, autoReg: false, sameDay: false, passportPct: 25.3, pocLaw: true, region: "South" },
  { st: "AK", name: "Alaska", voterID: "Non-photo ID requested", voterIDStrict: false, onlineReg: true, autoReg: true, sameDay: true, passportPct: 56.0, pocLaw: false, region: "West" },
  { st: "AZ", name: "Arizona", voterID: "Non-photo ID required", voterIDStrict: true, onlineReg: true, autoReg: false, sameDay: false, passportPct: 43.0, pocLaw: true, region: "West" },
  { st: "AR", name: "Arkansas", voterID: "Photo ID required", voterIDStrict: true, onlineReg: false, autoReg: false, sameDay: false, passportPct: 26.5, pocLaw: false, region: "South" },
  { st: "CA", name: "California", voterID: "No ID required", voterIDStrict: false, onlineReg: true, autoReg: true, sameDay: true, passportPct: 62.7, pocLaw: false, region: "West" },
  { st: "CO", name: "Colorado", voterID: "Non-photo ID requested", voterIDStrict: false, onlineReg: true, autoReg: true, sameDay: true, passportPct: 55.0, pocLaw: false, region: "West" },
  { st: "CT", name: "Connecticut", voterID: "Non-photo ID requested", voterIDStrict: false, onlineReg: true, autoReg: true, sameDay: true, passportPct: 59.6, pocLaw: false, region: "Northeast" },
  { st: "DE", name: "Delaware", voterID: "Non-photo ID requested", voterIDStrict: false, onlineReg: true, autoReg: true, sameDay: true, passportPct: 52.0, pocLaw: false, region: "Northeast" },
  { st: "FL", name: "Florida", voterID: "Photo ID requested", voterIDStrict: false, onlineReg: true, autoReg: false, sameDay: false, passportPct: 47.0, pocLaw: false, region: "South" },
  { st: "GA", name: "Georgia", voterID: "Photo ID required", voterIDStrict: true, onlineReg: true, autoReg: true, sameDay: false, passportPct: 38.0, pocLaw: true, region: "South" },
  { st: "HI", name: "Hawaii", voterID: "No ID required", voterIDStrict: false, onlineReg: true, autoReg: true, sameDay: true, passportPct: 57.0, pocLaw: false, region: "West" },
  { st: "ID", name: "Idaho", voterID: "Photo ID requested", voterIDStrict: false, onlineReg: true, autoReg: false, sameDay: true, passportPct: 42.0, pocLaw: false, region: "West" },
  { st: "IL", name: "Illinois", voterID: "No ID required", voterIDStrict: false, onlineReg: true, autoReg: true, sameDay: true, passportPct: 48.0, pocLaw: false, region: "Midwest" },
  { st: "IN", name: "Indiana", voterID: "Photo ID required", voterIDStrict: true, onlineReg: true, autoReg: false, sameDay: false, passportPct: 33.5, pocLaw: false, region: "Midwest" },
  { st: "IA", name: "Iowa", voterID: "Non-photo ID requested", voterIDStrict: false, onlineReg: true, autoReg: false, sameDay: true, passportPct: 38.0, pocLaw: false, region: "Midwest" },
  { st: "KS", name: "Kansas", voterID: "Photo ID required", voterIDStrict: true, onlineReg: true, autoReg: false, sameDay: false, passportPct: 37.0, pocLaw: true, region: "Midwest" },
  { st: "KY", name: "Kentucky", voterID: "Non-photo ID requested", voterIDStrict: false, onlineReg: true, autoReg: false, sameDay: false, passportPct: 28.0, pocLaw: false, region: "South" },
  { st: "LA", name: "Louisiana", voterID: "Photo ID requested", voterIDStrict: false, onlineReg: true, autoReg: false, sameDay: false, passportPct: 29.1, pocLaw: true, region: "South" },
  { st: "ME", name: "Maine", voterID: "No ID required", voterIDStrict: false, onlineReg: true, autoReg: true, sameDay: true, passportPct: 50.0, pocLaw: false, region: "Northeast" },
  { st: "MD", name: "Maryland", voterID: "No ID required", voterIDStrict: false, onlineReg: true, autoReg: true, sameDay: true, passportPct: 56.0, pocLaw: false, region: "Northeast" },
  { st: "MA", name: "Massachusetts", voterID: "No ID required", voterIDStrict: false, onlineReg: true, autoReg: true, sameDay: true, passportPct: 64.3, pocLaw: false, region: "Northeast" },
  { st: "MI", name: "Michigan", voterID: "Photo ID requested", voterIDStrict: false, onlineReg: true, autoReg: true, sameDay: true, passportPct: 40.0, pocLaw: false, region: "Midwest" },
  { st: "MN", name: "Minnesota", voterID: "No ID required", voterIDStrict: false, onlineReg: true, autoReg: true, sameDay: true, passportPct: 48.0, pocLaw: false, region: "Midwest" },
  { st: "MS", name: "Mississippi", voterID: "Photo ID required", voterIDStrict: true, onlineReg: false, autoReg: false, sameDay: false, passportPct: 20.6, pocLaw: false, region: "South" },
  { st: "MO", name: "Missouri", voterID: "Photo ID requested", voterIDStrict: false, onlineReg: true, autoReg: false, sameDay: false, passportPct: 36.0, pocLaw: false, region: "Midwest" },
  { st: "MT", name: "Montana", voterID: "Photo ID requested", voterIDStrict: false, onlineReg: false, autoReg: false, sameDay: true, passportPct: 44.0, pocLaw: false, region: "West" },
  { st: "NE", name: "Nebraska", voterID: "Photo ID requested", voterIDStrict: false, onlineReg: true, autoReg: false, sameDay: false, passportPct: 38.0, pocLaw: false, region: "Midwest" },
  { st: "NV", name: "Nevada", voterID: "No ID required", voterIDStrict: false, onlineReg: true, autoReg: true, sameDay: true, passportPct: 40.0, pocLaw: false, region: "West" },
  { st: "NH", name: "New Hampshire", voterID: "Non-photo ID requested", voterIDStrict: false, onlineReg: false, autoReg: false, sameDay: true, passportPct: 53.0, pocLaw: true, region: "Northeast" },
  { st: "NJ", name: "New Jersey", voterID: "No ID required", voterIDStrict: false, onlineReg: true, autoReg: true, sameDay: false, passportPct: 68.1, pocLaw: false, region: "Northeast" },
  { st: "NM", name: "New Mexico", voterID: "No ID required", voterIDStrict: false, onlineReg: true, autoReg: true, sameDay: true, passportPct: 35.0, pocLaw: false, region: "West" },
  { st: "NY", name: "New York", voterID: "No ID required", voterIDStrict: false, onlineReg: true, autoReg: true, sameDay: false, passportPct: 64.6, pocLaw: false, region: "Northeast" },
  { st: "NC", name: "North Carolina", voterID: "Photo ID required", voterIDStrict: true, onlineReg: true, autoReg: false, sameDay: true, passportPct: 39.0, pocLaw: false, region: "South" },
  { st: "ND", name: "North Dakota", voterID: "Non-photo ID required", voterIDStrict: true, onlineReg: true, autoReg: false, sameDay: false, passportPct: 42.0, pocLaw: false, region: "Midwest" },
  { st: "OH", name: "Ohio", voterID: "Photo ID required", voterIDStrict: true, onlineReg: true, autoReg: false, sameDay: false, passportPct: 36.0, pocLaw: true, region: "Midwest" },
  { st: "OK", name: "Oklahoma", voterID: "Non-photo ID requested", voterIDStrict: false, onlineReg: true, autoReg: false, sameDay: false, passportPct: 31.8, pocLaw: false, region: "South" },
  { st: "OR", name: "Oregon", voterID: "No ID required", voterIDStrict: false, onlineReg: true, autoReg: true, sameDay: false, passportPct: 52.0, pocLaw: false, region: "West" },
  { st: "PA", name: "Pennsylvania", voterID: "No ID required", voterIDStrict: false, onlineReg: true, autoReg: true, sameDay: false, passportPct: 46.0, pocLaw: false, region: "Northeast" },
  { st: "RI", name: "Rhode Island", voterID: "Photo ID requested", voterIDStrict: false, onlineReg: true, autoReg: true, sameDay: false, passportPct: 49.0, pocLaw: false, region: "Northeast" },
  { st: "SC", name: "South Carolina", voterID: "Photo ID requested", voterIDStrict: false, onlineReg: true, autoReg: false, sameDay: false, passportPct: 33.0, pocLaw: false, region: "South" },
  { st: "SD", name: "South Dakota", voterID: "Photo ID requested", voterIDStrict: false, onlineReg: true, autoReg: false, sameDay: true, passportPct: 37.0, pocLaw: false, region: "Midwest" },
  { st: "TN", name: "Tennessee", voterID: "Photo ID required", voterIDStrict: true, onlineReg: true, autoReg: false, sameDay: false, passportPct: 31.4, pocLaw: false, region: "South" },
  { st: "TX", name: "Texas", voterID: "Photo ID requested", voterIDStrict: false, onlineReg: false, autoReg: false, sameDay: false, passportPct: 39.0, pocLaw: false, region: "South" },
  { st: "UT", name: "Utah", voterID: "Non-photo ID requested", voterIDStrict: false, onlineReg: true, autoReg: false, sameDay: true, passportPct: 46.0, pocLaw: false, region: "West" },
  { st: "VT", name: "Vermont", voterID: "No ID required", voterIDStrict: false, onlineReg: true, autoReg: true, sameDay: true, passportPct: 55.0, pocLaw: false, region: "Northeast" },
  { st: "VA", name: "Virginia", voterID: "Non-photo ID requested", voterIDStrict: false, onlineReg: true, autoReg: false, sameDay: false, passportPct: 52.0, pocLaw: false, region: "South" },
  { st: "WA", name: "Washington", voterID: "Non-photo ID requested", voterIDStrict: false, onlineReg: true, autoReg: true, sameDay: true, passportPct: 54.0, pocLaw: false, region: "West" },
  { st: "WV", name: "West Virginia", voterID: "Non-photo ID requested", voterIDStrict: false, onlineReg: true, autoReg: false, sameDay: false, passportPct: 20.8, pocLaw: false, region: "South" },
  { st: "WI", name: "Wisconsin", voterID: "Photo ID required", voterIDStrict: true, onlineReg: true, autoReg: false, sameDay: true, passportPct: 44.0, pocLaw: false, region: "Midwest" },
  { st: "WY", name: "Wyoming", voterID: "Non-photo ID required", voterIDStrict: true, onlineReg: false, autoReg: false, sameDay: false, passportPct: 40.0, pocLaw: true, region: "West" },
];

// Calculate disruption score
function calcDisruption(s) {
  let score = 0;
  // No current voter ID = biggest jump
  if (s.voterID === "No ID required") score += 3;
  else if (s.voterID.includes("requested")) score += 2;
  else if (s.voterID.includes("required")) score += 1;
  // Online reg would be disrupted
  if (s.onlineReg) score += 2;
  // Auto reg would be gutted
  if (s.autoReg) score += 2;
  // Already has proof-of-citizenship law = less disruption
  if (s.pocLaw) score -= 3;
  // Low passport rate = more citizens affected
  if (s.passportPct < 30) score += 2;
  else if (s.passportPct < 40) score += 1;
  return Math.max(0, Math.min(10, score));
}

stateData.forEach(s => { s.disruption = calcDisruption(s); });

function getDisruptionColor(d) {
  if (d <= 2) return "#2d6a4f";
  if (d <= 4) return "#74a67a";
  if (d <= 6) return "#d4a843";
  if (d <= 8) return "#c97136";
  return "#a4303f";
}

function getDisruptionLabel(d) {
  if (d <= 2) return "Minimal";
  if (d <= 4) return "Low";
  if (d <= 6) return "Moderate";
  if (d <= 8) return "Significant";
  return "Major";
}

function PassportBar({ pct }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, width: "100%" }}>
      <div style={{ flex: 1, height: 8, background: "#1a1a2e", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          width: `${pct}%`, height: "100%",
          background: pct > 50 ? "#4a9d8f" : pct > 35 ? "#d4a843" : "#a4303f",
          borderRadius: 4, transition: "width 0.4s ease"
        }} />
      </div>
      <span style={{ fontSize: 11, color: "#8a8fa8", minWidth: 36, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{pct}%</span>
    </div>
  );
}

function Tag({ children, color = "#2a2a3e", textColor = "#c8cad0" }) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 7px", borderRadius: 4,
      fontSize: 10, fontWeight: 600, letterSpacing: 0.3,
      background: color, color: textColor, whiteSpace: "nowrap"
    }}>{children}</span>
  );
}

function InfoCard({ title, value, sub }) {
  return (
    <div style={{
      background: "#12121f", border: "1px solid #1e1e35", borderRadius: 8,
      padding: "14px 16px", flex: 1, minWidth: 140
    }}>
      <div style={{ fontSize: 10, color: "#6b6f85", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "#e8e9ed", fontVariantNumeric: "tabular-nums" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "#6b6f85", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

export default function SAVEActDashboard() {
  const [sortBy, setSortBy] = useState("disruption");
  const [filterRegion, setFilterRegion] = useState("All");
  const [selectedState, setSelectedState] = useState(null);
  const [showMethodology, setShowMethodology] = useState(false);

  const regions = ["All", "South", "Midwest", "Northeast", "West"];

  const filtered = useMemo(() => {
    let d = [...stateData];
    if (filterRegion !== "All") d = d.filter(s => s.region === filterRegion);
    if (sortBy === "disruption") d.sort((a, b) => b.disruption - a.disruption);
    else if (sortBy === "passport") d.sort((a, b) => a.passportPct - b.passportPct);
    else if (sortBy === "name") d.sort((a, b) => a.name.localeCompare(b.name));
    return d;
  }, [sortBy, filterRegion]);

  const stats = useMemo(() => {
    const f = filtered;
    const noID = f.filter(s => s.voterID === "No ID required").length;
    const hasAVR = f.filter(s => s.autoReg).length;
    const hasOnline = f.filter(s => s.onlineReg).length;
    const hasPOC = f.filter(s => s.pocLaw).length;
    const avgPassport = Math.round(f.reduce((a, s) => a + s.passportPct, 0) / f.length);
    const avgDisruption = (f.reduce((a, s) => a + s.disruption, 0) / f.length).toFixed(1);
    return { noID, hasAVR, hasOnline, hasPOC, avgPassport, avgDisruption, total: f.length };
  }, [filtered]);

  const sel = selectedState ? stateData.find(s => s.st === selectedState) : null;

  return (
    <div style={{
      fontFamily: "'IBM Plex Sans', 'SF Pro Text', -apple-system, sans-serif",
      background: "#0a0a16", color: "#e8e9ed", minHeight: "100vh", padding: "24px 20px"
    }}>
      {/* Header */}
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ marginBottom: 6 }}>
          <span style={{ fontSize: 10, letterSpacing: 2, color: "#4a9d8f", textTransform: "uppercase", fontWeight: 700 }}>
            Policy Analysis
          </span>
        </div>
        <h1 style={{
          fontSize: 28, fontWeight: 800, margin: "0 0 8px 0",
          background: "linear-gradient(135deg, #e8e9ed 0%, #8a8fa8 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          lineHeight: 1.2
        }}>
          The SAVE Act: State-by-State Impact Assessment
        </h1>
        <p style={{ fontSize: 13, color: "#6b6f85", margin: "0 0 4px 0", lineHeight: 1.6 }}>
          How the Safeguard American Voter Eligibility Act (H.R. 22) would change voter registration requirements
          in each state — comparing current systems against proposed federal mandates.
        </p>
        <p style={{ fontSize: 11, color: "#4a4e64", margin: "0 0 20px 0" }}>
          Status: Passed U.S. House Feb 11, 2026 · Awaiting Senate vote · Not yet law
        </p>

        {/* What it does summary */}
        <div style={{
          background: "#12121f", border: "1px solid #1e1e35", borderRadius: 10,
          padding: 20, marginBottom: 20
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#4a9d8f", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>
            What the SAVE Act Would Require
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            {[
              { icon: "📄", label: "Documentary proof of citizenship to register (passport, birth certificate, or citizenship-indicating REAL ID)" },
              { icon: "🏢", label: "In-person document presentation for any registration change (address, name, party)" },
              { icon: "🔍", label: "Mandatory voter roll purges cross-referenced with DHS databases" },
              { icon: "🪪", label: "National photo ID requirement at the polls (stricter than 49 of 50 state laws)" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: 12, color: "#b0b3c2", lineHeight: 1.5 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
          <InfoCard title={`States shown`} value={stats.total} sub={filterRegion !== "All" ? filterRegion + " region" : "All states"} />
          <InfoCard title="No Current Voter ID" value={stats.noID} sub="Would go from no ID → federal doc requirements" />
          <InfoCard title="Have Auto Reg" value={stats.hasAVR} sub="Would be severely gutted" />
          <InfoCard title="Already Have POC Law" value={stats.hasPOC} sub="Least disrupted states" />
          <InfoCard title="Avg Passport Rate" value={stats.avgPassport + "%"} sub="Citizens with valid passport" />
        </div>

        {/* Controls */}
        <div style={{
          display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, color: "#6b6f85", fontWeight: 600 }}>SORT</span>
            {[
              { key: "disruption", label: "Disruption Level" },
              { key: "passport", label: "Passport Rate" },
              { key: "name", label: "A–Z" }
            ].map(o => (
              <button key={o.key} onClick={() => setSortBy(o.key)} style={{
                padding: "5px 10px", borderRadius: 5, border: "1px solid",
                borderColor: sortBy === o.key ? "#4a9d8f" : "#1e1e35",
                background: sortBy === o.key ? "#1a2e2a" : "transparent",
                color: sortBy === o.key ? "#4a9d8f" : "#6b6f85",
                fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
              }}>{o.label}</button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, color: "#6b6f85", fontWeight: 600 }}>REGION</span>
            {regions.map(r => (
              <button key={r} onClick={() => setFilterRegion(r)} style={{
                padding: "5px 10px", borderRadius: 5, border: "1px solid",
                borderColor: filterRegion === r ? "#4a9d8f" : "#1e1e35",
                background: filterRegion === r ? "#1a2e2a" : "transparent",
                color: filterRegion === r ? "#4a9d8f" : "#6b6f85",
                fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
              }}>{r}</button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div style={{
          display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap", alignItems: "center"
        }}>
          <span style={{ fontSize: 10, color: "#6b6f85", fontWeight: 600 }}>DISRUPTION SCALE:</span>
          {[
            { label: "Minimal", color: "#2d6a4f" },
            { label: "Low", color: "#74a67a" },
            { label: "Moderate", color: "#d4a843" },
            { label: "Significant", color: "#c97136" },
            { label: "Major", color: "#a4303f" },
          ].map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
              <span style={{ fontSize: 10, color: "#8a8fa8" }}>{l.label}</span>
            </div>
          ))}
        </div>

        {/* State Detail Panel */}
        {sel && (
          <div style={{
            background: "#12121f", border: "1px solid #1e1e35", borderRadius: 10,
            padding: 20, marginBottom: 16, position: "relative"
          }}>
            <button onClick={() => setSelectedState(null)} style={{
              position: "absolute", top: 12, right: 12, background: "none",
              border: "none", color: "#6b6f85", fontSize: 18, cursor: "pointer"
            }}>×</button>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <span style={{
                fontSize: 28, fontWeight: 800, color: getDisruptionColor(sel.disruption),
                lineHeight: 1
              }}>{sel.st}</span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#e8e9ed" }}>{sel.name}</div>
                <div style={{ fontSize: 11, color: "#6b6f85" }}>{sel.region} · Disruption: {getDisruptionLabel(sel.disruption)}</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 12 }}>
              <div>
                <div style={{ fontWeight: 700, color: "#8a8fa8", marginBottom: 8, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>Current System</div>
                <div style={{ color: "#b0b3c2", lineHeight: 1.8 }}>
                  <div>Voter ID: <span style={{ color: "#e8e9ed" }}>{sel.voterID}</span></div>
                  <div>Online Registration: <span style={{ color: sel.onlineReg ? "#4a9d8f" : "#a4303f" }}>{sel.onlineReg ? "Yes" : "No"}</span></div>
                  <div>Automatic Registration: <span style={{ color: sel.autoReg ? "#4a9d8f" : "#6b6f85" }}>{sel.autoReg ? "Yes" : "No"}</span></div>
                  <div>Same-Day Registration: <span style={{ color: sel.sameDay ? "#4a9d8f" : "#6b6f85" }}>{sel.sameDay ? "Yes" : "No"}</span></div>
                  <div>Existing POC Law: <span style={{ color: sel.pocLaw ? "#4a9d8f" : "#6b6f85" }}>{sel.pocLaw ? "Yes" : "No"}</span></div>
                  <div>Passport Ownership: <span style={{ color: "#e8e9ed" }}>{sel.passportPct}%</span></div>
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "#8a8fa8", marginBottom: 8, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>What Would Change</div>
                <div style={{ color: "#b0b3c2", lineHeight: 1.8, fontSize: 12 }}>
                  {sel.voterID === "No ID required" && <div style={{ color: "#c97136" }}>→ Would go from no voter ID to strict federal photo ID + documentary proof of citizenship</div>}
                  {sel.voterID.includes("requested") && <div style={{ color: "#d4a843" }}>→ Would shift from non-strict ID to mandatory federal photo ID + proof of citizenship</div>}
                  {sel.voterID.includes("required") && !sel.pocLaw && <div style={{ color: "#74a67a" }}>→ Already requires ID; would add documentary proof-of-citizenship for registration</div>}
                  {sel.pocLaw && <div style={{ color: "#2d6a4f" }}>→ Already has proof-of-citizenship law; minimal additional impact</div>}
                  {sel.onlineReg && <div style={{ color: "#c97136" }}>→ Online voter registration would be disrupted or eliminated</div>}
                  {sel.autoReg && <div style={{ color: "#c97136" }}>→ Automatic voter registration system would be gutted</div>}
                  {sel.sameDay && <div style={{ color: "#d4a843" }}>→ Same-day registration would require in-person document presentation</div>}
                  {sel.passportPct < 35 && <div style={{ color: "#a4303f" }}>→ Only {sel.passportPct}% of residents have passports — many would need birth certificates</div>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div style={{
          background: "#12121f", border: "1px solid #1e1e35", borderRadius: 10,
          overflow: "hidden"
        }}>
          {/* Header row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "56px 1fr 140px 160px 72px 72px 72px 56px",
            padding: "10px 14px", borderBottom: "1px solid #1e1e35",
            fontSize: 9, fontWeight: 700, color: "#4a4e64", textTransform: "uppercase", letterSpacing: 1,
            alignItems: "center"
          }}>
            <div>State</div>
            <div>Current Voter ID</div>
            <div>Passport Ownership</div>
            <div>Disruption Level</div>
            <div style={{ textAlign: "center" }}>Online Reg</div>
            <div style={{ textAlign: "center" }}>Auto Reg</div>
            <div style={{ textAlign: "center" }}>POC Law</div>
            <div style={{ textAlign: "center" }}>Score</div>
          </div>

          {/* Rows */}
          {filtered.map((s, i) => (
            <div
              key={s.st}
              onClick={() => setSelectedState(s.st === selectedState ? null : s.st)}
              style={{
                display: "grid",
                gridTemplateColumns: "56px 1fr 140px 160px 72px 72px 72px 56px",
                padding: "8px 14px",
                borderBottom: i < filtered.length - 1 ? "1px solid #13132a" : "none",
                alignItems: "center",
                cursor: "pointer",
                background: s.st === selectedState ? "#1a1a2e" : "transparent",
                transition: "background 0.15s"
              }}
              onMouseEnter={e => { if (s.st !== selectedState) e.currentTarget.style.background = "#15152a"; }}
              onMouseLeave={e => { if (s.st !== selectedState) e.currentTarget.style.background = "transparent"; }}
            >
              <div style={{ fontWeight: 800, fontSize: 14, color: getDisruptionColor(s.disruption) }}>{s.st}</div>
              <div>
                <div style={{ fontSize: 12, color: "#b0b3c2", fontWeight: 500 }}>{s.name}</div>
                <div style={{ fontSize: 10, color: "#4a4e64" }}>{s.voterID}</div>
              </div>
              <PassportBar pct={s.passportPct} />
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: `${s.disruption * 10}%`, height: 6, borderRadius: 3, minWidth: 4,
                  background: getDisruptionColor(s.disruption), transition: "width 0.4s ease"
                }} />
                <span style={{ fontSize: 10, color: "#6b6f85" }}>{getDisruptionLabel(s.disruption)}</span>
              </div>
              <div style={{ textAlign: "center" }}>
                {s.onlineReg
                  ? <Tag color="#1a2e2a" textColor="#4a9d8f">Yes</Tag>
                  : <Tag color="#1a1a2e" textColor="#4a4e64">No</Tag>}
              </div>
              <div style={{ textAlign: "center" }}>
                {s.autoReg
                  ? <Tag color="#1a2e2a" textColor="#4a9d8f">Yes</Tag>
                  : <Tag color="#1a1a2e" textColor="#4a4e64">No</Tag>}
              </div>
              <div style={{ textAlign: "center" }}>
                {s.pocLaw
                  ? <Tag color="#2d6a4f33" textColor="#2d6a4f">Yes</Tag>
                  : <Tag color="#1a1a2e" textColor="#4a4e64">No</Tag>}
              </div>
              <div style={{
                textAlign: "center", fontSize: 14, fontWeight: 800,
                color: getDisruptionColor(s.disruption),
                fontVariantNumeric: "tabular-nums"
              }}>{s.disruption}</div>
            </div>
          ))}
        </div>

        {/* Methodology */}
        <div style={{ marginTop: 20 }}>
          <button
            onClick={() => setShowMethodology(!showMethodology)}
            style={{
              background: "none", border: "1px solid #1e1e35", borderRadius: 6,
              color: "#6b6f85", fontSize: 11, padding: "6px 12px", cursor: "pointer",
              fontWeight: 600
            }}
          >
            {showMethodology ? "Hide" : "Show"} Methodology & Sources
          </button>
          {showMethodology && (
            <div style={{
              background: "#12121f", border: "1px solid #1e1e35", borderRadius: 10,
              padding: 20, marginTop: 10, fontSize: 12, color: "#8a8fa8", lineHeight: 1.7
            }}>
              <div style={{ fontWeight: 700, color: "#b0b3c2", marginBottom: 8 }}>Disruption Score Methodology (0–10)</div>
              <p style={{ margin: "0 0 8px 0" }}>
                The disruption score estimates how much a state's current voter registration and ID systems would need to change
                if the SAVE Act becomes law. It is not a value judgment — it measures degree of systemic change, not whether
                that change is good or bad.
              </p>
              <p style={{ margin: "0 0 8px 0" }}>
                <strong style={{ color: "#b0b3c2" }}>Factors that increase the score:</strong> No current voter ID requirement (+3),
                non-strict ID (+2), strict ID but no POC law (+1), has online voter registration (+2, since it would be disrupted),
                has automatic voter registration (+2, since it would be gutted), passport rate below 30% (+2) or below 40% (+1).
              </p>
              <p style={{ margin: "0 0 8px 0" }}>
                <strong style={{ color: "#b0b3c2" }}>Factors that decrease the score:</strong> Already has a proof-of-citizenship law (-3).
              </p>
              <p style={{ margin: "0 0 12px 0" }}>
                <strong style={{ color: "#b0b3c2" }}>What this does NOT capture:</strong> Demographic composition, actual disenfranchisement estimates,
                birth certificate accessibility, state implementation capacity, or political likelihood of compliance.
              </p>
              <div style={{ fontWeight: 700, color: "#b0b3c2", marginBottom: 8 }}>Sources</div>
              <p style={{ margin: "0 0 4px 0" }}>• Voter ID categories: NCSL Voter Identification Laws (April 2025), Ballotpedia (Oct 2025)</p>
              <p style={{ margin: "0 0 4px 0" }}>• Passport ownership: Rustic Pathways / Bureau of Consular Affairs (2015–2024 issuance data)</p>
              <p style={{ margin: "0 0 4px 0" }}>• Proof-of-citizenship laws: USBirthCertificates.com compilation (Feb 2026): AL, AZ, GA, KS, LA, NH, OH, WY</p>
              <p style={{ margin: "0 0 4px 0" }}>• Online/automatic voter registration: Movement Advancement Project Democracy Maps (Feb 2026), Ballotpedia (Nov 2025)</p>
              <p style={{ margin: "0 0 4px 0" }}>• SAVE Act provisions: Congress.gov H.R. 22 (119th Congress), Bipartisan Policy Center, Brennan Center for Justice</p>
              <p style={{ margin: "8px 0 0 0", fontStyle: "italic", color: "#4a4e64" }}>
                This analysis attempts to present factual, sourced data without advocacy for or against the legislation.
                Disruption scores reflect systemic change magnitude, not policy desirability. Users should consult
                primary sources for the most current information.
              </p>
            </div>
          )}
        </div>

        {/* Balanced perspective footer */}
        <div style={{
          marginTop: 20, padding: 20,
          background: "#12121f", border: "1px solid #1e1e35", borderRadius: 10
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#4a9d8f", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
                Proponents Argue
              </div>
              <div style={{ fontSize: 12, color: "#8a8fa8", lineHeight: 1.7 }}>
                Current law requires citizenship to vote but doesn't require proof — the SAVE Act closes that verification gap.
                83% of Americans support voter photo ID requirements. States that add citizenship indicators to driver's licenses
                make compliance straightforward. The bill ensures election integrity and codifies protections against noncitizen voting.
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#c97136", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
                Opponents Argue
              </div>
              <div style={{ fontSize: 12, color: "#8a8fa8", lineHeight: 1.7 }}>
                Noncitizen voting is already illegal and exceedingly rare — Heritage Foundation's own database found only 24 cases (2003–2023).
                Kansas's proof-of-citizenship law blocked 31,000 eligible citizens (12% of applicants) while the noncitizen rate was 0.002%.
                ~146M Americans lack passports and 21M lack ready access to any citizenship documents, disproportionately affecting low-income and minority voters.
              </div>
            </div>
          </div>
        </div>

        <div style={{ fontSize: 10, color: "#2a2a3e", textAlign: "center", marginTop: 16, padding: "8px 0" }}>
          Data compiled Feb 2026 · Not affiliated with any political organization · For informational purposes only
        </div>
      </div>
    </div>
  );
}
