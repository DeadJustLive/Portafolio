import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LayoutTemplate, Smartphone, Wrench, Workflow, X, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    icon: LayoutTemplate,
    title: 'Desarrollo Web Fullstack',
    description: 'Creación de plataformas web modernas, rápidas y escalables adaptadas a tus objetivos de negocio.',
    color: 'from-indigo-500 to-blue-500',
    glow: '99, 102, 241',
    details: {
      summary: 'Desarrollo integral de aplicaciones web, desde la interfaz interactiva hasta la lógica robusta del servidor.',
      features: [
        { title: 'Frontend Reactivo', desc: 'Interfaces de usuario fluidas, accesibles y optimizadas para SEO utilizando React y Tailwind CSS.' },
        { title: 'Backend Robusto', desc: 'Construcción de APIs seguras y eficientes preparadas para escalar.' },
        { title: 'Arquitectura de Datos', desc: 'Diseño e implementación de bases de datos relacionales y no relacionales según la necesidad del proyecto.' }
      ]
    }
  },
  {
    id: 2,
    icon: Smartphone,
    title: 'Desarrollo de Aplicaciones',
    description: 'Apps móviles (Android) y de escritorio (Windows/Linux) con rendimiento nativo.',
    color: 'from-emerald-500 to-teal-500',
    glow: '16, 185, 129',
    details: {
      summary: 'Creación de aplicaciones rápidas y multiplataforma (Android, Windows, Linux y Web), excluyendo desarrollo nativo iOS.',
      features: [
        { title: 'Móvil y Escritorio', desc: 'Desarrollo utilizando Ionic/Capacitor para móviles y Tauri para aplicaciones de escritorio super ligeras.' },
        { title: 'Capacidades Offline', desc: 'Funcionamiento sin conexión a internet y sincronización de datos en segundo plano.' },
        { title: 'Código Base Unificado', desc: 'Reducción de costos al usar tecnologías web modernas empaquetadas como aplicaciones reales.' }
      ]
    }
  },
  {
    id: 3,
    icon: Wrench,
    title: 'Servicio Técnico Informático',
    description: 'Mantenimiento preventivo, reparación y optimización de equipos informáticos.',
    color: 'from-red-500 to-rose-500',
    glow: '239, 68, 68',
    details: {
      summary: 'Soluciones técnicas de hardware y software para mantener tus computadoras funcionando a su máxima capacidad.',
      features: [
        { title: 'Sistemas Operativos', desc: 'Instalación limpia, formateo y configuración completa del sistema operativo junto con sus drivers esenciales.' },
        { title: 'Mantenimiento Físico', desc: 'Limpieza interna profunda de componentes y cambio de pasta térmica para evitar el sobrecalentamiento.' },
        { title: 'Actualización de Componentes', desc: 'Sustitución de discos duros (cambio a SSD para mayor velocidad) e instalación de nueva memoria RAM.' }
      ]
    }
  },
  {
    id: 4,
    icon: Workflow,
    title: 'Consultoría y Arquitectura',
    description: 'Asesoría técnica para diseñar sistemas robustos y elegir el stack tecnológico adecuado.',
    color: 'from-amber-500 to-orange-500',
    glow: '245, 158, 11',
    details: {
      summary: 'Planificación estratégica antes de escribir la primera línea de código para asegurar el éxito del proyecto.',
      features: [
        { title: 'Diseño de Sistemas', desc: 'Modelado de la arquitectura de software garantizando escalabilidad y bajo acoplamiento.' },
        { title: 'Auditoría de Código', desc: 'Revisión de proyectos existentes para mejorar rendimiento, seguridad y mantenibilidad.' },
        { title: 'Pruebas de Calidad (QA)', desc: 'Definición de metodologías de testing y validación continua para despliegues seguros.' }
      ]
    }
  }
];

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<typeof services[0] | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.service-card-anim');
    
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );
  }, []);

  // Lock scroll when modal is open
  useEffect(() => {
    if (activeService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [activeService]);

  return (
    <section id="services" className="relative py-32 bg-slate-950" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4">
            Mis Servicios
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Soluciones a tu <span className="text-gradient">Medida</span>
          </h3>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Ofrezco desarrollo integral enfocado en resultados, aplicando ingeniería sólida en cada fase del proyecto.
          </p>
        </div>

        {/* Horizontal Scroll / Grid Container */}
        <div className="flex overflow-x-auto snap-x snap-mandatory md:snap-none md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id} 
                className="service-card-anim snap-center shrink-0 w-[85vw] sm:w-[320px] md:w-auto flex flex-col h-full cursor-pointer group shadow-box rounded-3xl"
                onClick={() => setActiveService(service)}
                style={{ '--glow-color': service.glow } as React.CSSProperties}
              >
                <div className="glass p-8 rounded-3xl flex flex-col h-full border border-white/10 group-hover:border-white/20 transition-all duration-300 overflow-hidden">
                  {/* Hover background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${service.color} shadow-lg relative z-10`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h4 className="text-2xl font-bold text-white mb-4 relative z-10">{service.title}</h4>
                  <p className="text-slate-400 leading-relaxed flex-1 relative z-10">{service.description}</p>
                  
                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-slate-300 group-hover:text-white transition-colors relative z-10">
                    Ver más detalles
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${activeService ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div 
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          onClick={() => setActiveService(null)}
        />
        
        <div 
          className={`glass-card bg-slate-900 border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl transition-all duration-500 delay-100 ${activeService ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'}`}
        >
          {activeService && (
            <>
              {/* Modal Header */}
              <div className={`p-8 border-b border-white/10 bg-gradient-to-br ${activeService.color} bg-opacity-10 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4">
                  <activeService.icon className="w-32 h-32 text-white" />
                </div>
                
                <button 
                  onClick={() => setActiveService(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors z-20"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="relative z-10 pr-12">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 shadow-lg">
                    <activeService.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{activeService.title}</h3>
                  <p className="text-white/80 text-lg leading-relaxed">{activeService.details.summary}</p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8 space-y-8">
                {activeService.details.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="shrink-0 mt-1">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
                      <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="p-8 pt-0">
                <button 
                  onClick={() => {
                    setActiveService(null);
                    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300);
                  }}
                  className="w-full py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors border border-white/5"
                >
                  Solicitar este servicio
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
