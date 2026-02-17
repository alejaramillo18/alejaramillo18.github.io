# ✨ Aleja Jaramillo — Portfolio

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222?style=flat-square&logo=github&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**Portafolio personal de diseño multimedia, motion graphics y desarrollo creativo.**

[🔗 Ver sitio en vivo](https://tu-usuario.github.io/portfolio/) · [📬 Contacto](#-contacto)

</div>

---

## 📋 Sobre el Proyecto

Portafolio web de **Maria Alejandra Jaramillo Hernández**, estudiante de Ingeniería Multimedia. El sitio funciona como una vitrina interactiva de trabajos en diseño, producción audiovisual y desarrollo, construido como una Single Page Application con navegación fluida y animaciones scroll-driven.

El proyecto nació como una migración y mejora de un portafolio anterior hecho en HTML/CSS puro con posicionamiento absoluto, evolucionándolo a una arquitectura moderna en React con diseño responsive, sistema de componentes reutilizables y deploy automatizado.

### ¿Por qué este stack?

- **React** — Componentización y estado reactivo para filtros, navegación y animaciones.
- **Vite** — Build ultrarrápido en desarrollo y bundles optimizados para producción.
- **CSS Variables** — Sistema de diseño centralizado y consistente en toda la app.
- **Vanilla JS (Intersection Observer)** — Animaciones de scroll performantes sin dependencias pesadas.
- **GitHub Pages** — Hosting gratuito integrado al flujo de Git.

---

## 🎨 Características

- **Dark mode creativo** con paleta púrpura, acentos cyan y rosa, textura grain sutil
- **6 secciones**: Hero, Sobre Mí, Skills, Portafolio de Trabajo, Proceso Creativo y Contacto
- **Filtros interactivos** en Skills (por categoría) y Proyectos (por tipo de trabajo)
- **Scroll reveal animations** con Intersection Observer API — sin librerías externas
- **Parallax suave** en elementos decorativos del hero
- **Cursor glow** que sigue el mouse en desktop
- **Navegación fija** con backdrop blur que aparece al hacer scroll + menú móvil animado
- **Diseño 100% responsive** (desktop, tablet, móvil)
- **Barras de progreso animadas** en skills que se activan al entrar en viewport
- **Configuración centralizada** — todos los datos editables desde un solo objeto JS

---

## 🛠️ Tech Stack

| Categoría | Tecnología |
|-----------|-----------|
| Framework | React 18 |
| Build Tool | Vite 6 |
| Lenguaje | JavaScript (ES6+) |
| Estilos | CSS3 (Variables, Clamp, Grid, Flexbox) |
| Fuentes | Google Fonts (Syne + DM Sans) |
| Animaciones | CSS Keyframes + Intersection Observer |
| Deploy | GitHub Pages via gh-pages |

---

## 📁 Estructura del Proyecto

```
portfolio/
├── public/
│   ├── icon.png                        # Favicon
│   ├── img/
│   │   ├── profile.png                 # Foto de perfil
│   │   └── projects/                   # Imágenes de proyectos
│   │       ├── project1.jpg
│   │       └── ...
│   └── anim/                           # Animaciones Lottie (.json)
│       ├── munecaMenu.json
│       └── ...
│
├── src/
│   ├── components/
│   │   └── Portfolio.jsx               # Componente principal (todo el sitio)
│   ├── styles/
│   │   └── global.css                  # Variables, animaciones, responsive
│   ├── App.jsx                         # Componente raíz
│   └── main.jsx                        # Entry point + import de CSS
│
├── index.html                          # HTML base de Vite
├── vite.config.js                      # Configuración de Vite + base path
├── package.json                        # Scripts y dependencias
└── README.md                           # Este archivo
```

### Arquitectura de componentes

```
Portfolio (main)
├── CursorGlow            → Efecto de luz que sigue el cursor
├── Navigation            → Navbar fija + menú móvil
├── HeroSection           → Presentación + CTAs + parallax
├── AboutSection          → Bio + foto + datos + sección mascota
├── SkillsSection         → Grid filtrable con barras de progreso
├── WorkSection           → Galería de proyectos filtrable por categoría
├── ProcessSection        → Timeline del proceso creativo (4 pasos)
└── ContactSection        → Redes sociales + email + footer
```

### Hooks personalizados

| Hook | Función |
|------|---------|
| `useScrollReveal()` | Detecta cuándo un elemento entra al viewport usando Intersection Observer y devuelve un ref + booleano de visibilidad para disparar animaciones. |
| `useParallax()` | Retorna la posición Y del scroll con `requestAnimationFrame` para efectos de parallax performantes. |

---

## 🚀 Instalación y Uso

### Prerrequisitos

- [Node.js](https://nodejs.org/) v18 o superior
- npm o yarn

### Clonar e instalar

```bash
git clone https://github.com/tu-usuario/portfolio.git
cd portfolio
npm install
```

### Desarrollo local

```bash
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

### Build de producción

```bash
npm run build
```

Los archivos optimizados se generan en la carpeta `dist/`.

### Preview del build

```bash
npm run preview
```

---

## 🌐 Deploy en GitHub Pages

### Configurar

En `vite.config.js`, ajusta el campo `base` al nombre de tu repositorio:

```js
base: '/nombre-de-tu-repo/'
```

> Si usas `tu-usuario.github.io` como repositorio, usa `base: '/'`

### Desplegar

```bash
npm run deploy
```

Esto ejecuta `vite build` y publica la carpeta `dist/` en la rama `gh-pages` automáticamente.

---

## ✏️ Personalización

Toda la información del portafolio se edita desde un único lugar: el objeto `PORTFOLIO_DATA` al inicio de `src/components/Portfolio.jsx`.

```js
const PORTFOLIO_DATA = {
  name: "Tu Nombre",
  tagline: "Tu descripción corta",
  bio: "Tu biografía...",
  email: "tu@email.com",
  social: {
    instagram: "https://...",
    tiktok: "https://...",
    linkedin: "https://...",
  },
  skills: [
    { name: "Herramienta", level: 85, category: "design" },
    // categorías: "design" | "motion" | "3d" | "dev"
  ],
  projects: [
    {
      id: 1,
      title: "Nombre del proyecto",
      category: "DISEÑO",              // "AUDIOVISUAL" | "DISEÑO" | "PROGRAMACIÓN"
      description: "Descripción corta",
      image: "/img/projects/foto.jpg",  // o null para mostrar placeholder
      tags: ["Tag1", "Tag2"],
    },
  ],
  process: [
    { step: "01", title: "Paso", description: "...", icon: "🔍" },
  ],
};
```

### Agregar imágenes

Coloca tus archivos en `public/img/` y referéncialos con ruta absoluta:

```js
image: "/img/projects/mi-proyecto.jpg"
```

### Integrar animaciones Lottie

Para usar archivos `.json` exportados desde After Effects con Bodymovin:

```bash
npm install lottie-react
```

```jsx
import Lottie from 'lottie-react';
import miAnimacion from '/anim/miAnimacion.json';

<Lottie animationData={miAnimacion} loop={true} style={{ width: 200 }} />
```

---

## 📸 Preview

> *Agrega aquí capturas de pantalla de tu sitio una vez esté listo.*
>
> Puedes usar la siguiente estructura:
>
> ```md
> ![Hero](./screenshots/hero.png)
> ![Proyectos](./screenshots/projects.png)
> ![Mobile](./screenshots/mobile.png)
> ```

---

## 📄 Licencia

Este proyecto es de uso personal. Si deseas usarlo como base para tu propio portafolio, eres libre de hacerlo dando el crédito correspondiente.

---

## 📬 Contacto

**Maria Alejandra Jaramillo Hernández**

- 📸 Instagram — [@hanamanzana](https://www.instagram.com/hanamanzana)
- 🎵 TikTok — [@hanamanzana](https://www.tiktok.com/@hanamanzana)
- 💼 LinkedIn — [Maria Alejandra Jaramillo](https://www.linkedin.com/in/maria-alejandra-jaramillo-hern%C3%A1ndez-998b84338/)

---

<div align="center">
  <sub>Hecho con 💜 por Aleja Jaramillo — 2025</sub>
</div>