import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

type AIRecommendation = {
  title: string;
  description: string;
  pillar: string;
  link?: string;
};
type AIData = {
  recommendations?: AIRecommendation[];
  summary?: string;
  mentoriaCTA?: { headline?: string; justification?: string; urgency?: string };
};

type Body = {
  name: string;
  email: string;
  whatsapp?: string;
  nivel: number;
  nivelNome: string;
  nivelHeadline: string;
  nivelDesc: string;
  nivelRecommendation: string;
  nivelRecommendedTier: string;
  score: number;
  scoreMax: number;
  scorePct: number;
  answers: any;
  pillarBreakdown: any;
  aiRecommendations?: AIData | null;
  pdfBase64?: string;
};

export const Route = createFileRoute("/api/public/send-diagnostico")({
  server: {
    handlers: {
      OPTIONS: async () => new Response("ok", { headers: corsHeaders }),
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as Body;
          const {
            name,
            email,
            whatsapp,
            nivel,
            nivelNome,
            nivelHeadline,
            nivelDesc,
            nivelRecommendation,
            nivelRecommendedTier,
            score,
            scoreMax,
            scorePct,
            answers,
            pillarBreakdown,
            pdfBase64,
          } = body;

          // Validação básica
          if (
            !name?.trim() ||
            !email?.includes("@") ||
            typeof nivel !== "number" ||
            nivel < 1 ||
            nivel > 4
          ) {
            return new Response(
              JSON.stringify({ error: "Invalid payload" }),
              {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
              }
            );
          }

          // 1. Salvar lead
          const { data: lead, error: dbError } = await supabaseAdmin
            .from("leads")
            .insert([{
              name,
              email,
              whatsapp,
              nivel,
              nivel_nome: nivelNome,
              score,
              score_max: scoreMax,
              score_pct: scorePct,
              answers,
              pillar_breakdown: pillarBreakdown,
              email_sent: false,
            }])
            .select("id")
            .single();

          if (dbError) throw new Error(`DB Error: ${dbError.message}`);

          // 2. Enviar email via Resend
          const RESEND_API_KEY = process.env.RESEND_API_KEY;
          if (!RESEND_API_KEY) {
            throw new Error("RESEND_API_KEY not configured");
          }

          const emailPayload = {
            from: "Nexxu <diagnostico@nexxulab.com>",
            to: [email],
            subject: `Seu Diagnóstico ORDEM™ — Nível ${nivel}: ${nivelNome}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
                <div style="background: #0B0B14; padding: 32px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px;">nexxu</h1>
                  <p style="color: #9090A8; margin: 8px 0 0; font-size: 12px; letter-spacing: 2px;">DIAGNÓSTICO ORDEM™</p>
                </div>
                <div style="padding: 32px;">
                  <h2 style="color: #1a1a2e; margin: 0 0 16px;">Olá, ${name}.</h2>
                  <p style="color: #55575d; line-height: 1.6;">
                    Seu diagnóstico está anexado a este email em PDF. Abaixo um resumo rápido:
                  </p>
                  <div style="background: #f5f5fa; border-radius: 12px; padding: 20px; margin: 24px 0;">
                    <p style="color: #9090A8; margin: 0 0 8px; font-size: 11px; letter-spacing: 1.5px;">SEU RESULTADO</p>
                    <p style="color: #1a1a2e; margin: 0; font-size: 20px; font-weight: bold;">Nível ${nivel} — ${nivelNome}</p>
                    <p style="color: #55575d; margin: 8px 0 0; font-size: 14px;">${score}/${scoreMax} pontos · ${scorePct}% de maturidade operacional</p>
                  </div>
                  <p style="color: #1a1a2e; font-weight: 600; line-height: 1.5;">${nivelHeadline}</p>
                  <p style="color: #55575d; line-height: 1.6;">${nivelDesc}</p>
                  <div style="background: linear-gradient(135deg, rgba(24,95,165,0.05), rgba(83,74,183,0.08)); border-radius: 12px; padding: 20px; margin: 24px 0;">
                    <p style="color: #534AB7; margin: 0 0 8px; font-size: 11px; letter-spacing: 1.5px;">PRÓXIMO PASSO RECOMENDADO</p>
                    <p style="color: #1a1a2e; margin: 0 0 8px; font-size: 18px; font-weight: bold;">${nivelRecommendedTier}</p>
                    <p style="color: #55575d; margin: 0; line-height: 1.6;">${nivelRecommendation}</p>
                  </div>
                  <div style="text-align: center; margin: 32px 0;">
                    <a href="https://wa.me/5500000000000?text=Quero%20conversar%20sobre%20o%20diagn%C3%B3stico%20ORDEM" style="display: inline-block; background: linear-gradient(135deg, #185FA5, #534AB7); color: #ffffff; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: bold;">Falar com a Nexxu →</a>
                    <p style="color: #9090A8; margin: 12px 0 0; font-size: 12px;">Sem compromisso. 15 minutos. Só diagnóstico.</p>
                  </div>
                </div>
                <div style="background: #f5f5fa; padding: 20px; text-align: center;">
                  <p style="color: #9090A8; margin: 0; font-size: 11px;">nexxu · Criatividade. Processo. Tecnologia. · nexxulab.com</p>
                </div>
              </div>
            `,
            attachments: pdfBase64
              ? [
                  {
                    filename: `Diagnostico-ORDEM-Nexxu-${name.replace(/\s+/g, "-")}.pdf`,
                    content: pdfBase64,
                  },
                ]
              : undefined,
          };

          const resendRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(emailPayload),
          });

          if (!resendRes.ok) {
            const err = await resendRes.text();
            throw new Error(`Resend Error: ${err}`);
          }

          // 3. Marcar email_sent = true
          if (lead?.id) {
            await supabaseAdmin
              .from("leads")
              .update({
                email_sent: true,
                email_sent_at: new Date().toISOString(),
              })
              .eq("id", lead.id);
          }

          // 4. Notificar admins (não bloqueia resposta em caso de falha)
          try {
            const adminEmailPayload = {
              from: "Nexxu Sistema <diagnostico@nexxulab.com>",
              to: ["rbruno@nexxulab.com", "fhorita@nexxulab.com"],
              subject: `🔔 Novo lead: ${name} — Nível ${nivel} (${nivelNome})`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
                  <div style="background: #0B0B14; padding: 24px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 20px;">🔔 Novo diagnóstico recebido</h1>
                  </div>
                  <div style="padding: 32px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr><td style="padding: 8px 0; color: #9090A8; font-size: 12px; letter-spacing: 1px;">NOME</td><td style="padding: 8px 0; color: #1a1a2e; font-weight: 600;">${name}</td></tr>
                      <tr><td style="padding: 8px 0; color: #9090A8; font-size: 12px; letter-spacing: 1px;">EMAIL</td><td style="padding: 8px 0; color: #1a1a2e;">${email}</td></tr>
                      <tr><td style="padding: 8px 0; color: #9090A8; font-size: 12px; letter-spacing: 1px;">WHATSAPP</td><td style="padding: 8px 0; color: #1a1a2e;">${whatsapp || "—"}</td></tr>
                      <tr><td style="padding: 8px 0; color: #9090A8; font-size: 12px; letter-spacing: 1px;">NÍVEL</td><td style="padding: 8px 0; color: #1a1a2e; font-weight: 600;">${nivel} — ${nivelNome}</td></tr>
                      <tr><td style="padding: 8px 0; color: #9090A8; font-size: 12px; letter-spacing: 1px;">SCORE</td><td style="padding: 8px 0; color: #1a1a2e;">${score}/${scoreMax} (${scorePct}%)</td></tr>
                    </table>
                    <div style="text-align: center; margin: 32px 0 0;">
                      <a href="https://nexxulab.com/admin" style="display: inline-block; background: linear-gradient(135deg, #185FA5, #534AB7); color: #ffffff; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: bold;">Ver no painel →</a>
                    </div>
                  </div>
                </div>
              `,
            };

            await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${RESEND_API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(adminEmailPayload),
            });
          } catch (notifyErr) {
            console.error("admin notify error:", notifyErr);
          }

          return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Unknown error";
          console.error("send-diagnostico error:", message);
          return new Response(JSON.stringify({ error: message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
