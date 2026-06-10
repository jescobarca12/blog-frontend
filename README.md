# 📝 Blog — Frontend

Cliente web de un blog construido con React. Permite registrarse, iniciar sesión
y gestionar posts. Consume la API
[blog-api](https://github.com/jescobarca12/blog-api).

## Sobre el proyecto

Este fue el primer proyecto que construí desde cero. Quería aprender a construir
una aplicación completa y entender todo lo posible, no solo seguir un tutorial.
Todo era nuevo para mí y al principio me costó mucho, pero terminé muy satisfecho
por lo demasiado que aprendí en el camino.

<!-- Sugerencia: añade una captura de la app en docs/captura.png y descomenta:
     ![Blog](docs/captura.png) -->

## Características

- Registro de cuenta con inicio de sesión automático.
- Inicio de sesión con JWT (el token se guarda en `localStorage`).
- Alternancia entre pantallas de login y registro.
- Listar, crear y eliminar posts (las acciones protegidas envían el token).
- Manejo de errores visible para el usuario.

## Stack

React 19, TypeScript y Vite.

## Estructura

```
src/
├── App.tsx          # estado de sesión (token) y enrutado entre login/registro/blog
├── LoginForm.tsx    # formulario de inicio de sesión
├── RegisterForm.tsx # formulario de registro
├── BlogPosts.tsx    # listado y creación de posts
├── config.ts        # lee la URL de la API desde VITE_API_URL
├── types.ts         # tipos compartidos
└── index.css        # estilos de la aplicación
```

## Instalación

Requisitos: Node.js 22.12+ y la [blog-api](https://github.com/jescobarca12/blog-api)
corriendo.

```bash
npm install
# crea un archivo .env (ver abajo)
npm run dev          # http://localhost:5173
```

Variable de entorno (`.env`):
```
VITE_API_URL=http://localhost:3000
```

## Decisiones técnicas

- **Sesión con JWT en `localStorage`** — el token persiste al recargar; al cerrar
  sesión se elimina.
- **Estado de sesión en el componente raíz** — `App` decide qué mostrar (login,
  registro o el blog) según haya token o no.
- **URL de la API por variable de entorno** (`VITE_API_URL`) — el mismo código
  apunta a localhost en desarrollo y a la API desplegada en producción.
- **Comunicación hijo → padre por props** — los formularios avisan a `App` del
  login mediante una función `onLogin` recibida por props.

## Autor

Jorge — Estudiante de Ingeniería de Sistemas.
