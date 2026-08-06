require('dotenv').config();

const cors = require('cors');
const express = require('express');

const { canAccessAlumno, requireFirebaseAuth } = require('./authMiddleware');
const repository = require('./studentRepository');

const app = express();
const port = process.env.PORT || 3001;

const allowedOrigins = (
  process.env.CORS_ALLOWED_ORIGINS ||
  process.env.FRONTEND_URL ||
  'http://localhost:8081,http://localhost:8082,http://localhost:8083'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Origen no permitido por CORS.'));
    },
  }),
);
app.use(express.json({ limit: '2mb' }));

function asyncHandler(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

function requireMatricula(req, res, next) {
  if (!req.params.matricula) {
    return res.status(400).json({ message: 'La matricula es obligatoria.' });
  }

  if (!/^\d{6,}$/.test(String(req.params.matricula).trim())) {
    return res.status(400).json({ message: 'El formato de matricula no es valido.' });
  }

  return next();
}

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    service: 'credencial-utp-api',
  });
});

app.use('/api', requireFirebaseAuth);

app.get('/api/alumno/:matricula', requireMatricula, asyncHandler(async (req, res) => {
  const alumno = await repository.getAlumno(req.params.matricula);

  if (!alumno) {
    return res.status(404).json({ message: 'Alumno no encontrado.' });
  }

  if (!canAccessAlumno(req.user, alumno, req.params.matricula)) {
    return res.status(403).json({ message: 'No tienes permiso para consultar esta matricula.' });
  }

  return res.json(alumno);
}));

app.get('/api/notas/:matricula', requireMatricula, asyncHandler(async (req, res) => {
  const alumno = await repository.getAlumno(req.params.matricula);

  if (!alumno) {
    return res.status(404).json({ message: 'Alumno no encontrado.' });
  }

  if (!canAccessAlumno(req.user, alumno, req.params.matricula)) {
    return res.status(403).json({ message: 'No tienes permiso para consultar estas notas.' });
  }

  res.json(await repository.getNotas(req.params.matricula));
}));

app.get('/api/biblioteca/:matricula', requireMatricula, asyncHandler(async (req, res) => {
  const alumno = await repository.getAlumno(req.params.matricula);

  if (!alumno) {
    return res.status(404).json({ message: 'Alumno no encontrado.' });
  }

  if (!canAccessAlumno(req.user, alumno, req.params.matricula)) {
    return res.status(403).json({ message: 'No tienes permiso para consultar biblioteca de esta matricula.' });
  }

  res.json(await repository.getBiblioteca(req.params.matricula));
}));

app.put('/api/foto/:matricula', requireMatricula, asyncHandler(async (req, res) => {
  if (!req.body.fotoUrl) {
    return res.status(400).json({ message: 'fotoUrl es obligatorio.' });
  }

  const alumno = await repository.getAlumno(req.params.matricula);

  if (!alumno) {
    return res.status(404).json({ message: 'Alumno no encontrado.' });
  }

  if (!canAccessAlumno(req.user, alumno, req.params.matricula)) {
    return res.status(403).json({ message: 'No tienes permiso para modificar esta foto.' });
  }

  return res.json(await repository.updateFoto(req.params.matricula, req.body.fotoUrl));
}));

app.get('/api/beneficios/:matricula', requireMatricula, asyncHandler(async (req, res) => {
  const alumno = await repository.getAlumno(req.params.matricula);

  if (!alumno) {
    return res.status(404).json({ message: 'Alumno no encontrado.' });
  }

  if (!canAccessAlumno(req.user, alumno, req.params.matricula)) {
    return res.status(403).json({ message: 'No tienes permiso para consultar beneficios de esta matricula.' });
  }

  res.json(await repository.getBeneficios(req.params.matricula));
}));

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Error interno del servidor.' });
});

app.listen(port, () => {
  console.log(`API Credencial UTP escuchando en http://localhost:${port}`);
});
