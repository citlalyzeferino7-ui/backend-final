const validateProduct = (producto) => {
  if (!producto.nombre || producto.nombre.trim() === "") {
    throw new Error("El nombre es obligatorio");
  }

  if (producto.precio === undefined || producto.precio === null) {
    throw new Error("El precio es obligatorio");
  }

  if (producto.precio <= 0) {
    throw new Error("El precio debe ser mayor a 0");
  }

  if (producto.stock < 0) {
    throw new Error("El stock no puede ser negativo");
  }

  const categoriasValidas = ["anillo", "collar", "pulsera", "aretes"];

  if (!categoriasValidas.includes(producto.categoria)) {
    throw new Error("Categoría inválida");
  }

  return true;
};

module.exports = { validateProduct };