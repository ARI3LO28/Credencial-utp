import { User, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { FirebaseSingleton } from '@/src/firebase/FirebaseSingleton';

export type LoginCredentials = {
  email: string;
  password: string;
};

export function validateInstitutionalEmail(email: string) {
  return /^[a-zA-Z0-9._%+-]+@utpuebla\.edu\.mx$/.test(email.trim());
}

export function validatePassword(password: string) {
  return password.length >= 6;
}

export async function loginWithEmail({ email, password }: LoginCredentials): Promise<User> {
  if (!validateInstitutionalEmail(email)) {
    throw new Error('Usa tu correo institucional @utpuebla.edu.mx.');
  }

  if (!validatePassword(password)) {
    throw new Error('La contrasena debe tener al menos 6 caracteres.');
  }

  const credential = await signInWithEmailAndPassword(
    FirebaseSingleton.getAuth(),
    email.trim().toLowerCase(),
    password,
  );

  return credential.user;
}

export async function logout() {
  await signOut(FirebaseSingleton.getAuth());
}
