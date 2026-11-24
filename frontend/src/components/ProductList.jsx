import { ProductCard } from "./ProductCard";

export function ProductList({ productos }) {
  if (productos.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center">
        <p className="text-slate-500 text-base">
          No hay productos disponibles en esta categoría por el momento.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          nombre={producto.nombre}
          descripcion={producto.descripcion}
          precio={producto.precio}
          imagen_url={producto.imagen_url}
          categoria={producto.categoria}
          cantidad_disponible={producto.cantidad_disponible}
        />
      ))}
    </div>
  );
}

