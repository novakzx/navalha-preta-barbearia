import Image from "next/image";
import SectionHeader from "./SectionHeader";

const IMAGES = [
  { src: "/images/interior-1.jpg", alt: "Interior da barbearia com cadeiras e espelhos" },
  { src: "/images/haircut-1.jpg", alt: "Cliente recebendo corte de cabelo detalhado" },
  { src: "/images/beard.jpg", alt: "Barbeiro finalizando barba com navalha" },
  { src: "/images/interior-2.jpg", alt: "Ambiente da barbearia com decoração vintage" },
  { src: "/images/gallery-1.jpg", alt: "Detalhe de corte degradê" },
  { src: "/images/tools.jpg", alt: "Ferramentas de barbeiro organizadas no balcão" },
];

export default function Gallery() {
  return (
    <section id="galeria" className="py-24" style={{ background: "var(--background)" }}>
      <div className="container-page">
        <SectionHeader eyebrow="Nosso trabalho" title="Galeria" />

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-3">
          {IMAGES.map((img) => (
            <div key={img.src} className="relative aspect-square overflow-hidden group">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
