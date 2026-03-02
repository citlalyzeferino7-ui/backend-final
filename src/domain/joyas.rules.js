function validarJoya({ nombre, precio, stock }) {

  if (!nombre || typeof nombre !== 'string') {
    return { ok: false, error: 'Nombre inválido' };
  }

  const p = Number(precio);
  if (!Number.isFinite(p) || p <= 0) {
    return { ok: false, error: 'Precio inválido' };
  }

  const s = Number(stock);
  if (!Number.isInteger(s) || s < 0) {
    return { ok: false, error: 'Stock inválido' };
  }

  return {
    ok: true,
    data: {
      nombre,
      precio: p,
      stock: s
    }
  };
}

module.exports = { validarJoya };