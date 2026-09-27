import Image from "next/image";

export default function About() {
  return (
    <section id="sobre" className="py-24" style={{ background: "var(--surface-1)" }}>
      <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div className="relative aspect-[4/5] w-full overflow-hidden order-2 lg:order-1">
          <Image
            src="/images/gallery-2.jpg"
            alt="Barbeiro concentrado fazendo acabamento no corte de um cliente"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="order-1 lg:order-2">
          <p className="eyebrow mb-4">Nossa história</p>
          <h2
            className="font-display font-bold uppercase text-white"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "0.08em" }}
          >
            Tradição e navalha
          </h2>
          <p className="mt-6 text-sm text-white/70 leading-[1.7] tracking-[0.02em] max-w-md">
            Há mais de dez anos cuidando do visual de quem exige precisão. A
            Navalha Preta nasceu do gosto pelo ofício clássico da barbearia
            aliado ao domínio das técnicas modernas de corte e barba.
          </p>
          <p className="mt-4 text-sm text-white/70 leading-[1.7] tracking-[0.02em] max-w-md">
            Ambiente descontraído, atendimento pontual e uma equipe que trata
            cada cliente como cliente antigo — mesmo na primeira visita.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <p className="font-display font-bold text-white text-3xl">12+</p>
              <p className="text-[10px] uppercase tracking-[0.093em] text-white/50 mt-1">
                Anos de ofício
              </p>
            </div>
            <div>
              <p className="font-display font-bold text-white text-3xl">3</p>
              <p className="text-[10px] uppercase tracking-[0.093em] text-white/50 mt-1">
                Barbeiros
              </p>
            </div>
            <div>
              <p className="font-display font-bold text-white text-3xl">5k+</p>
              <p className="text-[10px] uppercase tracking-[0.093em] text-white/50 mt-1">
                Clientes atendidos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
