import { Star } from "lucide-react";
import { ProductCard } from "./ProductCard";

export function FeaturedSection({ productos, onVerDetalle }) {
  const destacados = productos.filter((p) => p.destacado);

  if (destacados.length === 0) return null;

  return (
    <section id="destacados" className="mb-10">
      <div className="mb-4 flex items-center gap-2">
        <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
        <h2 className="text-2xl font-bold text-slate-800">Destacados</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {destacados.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            onVerDetalle={onVerDetalle}
          />
        ))}
      </div>
    </section>
  );
}
