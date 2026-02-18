import { useState, useEffect, useRef, useCallback } from "react";

// ==================== CONFIGURATION ====================
// Edita estos datos para personalizar tu portafolio
const PORTFOLIO_DATA = {
  name: "Aleja Jaramillo",
  tagline: "Diseñadora Multimedia & Creadora Visual",
  bio: `Soy Maria Alejandra Jaramillo Hernández, estudiante de Ingeniería Multimedia. 
  Desde pequeña, me han caracterizado la creatividad, la empatía, la versatilidad 
  y la autenticidad. Me apasiona contar historias y dar vida a personajes que cautiven 
  y dejen huella en los demás.`,
  email: "majh011803@gmail.com",
  social: {
    instagram: "https://www.instagram.com/hanamanzana",
    tiktok: "https://www.tiktok.com/@hanamanzana",
    linkedin: "https://www.linkedin.com/in/maria-alejandra-jaramillo-hern%C3%A1ndez-998b84338/",
  },
  skills: [
    { name: "After Effects", level: 90, category: "motion" },
    { name: "Illustrator", level: 85, category: "design" },
    { name: "Photoshop", level: 88, category: "design" },
    { name: "Premiere Pro", level: 82, category: "motion" },
    { name: "Blender", level: 70, category: "3d" },
    { name: "Figma", level: 80, category: "design" },
    { name: "HTML/CSS", level: 75, category: "dev" },
    { name: "JavaScript", level: 65, category: "dev" },
    { name: "React", level: 60, category: "dev" },
  ],
  // MEDIA: Cada proyecto puede tener image, video, o ambos (thumbnail + video)
  // Tipos soportados:
  //   image: "/img/projects/foto.jpg"           → Solo imagen
  //   video: "/img/projects/video.mp4"           → Solo video
  //   image + video juntos                       → Thumbnail estático + video al hacer play
  //   poster: "/img/projects/poster.jpg"         → Poster para el video mientras carga
  projects: [
    {
      id: 1,
      title: "Proyecto Audiovisual",
      category: "AUDIOVISUAL",
      description: "Producción audiovisual completa con narrativa visual impactante.",
      image: null,   // Reemplaza: "/img/projects/project1.jpg"
      video: null,   // Reemplaza: "/img/projects/project1.mp4"
      poster: null,  // Opcional: thumbnail del video
      tags: ["After Effects", "Premiere Pro", "Storytelling"],
    },
    {
      id: 2,
      title: "Identidad de Marca",
      category: "DISEÑO",
      description: "Diseño de identidad visual para marca emergente.",
      image: null,
      video: null,
      poster: null,
      tags: ["Illustrator", "Branding", "Tipografía"],
    },
    {
      id: 3,
      title: "App Interactiva",
      category: "PROGRAMACIÓN",
      description: "Desarrollo de experiencia interactiva multimedia.",
      image: null,
      video: null,
      poster: null,
      tags: ["React", "JavaScript", "UI/UX"],
    },
    {
      id: 4,
      title: "Motion Graphics",
      category: "AUDIOVISUAL",
      description: "Animaciones y motion graphics para redes sociales.",
      image: null,
      video: null,
      poster: null,
      tags: ["After Effects", "Lottie", "Animación"],
    },
    {
      id: 5,
      title: "Ilustración Digital",
      category: "DISEÑO",
      description: "Serie de ilustraciones digitales con estilo propio.",
      image: null,
      video: null,
      poster: null,
      tags: ["Photoshop", "Ilustración", "Arte Digital"],
    },
    {
      id: 6,
      title: "Web Interactiva",
      category: "PROGRAMACIÓN",
      description: "Sitio web con animaciones y experiencias inmersivas.",
      image: null,
      video: null,
      poster: null,
      tags: ["Three.js", "GSAP", "WebGL"],
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
      title: "Diseño & Prototipo",
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

// --- Optimized Media (Image/Video with lazy load) ---
function OptimizedMedia({ image, video, poster, alt, isHovered }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Lazy load: solo carga cuando está cerca del viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Precarga 200px antes de entrar al viewport
    );
    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  const hasMedia = image || video;
  const showVideo = video && isInView;
  const showImage = image && isInView && !isPlaying;

  const handlePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVideoEnd = () => setIsPlaying(false);

  if (!hasMedia) {
    return null; // No media, will show placeholder in parent
  }

  return (
    <div ref={containerRef} className="media-container">
      {/* Spinner mientras carga */}
      <div className={`media-placeholder ${mediaLoaded ? "hidden" : ""}`}>
        <div className="media-spinner" />
        <span style={{ fontSize: "11px", letterSpacing: "1px" }}>CARGANDO...</span>
      </div>

      {/* Imagen */}
      {showImage && (
        <img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={mediaLoaded && !video ? "loaded" : "loading"}
          onLoad={() => { if (!video) setMediaLoaded(true); }}
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            position: video ? "absolute" : "relative",
            inset: video ? 0 : "auto",
            zIndex: isPlaying ? 0 : 2,
            opacity: isPlaying ? 0 : 1,
          }}
        />
      )}

      {/* Video */}
      {showVideo && (
        <>
          <video
            ref={videoRef}
            src={video}
            poster={poster || image || undefined}
            preload="metadata"
            playsInline
            muted
            className={mediaLoaded ? "loaded" : "loading"}
            onLoadedData={() => setMediaLoaded(true)}
            onEnded={handleVideoEnd}
            style={{
              position: image ? "absolute" : "relative",
              inset: image ? 0 : "auto",
              zIndex: isPlaying ? 2 : 1,
            }}
          />

          {/* Play/Pause button */}
          <div
            className={`video-play-btn ${isPlaying && !isHovered ? "hidden" : ""}`}
            onClick={handlePlay}
            style={{ zIndex: 3 }}
          >
            <div className="video-play-icon">
              {isPlaying ? (
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
    </div>
  );
}

function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <div className="cursor-glow" style={{ left: pos.x, top: pos.y }} />;
}

// --- Navigation ---
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
    { id: "about", label: "Sobre Mí" },
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
          }}>AJ</span>
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
        <SectionTitle label="Conóceme" title="Sobre Mí" />
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
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>📷</div>
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, var(--bg-secondary), transparent)" }} />
          </div>

          <div>
            <p className={`reveal reveal-delay-2 ${isVisible ? "visible" : ""}`} style={{ fontSize: "18px", lineHeight: 1.8, color: "var(--text-secondary)", marginBottom: "32px" }}>
              {PORTFOLIO_DATA.bio}
            </p>

            <div className={`reveal reveal-delay-3 info-grid ${isVisible ? "visible" : ""}`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {[
                { label: "Enfoque", value: "Diseño & Multimedia" },
                { label: "Ubicación", value: "Colombia" },
                { label: "Estudio", value: "Ing. Multimedia" },
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
              }}>🐱</div>
              <div>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "15px", color: "var(--accent-pink)" }}>Meet Julieta</span>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.5, marginTop: "4px" }}>
                  Mi gata calicó, fuente inagotable de inspiración y compañera inseparable.
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
    { id: "design", label: "Diseño" },
    { id: "motion", label: "Motion" },
    { id: "3d", label: "3D" },
    { id: "dev", label: "Desarrollo" },
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

  const categories = ["TODOS", "AUDIOVISUAL", "DISEÑO", "PROGRAMACIÓN"];
  const filtered = activeFilter === "TODOS"
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter((p) => p.category === activeFilter);

  return (
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
              className={`reveal reveal-delay-${Math.min(i + 1, 6)} ${isVisible ? "visible" : ""}`}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
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
                {(project.image || project.video) ? (
                  <OptimizedMedia
                    image={project.image}
                    video={project.video}
                    poster={project.poster}
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
                }}>{project.category}</span>
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