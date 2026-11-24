import { useState } from "react";
import { Package, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { actualizarStock } from "@/services/api";

export function InventoryPage({ productos, onStockChange }) {
  const [updating, setUpdating] = useState(null);

  const handleStockChange = async (id, delta) => {
    const producto = productos.find((p) => p.id === id);
    if (!producto) return;
    const nuevoStock = Math.max(0, producto.cantidad_disponible + delta);
    setUpdating(id);
    try {
      await actualizarStock(id, nuevoStock);
      onStockChange(id, nuevoStock);
    } catch (err) {
      console.error("Error al actualizar stock:", err);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <section id="inventario" className="mb-10">
      <div className="mb-4 flex items-center gap-2">
        <Package className="h-6 w-6 text-slate-700" />
        <h2 className="text-2xl font-bold text-slate-800">Inventario</h2>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-semibold">Producto</th>
              <th className="px-4 py-3 font-semibold hidden sm:table-cell">Categoría</th>
              <th className="px-4 py-3 font-semibold text-center">Stock</th>
              <th className="px-4 py-3 font-semibold text-center">Estado</th>
              <th className="px-4 py-3 font-semibold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {productos.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-medium text-slate-800">{p.nombre}</td>
                <td className="px-4 py-3 text-slate-600 hidden sm:table-cell">{p.categoria_nombre}</td>
                <td className="px-4 py-3 text-center font-mono font-bold text-slate-800">
                  {p.cantidad_disponible}
                </td>
                <td className="px-4 py-3 text-center">
                  {p.cantidad_disponible === 0 ? (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Agotado</Badge>
                  ) : p.cantidad_disponible <= 5 ? (
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Bajo</Badge>
                  ) : (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">OK</Badge>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-slate-300"
                      disabled={updating === p.id || p.cantidad_disponible === 0}
                      onClick={() => handleStockChange(p.id, -1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-slate-300"
                      disabled={updating === p.id}
                      onClick={() => handleStockChange(p.id, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
