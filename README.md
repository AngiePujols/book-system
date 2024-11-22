# Book System

## Descripción

**Book System** es una aplicación web desarrollada con **Next.js** que permite gestionar libros, ofrecer funcionalidades de paginación y brindar una interfaz interactiva con la ayuda de la biblioteca **NextUI**. El sistema está diseñado para ser rápido y optimizado, con soporte para **Turbopack** en desarrollo.

## Tecnologías utilizadas

- **Next.js**: Framework React para aplicaciones web del lado del servidor.
- **React**: Biblioteca de JavaScript para la construcción de interfaces de usuario.
- **NextUI**: Biblioteca de componentes React para una interfaz moderna.
- **Framer Motion**: Biblioteca para animaciones fluidas en la UI.
- **Tailwind CSS**: Framework de CSS para un diseño responsivo y personalizado.
- **TypeScript**: Lenguaje de programación basado en JavaScript que añade tipado estático.

## Instalación

1. Clona el repositorio:

    ```bash
    git clone <url-del-repositorio>
    cd book-system
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

## Scripts disponibles

- `dev`: Inicia el servidor en modo de desarrollo y abre automáticamente el navegador.

    ```bash
    npm run dev
    ```

- `open-browser`: Abre automáticamente el navegador en `http://localhost:3000`.

    ```bash
    npm run open-browser
    ```

- `build`: Compila el proyecto para producción.

    ```bash
    npm run build
    ```

- `start`: Inicia el servidor en producción.

    ```bash
    npm run start
    ```

- `lint`: Ejecuta el análisis de linting en el código.

    ```bash
    npm run lint
    ```

## Estructura del proyecto

- **`pages/`**: Contiene las rutas de la aplicación.
- **`components/`**: Componentes reutilizables de la interfaz.
- **`styles/`**: Archivos CSS y configuraciones de Tailwind CSS.
- **`public/`**: Archivos públicos como imágenes y fuentes.
- **`types/`**: Definiciones de tipos para TypeScript.

## Dependencias

### Dependencias de producción:

- **@nextui-org/pagination**: Componente de paginación para mejorar la navegación.
- **@nextui-org/react**: Biblioteca de componentes UI.
- **framer-motion**: Animaciones para mejorar la experiencia de usuario.
- **next**: Framework React para el desarrollo de aplicaciones web con renderizado del lado del servidor.
- **react**, **react-dom**: Librerías base de React.

### Dependencias de desarrollo:

- **eslint**: Herramienta para análisis estático de código.
- **tailwindcss**: Framework de CSS para diseño rápido y responsivo.
- **typescript**: Añade tipado estático a JavaScript.
