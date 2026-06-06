/* =============================================================
   PAGE: Class Notes — Digital Kawaii Bunny Planner
   ============================================================= */

import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import TabSidebar from "@/components/TabSidebar";

const CAPIVARA_NOTAS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663716557953/QNuvBQx5RXonKQaFGDZUsN/capivara_notas-NB52h3su2WreJdNqVZ5Kru.webp";

interface Anotacao {
  data: string;
  disciplina: string;
  tema: string;
  conteudo: string;
  pontosClave: string;
  duvidas: string;
  revisado: boolean;
}

export default function AnotacoesClassNotes() {
  const [, navigate] = useLocation();
  const [anotacoes, setAnotacoes] = useLocalStorage<Anotacao[]>('planner_anotacoesaulas_anotacoes', [
    { data: "", disciplina: "", tema: "", conteudo: "", pontosClave: "", duvidas: "", revisado: false },
    { data: "", disciplina: "", tema: "", conteudo: "", pontosClave: "", duvidas: "", revisado: false },
  ]);
  const [anotacaoAtiva, setAnotacaoAtiva] = useLocalStorage('planner_anotacoesaulas_anotacaoativa', 0);

  const update = (field: keyof Anotacao, value: string | boolean) => {
    setAnotacoes(prev => prev.map((a, i) => i === anotacaoAtiva ? { ...a, [field]: value } : a));
  };

  const addAnotacao = () => {
    setAnotacoes(prev => [...prev, { data: "", disciplina: "", tema: "", conteudo: "", pontosClave: "", duvidas: "", revisado: false }]);
    setAnotacaoAtiva(anotacoes.length);
  };

  const deleteAnotacao = (i: number) => {
    setAnotacoes(prev => prev.filter((_, ii) => ii !== i));
    if (anotacaoAtiva >= i && anotacaoAtiva > 0) setAnotacaoAtiva(anotacaoAtiva - 1);
  };

  const a = anotacoes[anotacaoAtiva];

  return (
    <div className="planner-page" style={{ minHeight: "100vh", background: "#FFF7EA" }}>
      <TabSidebar />

      <div style={{ background: "#F7D98B", borderBottom: "3px solid #E8C55A", padding: "1.25rem 2rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <img src={CAPIVARA_NOTAS} alt="Bunny notes" style={{ width: 60, height: 60, objectFit: "contain" }} />
            <div>
              <h1 className="section-title" style={{ fontSize: "1.5rem", color: "#5B3A29" }}>📝 Class Notes</h1>
              <p style={{ color: "#8B6347", fontSize: "0.85rem", fontWeight: 600 }}>Record, organize, and review your class content</p>
            </div>
          </div>
          <button className="nav-btn nav-btn-outline" style={{ color: "#5B3A29", borderColor: "#5B3A29" }} onClick={() => navigate("/")}>← Index</button>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "1.5rem auto 2rem", padding: "0 1.5rem", display: "flex", gap: "1.25rem" }}>

        {/* Notes list */}
        <div style={{ width: 200, flexShrink: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div className="field-label" style={{ marginBottom: "0.25rem" }}>My Classes</div>
          {anotacoes.map((a, i) => (
            <button
              key={i}
              onClick={() => setAnotacaoAtiva(i)}
              style={{
                background: i === anotacaoAtiva ? "#F7D98B" : "#FFFBF3",
                border: `2px solid ${i === anotacaoAtiva ? "#E8C55A" : "#E8D5C0"}`,
                borderRadius: "0.75rem",
                padding: "0.6rem 0.75rem",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <div style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#5B3A29", marginBottom: "0.15rem" }}>
                {a.disciplina || `Class ${i + 1}`}
              </div>
              <div style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 500, fontSize: "0.7rem", color: "#8B6347" }}>
                {a.data || "Sem data"} {a.revisado ? "✅" : ""}
              </div>
            </button>
          ))}
          <button className="nav-btn" style={{ fontSize: "0.78rem", padding: "0.4rem 0.75rem", marginTop: "0.25rem" }} onClick={addAnotacao}>
            + Nova Class
          </button>
        </div>

        {/* Note editor */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Class header */}
          <div className="planner-card" style={{ padding: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div>
                <div className="field-label" style={{ marginBottom: "0.3rem" }}>📅 Date</div>
                <input value={a.data} onChange={e => update("data", e.target.value)} placeholder="MM/DD/YYYY" style={{ width: "100%", border: "2px solid #E8D5C0", borderRadius: "0.6rem", padding: "0.4rem 0.6rem", fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#5B3A29", background: "#FFFBF3", outline: "none" }} />
              </div>
              <div>
                <div className="field-label" style={{ marginBottom: "0.3rem" }}>📚 Subject</div>
                <input value={a.disciplina} onChange={e => update("disciplina", e.target.value)} placeholder="Name da disciplina..." style={{ width: "100%", border: "2px solid #E8D5C0", borderRadius: "0.6rem", padding: "0.4rem 0.6rem", fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#5B3A29", background: "#FFFBF3", outline: "none" }} />
              </div>
              <div>
                <div className="field-label" style={{ marginBottom: "0.3rem" }}>🏷️ Tema / Assunto</div>
                <input value={a.tema} onChange={e => update("tema", e.target.value)} placeholder="Tema da aula..." style={{ width: "100%", border: "2px solid #E8D5C0", borderRadius: "0.6rem", padding: "0.4rem 0.6rem", fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#5B3A29", background: "#FFFBF3", outline: "none" }} />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div className={`habit-check ${a.revisado ? "checked" : ""}`} onClick={() => update("revisado", !a.revisado)}>
                {a.revisado && <span style={{ fontSize: "0.7rem" }}>✓</span>}
              </div>
              <span style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 600, fontSize: "0.82rem", color: "#5B3A29" }}>Content reviewed</span>
            </div>
          </div>

          {/* Content da aula */}
          <div className="planner-card" style={{ padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <div style={{ width: 4, height: 22, background: "#F7D98B", borderRadius: 4 }} />
              <h2 className="section-title" style={{ fontSize: "1rem" }}>✏️ Class Content</h2>
            </div>
            <textarea
              value={a.conteudo}
              onChange={e => update("conteudo", e.target.value)}
              placeholder="Write the main class content here. Use bullet points, lists, important concepts, formulas, definitions..."
              rows={8}
              style={{ width: "100%", border: "2px solid #E8D5C0", borderRadius: "0.75rem", padding: "0.75rem 1rem", fontFamily: "'Nunito',sans-serif", fontWeight: 500, fontSize: "0.88rem", color: "#5B3A29", background: "#FFFBF3", outline: "none", resize: "vertical", lineHeight: 1.8 }}
            />
          </div>

          {/* Key points and questions */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="planner-card" style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <div style={{ width: 4, height: 22, background: "#BFD8B8", borderRadius: 4 }} />
                <h2 className="section-title" style={{ fontSize: "1rem" }}>⭐ Key Points</h2>
              </div>
              <textarea
                value={a.pontosClave}
                onChange={e => update("pontosClave", e.target.value)}
                placeholder="• Concept 1&#10;• Concept 2&#10;• Concept 3&#10;• Important formula..."
                rows={5}
                style={{ width: "100%", border: "2px solid #E8D5C0", borderRadius: "0.75rem", padding: "0.6rem 0.9rem", fontFamily: "'Nunito',sans-serif", fontWeight: 500, fontSize: "0.85rem", color: "#5B3A29", background: "#FFFBF3", outline: "none", resize: "vertical" }}
              />
            </div>
            <div className="planner-card" style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <div style={{ width: 4, height: 22, background: "#F4B7C3", borderRadius: 4 }} />
                <h2 className="section-title" style={{ fontSize: "1rem" }}>❓ Questions & Doubts</h2>
              </div>
              <textarea
                value={a.duvidas}
                onChange={e => update("duvidas", e.target.value)}
                placeholder="? Question 1&#10;? Question 2&#10;? What to research later..."
                rows={5}
                style={{ width: "100%", border: "2px solid #E8D5C0", borderRadius: "0.75rem", padding: "0.6rem 0.9rem", fontFamily: "'Nunito',sans-serif", fontWeight: 500, fontSize: "0.85rem", color: "#5B3A29", background: "#FFFBF3", outline: "none", resize: "vertical" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button className="nav-btn nav-btn-outline" style={{ color: "#5B3A29", borderColor: "#5B3A29" }} onClick={() => navigate("/academico")}>← Academic</button>
            <button className="nav-btn" onClick={() => navigate("/projetos")}>Projects →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
