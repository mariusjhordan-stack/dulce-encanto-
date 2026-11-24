import { CakeSlice, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logotipo y nombre comercial */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 text-white">
            <CakeSlice className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Dulce Encanto
            </h1>
            <p className="text-xs text-slate-500">Pastelería Artesanal</p>
          </div>
        </div>

        {/* Navegación principal */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#catalogo" className="text-rose-600 font-semibold">
            Catálogo
          </a>
          <a href="#categorias" className="hover:text-rose-600 transition-colors">
            Categorías
          </a>
          <a href="#nosotros" className="hover:text-rose-600 transition-colors">
            Nosotros
          </a>
        </nav>

        {/* Botón decorativo de pedidos */}
        <Button variant="outline" size="sm" className="gap-2 border-rose-200 text-rose-700 hover:bg-rose-50">
          <ShoppingBag className="h-4 w-4" />
          <span>Pedidos</span>
        </Button>
      </div>
    </header>
  );
}

