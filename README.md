# Credencial Digital UTP

Sistema de credenciales digitales universitarias para estudiantes de la Universidad Tecnologica de Puebla, desarrollado para la materia Desarrollo Web Integral.

## Objetivo
Permitir que un alumno inicie sesion con Firebase Authentication, consultar sus datos reales desde Cloud Firestore y mostrar una credencial digital con fotografia, matricula, carrera, estado academico y codigo QR de validacion.

## Tecnologias
- React Native Expo
- Expo Router
- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- Express.js
- Firebase Admin SDK
- Git y GitHub Flow

## Instalacion
```powershell
cd C:\Users\Molyt\credencialutp\credencial-utp
npm install
```

## Variables De Entorno
Copia `credencial-utp/.env.example` a `credencial-utp/.env` y completa los valores.

Frontend Expo:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_API_URL=http://localhost:3001
```

Backend Express:
```env
PORT=3001
CORS_ALLOWED_ORIGINS=http://localhost:8081,http://localhost:8082
FIREBASE_STORAGE_BUCKET=
FIREBASE_SERVICE_ACCOUNT_PATH=
FIREBASE_SERVICE_ACCOUNT_JSON=
```

No subas `.env` ni llaves privadas al repositorio.

## Ejecucion
Frontend:
```powershell
cd C:\Users\Molyt\credencialutp\credencial-utp
npm run web
```

Backend:
```powershell
cd C:\Users\Molyt\credencialutp\credencial-utp
npm run api
```

## Estructura
```text
credencial-utp/
  app/
  server/
  src/
    components/
    constants/
    controllers/
    firebase/
    models/
    navigation/
    services/
    views/
```

## Firestore
Coleccion principal:
```text
alumnos
  {matricula}
    correo
    nombre
    matricula
    carrera
    cuatrimestre
    grupo
    foto
    fotoUrl
    EstadoAcademico
    estadoAcademico
```

Subcolecciones por alumno:
```text
alumnos/{matricula}/notas
alumnos/{matricula}/biblioteca
alumnos/{matricula}/beneficios
```

El correo se normaliza con `trim()` y `lowercase`. El sistema acepta `EstadoAcademico` y `estadoAcademico`, tambien `foto` y `fotoUrl`.

## Endpoints Propios
Todos requieren token de Firebase en:
```text
Authorization: Bearer <idToken>
```

```text
GET /api/alumno/:matricula
GET /api/notas/:matricula
GET /api/biblioteca/:matricula
PUT /api/foto/:matricula
GET /api/beneficios/:matricula
```

## Web Services De Terceros
- Firebase Authentication para inicio de sesion.
- Cloud Firestore para datos academicos.
- Firebase Storage para fotografia.
- api.qrserver.com para generar QR.
- Open-Meteo para clima.
- Nager.Date para dias inhabiles.
- GDELT para noticias y avisos.

## Seguridad
- Rutas privadas protegidas por `useProtectedStudent`.
- Firebase Authentication mantiene la sesion.
- El frontend envia el ID token al backend Express.
- Express valida el token con Firebase Admin.
- CORS se limita con `CORS_ALLOWED_ORIGINS`.
- Un alumno solo puede consultar o modificar su propia matricula.
- Usuarios administradores pueden habilitarse con custom claims: `admin: true`, `role: "admin"` o `roles: ["admin"]`.

## Flujo De Autenticacion
1. El alumno inicia sesion con un correo como `2311082480@alumno.utpuebla.edu.mx`.
2. Firebase Authentication devuelve el usuario autenticado.
3. La app normaliza el correo con `trim().toLowerCase()`.
4. Si el correo empieza con matricula, intenta consultar `GET /api/alumno/:matricula`.
5. Si no se resuelve por matricula, busca en Firestore `alumnos` donde `correo` coincida exactamente.
6. Con la matricula encontrada, la app vuelve a consultar `GET /api/alumno/:matricula`.
7. La interfaz muestra los datos reales o un mensaje claro si no existe el alumno.

## Prueba Con Dos Cuentas
1. En Firebase Authentication crea dos usuarios:
```text
2311082480@alumno.utpuebla.edu.mx
2311082481@alumno.utpuebla.edu.mx
```

2. En Firestore crea:
```text
alumnos/2311082480
  correo: "2311082480@alumno.utpuebla.edu.mx"
  nombre: "Ana Lopez Martinez"
  matricula: "2311082480"
  carrera: "Desarrollo Web Integral"
  cuatrimestre: "7"
  grupo: "A"
  EstadoAcademico: "Activo"
```

```text
alumnos/2311082481
  correo: "2311082481@alumno.utpuebla.edu.mx"
  nombre: "Luis Perez Garcia"
  matricula: "2311082481"
  carrera: "Desarrollo Web Integral"
  cuatrimestre: "7"
  grupo: "B"
  EstadoAcademico: "Activo"
```

3. Inicia backend y frontend:
```powershell
npm run api
npm run web
```

4. Entra con cada cuenta y confirma que cambia el saludo, nombre, matricula, carrera, grupo, cuatrimestre, foto y estado academico.

## Despliegue
- Frontend: Expo Web, Firebase Hosting, Vercel o Netlify.
- Backend: Render, Railway, Cloud Run o servidor Node.js.
- Configura `EXPO_PUBLIC_API_URL` con la URL publica del backend.
- Configura `CORS_ALLOWED_ORIGINS` con los dominios permitidos del frontend.
