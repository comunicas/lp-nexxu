import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { Logo } from "@/components/ui-nexxu/Logo";
import { sendAdminOtp } from "@/utils/admin-auth.functions";
import { isAdminEmail } from "@/config/admin";
import { generateDiagnosticoPDF } from "@/lib/generateDiagnosticoPDF";
import { LEVELS, type Pillar } from "@/components/diagnostico/quizData";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type PillarBreakdown = Record<Pillar, number>;

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
  email_sent_at: string | null;
  answers: number[] | null;
  pillar_breakdown: PillarBreakdown | null;
  created_at: string;
};

// ─── DS Tokens ────────────────────────────────────────────────────────────────

const NIVEL_COLORS: Record<number, string> = {
  1: "#EF9F27",
  2: "#7F77DD",
  3: "#185FA5",
  4: "#5DCAA5",
};

const NIVEL_NAMES: Record<number, string> = {
  1: "Caos",
  2: "Organizada",
  3: "Inteligente",
  4: "Autônoma",
};

const PILLAR_LABELS: Record<Pillar, string> = {
  O: "Organização",
  R: "Rotinas",
  D: "Dados",
  E: "Eficiência IA",
  M: "Maturidade",
};

const PILLAR_ORDER: Pillar[] = ["O", "R", "D", "E", "M"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getLevelInfo(nivel: number) {
  return LEVELS[nivel - 1] ?? LEVELS[0];
}

// ─── Rota ─────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel Admin — Nexxu" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

// ─── AdminPage ────────────────────────────────────────────────────────────────

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [pdfGenerating, setPdfGenerating] = useState(false);

  // Auth
  useEffect(() => {
    let cancelled = false;
    let initialized = false;

    const cleanAdminUrl = () => window.history.replaceState(null, "", "/admin");

    const applySession = async (nextSession: Session | null) => {
      if (cancelled) return;
      if (!nextSession) {
        setSession(null);
        return;
      }
      if (!isAdminEmail(nextSession.user.email)) {
        setUnauthorized(true);
        setSession(null);
        await supabase.auth.signOut();
        return;
      }
      setUnauthorized(false);
      setSession(nextSession);
    };

    const handleAuthRedirect = async () => {
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

        const {
          data: { session: existing },
        } = await supabase.auth.getSession();
        await applySession(existing);
      } catch (err) {
        console.error("admin auth redirect error:", err);
        setSession(null);
        setLinkSent(false);
        setLoginError("Link inválido ou expirado. Solicite um novo acesso.");
      } finally {
        initialized = true;
        if (!cancelled) setLoading(false);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
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

  // Leads
  const fetchLeads = useCallback(async () => {
    setLeadsLoading(true);
    try {
      const { data, error } = await supabase
        .from("leads")
        .select(
          "id, name, email, whatsapp, nivel, nivel_nome, score, score_max, score_pct, email_sent, email_sent_at, answers, pillar_breakdown, created_at",
        )
        .order("created_at", { ascending: false });
      if (error) console.error("fetchLeads error:", error);
      else if (data) setLeads(data as unknown as Lead[]);
    } catch (err) {
      console.error("fetchLeads exception:", err);
    } finally {
      setLeadsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session?.user?.id) void fetchLeads();
  }, [session?.user?.id, fetchLeads]);

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setUnauthorized(false);
    setSubmitting(true);
    try {
      await sendAdminOtp({ data: { email: email.trim().toLowerCase() } });
      setLinkSent(true);
    } catch (err) {
      console.error(err);
      setLoginError("Erro ao enviar link. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUnauthorized(false);
    setSession(null);
    setLeads([]);
    setSelectedLead(null);
  };

  const handleDownloadPdf = async (lead: Lead) => {
    setPdfGenerating(true);
    try {
      const levelInfo = getLevelInfo(lead.nivel);
      const pdfBase64 = generateDiagnosticoPDF({
        name: lead.name,
        nivel: lead.nivel,
        nivelNome: lead.nivel_nome,
        nivelHeadline: levelInfo.headline,
        nivelDesc: levelInfo.desc,
        nivelRecommendation: levelInfo.recommendation,
        nivelRecommendedTier: levelInfo.recommendedTier,
        score: lead.score_pct,
        scoreMax: 100,
        scorePct: lead.score_pct,
        pillarBreakdown:
          (lead.pillar_breakdown as Record<Pillar, number>) ?? { O: 0, R: 0, D: 0, E: 0, M: 0 },
      });
      const binary = atob(pdfBase64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `diagnostico-nexxu-${lead.name.toLowerCase().replace(/\s+/g, "-")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setPdfGenerating(false);
    }
  };

  // ── Telas de estado ───────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--brand-dark)] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-white/10 border-t-[var(--brand-purple)] rounded-full animate-spin" />
          <p className="text-white/50 text-sm">Validando acesso</p>
        </div>
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div className="min-h-screen bg-[var(--brand-dark)] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="font-display text-2xl text-white mb-2">Acesso negado</h1>
          <p className="text-white/50 text-sm mb-6">
            Este email não tem permissão de acesso ao painel.
          </p>
          <button
            onClick={() => {
              setUnauthorized(false);
              setLinkSent(false);
              setEmail("");
            }}
            className="text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            ← Tentar com outro email
          </button>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[var(--brand-dark)] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-md">
            <p className="text-[10px] tracking-[0.2em] text-[var(--brand-purple)] font-semibold mb-2">
              PAINEL ADMIN
            </p>
            <h1 className="font-display text-2xl text-white mb-2">Acesso restrito</h1>
            <p className="text-white/50 text-sm mb-6">
              {linkSent
                ? "Link enviado. Clique no botão do email para entrar."
                : "Informe seu email autorizado para receber o link de acesso."}
            </p>

            {!linkSent ? (
              <form onSubmit={handleSendLink} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 focus:border-[var(--brand-purple)] text-white text-sm placeholder-white/30 outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-4 py-3 rounded-xl bg-brand-gradient text-white text-sm font-semibold font-display hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {submitting ? "Enviando..." : "Enviar link de acesso →"}
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                  <p className="text-[10px] tracking-[0.18em] text-white/40 font-semibold mb-1">
                    Link enviado para
                  </p>
                  <p className="text-white text-sm font-medium break-all">
                    {email.trim().toLowerCase()}
                  </p>
                </div>
                <p className="text-xs text-white/40 leading-relaxed">
                  O link expira em 1 hora. Verifique também o spam.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setLinkSent(false);
                    setEmail("");
                    setLoginError("");
                  }}
                  className="w-full text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  ← Usar outro email
                </button>
              </div>
            )}
            {loginError && (
              <p className="mt-4 text-xs text-red-400 text-center">{loginError}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────

  const totalLeads = leads.length;
  const emailSentCount = leads.filter((l) => l.email_sent).length;

  return (
    <div className="min-h-screen bg-[var(--brand-dark)]">
      {/* Nav interno do admin */}
      <nav className="sticky top-0 z-40 px-[5%] h-14 flex items-center justify-between bg-[rgba(15,12,26,0.92)] backdrop-blur-lg border-b border-[rgba(83,74,183,0.2)]">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-[10px] tracking-[0.2em] text-[var(--brand-purple)] font-semibold hidden sm:inline">
            ADMIN
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            className="text-xs sm:text-sm text-white/60 hover:text-white px-2 py-1.5 transition-colors"
          >
            ← Site
          </Link>
          <Link
            to="/diagnostico"
            className="text-xs sm:text-sm text-white/60 hover:text-white px-2 py-1.5 transition-colors hidden sm:inline"
          >
            Diagnóstico
          </Link>
          <span className="text-xs text-white/40 hidden md:inline border-l border-white/10 pl-4">
            {session.user.email}
          </span>
          <button
            onClick={handleSignOut}
            className="text-xs sm:text-sm text-white/60 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 transition-colors"
          >
            Sair
          </button>
        </div>
      </nav>

      <main className="px-[5%] py-10 max-w-[1400px] mx-auto">
        {/* Cabeçalho */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl text-white mb-1">Diagnósticos</h1>
            <p className="text-white/50 text-sm">
              {totalLeads} lead{totalLeads !== 1 ? "s" : ""} capturado
              {totalLeads !== 1 ? "s" : ""}
              {totalLeads > 0 && (
                <span className="text-white/30">
                  {" · "}
                  {emailSentCount} com email enviado
                </span>
              )}
            </p>
          </div>
          <button
            onClick={() => void fetchLeads()}
            disabled={leadsLoading}
            className="text-xs text-white/60 hover:text-white px-3 py-2 rounded-lg border border-white/10 hover:border-white/30 transition-colors disabled:opacity-60"
          >
            {leadsLoading ? "Atualizando..." : "↻ Atualizar"}
          </button>
        </div>

        {/* Cards por nível */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[1, 2, 3, 4].map((n) => {
            const count = leads.filter((l) => l.nivel === n).length;
            const pct = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
            return (
              <div
                key={n}
                className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 p-5"
              >
                <div
                  className="w-2 h-2 rounded-full mb-3"
                  style={{ backgroundColor: NIVEL_COLORS[n] }}
                />
                <p className="text-[10px] tracking-[0.2em] text-white/40 font-semibold mb-1">
                  NÍVEL 0{n}
                </p>
                <p className="font-display text-3xl text-white mb-0.5">{count}</p>
                <p className="text-xs text-white/50">{NIVEL_NAMES[n]}</p>
                <div
                  className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: NIVEL_COLORS[n] }}
                />
              </div>
            );
          })}
        </div>

        {/* Tabela */}
        {leadsLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-white/10 border-t-[var(--brand-purple)] rounded-full animate-spin" />
          </div>
        ) : leads.length === 0 ? (
          <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-16 text-center">
            <p className="text-white/60 text-sm mb-1">Nenhum lead ainda.</p>
            <p className="text-white/30 text-xs">
              Os diagnósticos aparecem aqui em tempo real.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(83,74,183,0.1)]">
                    {["Nome", "Email", "WhatsApp", "Nível", "Score", "Email", "Data"].map((h) => (
                      <th
                        key={h}
                        className="text-left text-[10px] tracking-[0.18em] font-semibold text-white/40 px-4 py-3"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="border-b border-[rgba(83,74,183,0.05)] last:border-0 hover:bg-[rgba(83,74,183,0.03)] cursor-pointer transition-colors group"
                    >
                      <td className="px-4 py-4">
                        <span className="text-white font-medium group-hover:text-[var(--brand-purple)] transition-colors">
                          {lead.name}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-white/60">{lead.email}</td>
                      <td className="px-4 py-4 text-white/40">{lead.whatsapp || "—"}</td>
                      <td className="px-4 py-4">
                        <span
                          className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium"
                          style={{
                            backgroundColor: `${NIVEL_COLORS[lead.nivel]}1A`,
                            color: NIVEL_COLORS[lead.nivel],
                          }}
                        >
                          {lead.nivel} · {lead.nivel_nome}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1 rounded-full bg-white/5 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${lead.score_pct}%`,
                                backgroundColor: NIVEL_COLORS[lead.nivel],
                              }}
                            />
                          </div>
                          <span className="text-white/70 text-xs tabular-nums">
                            {lead.score_pct}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1.5 text-xs">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              lead.email_sent ? "bg-emerald-400" : "bg-white/20"
                            }`}
                          />
                          <span className={lead.email_sent ? "text-emerald-400" : "text-white/40"}>
                            {lead.email_sent ? "Enviado" : "Pendente"}
                          </span>
                        </span>
                      </td>
                      <td className="px-4 py-4 text-white/40 text-xs">
                        {formatDate(lead.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {selectedLead && (
        <LeadDrawer
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onDownloadPdf={handleDownloadPdf}
          pdfGenerating={pdfGenerating}
        />
      )}
    </div>
  );
}

// ─── LeadDrawer ───────────────────────────────────────────────────────────────

type DrawerProps = {
  lead: Lead;
  onClose: () => void;
  onDownloadPdf: (lead: Lead) => void;
  pdfGenerating: boolean;
};

function LeadDrawer({ lead, onClose, onDownloadPdf, pdfGenerating }: DrawerProps) {
  const levelInfo = getLevelInfo(lead.nivel);
  const hasPillarData =
    lead.pillar_breakdown && Object.keys(lead.pillar_breakdown).length > 0;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const nivelColor = NIVEL_COLORS[lead.nivel];

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />
      <aside className="fixed top-0 right-0 bottom-0 w-full sm:max-w-xl z-50 bg-[var(--brand-dark)] border-l border-[rgba(83,74,183,0.2)] flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-[rgba(83,74,183,0.1)]">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-[var(--brand-purple)] font-semibold mb-1">
              LEAD
            </p>
            <h2 className="font-display text-xl text-white">{lead.name}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Corpo */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Card resultado */}
          <div className="rounded-2xl border border-white/10 p-5" style={{ backgroundColor: `${nivelColor}10` }}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-[10px] tracking-[0.2em] font-semibold mb-1" style={{ color: nivelColor }}>
                  NÍVEL 0{lead.nivel} · ÍNDICE ORDEM™
                </p>
                <p className="font-display text-2xl text-white">{lead.nivel_nome}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-3xl text-white tabular-nums">{lead.score_pct}%</p>
                <p className="text-[10px] tracking-[0.15em] text-white/40 font-semibold">
                  MATURIDADE
                </p>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-black/30 overflow-hidden mb-3">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${lead.score_pct}%`, backgroundColor: nivelColor }}
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed">{levelInfo.headline}</p>
          </div>

          {/* Contato */}
          <div>
            <p className="text-[10px] tracking-[0.2em] text-white/40 font-semibold mb-3">
              CONTATO
            </p>
            <div className="rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden">
              {[
                { label: "Email", value: lead.email },
                { label: "WhatsApp", value: lead.whatsapp || "—" },
                { label: "Data", value: formatDate(lead.created_at) },
                {
                  label: "Email enviado",
                  value: lead.email_sent
                    ? `Sim${lead.email_sent_at ? " · " + formatDate(lead.email_sent_at) : ""}`
                    : "Não",
                },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between px-4 py-3 ${
                    i > 0 ? "border-t border-[rgba(83,74,183,0.07)]" : ""
                  }`}
                >
                  <span className="text-white/40 text-xs">{row.label}</span>
                  <span className="text-white/80 text-sm break-all text-right">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pilares */}
          {hasPillarData && (
            <div>
              <p className="text-[10px] tracking-[0.2em] text-white/40 font-semibold mb-3">
                PILARES ORDEM™
              </p>
              <div className="space-y-3">
                {PILLAR_ORDER.map((p) => {
                  const val = lead.pillar_breakdown?.[p] ?? 0;
                  return (
                    <div key={p}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold text-white"
                            style={{ backgroundColor: nivelColor }}
                          >
                            {p}
                          </span>
                          <span className="text-white/70 text-sm">{PILLAR_LABELS[p]}</span>
                        </div>
                        <span className="text-white/60 text-xs tabular-nums">{val}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${val}%`, backgroundColor: nivelColor }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recomendação */}
          <div>
            <p className="text-[10px] tracking-[0.2em] text-white/40 font-semibold mb-3">
              RECOMENDAÇÃO
            </p>
            <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-[10px] tracking-[0.18em] text-[var(--brand-purple)] font-semibold mb-2">
                {levelInfo.recommendedTier}
              </p>
              <p className="text-white/70 text-sm leading-relaxed">{levelInfo.recommendation}</p>
            </div>
          </div>
        </div>

        {/* Footer de ações */}
        <div className="flex gap-2 px-6 py-4 border-t border-[rgba(83,74,183,0.1)]">
          <button
            onClick={() => onDownloadPdf(lead)}
            disabled={pdfGenerating}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-gradient text-white text-sm font-semibold font-display hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {pdfGenerating ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
                Baixar PDF
              </>
            )}
          </button>
          {lead.whatsapp && (
            <a
              href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/30 text-white/80 text-sm font-semibold transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607z" />
              </svg>
              WhatsApp
            </a>
          )}
        </div>
      </aside>
    </>
  );
}
