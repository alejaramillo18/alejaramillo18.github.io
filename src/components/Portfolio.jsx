import { useState, useEffect, useRef, useCallback } from "react";

// ==================== CONFIGURATION ====================
// Edita estos datos para personalizar tu portafolio
const PORTFOLIO_DATA = {
  name: "Aleja Jaramillo",
  tagline: "Ingeniera Multimedia y Creadora Audiovisual",
  bio: `Soy Maria Alejandra Jaramillo Hernández, Ingeniera Multimedia. 
  Desde pequeña, me han caracterizado la creatividad, la empatía, la versatilidad 
  y la autenticidad. Me apasiona crear y desarrollar productos que cautiven 
  y dejen huella en los demás. Disfruto aprender y explorar nuevas experiencias,
  siempre en sintonía con la evolución constante del mundo.`,
  email: "majh011803@gmail.com",
  social: {
    instagram: "https://www.instagram.com/hanamanzana",
    tiktok: "https://www.tiktok.com/@hanamanzana",
    linkedin: "https://www.linkedin.com/in/maria-alejandra-jaramillo-hern%C3%A1ndez-998b84338/",
  },
  skills: [
    { name: "JavaScript", level: 70, category: "desarrollo y programacion" },
    { name: "Python", level: 70, category: "desarrollo y programacion" },
    { name: "C#", level: 80, category: "desarrollo y programacion" },
    { name: "WordPress", level: 65, category: "desarrollo y programacion" },
    { name: "HTML", level: 90, category: "desarrollo y programacion" },
    { name: "CSS", level: 90, category: "desarrollo y programacion" },
    { name: "React", level: 70, category: "desarrollo y programacion" },
    { name: "Vite", level: 60, category: "desarrollo y programacion" },
    { name: "Unity", level: 100, category: "desarrollo y programacion" },
    { name: "Unreal Engine", level: 80, category: "desarrollo y programacion" },

    { name: "Figma", level: 100, category: "Diseño y produccion digital" },
    { name: "Genially", level: 100, category: "Diseño y produccion digital" },
    { name: "Adobe Illustrator", level: 100, category: "Diseño y produccion digital" },
    { name: "Adobe Photoshop", level: 100, category: "Diseño y produccion digital" },
    { name: "Adobe Premiere Pro", level: 100, category: "Diseño y produccion digital" },
    { name: "Adobe After Effects", level: 100, category: "Diseño y produccion digital" },
    { name: "Adobe Lightroom", level: 100, category: "Diseño y produccion digital" },
    { name: "Canva", level: 100, category: "Diseño y produccion digital" },
    { name: "Davinci Resolve", level: 100, category: "Diseño y produccion digital" },
    { name: "Pro Tools", level: 80, category: "Diseño y produccion digital" },
    { name: "Reaper", level: 80, category: "Diseño y produccion digital" },
    { name: "Autodesk Maya", level: 100, category: "Diseño y produccion digital" },
    { name: "Blender", level: 85, category: "Diseño y produccion digital" },

    { name: "SQL", level: 75, category: "Analitica e innovacion tecnologica" },
    { name: "Power BI", level: 70, category: "Analitica e innovacion tecnologica" },
    { name: "Machine Learning", level: 50, category: "Analitica e innovacion tecnologica" },
    { name: "Realidad Virtual", level: 75, category: "Analitica e innovacion tecnologica" },
    { name: "Realidad Aumentada", level: 85, category: "Analitica e innovacion tecnologica" },
  ],
  // MEDIA: Cada proyecto soporta múltiples medios en un carrusel.
  // Usa el campo "gallery" como array. Cada item puede ser:
  //
  //   { type: "image", src: "/img/projects/foto.jpg" }
  //   { type: "video", src: "/video/clip.mp4" }
  //   { type: "youtube", src: "https://www.youtube.com/embed/VIDEO_ID" }
  //   { type: "vimeo", src: "https://player.vimeo.com/video/VIDEO_ID" }
  //   { type: "drive", src: "https://drive.google.com/file/d/FILE_ID/preview" }
  //
  // Para videos pesados (+100MB), súbelos a YouTube/Vimeo/Drive y usa el tipo correspondiente.
  // Los campos "image" y "video" simples siguen funcionando para proyectos con un solo medio.
  //
  projects: [
    {
      id: 1,
      title: "Motion Graphics",
      category: "AUDIOVISUAL",
      description: "Animación realizada para clase de Taller de Animación. Ilustraciones propias. 2023.",
      gallery: [
        { type: "video", src: "/video/Audiovisual01.mp4" },
      ],
      tags: ["After Effects", "Illustrator", "Storytelling"],
    },
    {
      id: 2,
      title: "Identidad de Marca",
      category: "DISEÑO",
      description: "Diseño de identidad visual y creación de contenido para redes sociales. 2024.",
      gallery: [
        { type: "image", src: "/img/Diseno12.jpg" },
        { type: "image", src: "/img/Diseno13.jpg" },
        { type: "image", src: "/img/Diseno14.jpg" },
        { type: "image", src: "/img/Diseno15.jpg" },
      ],
      tags: ["Illustrator", "Branding", "Tipografía"],
    },
    {
      id: 3,
      title: "Videojuego Error 403",
      category: "PROGRAMACIÓN",
      description: "Desarrollo de videojuego, ganador del Primer Puesto en las Olimpiadas Tech de Ruta N. 2023.",
      gallery: [
        { type: "video", src: "/video/Programacion02.mp4" },
      ],
      tags: ["Unity", "C#", "Jugabilidad"],
    },
    {
      id: 4,
      title: "Simulación de Físicas",
      category: "AUDIOVISUAL",
      description: "Simulación de Pelaje y Tela realizada para clase de Modelamiento y Simulación. 2025.",
      gallery: [
        { type: "video", src: "/video/Audiovisual02.mp4" },
        // Si este es el video pesado (+100MB), cámbialo a:
        // { type: "youtube", src: "https://www.youtube.com/embed/TU_VIDEO_ID" },
        // o
        // { type: "drive", src: "https://drive.google.com/file/d/TU_FILE_ID/preview" },
      ],
      tags: ["Autodesk Maya", "Arnold Render", "Modelo 3D"],
    },
    {
      id: 5,
      title: "Diseño de Logotipo",
      category: "DISEÑO",
      description: "Creación de cuatro propuestas de logotipo para una firma jurídica. 2024.",
      gallery: [
        { type: "image", src: "/img/Diseno08.png" },
        { type: "image", src: "/img/Diseno09.png" },
        { type: "image", src: "/img/Diseno10.png" },
        { type: "image", src: "/img/Diseno11.png" },
      ],
      tags: ["Illustrator", "Identidad Visual", "Composición"],
    },
    {
      id: 6,
      title: "Web Interactiva",
      category: "PROGRAMACIÓN",
      description: "Sitio web con animaciones para clase de Taller de Interactividad. 2025.",
      gallery: [
        { type: "video", src: "/video/Programacion01.mp4" },
      ],
      tags: ["HTML", "CSS", "After Effects"],
    },
    {
      id: 7,
      title: "Video Lyrics",
      category: "AUDIOVISUAL",
      description: "Producción de dos Videos Lyrics Oficiales para la banda ANTIKA. 2024.",
      gallery: [
        { type: "youtube", src: "https://www.youtube.com/embed/x4GbrhQmjQs?si=v3ehdcPu8z_GeSz8" },
        { type: "youtube", src: "https://www.youtube.com/embed/P0f9Yg7ZByc?si=1ZGgDseEO5u82s9p" },
      ],
      tags: ["After Effects", "Premiere Pro", "Illustrator"],
    },
    {
      id: 8,
      title: "Diseño de Personaje e Historia Original",
      category: "DISEÑO",
      description: "Ilustraciones, Poster y Comic para el videojuego Error 403, ganador del Primer Puesto en las Olimpiadas Tech de Ruta N. 2023.",
      gallery: [
        { type: "image", src: "/img/Diseno01.jpg" },
        { type: "image", src: "/img/Diseno23.jpg" },
        { type: "image", src: "/img/Diseno03.jpg" },
        { type: "image", src: "/img/Diseno04.jpg" },
      ],
      tags: ["Illustrator", "IbisPaint X", "Storytelling"],
    },
    {
      id: 9,
      title: "Web Doodle",
      category: "PROGRAMACIÓN",
      description: "Doodle con animaciones para clase de Taller de Interactividad. 2025.",
      gallery: [
        { type: "video", src: "/video/Programacion04.mp4" },
      ],
      tags: ["HTML", "CSS", "JavaScript"],
    },
    {
      id: 10,
      title: "VFX Video Musical",
      category: "AUDIOVISUAL",
      description: "Producción de Efectos Especiales para Video Musical Oficial. 2024.",
      gallery: [
        { type: "youtube", src: "https://www.youtube.com/embed/Cx6DIJhQucc?si=6HklaAb-F0pD9xy0" },
      ],
      tags: ["After Effects", "Premiere Pro", "Plugins"],
    },
    {
      id: 11,
      title: "Modelado y Texturizado 3D",
      category: "DISEÑO",
      description: "Creación de modelos 3D con aplicación de texturas y materiales para lograr acabados realistas y coherentes con el concepto visual del proyecto. 2023.",
      gallery: [
        { type: "image", src: "/img/Diseno32.png" },
        { type: "image", src: "/img/Diseno22.jpg" },
        { type: "image", src: "/img/Diseno21.jpg" },
        { type: "image", src: "/img/Diseno18.jpg" },
        { type: "image", src: "/img/Diseno19.jpg" },
        { type: "image", src: "/img/Diseno20.jpg" },
      ],
      tags: ["Autodesk Maya", "Blender", "Textura UV"],
    },
    {
      id: 12,
      title: "Prototipo Web Interactivo",
      category: "PROGRAMACIÓN",
      description: "Diseño y desarrollo de prototipo web enfocado en la exploración informativa sobre una especie de ave, incorporando animaciones por scroll. 2025.",
      gallery: [
        { type: "video", src: "/video/Programacion03.mp4" },
      ],
      tags: ["HTML", "React", "JavaScript"],
    },
    {
      id: 13,
      title: "Cortometraje Animado",
      category: "AUDIOVISUAL",
      description: "Animación para Cortometraje Animado Amor en Z. Proyecto de Grado. 2024.",
      gallery: [
        { type: "youtube", src: "https://www.youtube.com/embed/KcvOl56ZsTQ?si=mhUnM1YK_6aAgZCe" },
      ],
      tags: ["After Effects", "Premiere Pro", "Illustrator"],
    },
    {
      id: 14,
      title: "Pixel Art Assets",
      category: "DISEÑO",
      description: "Diseño y desarrollo de assets visuales y funcionales para videojuego propio. Clase de Programación Avanzada. 2023.",
      gallery: [
        { type: "image", src: "/img/Diseno02.jpg" },
      ],
      tags: ["Illustrator", "Unity", "Pixel Art"],
    },
    {
      id: 15,
      title: "Videojuego Witch Way",
      category: "PROGRAMACIÓN",
      description: "Creación y Desarrollo de Videojuego Original para clase de Programación Avanzada. 2023.",
      gallery: [
        { type: "video", src: "/video/Programacion05.mp4" },
      ],
      tags: ["Unity", "C#", "Diseño de Niveles"],
    },
    {
      id: 16,
      title: "Simulación de Físicas Avanzada",
      category: "AUDIOVISUAL",
      description: "Simulación de Maquina de Goldberg para clase de Modelamiento y Simulación. 2025.",
      gallery: [
        { type: "youtube", src: "https://www.youtube.com/embed/FdmEg7iv18M?si=vvBRLR3rNvUa8SgS" },
      ],
      tags: ["Autodesk Maya", "Arnold Render", "Modelo 3D"],
    },
    {
      id: 17,
      title: "Conceptualización de Personaje",
      category: "DISEÑO",
      description: "Desarrollo conceptual y visual de personaje original, definiendo identidad, rasgos físicos, personalidad y estilo gráfico para su aplicación en entorno digital. 2023.",
      gallery: [
        { type: "image", src: "/img/Diseno07.jpg" },
      ],
      tags: ["Illustrator", "Character Design", "Concept Art"],
    },
    {
      id: 18,
      title: "Videojuego Lost",
      category: "PROGRAMACIÓN",
      description: "Creación y Desarrollo de Videojuego Original para clase de Programación Avanzada. 2023.",
      gallery: [
        { type: "video", src: "/video/Programacion06.mp4" },
      ],
      tags: ["Unity", "C#", "Diseño de Niveles"],
    },
    {
      id: 19,
      title: "Animaciones Personaje Original",
      category: "AUDIOVISUAL",
      description: "Construcción de Personaje Original para Clase de Expresión Visual y Artística. 2025.",
      gallery: [
        { type: "video", src: "/video/Audiovisual03.mp4" },
        { type: "video", src: "/video/Audiovisual04.mp4" },
        { type: "video", src: "/video/Audiovisual05.mp4" },
      ],
      tags: ["Illustrator", "After Effects", "Character Design"],
    },
    {
      id: 20,
      title: "Vectorización de Personaje Original",
      category: "DISEÑO",
      description: "Diseño y Vectorización de Personaje Original para clase de Taller de Diseño Digital. 2023.",
      gallery: [
        { type: "image", src: "/img/Diseno06.jpg" },
      ],
      tags: ["Illustrator", "Diseño Digital", "Concept Art"],
    },
    {
      id: 21,
      title: "Documental Aves y Felinos",
      category: "AUDIOVISUAL",
      description: "Grabación y edición de documental, construcción visual y narrativa del proyecto para clase de Diseño Sonoro. 2025.",
      gallery: [
        { type: "drive", src: "https://drive.google.com/file/d/1mTZg8tcrpcALkFFTGpV4lQVi31mICiKk/preview" },
      ],
      tags: ["Premiere Pro", "Davinci Resolve", "Colorimetría"],
    },
    {
      id: 22,
      title: "Storytelling Visual",
      category: "DISEÑO",
      description: "Storytelling para Proyecto de Clase Introducción a la Ingeniería. 2021.",
      gallery: [
        { type: "image", src: "/img/Diseno29.png" },
      ],
      tags: ["IbisPaint X", "Diseño Digital", "Storytelling"],
    },
    {
      id: 23,
      title: "Canvas Animados",
      category: "AUDIOVISUAL",
      description: "Producción de Videos Promocionales para Spotify y Redes Sociales. 2024.",
      gallery: [
        { type: "video", src: "/video/Audiovisual.mp4" },
      ],
      tags: ["After Effects", "Illustrator", "Plugins"],
    },
    {
      id: 24,
      title: "Ilustración de Personajes",
      category: "DISEÑO",
      description: "Desarrollo integral de personajes originales, trabajando exploración conceptual, construcción anatómica, lenguaje visual y definición de estilo gráfico para su aplicación en entornos digitales. 2021 - 2025.",
      gallery: [
        { type: "image", src: "/img/Diseno28.png" },
        { type: "image", src: "/img/Diseno27.png" },
        { type: "image", src: "/img/Diseno26.png" },
        { type: "image", src: "/img/Diseno25.png" },
        { type: "image", src: "/img/Diseno24.png" },
        { type: "image", src: "/img/Diseno05.png" },
      ],
      tags: ["Illustrator", "IbisPaint X", "Character Design"],
    },
    {
      id: 25,
      title: "Fotografía y Edición Digital",
      category: "AUDIOVISUAL",
      description: "Captura y edición de fotografías propias, trabajando composición, iluminación y tratamiento de color para lograr coherencia estética y narrativa visual. 2022 - 2025.",
      gallery: [
        { type: "image", src: "/img/Audiovisual10.JPG" },
        { type: "image", src: "/img/Audiovisual11.JPG" },
        { type: "image", src: "/img/Audiovisual12.JPG" },
        { type: "image", src: "/img/Audiovisual13.JPG" },
        { type: "image", src: "/img/Audiovisual14.jpg" },
        { type: "image", src: "/img/Audiovisual15.jpg" },
        { type: "image", src: "/img/Audiovisual16.jpg" },
        { type: "image", src: "/img/Audiovisual17.jpg" },
      ],
      tags: ["Photoshop", "Lightroom", "Composición Fotográfica"],
    },
    {
      id: 26,
      title: "Manual de Identidad Visual",
      category: "DISEÑO",
      description: "Diseño y estructuración de manual de identidad visual para marca propia, estableciendo bases conceptuales y gráficas que aseguran coherencia, posicionamiento y correcta aplicación en distintos formatos. 2021.",
      gallery: [
        { type: "image", src: "/img/Diseno16.png" },
        { type: "image", src: "/img/Diseno17.png" },
      ],
      tags: ["Illustrator", "IbisPaint X", "Character Design"],
    },
    {
      id: 27,
      title: "Audio Comercial",
      category: "AUDIOVISUAL",
      description: "Producción de audio comercial aplicando procesos de grabación, edición, ecualización y mezcla para optimizar la calidad y el impacto sonoro. 2023.",
      gallery: [
        { type: "youtube", src: "https://www.youtube.com/embed/UhlZW_cSY6Y?si=6uebkOhllyx_fuVc" },
      ],
      tags: ["Reaper", "Pro Tools", "Diseño Sonoro"],
    },
    {
      id: 28,
      title: "Animación 3D LipSync",
      category: "AUDIOVISUAL",
      description: "Desarrollo de animación 3D con técnica de lip sync, sincronizando movimientos faciales y expresión corporal con pista de audio para lograr coherencia y naturalidad en la interpretación del personaje. 2023.",
      gallery: [
        { type: "youtube", src: "https://www.youtube.com/embed/buUAkJNEgzw?si=MYfPL5nJ2EzThHzo" },
      ],
      tags: ["Autodesk Maya", "Arnold Render", "Animación 3D"],
    },
  ],
  process: [
    {
      step: "01",
      title: "Investigación",
      description: "Exploro referentes, tendencias y el contexto del proyecto para construir una base sólida.",
      icon: "🔍",
    },
    {
      step: "02",
      title: "Conceptualización",
      description: "Defino la narrativa visual, paleta de colores, tipografías y el tono general del proyecto.",
      icon: "💡",
    },
    {
      step: "03",
      title: "Diseño y Prototipo",
      description: "Creo wireframes, mockups y prototipos interactivos para validar ideas.",
      icon: "✏️",
    },
    {
      step: "04",
      title: "Producción",
      description: "Desarrollo el producto final con atención al detalle en cada píxel y cada frame.",
      icon: "🚀",
    },
  ],
};

// ==================== HOOKS ====================
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [threshold]);

  return [ref, isVisible];
}

function useParallax() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrollY;
}

// ==================== COMPONENTS ====================

// --- Loading Screen ---
function LoadingScreen({ onFinished }) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Simula carga progresiva + espera fuentes
    const steps = [
      { target: 30, delay: 200 },
      { target: 55, delay: 500 },
      { target: 75, delay: 800 },
      { target: 90, delay: 1200 },
    ];

    const timers = steps.map(({ target, delay }) =>
      setTimeout(() => setProgress(target), delay)
    );

    // Espera a que las fuentes estén cargadas
    const fontsReady = document.fonts?.ready || Promise.resolve();
    fontsReady.then(() => {
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setHidden(true);
          setTimeout(() => onFinished(), 600);
        }, 400);
      }, 1500);
    });

    return () => timers.forEach(clearTimeout);
  }, [onFinished]);

  return (
    <div className={`loading-screen ${hidden ? "hidden" : ""}`}>
      {/* Rings decorativos */}
      <div className="loader-ring" />
      <div className="loader-ring-2" />

      {/* Logo */}
      <div className="loader-logo">AJ</div>

      {/* Barra de progreso */}
      <div className="loader-bar-track">
        <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Texto */}
      <span className="loader-text">
        {progress < 100 ? "CARGANDO PORTAFOLIO..." : "¡LISTO!"}
      </span>
    </div>
  );
}

// --- Media Carousel (gallery with images, videos, and embeds) ---
function MediaCarousel({ gallery, alt, isHovered }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaLoaded, setMediaLoaded] = useState({});
  const [playingVideo, setPlayingVideo] = useState(null);
  const containerRef = useRef(null);
  const videoRefs = useRef({});
  const [isInView, setIsInView] = useState(false);

  const items = gallery || [];
  const hasMultiple = items.length > 1;

  // Lazy load
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  // Pause video when sliding away
  useEffect(() => {
    if (playingVideo !== null && playingVideo !== currentIndex) {
      const vid = videoRefs.current[playingVideo];
      if (vid) vid.pause();
      setPlayingVideo(null);
    }
  }, [currentIndex, playingVideo]);

  const goTo = (index, e) => {
    if (e) e.stopPropagation();
    setCurrentIndex(index);
  };

  const goPrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleVideoPlay = (index, e) => {
    e.stopPropagation();
    const vid = videoRefs.current[index];
    if (!vid) return;
    if (playingVideo === index) {
      vid.pause();
      setPlayingVideo(null);
    } else {
      vid.play();
      setPlayingVideo(index);
    }
  };

  const handleVideoEnd = () => setPlayingVideo(null);

  const markLoaded = (index) => {
    setMediaLoaded((prev) => ({ ...prev, [index]: true }));
  };

  if (!items.length) return null;

  const isEmbed = (type) => ["youtube", "vimeo", "drive"].includes(type);

  return (
    <div ref={containerRef} className="media-container" style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Slides */}
      {isInView && items.map((item, index) => {
        const isActive = index === currentIndex;
        const loaded = mediaLoaded[index];

        return (
          <div key={index} style={{
            position: index === 0 ? "relative" : "absolute",
            inset: 0,
            opacity: isActive ? 1 : 0,
            zIndex: isActive ? 2 : 0,
            transition: "opacity 0.4s ease",
            pointerEvents: isActive ? "auto" : "none",
            width: "100%", height: "100%",
          }}>
            {/* Loading spinner */}
            {!loaded && (
              <div className="media-placeholder">
                <div className="media-spinner" />
                <span style={{ fontSize: "11px", letterSpacing: "1px" }}>CARGANDO...</span>
              </div>
            )}

            {/* Image */}
            {item.type === "image" && (
              <img
                src={item.src}
                alt={`${alt} ${index + 1}`}
                loading="lazy"
                decoding="async"
                onLoad={() => markLoaded(index)}
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  opacity: loaded ? 1 : 0,
                  transition: "transform 0.6s, opacity 0.4s",
                  transform: isHovered && isActive ? "scale(1.05)" : "scale(1)",
                }}
              />
            )}

            {/* Local Video */}
            {item.type === "video" && (
              <>
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={item.src}
                  preload="metadata"
                  playsInline
                  muted
                  onLoadedData={() => markLoaded(index)}
                  onEnded={handleVideoEnd}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    opacity: loaded ? 1 : 0,
                    transition: "opacity 0.4s",
                  }}
                />
                {/* Play/Pause overlay */}
                <div
                  className={`video-play-btn ${playingVideo === index && !isHovered ? "hidden" : ""}`}
                  onClick={(e) => handleVideoPlay(index, e)}
                >
                  <div className="video-play-icon">
                    {playingVideo === index ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <polygon points="8,5 19,12 8,19" />
                      </svg>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Embed (YouTube / Vimeo / Drive) */}
            {isEmbed(item.type) && (
              <iframe
                src={isActive ? item.src : ""}
                title={`${alt} ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => markLoaded(index)}
                style={{
                  width: "100%", height: "100%", border: "none",
                  opacity: loaded ? 1 : 0,
                  transition: "opacity 0.4s",
                }}
              />
            )}
          </div>
        );
      })}

      {/* Navigation Arrows */}
      {hasMultiple && isInView && (
        <>
          <button onClick={goPrev} style={{
            position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)",
            zIndex: 5, width: "36px", height: "36px", borderRadius: "50%",
            background: "rgba(10, 0, 18, 0.6)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(123, 63, 191, 0.3)", color: "white",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s", opacity: isHovered ? 1 : 0,
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(123, 63, 191, 0.5)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(10, 0, 18, 0.6)"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button onClick={goNext} style={{
            position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
            zIndex: 5, width: "36px", height: "36px", borderRadius: "50%",
            background: "rgba(10, 0, 18, 0.6)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(123, 63, 191, 0.3)", color: "white",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s", opacity: isHovered ? 1 : 0,
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(123, 63, 191, 0.5)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(10, 0, 18, 0.6)"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {hasMultiple && isInView && (
        <div style={{
          position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)",
          zIndex: 5, display: "flex", gap: "6px", padding: "6px 12px",
          borderRadius: "50px", background: "rgba(10, 0, 18, 0.5)", backdropFilter: "blur(8px)",
        }}>
          {items.map((_, index) => (
            <button key={index} onClick={(e) => goTo(index, e)} style={{
              width: currentIndex === index ? "18px" : "6px",
              height: "6px", borderRadius: "3px", border: "none", cursor: "pointer",
              background: currentIndex === index
                ? "linear-gradient(90deg, var(--purple-light), var(--accent-pink))"
                : "rgba(255,255,255,0.3)",
              transition: "all 0.3s", padding: 0,
            }} />
          ))}
        </div>
      )}

      {/* Media counter badge */}
      {hasMultiple && isInView && (
        <span style={{
          position: "absolute", top: "16px", right: "16px", zIndex: 5,
          fontSize: "11px", fontWeight: 500, letterSpacing: "0.5px",
          padding: "4px 10px", borderRadius: "50px",
          background: "rgba(10, 0, 18, 0.6)", backdropFilter: "blur(8px)",
          color: "var(--text-secondary)", border: "1px solid rgba(123, 63, 191, 0.2)",
        }}>
          {currentIndex + 1} / {items.length}
        </span>
      )}
    </div>
  );
}

// --- Project Lightbox (fullscreen modal viewer) ---
function ProjectLightbox({ project, isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef({});

  const items = project?.gallery || [];
  const hasMultiple = items.length > 1;

  // Reset on open/project change
  useEffect(() => {
    setCurrentIndex(0);
    setPlayingVideo(null);
  }, [project]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasMultiple) setCurrentIndex((p) => (p === 0 ? items.length - 1 : p - 1));
      if (e.key === "ArrowRight" && hasMultiple) setCurrentIndex((p) => (p === items.length - 1 ? 0 : p + 1));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, hasMultiple, items.length, onClose]);

  // Pause video on slide change
  useEffect(() => {
    if (playingVideo !== null && playingVideo !== currentIndex) {
      const vid = videoRefs.current[playingVideo];
      if (vid) vid.pause();
      setPlayingVideo(null);
    }
  }, [currentIndex, playingVideo]);

  const handleVideoToggle = (index) => {
    const vid = videoRefs.current[index];
    if (!vid) return;
    if (playingVideo === index) {
      vid.pause();
      setPlayingVideo(null);
    } else {
      vid.play();
      setPlayingVideo(index);
    }
  };

  const isEmbed = (type) => ["youtube", "vimeo", "drive"].includes(type);

  if (!project) return null;

  return (
    <div
      className={`lightbox-overlay ${isOpen ? "open" : ""}`}
      onClick={onClose}
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        {/* Media area */}
        <div className="lightbox-media">
          {items.map((item, index) => {
            const isActive = index === currentIndex;
            return (
              <div key={index} style={{
                position: index === 0 ? "relative" : "absolute",
                inset: 0,
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 2 : 0,
                transition: "opacity 0.35s ease",
                pointerEvents: isActive ? "auto" : "none",
                width: "100%", height: "100%",
              }}>
                {item.type === "image" && (
                  <img src={item.src} alt={`${project.title} ${index + 1}`} loading="lazy" />
                )}

                {item.type === "video" && (
                  <>
                    <video
                      ref={(el) => { videoRefs.current[index] = el; }}
                      src={item.src}
                      preload="metadata"
                      playsInline
                      controls={playingVideo === index}
                      onEnded={() => setPlayingVideo(null)}
                      style={{ width: "100%", height: "100%", objectFit: "contain", background: "var(--bg-primary)" }}
                    />
                    {playingVideo !== index && (
                      <div
                        className="video-play-btn"
                        onClick={() => handleVideoToggle(index)}
                      >
                        <div className="video-play-icon" style={{ width: "68px", height: "68px" }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <polygon points="8,5 19,12 8,19" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {isEmbed(item.type) && (
                  <iframe
                    src={isActive ? item.src : ""}
                    title={`${project.title} ${index + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            );
          })}

          {/* Close button */}
          <button className="lightbox-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Navigation arrows */}
          {hasMultiple && (
            <>
              <button className="lightbox-nav prev" onClick={() => setCurrentIndex((p) => (p === 0 ? items.length - 1 : p - 1))}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button className="lightbox-nav next" onClick={() => setCurrentIndex((p) => (p === items.length - 1 ? 0 : p + 1))}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          {/* Dots */}
          {hasMultiple && (
            <div className="lightbox-dots">
              {items.map((_, index) => (
                <button
                  key={index}
                  className={`lightbox-dot ${currentIndex === index ? "active" : ""}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Project info */}
        <div className="lightbox-info">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <h3 style={{
              fontFamily: "'Syne', sans-serif", fontSize: "24px", fontWeight: 700,
              color: "var(--text-primary)", flex: 1,
            }}>{project.title}</h3>
            <span style={{
              fontSize: "11px", fontWeight: 500, letterSpacing: "1.5px", padding: "5px 14px",
              borderRadius: "50px", background: "rgba(90, 232, 214, 0.1)",
              color: "var(--accent-cyan)", border: "1px solid rgba(90, 232, 214, 0.2)",
              whiteSpace: "nowrap",
            }}>{project.category}</span>
            {hasMultiple && (
              <span style={{
                fontSize: "12px", color: "var(--text-muted)", whiteSpace: "nowrap",
              }}>{currentIndex + 1} / {items.length}</span>
            )}
          </div>
          <p style={{
            fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "16px",
          }}>{project.description}</p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {project.tags.map((tag) => (
              <span key={tag} style={{
                fontSize: "12px", padding: "5px 14px", borderRadius: "50px",
                background: "rgba(123, 63, 191, 0.1)", color: "var(--text-secondary)",
                border: "1px solid rgba(123, 63, 191, 0.15)",
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <div className="cursor-glow" style={{ left: pos.x, top: pos.y }} />;
}

// --- Navigation ---
function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <div className="cursor-glow" style={{ left: pos.x, top: pos.y }} />;
}

function Navigation({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Inicio" },
    { id: "about", label: "Sobre Mi" },
    { id: "skills", label: "Skills" },
    { id: "work", label: "Trabajo" },
    { id: "process", label: "Proceso" },
    { id: "contact", label: "Contacto" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000,
      padding: scrolled ? "16px 40px" : "24px 40px",
      background: scrolled ? "rgba(10, 0, 18, 0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(123, 63, 191, 0.15)" : "none",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <div onClick={() => scrollTo("hero")} style={{
        fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 800, cursor: "pointer",
        background: "linear-gradient(135deg, var(--purple-light), var(--accent-pink))",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>AJ</div>

      {/* Desktop */}
      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {navItems.map((item) => (
          <button key={item.id} onClick={() => scrollTo(item.id)}
            className="nav-link-desktop"
            style={{
              background: "none", border: "none",
              color: activeSection === item.id ? "var(--purple-light)" : "var(--text-secondary)",
              fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 500,
              cursor: "pointer", padding: "8px 0", transition: "color 0.3s",
              letterSpacing: "0.5px", display: "none",
            }}>{item.label}</button>
        ))}
      </div>

      {/* Mobile toggle */}
      <button onClick={() => setIsOpen(!isOpen)} className="nav-mobile-toggle" style={{
        background: "none", border: "none", cursor: "pointer", padding: "8px",
        display: "flex", flexDirection: "column", gap: isOpen ? "0" : "5px", zIndex: 1001,
      }}>
        <span style={{ width: "24px", height: "2px", background: "var(--purple-light)", transition: "all 0.3s", transform: isOpen ? "rotate(45deg) translateY(1px)" : "none" }} />
        <span style={{ width: "24px", height: "2px", background: "var(--purple-light)", transition: "all 0.3s", opacity: isOpen ? 0 : 1 }} />
        <span style={{ width: "24px", height: "2px", background: "var(--purple-light)", transition: "all 0.3s", transform: isOpen ? "rotate(-45deg) translateY(-1px)" : "none" }} />
      </button>

      {/* Mobile Menu */}
      <div style={{
        position: "fixed", top: 0, right: isOpen ? 0 : "-100%", width: "280px", height: "100vh",
        background: "rgba(10, 0, 18, 0.95)", backdropFilter: "blur(30px)",
        padding: "100px 40px", transition: "right 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        display: "flex", flexDirection: "column", gap: "24px",
        borderLeft: "1px solid rgba(123, 63, 191, 0.2)",
      }}>
        {navItems.map((item, i) => (
          <button key={item.id} onClick={() => scrollTo(item.id)} style={{
            background: "none", border: "none",
            color: activeSection === item.id ? "var(--purple-light)" : "var(--text-secondary)",
            fontFamily: "'Syne', sans-serif", fontSize: "24px", fontWeight: 600,
            cursor: "pointer", textAlign: "left", padding: "8px 0",
            transition: "all 0.3s", transitionDelay: isOpen ? `${i * 0.05}s` : "0s",
            opacity: isOpen ? 1 : 0, transform: isOpen ? "translateX(0)" : "translateX(20px)",
          }}>{item.label}</button>
        ))}
      </div>
    </nav>
  );
}

// --- Section Title ---
function SectionTitle({ label, title, align = "left" }) {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`} style={{ marginBottom: "60px", textAlign: align }}>
      <span style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500,
        letterSpacing: "3px", textTransform: "uppercase", color: "var(--accent-cyan)",
        display: "block", marginBottom: "12px",
      }}>{label}</span>
      <h2 style={{
        fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px, 5vw, 56px)",
        fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1px", color: "var(--text-primary)",
      }}>{title}</h2>
      <div style={{
        width: isVisible ? "60px" : "0", height: "3px",
        background: "linear-gradient(90deg, var(--purple-main), var(--accent-pink))",
        borderRadius: "2px", marginTop: "20px",
        transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
        marginLeft: align === "center" ? "auto" : "0",
        marginRight: align === "center" ? "auto" : "0",
      }} />
    </div>
  );
}

// --- Hero ---
function HeroSection() {
  const scrollY = useParallax();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section id="hero" className="section" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Background blurs */}
      <div style={{
        position: "absolute", width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(123, 63, 191, 0.15) 0%, transparent 70%)",
        top: "10%", right: "-10%", transform: `translateY(${scrollY * 0.1}px)`, filter: "blur(60px)",
      }} />
      <div style={{
        position: "absolute", width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(232, 90, 176, 0.1) 0%, transparent 70%)",
        bottom: "10%", left: "-5%", transform: `translateY(${scrollY * -0.08}px)`, filter: "blur(40px)",
      }} />

      {/* Floating shapes */}
      <div style={{
        position: "absolute", width: "120px", height: "120px",
        border: "1px solid rgba(123, 63, 191, 0.2)", borderRadius: "20px",
        top: "15%", left: "10%",
        animation: "float 8s ease-in-out infinite, rotate-slow 20s linear infinite",
        transform: `translateY(${scrollY * 0.15}px)`,
      }} />
      <div style={{
        position: "absolute", width: "60px", height: "60px",
        border: "1px solid rgba(90, 232, 214, 0.15)", borderRadius: "50%",
        top: "25%", right: "15%", animation: "float 6s ease-in-out infinite 1s",
      }} />
      <div style={{
        position: "absolute", width: "8px", height: "8px",
        background: "var(--purple-light)", borderRadius: "50%",
        bottom: "30%", left: "20%",
        animation: "float 5s ease-in-out infinite 0.5s, pulse-glow 3s ease-in-out infinite",
      }} />

      <div className="section-inner" style={{ textAlign: "center" }}>
        {/* Avatar / Lottie placeholder */}
        <div style={{
          width: "180px", height: "180px", margin: "0 auto 40px", borderRadius: "50%",
          background: "linear-gradient(135deg, var(--purple-deep), var(--bg-card))",
          border: "2px solid rgba(123, 63, 191, 0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: loaded ? 1 : 0, transform: loaded ? "scale(1)" : "scale(0.8)",
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)", position: "relative", overflow: "hidden",
        }}>
          {/* 
            REEMPLAZA con tu animación Lottie o imagen:
            <img src="/img/profile.png" alt="Aleja" style={{width:"100%",height:"100%",objectFit:"cover"}} />
          */}
          <span style={{
            fontFamily: "'Syne', sans-serif", fontSize: "48px", fontWeight: 800,
            background: "linear-gradient(135deg, var(--purple-light), var(--accent-pink))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            <img src="img/Ale01.jpeg" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
          </span>
          <div style={{
            position: "absolute", inset: "-2px", borderRadius: "50%",
            border: "2px solid transparent", borderTopColor: "var(--purple-light)",
            animation: "rotate-slow 4s linear infinite",
          }} />
        </div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontSize: "clamp(40px, 7vw, 80px)",
          fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", marginBottom: "20px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
        }}>
          <span style={{ color: "var(--text-primary)" }}>Hola, soy </span>
          <span style={{
            background: "linear-gradient(135deg, var(--purple-light), var(--accent-pink), var(--accent-cyan))",
            backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "shimmer 4s linear infinite",
          }}>{PORTFOLIO_DATA.name}</span>
        </h1>

        <p style={{
          fontSize: "clamp(16px, 2vw, 22px)", color: "var(--text-secondary)",
          maxWidth: "600px", margin: "0 auto 48px", lineHeight: 1.6,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
        }}>{PORTFOLIO_DATA.tagline}</p>

        <div style={{
          display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
        }}>
          <button onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 500,
              padding: "14px 36px", borderRadius: "50px", border: "none",
              background: "linear-gradient(135deg, var(--purple-main), var(--accent-pink))",
              color: "white", cursor: "pointer", transition: "all 0.3s",
            }}
            onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(123, 63, 191, 0.4)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}
          >Ver Proyectos</button>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 500,
              padding: "14px 36px", borderRadius: "50px",
              border: "1px solid rgba(123, 63, 191, 0.4)", background: "transparent",
              color: "var(--purple-light)", cursor: "pointer", transition: "all 0.3s",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = "var(--purple-light)"; e.target.style.background = "rgba(123, 63, 191, 0.1)"; }}
            onMouseLeave={(e) => { e.target.style.borderColor = "rgba(123, 63, 191, 0.4)"; e.target.style.background = "transparent"; }}
          >Contacto</button>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          opacity: loaded ? 0.5 : 0, transition: "opacity 1s 1.2s", animation: "float 3s ease-in-out infinite",
        }}>
          <span style={{ fontSize: "11px", letterSpacing: "2px", color: "var(--text-muted)" }}>SCROLL</span>
          <div style={{ width: "1px", height: "30px", background: "linear-gradient(to bottom, var(--purple-main), transparent)" }} />
        </div>
      </div>
    </section>
  );
}

// --- About ---
function AboutSection() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="about" className="section" style={{ background: "linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)" }}>
      <div className="section-inner">
        <SectionTitle label="Conóceme" title="Sobre Mi" />
        <div ref={ref} className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "60px", alignItems: "center" }}>
          {/* Photo placeholder */}
          <div className={`reveal about-photo ${isVisible ? "visible" : ""}`} style={{
            aspectRatio: "3/4", borderRadius: "16px",
            background: "linear-gradient(135deg, var(--purple-deep), var(--bg-card))",
            border: "1px solid rgba(123, 63, 191, 0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
          }}>
            {/* REEMPLAZA con: <img src="/img/profile.png" style={{width:"100%",height:"100%",objectFit:"cover"}} alt="Aleja" /> */}
            <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
              <div>
                <img src="img/Ale02.jpeg" style={{ width: "100%", height: "100%" }} />
              </div>
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, var(--bg-secondary), transparent)" }} />
          </div>

          <div>
            <p className={`reveal reveal-delay-2 ${isVisible ? "visible" : ""}`} style={{ fontSize: "18px", lineHeight: 1.8, color: "var(--text-secondary)", marginBottom: "32px" }}>
              {PORTFOLIO_DATA.bio}
            </p>

            <div className={`reveal reveal-delay-3 info-grid ${isVisible ? "visible" : ""}`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {[
                { label: "Enfoque", value: "Desarrollo y Multimedia" },
                { label: "Ubicación", value: "Medellín, Colombia" },
                { label: "Estudio", value: "Ingeniería Multimedia" },
                { label: "Pasión", value: "Storytelling Visual" },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: "20px", borderRadius: "12px",
                  background: "rgba(123, 63, 191, 0.06)", border: "1px solid rgba(123, 63, 191, 0.12)",
                }}>
                  <span style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--accent-cyan)", display: "block", marginBottom: "6px" }}>{item.label}</span>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Julieta */}
            <div className={`reveal reveal-delay-4 ${isVisible ? "visible" : ""}`} style={{
              marginTop: "32px", padding: "24px", borderRadius: "16px",
              background: "linear-gradient(135deg, rgba(232, 90, 176, 0.06), rgba(123, 63, 191, 0.06))",
              border: "1px solid rgba(232, 90, 176, 0.15)", display: "flex", gap: "20px", alignItems: "center",
            }}>
              <div style={{
                width: "60px", height: "60px", borderRadius: "50%", background: "var(--bg-card)",
                border: "1px solid rgba(232, 90, 176, 0.2)", display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0, fontSize: "28px",
              }}>
                <img src="img/Julieta.jpeg" style={{ width: "120%", height: "120%", borderRadius: "50%" }} />
              </div>
              <div>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "15px", color: "var(--accent-pink)" }}>Meet Julieta</span>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.5, marginTop: "4px" }}>
                  Mi gata calicó, fuente inagotable de inspiración y compañera inseparable. En ella encuentro el ejemplo perfecto de la conexión y el impacto que deseo generar en los demás con mi trabajo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Skills ---
function SkillsSection() {
  const [ref, isVisible] = useScrollReveal();
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", label: "Todos" },
    { id: "desarrollo y programacion", label: "Desarrollo y Programación" },
    { id: "Diseño y produccion digital", label: "Diseño y Producción Digital" },
    { id: "Analitica e innovacion tecnologica", label: "Analítica e Innovación Tecnológica" },
  ];

  const filtered = activeFilter === "all"
    ? PORTFOLIO_DATA.skills
    : PORTFOLIO_DATA.skills.filter((s) => s.category === activeFilter);

  return (
    <section id="skills" className="section">
      <div className="section-inner">
        <SectionTitle label="Herramientas" title="Skills & Tech" />
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`} style={{ display: "flex", gap: "12px", marginBottom: "48px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveFilter(cat.id)} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500,
              padding: "10px 24px", borderRadius: "50px", cursor: "pointer", transition: "all 0.3s",
              border: activeFilter === cat.id ? "1px solid var(--purple-main)" : "1px solid rgba(123, 63, 191, 0.2)",
              background: activeFilter === cat.id ? "rgba(123, 63, 191, 0.15)" : "transparent",
              color: activeFilter === cat.id ? "var(--purple-light)" : "var(--text-muted)",
            }}>{cat.label}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
          {filtered.map((skill, i) => (
            <div key={skill.name} className={`reveal reveal-delay-${Math.min(i + 1, 6)} ${isVisible ? "visible" : ""}`}
              style={{
                padding: "24px", borderRadius: "12px", background: "rgba(123, 63, 191, 0.04)",
                border: "1px solid rgba(123, 63, 191, 0.1)", transition: "all 0.3s", cursor: "default",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(123, 63, 191, 0.08)"; e.currentTarget.style.borderColor = "rgba(123, 63, 191, 0.25)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(123, 63, 191, 0.04)"; e.currentTarget.style.borderColor = "rgba(123, 63, 191, 0.1)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>{skill.name}</span>
                <span style={{ fontSize: "13px", color: "var(--purple-light)", fontWeight: 500 }}>{skill.level}%</span>
              </div>
              <div style={{ width: "100%", height: "4px", borderRadius: "2px", background: "rgba(123, 63, 191, 0.1)", overflow: "hidden" }}>
                <div style={{
                  width: isVisible ? `${skill.level}%` : "0%", height: "100%", borderRadius: "2px",
                  background: "linear-gradient(90deg, var(--purple-main), var(--accent-pink))",
                  transition: `width 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Work ---
function WorkSection() {
  const [ref, isVisible] = useScrollReveal();
  const [activeFilter, setActiveFilter] = useState("TODOS");
  const [hoveredId, setHoveredId] = useState(null);
  const [lightboxProject, setLightboxProject] = useState(null);

  const categories = ["TODOS", "AUDIOVISUAL", "DISEÑO", "PROGRAMACIÓN"];
  const filtered = activeFilter === "TODOS"
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter((p) => p.category === activeFilter);

  const openLightbox = (project) => setLightboxProject(project);
  const closeLightbox = () => setLightboxProject(null);

  return (
    <>
      <ProjectLightbox
        project={lightboxProject}
        isOpen={lightboxProject !== null}
        onClose={closeLightbox}
      />
      <section id="work" className="section" style={{ background: "linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)" }}>
        <div className="section-inner">
          <SectionTitle label="Portafolio" title="Mi Trabajo" />
          <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`} style={{ display: "flex", gap: "12px", marginBottom: "48px", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveFilter(cat)} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500,
                padding: "10px 24px", borderRadius: "50px", cursor: "pointer", transition: "all 0.3s",
                border: activeFilter === cat ? "1px solid var(--purple-main)" : "1px solid rgba(123, 63, 191, 0.2)",
                background: activeFilter === cat ? "rgba(123, 63, 191, 0.15)" : "transparent",
                color: activeFilter === cat ? "var(--purple-light)" : "var(--text-muted)", letterSpacing: "1px",
              }}>{cat}</button>
            ))}
          </div>
          <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "24px" }}>
            {filtered.map((project, i) => (
              <div key={project.id}
                className={`reveal reveal-delay-${Math.min(i + 1, 6)} project-card ${isVisible ? "visible" : ""}`}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => openLightbox(project)}
                style={{
                  borderRadius: "16px", overflow: "hidden", background: "var(--bg-card)",
                  border: "1px solid rgba(123, 63, 191, 0.12)", cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: hoveredId === project.id ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: hoveredId === project.id ? "0 20px 60px rgba(123, 63, 191, 0.15)" : "none",
                }}>
                <div style={{
                  aspectRatio: "16/10", background: "linear-gradient(135deg, var(--purple-deep), var(--bg-card-hover))",
                  display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden",
                }}>
                  {(project.gallery && project.gallery.length > 0) ? (
                    <MediaCarousel
                      gallery={project.gallery}
                      alt={project.title}
                      isHovered={hoveredId === project.id}
                    />
                  ) : (
                    <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
                      <div style={{ fontSize: "36px", marginBottom: "8px", transition: "transform 0.4s", transform: hoveredId === project.id ? "scale(1.15)" : "scale(1)" }}>
                        {project.category === "AUDIOVISUAL" ? "🎬" : project.category === "DISEÑO" ? "🎨" : "💻"}
                      </div>
                      <span style={{ fontSize: "12px", letterSpacing: "1px" }}>IMAGEN / VIDEO</span>
                    </div>
                  )}
                  <span style={{
                    position: "absolute", top: "16px", left: "16px", fontSize: "11px", fontWeight: 500,
                    letterSpacing: "1.5px", padding: "6px 14px", borderRadius: "50px",
                    background: "rgba(10, 0, 18, 0.7)", backdropFilter: "blur(10px)",
                    color: "var(--accent-cyan)", border: "1px solid rgba(90, 232, 214, 0.2)",
                    zIndex: 4,
                  }}>{project.category}</span>

                  {/* Expand button */}
                  <button
                    className="lightbox-expand-btn"
                    onClick={(e) => { e.stopPropagation(); openLightbox(project); }}
                    title="Ver en grande"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  </button>
                </div>
                <div style={{ padding: "24px" }}>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>{project.title}</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "16px" }}>{project.description}</p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {project.tags.map((tag) => (
                      <span key={tag} style={{
                        fontSize: "12px", padding: "4px 12px", borderRadius: "50px",
                        background: "rgba(123, 63, 191, 0.08)", color: "var(--text-secondary)",
                        border: "1px solid rgba(123, 63, 191, 0.1)",
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// --- Process ---
function ProcessSection() {
  const [ref, isVisible] = useScrollReveal();
  return (
    <section id="process" className="section">
      <div className="section-inner">
        <SectionTitle label="Cómo trabajo" title="Mi Proceso Creativo" align="center" />
        <div ref={ref} className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", position: "relative" }}>
          <div className="process-line" style={{
            position: "absolute", top: "40px", left: "12.5%", width: "75%", height: "1px",
            background: isVisible ? "linear-gradient(90deg, transparent, var(--purple-main), var(--accent-pink), transparent)" : "transparent",
            transition: "all 1.5s ease 0.3s", zIndex: 0,
          }} />
          {PORTFOLIO_DATA.process.map((step, i) => (
            <div key={step.step} className={`reveal reveal-delay-${i + 1} ${isVisible ? "visible" : ""}`} style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{
                width: "80px", height: "80px", margin: "0 auto 24px", borderRadius: "50%",
                background: "var(--bg-card)", border: "1px solid rgba(123, 63, 191, 0.2)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px",
              }}>{step.icon}</div>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "12px", fontWeight: 700, letterSpacing: "3px", color: "var(--purple-light)", display: "block", marginBottom: "8px" }}>{step.step}</span>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px" }}>{step.title}</h3>
              <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.6 }}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Contact ---
function ContactSection() {
  const [ref, isVisible] = useScrollReveal();

  const socialLinks = [
    {
      name: "Instagram", url: PORTFOLIO_DATA.social.instagram, color: "#E85AB0",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
    },
    {
      name: "TikTok", url: PORTFOLIO_DATA.social.tiktok, color: "#5AE8D6",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.81a8.25 8.25 0 0 0 4.76 1.52V6.88a4.85 4.85 0 0 1-1-.19z"/></svg>,
    },
    {
      name: "LinkedIn", url: PORTFOLIO_DATA.social.linkedin, color: "#A96EE8",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
    },
  ];

  return (
    <section id="contact" className="section" style={{ background: "linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)", paddingBottom: "80px" }}>
      <div className="section-inner" style={{ textAlign: "center" }}>
        <SectionTitle label="Hablemos" title="Contacto" align="center" />
        <p ref={ref} className={`reveal ${isVisible ? "visible" : ""}`} style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "500px", margin: "0 auto 48px", lineHeight: 1.7 }}>
          ¿Tienes un proyecto en mente o quieres colaborar? Me encantaría escucharte.
        </p>
        <div className={`reveal reveal-delay-2 contact-social ${isVisible ? "visible" : ""}`} style={{ display: "flex", gap: "20px", justifyContent: "center", marginBottom: "48px" }}>
          {socialLinks.map((link) => (
            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: "12px", padding: "16px 28px",
                borderRadius: "16px", background: "var(--bg-card)",
                border: "1px solid rgba(123, 63, 191, 0.12)", color: link.color,
                textDecoration: "none", transition: "all 0.3s", fontWeight: 500, fontSize: "15px",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = link.color; e.currentTarget.style.boxShadow = `0 10px 40px ${link.color}20`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(123, 63, 191, 0.12)"; e.currentTarget.style.boxShadow = "none"; }}
            >{link.icon}{link.name}</a>
          ))}
        </div>
        <div className={`reveal reveal-delay-3 ${isVisible ? "visible" : ""}`}>
          <a href={`mailto:${PORTFOLIO_DATA.email}`} style={{
            fontFamily: "'Syne', sans-serif", fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 700,
            color: "var(--text-primary)", textDecoration: "none",
            borderBottom: "2px solid var(--purple-main)", paddingBottom: "4px", transition: "all 0.3s",
          }}
            onMouseEnter={(e) => { e.target.style.borderBottomColor = "var(--accent-pink)"; e.target.style.color = "var(--purple-light)"; }}
            onMouseLeave={(e) => { e.target.style.borderBottomColor = "var(--purple-main)"; e.target.style.color = "var(--text-primary)"; }}
          >{PORTFOLIO_DATA.email}</a>
        </div>
      </div>
      <div style={{ marginTop: "100px", textAlign: "center", paddingTop: "32px", borderTop: "1px solid rgba(123, 63, 191, 0.1)" }}>
        <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
          Diseñado y desarrollado por <span style={{ color: "var(--purple-light)" }}>{PORTFOLIO_DATA.name}</span> — 2025
        </p>
      </div>
    </section>
  );
}

// ==================== MAIN ====================
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const sections = ["hero", "about", "skills", "work", "process", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleLoadingFinished = useCallback(() => {
    setIsLoading(false);
    // Pequeño delay para que el contenido aparezca suavemente
    setTimeout(() => setShowContent(true), 50);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onFinished={handleLoadingFinished} />}

      {/* Main Content */}
      <div style={{
        opacity: showContent ? 1 : 0,
        transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div className="grain-overlay" />
        <CursorGlow />
        <Navigation activeSection={activeSection} />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <WorkSection />
        <ProcessSection />
        <ContactSection />
      </div>
    </>
  );
}