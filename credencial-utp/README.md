# Credencial Digital UTP

Sistema web universitario para consultar una credencial digital estudiantil de la Universidad Tecnologica de Puebla. El proyecto usa Expo React Native Web, Firebase y una API propia en Express.

## Caso De Estudio

La Universidad Tecnologica de Puebla requiere una solucion digital para que los alumnos puedan identificarse, consultar informacion academica y acceder a servicios estudiantiles desde una aplicacion web.

## Problema Que Resuelve

Reduce la dependencia de credenciales fisicas y centraliza informacion como datos del alumno, notas, prestamos de biblioteca, beneficios y validacion por codigo QR.

## Alcance

Incluye inicio de sesion institucional, consulta de credencial, validacion por QR, informacion academica, biblioteca, beneficios, actualizacion de foto y servicios informativos del campus. No contempla pagos, reinscripciones reales ni administracion escolar completa.

## Usuarios

- Alumno: consulta su credencial y servicios.
- Administrador tecnico: configura Firebase, API y despliegue.
- Validador externo: escanea el QR y revisa datos publicos de la credencial.

## Funcionalidades

- Login con Firebase Authentication.
- Busqueda del alumno en Firestore por matricula o correo.
- Credencial digital con foto, matricula, carrera y estado academico.
- QR externo con enlace a `/validar/[matricula]`.
- Consulta de notas, biblioteca y beneficios.
- Actualizacion de fotografia con Firebase Storage.
- API Express protegida con Firebase ID Token.
- Dashboard de campus con clima, noticias y calendario.

## Metodologia Agil

Se utiliza Scrum como metodologia base: backlog de funcionalidades, desarrollo por incrementos, ramas feature y entregables por producto academico.

## Arquitectura

El proyecto conserva una organizacion tipo MVC:

- `src/models`: tipos, modelos y Factory.
- `src/views`: pantallas.
- `src/controllers`: controladores y estado de autenticacion.
- `src/services`: Firebase, API propia y APIs externas.
- `src/components`: componentes reutilizables.
- `src/navigation`: rutas privadas.
- `server`: API REST con Express.

## Patrones De Diseno

- MVC: separa modelos, vistas y controladores.
- Singleton: `FirebaseSingleton` centraliza Auth, Firestore y Storage.
- Observer: `AuthObserver` escucha cambios de sesion.
- Strategy: `QRCodeStrategy` permite cambiar la estrategia de QR.
- Factory Method: `StudentFactory` normaliza documentos de Firestore.

## Tecnologias

- React Native Expo.
- Expo Router.
- Firebase Authentication.
- Cloud Firestore.
- Firebase Storage.
- Express.js.
- Firebase Admin.
- Git y GitHub.
- Vercel para frontend.
- Render para backend.

## Seguridad

- Autenticacion con correo institucional.
- Dominios permitidos: `@alumno.utpuebla.edu.mx` y `@utpuebla.edu.mx`.
- Proteccion de pantallas privadas.
- Persistencia de sesion mediante Firebase.
- Token ID de Firebase enviado a la API propia.
- Middleware `requireFirebaseAuth` en Express.
- Respuestas 401 para token faltante o invalido.
- Respuestas 403 si un alumno intenta consultar otra matricula.
- CORS restringido por variables de entorno.
- `.env` y llaves privadas ignoradas por Git.

## Web Services De Terceros

| Servicio | Funcionalidad | Archivo donde se utiliza | Ejemplo dentro del proyecto |
|---|---|---|---|
| Firebase Authentication | Inicio y cierre de sesion | `src/services/AuthService.ts` | Login con correo institucional |
| Cloud Firestore | Datos academicos | `src/services/StudentService.ts` | Consulta de `alumnos/{matricula}` |
| Firebase Storage | Foto de perfil | `src/services/StudentService.ts` | Carga de imagen institucional |
| QRServer API | Generacion de QR | `src/services/QRCodeStrategy.ts` | QR hacia `/validar/[matricula]` |
| Open-Meteo | Clima del campus | `src/services/CampusApiService.ts` | Temperatura y humedad |
| Nager.Date | Dias festivos | `src/services/CampusApiService.ts` | Calendario academico |
| GDELT | Noticias | `src/services/CampusApiService.ts` | Avisos y noticias universitarias |

## Web Services Propios

| Mecanismo | Proposito | Archivo | Ejemplo dentro del proyecto |
|---|---|---|---|
| Express Router | Exponer endpoints REST | `server/index.js` | `/api/alumno/:matricula` |
| Firebase Admin | Consultar Firestore desde backend | `server/firebaseAdmin.js` | Credenciales por variables de entorno |
| Repository | Aislar consultas a Firestore | `server/studentRepository.js` | `getAlumno`, `getNotas` |
| Middleware | Validar token Firebase | `server/authMiddleware.js` | `requireFirebaseAuth` |
| CORS | Restringir origenes | `server/index.js` | `FRONTEND_URL` o `CORS_ALLOWED_ORIGINS` |
| Health Check | Verificar API desplegada | `server/index.js` | `GET /health` |

## Autenticacion Remota

| Mecanismo | Proposito | Implementacion | Ejemplo |
|---|---|---|---|
| Firebase ID Token | Probar identidad del usuario | `user.getIdToken()` en frontend | Header `Authorization: Bearer token` |
| Firebase Admin | Validar token en servidor | `verifyIdToken` | Respuesta 401 si es invalido |
| Control por matricula | Evitar acceso a datos ajenos | `canAccessAlumno` | Respuesta 403 para otra matricula |
| Rol administrador | Permitir acceso extendido | Custom claims `admin` o `role` | Admin puede consultar varias matriculas |

## Endpoints Propios

| Metodo | Endpoint | Proteccion | Proposito |
|---|---|---|---|
| GET | `/health` | Publico | Verificar que la API este activa |
| GET | `/api/alumno/:matricula` | Firebase ID Token | Consultar datos del alumno |
| GET | `/api/notas/:matricula` | Firebase ID Token | Consultar notas |
| GET | `/api/biblioteca/:matricula` | Firebase ID Token | Consultar prestamos |
| GET | `/api/beneficios/:matricula` | Firebase ID Token | Consultar beneficios |
| PUT | `/api/foto/:matricula` | Firebase ID Token | Actualizar foto |

## Instalacion Local

```powershell
npm install
```

## Variables De Entorno

Copia `.env.example` a `.env` y completa valores reales solo en tu computadora o en Render/Vercel.

Frontend:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_API_URL=http://localhost:3001
EXPO_PUBLIC_VALIDATION_BASE_URL=http://localhost:8081
```

Backend:

```env
PORT=3001
FRONTEND_URL=http://localhost:8081
CORS_ALLOWED_ORIGINS=http://localhost:8081,http://localhost:8082
FIREBASE_STORAGE_BUCKET=
FIREBASE_SERVICE_ACCOUNT_JSON=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

## Ejecucion

Frontend:

```powershell
npm run web
```

Backend:

```powershell
npm run api
```

Validaciones:

```powershell
npm run lint
npx tsc --noEmit
npm run build:web
```

## Despliegue

Frontend en Vercel:

- Root Directory: `credencial-utp`
- Build Command: `npm run build:web`
- Output Directory: `dist`
- Install Command: `npm ci`

Backend en Render:

- Root Directory: `credencial-utp`
- Build Command: `npm install`
- Start Command: `npm run api`
- Health Check Path: `/health`

Tambien se incluye `Dockerfile` y `render.yaml` por si se decide usar Render con Docker.

## Enlaces

- Frontend: pendiente de URL de Vercel.
- Backend: pendiente de URL de Render.
- Repositorio: `https://github.com/ARI3LO28/Credencial-utp`

## Integrantes Y Contribuciones

Agregar nombres de integrantes y describir aportaciones: frontend, backend, Firebase, documentacion, pruebas y despliegue.

## Evidencias Sugeridas

Consultar `docs/evidencias-entrega.md` y `docs/guion-video.md`.

## Conclusion

El sistema integra autenticacion, base de datos, almacenamiento, servicios externos y API propia en una aplicacion web universitaria funcional. La solucion queda preparada para despliegue, validacion por QR y evidencia academica del Producto 2 y Producto 3.
