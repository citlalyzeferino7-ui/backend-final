const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const usersRouter = require('./src/routes/users.routes');
const joyasRouter = require('./src/routes/joyas.routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/joyas', joyasRouter);

app.listen(3001, () => console.log('Servidor corriendo en http://localhost:3001'));