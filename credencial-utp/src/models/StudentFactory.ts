import { Student } from './Student';

type FirestoreStudent = Partial<Student> & {
  EstadoAcademico?: Student['estadoAcademico'];
  estado?: Student['estadoAcademico'];
  foto?: string;
  name?: string;
  status?: Student['estadoAcademico'];
};

function cleanText(value: unknown, fallback = '') {
  return typeof value === 'string' ? value.trim() : fallback;
}

export class StudentFactory {
  static fromFirestore(id: string, data: FirestoreStudent): Student {
    const matricula = cleanText(data.matricula, id);
    const nombre = cleanText(data.nombre, cleanText(data.name, 'Alumno UTP'));
    const carrera = cleanText(data.carrera, 'Sin carrera registrada');
    const correo = cleanText(data.correo).toLowerCase();
    const estadoAcademico =
      data.estadoAcademico ?? data.EstadoAcademico ?? data.estado ?? data.status ?? 'Activo';

    return {
      id,
      uid: data.uid,
      matricula,
      nombre,
      carrera,
      correo,
      estadoAcademico,
      fotoUrl: cleanText(data.fotoUrl, cleanText(data.foto)) || undefined,
      cuatrimestre: cleanText(data.cuatrimestre) || undefined,
      grupo: cleanText(data.grupo) || undefined,
      periodo: cleanText(data.periodo) || undefined,
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
