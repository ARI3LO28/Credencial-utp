# GitHub Flow academico

## Ramas requeridas
- `main`: version estable.
- `develop`: integracion del equipo.
- `feature-login`: login, validaciones y proteccion de rutas.
- `feature-credencial`: vista de credencial y datos del alumno.
- `feature-qr`: estrategia de QR externo.
- `feature-api`: API REST con Express.
- `feature-firebase`: configuracion Firebase, Firestore y Storage.

## Ejemplos de Pull Requests

### PR 1: feature-login -> develop
Titulo: `Implementa autenticacion Firebase y rutas privadas`

Resumen:
- Agrega login con correo institucional.
- Valida formularios y contrasena.
- Protege pantallas privadas cuando no existe sesion.

### PR 2: feature-credencial -> develop
Titulo: `Agrega credencial digital del alumno`

Resumen:
- Muestra matricula, nombre, carrera y estado academico.
- Integra fotografia de perfil.
- Agrega cierre de sesion.

### PR 3: feature-api -> develop
Titulo: `Agrega API REST Express para datos academicos`

Resumen:
- Expone `/api/alumno/:matricula`.
- Expone `/api/notas/:matricula`.
- Expone `/api/biblioteca/:matricula`.
- Expone `/api/foto/:matricula`.
- Expone `/api/beneficios/:matricula`.

## Flujo de merge recomendado
```bash
git checkout develop
git merge --no-ff feature-login
git merge --no-ff feature-credencial
git merge --no-ff feature-qr
git merge --no-ff feature-api
git merge --no-ff feature-firebase
git checkout main
git merge --no-ff develop
```
