require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));

app.use(express.json());

app.use("/api/users", require("./src/routes/users.routes"));
app.use("/api/productos", require("./src/routes/productos.routes"));

const errorHandler = require("./src/middlewares/error.middleware");
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});