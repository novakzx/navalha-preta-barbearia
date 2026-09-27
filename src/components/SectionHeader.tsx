export default function SectionHeader({
  eyebrow,
  title,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2
        className="font-display font-bold uppercase text-white"
        style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "0.08em" }}
      >
        {title}
      </h2>
    </div>
  );
}
