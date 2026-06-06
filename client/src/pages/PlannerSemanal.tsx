/* =============================================================
   PAGE: Weekly Planner — Digital Kawaii Bunny Planner
   ============================================================= */

import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import TabSidebar from "@/components/TabSidebar";

const CAPIVARA_HABITOS = "/assets/kawaii/kawaii_habitos.png";

const dias = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

export default function PlannerSemanal() {
  const [, navigate] = useLocation();
  const [semana, setSemana] = useLocalStorage('planner_plannersemanal_semana', "");
  const [focoDaSemana, setFocoDaSemana] = useLocalStorage('planner_plannersemanal_focodasemana', "");
  const [tarefas, setTasks] = useLocalStorage('planner_plannersemanal_tarefas', Object.fromEntries(dias.map(d => [d, [{done:false,texto:""},{done:false,texto:""},{done:false,texto:""}]])));
  const [notes, setNotes] = useLocalStorage('planner_plannersemanal_notes', Object.fromEntries(dias.map(d => [d, ""])));
  const [goalsSemana, setGoalsSemana] = useLocalStorage('planner_plannersemanal_goalssemana', ["","","",""]);
  const [habitos, setHabitos] = useLocalStorage('planner_plannersemanal_habitos', [
    {nome:"💧 Water (2L)", dias: Object.fromEntries(dias.map(d=>[d,false]))},
    {nome:"🏃 Exercise", dias: Object.fromEntries(dias.map(d=>[d,false]))},
    {nome:"📚 Study", dias: Object.fromEntries(dias.map(d=>[d,false]))},
    {nome:"😴 Dormir 8h", dias: Object.fromEntries(dias.map(d=>[d,false]))},
  ]);

  const toggleHabito = (hi: number, dia: string) => {
    setHabitos(prev => {
      const n = [...prev];
      n[hi] = { ...n[hi], dias: { ...n[hi].dias, [dia]: !n[hi].dias[dia] } };
      return n;
    });
  };

  const toggleTask = (dia: string, ti: number) => {
    setTasks(prev => {
      const n = { ...prev };
      n[dia] = n[dia].map((t, i) => i === ti ? { ...t, done: !t.done } : t);
      return n;
    });
  };

  return (
    <div className="planner-page" style={{ minHeight: "100vh", background: "#FFF7EA" }}>
      <TabSidebar />

      {/* Header */}
      <div style={{ background: "#B9DDE7", borderBottom: "3px solid #7BB8C8", padding: "1.25rem 2rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <img src={CAPIVARA_HABITOS} alt="Bunny planning" style={{ width: 60, height: 60, objectFit: "contain" }} />
            <div>
              <h1 className="section-title" style={{ fontSize: "1.5rem", color: "#2A5A6A" }}>📋 Weekly Planner</h1>
              <p style={{ color: "#3A7A8A", fontSize: "0.85rem", fontWeight: 600 }}>Organize sua semana com clareza e foco</p>
            </div>
          </div>
          <button className="nav-btn nav-btn-outline" style={{ color: "#2A5A6A", borderColor: "#2A5A6A" }} onClick={() => navigate("/")}>
            ← Index
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "1.5rem auto 2rem", padding: "0 1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

        {/* Header da semana */}
        <div className="planner-card" style={{ padding: "1.25rem", display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <div>
            <div className="field-label" style={{ marginBottom: "0.3rem" }}>📅 Week of</div>
            <input
              value={semana}
              onChange={e => setSemana(e.target.value)}
              placeholder="Ex: 02/06 a 08/06/2025"
              style={{ border: "2px solid #E8D5C0", borderRadius: "0.75rem", padding: "0.5rem 0.9rem", fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#5B3A29", background: "#FFFBF3", outline: "none" }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div className="field-label" style={{ marginBottom: "0.3rem" }}>🎯 Weekly Focus</div>
            <input
              value={focoDaSemana}
              onChange={e => setFocoDaSemana(e.target.value)}
              placeholder="Uma coisa que precisa acontecer esta semana..."
              style={{ width: "100%", border: "2px solid #E8D5C0", borderRadius: "0.75rem", padding: "0.5rem 0.9rem", fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#5B3A29", background: "#FFFBF3", outline: "none" }}
            />
          </div>
          <div style={{ minWidth: 200 }}>
            <div className="field-label" style={{ marginBottom: "0.3rem" }}>🌟 Weekly Goals</div>
            {goalsSemana.map((m, i) => (
              <div key={i} style={{ display: "flex", gap: "0.4rem", alignItems: "center", marginBottom: "0.3rem" }}>
                <span style={{ color: "#F7D98B", fontSize: "0.8rem" }}>★</span>
                <input
                  value={m}
                  onChange={e => { const n=[...goalsSemana]; n[i]=e.target.value; setGoalsSemana(n); }}
                  placeholder={`Goal ${i+1}...`}
                  style={{ flex:1, border:"none", borderBottom:"1.5px dotted #D4B896", padding:"0.25rem 0", fontFamily:"'Nunito',sans-serif", fontWeight:600, fontSize:"0.78rem", color:"#5B3A29", background:"transparent", outline:"none" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Grade semanal */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.75rem" }}>
          {dias.map((dia, di) => {
            const cores = ["#F4B7C3","#B9DDE7","#BFD8B8","#F7D98B","#F4B7C3","#B9DDE7","#BFD8B8"];
            const coresBorda = ["#E8899A","#7BB8C8","#7BA87A","#E8C55A","#E8899A","#7BB8C8","#7BA87A"];
            return (
              <div key={dia} style={{ background: "#FFFBF3", borderRadius: "1rem", border: `2px solid ${coresBorda[di]}`, padding: "0.75rem 0.6rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <div style={{ background: cores[di], borderRadius: "0.6rem", padding: "0.3rem 0.5rem", textAlign: "center", fontWeight: 800, fontSize: "0.78rem", color: "#5B3A29", marginBottom: "0.25rem" }}>
                  {dia}
                </div>
                {tarefas[dia].map((t, ti) => (
                  <div key={ti} style={{ display: "flex", gap: "0.3rem", alignItems: "flex-start" }}>
                    <div
                      className={`habit-check ${t.done ? "checked" : ""}`}
                      style={{ marginTop: 2, width: 16, height: 16, borderRadius: 4 }}
                      onClick={() => toggleTask(dia, ti)}
                    >
                      {t.done && <span style={{ fontSize: "0.6rem" }}>✓</span>}
                    </div>
                    <input
                      value={t.texto}
                      onChange={e => {
                        setTasks(prev => {
                          const n = { ...prev };
                          n[dia] = n[dia].map((tt, i) => i === ti ? { ...tt, texto: e.target.value } : tt);
                          return n;
                        });
                      }}
                      placeholder="Task..."
                      style={{ flex:1, border:"none", borderBottom:"1px dotted #D4B896", padding:"0.2rem 0", fontFamily:"'Nunito',sans-serif", fontWeight:500, fontSize:"0.7rem", color: t.done ? "#B0A090" : "#5B3A29", textDecoration: t.done ? "line-through" : "none", background:"transparent", outline:"none" }}
                    />
                  </div>
                ))}
                <textarea
                  value={notes[dia]}
                  onChange={e => setNotes(prev => ({ ...prev, [dia]: e.target.value }))}
                  placeholder="Notes..."
                  rows={2}
                  style={{ border:"none", borderTop:"1px dashed #E8D5C0", padding:"0.3rem 0", fontFamily:"'Nunito',sans-serif", fontWeight:400, fontSize:"0.68rem", color:"#8B6347", background:"transparent", outline:"none", resize:"none", marginTop:"0.25rem" }}
                />
              </div>
            );
          })}
        </div>

        {/* Mini Habit Tracker */}
        <div className="planner-card" style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <div style={{ width: 4, height: 22, background: "#B9DDE7", borderRadius: 4 }} />
            <h2 className="section-title" style={{ fontSize: "1rem" }}>Mini Habit Tracker</h2>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 4px" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#8B6347", paddingBottom: "0.4rem", minWidth: 120 }}>Habit</th>
                  {dias.map(d => (
                    <th key={d} style={{ textAlign: "center", fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.7rem", color: "#8B6347", paddingBottom: "0.4rem" }}>{d.slice(0,3)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {habitos.map((h, hi) => (
                  <tr key={hi}>
                    <td style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 600, fontSize: "0.8rem", color: "#5B3A29", paddingRight: "0.75rem" }}>{h.nome}</td>
                    {dias.map(dia => (
                      <td key={dia} style={{ textAlign: "center" }}>
                        <div
                          className={`habit-check ${h.dias[dia] ? "checked" : ""}`}
                          style={{ margin: "0 auto" }}
                          onClick={() => toggleHabito(hi, dia)}
                        >
                          {h.dias[dia] && <span style={{ fontSize: "0.7rem" }}>✓</span>}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="nav-btn nav-btn-outline" style={{ color: "#5B3A29", borderColor: "#5B3A29" }} onClick={() => navigate("/planner-mensal")}>
            ← Monthly Planner
          </button>
          <button className="nav-btn" onClick={() => navigate("/planner-diario")}>
            Daily Planner →
          </button>
        </div>
      </div>
    </div>
  );
}
