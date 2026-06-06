/* =============================================================
   COMPONENTE: TabSidebar
   Design: Kawaii japonês — abas laterais coloridas com navegação
   ============================================================= */

import { useLocation } from "wouter";

const tabs = [
  { label: "Início", path: "/", color: "#FF8BA7", textColor: "#FFFFFF" },
  { label: "Anual", path: "/planner-anual", color: "#FFF4BD", textColor: "#594A4E" },
  { label: "Mensal", path: "/planner-mensal", color: "#C3F0CA", textColor: "#4A6D4C" },
  { label: "Semanal", path: "/planner-semanal", color: "#BDE0FE", textColor: "#2A5A6A" },
  { label: "Diário", path: "/planner-diario", color: "#FFC2D1", textColor: "#7A4A55" },
  { label: "Metas", path: "/metas-objetivos", color: "#FFF4BD", textColor: "#594A4E" },
  { label: "Hábitos", path: "/habitos", color: "#C3F0CA", textColor: "#4A6D4C" },
  { label: "Finanças", path: "/financeiro", color: "#BDE0FE", textColor: "#2A5A6A" },
  { label: "Saúde", path: "/saude", color: "#FFC2D1", textColor: "#7A4A55" },
  { label: "Acadêmico", path: "/academico", color: "#FF8BA7", textColor: "#FFFFFF" },
  { label: "Aulas", path: "/anotacoes-aulas", color: "#FFF4BD", textColor: "#594A4E" },
  { label: "Projetos", path: "/projetos", color: "#C3F0CA", textColor: "#4A6D4C" },
  { label: "Notas", path: "/notas", color: "#FFC2D1", textColor: "#7A4A55" },
];

export default function TabSidebar() {
  const [location, navigate] = useLocation();

  return (
    <div
      className="tab-sidebar no-print"
      style={{
        position: "fixed",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "3px",
        zIndex: 100,
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.path}
          className="tab-btn"
          style={{
            background: tab.color,
            color: tab.textColor,
            opacity: location === tab.path ? 1 : 0.75,
            borderLeft: location === tab.path ? `3px solid ${tab.textColor}` : "3px solid transparent",
          }}
          onClick={() => navigate(tab.path)}
          title={tab.label}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
