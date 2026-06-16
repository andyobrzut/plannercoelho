/* =============================================================
   PAGE: Index — Digital Kawaii Bunny Planner 2026-2027
   Design: Japanese kawaii — cover with navigation cards
   ============================================================= */

import { useLocation } from "wouter";
import TabSidebar from "@/components/TabSidebar";

const CAPIVARA_BANNER = "/assets/kawaii/kawaii_banner.png";
const CAPIVARA_CAPA = "/assets/kawaii/kawaii_capa.png";

const sections = [
  {
    title: "Yearly Overview",
    emoji: "📅",
    desc: "Full calendar, important dates, yearly goals, and your word of the year",
    path: "/planner-anual",
    color: "#F7D98B",
    textColor: "#5B3A29",
    borderColor: "#E8C55A",
  },
  {
    title: "Monthly Planner",
    emoji: "🗓️",
    desc: "Monthly grid, priorities, goals, reflection, and progress tracking",
    path: "/planner-mensal",
    color: "#BFD8B8",
    textColor: "#3D5C3A",
    borderColor: "#7BA87A",
  },
  {
    title: "Weekly Planner",
    emoji: "📋",
    desc: "Weekly organization, tasks, schedule, focus, and habit tracking",
    path: "/planner-semanal",
    color: "#B9DDE7",
    textColor: "#2A5A6A",
    borderColor: "#7BB8C8",
  },
  {
    title: "Daily Planner",
    emoji: "☀️",
    desc: "Daily routine, hourly schedule, mood, gratitude, and personal reflection",
    path: "/planner-diario",
    color: "#F4B7C3",
    textColor: "#7A2D3E",
    borderColor: "#E8899A",
  },
  {
    title: "Goals & Objectives",
    emoji: "🌟",
    desc: "Yearly and monthly goals, detailed action plan, and progress tracking",
    path: "/goals-objetivos",
    color: "#F7D98B",
    textColor: "#5B3A29",
    borderColor: "#E8C55A",
  },
  {
    title: "Habit Tracker",
    emoji: "✅",
    desc: "Track daily habits, build healthy routines, and see your progress",
    path: "/habitos",
    color: "#BFD8B8",
    textColor: "#3D5C3A",
    borderColor: "#7BA87A",
  },
  {
    title: "Finance Tracker",
    emoji: "💰",
    desc: "Income, expenses, student budget, and personal financial goals",
    path: "/financeiro",
    color: "#B9DDE7",
    textColor: "#2A5A6A",
    borderColor: "#7BB8C8",
  },
  {
    title: "Health & Wellness",
    emoji: "🌿",
    desc: "Sleep, hydration, exercise, mood, self-care, and mental balance",
    path: "/saude",
    color: "#F4B7C3",
    textColor: "#7A2D3E",
    borderColor: "#E8899A",
  },
  {
    title: "Planner Academic",
    emoji: "🎓",
    desc: "Up to 8 subjects, grades, averages, absences, exams, and semester goals",
    path: "/academico",
    color: "#A96F45",
    textColor: "#FFF7EA",
    borderColor: "#7A4E30",
  },
  {
    title: "Class Notes",
    emoji: "📝",
    desc: "Class summary, key points, questions, review, and study material",
    path: "/anotacoes-aulas",
    color: "#F7D98B",
    textColor: "#5B3A29",
    borderColor: "#E8C55A",
  },
  {
    title: "Project Management",
    emoji: "🚀",
    desc: "Project planning, steps, deadlines, owners, and tracking",
    path: "/projetos",
    color: "#BFD8B8",
    textColor: "#3D5C3A",
    borderColor: "#7BA87A",
  },
  {
    title: "Free Notes",
    emoji: "💭",
    desc: "Free space for ideas, lists, reflections, and drafts",
    path: "/notes",
    color: "#F4B7C3",
    textColor: "#7A2D3E",
    borderColor: "#E8899A",
  },
];

export default function Indice() {
  const [, navigate] = useLocation();

  return (
    <div className="planner-page" style={{ minHeight: "100vh", background: "#FFF7EA" }}>
      <TabSidebar />

      {/* Header decorativo */}
      <div
        className="planner-home-header"
        style={{
          background: "linear-gradient(135deg, #FFF7EA 0%, #F5EDE0 50%, #FFF0D8 100%)",
          borderBottom: "3px solid #E8D5C0",
          padding: "2rem 2rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorations */}
        <div style={{ position: "absolute", top: 8, left: 20, fontSize: "1.5rem", opacity: 0.3 }}>✨</div>
        <div style={{ position: "absolute", top: 20, left: 80, fontSize: "1rem", opacity: 0.25 }}>🌸</div>
        <div style={{ position: "absolute", bottom: 10, left: 150, fontSize: "1.2rem", opacity: 0.2 }}>⭐</div>
        <div style={{ position: "absolute", top: 15, right: 200, fontSize: "1rem", opacity: 0.25 }}>💕</div>
        <div style={{ position: "absolute", bottom: 8, right: 100, fontSize: "1.3rem", opacity: 0.2 }}>🌿</div>

        <div className="planner-home-header-content" style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", gap: "2rem" }}>
          <img
            src={CAPIVARA_CAPA}
            alt="Bunny studying"
            className="float-anim"
            style={{ width: 130, height: 130, objectFit: "contain", flexShrink: 0 }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
              <span style={{ background: "#F4B7C3", color: "#7A2D3E", borderRadius: "999px", padding: "0.15rem 0.75rem", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em" }}>
                PLANNER DIGITAL
              </span>
              <span style={{ background: "#BFD8B8", color: "#3D5C3A", borderRadius: "999px", padding: "0.15rem 0.75rem", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em" }}>
                KAWAII
              </span>
            </div>
            <h1
              className="section-title"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.15, marginBottom: "0.5rem" }}
            >
              Bunny Planner 2026-2027
            </h1>
            <p style={{ color: "#8B6347", fontSize: "1rem", fontWeight: 600, marginBottom: "0.75rem" }}>
              Your cute space to organize studies, routine, and life!
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {["📚 Studies", "🗓️ Schedule", "💰 Finance", "🌿 Wellness", "🎯 Goals"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "#FFFBF3",
                    border: "1.5px solid #E8D5C0",
                    borderRadius: "999px",
                    padding: "0.2rem 0.65rem",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#8B6347",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Banner bunny */}
      <div style={{ maxWidth: 900, margin: "1.5rem auto 0", padding: "0 1.5rem" }}>
        <div
          style={{
            borderRadius: "1.25rem",
            overflow: "hidden",
            border: "2px solid #E8D5C0",
            boxShadow: "0 4px 16px rgba(169,111,69,0.10)",
          }}
        >
          <img
            src={CAPIVARA_BANNER}
            alt="Kawaii bunnies"
            loading="eager"
            className="planner-hero-banner"
            style={{ width: "100%", height: 160, objectFit: "cover", objectPosition: "center bottom" }}
          />
        </div>
      </div>

      {/* Section index */}
      <div style={{ maxWidth: 900, margin: "1.5rem auto 2rem", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
          <div style={{ width: 4, height: 28, background: "#A96F45", borderRadius: 4 }} />
          <h2 className="section-title" style={{ fontSize: "1.4rem" }}>Planner Index</h2>
          <div style={{ flex: 1, height: 2, background: "#E8D5C0", borderRadius: 2 }} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1rem",
          }}
        >
          {sections.map((section, i) => (
            <button
              key={section.path}
              className="planner-card fade-in"
              style={{
                border: `2px solid ${section.borderColor}`,
                borderRadius: "1.25rem",
                padding: "1rem 1.25rem",
                background: "#FFFBF3",
                cursor: "pointer",
                textAlign: "left",
                animationDelay: `${i * 0.04}s`,
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
              }}
              onClick={() => navigate(section.path)}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "0.75rem",
                  background: section.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                  flexShrink: 0,
                }}
              >
                {section.emoji}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    color: "#5B3A29",
                    marginBottom: "0.2rem",
                  }}
                >
                  {section.title}
                </div>
                <div
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.78rem",
                    color: "#8B6347",
                    lineHeight: 1.4,
                  }}
                >
                  {section.desc}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Decorative footer */}
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem 1.5rem",
            background: "linear-gradient(135deg, #F5EDE0, #FFF0D8)",
            borderRadius: "1.25rem",
            border: "2px solid #E8D5C0",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span style={{ fontSize: "2rem" }}>🦫</span>
          <div>
            <p style={{ fontWeight: 800, color: "#5B3A29", fontSize: "0.9rem", marginBottom: "0.15rem" }}>
              Bunny Tip
            </p>
            <p style={{ color: "#8B6347", fontSize: "0.82rem", fontWeight: 500 }}>
              💡 Use the colored tabs on the right to navigate quickly. All your data is automatically saved in any browser!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
