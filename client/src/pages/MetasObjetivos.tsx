/* =============================================================
   PAGE: Goals & Objectives — Digital Kawaii Bunny Planner
   ============================================================= */

import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import TabSidebar from "@/components/TabSidebar";

const CAPIVARA_METAS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663716557953/QNuvBQx5RXonKQaFGDZUsN/capivara_metas-ndFMbpPvHwFjdRPbs2V5MN.webp";

const categorias = ["📚 Studies","💼 Career","💰 Finance","🌿 Health","👨‍👩‍👧 Family","❤️ Relationships","🎨 Hobbies","✈️ Travel"];

interface Goal {
  titulo: string;
  categoria: string;
  prazo: string;
  progresso: number;
  passos: string[];
  completed: boolean;
}

export default function GoalsObjectives() {
  const [, navigate] = useLocation();
  const [goals, setGoals] = useLocalStorage<Goal[]>('planner_metasobjetivos_goals', [
    { titulo: "", categoria: "📚 Studies", prazo: "", progresso: 0, passos: ["","",""], completed: false },
    { titulo: "", categoria: "💼 Career", prazo: "", progresso: 0, passos: ["","",""], completed: false },
    { titulo: "", categoria: "🌿 Health", prazo: "", progresso: 0, passos: ["","",""], completed: false },
  ]);
  const [sonhos, setDreams] = useLocalStorage('planner_goalsobjetivos_sonhos', ["","","","",""]);
  const [visaoFuturo, setVisaoFuturo] = useLocalStorage('planner_goalsobjetivos_visaofuturo', "");

  const updateGoal = (i: number, field: keyof Goal, value: unknown) => {
    setGoals(prev => prev.map((m, ii) => ii === i ? { ...m, [field]: value } : m));
  };

  const updateStep = (mi: number, pi: number, value: string) => {
    setGoals(prev => prev.map((m, ii) => ii === mi ? { ...m, passos: m.passos.map((p, pii) => pii === pi ? value : p) } : m));
  };

  return (
    <div className="planner-page" style={{ minHeight: "100vh", background: "#FFF7EA" }}>
      <TabSidebar />

      {/* Header */}
      <div style={{ background: "#F7D98B", borderBottom: "3px solid #E8C55A", padding: "1.25rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <img src={CAPIVARA_METAS} alt="Bunny goals" style={{ width: 64, height: 64, objectFit: "contain" }} />
            <div>
              <h1 className="section-title" style={{ fontSize: "1.5rem", color: "#5B3A29" }}>🌟 Goals & Objectives</h1>
              <p style={{ color: "#8B6347", fontSize: "0.85rem", fontWeight: 600 }}>Define, plan, and achieve your dreams</p>
            </div>
          </div>
          <button className="nav-btn nav-btn-outline" style={{ color: "#5B3A29", borderColor: "#5B3A29" }} onClick={() => navigate("/")}>
            ← Index
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "1.5rem auto 2rem", padding: "0 1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        {/* Overview de futuro */}
        <div className="planner-card" style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <div style={{ width: 4, height: 22, background: "#F7D98B", borderRadius: 4 }} />
            <h2 className="section-title" style={{ fontSize: "1.1rem" }}>🔭 My Future Vision</h2>
          </div>
          <textarea
            value={visaoFuturo}
            onChange={e => setVisaoFuturo(e.target.value)}
            placeholder="How do you imagine yourself in 5 years? What will you be doing? How will you feel? Describe it in detail..."
            rows={4}
            style={{ width:"100%", border:"2px solid #E8D5C0", borderRadius:"0.75rem", padding:"0.75rem 1rem", fontFamily:"'Nunito',sans-serif", fontWeight:500, fontSize:"0.9rem", color:"#5B3A29", background:"#FFFBF3", outline:"none", resize:"vertical" }}
          />
        </div>

        {/* Lista de sonhos */}
        <div className="planner-card" style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <div style={{ width: 4, height: 22, background: "#F4B7C3", borderRadius: 4 }} />
            <h2 className="section-title" style={{ fontSize: "1.1rem" }}>💭 Dream List</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {sonhos.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <span style={{ fontSize: "1.1rem" }}>🌙</span>
                <input
                  value={s}
                  onChange={e => { const n=[...sonhos]; n[i]=e.target.value; setDreams(n); }}
                  placeholder={`Dream ${i+1} — what do you want to live, become, or have?`}
                  style={{ flex:1, border:"none", borderBottom:"1.5px dotted #D4B896", padding:"0.4rem 0.2rem", fontFamily:"'Nunito',sans-serif", fontWeight:500, fontSize:"0.88rem", color:"#5B3A29", background:"transparent", outline:"none" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Goals detalhadas */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "-0.5rem" }}>
          <div style={{ width: 4, height: 22, background: "#BFD8B8", borderRadius: 4 }} />
          <h2 className="section-title" style={{ fontSize: "1.1rem" }}>🎯 Goals with Action Plan</h2>
        </div>

        {goals.map((meta, mi) => (
          <div key={mi} className="planner-card" style={{ padding: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 160px 120px", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div>
                <div className="field-label" style={{ marginBottom: "0.3rem" }}>🎯 Goal {mi + 1}</div>
                <input
                  value={meta.titulo}
                  onChange={e => updateGoal(mi, "titulo", e.target.value)}
                  placeholder="Describe your goal clearly and specifically..."
                  style={{ width:"100%", border:"2px solid #E8D5C0", borderRadius:"0.75rem", padding:"0.5rem 0.9rem", fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:"0.9rem", color:"#5B3A29", background:"#FFFBF3", outline:"none" }}
                />
              </div>
              <div>
                <div className="field-label" style={{ marginBottom: "0.3rem" }}>Category</div>
                <select
                  value={meta.categoria}
                  onChange={e => updateGoal(mi, "categoria", e.target.value)}
                  style={{ width:"100%", border:"2px solid #E8D5C0", borderRadius:"0.75rem", padding:"0.5rem 0.6rem", fontFamily:"'Nunito',sans-serif", fontWeight:600, fontSize:"0.8rem", color:"#5B3A29", background:"#FFFBF3", outline:"none" }}
                >
                  {categorias.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <div className="field-label" style={{ marginBottom: "0.3rem" }}>Deadline</div>
                <input
                  value={meta.prazo}
                  onChange={e => updateGoal(mi, "prazo", e.target.value)}
                  placeholder="MM/DD/YYYY"
                  style={{ width:"100%", border:"2px solid #E8D5C0", borderRadius:"0.75rem", padding:"0.5rem 0.6rem", fontFamily:"'Nunito',sans-serif", fontWeight:600, fontSize:"0.8rem", color:"#5B3A29", background:"#FFFBF3", outline:"none" }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "0.75rem" }}>
              <div className="field-label" style={{ marginBottom: "0.4rem" }}>Progresso: {meta.progresso}%</div>
              <input
                type="range" min={0} max={100} value={meta.progresso}
                onChange={e => updateGoal(mi, "progresso", Number(e.target.value))}
                style={{ width: "100%", accentColor: "#A96F45" }}
              />
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${meta.progresso}%` }} />
              </div>
            </div>

            <div>
              <div className="field-label" style={{ marginBottom: "0.4rem" }}>📋 Steps to Achieve</div>
              {meta.passos.map((p, pi) => (
                <div key={pi} style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.35rem" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#BFD8B8", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.7rem", color: "#3D5C3A", flexShrink: 0 }}>{pi+1}</div>
                  <input
                    value={p}
                    onChange={e => updateStep(mi, pi, e.target.value)}
                    placeholder={`Step ${pi+1}...`}
                    style={{ flex:1, border:"none", borderBottom:"1.5px dotted #D4B896", padding:"0.3rem 0", fontFamily:"'Nunito',sans-serif", fontWeight:500, fontSize:"0.85rem", color:"#5B3A29", background:"transparent", outline:"none" }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="nav-btn nav-btn-outline" style={{ color: "#5B3A29", borderColor: "#5B3A29" }} onClick={() => navigate("/planner-diario")}>
            ← Daily Planner
          </button>
          <button className="nav-btn" onClick={() => navigate("/habitos")}>
            Habit Tracker →
          </button>
        </div>
      </div>
    </div>
  );
}
