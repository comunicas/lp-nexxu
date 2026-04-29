import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { Logo } from "@/components/ui-nexxu/Logo";
import { sendAdminOtp } from "@/utils/admin-auth.functions";
import { isAdminEmail } from "@/config/admin";

type Lead = {
  id: string;
  name: string;
  email: string;
  whatsapp: string | null;
  nivel: number;
  nivel_nome: string;
  score: number;
  score_max: number;
  score_pct: number;
  email_sent: boolean;
  created_at: string;
};

const NIVEL_COLORS: Record<number, string> = {
  1: "#EF9F27",
  2: "#7F77DD",
  3: "#185FA5",
  4: "#5DCAA5",
};
const NIVEL_NAMES = ["Caos", "Reativo", "Estruturado", "Autônoma"];

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel Admin — Nexxu" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState("Validando acesso...");
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginInfo, setLoginInfo] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let initialized = false;

    const cleanAdminUrl = () => {
      window.history.replaceState(null, "", "/admin");
    };

    const applySession = async (nextSession: Session | null) => {
      if (cancelled) return;

      if (nextSession?.user?.email && !isAdminEmail(nextSession.user.email)) {
        setUnauthorized(true);
        setSession(null);
        await supabase.auth.signOut();
        return;
      }

      setUnauthorized(false);
      setSession(nextSession);
    };

    const handleAuthRedirect = async () => {
      setAuthStatus("Validando acesso...");

      try {
        const url = new URL(window.location.href);
        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
        const authError =
          url.searchParams.get("error_description") ||
          url.searchParams.get("error") ||
          hashParams.get("error_description") ||
          hashParams.get("error");

        if (authError) {
          cleanAdminUrl();
          throw new Error(authError);
        }

        const code = url.searchParams.get("code");
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        if (code) {
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          cleanAdminUrl();
          if (error) throw error;
          await applySession(data.session ?? null);
        } else if (accessToken && refreshToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          cleanAdminUrl();
          if (error) throw error;
          await applySession(data.session ?? null);
        }

        const { data: { session: existing } } = await supabase.auth.getSession();
        await applySession(existing);
      } catch (err) {
        console.error("admin auth redirect error:", err);
        setSession(null);
        setStep("email");
        setLoginError("Código inválido ou expirado. Solicite um novo acesso.");
      } finally {
        initialized = true;
        if (!cancelled) setLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!initialized || cancelled) return;
      void applySession(newSession ?? null).finally(() => {
        if (!cancelled) setLoading(false);
      });
    });

    void handleAuthRedirect();

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) fetchLeads();
  }, [session]);

  const fetchLeads = async () => {
    setLeadsLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("id, name, email, whatsapp, nivel, nivel_nome, score, score_max, score_pct, email_sent, created_at")
      .order("created_at", { ascending: false });
    if (!error && data) setLeads(data as Lead[]);
    setLeadsLoading(false);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginInfo("");
    setUnauthorized(false);
    setSubmitting(true);
    try {
      await sendAdminOtp({ data: { email: email.trim().toLowerCase() } });
      setStep("otp");
      setLoginInfo("Se este email tiver acesso, um código foi enviado.");
    } catch (err) {
      console.error(err);
      setLoginError("Erro ao enviar código. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setSubmitting(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: otpCode.trim(),
        type: "email",
      });

      if (error || !data.session) {
        setLoginError("Código inválido ou expirado. Solicite um novo acesso.");
        return;
      }

      if (!isAdminEmail(data.session.user.email)) {
        setUnauthorized(true);
        setSession(null);
        await supabase.auth.signOut();
        return;
      }

      setUnauthorized(false);
      setSession(data.session);
      setOtpCode("");
    } catch (err) {
      console.error(err);
      setLoginError("Erro ao verificar código.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setLeads([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--brand-dark)] px-6">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white animate-spin mx-auto" />
          <p className="text-sm text-white/60 mt-4">{authStatus}</p>
        </div>
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--brand-dark)] px-6">
        <div className="max-w-md text-center">
          <h1 className="font-display font-extrabold text-3xl text-white mb-3">Acesso negado</h1>
          <p className="text-white/60">Este email não tem permissão de acesso ao painel.</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--brand-dark)] px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 md:p-10">
            <p className="text-[11px] font-bold tracking-widest text-white/40 mb-2">PAINEL ADMIN</p>
            <h1 className="font-display font-extrabold text-2xl text-white mb-2">Acesso restrito</h1>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              {step === "email"
                ? "Informe seu email autorizado para receber o código de acesso."
                : "Digite o código de 6 dígitos enviado para o seu email."}
            </p>

            {step === "email" ? (
              <form onSubmit={handleSendOtp} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 focus:border-[var(--brand-purple)] text-white text-[14px] placeholder-white/30 outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={submitting || !email}
                  className="w-full px-5 py-3.5 rounded-xl bg-[var(--brand-purple)] hover:opacity-90 text-white text-[14px] font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Enviando..." : "Enviar código"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-3">
                <input
                  type="text"
                  required
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 focus:border-[var(--brand-purple)] text-white text-[18px] text-center tracking-[0.5em] placeholder-white/20 outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={submitting || otpCode.length < 6}
                  className="w-full px-5 py-3.5 rounded-xl bg-[var(--brand-purple)] hover:opacity-90 text-white text-[14px] font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Verificando..." : "Entrar"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setOtpCode("");
                    setLoginError("");
                    setLoginInfo("");
                  }}
                  className="w-full text-xs text-white/50 hover:text-white/80 transition-colors"
                >
                  ← Usar outro email
                </button>
              </form>
            )}

            {loginInfo && (
              <p className="text-[13px] text-white/60 font-medium pt-3">{loginInfo}</p>
            )}
            {loginError && (
              <p className="text-[13px] text-red-400 font-medium pt-3">{loginError}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--brand-page)]">
      {/* Nav admin */}
      <nav className="bg-[var(--brand-dark)] text-white px-[5%] py-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-xs font-bold tracking-widest text-white/40 hidden sm:inline">
            PAINEL ADMIN
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-white/60 hidden md:inline">{session.user.email}</span>
          <button
            type="button"
            onClick={handleSignOut}
            className="text-xs font-semibold text-white/70 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 transition-colors"
          >
            Sair
          </button>
        </div>
      </nav>

      {/* Dashboard */}
      <div className="px-[5%] py-10 max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="font-display font-extrabold text-3xl text-[var(--brand-text)] mb-1">
              Diagnósticos
            </h1>
            <p className="text-sm text-[var(--brand-muted)]">
              {leads.length} lead{leads.length !== 1 ? "s" : ""} capturado
              {leads.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={fetchLeads}
            className="text-xs font-semibold text-[var(--brand-purple)] hover:text-[var(--brand-text)] px-4 py-2 rounded-lg border border-[rgba(83,74,183,0.2)] hover:border-[var(--brand-purple)] transition-colors"
          >
            Atualizar
          </button>
        </div>

        {/* Resumo por nível */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[1, 2, 3, 4].map((n) => {
            const count = leads.filter((l) => l.nivel === n).length;
            return (
              <div
                key={n}
                className="bg-white border border-[rgba(83,74,183,0.12)] rounded-2xl p-5 shadow-[var(--shadow-card)]"
              >
                <p
                  className="text-[10px] font-bold tracking-widest mb-2"
                  style={{ color: NIVEL_COLORS[n] }}
                >
                  NÍVEL {n < 10 ? "0" + n : n}
                </p>
                <p className="font-display font-extrabold text-3xl text-[var(--brand-text)]">
                  {count}
                </p>
                <p className="text-xs text-[var(--brand-muted)] mt-1">{NIVEL_NAMES[n - 1]}</p>
              </div>
            );
          })}
        </div>

        {/* Tabela de leads */}
        {leadsLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-[var(--brand-purple)]/20 border-t-[var(--brand-purple)] animate-spin" />
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-white border border-[rgba(83,74,183,0.12)] rounded-2xl p-12 text-center shadow-[var(--shadow-card)]">
            <p className="font-display font-extrabold text-lg text-[var(--brand-text)] mb-1">
              Nenhum lead ainda.
            </p>
            <p className="text-sm text-[var(--brand-muted)]">
              Os diagnósticos aparecem aqui em tempo real.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-[rgba(83,74,183,0.12)] rounded-2xl overflow-hidden shadow-[var(--shadow-card)]">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[var(--brand-page)] border-b border-[rgba(83,74,183,0.12)]">
                  <tr>
                    {["Nome", "Email", "WhatsApp", "Nível", "Score", "Email", "Data"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-[11px] font-bold tracking-wider uppercase text-[var(--brand-muted)]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, i) => (
                    <tr
                      key={lead.id}
                      className={i % 2 === 0 ? "bg-white" : "bg-[var(--brand-page)]/40"}
                    >
                      <td className="px-4 py-3 font-semibold text-[var(--brand-text)]">
                        {lead.name}
                      </td>
                      <td className="px-4 py-3 text-[var(--brand-muted)]">{lead.email}</td>
                      <td className="px-4 py-3 text-[var(--brand-muted)]">
                        {lead.whatsapp || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold text-white"
                          style={{ background: NIVEL_COLORS[lead.nivel] }}
                        >
                          {lead.nivel} · {lead.nivel_nome}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[var(--brand-text)] font-medium">
                        {lead.score}/{lead.score_max} ({lead.score_pct}%)
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            lead.email_sent
                              ? "bg-[#5DCAA5]/15 text-[#1a8868]"
                              : "bg-[#EF9F27]/15 text-[#a86a10]"
                          }`}
                        >
                          {lead.email_sent ? "Enviado" : "Pendente"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[var(--brand-muted)] whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
