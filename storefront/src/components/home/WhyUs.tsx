import { TruckIcon, ShieldCheckIcon, StarIcon } from "@/components/layout/icons"

const features = [
  {
    icon: TruckIcon,
    title: "Envío a Todo el Perú",
    description:
      "Enviamos a Lima, Arequipa, Trujillo y todos los departamentos. Envío gratis en pedidos desde S/ 150.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Pago 100% Seguro",
    description:
      "Aceptamos Visa, Mastercard, Yape y Plin. Todos los pagos procesados con encriptación SSL.",
  },
  {
    icon: StarIcon,
    title: "Calidad Garantizada",
    description:
      "Materiales de alta calidad seleccionados. Si no estás satisfecha, te devolvemos el dinero.",
  },
]

export function WhyUs() {
  return (
    <section className="bg-brand-50 py-16">
      <div className="container-main">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl text-gray-900">
            ¿Por qué elegirnos?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-xl p-6 text-center shadow-sm"
            >
              <div className="flex justify-center mb-4">
                <f.icon className="w-10 h-10 text-accent" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
