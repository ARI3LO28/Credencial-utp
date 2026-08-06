# Guion Para Video De Evidencia

Duracion sugerida: 3 a 5 minutos.

## 0:00-0:25 Introduccion

Mostrar el nombre del proyecto y explicar que es una Credencial Digital UTP para alumnos.

Mencionar el alcance: login institucional, credencial, QR, notas, biblioteca, beneficios, Firebase y API propia.

## 0:25-1:15 Login Y Seguridad

Mostrar la pantalla de login.

Mostrar brevemente `src/services/AuthService.ts` para evidenciar Firebase Authentication y validacion del correo institucional.

Iniciar sesion con una cuenta real.

Mostrar que las pantallas privadas solo aparecen despues de autenticarse.

## 1:15-2:00 Datos Reales Desde Firebase

Mostrar Firestore con la coleccion `alumnos`.

Mostrar la credencial cargando nombre, matricula, carrera, foto y estado academico.

Abrir notas, biblioteca y beneficios.

## 2:00-2:40 Web Services De Terceros

Mostrar el QR en la credencial.

Mostrar `src/services/QRCodeStrategy.ts`.

Escanear o abrir la URL `/validar/[matricula]`.

Mostrar tambien la seccion de campus si se usan clima, noticias o calendario.

## 2:40-3:30 Web Service Propio

Mostrar `server/index.js` con endpoints REST.

Mostrar `server/authMiddleware.js` validando Firebase ID Token.

Abrir `/health` del backend.

Mostrar una peticion o pantalla que use datos reales.

## 3:30-4:10 GitHub Y Colaboracion

Mostrar el repositorio en GitHub.

Mostrar commits, ramas y colaboradores.

Mencionar que se trabajo con GitHub Flow.

## 4:10-4:40 Aplicacion Desplegada

Mostrar la URL de Vercel.

Mostrar la URL de Render en `/health`.

Probar login y QR desde la version publicada.

## 4:40-5:00 Conclusion

Concluir que el proyecto integra seguridad, servicios externos, API propia, Firebase y despliegue web.
