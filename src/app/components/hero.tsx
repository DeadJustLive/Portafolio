import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';

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
    const animateBlob = (ref: React.RefObject<HTMLDivElement>, delay = 0) => {
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
      className="relative min-h-dvh flex flex-col items-center justify-center px-6 overflow-hidden bg-slate-950"
      style={{ paddingTop: 'clamp(3rem, 8vh, 6rem)', paddingBottom: 'clamp(3rem, 8vh, 5rem)' }}
    >
      {/* Background Ambient Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          ref={blobRef1}
          className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[120px] opacity-70 will-change-transform"
        />
        <div
          ref={blobRef2}
          className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-60 will-change-transform"
        />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djI2aDJWMzRoMjZ2LTJoLTI2VjJoLTJ2MjZIMnYyaDM0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      </div>

      {/* Main Content */}
      <div ref={textRef} className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center">

        {/* Badge */}
        <div
          className="glass px-5 py-2.5 rounded-full flex items-center gap-2 group cursor-pointer hover:bg-white/10 transition-colors"
          style={{ marginBottom: 'clamp(0.75rem, 3vh, 2rem)' }}
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium text-slate-200 tracking-wide">Desarrollador Fullstack &amp; Frontend Specialist</span>
        </div>

        {/* Main Title */}
        <h1
          className="font-bold tracking-tight leading-tight"
          style={{
            fontSize: 'clamp(2rem, 8vw + 1vh, 6rem)',
            marginBottom: 'clamp(0.5rem, 2vh, 1.5rem)',
          }}
        >
          <span className="block text-slate-100">Creando Experiencias</span>
          <span className="block text-gradient">Digitales Premium</span>
        </h1>

        {/* Description */}
        <p
          className="text-slate-400 max-w-3xl font-light leading-relaxed"
          style={{
            fontSize: 'clamp(0.9rem, 2vw + 0.5vh, 1.5rem)',
            marginBottom: 'clamp(1.25rem, 4vh, 3rem)',
          }}
        >
          Transformando ideas complejas en interfaces limpias, interactivas y escalables. Apasionado por el rendimiento y el diseño cuidado al detalle.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 font-semibold text-white transition-all duration-300 ease-in-out bg-transparent border border-white/20 rounded-full overflow-hidden hover:border-white/40 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] w-full sm:w-auto"
          >
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-indigo-600"></span>
            <span className="relative flex items-center gap-2">
              Explorar Demos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 font-semibold text-slate-300 transition-all duration-300 ease-in-out bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-full overflow-hidden hover:text-white hover:border-slate-500 hover:bg-slate-800 w-full sm:w-auto"
          >
            <span className="relative flex items-center gap-2">
              Sobre mi filosofía
            </span>
          </a>
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div
        className="relative z-10 flex flex-col items-center gap-2 opacity-60"
        style={{ marginTop: 'clamp(1.5rem, 4vh, 2.5rem)' }}
      >
        <span className="text-xs tracking-widest uppercase font-medium text-slate-500">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-slate-500 to-transparent" />
      </div>
    </section>
  );
}