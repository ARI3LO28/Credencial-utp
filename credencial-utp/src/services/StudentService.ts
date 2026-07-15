import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { FirebaseSingleton } from '@/src/firebase/FirebaseSingleton';
import { AcademicNote, LibraryLoan, StudentBenefit } from '@/src/models/Student';
import { StudentFactory } from '@/src/models/StudentFactory';

export async function getStudentByEmail(email: string) {
  const db = FirebaseSingleton.getDb();
  const studentsRef = collection(db, 'alumnos');
  const snapshot = await getDocs(query(studentsRef, where('correo', '==', email.toLowerCase())));

  if (snapshot.empty) {
    return StudentFactory.demo();
  }

  const studentDoc = snapshot.docs[0];
  return StudentFactory.fromFirestore(studentDoc.id, studentDoc.data());
}

export async function getStudentByMatricula(matricula: string) {
  const snapshot = await getDoc(doc(FirebaseSingleton.getDb(), 'alumnos', matricula));

  if (!snapshot.exists()) {
    return StudentFactory.demo();
  }

  return StudentFactory.fromFirestore(snapshot.id, snapshot.data());
}

export async function getNotes(matricula: string): Promise<AcademicNote[]> {
  const snapshot = await getDocs(collection(FirebaseSingleton.getDb(), 'alumnos', matricula, 'notas'));

  if (snapshot.empty) {
    return [
      { id: 'demo-1', asignatura: 'Desarrollo Web Integral', parcial: 'Parcial 1', calificacion: 9.4, periodo: '2026' },
      { id: 'demo-2', asignatura: 'Bases de Datos', parcial: 'Parcial 1', calificacion: 8.9, periodo: '2026' },
    ];
  }

  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as AcademicNote);
}

export async function getLibraryLoans(matricula: string): Promise<LibraryLoan[]> {
  const snapshot = await getDocs(collection(FirebaseSingleton.getDb(), 'alumnos', matricula, 'biblioteca'));

  if (snapshot.empty) {
    return [
      {
        id: 'demo-loan',
        titulo: 'Clean Code',
        fechaPrestamo: '2026-07-01',
        fechaDevolucion: '2026-07-18',
        estado: 'Vigente',
      },
    ];
  }

  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as LibraryLoan);
}

export async function getBenefits(matricula: string): Promise<StudentBenefit[]> {
  const snapshot = await getDocs(collection(FirebaseSingleton.getDb(), 'alumnos', matricula, 'beneficios'));

  if (snapshot.empty) {
    return [
      {
        id: 'demo-benefit',
        nombre: 'Transporte universitario',
        descripcion: 'Descuento para rutas participantes presentando credencial digital vigente.',
        descuento: '25%',
        vigencia: '2026',
      },
    ];
  }

  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as StudentBenefit);
}

export async function uploadProfilePhoto(matricula: string, uri: string) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const storageRef = ref(FirebaseSingleton.getStorage(), `alumnos/${matricula}/perfil.jpg`);

  await uploadBytes(storageRef, blob);
  const fotoUrl = await getDownloadURL(storageRef);
  await setDoc(doc(FirebaseSingleton.getDb(), 'alumnos', matricula), { fotoUrl }, { merge: true });

  return fotoUrl;
}
