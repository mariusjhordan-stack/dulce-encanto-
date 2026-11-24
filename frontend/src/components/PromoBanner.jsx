import { Gift, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export function PromoBanner({ promociones }) {
  const [copiado, setCopiado] = useState(null);

  if (!promociones || promociones.length === 0) return null;

  const promo = promociones[0];

  const copiarCupon = async (codigo) => {
    try {
      await navigator.clipboard.writeText(codigo);
      setCopiado(codigo);
      setTimeout(() => setCopiado(null), 2000);
    } catch {
      setCopiado(null);
    }
  };

  return (
    <section className="mb-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-4 md:p-6 text-white shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Gift className="h-8 w-8 shrink-0" />
        <div className="flex-1">
          <h3 className="text-lg font-bold">{promo.titulo}</h3>
          <p className="text-sm text-amber-100">{promo.descripcion}</p>
        </div>
        <button
          onClick={() => copiarCupon(promo.codigo_cupon)}
          className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-sm font-bold backdrop-blur hover:bg-white/30 transition-colors cursor-pointer"
        >
          {copiado === promo.codigo_cupon ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="font-mono">{promo.codigo_cupon}</span>
          <Badge className="bg-white text-orange-600 hover:bg-white">
            -{promo.porcentaje}%
          </Badge>
        </button>
      </div>
    </section>
  );
}
