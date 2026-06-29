/* =============================================================
   PAGE: Monthly Planner — Digital Kawaii Bunny Planner
   ============================================================= */

import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import TabSidebar from "@/components/TabSidebar";

const CAPIVARA_CALENDARIO = "/assets/kawaii/kawaii_calendario.png";

const meses = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const diasSemana = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

interface Prova {
  data: string;
  materia: string;
}

interface Task {
  done: boolean;
  texto: string;
}

export default function PlannerMensal() {
  const [, navigate] = useLocation();
  const hoje = new Date();
  
  // All states use localStorage for automatic persistence
  const [mesAtual, setMesAtual] = useLocalStorage('planner_mensal_mes', hoje.getMonth());
  const initialYear = Math.min(2027, Math.max(2026, hoje.getFullYear()));
  const [anoAtual, setAnoAtual] = useLocalStorage('planner_mensal_ano', initialYear);
  const [notes, setNotes] = useLocalStorage<Record<number, string>>('planner_mensal_notes', {});
  const [goalsMes, setGoalsMes] = useLocalStorage<string[]>('planner_mensal_goals', ["","","",""]);
  const [prioridades, setPriorities] = useLocalStorage<string[]>('planner_mensal_prioridades', ["","",""]);
  const [focoSunes, setFocoSunes] = useLocalStorage('planner_mensal_foco', "");
  const [reflexao, setReflexao] = useLocalStorage('planner_mensal_reflexao', "");
  const [provas, setExams] = useLocalStorage<Prova[]>('planner_mensal_provas', [{data:"",materia:""},{data:"",materia:""}]);
  const [tarefas, setTasks] = useLocalStorage<Task[]>('planner_mensal_tarefas', [{done:false,texto:""},{done:false,texto:""}]);

  const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();
  const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < primeiroDia; i++) cells.push(null);
  for (let d = 1; d <= diasNoMes; d++) cells.push(d);

  const mudarMes = (dir: number) => {
    let m = mesAtual + dir;
    let a = anoAtual;
    if (m < 0) { m = 11; a--; }
    if (m > 11) { m = 0; a++; }
    if (a < 2026 || a > 2027) return;
    setMesAtual(m);
    setAnoAtual(a);
  };

  // CRUD functions
  const addItem = (setter: any) => setter((prev: any[]) => [...prev, typeof prev[0] === 'string' ? "" : (Array.isArray(prev[0]) ? [] : (typeof prev[0] === 'object' ? { ...prev[0], done: false, texto: "", data: "", materia: "" } : ""))]);
  
  const addGoal = () => setGoalsMes(prev => [...prev, ""]);
  const removeGoal = (i: number) => setGoalsMes(prev => prev.filter((_, ii) => ii !== i));

  const addPriority = () => setPriorities(prev => [...prev, ""]);
  const removePriority = (i: number) => setPriorities(prev => prev.filter((_, ii) => ii !== i));

  const addProva = () => setExams(prev => [...prev, { data: "", materia: "" }]);
  const removeProva = (i: number) => setExams(prev => prev.filter((_, ii) => ii !== i));

  const addTask = () => setTasks(prev => [...prev, { done: false, texto: "" }]);
  const removeTask = (i: number) => setTasks(prev => prev.filter((_, ii) => ii !== i));

  const kawaiiBtnStyle = {
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    fontSize: "0.8rem",
    padding: "0.2rem"
  };

  const addBtnStyle = {
    ...kawaiiBtnStyle,
    background: "#BFD8B8",
    color: "#FFF",
    width: 22,
    height: 22,
    borderRadius: "50%",
    fontWeight: "bold"
  };

  return (
    <div className="planner-page" style={{ minHeight: "100vh", background: "#FFF7EA" }}>
      <TabSidebar />

      {/* Header */}
      <div className="planner-page-header" style={{ background: "#BFD8B8", borderBottom: "3px solid #7BA87A", padding: "1.25rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <img src={CAPIVARA_CALENDARIO} alt="Bunny calendar" style={{ width: 60, height: 60, objectFit: "contain" }} />
            <div>
              <h1 className="section-title" style={{ fontSize: "1.5rem", color: "#3D5C3A" }}>🗓️ Monthly Planner</h1>
              <p style={{ color: "#5A7A58", fontSize: "0.85rem", fontWeight: 600 }}>Organize your month with focus and calm</p>
            </div>
          </div>
          <button className="nav-btn nav-btn-outline" style={{ color: "#3D5C3A", borderColor: "#3D5C3A" }} onClick={() => navigate("/")}>
            ← Index
          </button>
        </div>
      </div>

      <div className="planner-content" style={{ maxWidth: 900, margin: "1.5rem auto 2rem", padding: "0 1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        {/* Monthly Focus */}
        <div className="planner-card" style={{ padding: "1.25rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div className="field-label" style={{ marginBottom: "0.4rem" }}>🎯 Foco do Month</div>
            <input
              value={focoSunes}
              onChange={e => setFocoSunes(e.target.value)}
              placeholder="One word or phrase that defines this month..."
              style={{
                width: "100%", border: "2px solid #E8D5C0", borderRadius: "0.75rem",
                padding: "0.6rem 0.9rem", fontFamily: "'Nunito', sans-serif",
                fontWeight: 800, fontSize: "1rem", color: "#5B3A29", background: "#FFFBF3",
                outline: "none",
              }}
            />
          </div>
          <div style={{ flex: 2, minWidth: 260 }}>
            <div className="field-label" style={{ marginBottom: "0.4rem" }}>💭 Previous Month Reflection</div>
            <textarea
              value={reflexao}
              onChange={e => setReflexao(e.target.value)}
              placeholder="O que funcionou? O que quero melhorar?"
              rows={2}
              style={{
                width: "100%", border: "2px solid #E8D5C0", borderRadius: "0.75rem",
                padding: "0.6rem 0.9rem", fontFamily: "'Nunito', sans-serif",
                fontWeight: 500, fontSize: "0.88rem", color: "#5B3A29", background: "#FFFBF3",
                outline: "none", resize: "vertical",
              }}
            />
          </div>
        </div>

        {/* Calendar + lateral */}
        <div className="month-layout-grid" style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "1.25rem" }}>
          {/* Calendar */}
          <div className="planner-card" style={{ padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <button onClick={() => mudarMes(-1)} style={{ background: "#F5EDE0", border: "2px solid #E8D5C0", borderRadius: "0.6rem", padding: "0.3rem 0.7rem", fontWeight: 700, color: "#5B3A29", cursor: "pointer" }}>‹</button>
              <h2 className="section-title" style={{ fontSize: "1.2rem" }}>{meses[mesAtual]} {anoAtual}</h2>
              <button onClick={() => mudarMes(1)} style={{ background: "#F5EDE0", border: "2px solid #E8D5C0", borderRadius: "0.6rem", padding: "0.3rem 0.7rem", fontWeight: 700, color: "#5B3A29", cursor: "pointer" }}>›</button>
            </div>
            <div className="month-calendar-scroll">
            <div className="month-calendar-grid" style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
              {diasSemana.map((d, i) => (
                <div key={i} style={{ textAlign: "center", fontSize: "0.72rem", fontWeight: 800, color: "#A96F45", padding: "4px 0" }}>{d}</div>
              ))}
              {cells.map((cell, i) => (
                <div
                  key={i}
                  style={{
                    minHeight: 52,
                    borderRadius: "0.5rem",
                    border: cell ? "1.5px solid #E8D5C0" : "none",
                    background: cell ? "#FFFBF3" : "transparent",
                    padding: "2px 4px",
                    position: "relative",
                  }}
                >
                  {cell && (
                    <>
                      <div style={{
                        fontSize: "0.72rem", fontWeight: 800,
                        background: cell === hoje.getDate() && mesAtual === hoje.getMonth() && anoAtual === hoje.getFullYear() ? "#A96F45" : "transparent",
                        color: cell === hoje.getDate() && mesAtual === hoje.getMonth() && anoAtual === hoje.getFullYear() ? "#FFF7EA" : "#5B3A29",
                        borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center",
                      }}>{cell}</div>
                      <textarea
                        value={notes[cell] || ""}
                        onChange={e => setNotes(prev => ({ ...prev, [cell]: e.target.value }))}
                        style={{
                          width: "100%", fontSize: "0.6rem", color: "#8B6347",
                          border: "none", background: "transparent", resize: "none",
                          fontFamily: "'Nunito', sans-serif", outline: "none", minHeight: 28,
                        }}
                        placeholder="..."
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
            </div>
          </div>

          {/* Sidebar: goals, priorities, exams */}
          <div className="month-sidebar" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Monthly Goals */}
            <div className="planner-card" style={{ padding: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                <div className="field-label">🌟 Goals do Month</div>
                <button onClick={addGoal} style={addBtnStyle}>+</button>
              </div>
              {goalsMes.map((m, i) => (
                <div key={i} style={{ display: "flex", gap: "0.3rem", alignItems: "center", marginBottom: "0.4rem" }}>
                  <span style={{ color: "#F7D98B", fontSize: "0.9rem" }}>★</span>
                  <input
                    value={m}
                    onChange={e => { const n=[...goalsMes]; n[i]=e.target.value; setGoalsMes(n); }}
                    placeholder={`Goal...`}
                    style={{ flex:1, border:"none", borderBottom:"1.5px dotted #D4B896", padding:"0.3rem 0", fontFamily:"'Nunito',sans-serif", fontWeight:600, fontSize:"0.8rem", color:"#5B3A29", background:"transparent", outline:"none" }}
                  />
                  <button onClick={() => removeGoal(i)} style={{ ...kawaiiBtnStyle, background: "transparent", color: "#F4B7C3" }}>❌</button>
                </div>
              ))}
            </div>

            {/* Priorities */}
            <div className="planner-card" style={{ padding: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                <div className="field-label">🔥 Priorities</div>
                <button onClick={addPriority} style={addBtnStyle}>+</button>
              </div>
              {prioridades.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: "0.3rem", alignItems: "center", marginBottom: "0.4rem" }}>
                  <div style={{ width:14, height:14, borderRadius:4, background:["#F4B7C3","#B9DDE7","#BFD8B8","#F7D98B"][i % 4], flexShrink:0 }} />
                  <input
                    value={p}
                    onChange={e => { const n=[...prioridades]; n[i]=e.target.value; setPriorities(n); }}
                    placeholder={`Priority...`}
                    style={{ flex:1, border:"none", borderBottom:"1.5px dotted #D4B896", padding:"0.3rem 0", fontFamily:"'Nunito',sans-serif", fontWeight:600, fontSize:"0.8rem", color:"#5B3A29", background:"transparent", outline:"none" }}
                  />
                  <button onClick={() => removePriority(i)} style={{ ...kawaiiBtnStyle, background: "transparent", color: "#F4B7C3" }}>❌</button>
                </div>
              ))}
            </div>

            {/* Exams e trabalhos */}
            <div className="planner-card" style={{ padding: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                <div className="field-label">📝 Exams & Assignments</div>
                <button onClick={addProva} style={addBtnStyle}>+</button>
              </div>
              {provas.map((p, i) => (
                <div key={i} className="month-exam-row" style={{ display: "flex", gap: "0.3rem", marginBottom: "0.4rem", alignItems: "center" }}>
                  <input
                    value={p.data}
                    onChange={e => { const n=[...provas]; n[i]={...n[i],data:e.target.value}; setExams(n); }}
                    placeholder="MM/DD"
                    style={{ width:42, border:"2px solid #E8D5C0", borderRadius:"0.5rem", padding:"0.2rem", fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:"0.7rem", color:"#5B3A29", background:"#FFFBF3", outline:"none", textAlign:"center" }}
                  />
                  <input
                    value={p.materia}
                    onChange={e => { const n=[...provas]; n[i]={...n[i],materia:e.target.value}; setExams(n); }}
                    placeholder="Description..."
                    style={{ flex:1, border:"none", borderBottom:"1.5px dotted #D4B896", padding:"0.2rem 0", fontFamily:"'Nunito',sans-serif", fontWeight:500, fontSize:"0.75rem", color:"#5B3A29", background:"transparent", outline:"none" }}
                  />
                  <button onClick={() => removeProva(i)} style={{ ...kawaiiBtnStyle, background: "transparent", color: "#F4B7C3" }}>❌</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Tasks */}
        <div className="planner-card" style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: 4, height: 22, background: "#BFD8B8", borderRadius: 4 }} />
              <h2 className="section-title" style={{ fontSize: "1.1rem" }}>✅ Tasks Importantes do Month</h2>
            </div>
            <button onClick={addTask} style={addBtnStyle}>+</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {tarefas.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <div
                  className={`habit-check ${t.done ? "checked" : ""}`}
                  onClick={() => { const n=[...tarefas]; n[i]={...n[i],done:!n[i].done}; setTasks(n); }}
                >
                  {t.done && <span style={{ fontSize: "0.75rem" }}>✓</span>}
                </div>
                <input
                  value={t.texto}
                  onChange={e => { const n=[...tarefas]; n[i]={...n[i],texto:e.target.value}; setTasks(n); }}
                  placeholder={`Task...`}
                  style={{
                    flex: 1, border: "none", borderBottom: "1.5px dotted #D4B896",
                    padding: "0.4rem 0.2rem", fontFamily: "'Nunito', sans-serif",
                    fontWeight: 500, fontSize: "0.88rem",
                    color: t.done ? "#B0A090" : "#5B3A29",
                    textDecoration: t.done ? "line-through" : "none",
                    background: "transparent", outline: "none",
                  }}
                />
                <button onClick={() => removeTask(i)} style={{ ...kawaiiBtnStyle, background: "transparent", color: "#F4B7C3", fontSize: "0.9rem" }}>🗑️</button>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="planner-subnav" style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="nav-btn nav-btn-outline" style={{ color: "#5B3A29", borderColor: "#5B3A29" }} onClick={() => navigate("/planner-anual")}>
            ← Yearly Overview
          </button>
          <button className="nav-btn" onClick={() => navigate("/planner-semanal")}>
            Weekly Planner →
          </button>
        </div>
      </div>
    </div>
  );
}
