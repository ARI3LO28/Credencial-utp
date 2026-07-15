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

async function getSubcollection(matricula, name) {
  const snapshot = await db().collection('alumnos').doc(matricula).collection(name).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function updateFoto(matricula, fotoUrl) {
  await db().collection('alumnos').doc(matricula).set({ fotoUrl }, { merge: true });
  return getAlumno(matricula);
}

module.exports = {
  getAlumno,
  getBeneficios: (matricula) => getSubcollection(matricula, 'beneficios'),
  getBiblioteca: (matricula) => getSubcollection(matricula, 'biblioteca'),
  getNotas: (matricula) => getSubcollection(matricula, 'notas'),
  updateFoto,
};
