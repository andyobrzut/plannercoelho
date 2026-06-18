import { useLocation } from "wouter"; 
  Home, 
  CalendarRange, 
  CalendarDays, 
  ListChecks, 
  CloudSun, 
  Target, 
  Sparkles, 
  CircleDollarSign, 
  Heart, 
  BookOpen, 
  NotebookPen, 
  FolderKanban, 
  Lightbulb 
} from "lucide-react";

export const tabs = [
  { label: "Home", icon: Home, path: "/", color: "#FF8BA7" },
  { label: "Year", icon: CalendarRange, path: "/planner-anual", color: "#FFF4BD" },
  { label: "Month", icon: CalendarDays, path: "/planner-mensal", color: "#C3F0CA" },
  { label: "Week", icon: ListChecks, path: "/planner-semanal", color: "#BDE0FE" },
  { label: "Day", icon: CloudSun, path: "/planner-diario", color: "#FFC2D1" },
  { label: "Goals", icon: Target, path: "/goals", color: "#FFF4BD" },
  { label: "Habits", icon: Sparkles, path: "/habitos", color: "#C3F0CA" },
  { label: "Finances", icon: CircleDollarSign, path: "/financeiro", color: "#BDE0FE" },
  { label: "Wellness", icon: Heart, path: "/saude", color: "#FFC2D1" },
  { label: "Studies", icon: BookOpen, path: "/academico", color: "#FF8BA7" },
  { label: "Classes", icon: NotebookPen, path: "/anotacoes-aulas", color: "#FFF4BD" },
  { label: "Projects", icon: FolderKanban, path: "/projetos", color: "#C3F0CA" },
  { label: "Ideas", icon: Lightbulb, path: "/ideas", color: "#FFC2D1" }
];

export default function TabSidebar() {
  const [location, navigate] = useLocation();
  return <nav className="tab-sidebar no-print" aria-label="Planner navigation">
    {tabs.map(tab => {
      const Icon = tab.icon;
      return <button key={tab.path} className={`tab-btn ${location === tab.path ? "active" : ""}`} style={{ background: tab.color }} onClick={() => navigate(tab.path)} title={tab.label}><span className="tab-icon"><Icon size={18}/></span><span>{tab.label}</span></button>;
    })}
  </nav>;
}
