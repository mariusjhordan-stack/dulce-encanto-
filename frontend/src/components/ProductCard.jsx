import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ProductCard({ nombre, descripcion, precio, imagen_url, categoria, cantidad_disponible }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-200 hover:shadow-lg border-slate-200">
      {/* Imagen del postre */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={imagen_url}
          alt={nombre}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge className="absolute top-3 left-3 bg-rose-600 hover:bg-rose-700 text-white">
          {categoria}
        </Badge>
      </div>

      {/* Título y descripción */}
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-slate-800 line-clamp-1">
          {nombre}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <p className="text-sm text-slate-600 line-clamp-2">{descripcion}</p>
      </CardContent>

      {/* Precio, stock y acción */}
      <CardFooter className="flex items-center justify-between border-t bg-slate-50/60 pt-4">
        <div>
          <span className="text-lg font-extrabold text-rose-600">
            S/ {Number(precio).toFixed(2)}
          </span>
          <p className="text-xs text-slate-500">
            {cantidad_disponible > 0 ? `Stock: ${cantidad_disponible} und.` : "Agotado"}
          </p>
        </div>

        <Button
          size="sm"
          disabled={cantidad_disponible === 0}
          className="bg-slate-900 hover:bg-rose-600 text-white transition-colors"
        >
          Ver detalle
        </Button>
      </CardFooter>
    </Card>
  );
}