import Image from "next/image";

export default function Hero() {
  return (
    <section id="top" className="relative h-screen min-h-[640px] w-full overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="Barbeiro finalizando corte de cabelo em cliente na barbearia"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="eyebrow mb-4 text-white/80">Desde 2012 · São Paulo</p>
        <h1
          className="font-display font-bold uppercase text-white leading-[1.05]"
          style={{
            fontSize: "clamp(40px, 8vw, 76px)",
            letterSpacing: "0.05em",
          }}
        >
          Navalha
          <br />
          Preta
        </h1>
        <p className="mt-6 max-w-md text-sm text-white/80 leading-relaxed tracking-[0.02em]">
          Corte clássico, degradê moderno e barboterapia. Tradição de barbearia
          com precisão de navalha.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a href="#agendar" className="btn-primary">
            Agendar horário
          </a>
          <a href="#servicos" className="btn-ghost">
            Ver serviços
          </a>
        </div>
      </div>
    </section>
  );
}
