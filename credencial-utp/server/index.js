require('dotenv').config();

const cors = require('cors');
const express = require('express');

const repository = require('./studentRepository');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

function asyncHandler(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

function requireMatricula(req, res, next) {
  if (!req.params.matricula) {
    return res.status(400).json({ message: 'La matricula es obligatoria.' });
  }

  return next();
}

app.get('/api/alumno/:matricula', requireMatricula, asyncHandler(async (req, res) => {
  const alumno = await repository.getAlumno(req.params.matricula);

  if (!alumno) {
    return res.status(404).json({ message: 'Alumno no encontrado.' });
  }

  return res.json(alumno);
}));

app.get('/api/notas/:matricula', requireMatricula, asyncHandler(async (req, res) => {
  res.json(await repository.getNotas(req.params.matricula));
}));

app.get('/api/biblioteca/:matricula', requireMatricula, asyncHandler(async (req, res) => {
  res.json(await repository.getBiblioteca(req.params.matricula));
}));

app.put('/api/foto/:matricula', requireMatricula, asyncHandler(async (req, res) => {
  if (!req.body.fotoUrl) {
    return res.status(400).json({ message: 'fotoUrl es obligatorio.' });
  }

  return res.json(await repository.updateFoto(req.params.matricula, req.body.fotoUrl));
}));

app.get('/api/beneficios/:matricula', requireMatricula, asyncHandler(async (req, res) => {
  res.json(await repository.getBeneficios(req.params.matricula));
}));

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Error interno del servidor.' });
});

app.listen(port, () => {
  console.log(`API Credencial UTP escuchando en http://localhost:${port}`);
});
