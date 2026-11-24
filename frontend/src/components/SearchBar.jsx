import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar({
  busqueda,
  onBusquedaChange,
  ordenamiento,
  onOrdenamientoChange,
  precioMin,
  precioMax,
  onPrecioMinChange,
  onPrecioMaxChange,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          type="text"
          placeholder="Buscar postres..."
          value={busqueda}
          onChange={(e) => onBusquedaChange(e.target.value)}
          className="pl-10 border-slate-300 focus:border-rose-400"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500 whitespace-nowrap">Ordenar:</span>
        <select
          value={ordenamiento}
          onChange={(e) => onOrdenamientoChange(e.target.value)}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-rose-400 focus:outline-none"
        >
          <option value="">Relevancia</option>
          <option value="precio">Precio: menor a mayor</option>
          <option value="-precio">Precio: mayor a menor</option>
          <option value="-vendidos">Más vendidos</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500 whitespace-nowrap">Precio:</span>
        <Input
          type="number"
          placeholder="Min"
          value={precioMin}
          onChange={(e) => onPrecioMinChange(e.target.value)}
          className="w-20 border-slate-300 text-sm"
          min="0"
        />
        <span className="text-slate-400">-</span>
        <Input
          type="number"
          placeholder="Max"
          value={precioMax}
          onChange={(e) => onPrecioMaxChange(e.target.value)}
          className="w-20 border-slate-300 text-sm"
          min="0"
        />
      </div>
    </div>
  );
}
