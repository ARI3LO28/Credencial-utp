import { Student } from './Student';

type FirestoreStudent = Partial<Student> & {
  name?: string;
  status?: Student['estadoAcademico'];
};

export class StudentFactory {
  static fromFirestore(id: string, data: FirestoreStudent): Student {
    return {
      id,
      uid: data.uid,
      matricula: data.matricula ?? id,
      nombre: data.nombre ?? data.name ?? 'Alumno UTP',
      carrera: data.carrera ?? 'Desarrollo Web Integral',
      correo: data.correo ?? '',
      estadoAcademico: data.estadoAcademico ?? data.status ?? 'Activo',
      fotoUrl: data.fotoUrl,
    };
  }

  static demo(): Student {
    return {
      id: 'demo',
      matricula: 'UTP2026001',
      nombre: 'Alumno Demo',
      carrera: 'Ingenieria en Desarrollo y Gestion de Software',
      correo: 'alumno@utpuebla.edu.mx',
      estadoAcademico: 'Activo',
    };
  }
}
