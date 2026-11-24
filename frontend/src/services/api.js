const API_URL = "http://127.0.0.1:8000/api";

export async function obtenerCategorias() {
  const respuesta = await fetch(`${API_URL}/categorias/`);
  if (!respuesta.ok) throw new Error("Error al cargar categorías");
  return respuesta.json();
}

export async function obtenerProductos(categoria = null) {
  const url =
    categoria && categoria !== "Todas"
      ? `${API_URL}/productos/?categoria=${encodeURIComponent(categoria)}`
      : `${API_URL}/productos/`;
  const respuesta = await fetch(url);
  if (!respuesta.ok) throw new Error("Error al cargar productos");
  return respuesta.json();
}
