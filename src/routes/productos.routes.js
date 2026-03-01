const router = require("express").Router();
const controller = require("../controllers/productos.controller");
const asyncHandler = require("../utils/asyncHandler");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/roles.middleware");

// Rutas públicas
router.get("/visible", asyncHandler(controller.getProductos));
router.get("/buscar", asyncHandler(controller.buscarProductos));

// Rutas protegidas (solo admin)
router.post("/", auth, role("admin"), asyncHandler(controller.createProducto));
router.put("/:id", auth, role("admin"), asyncHandler(controller.updateProducto));
router.delete("/:id", auth, role("admin"), asyncHandler(controller.deleteProducto));

module.exports = router;