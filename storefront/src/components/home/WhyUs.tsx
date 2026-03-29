import { TruckIcon, ShieldCheckIcon, StarIcon } from "@/components/layout/icons"

const features = [
  {
    icon: TruckIcon,
    highlight: "Gratis desde S/ 150",
    title: "Envío a Todo el Perú",
    description:
      "Enviamos a Lima, Arequipa, Trujillo y todos los departamentos. Envío gratis en pedidos desde S/ 150.",
  },
  {
    icon: ShieldCheckIcon,
    highlight: "SSL Certificado",
    title: "Pago 100% Seguro",
    description:
      "Aceptamos Visa, Mastercard, Yape y Plin. Todos los pagos procesados con encriptación SSL.",
  },
  {
    icon: StarIcon,
    highlight: "Garantía total",
    title: "Calidad Garantizada",
    description:
      "Materiales de alta calidad seleccionados. Si no estás satisfecha, te devolvemos el dinero.",
  },
]

export function WhyUs() {
  return (
    <section className="py-20 bg-brand-950">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-brand-400 mt-3 text-base font-sans">
            Tu satisfacción es nuestra prioridad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="relative bg-brand-900 rounded-2xl p-7 overflow-hidden group hover:bg-brand-800 transition-colors duration-300"
            >
              {/* Decorative circle */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/8 rounded-full group-hover:bg-primary/12 transition-colors duration-500" />

              <div className="relative">
                <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center mb-5">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs font-sans font-semibold text-primary uppercase tracking-widest mb-2">
                  {f.highlight}
                </p>
                <h3 className="font-serif text-xl text-white mb-3">{f.title}</h3>
                <p className="text-brand-400 text-sm leading-relaxed font-sans">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
