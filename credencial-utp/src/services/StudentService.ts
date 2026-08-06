import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { FirebaseSingleton } from '@/src/firebase/FirebaseSingleton';
import { AcademicNote, LibraryLoan, Student, StudentBenefit } from '@/src/models/Student';
import { StudentFactory } from '@/src/models/StudentFactory';
import { apiRequest } from '@/src/services/ApiService';

export type StudentRegistrationData = {
  matricula: string;
  nombre: string;
  correo: string;
  carrera: string;
  cuatrimestre: string;
  grupo: string;
  periodo: string;
  foto: string;
  estadoAcademico: Student['estadoAcademico'];
  notaAsignatura: string;
  notaParcial: string;
  notaCalificacion: string;
  bibliotecaTitulo: string;
  bibliotecaFechaPrestamo: string;
  bibliotecaFechaDevolucion: string;
  bibliotecaEstado: LibraryLoan['estado'];
  beneficioNombre: string;
  beneficioDescripcion: string;
  beneficioDescuento: string;
  beneficioVigencia: string;
};

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function getMatriculaFromEmail(email: string) {
  const localPart = normalizeEmail(email).split('@')[0];
  return /^\d{6,}$/.test(localPart) ? localPart : '';
}

type FirestoreData = Record<string, unknown>;

function cleanText(value: unknown, fallback = '') {
  return typeof value === 'string' ? value.trim() : fallback;
}

function cleanNumber(value: unknown) {
  if (typeof value === 'number') {
    return value;
  }

  const parsed = Number(String(value ?? '').replace(',', '.').trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function firstText(data: FirestoreData, fields: string[], fallback = '') {
  for (const field of fields) {
    const value = cleanText(data[field]);

    if (value) {
      return value;
    }
  }

  return fallback;
}

async function getFirstAvailableSubcollection(matricula: string, names: string[]) {
  for (const name of names) {
    const snapshot = await getDocs(collection(FirebaseSingleton.getDb(), 'alumnos', matricula, name));

    if (!snapshot.empty) {
      return snapshot.docs;
    }
  }

  return [];
}

async function getStudentDocumentByEmail(email: string) {
  const db = FirebaseSingleton.getDb();
  const studentsRef = collection(db, 'alumnos');
  const normalizedEmail = normalizeEmail(email);
  const snapshot = await getDocs(query(studentsRef, where('correo', '==', normalizedEmail)));

  if (snapshot.empty) {
    return null;
  }

  const studentDoc = snapshot.docs[0];
  return StudentFactory.fromFirestore(studentDoc.id, studentDoc.data());
}

export async function getStudentByEmail(email: string) {
  const normalizedEmail = normalizeEmail(email);
  const matriculaFromEmail = getMatriculaFromEmail(normalizedEmail);

  if (matriculaFromEmail) {
    const studentByMatricula = await getStudentByMatricula(matriculaFromEmail);

    if (studentByMatricula) {
      return studentByMatricula;
    }
  }

  return getStudentDocumentByEmail(normalizedEmail);
}

export async function getStudentForAuthenticatedUser(email: string, user: User) {
  const firestoreStudent = await getStudentByEmail(email);

  if (!firestoreStudent) {
    return null;
  }

  try {
    const apiStudent = await apiRequest<Student>(`/api/alumno/${firestoreStudent.matricula}`, user);
    return StudentFactory.fromFirestore(apiStudent.id || firestoreStudent.id, apiStudent);
  } catch {
    return firestoreStudent;
  }
}

export async function getStudentByMatricula(matricula: string) {
  const snapshot = await getDoc(doc(FirebaseSingleton.getDb(), 'alumnos', matricula));

  if (!snapshot.exists()) {
    return null;
  }

  return StudentFactory.fromFirestore(snapshot.id, snapshot.data());
}

export async function createStudentProfile(data: StudentRegistrationData) {
  const matricula = data.matricula.trim();
  const correo = normalizeEmail(data.correo);

  if (!/^\d{6,}$/.test(matricula)) {
    throw new Error('La matricula debe contener solo numeros y tener al menos 6 digitos.');
  }

  const studentRef = doc(FirebaseSingleton.getDb(), 'alumnos', matricula);
  const existing = await getDoc(studentRef);

  if (existing.exists()) {
    throw new Error('Ya existe un alumno registrado con esa matricula.');
  }

  await setDoc(studentRef, {
    correo,
    nombre: data.nombre.trim(),
    matricula,
    carrera: data.carrera.trim(),
    cuatrimestre: data.cuatrimestre.trim(),
    grupo: data.grupo.trim(),
    periodo: data.periodo.trim(),
    foto: data.foto.trim(),
    EstadoAcademico: data.estadoAcademico,
  });

  if (data.notaAsignatura.trim()) {
    await setDoc(doc(FirebaseSingleton.getDb(), 'alumnos', matricula, 'notas', 'nota-inicial'), {
      asignatura: data.notaAsignatura.trim(),
      parcial: data.notaParcial.trim() || 'Parcial 1',
      calificacion: Number(data.notaCalificacion) || 0,
      periodo: data.periodo.trim(),
    });
  }

  if (data.bibliotecaTitulo.trim()) {
    await setDoc(doc(FirebaseSingleton.getDb(), 'alumnos', matricula, 'biblioteca', 'prestamo-inicial'), {
      titulo: data.bibliotecaTitulo.trim(),
      fechaPrestamo: data.bibliotecaFechaPrestamo.trim(),
      fechaDevolucion: data.bibliotecaFechaDevolucion.trim(),
      estado: data.bibliotecaEstado,
    });
  }

  if (data.beneficioNombre.trim()) {
    await setDoc(doc(FirebaseSingleton.getDb(), 'alumnos', matricula, 'beneficios', 'beneficio-inicial'), {
      nombre: data.beneficioNombre.trim(),
      descripcion: data.beneficioDescripcion.trim(),
      descuento: data.beneficioDescuento.trim(),
      vigencia: data.beneficioVigencia.trim() || data.periodo.trim(),
    });
  }
}

export async function getNotes(matricula: string): Promise<AcademicNote[]> {
  const docs = await getFirstAvailableSubcollection(matricula, ['notas', 'Notas']);

  return docs.map((item) => {
    const data = item.data() as FirestoreData;

    return {
      id: item.id,
      asignatura: firstText(data, ['asignatura', 'Asignatura']),
      parcial: firstText(data, ['parcial', 'Parcial']),
      calificacion: cleanNumber(data.calificacion ?? data.Calificacion ?? data['Calificación']),
      periodo: firstText(data, ['periodo', 'Periodo']),
      profesor: firstText(data, ['profesor', 'Profesor']),
    };
  });
}

export async function getLibraryLoans(matricula: string): Promise<LibraryLoan[]> {
  const docs = await getFirstAvailableSubcollection(matricula, ['biblioteca', 'Biblioteca']);

  return docs.map((item) => {
    const data = item.data() as FirestoreData;

    return {
      id: item.id,
      titulo: firstText(data, ['titulo', 'Titulo', 'Título']),
      fechaPrestamo: firstText(data, ['fechaPrestamo', 'FechaPrestamo', 'fecha_prestamo', 'Fecha prestamo']),
      fechaDevolucion: firstText(data, ['fechaDevolucion', 'FechaDevolucion', 'fecha_devolucion', 'Fecha devolucion']),
      estado: firstText(data, ['estado', 'Estado'], 'Vigente') as LibraryLoan['estado'],
    };
  });
}

export async function getBenefits(matricula: string): Promise<StudentBenefit[]> {
  const docs = await getFirstAvailableSubcollection(matricula, ['beneficios', 'Beneficios']);

  return docs.map((item) => {
    const data = item.data() as FirestoreData;

    return {
      id: item.id,
      nombre: firstText(data, ['nombre', 'Nombre']),
      descripcion: firstText(data, ['descripcion', 'Descripcion', 'Descripción']),
      descuento: firstText(data, ['descuento', 'Descuento']),
      vigencia: firstText(data, ['vigencia', 'Vigencia']),
    };
  });
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
