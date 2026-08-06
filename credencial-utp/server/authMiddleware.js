const { getFirebaseAdmin } = require('./firebaseAdmin');

function normalizeEmail(email) {
  return typeof email === 'string' ? email.trim().toLowerCase() : '';
}

function getMatriculaFromEmail(email) {
  const localPart = normalizeEmail(email).split('@')[0];
  return /^\d{6,}$/.test(localPart) ? localPart : '';
}

function isAdmin(decodedToken) {
  return (
    decodedToken.admin === true ||
    decodedToken.role === 'admin' ||
    (Array.isArray(decodedToken.roles) && decodedToken.roles.includes('admin'))
  );
}

async function requireFirebaseAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';

  if (!token) {
    return res.status(401).json({ message: 'Token de Firebase requerido.' });
  }

  try {
    req.user = await getFirebaseAdmin().auth().verifyIdToken(token);
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token de Firebase invalido o expirado.' });
  }
}

function canAccessAlumno(decodedToken, alumno, matricula) {
  if (isAdmin(decodedToken)) {
    return true;
  }

  const tokenEmail = normalizeEmail(decodedToken.email);
  const alumnoEmail = normalizeEmail(alumno?.correo);
  const tokenMatricula = getMatriculaFromEmail(tokenEmail);
  const requestedMatricula = String(matricula || '').trim();
  const alumnoMatricula = String(alumno?.matricula || alumno?.id || '').trim();

  return (
    (tokenEmail && alumnoEmail && tokenEmail === alumnoEmail) ||
    (tokenMatricula && tokenMatricula === requestedMatricula) ||
    (tokenMatricula && alumnoMatricula && tokenMatricula === alumnoMatricula)
  );
}

module.exports = {
  canAccessAlumno,
  requireFirebaseAuth,
};
