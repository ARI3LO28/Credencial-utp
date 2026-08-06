import { User } from 'firebase/auth';
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { Student } from '@/src/models/Student';
import { authObserver } from '@/src/services/AuthObserver';
import { LoginCredentials, loginWithEmail, logout } from '@/src/services/AuthService';
import { getStudentForAuthenticatedUser } from '@/src/services/StudentService';

type AuthContextValue = {
  user: User | null;
  student: Student | null;
  studentError: string;
  loading: boolean;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  refreshStudent: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [studentError, setStudentError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadStudent = async (currentUser: User | null) => {
    setStudentError('');

    if (!currentUser?.email) {
      setStudent(null);
      return;
    }

    try {
      const currentStudent = await getStudentForAuthenticatedUser(currentUser.email, currentUser);
      setStudent(currentStudent);

      if (!currentStudent) {
        setStudentError(
          `No existe un alumno registrado en Firestore con el correo ${currentUser.email.trim().toLowerCase()}.`,
        );
      }
    } catch (error) {
      setStudent(null);
      setStudentError(error instanceof Error ? error.message : 'No se pudieron cargar los datos del alumno.');
    }
  };

  useEffect(() => {
    return authObserver.subscribe(async (currentUser) => {
      setLoading(true);
      setUser(currentUser);
      await loadStudent(currentUser);
      setLoading(false);
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      student,
      studentError,
      loading,
      signIn: async (credentials) => {
        setLoading(true);
        try {
          const currentUser = await loginWithEmail(credentials);
          setUser(currentUser);
          await loadStudent(currentUser);
        } finally {
          setLoading(false);
        }
      },
      signOut: async () => {
        await logout();
        setUser(null);
        setStudent(null);
        setStudentError('');
      },
      refreshStudent: async () => loadStudent(user),
    }),
    [loading, student, studentError, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider.');
  }

  return context;
}
