/* =============================================================
   PÁGINA: Índice — Planner Digital Capivaras Kawaii
   Design: Kawaii japonês — capa com cartões de navegação
   ============================================================= */

import { useLocation } from "wouter";
import TabSidebar from "@/components/TabSidebar";

const CAPIVARA_BANNER = "/assets/kawaii/kawaii_banner.png";
const CAPIVARA_CAPA = "/assets/kawaii/kawaii_capa.png";

const sections = [
  {
    title: "Visão Anual",
    emoji: "📅",
    desc: "Calendário completo, datas importantes, metas anuais e sua palavra do ano",
    path: "/planner-anual",
    color: "#FFF4BD",
    textColor: "#594A4E",
    borderColor: "#FFD1DC",
  },
  {
    title: "Planner Mensal",
    emoji: "🗓️",
    desc: "Grade mensal, prioridades, metas, reflexão e acompanhamento do progresso",
    path: "/planner-mensal",
    color: "#C3F0CA",
    textColor: "#4A6D4C",
    borderColor: "#A8E6B3",
  },
  {
    title: "Planner Semanal",
    emoji: "📋",
    desc: "Organização semanal, tarefas, horários, foco e acompanhamento de hábitos",
    path: "/planner-semanal",
    color: "#BDE0FE",
    textColor: "#2A5A6A",
    borderColor: "#A2D2FF",
  },
  {
    title: "Planner Diário",
    emoji: "☀️",
    desc: "Rotina diária, agenda horária, humor, gratidão e reflexão pessoal",
    path: "/planner-diario",
    color: "#FFC2D1",
    textColor: "#7A4A55",
    borderColor: "#FF9AA2",
  },
  {
    title: "Metas & Objetivos",
    emoji: "🌟",
    desc: "Metas anuais, mensais, plano de ação detalhado e acompanhamento de progresso",
    path: "/metas-objetivos",
    color: "#FFF4BD",
    textColor: "#594A4E",
    borderColor: "#FFD1DC",
  },
  {
    title: "Rastreador de Hábitos",
    emoji: "✅",
    desc: "Rastreie hábitos diários, construa rotinas saudáveis e visualize seu progresso",
    path: "/habitos",
    color: "#C3F0CA",
    textColor: "#4A6D4C",
    borderColor: "#A8E6B3",
  },
  {
    title: "Controle Financeiro",
    emoji: "💰",
    desc: "Receitas, despesas, orçamento estudantil e metas financeiras pessoais",
    path: "/financeiro",
    color: "#BDE0FE",
    textColor: "#2A5A6A",
    borderColor: "#A2D2FF",
  },
  {
    title: "Saúde & Bem-Estar",
    emoji: "🌿",
    desc: "Sono, hidratação, exercícios, humor, autocuidado e equilíbrio mental",
    path: "/saude",
    color: "#FFC2D1",
    textColor: "#7A4A55",
    borderColor: "#FF9AA2",
  },
  {
    title: "Planner Acadêmico",
    emoji: "🎓",
    desc: "Até 8 disciplinas, notas, médias, faltas, provas e metas do semestre",
    path: "/academico",
    color: "#FF8BA7",
    textColor: "#FFFFFF",
    borderColor: "#FF9AA2",
  },
  {
    title: "Anotações de Aulas",
    emoji: "📝",
    desc: "Resumo de aula, pontos-chave, dúvidas, revisão e material de estudo",
    path: "/anotacoes-aulas",
    color: "#FFF4BD",
    textColor: "#594A4E",
    borderColor: "#FFD1DC",
  },
  {
    title: "Gestão de Projetos",
    emoji: "🚀",
    desc: "Planejamento de projetos, etapas, prazos, responsáveis e acompanhamento",
    path: "/projetos",
    color: "#C3F0CA",
    textColor: "#4A6D4C",
    borderColor: "#A8E6B3",
  },
  {
    title: "Notas Livres",
    emoji: "💭",
    desc: "Espaço livre para ideias, listas, reflexões e rascunhos",
    path: "/notas",
    color: "#FFC2D1",
    textColor: "#7A4A55",
    borderColor: "#FF9AA2",
  },
];

export default function Indice() {
  const [, navigate] = useLocation();

  return (
    <div className="planner-page" style={{ minHeight: "100vh", background: "#FFF7EA" }}>
      <TabSidebar />

      {/* Header decorativo */}
      <div
        style={{
          background: "linear-gradient(135deg, #FFF5F7 0%, #FFE5EC 50%, #FFF0F3 100%)",
          borderBottom: "3px solid #FFD1DC",
          padding: "2rem 2rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorações de fundo */}
        <div style={{ position: "absolute", top: 8, left: 20, fontSize: "1.5rem", opacity: 0.3 }}>✨</div>
        <div style={{ position: "absolute", top: 20, left: 80, fontSize: "1rem", opacity: 0.25 }}>🌸</div>
        <div style={{ position: "absolute", bottom: 10, left: 150, fontSize: "1.2rem", opacity: 0.2 }}>⭐</div>
        <div style={{ position: "absolute", top: 15, right: 200, fontSize: "1rem", opacity: 0.25 }}>💕</div>
        <div style={{ position: "absolute", bottom: 8, right: 100, fontSize: "1.3rem", opacity: 0.2 }}>🌿</div>

        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", gap: "2rem" }}>
          <img
            src={CAPIVARA_CAPA}
            alt="Capivara estudando"
            className="float-anim"
            style={{ width: 130, height: 130, objectFit: "contain", flexShrink: 0 }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
              <span style={{ background: "#FFC2D1", color: "#7A4A55", borderRadius: "999px", padding: "0.15rem 0.75rem", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em" }}>
                PLANNER DIGITAL
              </span>
              <span style={{ background: "#C3F0CA", color: "#4A6D4C", borderRadius: "999px", padding: "0.15rem 0.75rem", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em" }}>
                KAWAII
              </span>
            </div>
            <h1
              className="section-title"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.15, marginBottom: "0.5rem" }}
            >
              Meu Planner Kawaii 🍓
            </h1>
            <p style={{ color: "#8B6347", fontSize: "1rem", fontWeight: 600, marginBottom: "0.75rem" }}>
              Seu espaço fofo para organizar estudos, rotina e vida!
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {["📚 Estudos", "🗓️ Agenda", "💰 Finanças", "🌿 Bem-Estar", "🎯 Metas"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "#FFFBF3",
                    border: "1.5px solid #E8D5C0",
                    borderRadius: "999px",
                    padding: "0.2rem 0.65rem",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#8B6347",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Banner capivara */}
      <div style={{ maxWidth: 900, margin: "1.5rem auto 0", padding: "0 1.5rem" }}>
        <div
          style={{
            borderRadius: "1.25rem",
            overflow: "hidden",
            border: "2px solid #E8D5C0",
            boxShadow: "0 4px 16px rgba(169,111,69,0.10)",
          }}
        >
          <img
            src={CAPIVARA_BANNER}
            alt="Capivaras kawaii"
            style={{ width: "100%", height: 160, objectFit: "cover", objectPosition: "center 30%" }}
          />
        </div>
      </div>

      {/* Índice de seções */}
      <div style={{ maxWidth: 900, margin: "1.5rem auto 2rem", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
          <div style={{ width: 4, height: 28, background: "#A96F45", borderRadius: 4 }} />
          <h2 className="section-title" style={{ fontSize: "1.4rem" }}>Índice do Planner</h2>
          <div style={{ flex: 1, height: 2, background: "#E8D5C0", borderRadius: 2 }} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1rem",
          }}
        >
          {sections.map((section, i) => (
            <button
              key={section.path}
              className="planner-card fade-in"
              style={{
                border: `2px solid ${section.borderColor}`,
                borderRadius: "1.25rem",
                padding: "1rem 1.25rem",
                background: "#FFFBF3",
                cursor: "pointer",
                textAlign: "left",
                animationDelay: `${i * 0.04}s`,
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
              }}
              onClick={() => navigate(section.path)}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "0.75rem",
                  background: section.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                  flexShrink: 0,
                }}
              >
                {section.emoji}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    color: "#5B3A29",
                    marginBottom: "0.2rem",
                  }}
                >
                  {section.title}
                </div>
                <div
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.78rem",
                    color: "#8B6347",
                    lineHeight: 1.4,
                  }}
                >
                  {section.desc}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Seção de Compatibilidade */}
        <div
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            background: "linear-gradient(135deg, #B9DDE7 0%, #BFD8B8 100%)",
            borderRadius: "1.25rem",
            border: "2px solid #7BA87A",
          }}
        >
          <h3 style={{ fontWeight: 800, color: "#2A5A6A", fontSize: "1.05rem", marginBottom: "0.75rem" }}>
            📱 Compatível com Seus Aplicativos Favoritos
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.5rem" }}>
            {["GoodNotes", "Notability", "Apple Notes", "PDF Expert", "Noteshelf", "Flexcil", "Xodo (Android)", "MetaMoJi Note", "Adobe Acrobat", "Evernote", "ZoomNotes", "Google Keep"].map((app) => (
              <div
                key={app}
                style={{
                  background: "#FFFBF3",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "0.6rem",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#2A5A6A",
                  textAlign: "center",
                  border: "1px solid #B9DDE7",
                }}
              >
                {app}
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Benefícios */}
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1.5rem",
            background: "linear-gradient(135deg, #F7D98B 0%, #F4B7C3 100%)",
            borderRadius: "1.25rem",
            border: "2px solid #E8C55A",
          }}
        >
          <h3 style={{ fontWeight: 800, color: "#5B3A29", fontSize: "1.05rem", marginBottom: "0.75rem" }}>
            ✨ Por Que Este Planner é Incrível
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { icon: "🎯", title: "Personalização Total", desc: "Customize cores, layouts, ícones e muito mais" },
              { icon: "🔗", title: "Tudo Conectado", desc: "Hiperlinks funcionam em GoodNotes e Notability" },
              { icon: "📅", title: "Integração de Calendário", desc: "Sincronize com Google Calendar ou Apple Calendar" },
              { icon: "♾️", title: "Compra Única", desc: "Sem assinatura! Atualizações automáticas para sempre" },
            ].map((benefit, i) => (
              <div key={i} style={{ display: "flex", gap: "0.75rem" }}>
                <div style={{ fontSize: "1.5rem", flexShrink: 0 }}>{benefit.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: "#5B3A29", fontSize: "0.9rem", marginBottom: "0.2rem" }}>
                    {benefit.title}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#8B6347", fontWeight: 500 }}>
                    {benefit.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé decorativo */}
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem 1.5rem",
            background: "linear-gradient(135deg, #F5EDE0, #FFF0D8)",
            borderRadius: "1.25rem",
            border: "2px solid #E8D5C0",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span style={{ fontSize: "2rem" }}>🐰</span>
          <div>
            <p style={{ fontWeight: 800, color: "#594A4E", fontSize: "0.9rem", marginBottom: "0.15rem" }}>
              Dica do Coelhinho
            </p>
            <p style={{ color: "#8B6347", fontSize: "0.82rem", fontWeight: 500 }}>
              💡 Use as abas coloridas à direita para navegar rapidamente. Todos os seus dados são salvos automaticamente em qualquer navegador!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
