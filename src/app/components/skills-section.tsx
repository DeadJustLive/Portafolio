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
}

const skillsList: Skill[] = [
  { name: 'React & Ecosistema', level: 'Desarrollo Asistido', exp: 'Comprendo la arquitectura, el flujo de estado y componentes. Utilizo IA para agilizar la sintaxis y enfocarme en la visión global del proyecto.', icon: <LayoutTemplate className="w-10 h-10 md:w-12 md:h-12" />, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20' },
  { name: 'TypeScript / JS', level: 'Lectura y Lógica', exp: 'Entiendo la lógica algorítmica y el tipado. Trabajo junto a la IA para transcribir soluciones complejas asegurando que el código cumpla el objetivo de negocio.', icon: <Code2 className="w-10 h-10 md:w-12 md:h-12" />, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' },
  { name: 'Ionic & Capacitor', level: 'Implementación Asistida', exp: 'Conozco el ciclo de vida móvil. Uso asistentes para conectar la capa web con hardware nativo de manera rápida y segura.', icon: <Smartphone className="w-10 h-10 md:w-12 md:h-12" />, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
  { name: 'Tailwind CSS', level: 'Control Visual', exp: 'Traducción directa de ideas de diseño a utilidades de CSS, armando interfaces fluidamente con apoyo de IA para el andamiaje inicial.', icon: <Blocks className="w-10 h-10 md:w-12 md:h-12" />, color: 'text-teal-400', bg: 'bg-teal-400/10', border: 'border-teal-400/20' },
  { name: 'Responsive Web Design', level: 'Maquetación Fluida', exp: 'Enfoque "Mobile-First" asegurando que la interfaz sea escalable, accesible y brinde una experiencia óptima en cualquier tamaño de pantalla.', icon: <MonitorSmartphone className="w-10 h-10 md:w-12 md:h-12" />, color: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/20' },
  { name: 'Supabase & SQL', level: 'Integración Estructural', exp: 'Diseño los modelos de datos relacionales y políticas de seguridad (RLS). La IA me asiste en la sintaxis exacta de las consultas y funciones.', icon: <Database className="w-10 h-10 md:w-12 md:h-12" />, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
  { name: 'Python', level: 'Programación Autónoma', exp: 'Desarrollo nativo e independiente. Creación de servidores, diseño de arquitecturas robustas y automatización de procesos sin necesidad de herramientas generativas.', icon: <Server className="w-10 h-10 md:w-12 md:h-12" />, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
  { name: 'Java', level: 'Arquitectura y POO', exp: 'Desarrollo independiente partiendo desde cero. Diseño e implementación sólida de arquitecturas empresariales, constructores lógicos y APIs escalables con Java.', icon: <Coffee className="w-10 h-10 md:w-12 md:h-12" />, color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' },
  { name: 'GSAP & Animaciones', level: 'Implementación Asistida', exp: 'Visión estética clara de los flujos de interacción. Generación e implementación de timelines de animación colaborando con IA.', icon: <Sparkles className="w-10 h-10 md:w-12 md:h-12" />, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
  { name: 'Scripting & Tools', level: 'Automatización Asistida', exp: 'Automatización de tareas repetitivas y gestión de contenedores con soporte de IA para acelerar configuraciones y scripts.', icon: <Terminal className="w-10 h-10 md:w-12 md:h-12" />, color: 'text-indigo-400', bg: 'bg-indigo-400/10', border: 'border-indigo-400/20' },
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
            className="skill-card glass-card"
          >
            {/* Glow effect on hover */}
            <div className={`skill-card-glow ${skill.bg}`} />
            
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
        <div className={`skill-modal-wrapper ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Backdrop */}
          <div 
            className="skill-modal-backdrop"
            onClick={closeModal}
          />
          
          <div className={`skill-modal-content glass-card ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'}`}>
            {/* Background glow in modal */}
            <div className={`skill-modal-bg-glow ${selectedSkill.bg}`} />
            
            <button
              onClick={closeModal}
              className="skill-modal-close-btn"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="skill-modal-body">
              <div className={`skill-modal-icon-container ${selectedSkill.bg} ${selectedSkill.border}`}>
                <div className={selectedSkill.color} style={{ transform: 'scale(1.2)' }}>
                  {selectedSkill.icon}
                </div>
              </div>

              <h3 className="skill-modal-title">
                {selectedSkill.name}
              </h3>

              <div className="skill-modal-level">
                {selectedSkill.level}
              </div>

              <p className="skill-modal-exp">
                {selectedSkill.exp}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}