import { User } from 'firebase/auth';

const DEFAULT_API_URL = 'http://localhost:3001';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
  }
}

export function getApiBaseUrl() {
  return (process.env.EXPO_PUBLIC_API_URL ?? DEFAULT_API_URL).replace(/\/$/, '');
}

export async function apiRequest<T>(path: string, user: User): Promise<T> {
  const token = await user.getIdToken();
  let response: Response;

  try {
    response = await fetch(`${getApiBaseUrl()}${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
  } catch {
    throw new ApiError('No se pudo conectar con la API Express. Inicia el backend con npm run api.');
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(payload?.message ?? 'No se pudo consultar el servicio propio.', response.status);
  }

  return payload as T;
}
