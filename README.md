# Credencial Digital UTP

Sistema universitario de credenciales digitales desarrollado con React Native Expo, Firebase y Express.js para la materia Desarrollo Web Integral.

## Funcionalidades
- Inicio de sesion con Firebase Authentication y correo institucional.
- Proteccion de rutas privadas y persistencia de sesion.
- Credencial digital con matricula, nombre, carrera, estado academico, fotografia y QR.
- Consulta de notas academicas, prestamos de biblioteca y beneficios estudiantiles.
- Actualizacion de fotografia de perfil con Firebase Storage.
- API REST propia con Express consumiendo Cloud Firestore.

## Proyecto principal
La aplicacion Expo vive en `credencial-utp/`.

```bash
cd credencial-utp
npm install
npm run web
```

API Express:

```bash
cd credencial-utp
npm run api
```

## Arquitectura
```text
credencial-utp/src/
  models/
  views/
  controllers/
  services/
  components/
  navigation/
  firebase/
  assets/
```

## Patrones implementados
- MVC: `models`, `views` y `controllers`.
- Singleton: `FirebaseSingleton`.
- Observer: `AuthObserver`.
- Strategy: `QRCodeStrategy`.
- Factory Method: `StudentFactory`.

## Documentacion academica
- Scrum: `credencial-utp/docs/scrum.md`.
- GitHub Flow y ejemplos de Pull Requests: `credencial-utp/docs/github-flow.md`.
