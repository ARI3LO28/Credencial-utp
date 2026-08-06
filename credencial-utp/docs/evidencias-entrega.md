# Evidencias Para La Entrega

## Seguridad

- Captura del codigo de `src/services/AuthService.ts` mostrando Firebase Authentication.
- Captura del codigo de validacion del correo institucional.
- Captura de `src/controllers/CredentialController.ts` mostrando proteccion de pantalla privada.
- Captura de `server/authMiddleware.js` mostrando `verifyIdToken`.
- Captura de la pantalla de login.
- Captura de error al usar un correo no institucional.
- Captura de la credencial despues de iniciar sesion.
- Captura del boton de cierre de sesion.
- Captura de una peticion a `/api/alumno/:matricula` sin token respondiendo 401.
- Captura de una peticion a otra matricula respondiendo 403, si se prepara el caso.

## Web Services De Terceros

- Captura de `src/services/QRCodeStrategy.ts` mostrando la API externa de QR.
- Captura del QR visible dentro de la credencial.
- Captura de la pagina `/validar/[matricula]` al escanear el QR.
- Captura de Firebase Console en Authentication con usuarios creados.
- Captura de Firestore con la coleccion `alumnos`.
- Captura de `src/services/CampusApiService.ts` mostrando clima, festivos o noticias.
- Captura del dashboard de campus en la app.

## Web Service Propio

- Captura de `server/index.js` con los endpoints Express.
- Captura de `server/firebaseAdmin.js` mostrando Firebase Admin.
- Captura de `server/studentRepository.js` consultando Firestore.
- Captura de `GET /health` funcionando.
- Captura de una peticion autenticada a `/api/alumno/:matricula`.
- Captura del frontend mostrando datos reales del alumno.

## Repositorio

- Captura del repositorio en GitHub.
- Captura de commits.
- Captura de ramas.
- Captura de colaboradores o contributors.
- Captura de Pull Requests o merges, si existen.

## Despliegue

- Captura del proyecto en Vercel.
- Captura de la URL publica del frontend.
- Captura del servicio en Render.
- Captura de `/health` en la URL publica del backend.
- Captura del login funcionando en produccion.
- Captura del QR abriendo desde celular.

## Pruebas

- Probar cuenta 1 con documento en `alumnos/{matricula}`.
- Probar cuenta 2 con otro documento en `alumnos/{matricula}`.
- Confirmar que cada cuenta muestra nombre, carrera, matricula, notas, biblioteca y beneficios correctos.
- Confirmar que no aparecen datos demo cuando el alumno existe.
