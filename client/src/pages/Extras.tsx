import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import TabSidebar from "@/components/TabSidebar";

const pages = [
  ["Lista de Desejos", "Itens, links, preços e prioridades"],
  ["Renda Extra", "Ganhos especiais, ideias e registros"],
  ["Gastos Extras", "Compras, despesas e observações"],
  ["Reuniões", "Pauta, decisões e próximos passos"],
  ["Filmes", "Assistidos, notas e comentários"],
  ["Livros", "Leituras, frases e aprendizados"],
  ["Receitas", "Receitas favoritas e variações"],
  ["Viagem", "Roteiro, reservas, orçamento e mala"],
  ["Álbum", "Memórias especiais e legendas"],
  ["Scrapbook", "Ideias, referências e inspirações"],
] as const;

type ExtraData = Record<string, { titulo: string; data: string; detalhes: string; lista: string }>;

export default function Extras() {
  const [, navigate] = useLocation();
  const [active, setActive] = useLocalStorage("planner_extras_ativa", 0);
  const [data, setData] = useLocalStorage<ExtraData>("planner_extras_dados", {});
  const [folderName, setFolderName] = useLocalStorage("planner_extras_pasta", "Minha Pasta 1");
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
            <h1 className="section-title">Páginas Extras</h1>
            <p>Espaços flexíveis para guardar listas, memórias, planos e favoritos.</p>
          </div>
        </div>
        <button className="nav-btn nav-btn-outline" onClick={() => navigate("/")}>← Índice</button>
      </header>

      <main className="rabbit-extra-shell">
        <aside className="rabbit-extra-menu">
          <input value={folderName} onChange={event => setFolderName(event.target.value)} aria-label="Nome da pasta" />
          {pages.map((page, index) => (
            <button key={page[0]} className={active === index ? "active" : ""} onClick={() => setActive(index)}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <span>{page[0]}</span>
            </button>
          ))}
        </aside>

        <section className="planner-card rabbit-extra-editor">
          <span className="field-label">PÁGINA EXTRA {String(active + 1).padStart(2, "0")}</span>
          <h2 className="section-title">{key}</h2>
          <p>{pages[active][1]}</p>

          <div className="rabbit-extra-form-grid">
            <label>Título<input value={item.titulo} onChange={event => update("titulo", event.target.value)} placeholder={`Título para ${key.toLowerCase()}...`} /></label>
            <label>Data<input value={item.data} onChange={event => update("data", event.target.value)} placeholder="DD/MM/AAAA" /></label>
          </div>
          <label className="field-label">Detalhes<textarea value={item.detalhes} onChange={event => update("detalhes", event.target.value)} rows={9} placeholder="Anote as informações importantes aqui..." /></label>
          <label className="field-label">Lista / próximos passos<textarea value={item.lista} onChange={event => update("lista", event.target.value)} rows={6} placeholder="Adicione itens, ideias ou próximos passos..." /></label>

          <div className="planner-bottom-nav">
            <button className="nav-btn nav-btn-outline" onClick={() => navigate("/notas")}>← Ideias</button>
            <button className="nav-btn" onClick={() => navigate("/historico")}>Histórico & Backup →</button>
          </div>
        </section>
      </main>
    </div>
  );
}
