import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function StockBadge({ cantidad }) {
  if (cantidad === 0) {
    return <Badge className="bg-red-600 hover:bg-red-700 text-white text-xs">Agotado</Badge>;
  }
  if (cantidad <= 5) {
    return <Badge className="bg-amber-500 hover:bg-amber-600 text-white text-xs">Quedan {cantidad}!</Badge>;
  }
  return <Badge className="bg-green-600 hover:bg-green-700 text-white text-xs">Disponible</Badge>;
}

export function ProductCard({ producto, onVerDetalle }) {
  const { nombre, descripcion, precio, precio_final, imagen_url, categoria_nombre, cantidad_disponible, descuento } = producto;
  const tieneDescuento = descuento > 0;

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-200 hover:shadow-lg border-slate-200">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={imagen_url}
          alt={nombre}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge className="absolute top-3 left-3 bg-rose-600 hover:bg-rose-700 text-white">
          {categoria_nombre}
        </Badge>
        {tieneDescuento && (
          <Badge className="absolute top-3 right-3 bg-amber-500 hover:bg-amber-600 text-white font-bold">
            -{descuento}%
          </Badge>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-slate-800 line-clamp-1">
          {nombre}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <p className="text-sm text-slate-600 line-clamp-2">{descripcion}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t bg-slate-50/60 pt-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-extrabold text-rose-600">
              S/ {Number(precio_final).toFixed(2)}
            </span>
            {tieneDescuento && (
              <span className="text-sm text-slate-400 line-through">
                S/ {Number(precio).toFixed(2)}
              </span>
            )}
          </div>
          <div className="mt-1">
            <StockBadge cantidad={cantidad_disponible} />
          </div>
        </div>

        <Button
          size="sm"
          disabled={cantidad_disponible === 0}
          onClick={() => onVerDetalle && onVerDetalle(producto)}
          className="bg-slate-900 hover:bg-rose-600 text-white transition-colors"
        >
          Ver detalle
        </Button>
      </CardFooter>
    </Card>
  );
}
