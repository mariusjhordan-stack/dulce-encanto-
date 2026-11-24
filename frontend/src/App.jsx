import { useState, useEffect, useMemo } from "react";
import { Header } from "./components/Header";
import { CategoryFilter } from "./components/CategoryFilter";
import { ProductList } from "./components/ProductList";
import { SearchBar } from "./components/SearchBar";
import { PromoBanner } from "./components/PromoBanner";
import { FeaturedSection } from "./components/FeaturedSection";
import { InventoryPage } from "./components/InventoryPage";
import { ProductDetailDialog } from "./components/ProductDetailDialog";
import { obtenerCategorias, obtenerProductos, obtenerPromociones } from "./services/api";

export function App() {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [promociones, setPromociones] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [ordenamiento, setOrdenamiento] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [productoDetalle, setProductoDetalle] = useState(null);

  useEffect(() => {
    obtenerCategorias()
      .then((data) => setCategorias(data.map((c) => c.nombre)))
      .catch((err) => console.error("Error al cargar categorías:", err));

    obtenerPromociones()
      .then(setPromociones)
      .catch((err) => console.error("Error al cargar promociones:", err));
  }, []);

  useEffect(() => {
    async function cargar() {
      try {
        setCargando(true);
        setError(null);
        const data = await obtenerProductos(
          categoriaSeleccionada === "Todas" ? null : categoriaSeleccionada,
          busqueda,
          ordenamiento
        );
        setProductos(data);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("No se pudo conectar con el servidor de Django.");
      } finally {
        setCargando(false);
      }
    }
    const timer = setTimeout(cargar, 300);
    return () => clearTimeout(timer);
  }, [categoriaSeleccionada, busqueda, ordenamiento]);

  const productosFiltrados = useMemo(() => {
    let filtrados = productos;
    if (precioMin !== "") {
      filtrados = filtrados.filter((p) => Number(p.precio_final) >= Number(precioMin));
    }
    if (precioMax !== "") {
      filtrados = filtrados.filter((p) => Number(p.precio_final) <= Number(precioMax));
    }
    return filtrados;
  }, [productos, precioMin, precioMax]);

  const handleStockChange = (id, nuevoStock) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, cantidad_disponible: nuevoStock } : p))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <section id="catalogo" className="mb-8 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-500 p-6 md:p-10 text-white shadow-md">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Nuestros Postres Artesanales
          </h2>
          <p className="mt-2 max-w-2xl text-rose-100 text-sm md:text-base">
            Elaborados cada mañana con ingredientes frescos. Filtra por tu categoría favorita.
          </p>
        </section>

        <PromoBanner promociones={promociones} />

        <FeaturedSection productos={productos} onVerDetalle={setProductoDetalle} />

        <section className="mb-6 flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Explorar por categoría</h3>
              <p className="text-xs text-slate-500">
                Mostrando {productosFiltrados.length} producto(s)
              </p>
            </div>
            <CategoryFilter
              categorias={categorias}
              categoriaSeleccionada={categoriaSeleccionada}
              onSelectCategoria={setCategoriaSeleccionada}
            />
          </div>

          <SearchBar
            busqueda={busqueda}
            onBusquedaChange={setBusqueda}
            ordenamiento={ordenamiento}
            onOrdenamientoChange={setOrdenamiento}
            precioMin={precioMin}
            precioMax={precioMax}
            onPrecioMinChange={setPrecioMin}
            onPrecioMaxChange={setPrecioMax}
          />
        </section>

        {cargando && <p className="text-center py-10 text-slate-500">Cargando catálogo...</p>}
        {error && <p className="text-center py-10 text-rose-600 font-medium">{error}</p>}
        {!cargando && !error && (
          <ProductList productos={productosFiltrados} onVerDetalle={setProductoDetalle} />
        )}

        <div className="mt-12">
          <InventoryPage productos={productos} onStockChange={handleStockChange} />
        </div>
      </main>

      <ProductDetailDialog
        producto={productoDetalle}
        open={!!productoDetalle}
        onClose={() => setProductoDetalle(null)}
      />
    </div>
  );
}

export default App;
