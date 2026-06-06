/* =============================================================
   COMPONENTE: TabSidebar
   Design: Japanese kawaii — colorful side navigation tabs
   ============================================================= */

import { useLocation } from "wouter";

const tabs = [
  { label: "Home", path: "/", color: "#A96F45", textColor: "#FFF7EA" },
  { label: "Yearly", path: "/planner-anual", color: "#F7D98B", textColor: "#5B3A29" },
  { label: "Monthly", path: "/planner-mensal", color: "#BFD8B8", textColor: "#3D5C3A" },
  { label: "Weekly", path: "/planner-semanal", color: "#B9DDE7", textColor: "#2A5A6A" },
  { label: "Daily", path: "/planner-diario", color: "#F4B7C3", textColor: "#7A2D3E" },
  { label: "Goals", path: "/goals-objetivos", color: "#F7D98B", textColor: "#5B3A29" },
  { label: "Habits", path: "/habitos", color: "#BFD8B8", textColor: "#3D5C3A" },
  { label: "Finance", path: "/financeiro", color: "#B9DDE7", textColor: "#2A5A6A" },
  { label: "Health", path: "/saude", color: "#F4B7C3", textColor: "#7A2D3E" },
  { label: "Academic", path: "/academico", color: "#A96F45", textColor: "#FFF7EA" },
  { label: "Class Notes", path: "/anotacoes-aulas", color: "#F7D98B", textColor: "#5B3A29" },
  { label: "Projects", path: "/projetos", color: "#BFD8B8", textColor: "#3D5C3A" },
  { label: "Notes", path: "/notes", color: "#F4B7C3", textColor: "#7A2D3E" },
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
