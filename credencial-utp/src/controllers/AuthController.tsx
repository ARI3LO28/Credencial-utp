import { User } from 'firebase/auth';
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { Student } from '@/src/models/Student';
import { authObserver } from '@/src/services/AuthObserver';
import { LoginCredentials, loginWithEmail, logout } from '@/src/services/AuthService';
import { getStudentByEmail } from '@/src/services/StudentService';

type AuthContextValue = {
  user: User | null;
  student: Student | null;
  loading: boolean;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  refreshStudent: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  const loadStudent = async (currentUser: User | null) => {
    if (!currentUser?.email) {
      setStudent(null);
      return;
    }

    setStudent(await getStudentByEmail(currentUser.email));
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
      loading,
      signIn: async (credentials) => {
        setLoading(true);
        const currentUser = await loginWithEmail(credentials);
        setUser(currentUser);
        await loadStudent(currentUser);
        setLoading(false);
      },
      signOut: async () => {
        await logout();
        setUser(null);
        setStudent(null);
      },
      refreshStudent: async () => loadStudent(user),
    }),
    [loading, student, user],
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
