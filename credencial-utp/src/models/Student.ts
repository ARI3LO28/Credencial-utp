export type AcademicStatus = 'Activo' | 'Regular' | 'Baja temporal' | 'Egresado';

export type Student = {
  id: string;
  uid?: string;
  matricula: string;
  nombre: string;
  carrera: string;
  correo: string;
  estadoAcademico: AcademicStatus;
  fotoUrl?: string;
  cuatrimestre?: string;
  grupo?: string;
  periodo?: string;
};

export type AcademicNote = {
  id: string;
  asignatura: string;
  parcial: string;
  calificacion: number;
  periodo: string;
  profesor?: string;
};

export type LibraryLoan = {
  id: string;
  titulo: string;
  fechaPrestamo: string;
  fechaDevolucion: string;
  estado: 'Vigente' | 'Vencido' | 'Devuelto';
};

export type StudentBenefit = {
  id: string;
  nombre: string;
  descripcion: string;
  descuento: string;
  vigencia: string;
};
