import { FormEvent, ReactNode, useEffect, useState } from "react";
import { activateLicense, activationIsConfigured, verifyActivation } from "@/lib/activation";

const messages: Record<string, string> = {
  invalid_code: "Código inválido. Confira a mensagem recebida após sua compra.",
  expired_code: "Este código expirou. Entre em contato com a loja.",
  disabled_code: "Este código foi desativado. Entre em contato com a loja.",
  device_limit: "Este código já atingiu o limite de dispositivos.",
  connection_error: "Não foi possível validar agora. Verifique sua conexão e tente novamente.",
  missing_configuration: "A ativação ainda não foi configurada neste aplicativo.",
};

export default function ActivationGate({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<"checking" | "locked" | "unlocked">("checking");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const isAdminPage = ["/painel-codigos", "/admin-codigos"].includes(window.location.pathname);

  useEffect(() => {
    if (isAdminPage) {
      setStatus("unlocked");
      return;
    }
    if (!activationIsConfigured()) {
      setStatus("locked");
      setMessage(messages.missing_configuration);
      return;
    }
    verifyActivation().then(result => setStatus(result.ok ? "unlocked" : "locked"));
  }, [isAdminPage]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setMessage("");
    const result = await activateLicense(code);
    setLoading(false);
    if (result.ok) {
      setStatus("unlocked");
      return;
    }
    setMessage(messages[result.reason || ""] || "Não foi possível ativar este código.");
  };

  if (status === "unlocked") return children;

  return (
    <main className="activation-page">
      <section className="activation-panel">
        <div className="activation-art" aria-hidden="true" />
        <div className="activation-content">
          <span className="activation-badge">PLANNER COELHO</span>
          <h1>{status === "checking" ? "Verificando acesso..." : "Ative seu planner"}</h1>
          <p>Digite o código enviado pela loja após sua compra para liberar este dispositivo.</p>
          {status === "locked" && (
            <form onSubmit={submit}>
              <label htmlFor="activation-code">Código de acesso</label>
              <input
                id="activation-code"
                value={code}
                onChange={event => setCode(event.target.value.toUpperCase())}
                placeholder="COELHO-XXXX-XXXX"
                autoComplete="one-time-code"
                maxLength={40}
              />
              <button type="submit" disabled={loading}>{loading ? "Validando..." : "Ativar planner"}</button>
            </form>
          )}
          {message && <p className="activation-message">{message}</p>}
          <small>O código é solicitado somente na primeira ativação deste dispositivo.</small>
        </div>
      </section>
    </main>
  );
}
