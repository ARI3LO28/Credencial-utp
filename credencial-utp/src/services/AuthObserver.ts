import { User, onAuthStateChanged } from 'firebase/auth';

import { FirebaseSingleton } from '@/src/firebase/FirebaseSingleton';

type AuthListener = (user: User | null) => void;

export class AuthObserver {
  private listeners = new Set<AuthListener>();
  private unsubscribe?: () => void;

  subscribe(listener: AuthListener) {
    this.listeners.add(listener);
    this.ensureListening();

    return () => {
      this.listeners.delete(listener);
      if (!this.listeners.size && this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = undefined;
      }
    };
  }

  private ensureListening() {
    if (this.unsubscribe) {
      return;
    }

    this.unsubscribe = onAuthStateChanged(FirebaseSingleton.getAuth(), (user) => {
      this.listeners.forEach((listener) => listener(user));
    });
  }
}

export const authObserver = new AuthObserver();
