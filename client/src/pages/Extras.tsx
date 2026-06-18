import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import TabSidebar from "@/components/TabSidebar";

const pages = [
  ["Wishlist", "Items, links, prices, and priorities"],
  ["Extra Income", "Special income, ideas, and records"],
  ["Extra Expenses", "Purchases, expenses, and notes"],
  ["Meetings", "Agenda, decisions, and next steps"],
  ["Movies", "Watched movies, ratings, and comments"],
  ["Books", "Reading notes, quotes, and takeaways"],
  ["Recipes", "Favorite recipes and variations"],
  ["Travel", "Itinerary, bookings, budget, and packing"],
  ["Album", "Special memories and captions"],
  ["Scrapbook", "Ideas, references, and inspiration"],
] as const;

type ExtraData = Record<string, { titulo: string; data: string; detalhes: string; lista: string }>;

export default function Extras() {
  const [, navigate] = useLocation();
  const [active, setActive] = useLocalStorage("planner_extras_ativa", 0);
  const [data, setData] = useLocalStorage<ExtraData>("planner_extras_dados", {});
  const [folderName, setFolderName] = useLocalStorage("planner_extras_pasta", "My Folder 1");
  const key = pages[active][0];
  const item = data[key] || { titulo: "", data: "", detalhes: "", lista: "" };
  const update = (field: keyof typeof item, value: string) => {
    setData(prev => ({ ...prev, [key]: { ...item, [field]: value } }));
  };

  return (
    <div className="planner-page rabbit-extra-page" style={{ minHeight: "100vh", background: "#FFF7EA" }}>
      <TabSidebar />
      <header className="rabbit-extra-header">
        <div>
          <span>EXTRAS</span>
          <div>
            <h1 className="section-title">Extra Pages</h1>
            <p>Flexible spaces for lists, memories, plans, and favorites.</p>
          </div>
        </div>
        <button className="nav-btn nav-btn-outline" onClick={() => navigate("/")}>Index</button>
      </header>

      <main className="rabbit-extra-shell">
        <aside className="rabbit-extra-menu">
          <input value={folderName} onChange={event => setFolderName(event.target.value)} aria-label="Folder name" />
          {pages.map((page, index) => (
            <button key={page[0]} className={active === index ? "active" : ""} onClick={() => setActive(index)}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <span>{page[0]}</span>
            </button>
          ))}
        </aside>

        <section className="planner-card rabbit-extra-editor">
          <span className="field-label">EXTRA PAGE {String(active + 1).padStart(2, "0")}</span>
          <h2 className="section-title">{key}</h2>
          <p>{pages[active][1]}</p>

          <div className="rabbit-extra-form-grid">
            <label>Title<input value={item.titulo} onChange={event => update("titulo", event.target.value)} placeholder={`Title for ${key.toLowerCase()}...`} /></label>
            <label>Date<input value={item.data} onChange={event => update("data", event.target.value)} placeholder="MM/DD/YYYY" /></label>
          </div>
          <label className="field-label">Details<textarea value={item.detalhes} onChange={event => update("detalhes", event.target.value)} rows={9} placeholder="Write important information here..." /></label>
          <label className="field-label">List / next steps<textarea value={item.lista} onChange={event => update("lista", event.target.value)} rows={6} placeholder="Add items, ideas, or next steps..." /></label>

          <div className="planner-bottom-nav">
            <button className="nav-btn nav-btn-outline" onClick={() => navigate("/notes")}>Back to Ideas</button>
            <button className="nav-btn" onClick={() => navigate("/history")}>History & Backup</button>
          </div>
        </section>
      </main>
    </div>
  );
}
