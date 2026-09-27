import SectionHeader from "./SectionHeader";
import type { Service } from "@/lib/supabase";

function formatPrice(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="servicos" className="py-24" style={{ background: "var(--background)" }}>
      <div className="container-page">
        <SectionHeader eyebrow="O que fazemos" title="Serviços" />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--border-color)" }}>
          {services.map((s) => (
            <div key={s.id} className="p-8" style={{ background: "var(--background)" }}>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-sm font-medium uppercase tracking-[0.067em] text-white">
                  {s.name}
                </h3>
                <span className="text-sm text-white whitespace-nowrap">
                  {formatPrice(s.price_cents)}
                </span>
              </div>
              {s.description && (
                <p className="mt-3 text-xs text-white/60 leading-relaxed">
                  {s.description}
                </p>
              )}
              <p className="mt-4 text-[10px] uppercase tracking-[0.093em] text-white/40">
                {s.duration_minutes} min
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a href="#agendar" className="btn-primary">
            Agendar horário
          </a>
        </div>
      </div>
    </section>
  );
}
