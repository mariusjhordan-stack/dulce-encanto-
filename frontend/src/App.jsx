import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { CategoryFilter } from "./components/CategoryFilter";
import { ProductList } from "./components/ProductList";
import { obtenerCategorias, obtenerProductos } from "./services/api";

export function App() {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarCategorias() {
      try {
        const catsData = await obtenerCategorias();
        setCategorias(catsData.map((c) => c.nombre));
      } catch (err) {
        console.error("Error al cargar categorías:", err);
      }
    }
    cargarCategorias();
  }, []);

  useEffect(() => {
    async function cargarProductos() {
      try {
        setCargando(true);
        setError(null);
        const prodsData = await obtenerProductos(
          categoriaSeleccionada === "Todas" ? null : categoriaSeleccionada
        );
        setProductos(
          prodsData.map((p) => ({
            ...p,
            categoria: p.categoria_nombre,
          }))
        );
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("No se pudo conectar con el servidor de Django.");
      } finally {
        setCargando(false);
      }
    }
    cargarProductos();
  }, [categoriaSeleccionada]);

  const productosFiltrados =
    categoriaSeleccionada === "Todas"
      ? productos
      : productos.filter((prod) => prod.categoria === categoriaSeleccionada);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main id="catalogo" className="container mx-auto px-4 py-8">
        <section className="mb-8 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-500 p-6 md:p-10 text-white shadow-md">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Nuestros Postres Artesanales
          </h2>
          <p className="mt-2 max-w-2xl text-rose-100 text-sm md:text-base">
            Elaborados cada mañana con ingredientes frescos. Filtra por tu categoría favorita.
          </p>
        </section>

        <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
        </section>

        {cargando && <p className="text-center py-10 text-slate-500">Cargando catálogo...</p>}
        {error && <p className="text-center py-10 text-rose-600 font-medium">{error}</p>}
        {!cargando && !error && <ProductList productos={productosFiltrados} />}
      </main>
    </div>
  );
}

export default App;
