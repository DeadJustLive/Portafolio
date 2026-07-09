import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from './components/navigation';
import { Hero } from './components/hero';
import { AboutMe } from './components/about-me';
import { ServicesSection } from './components/services-section';
import { SkillsSection } from './components/skills-section';
import { ProjectsSection } from './components/projects-section';
import { WorkflowSection } from './components/workflow-section';
import { PricingSection } from './components/pricing-section';
import { ContactSection } from './components/contact-section';
import { Footer } from './components/footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Volver siempre al inicio al cargar/recargar la página
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Smooth scroll configuration - Disable on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
      const smoothScroll = () => {
        const scrollSpeed = 1.2;
        let currentScroll = window.pageYOffset;
        let targetScroll = currentScroll;

        const animate = () => {
          currentScroll += (targetScroll - currentScroll) * 0.1;

          if (Math.abs(targetScroll - currentScroll) > 0.5) {
            requestAnimationFrame(animate);
          }
        };

        window.addEventListener('wheel', (e) => {
          targetScroll += e.deltaY * scrollSpeed;
          targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));
          animate();
        }, { passive: true });
      };
      
      smoothScroll();
    }

    // Configuración global de GSAP
    gsap.config({
      nullTargetWarn: false,
      force3D: true, // Optimizar para hardware acceleration
    });

    // Reducir lag de ScrollTrigger en móvil
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 100
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-slate-950 font-sans selection:bg-indigo-500/30">
      <Navigation />
      <Hero />
      <AboutMe />
      <ServicesSection />
      <SkillsSection />
      <ProjectsSection />
      <WorkflowSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </div>
  );
}