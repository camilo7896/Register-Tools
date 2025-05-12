# Sistema de Registro de Herramientas

Este proyecto es un sistema de registro y control de herramientas desarrollado con **React**, **TypeScript**, y **Firebase**. Permite gestionar la salida, devolución y autorización de herramientas, asegurando un seguimiento eficiente y seguro de los recursos.

## Características

- **Autenticación**: Los usuarios pueden iniciar sesión con Google, Microsoft o credenciales propias.
- **Roles de usuario**: Gestión de roles como `admin`, `superadmin`, `porteria`, etc., para controlar el acceso a diferentes funcionalidades.
- **Registro de herramientas**: Permite registrar herramientas con detalles como fecha, responsable, motivo, destino, y fotos.
- **Historial de registros**: Visualización de herramientas registradas, con opciones para filtrar y buscar.
- **Autorización y recepción**: Los administradores pueden autorizar solicitudes, y los usuarios pueden marcar herramientas como recibidas.
- **Exportación de datos**: Descarga de registros en formato CSV filtrados por fechas.
- **Interfaz responsiva**: Diseñada para adaptarse a diferentes dispositivos.

## Tecnologías utilizadas

- **React**: Para la creación de la interfaz de usuario.
- **TypeScript**: Para un desarrollo tipado y más seguro.
- **Firebase**:
  - **Firestore**: Base de datos en tiempo real para almacenar los registros.
  - **Authentication**: Para la autenticación de usuarios.
  - **Storage**: Para almacenar fotos de herramientas.
- **Vite**: Herramienta de construcción rápida para proyectos de React.
- **TailwindCSS**: Para estilos rápidos y personalizables.
- **Sass**: Para estilos adicionales.

## Estructura del proyecto
src/ ├── components/ # Componentes reutilizables │ ├── auth/ # Componentes de autenticación │ ├── dashboard/ # Panel de control │ ├── forms/ # Formularios │ ├── modals/ # Modales │ ├── navbar/ # Barra de navegación │ ├── register/ # Registro de herramientas │ └── ui/ # Elementos de interfaz de usuario ├── hooks/ # Hooks personalizados ├── lib/ # Configuración de Firebase ├── pages/ # Páginas principales ├── routes/ # Configuración de rutas ├── styles/ # Estilos globales y específicos └── main.tsx # Punto de entrada principal


## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/registro-herramientas.git
   cd registro-herramientas

Configura las variables de entorno en un archivo .env:
VITE_API_KEY=tu_api_key
VITE_AUTH_DOMAIN=tu_auth_domain
VITE_PROJECT_ID=tu_project_id
VITE_STORAGE_BUCKET=tu_storage_bucket
VITE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_APP_ID=tu_app_id

Inicia el servidor de desarrollo:
npm run dev

Abre http://localhost:5173 en tu navegador.

##Modo de uso
Inicio de sesión: Los usuarios deben iniciar sesión para acceder al sistema.
Registro de herramientas: Completa el formulario para registrar una herramienta, incluyendo fotos opcionales.
Historial: Consulta el historial de herramientas registradas, con opciones para buscar y filtrar.
Autorización y recepción: Los administradores pueden autorizar solicitudes, y los usuarios pueden marcar herramientas como recibidas.
Exportación: Descarga registros en formato CSV para análisis o reportes.

##Scripts disponibles
npm run dev: Inicia el servidor de desarrollo.
npm run build: Construye la aplicación para producción.
npm run preview: Previsualiza la aplicación construida.
npm run lint: Ejecuta ESLint para verificar errores de código.

##Despliegue
El proyecto está configurado para ser desplegado en Firebase Hosting. Para desplegar:
1. Construye el proyecto: npm run build
2. Inicia sesion en firebase: firebase login
3. Despliega la aplicación: firebase deploy

