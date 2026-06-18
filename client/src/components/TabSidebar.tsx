import { useLocation } from "wouter";
import { BookOpen, CalendarDays, CalendarRange, CircleDollarSign, CloudSun, FolderKanban, Heart, History, Home, LayoutGrid, Lightbulb, ListChecks, NotebookPen, Sparkles, Target } from "lucide-react";

const tabs = [
  { label: "Início", icon: Home, path: "/", color: "#FF8BA7" },
  { label: "Ano", icon: CalendarRange, path: "/planner-anual", color: "#FFF4BD" },
  { label: "Mês", icon: CalendarDays, path: "/planner-mensal", color: "#C3F0CA" },
  { label: "Semana", icon: ListChecks, path: "/planner-semanal", color: "#BDE0FE" },
  { label: "Dia", icon: CloudSun, path: "/planner-diario", color: "#FFC2D1" },
  { label: "Metas", icon: Target, path: "/metas-objetivos", color: "#FFF4BD" },
  { label: "Hábitos", icon: Sparkles, path: "/habitos", color: "#C3F0CA" },
  { label: "Finanças", icon: CircleDollarSign, path: "/financeiro", color: "#BDE0FE" },
  { label: "Bem-estar", icon: Heart, path: "/saude", color: "#FFC2D1" },
  { label: "Estudos", icon: BookOpen, path: "/academico", color: "#FF8BA7" },
  { label: "Aulas", icon: NotebookPen, path: "/anotacoes-aulas", color: "#FFF4BD" },
  { label: "Projetos", icon: FolderKanban, path: "/projetos", color: "#C3F0CA" },
  { label: "Ideias", icon: Lightbulb, path: "/notas", color: "#FFC2D1" },
  { label: "Extras", icon: LayoutGrid, path: "/extras", color: "#FFF4BD" },
  { label: "Histórico", icon: History, path: "/historico", color: "#E8D5C0" },
];

export default function TabSidebar() {
  const [location, navigate] = useLocation();
  return <nav className="tab-sidebar no-print" aria-label="Navegação do planner">
    {tabs.map(tab => {
      const Icon = tab.icon;
      return <button key={tab.path} className={`tab-btn ${location === tab.path ? "active" : ""}`} style={{ background: tab.color }} onClick={() => navigate(tab.path)} title={tab.label}><span className="tab-icon"><Icon size={18}/></span><span>{tab.label}</span></button>;
    })}
  </nav>;
}
