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
      className="relative h-screen bg-slate-950 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute top-10 md:top-24 w-full text-center z-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Mi <span className="text-gradient">Enfoque Técnico</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
          Priorizo entender la arquitectura y la lógica. Desliza para explorar.
        </p>
      </div>

      <div ref={cardsRef} className="relative w-full max-w-3xl h-[450px] mt-24 md:mt-32 flex items-center justify-center">
        {skillsList.map((skill, index) => (
          <div
            key={index}
            className="skill-card-slide absolute w-full px-6 flex flex-col items-center text-center"
          >
            <div className={`glass-card rounded-[2rem] p-10 md:p-14 flex flex-col items-center border-t border-l border-white/5 shadow-2xl relative overflow-hidden w-full max-w-2xl mx-auto`}>

              {/* Glow effect matching the tech color */}
              <div className={`absolute -right-20 -top-20 w-64 h-64 ${skill.bg} rounded-full blur-3xl opacity-40 transition-opacity duration-500`} />

              <div className={`w-24 h-24 rounded-3xl ${skill.bg} ${skill.border} border flex items-center justify-center mb-8 relative z-10 shadow-lg`}>
                <div className={skill.color}>{skill.icon}</div>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{skill.name}</h3>

                <div className="inline-block px-4 py-2 rounded-full bg-slate-900 border border-slate-700 text-sm font-medium text-slate-300 mb-8 tracking-wider uppercase shadow-inner">
                  {skill.level}
                </div>

                <p className="text-slate-300 text-lg md:text-xl leading-relaxed mix-blend-lighten max-w-lg font-light">
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