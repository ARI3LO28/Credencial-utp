const { getFirebaseAdmin } = require('./firebaseAdmin');

function db() {
  return getFirebaseAdmin().firestore();
}

async function getAlumno(matricula) {
  const snapshot = await db().collection('alumnos').doc(matricula).get();

  if (!snapshot.exists) {
    return null;
  }

  return { id: snapshot.id, ...snapshot.data() };
}

async function getAlumnoByCorreo(correo) {
  const normalizedCorreo = String(correo || '').trim().toLowerCase();
  const snapshot = await db().collection('alumnos').where('correo', '==', normalizedCorreo).limit(1).get();

  if (snapshot.empty) {
    return null;
  }

  const alumno = snapshot.docs[0];
  return { id: alumno.id, ...alumno.data() };
}

async function getSubcollection(matricula, name) {
  const snapshot = await db().collection('alumnos').doc(matricula).collection(name).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function getFirstAvailableSubcollection(matricula, names) {
  for (const name of names) {
    const data = await getSubcollection(matricula, name);

    if (data.length > 0) {
      return data;
    }
  }

  return [];
}

async function updateFoto(matricula, fotoUrl) {
  await db().collection('alumnos').doc(matricula).set({ fotoUrl }, { merge: true });
  return getAlumno(matricula);
}

module.exports = {
  getAlumno,
  getAlumnoByCorreo,
  getBeneficios: (matricula) => getFirstAvailableSubcollection(matricula, ['beneficios', 'Beneficios']),
  getBiblioteca: (matricula) => getFirstAvailableSubcollection(matricula, ['biblioteca', 'Biblioteca']),
  getNotas: (matricula) => getFirstAvailableSubcollection(matricula, ['notas', 'Notas']),
  updateFoto,
};
