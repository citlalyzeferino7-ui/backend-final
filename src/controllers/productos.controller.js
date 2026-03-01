const productosRepo = require("../repositories/productos.repository");

// Crear producto
async function createProducto(req, res) {
  const producto = await productosRepo.create(req.body);
  res.status(201).json(producto);
}

// Actualizar producto
async function updateProducto(req, res) {
  const { id } = req.params;
  const updated = await productosRepo.update(id, req.body);
  if (!updated) return res.status(404).json({ message: "Producto no encontrado" });
  res.json(updated);
}

// Eliminar producto
async function deleteProducto(req, res) {
  const { id } = req.params;
  const deleted = await productosRepo.delete(id);
  if (!deleted) return res.status(404).json({ message: "Producto no encontrado" });
  res.json({ message: "Producto eliminado correctamente" });
}

// Obtener productos visibles
async function getProductos(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const productos = await productosRepo.findAll(page, limit);
  res.json(productos);
}

// Buscar productos
async function buscarProductos(req, res) {
  const { q } = req.query;
  const productos = await productosRepo.search(q);
  res.json(productos);
}

module.exports = {
  createProducto,
  updateProducto,
  deleteProducto,
  getProductos,
  buscarProductos
};