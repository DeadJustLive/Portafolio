import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, LayoutTemplate, Database, Server, Blocks, Smartphone, Sparkles, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillsList = [
  { name: 'React & Ecosistema', level: 'Desarrollo Asistido', exp: 'Comprendo la arquitectura, el flujo de estado y componentes. Utilizo IA para agilizar la sintaxis y enfocarme en la visión global del proyecto.', icon: <LayoutTemplate className="w-12 h-12" />, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20' },
  { name: 'TypeScript / JS', level: 'Lectura y Lógica', exp: 'Entiendo la lógica algorítmica y el tipado. Trabajo junto a la IA para transcribir soluciones complejas asegurando que el código cumpla el objetivo de negocio.', icon: <Code2 className="w-12 h-12" />, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' },
  { name: 'Ionic & Capacitor', level: 'Implementación Asistida', exp: 'Conozco el ciclo de vida móvil. Uso asistentes para conectar la capa web con hardware nativo de manera rápida y segura.', icon: <Smartphone className="w-12 h-12" />, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
  { name: 'Tailwind CSS', level: 'Control Visual', exp: 'Traducción directa de ideas de diseño a utilidades de CSS, armando interfaces fluidamente con apoyo de IA para el andamiaje inicial.', icon: <Blocks className="w-12 h-12" />, color: 'text-teal-400', bg: 'bg-teal-400/10', border: 'border-teal-400/20' },
  { name: 'Supabase & SQL', level: 'Integración Estructural', exp: 'Diseño los modelos de datos relacionales y políticas de seguridad (RLS). La IA me asiste en la sintaxis exacta de las consultas y funciones.', icon: <Database className="w-12 h-12" />, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
  { name: 'Python & Node Backend', level: 'Desarrollo Guiado', exp: 'Capacidad para leer, comprender y estructurar lógica de backend, delegando la escritura de boilerplate a herramientas generativas.', icon: <Server className="w-12 h-12" />, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
  { name: 'GSAP & Animaciones', level: 'Implementación Asistida', exp: 'Visión estética clara de los flujos de interacción. Generación e implementación de timelines de animación colaborando con IA.', icon: <Sparkles className="w-12 h-12" />, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
  { name: 'Scripting & Tools', level: 'Automatización Asistida', exp: 'Automatización de tareas repetitivas y gestión de contenedores con soporte de IA para acelerar configuraciones y scripts.', icon: <Terminal className="w-12 h-12" />, color: 'text-indigo-400', bg: 'bg-indigo-400/10', border: 'border-indigo-400/20' },
];

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.skill-card-slide');

      // Pin the section and animate cards based on scroll progress
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${cards.length * 100}%`, // Scroll length depends on the number of cards
          scrub: 1,
          pin: true,
        }
      });

      // Set initial states: only the first card is visible, the rest are below
      gsap.set(cards, { opacity: 0, y: 150, scale: 0.8 });
      gsap.set(cards[0], { opacity: 1, y: 0, scale: 1 });

      cards.forEach((card, i) => {
        // Enters from bottom (skip the first card since it's already there)
        if (i > 0) {
          tl.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out"
          }, ">-0.5"); // overlap with the exit of the previous card
        }

        // Add a small pause in the center for readability
        tl.to(card, { duration: 0.5 }, ">");

        // Exits to top (skip the last card so it stays on screen)
        if (i < cards.length - 1) {
          tl.to(card, {
            opacity: 0,
            y: -150,
            scale: 0.8,
            duration: 1,
            ease: "power2.in"
          }, ">");
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-dvh bg-slate-950 flex flex-col items-center justify-center overflow-hidden py-12 md:py-20"
    >
      <div className="relative w-full text-center z-20 px-6 shrink-0" style={{ marginBottom: 'clamp(1.5rem, 5vh, 4rem)' }}>
        <h2
          className="font-bold text-white leading-tight"
          style={{ fontSize: 'clamp(1.8rem, 4vw + 1vh, 3.5rem)', marginBottom: 'clamp(0.5rem, 1vh, 1rem)' }}
        >
          Mi <span className="text-gradient">Enfoque Técnico</span>
        </h2>
        <p
          className="text-slate-400 max-w-2xl mx-auto font-light"
          style={{ fontSize: 'clamp(0.9rem, 1.5vw + 0.5vh, 1.15rem)' }}
        >
          Priorizo entender la arquitectura y la lógica. Desliza para explorar.
        </p>
      </div>

      <div
        ref={cardsRef}
        className="relative w-full max-w-3xl flex items-center justify-center shrink-0"
        style={{ height: 'clamp(320px, 55vh, 450px)' }}
      >
        {skillsList.map((skill, index) => (
          <div
            key={index}
            className="skill-card-slide absolute w-full px-6 flex flex-col items-center text-center"
          >
            <div className={`glass-card rounded-[2rem] flex flex-col items-center border-t border-l border-white/5 shadow-2xl relative overflow-hidden w-full max-w-2xl mx-auto`}
              style={{ padding: 'clamp(1.5rem, 5vh, 3.5rem) clamp(1rem, 5vw, 3.5rem)' }}
            >

              {/* Glow effect matching the tech color */}
              <div className={`absolute -right-20 -top-20 w-64 h-64 ${skill.bg} rounded-full blur-3xl opacity-40 transition-opacity duration-500`} />

              <div
                className={`rounded-3xl ${skill.bg} ${skill.border} border flex items-center justify-center relative z-10 shadow-lg shrink-0`}
                style={{
                  width: 'clamp(3.5rem, 10vh, 6rem)',
                  height: 'clamp(3.5rem, 10vh, 6rem)',
                  marginBottom: 'clamp(1rem, 3vh, 2rem)'
                }}
              >
                <div className={skill.color} style={{ transform: 'scale(clamp(0.6, 5vh, 1))' }}>
                  {skill.icon}
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center w-full">
                <h3
                  className="font-bold text-white leading-tight"
                  style={{ fontSize: 'clamp(1.4rem, 4vh, 2.5rem)', marginBottom: 'clamp(0.5rem, 2vh, 1.5rem)' }}
                >
                  {skill.name}
                </h3>

                <div
                  className="inline-block px-4 py-1.5 md:py-2 rounded-full bg-slate-900 border border-slate-700 font-medium text-slate-300 tracking-wider uppercase shadow-inner"
                  style={{ fontSize: 'clamp(0.65rem, 1.5vh, 0.875rem)', marginBottom: 'clamp(1rem, 3vh, 2rem)' }}
                >
                  {skill.level}
                </div>

                <p
                  className="text-slate-300 leading-relaxed mix-blend-lighten max-w-lg font-light"
                  style={{ fontSize: 'clamp(0.85rem, 2vh, 1.15rem)' }}
                >
                  {skill.exp}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}