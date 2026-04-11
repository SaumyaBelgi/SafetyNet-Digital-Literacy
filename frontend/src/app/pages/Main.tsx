import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ChevronRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FeatureCardProps {
  color: "blue" | "teal" | "amber" | "red";
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface DemoItemProps {
  icon: string;
  label: string;
  type: "threat" | "safe";
}

interface StatItemProps {
  num: string;
  txt: string;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);

const LockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const MonitorIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const WarningIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// ─── Animated Lock Logo ───────────────────────────────────────────────────────
const AnimatedLock = () => (
  <div style={{ position: "relative", width: 130, height: 130, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
    <motion.div
      animate={{ scale: [0.92, 1.06, 0.92], opacity: [0.7, 0.3, 0.7] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(99,102,241,0.25)" }}
    />
    <motion.div
      animate={{ scale: [0.88, 1.1, 0.88], opacity: [0.5, 0.2, 0.5] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      style={{ position: "absolute", inset: 12, borderRadius: "50%", border: "1.5px solid rgba(99,102,241,0.18)" }}
    />
    {/* Scan line */}
    <motion.div
      animate={{ y: [-65, 65], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.7), transparent)",
        borderRadius: 1,
      }}
    />
    <motion.div
      animate={{ scale: [1, 1.18, 0.93, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ filter: "drop-shadow(0 4px 16px rgba(99,102,241,0.3))" }}
    >
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lockGrad" x1="10" y1="32" x2="62" y2="68" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4f46e5" />
            <stop offset="1" stopColor="#0f6e56" />
          </linearGradient>
        </defs>
        <rect x="10" y="32" width="52" height="36" rx="9" fill="url(#lockGrad)" />
        <path d="M22 32V22C22 13.16 28.27 7 36 7C43.73 7 50 13.16 50 22V32" stroke="#3730a3" strokeWidth="5" strokeLinecap="round" fill="none" />
        <circle cx="36" cy="50" r="7" fill="white" opacity="0.9" />
        <rect x="33" y="49" width="6" height="8" rx="3" fill="#3730a3" />
      </svg>
    </motion.div>
  </div>
);

// ─── Badge ────────────────────────────────────────────────────────────────────
const badgeStyles: Record<string, React.CSSProperties> = {
  green:  { background: "rgba(16,185,129,0.1)",  border: "1px solid rgba(16,185,129,0.3)",  color: "#065f46" },
  blue:   { background: "rgba(59,130,246,0.1)",  border: "1px solid rgba(59,130,246,0.3)",  color: "#1e40af" },
  amber:  { background: "rgba(245,158,11,0.1)",  border: "1px solid rgba(245,158,11,0.3)",  color: "#78350f" },
};
const dotColors: Record<string, string> = { green: "#10b981", blue: "#3b82f6", amber: "#f59e0b" };

const Badge = ({ color, label }: { color: string; label: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 16px", borderRadius: 999, fontSize: 15, fontWeight: 500, ...badgeStyles[color] }}>
    <motion.div
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      style={{ width: 6, height: 6, borderRadius: "50%", background: dotColors[color], flexShrink: 0 }}
    />
    {label}
  </div>
);

// ─── Feature Card ─────────────────────────────────────────────────────────────
const featureAccents: Record<string, string> = {
  blue:  "linear-gradient(90deg, #3b82f6, #6366f1)",
  teal:  "linear-gradient(90deg, #10b981, #0d9488)",
  amber: "linear-gradient(90deg, #f59e0b, #f97316)",
  red:   "linear-gradient(90deg, #ef4444, #e11d48)",
};
const iconBgs: Record<string, string> = {
  blue:  "rgba(59,130,246,0.1)",
  teal:  "rgba(16,185,129,0.1)",
  amber: "rgba(245,158,11,0.1)",
  red:   "rgba(239,68,68,0.1)",
};
const iconColors: Record<string, string> = { blue: "#3b82f6", teal: "#10b981", amber: "#f59e0b", red: "#ef4444" };

const FeatureCard = ({ color, icon, title, desc }: FeatureCardProps) => (
  <motion.div
    whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(79,70,229,0.12)" }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    style={{
      background: "#fff",
      border: "1px solid rgba(148,163,184,0.18)",
      borderRadius: 16,
      padding: "24px 22px 20px",
      position: "relative",
      overflow: "hidden",
      cursor: "default",
    }}
  >
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: featureAccents[color], borderRadius: "0 0 16px 16px" }} />
    <div style={{ width: 42, height: 42, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: iconBgs[color], marginBottom: 12, color: iconColors[color] }}>
      {icon}
    </div>
    <p style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 6px" }}>{title}</p>
    <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{desc}</p>
  </motion.div>
);

// ─── Demo Item ────────────────────────────────────────────────────────────────
const DemoItem = ({ icon, label, type }: DemoItemProps) => {
  const isThreat = type === "threat";
  return (
    <motion.div
      animate={isThreat
        ? { background: ["rgba(220,38,38,0.1)", "rgba(220,38,38,0.24)", "rgba(220,38,38,0.1)"] }
        : { background: ["rgba(15,118,86,0.08)", "rgba(15,118,86,0.2)", "rgba(15,118,86,0.08)"] }
      }
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      style={{
        borderRadius: 12,
        padding: "14px 16px",
        fontSize: 16,
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: 10,
        border: `1px solid ${isThreat ? "rgba(220,38,38,0.2)" : "rgba(16,185,129,0.2)"}`,
        color: isThreat ? "#991b1b" : "#065f46",
      }}
    >
      <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      <span style={{
        fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", padding: "4px 10px", borderRadius: 999,
        background: isThreat ? "rgba(220,38,38,0.12)" : "rgba(16,185,129,0.12)",
        color: isThreat ? "#dc2626" : "#059669",
      }}>
        {isThreat ? "SCAM" : "SAFE"}
      </span>
    </motion.div>
  );
};

// ─── Stat Item ────────────────────────────────────────────────────────────────
const StatItem = ({ num, txt }: StatItemProps) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ fontSize: 30, fontWeight: 800, color: "#3730a3", letterSpacing: "-0.03em" }}>{num}</div>
    <div style={{ fontSize: 15, color: "#64748b", fontWeight: 500, marginTop: 2 }}>{txt}</div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export function Main() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f4f8",
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* ── Aurora Blobs ── */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -50, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", width: 520, height: 520, borderRadius: "50%", background: "rgba(99,102,241,0.18)", filter: "blur(80px)", top: -120, left: -120, pointerEvents: "none", zIndex: 0 }}
          />
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", width: 480, height: 480, borderRadius: "50%", background: "rgba(20,184,166,0.16)", filter: "blur(80px)", bottom: -100, right: -100, pointerEvents: "none", zIndex: 0 }}
          />
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", background: "rgba(245,158,11,0.12)", filter: "blur(80px)", top: "30%", left: "15%", pointerEvents: "none", zIndex: 0 }}
          />
        </>
      )}

      {/* ── Grid Background ── */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(100,116,139,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 60%, transparent 100%)",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 60%, transparent 100%)",
        }}
      />

      {/* ── Hero Content ── */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 24px 40px", width: "100%", maxWidth: 860 }}>

        <motion.div {...fadeUp(0)}>
          <AnimatedLock />
        </motion.div>

        {/* Badges */}
        <motion.div {...fadeUp(0.15)} style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 22 }}>
          <Badge color="green" label="Safe & Trusted" />
          <Badge color="blue" label="Free to Learn" />
          <Badge color="amber" label="No Tech Knowledge Needed" />
        </motion.div>

        {/* Title */}
        <motion.h1
          {...fadeUp(0.2)}
          style={{
            fontSize: "clamp(42px, 8vw, 80px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            textAlign: "center",
            margin: "0 0 10px",
            background: "linear-gradient(135deg, #1e1b4b 0%, #3730a3 40%, #0f6e56 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          SafetyNet
        </motion.h1>

        <motion.p {...fadeUp(0.3)} style={{ fontSize: "clamp(20px, 3vw, 26px)", color: "#475569", textAlign: "center", maxWidth: 560, lineHeight: 1.6, margin: "0 0 8px", fontWeight: 400 }}>
          Master digital skills. Spot threats. Stay safe.
        </motion.p>

        <motion.p {...fadeUp(0.35)} style={{ fontSize: "clamp(17px, 2.5vw, 20px)", color: "#64748b", textAlign: "center", maxWidth: 500, lineHeight: 1.7, margin: "0 0 36px" }}>
          A stress-free, zero-risk space to help you confidently navigate the internet, recognise scams, and protect your personal information.
        </motion.p>

        {/* CTA */}
        <motion.div {...fadeUp(0.45)}>
          <Link to="/home">
            <motion.button
              whileHover={{ scale: 1.03, y: -3, boxShadow: "0 12px 36px rgba(79,70,229,0.4)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "17px 38px",
                background: "linear-gradient(135deg, #3730a3, #4f46e5)",
                color: "#fff",
                fontSize: 20,
                fontWeight: 700,
                border: "none",
                borderRadius: 16,
                cursor: "pointer",
                letterSpacing: "-0.01em",
                boxShadow: "0 4px 24px rgba(79,70,229,0.3), 0 1px 0 rgba(255,255,255,0.15) inset",
                transition: "box-shadow 0.2s",
                textDecoration: "none",
              }}
            >
              Start Your Journey
              <ChevronRight size={20} style={{ transition: "transform 0.2s" }} />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* ── Feature Cards ── */}
      <motion.div
        {...fadeUp(0.55)}
        style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, width: "100%", maxWidth: 820, padding: "0 20px 50px", position: "relative", zIndex: 10 }}
      >
        <FeatureCard color="blue"  icon={<SearchIcon />}  title="Spot Scam Emails"   desc="Learn to identify fake messages trying to steal your information." />
        <FeatureCard color="teal"  icon={<LockIcon />}    title="Protect Passwords"  desc="Create strong passwords and keep your accounts secure." />
        <FeatureCard color="amber" icon={<MonitorIcon />} title="Safe Browsing"       desc="Know which websites to trust and which ones to avoid." />
        <FeatureCard color="red"   icon={<WarningIcon />} title="Avoid Fraud"         desc="Recognise phone, text, and online fraud before it's too late." />
      </motion.div>

      {/* ── Threat Demo Panel ── */}
      <motion.div
        {...fadeUp(0.65)}
        style={{
          position: "relative", zIndex: 10,
          background: "#fff",
          border: "1px solid rgba(148,163,184,0.18)",
          borderRadius: 20,
          padding: "22px 24px 18px",
          width: "100%", maxWidth: 820,
          margin: "0 20px 50px",
        }}
      >
        {/* Live indicator label */}
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }}
          />
          Live threat detection demo
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          <DemoItem icon="📧" label={`"Urgent! Verify your bank now"`} type="threat" />
          <DemoItem icon="🔒" label="https://mybank.com (padlock)" type="safe" />
          <DemoItem icon="📱" label={`"You've won a prize, call us!"`} type="threat" />
          <DemoItem icon="✅" label="Password with 12+ characters" type="safe" />
        </div>
      </motion.div>

      {/* ── Stats Row ── */}
      <motion.div
        {...fadeUp(0.75)}
        style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap", position: "relative", zIndex: 10, padding: "0 20px 60px" }}
      >
        <StatItem num="100%" txt="Free forever" />
        <StatItem num="Zero" txt="Tech jargon" />
        <StatItem num="Step-by-step" txt="Guided lessons" />
        <StatItem num="Safe" txt="No real risks" />
      </motion.div>
    </div>
  );
}