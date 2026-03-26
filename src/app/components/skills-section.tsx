import { useState, useEffect, ReactNode } from 'react';
import { Code2, LayoutTemplate, Database, Server, Blocks, Smartphone, Sparkles, Terminal, X, Coffee, MonitorSmartphone } from 'lucide-react';
import './skills-section.css';

interface Skill {
  name: string;
  level: string;
  exp: string;
  icon: ReactNode;
  color: string;
  bg: string;
  border: string;
  glowColor: string;
}

const skillsList: Skill[] = [
  { name: 'React & Ecosistema', level: 'Desarrollo Asistido', exp: 'Comprendo la arquitectura, el flujo de estado y componentes. Utilizo IA para agilizar la sintaxis y enfocarme en la visión global del proyecto.', icon: <LayoutTemplate className="w-10 h-10 md:w-12 md:h-12" />, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20', glowColor: '34, 211, 238' },
  { name: 'TypeScript / JS', level: 'Lectura y Lógica', exp: 'Entiendo la lógica algorítmica y el tipado. Trabajo junto a la IA para transcribir soluciones complejas asegurando que el código cumpla el objetivo de negocio.', icon: <Code2 className="w-10 h-10 md:w-12 md:h-12" />, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', glowColor: '250, 204, 21' },
  { name: 'Ionic & Capacitor', level: 'Implementación Asistida', exp: 'Conozco el ciclo de vida móvil. Uso asistentes para conectar la capa web con hardware nativo de manera rápida y segura.', icon: <Smartphone className="w-10 h-10 md:w-12 md:h-12" />, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', glowColor: '96, 165, 250' },
  { name: 'Tailwind CSS', level: 'Control Visual', exp: 'Traducción directa de ideas de diseño a utilidades de CSS, armando interfaces fluidamente con apoyo de IA para el andamiaje inicial.', icon: <Blocks className="w-10 h-10 md:w-12 md:h-12" />, color: 'text-teal-400', bg: 'bg-teal-400/10', border: 'border-teal-400/20', glowColor: '45, 212, 191' },
  { name: 'Responsive Web Design', level: 'Maquetación Fluida', exp: 'Enfoque "Mobile-First" asegurando que la interfaz sea escalable, accesible y brinde una experiencia óptima en cualquier tamaño de pantalla.', icon: <MonitorSmartphone className="w-10 h-10 md:w-12 md:h-12" />, color: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/20', glowColor: '244, 114, 182' },
  { name: 'Supabase & SQL', level: 'Integración Estructural', exp: 'Diseño los modelos de datos relacionales y políticas de seguridad (RLS). La IA me asiste en la sintaxis exacta de las consultas y funciones.', icon: <Database className="w-10 h-10 md:w-12 md:h-12" />, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20', glowColor: '52, 211, 153' },
  { name: 'Python', level: 'Programación Autónoma', exp: 'Desarrollo nativo e independiente. Creación de servidores, diseño de arquitecturas robustas y automatización de procesos sin necesidad de herramientas generativas.', icon: <Server className="w-10 h-10 md:w-12 md:h-12" />, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20', glowColor: '74, 222, 128' },
  { name: 'Java', level: 'Arquitectura y POO', exp: 'Desarrollo independiente partiendo desde cero. Diseño e implementación sólida de arquitecturas empresariales, constructores lógicos y APIs escalables con Java.', icon: <Coffee className="w-10 h-10 md:w-12 md:h-12" />, color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20', glowColor: '251, 146, 60' },
  { name: 'GSAP & Animaciones', level: 'Implementación Asistida', exp: 'Visión estética clara de los flujos de interacción. Generación e implementación de timelines de animación colaborando con IA.', icon: <Sparkles className="w-10 h-10 md:w-12 md:h-12" />, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', glowColor: '192, 132, 252' },
  { name: 'Scripting & Tools', level: 'Automatización Asistida', exp: 'Automatización de tareas repetitivas y gestión de contenedores con soporte de IA para acelerar configuraciones y scripts.', icon: <Terminal className="w-10 h-10 md:w-12 md:h-12" />, color: 'text-indigo-400', bg: 'bg-indigo-400/10', border: 'border-indigo-400/20', glowColor: '129, 140, 248' },
];

export function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger modal visibility transition
  useEffect(() => {
    if (selectedSkill) {
      document.body.style.overflow = 'hidden';
      // Small timeout to allow render before adding the visible class for transition
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
      setIsVisible(false);
    }
  }, [selectedSkill]);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => setSelectedSkill(null), 300); // Wait for transition
  };

  return (
    <section id="skills" className="skills-section">
      <div className="skills-header">
        <h2 className="skills-title">
          Mi <span className="text-gradient">Enfoque Técnico</span>
        </h2>
        <p className="skills-subtitle">
          Priorizo entender la arquitectura y la lógica. Selecciona una habilidad para explorar.
        </p>
      </div>

      <div className="skills-grid">
        {skillsList.map((skill, index) => (
          <button
            key={index}
            onClick={() => setSelectedSkill(skill)}
            className="skill-card glass-card group"
            style={{ '--glow-color': skill.glowColor } as React.CSSProperties}
          >
            {/* Page Curl Indicator */}
            <div className="absolute top-[0px] right-[0px] w-10 h-10 pointer-events-none z-20 transition-all duration-500 overflow-visible group-hover:w-16 group-hover:h-16">
              <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
                <path d="M-1 -1H41V41L-1 -1Z" fill="#020617" />
                <path d="M0 0 L40 40 L6 40 Q0 40 0 34 Z" fill={`url(#flapGrad-${index})`} filter="url(#flapShadow)" />
                <defs>
                  <linearGradient id={`flapGrad-${index}`} x1="40" y1="40" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor={`rgba(${skill.glowColor}, 0.8)`} />
                    <stop offset="100%" stopColor={`rgba(${skill.glowColor}, 0.1)`} />
                  </linearGradient>
                  <filter id="flapShadow" x="-20" y="-20" width="80" height="80" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feDropShadow dx="-2" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.6" />
                  </filter>
                </defs>
              </svg>
            </div>

            <div className={`skill-icon-container ${skill.bg} ${skill.border}`}>
              <div className={skill.color}>{skill.icon}</div>
            </div>
            
            <h3 className="skill-card-title">
              {skill.name}
            </h3>
          </button>
        ))}
      </div>

      {/* Modal Overlay */}
      {selectedSkill && (
        <div className={`skill-modal-wrapper ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {/* Backdrop */}
          <div 
            className="skill-modal-backdrop"
            onClick={closeModal}
          />
          
          <div 
            className={`relative p-8 md:p-10 w-full max-w-[46rem] mx-auto transform-gpu transition-all duration-500 flex flex-col ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-12 scale-95'}`}
            style={{ filter: `drop-shadow(0 0 35px rgba(${selectedSkill.glowColor}, 0.5))` }}
          >
            
            {/* Modal Page Curl Flap */}
            <div className="absolute top-[32px] right-[32px] md:top-[40px] md:right-[40px] w-[64px] h-[64px] pointer-events-none z-30">
              <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" style={{ overflow: 'visible' }}>
                <path d="M0 0 L64 64 L10 64 Q0 64 0 54 Z" fill="url(#modalFlapGrad)" filter="url(#modalFlapShadow)" />
                <defs>
                  <linearGradient id="modalFlapGrad" x1="64" y1="64" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor={`rgba(${selectedSkill.glowColor}, 0.9)`} />
                    <stop offset="100%" stopColor={`rgba(${selectedSkill.glowColor}, 0.2)`} />
                  </linearGradient>
                  <filter id="modalFlapShadow" x="-20" y="-20" width="100" height="100" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feDropShadow dx="-4" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
                  </filter>
                </defs>
              </svg>
            </div>

            {/* The Clipped Glass Modal Body */}
            <div 
              className="w-full rounded-[2.5rem] border border-white/10 p-8 md:p-14 z-10 bg-slate-900/40 backdrop-blur-3xl relative overflow-hidden"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 64px) 0, 100% 64px, 100% 100%, 0 100%)',
                borderColor: `rgba(${selectedSkill.glowColor}, 0.5)`
              }}
            >
              {/* Background neon glow inside modal */}
              <div 
                className="absolute -right-20 -top-20 w-72 h-72 rounded-full blur-[60px] pointer-events-none" 
                style={{ backgroundColor: `rgb(${selectedSkill.glowColor})`, opacity: 0.2 }} 
              />
              
              <button
                onClick={closeModal}
                className="skill-modal-close-btn"
                aria-label="Cerrar detalles"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <div className="skill-modal-body">
                <div className={`skill-modal-icon-container ${selectedSkill.bg}`} style={{ borderColor: `rgba(${selectedSkill.glowColor}, 0.3)` }}>
                  <div className={selectedSkill.color} style={{ transform: 'scale(1.4)' }}>
                    {selectedSkill.icon}
                  </div>
                </div>

                <h3 className="skill-modal-title">
                  {selectedSkill.name}
                </h3>

                <div className="skill-modal-level">
                  {selectedSkill.level}
                </div>

                <p className="skill-modal-exp text-slate-300 leading-relaxed font-light text-lg md:text-xl max-w-xl mx-auto">
                  {selectedSkill.exp}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}