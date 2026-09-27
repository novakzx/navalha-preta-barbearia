"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";
import type { Barber, Service } from "@/lib/supabase";

type Status = "idle" | "submitting" | "success" | "error";

export default function BookingForm({
  services,
  barbers,
}: {
  services: Service[];
  barbers: Barber[];
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      customer_name: String(data.get("customer_name") || ""),
      customer_phone: String(data.get("customer_phone") || ""),
      customer_email: String(data.get("customer_email") || ""),
      service_id: String(data.get("service_id") || ""),
      barber_id: String(data.get("barber_id") || ""),
      requested_date: String(data.get("requested_date") || ""),
      requested_time: String(data.get("requested_time") || ""),
      notes: String(data.get("notes") || ""),
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Não foi possível agendar.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erro inesperado.");
    }
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="agendar" className="py-24" style={{ background: "var(--background)" }}>
      <div className="container-page max-w-2xl">
        <SectionHeader eyebrow="Marque seu horário" title="Agendamento" />

        {status === "success" ? (
          <div className="mt-14 border border-[var(--color-signal-blue)] p-8 text-center">
            <p className="text-white text-sm uppercase tracking-[0.067em]">
              Agendamento recebido!
            </p>
            <p className="mt-3 text-white/60 text-xs leading-relaxed">
              Entraremos em contato para confirmar seu horário. Obrigado.
            </p>
            <button
              className="btn-ghost mt-6"
              onClick={() => setStatus("idle")}
              type="button"
            >
              Novo agendamento
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input name="customer_name" required placeholder="Nome completo" className="sm:col-span-2" />
            <input name="customer_phone" required placeholder="Telefone / WhatsApp" type="tel" />
            <input name="customer_email" placeholder="E-mail (opcional)" type="email" />

            <select name="service_id" required defaultValue="">
              <option value="" disabled>
                Serviço
              </option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <select name="barber_id" defaultValue="">
              <option value="">Sem preferência de barbeiro</option>
              {barbers.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>

            <input name="requested_date" required type="date" min={today} />
            <input name="requested_time" required type="time" />

            <textarea
              name="notes"
              placeholder="Observações (opcional)"
              rows={3}
              className="sm:col-span-2"
            />

            {status === "error" && (
              <p className="sm:col-span-2 text-xs text-red-400">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-primary sm:col-span-2 disabled:opacity-50"
            >
              {status === "submitting" ? "Enviando..." : "Confirmar agendamento"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
