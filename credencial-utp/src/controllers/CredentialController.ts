import { useEffect } from 'react';
import { router } from 'expo-router';

import { useAuth } from './AuthController';

export function useProtectedStudent() {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.loading && !auth.user) {
      router.replace('/');
    }
  }, [auth.loading, auth.user]);

  return auth;
}
