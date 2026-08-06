# Despliegue de Credencial UTP

## Arquitectura recomendada

- Frontend Expo Web: Vercel.
- Backend Express: Render con Docker.
- Base de datos, autenticacion y storage: Firebase.

## 1. Subir el repositorio a GitHub

Antes de desplegar, confirma que `.env` no se suba al repositorio.

```bash
git status
```

Si `.env` aparece como archivo nuevo, no lo agregues al commit.

## 2. Desplegar la API en Render

1. Entra a Render.
2. Crea un nuevo Web Service.
3. Conecta el repositorio `Credencial-utp`.
4. Selecciona Docker como entorno.
5. Agrega estas variables de entorno:

```env
PORT=3001
CORS_ALLOWED_ORIGINS=https://TU-FRONTEND.vercel.app
FIREBASE_STORAGE_BUCKET=credencialutp.firebasestorage.app
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
```

`FIREBASE_SERVICE_ACCOUNT_JSON` debe contener el JSON completo de Firebase Admin en una sola linea.

Cuando Render termine, la API quedara con una URL similar a:

```text
https://credencial-utp-api.onrender.com
```

## 3. Desplegar el frontend en Vercel

1. Entra a Vercel.
2. Importa el repositorio `Credencial-utp`.
3. Configura el directorio raiz como `credencial-utp` si Vercel detecta la carpeta superior.
4. Usa estos valores:

```text
Build Command: npm run build:web
Output Directory: dist
Install Command: npm ci
```

5. Agrega estas variables de entorno:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_API_URL=https://TU-API.onrender.com
EXPO_PUBLIC_VALIDATION_BASE_URL=https://TU-FRONTEND.vercel.app
```

## 4. Configurar CORS

Cuando tengas la URL final de Vercel, vuelve a Render y actualiza:

```env
CORS_ALLOWED_ORIGINS=https://TU-FRONTEND.vercel.app
```

Si tambien quieres probar local, puedes separar origenes con coma:

```env
CORS_ALLOWED_ORIGINS=https://TU-FRONTEND.vercel.app,http://localhost:8081
```

## 5. Probar QR

En la app desplegada, el QR debe abrir una URL como:

```text
https://TU-FRONTEND.vercel.app/validar/2311082480
```

Esa pagina consulta Firestore por matricula y muestra los datos publicos de la credencial.
