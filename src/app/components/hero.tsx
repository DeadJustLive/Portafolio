import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import './hero.css';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const blobRef1 = useRef<HTMLDivElement>(null);
  const blobRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    const isMobile = window.innerWidth < 768;

    // Animate text elements
    if (textRef.current) {
      const elements = textRef.current.children;
      tl.fromTo(elements,
        { y: isMobile ? 20 : 40, opacity: 0, filter: isMobile ? 'none' : 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: isMobile ? 0.6 : 1, stagger: 0.1, ease: 'power3.out' }
      );
    }

    // Ambient floating animation for background blobs (Simplified on mobile)
    const animateBlob = (ref: React.RefObject<HTMLDivElement | null>, delay = 0) => {
      if (isMobile) {
        // Simple static fade in on mobile
        gsap.fromTo(ref.current, 
          { opacity: 0 }, 
          { opacity: 0.5, duration: 2, delay }
        );
      } else {
        gsap.to(ref.current, {
          y: 'random(-50, 50)',
          x: 'random(-50, 50)',
          rotation: 'random(-15, 15)',
          duration: 'random(5, 10)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay
        });
      }
    };

    animateBlob(blobRef1);
    animateBlob(blobRef2, 1);

  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="hero-section"
      style={{ paddingTop: 'clamp(3rem, 8vh, 6rem)', paddingBottom: 'clamp(3rem, 8vh, 5rem)' }}
    >
      {/* Background Ambient Effects */}
      <div className="hero-background">
        <div
          ref={blobRef1}
          className="hero-blob-1"
        />
        <div
          ref={blobRef2}
          className="hero-blob-2"
        />
        {/* Subtle grid pattern overlay */}
        <div className="hero-grid-overlay" />
      </div>

      {/* Main Content */}
      <div ref={textRef} className="hero-content">

        {/* Badge */}
        <div
          className="hero-badge glass"
          style={{ marginBottom: 'clamp(0.75rem, 3vh, 2rem)' }}
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="hero-badge-text">Desarrollador Fullstack &amp; Frontend Specialist</span>
        </div>

        {/* Main Title */}
        <h1
          className="hero-title"
          style={{
            fontSize: 'clamp(2rem, 8vw + 1vh, 6rem)',
            marginBottom: 'clamp(0.5rem, 2vh, 1.5rem)',
          }}
        >
          <span className="hero-title-line">Creando Experiencias</span>
          <span className="hero-title-gradient text-gradient">Digitales Premium</span>
        </h1>

        {/* Description */}
        <p
          className="hero-description"
          style={{
            fontSize: 'clamp(0.9rem, 2vw + 0.5vh, 1.5rem)',
            marginBottom: 'clamp(1.25rem, 4vh, 3rem)',
          }}
        >
          Transformando ideas complejas en interfaces limpias, interactivas y escalables. Apasionado por el rendimiento y el diseño cuidado al detalle.
        </p>

        {/* Action Buttons */}
        <div className="hero-actions">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hero-btn-primary"
          >
            <span className="hero-btn-primary-bg"></span>
            <span className="hero-btn-content">
              Explorar Demos
              <ArrowRight className="hero-btn-icon-hover" />
            </span>
          </a>

          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hero-btn-secondary"
          >
            <span className="hero-btn-content">
              Sobre mi filosofía
            </span>
          </a>
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div
        className="hero-scroll-indicator"
        style={{ marginTop: 'clamp(1.5rem, 4vh, 2.5rem)' }}
      >
        <button
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          className="hero-scroll-btn"
          aria-label="Scroll down"
        >
          <span className="hero-scroll-text">Conocer Más</span>
          <div className="hero-scroll-circle">
            <div className="hero-scroll-circle-bg" />
            <ChevronDown className="hero-scroll-icon" />
          </div>
        </button>
      </div>
    </section>
  );
}