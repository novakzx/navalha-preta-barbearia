export default function Footer() {
  return (
    <footer id="contato" style={{ background: "var(--surface-1)", borderTop: "1px solid var(--border-color)" }}>
      <div className="container-page py-16 grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div>
          <h3
            className="font-display font-bold uppercase text-white"
            style={{ letterSpacing: "0.1em" }}
          >
            Endereço
          </h3>
          <p className="mt-3 text-xs text-white/60 leading-relaxed">
            Rua das Tesouras, 123 — Centro
            <br />
            São Paulo, SP
          </p>
        </div>

        <div>
          <h3
            className="font-display font-bold uppercase text-white"
            style={{ letterSpacing: "0.1em" }}
          >
            Horários
          </h3>
          <p className="mt-3 text-xs text-white/60 leading-relaxed">
            Ter a Sáb — 09h às 20h
            <br />
            Dom e Seg — Fechado
          </p>
        </div>

        <div>
          <h3
            className="font-display font-bold uppercase text-white"
            style={{ letterSpacing: "0.1em" }}
          >
            Contato
          </h3>
          <p className="mt-3 text-xs text-white/60 leading-relaxed">
            (11) 99999-0000
            <br />
            contato@navalhapreta.com.br
          </p>
        </div>
      </div>

      <div className="container-page py-6 border-t border-[var(--border-color)] text-center">
        <p className="text-[10px] uppercase tracking-[0.093em] text-white/40">
          © {new Date().getFullYear()} Navalha Preta Barbearia. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
