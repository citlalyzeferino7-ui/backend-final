const bcrypt = require("bcrypt");
const { sign } = require("../utils/auth");

let users = [
  {
    id: 1,
    email: "admin@joyeria.com",
    password: "12345", 
    role: "admin"
  }
]; 

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = sign({ id: user.id, role: user.role });

  res.json({ token });
};

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña requeridos" });
  }

  const exists = users.find(u => u.email === email);

  if (exists) {
    return res.status(400).json({ message: "Usuario ya existe" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    email,
    password: hashed,
    role: "user"
  };

  users.push(newUser);

  res.status(201).json({ id: newUser.id, email: newUser.email });
};

module.exports = { login, register };