import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./planner-modern.css";

// Páginas do Planner
import Indice from "./pages/Indice";
import PlannerAnual from "./pages/PlannerAnual";
import PlannerMensal from "./pages/PlannerMensal_fixed";
import PlannerSemanal from "./pages/PlannerSemanal";
import PlannerDiario from "./pages/PlannerDiario";
import MetasObjetivos from "./pages/MetasObjetivos";
import RastreadorHabitos from "./pages/RastreadorHabitos";
import ControleFinanceiro from "./pages/ControleFinanceiro_fixed";
import SaudeBemEstar from "./pages/SaudeBemEstar";
import PlannerAcademico from "./pages/PlannerAcademico_fixed";
import AnotacoesAulas from "./pages/AnotacoesAulas";
import Projetos from "./pages/Projetos_fixed";
import Notas from "./pages/Notas";
import Extras from "./pages/Extras";
import Historico from "./pages/Historico";
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
      <Route path="/goals-objetivos" component={MetasObjetivos} />
      <Route path="/goals" component={MetasObjetivos} />
      <Route path="/metas-objetivos" component={MetasObjetivos} />
      <Route path="/habitos" component={RastreadorHabitos} />
      <Route path="/financeiro" component={ControleFinanceiro} />
      <Route path="/saude" component={SaudeBemEstar} />
      <Route path="/academico" component={PlannerAcademico} />
      <Route path="/anotacoes-aulas" component={AnotacoesAulas} />
      <Route path="/projetos" component={Projetos} />
      <Route path="/notes" component={Notas} />
      <Route path="/ideas" component={Notas} />
      <Route path="/notas" component={Notas} />
      <Route path="/extras" component={Extras} />
      <Route path="/historico" component={Historico} />
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
            <Router />
          </ActivationGate>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
