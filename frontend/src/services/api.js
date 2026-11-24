const API_URL = "http://127.0.0.1:8000/api";

export async function obtenerCategorias() {
  const respuesta = await fetch(`${API_URL}/categorias/`);
  if (!respuesta.ok) throw new Error("Error al cargar categorías");
  return respuesta.json();
}

export async function obtenerProductos(categoria = null, busqueda = "", ordenamiento = "") {
  const params = new URLSearchParams();
  if (categoria && categoria !== "Todas") {
    params.append("categoria", categoria);
  }
  if (busqueda.trim()) {
    params.append("search", busqueda.trim());
  }
  if (ordenamiento) {
    params.append("ordering", ordenamiento);
  }
  const query = params.toString();
  const url = query ? `${API_URL}/productos/?${query}` : `${API_URL}/productos/`;
  const respuesta = await fetch(url);
  if (!respuesta.ok) throw new Error("Error al cargar productos");
  return respuesta.json();
}

export async function obtenerPromociones() {
  const respuesta = await fetch(`${API_URL}/promociones/`);
  if (!respuesta.ok) throw new Error("Error al cargar promociones");
  return respuesta.json();
}

export async function obtenerRecomendaciones(productoId) {
  const respuesta = await fetch(`${API_URL}/productos/${productoId}/recomendaciones/`);
  if (!respuesta.ok) throw new Error("Error al cargar recomendaciones");
  return respuesta.json();
}

export async function actualizarStock(productoId, cantidad) {
  const respuesta = await fetch(`${API_URL}/productos/${productoId}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cantidad_disponible: cantidad }),
  });
  if (!respuesta.ok) throw new Error("Error al actualizar stock");
  return respuesta.json();
}
