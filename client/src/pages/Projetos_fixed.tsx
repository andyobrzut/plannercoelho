/* =============================================================
   PAGE: Project Management — Digital Kawaii Bunny Planner
   ============================================================= */

import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import TabSidebar from "@/components/TabSidebar";

const CAPIVARA_NOTAS = "/assets/kawaii/kawaii_notas.png";

interface Step {
  titulo: string;
  prazo: string;
  status: "pendente" | "em-andamento" | "completed";
}

interface Project {
  nome: string;
  descricao: string;
  inicio: string;
  fim: string;
  prioridade: "alta" | "media" | "baixa";
  progresso: number;
  etapas: Step[];
}

const statusConfig = {
  "pendente": { label: "Pending", bg: "#F5EDE0", color: "#8B6347" },
  "em-andamento": { label: "In Progress", bg: "#B9DDE7", color: "#2A5A6A" },
  "completed": { label: "Completed", bg: "#BFD8B8", color: "#3D5C3A" },
};

const prioridadeConfig = {
  "alta": { label: "High", bg: "#F4B7C3", color: "#7A2D3E" },
  "media": { label: "Medium", bg: "#F7D98B", color: "#5B3A29" },
  "baixa": { label: "Low", bg: "#BFD8B8", color: "#3D5C3A" },
};

export default function Projects() {
  const [, navigate] = useLocation();
  const [projetos, setProjects] = useLocalStorage<Project[]>('planner_projetos_lista', [
    {
      nome: "", descricao: "", inicio: "", fim: "", prioridade: "media", progresso: 0,
      etapas: [
        { titulo: "", prazo: "", status: "pendente" },
      ],
    }
  ]);
  const [projetoAtivo, setProjectAtivo] = useLocalStorage('planner_projetos_projetoativo', 0);

  const p = projetos[projetoAtivo] || projetos[0];

  const updateProject = (field: keyof Project, value: unknown) => {
    setProjects(prev => prev.map((pp, i) => i === projetoAtivo ? { ...pp, [field]: value } : pp));
  };

  const updateStep = (ei: number, field: keyof Step, value: string) => {
    setProjects(prev => prev.map((pp, i) => i === projetoAtivo ? {
      ...pp,
      etapas: pp.etapas.map((e, ii) => ii === ei ? { ...e, [field]: value } : e),
    } : pp));
  };

  const addStep = () => {
    setProjects(prev => prev.map((pp, i) => i === projetoAtivo ? {
      ...pp,
      etapas: [...pp.etapas, { titulo: "", prazo: "", status: "pendente" as const }],
    } : pp));
  };

  const removeStep = (ei: number) => {
    setProjects(prev => prev.map((pp, i) => i === projetoAtivo ? {
      ...pp,
      etapas: pp.etapas.filter((_, ii) => ii !== ei),
    } : pp));
  };

  const addProject = () => {
    const novoProject: Project = {
      nome: "", descricao: "", inicio: "", fim: "", prioridade: "media" as const, progresso: 0,
      etapas: [{ titulo: "", prazo: "", status: "pendente" as const }],
    };
    setProjects(prev => [...prev, novoProject]);
    setProjectAtivo(projetos.length);
  };

  const removeProject = (i: number) => {
    if (projetos.length <= 1) return;
    setProjects(prev => prev.filter((_, ii) => ii !== i));
    if (projetoAtivo >= i && projetoAtivo > 0) setProjectAtivo(projetoAtivo - 1);
  };

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

  return (
    <div className="planner-page" style={{ minHeight: "100vh", background: "#FFF7EA" }}>
      <TabSidebar />

      <div style={{ background: "#BFD8B8", borderBottom: "3px solid #7BA87A", padding: "1.25rem 2rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <img src={CAPIVARA_NOTAS} alt="Bunny projects" style={{ width: 60, height: 60, objectFit: "contain" }} />
            <div>
              <h1 className="section-title" style={{ fontSize: "1.5rem", color: "#3D5C3A" }}>🚀 Project Management</h1>
              <p style={{ color: "#5A7A58", fontSize: "0.85rem", fontWeight: 600 }}>Planeje, execute e acompanhe seus projetos</p>
            </div>
          </div>
          <button className="nav-btn nav-btn-outline" style={{ color: "#3D5C3A", borderColor: "#3D5C3A" }} onClick={() => navigate("/")}>← Index</button>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "1.5rem auto 2rem", padding: "0 1.5rem", display: "flex", gap: "1.25rem" }}>

        {/* Lista de projetos */}
        <div style={{ width: 220, flexShrink: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div className="field-label" style={{ marginBottom: "0.25rem" }}>Projects</div>
          {projetos.map((proj, i) => (
            <div key={i} style={{ position: "relative", display: "flex", gap: "0.3rem" }}>
              <button
                onClick={() => setProjectAtivo(i)}
                style={{
                  flex: 1,
                  background: i === projetoAtivo ? "#BFD8B8" : "#FFFBF3",
                  border: `2px solid ${i === projetoAtivo ? "#7BA87A" : "#E8D5C0"}`,
                  borderRadius: "0.75rem",
                  padding: "0.6rem 0.75rem",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#5B3A29", marginBottom: "0.15rem" }}>
                  {proj.nome || `Project ${i + 1}`}
                </div>
                <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
                  <span style={{ background: prioridadeConfig[proj.prioridade].bg, color: prioridadeConfig[proj.prioridade].color, borderRadius: "999px", padding: "0.1rem 0.4rem", fontSize: "0.62rem", fontWeight: 700 }}>
                    {prioridadeConfig[proj.prioridade].label}
                  </span>
                  <span style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 600, fontSize: "0.68rem", color: "#8B6347" }}>{proj.progresso}%</span>
                </div>
              </button>
              {projetos.length > 1 && (
                <button onClick={() => removeProject(i)} style={{ ...kawaiiBtnStyle, background: "transparent", color: "#F4B7C3", alignSelf: "center" }}>🗑️</button>
              )}
            </div>
          ))}
          <button className="nav-btn" style={{ fontSize: "0.78rem", padding: "0.4rem 0.75rem", marginTop: "0.25rem" }} onClick={addProject}>
            + Novo Project
          </button>
        </div>

        {/* Detalhes do projeto */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Info do projeto */}
          <div className="planner-card" style={{ padding: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 100px 100px", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div>
                <div className="field-label" style={{ marginBottom: "0.3rem" }}>🚀 Project Name</div>
                <input value={p.nome} onChange={e => updateProject("nome", e.target.value)} placeholder="Name do projeto..." style={{ width: "100%", border: "2px solid #E8D5C0", borderRadius: "0.6rem", padding: "0.4rem 0.6rem", fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#5B3A29", background: "#FFFBF3", outline: "none" }} />
              </div>
              <div>
                <div className="field-label" style={{ marginBottom: "0.3rem" }}>Priority</div>
                <select value={p.prioridade} onChange={e => updateProject("prioridade", e.target.value)} style={{ width: "100%", border: "2px solid #E8D5C0", borderRadius: "0.6rem", padding: "0.4rem 0.5rem", fontFamily: "'Nunito',sans-serif", fontWeight: 600, fontSize: "0.8rem", color: "#5B3A29", background: "#FFFBF3", outline: "none" }}>
                  <option value="alta">🔴 High</option>
                  <option value="media">🟡 Medium</option>
                  <option value="baixa">🟢 Low</option>
                </select>
              </div>
              <div>
                <div className="field-label" style={{ marginBottom: "0.3rem" }}>Home</div>
                <input value={p.inicio} onChange={e => updateProject("inicio", e.target.value)} placeholder="MM/DD" style={{ width: "100%", border: "2px solid #E8D5C0", borderRadius: "0.6rem", padding: "0.4rem 0.5rem", fontFamily: "'Nunito',sans-serif", fontWeight: 600, fontSize: "0.8rem", color: "#5B3A29", background: "#FFFBF3", outline: "none" }} />
              </div>
              <div>
                <div className="field-label" style={{ marginBottom: "0.3rem" }}>Deadline Final</div>
                <input value={p.fim} onChange={e => updateProject("fim", e.target.value)} placeholder="MM/DD" style={{ width: "100%", border: "2px solid #E8D5C0", borderRadius: "0.6rem", padding: "0.4rem 0.5rem", fontFamily: "'Nunito',sans-serif", fontWeight: 600, fontSize: "0.8rem", color: "#5B3A29", background: "#FFFBF3", outline: "none" }} />
              </div>
            </div>
            <div style={{ marginBottom: "0.75rem" }}>
              <div className="field-label" style={{ marginBottom: "0.3rem" }}>Description</div>
              <textarea value={p.descricao} onChange={e => updateProject("descricao", e.target.value)} placeholder="Descreva o objetivo e escopo do projeto..." rows={2} style={{ width: "100%", border: "2px solid #E8D5C0", borderRadius: "0.75rem", padding: "0.5rem 0.9rem", fontFamily: "'Nunito',sans-serif", fontWeight: 500, fontSize: "0.85rem", color: "#5B3A29", background: "#FFFBF3", outline: "none", resize: "vertical" }} />
            </div>
            <div>
              <div className="field-label" style={{ marginBottom: "0.3rem" }}>Progresso Geral: {p.progresso}%</div>
              <input type="range" min={0} max={100} value={p.progresso} onChange={e => updateProject("progresso", Number(e.target.value))} style={{ width: "100%", accentColor: "#A96F45" }} />
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${p.progresso}%` }} />
              </div>
            </div>
          </div>

          {/* Steps do projeto */}
          <div className="planner-card" style={{ padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: 4, height: 22, background: "#BFD8B8", borderRadius: 4 }} />
                <h2 className="section-title" style={{ fontSize: "1rem" }}>📋 Project Steps</h2>
              </div>
              <button className="nav-btn" style={{ fontSize: "0.75rem", padding: "0.3rem 0.65rem" }} onClick={addStep}>+ Step</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {p.etapas.map((e, ei) => (
                <div key={ei} style={{ display: "flex", gap: "0.75rem", alignItems: "center", padding: "0.6rem 0.75rem", background: statusConfig[e.status].bg, borderRadius: "0.75rem", border: "1.5px solid #E8D5C0" }}>
                  <div style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#8B6347", minWidth: 20 }}>{ei + 1}.</div>
                  <input value={e.titulo} onChange={ev => updateStep(ei, "titulo", ev.target.value)} placeholder="Descreva a etapa..." style={{ flex: 1, border: "none", borderBottom: "1.5px dotted #D4B896", fontFamily: "'Nunito',sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "#5B3A29", background: "transparent", outline: "none", padding: "0.2rem 0" }} />
                  <input value={e.prazo} onChange={ev => updateStep(ei, "prazo", ev.target.value)} placeholder="MM/DD" style={{ width: 60, border: "2px solid #E8D5C0", borderRadius: "0.4rem", fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#5B3A29", background: "#FFFBF3", outline: "none", padding: "0.2rem 0.4rem", textAlign: "center" }} />
                  <select value={e.status} onChange={ev => updateStep(ei, "status", ev.target.value as any)} style={{ border: "2px solid #E8D5C0", borderRadius: "0.5rem", fontFamily: "'Nunito',sans-serif", fontWeight: 600, fontSize: "0.75rem", color: statusConfig[e.status].color, background: statusConfig[e.status].bg, outline: "none", padding: "0.2rem 0.4rem" }}>
                    <option value="pendente">Pending</option>
                    <option value="em-andamento">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button onClick={() => removeStep(ei)} style={{ ...kawaiiBtnStyle, background: "transparent", color: "#F4B7C3" }}>❌</button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button className="nav-btn nav-btn-outline" style={{ color: "#5B3A29", borderColor: "#5B3A29" }} onClick={() => navigate("/anotacoes-aulas")}>← Class Notes</button>
            <button className="nav-btn" onClick={() => navigate("/notes")}>Free Notes →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
