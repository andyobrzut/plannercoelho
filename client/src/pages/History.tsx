import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import TabSidebar from "@/components/TabSidebar";
import {
  clearCurrentPlanner,
  deletePlannerPeriod,
  downloadPlannerBackup,
  getPlannerHistory,
  importPlannerBackup,
  restorePlannerPeriod,
  savePlannerPeriod,
  type PlannerPeriod,
} from "@/lib/plannerHistory";

const banner = "/assets/kawaii/kawaii_banner.png";

export default function History() {
  const [, navigate] = useLocation();
  const [periodName, setPeriodName] = useState("");
  const [history, setHistory] = useState<PlannerPeriod[]>(() => getPlannerHistory());
  const [message, setMessage] = useState("");

  const defaultName = useMemo(() => {
    const date = new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    return `Planner saved on ${date}`;
  }, []);

  const refresh = () => setHistory(getPlannerHistory());

  const saveCurrent = (resetAfterSave = false) => {
    const name = periodName.trim() || defaultName;
    const updated = savePlannerPeriod(name);
    setHistory(updated);
    setPeriodName("");
    if (resetAfterSave) {
      clearCurrentPlanner();
      setMessage("Saved and ready for a fresh period.");
      window.setTimeout(() => window.location.reload(), 650);
      return;
    }
    setMessage("Current planner saved to history.");
  };

  const restore = (period: PlannerPeriod) => {
    restorePlannerPeriod(period);
    setMessage(`Restored: ${period.name}`);
    window.setTimeout(() => navigate("/"), 650);
  };

  const remove = (id: string) => {
    setHistory(deletePlannerPeriod(id));
    setMessage("Saved period removed.");
  };

  const importBackup = async (file?: File) => {
    if (!file) return;
    try {
      await importPlannerBackup(file);
      refresh();
      setMessage("Backup imported successfully.");
      window.setTimeout(() => window.location.reload(), 650);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not import this backup.");
    }
  };

  return (
    <div className="planner-page history-page" style={{ minHeight: "100vh", background: "#FFF7EA" }}>
      <TabSidebar />

      <header className="history-hero">
        <img src={banner} alt="Kawaii bunny planner banner" />
        <div>
          <span>BACKUP</span>
          <h1 className="section-title">History & Backup</h1>
          <p>Save a full planner period, start a clean one, or move your data to another browser.</p>
        </div>
        <button className="nav-btn nav-btn-outline" onClick={() => navigate("/")}>Index</button>
      </header>

      <main className="history-content">
        <section className="planner-card history-save-card">
          <span className="field-label">SAVE PERIOD</span>
          <h2 className="section-title">Keep a copy before starting fresh</h2>
          <input
            value={periodName}
            onChange={event => setPeriodName(event.target.value)}
            placeholder={defaultName}
          />
          <div className="history-actions">
            <button className="nav-btn" onClick={() => saveCurrent(false)}>Save current planner</button>
            <button className="nav-btn nav-btn-outline" onClick={() => saveCurrent(true)}>Save and start new</button>
          </div>
          {message && <p className="history-message">{message}</p>}
        </section>

        <section className="planner-card backup-card">
          <span className="field-label">PORTABLE BACKUP</span>
          <h2 className="section-title">Export or import your planner</h2>
          <p>Use this when you want to keep a file copy or open the planner in another browser/device.</p>
          <div className="history-actions">
            <button className="nav-btn" onClick={downloadPlannerBackup}>Download backup</button>
            <label className="nav-btn nav-btn-outline">
              Import backup
              <input type="file" accept="application/json" onChange={event => importBackup(event.target.files?.[0])} hidden />
            </label>
          </div>
        </section>

        <section className="planner-card history-list">
          <span className="field-label">SAVED PERIODS</span>
          <h2 className="section-title">{history.length ? "Your saved history" : "No saved periods yet"}</h2>
          <div className="history-items">
            {history.map(period => (
              <article className="history-item" key={period.id}>
                <div>
                  <strong>{period.name}</strong>
                  <span>{new Date(period.createdAt).toLocaleString("en-US")}</span>
                </div>
                <div>
                  <button className="nav-btn" onClick={() => restore(period)}>Restore</button>
                  <button className="nav-btn nav-btn-outline" onClick={() => remove(period.id)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="planner-bottom-nav">
          <button className="nav-btn nav-btn-outline" onClick={() => navigate("/extras")}>Back to Extras</button>
          <button className="nav-btn" onClick={() => navigate("/")}>Finish</button>
        </div>
      </main>
    </div>
  );
}
