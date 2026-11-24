import { useState, useEffect } from "react";
import { X, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "./ProductCard";
import { obtenerRecomendaciones } from "@/services/api";

export function ProductDetailDialog({ producto, open, onClose }) {
  const [recomendaciones, setRecomendaciones] = useState([]);

  useEffect(() => {
    if (producto && open) {
      obtenerRecomendaciones(producto.id)
        .then(setRecomendaciones)
        .catch(() => setRecomendaciones([]));
    }
  }, [producto, open]);

  if (!producto) return null;

  const tieneDescuento = producto.descuento > 0;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-slate-800">{producto.nombre}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
            <img
              src={producto.imagen_url}
              alt={producto.nombre}
              className="h-full w-full object-cover"
            />
            {tieneDescuento && (
              <Badge className="absolute top-3 right-3 bg-amber-500 text-white font-bold text-sm">
                -{producto.descuento}%
              </Badge>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Badge className="w-fit bg-rose-100 text-rose-700 hover:bg-rose-100">
              {producto.categoria_nombre}
            </Badge>

            <p className="text-slate-600 text-sm leading-relaxed">{producto.descripcion}</p>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-rose-600">
                S/ {Number(producto.precio_final).toFixed(2)}
              </span>
              {tieneDescuento && (
                <span className="text-base text-slate-400 line-through">
                  S/ {Number(producto.precio).toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm">
              {producto.cantidad_disponible === 0 ? (
                <Badge className="bg-red-600 text-white">Agotado</Badge>
              ) : producto.cantidad_disponible <= 5 ? (
                <Badge className="bg-amber-500 text-white">Quedan {producto.cantidad_disponible}!</Badge>
              ) : (
                <Badge className="bg-green-600 text-white">Stock: {producto.cantidad_disponible} und.</Badge>
              )}
            </div>

            {producto.destacado && (
              <div className="flex items-center gap-1 text-amber-600 text-sm">
                <Star className="h-4 w-4 fill-amber-500" />
                <span className="font-medium">Producto destacado</span>
              </div>
            )}

            {producto.vendidos > 0 && (
              <p className="text-xs text-slate-500">{producto.vendidos} vendidos</p>
            )}
          </div>
        </div>

        {recomendaciones.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-bold text-slate-800 mb-3">
              También te puede gustar
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recomendaciones.map((rec) => (
                <ProductCard key={rec.id} producto={rec} onVerDetalle={onClose} />
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
