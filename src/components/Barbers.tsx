import Image from "next/image";
import SectionHeader from "./SectionHeader";
import type { Barber } from "@/lib/supabase";

const PHOTOS = ["/images/barber-1.jpg", "/images/barber-2.jpg", "/images/barber-3.jpg"];

export default function Barbers({ barbers }: { barbers: Barber[] }) {
  return (
    <section id="barbeiros" className="py-24" style={{ background: "var(--surface-1)" }}>
      <div className="container-page">
        <SectionHeader eyebrow="Nossa equipe" title="Barbeiros" />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10">
          {barbers.map((b, i) => (
            <div key={b.id}>
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={b.photo_url || PHOTOS[i % PHOTOS.length]}
                  alt={`Foto de ${b.name}, ${b.role ?? "barbeiro"}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="mt-5 text-sm font-medium uppercase tracking-[0.067em] text-white">
                {b.name}
              </h3>
              {b.role && (
                <p className="mt-1 text-[11px] uppercase tracking-[0.093em] text-white/50">
                  {b.role}
                </p>
              )}
              {b.bio && (
                <p className="mt-3 text-xs text-white/60 leading-relaxed">{b.bio}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
