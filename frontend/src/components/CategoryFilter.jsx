import { Button } from "@/components/ui/button";

export function CategoryFilter({ categorias, categoriaSeleccionada, onSelectCategoria }) {
  return (
    <div id="categorias" className="flex flex-wrap items-center gap-2">
      <Button
        variant={categoriaSeleccionada === "Todas" ? "default" : "outline"}
        onClick={() => onSelectCategoria("Todas")}
        className={
          categoriaSeleccionada === "Todas"
            ? "bg-rose-600 hover:bg-rose-700 text-white"
            : "border-slate-300 text-slate-700 hover:bg-rose-50"
        }
      >
        Todas
      </Button>

      {categorias.map((cat) => (
        <Button
          key={cat}
          variant={categoriaSeleccionada === cat ? "default" : "outline"}
          onClick={() => onSelectCategoria(cat)}
          className={
            categoriaSeleccionada === cat
              ? "bg-rose-600 hover:bg-rose-700 text-white"
              : "border-slate-300 text-slate-700 hover:bg-rose-50"
          }
        >
          {cat}
        </Button>
      ))}
    </div>
  );
}