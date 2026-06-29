import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./planner-modern.css";

// Planner pages
import Indice from "./pages/Indice";
import PlannerAnual from "./pages/PlannerAnual";
import PlannerMensal from "./pages/PlannerMensal_fixed";
import PlannerSemanal from "./pages/PlannerSemanal";
import PlannerDiario from "./pages/PlannerDiario";
import GoalsObjectives from "./pages/MetasObjetivos";
import RastreadorHabitos from "./pages/RastreadorHabitos";
import ControleFinance from "./pages/ControleFinanceiro_fixed";
import SaudeGoodEstar from "./pages/SaudeBemEstar";
import PlannerAcademico from "./pages/PlannerAcademico_fixed";
import AnotacoesClassNotes from "./pages/AnotacoesAulas";
import Projects from "./pages/Projetos_fixed";
import Notes from "./pages/Notas";
import Extras from "./pages/Extras";
import History from "./pages/History";
import AdminCodigos from "./pages/AdminCodigos";
import ActivationGate from "./components/ActivationGate";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Indice} />
      <Route path="/planner-anual" component={PlannerAnual} />
      <Route path="/planner-mensal" component={PlannerMensal} />
      <Route path="/planner-semanal" component={PlannerSemanal} />
      <Route path="/planner-diario" component={PlannerDiario} />
      <Route path="/goals-objetivos" component={GoalsObjectives} />
      <Route path="/goals" component={GoalsObjectives} />
      <Route path="/metas-objetivos" component={GoalsObjectives} />
      <Route path="/habitos" component={RastreadorHabitos} />
      <Route path="/financeiro" component={ControleFinance} />
      <Route path="/saude" component={SaudeGoodEstar} />
      <Route path="/academico" component={PlannerAcademico} />
      <Route path="/ademico" component={PlannerAcademico} />
      <Route path="/anotacoes-aulas" component={AnotacoesClassNotes} />
      <Route path="/projetos" component={Projects} />
      <Route path="/notes" component={Notes} />
      <Route path="/ideas" component={Notes} />
      <Route path="/notas" component={Notes} />
      <Route path="/extras" component={Extras} />
      <Route path="/history" component={History} />
      <Route path="/painel-codigos" component={AdminCodigos} />
      <Route path="/admin-codigos" component={AdminCodigos} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ActivationGate>
            <div className="rabbit-planner-app">
              <Router />
            </div>
          </ActivationGate>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
