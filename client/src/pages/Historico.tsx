import { ChangeEvent, useRef, useState } from "react";
import { useLocation } from "wouter";
import TabSidebar from "@/components/TabSidebar";
import {
  clearCurrentPlanner,
  deletePlannerPeriod,
  downloadPlannerBackup,
  getPlannerHistory,
  importPlannerBackup,
  PlannerPeriod,
  restorePlannerPeriod,
  savePlannerPeriod,
} from "@/lib/plannerHistory";

const banner = "/assets/kawaii/kawaii_capa.png";

function suggestedName() {
  return new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(new Date());
}

export default function Historico() {
  const [, navigate] = useLocation();
  const importInput = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(suggestedName);
  const [history, setHistory] = useState<PlannerPeriod[]>(getPlannerHistory);
  const [message, setMessage] = useState("");

  const save = (startNew: boolean) => {
    if (!name.trim()) {
      setMessage("Digite um nome para identificar este período.");
      return;
    }
    if (startNew && !window.confirm("Salvar o período atual e limpar o planner para começar de novo?")) return;
    setHistory(savePlannerPeriod(name));
    if (startNew) {
      clearCurrentPlanner();
      window.location.href = "/";
      return;
    }
    setMessage(`Uma cópia de "${name.trim()}" foi salva.`);
  };

  const restore = (period: PlannerPeriod) => {
    if (!window.confirm(`Restaurar "${period.name}"? Os dados atuais serão substituídos.`)) return;
    restorePlannerPeriod(period);
    window.location.href = "/";
  };

  const remove = (period: PlannerPeriod) => {
    if (!window.confirm(`Excluir "${period.name}" permanentemente?`)) return;
    setHistory(deletePlannerPeriod(period.id));
  };

  const importBackup = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !window.confirm("Importar este backup? Os dados atuais serão substituídos.")) return;
    try {
      await importPlannerBackup(file);
      window.location.href = "/";
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível importar o backup.");
    }
  };

  return (
    <div className="planner-page history-page" style={{ minHeight: "100vh", background: "#FFF7EA" }}>
      <TabSidebar />
      <header className="history-hero">
        <div>
          <img src={banner} alt="Planner Coelho" />
          <div>
            <h1 className="section-title">Histórico & Backup</h1>
            <p>Salve períodos antigos e proteja os dados do planner.</p>
          </div>
        </div>
        <button className="nav-btn nav-btn-outline" onClick={() => navigate("/")}>← Índice</button>
      </header>

      <main className="history-content">
        <section className="planner-card history-save-card">
          <div>
            <div className="field-label">Nome do período</div>
            <input value={name} onChange={event => setName(event.target.value)} placeholder="Exemplo: Junho 2026" />
            {message && <p className="history-message">{message}</p>}
          </div>
          <div className="history-actions">
            <button className="nav-btn nav-btn-outline" onClick={() => save(false)}>Salvar cópia</button>
            <button className="nav-btn" onClick={() => save(true)}>Salvar e começar novo</button>
          </div>
        </section>

        <section className="planner-card backup-card">
          <div>
            <h2>Backup portátil</h2>
            <p>Baixe um backup completo para restaurar este planner neste ou em outro dispositivo.</p>
          </div>
          <div className="history-actions">
            <button className="nav-btn nav-btn-outline" onClick={downloadPlannerBackup}>Exportar backup</button>
            <button className="nav-btn" onClick={() => importInput.current?.click()}>Importar backup</button>
            <input ref={importInput} type="file" accept=".json,application/json" hidden onChange={importBackup} />
          </div>
        </section>

        <section>
          <div className="history-heading">
            <h2 className="section-title">Períodos salvos</h2>
            <span>{history.length}</span>
          </div>
          {history.length === 0 ? (
            <div className="planner-card history-empty">
              <strong>Nenhum período salvo ainda.</strong>
              <span>Salve uma cópia antes de começar um novo mês ou uma nova fase.</span>
            </div>
          ) : (
            <div className="history-list">
              {history.map(period => (
                <article className="planner-card history-item" key={period.id}>
                  <div>
                    <h3>{period.name}</h3>
                    <p>Salvo em {new Date(period.createdAt).toLocaleString("pt-BR")}</p>
                    <span>{Object.keys(period.data).length} conjuntos de dados guardados</span>
                  </div>
                  <div className="history-item-actions">
                    <button className="nav-btn nav-btn-outline" onClick={() => restore(period)}>Restaurar</button>
                    <button className="history-delete" onClick={() => remove(period)}>Excluir</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
