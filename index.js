const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usersRouter = require('./src/routes/users.routes');
const joyasRouter = require('./src/routes/joyas.routes');
const requireAdmin = require('./src/middlewares/requireAdmin');
const ratesRouter = require('./src/routes/rates.routes');
const app = express();

app.use(cors());
app.use(express.json());


app.use('/users', usersRouter);
app.use('/joyas', joyasRouter);
app.use('/auth', require('./src/routes/auth.routes'));
app.use('/rates', ratesRouter);
app.listen(3001, () =>
  console.log('Servidor corriendo en http://localhost:3001')
);