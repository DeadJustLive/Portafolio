import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Layers, Server, Smartphone, Database, CheckCircle2, Play } from 'lucide-react';

import { DailyBiteDemo } from './demos/DailyBiteDemo';
import { StockSimpleDemo } from './demos/StockSimpleDemo';
import { SaaSDemo } from './demos/SaaSDemo';
import { AppDemoModal } from './demos/AppDemoModal';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'dailybite',
    title: 'DailyBite',
    subtitle: 'App de Nutrición y Control de Porciones',
    description: 'Aplicación PWA construida con Capacitor que permite a los usuarios llevar un registro visual de su ingesta calórica diaria mediante un sistema gamificado de porciones intercambiables.',
    tech: [
      { name: 'React', icon: <Layers className="w-4 h-4" /> },
      { name: 'Capacitor', icon: <Smartphone className="w-4 h-4" /> },
      { name: 'Tailwind CSS', icon: <Layers className="w-4 h-4" /> }
    ],
    color: 'from-orange-500/20 to-red-600/20',
    borderColor: 'border-orange-500/30',
    highlights: [
      'Navegación táctil fluida (Floating Bar)',
      'Persistencia offline-first de estadísticas',
      'Configuración personalizada de macronutrientes'
    ],
    demoComponent: <DailyBiteDemo />
  },
  {
    id: 'stocksimple',
    title: 'StockSimple Track',
    subtitle: 'Control de Inventario Multi-almacén',
    description: 'Software de trazabilidad de inventario construido para precisión y velocidad. Cuenta con escaneo nativo de códigos QR, alertas predictivas de stock bajo y reportes automatizados en PDF.',
    tech: [
      { name: 'React Native', icon: <Smartphone className="w-4 h-4" /> },
      { name: 'Electron', icon: <Server className="w-4 h-4" /> },
      { name: 'SQLite', icon: <Database className="w-4 h-4" /> }
    ],
    color: 'from-blue-500/20 to-cyan-600/20',
    borderColor: 'border-cyan-500/30',
    highlights: [
      'Sincronización offline-first robusta',
      'Motor de escaneo QR de alta fidelidad',
      'Gráficos de tendencias y consumo proyectado'
    ],
    demoComponent: <StockSimpleDemo />
  },
  {
    id: 'saastemplate',
    title: 'SaaS Dashboard Template',
    subtitle: 'Plantilla de Sistema de Gestión SaaS',
    description: 'Plantilla de interfaz SaaS de alto rendimiento con dashboard de métricas, gestión de usuarios, planes de suscripción y configuración avanzada. Diseñada para ser base de cualquier sistema de gestión empresarial.',
    tech: [
      { name: 'React', icon: <Layers className="w-4 h-4" /> },
      { name: 'Tailwind CSS', icon: <Layers className="w-4 h-4" /> },
      { name: 'TypeScript', icon: <Server className="w-4 h-4" /> }
    ],
    color: 'from-purple-500/20 to-pink-600/20',
    borderColor: 'border-purple-500/30',
    highlights: [
      'Dashboard con métricas clave en tiempo real',
      'Sistema de roles y gestión de usuarios',
      'Onboarding y planes de suscripción integrados'
    ],
    demoComponent: <SaaSDemo />
  }
];

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Estado para controlar qué demo está abierto modalmente (null = ninguno)
  const [activeDemoId, setActiveDemoId] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const projectBlocks = containerRef.current.querySelectorAll('.project-block');

    projectBlocks.forEach((block) => {
      gsap.fromTo(
        block,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 75%',
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const activeProject = projects.find(p => p.id === activeDemoId);

  return (
    <section id="projects" ref={containerRef} className="relative min-h-screen py-32 bg-slate-950">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Sistemas & <span className="text-gradient">Aplicaciones Reales</span>
        </h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          Explora la arquitectura técnica y el valor de negocio detrás de mis desarrollos clave.
          Abre la simulación interactiva para evaluar el diseño de la interfaz y su adaptabilidad a dispositivos en tiempo real.
        </p>
      </div>

      {/* Projects Timeline */}
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <div key={project.id} className={`project-block flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>

              {/* Info Column */}
              <div className="flex-1 space-y-8">
                <div>
                  <h4 className="text-indigo-400 font-semibold tracking-wider uppercase text-sm mb-2">{project.subtitle}</h4>
                  <h3 className="text-4xl font-bold text-white mb-6">{project.title}</h3>
                  <p className="text-lg text-slate-400 leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {project.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300">{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                  {project.tech.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full glass bg-white/5 border border-white/10">
                      <span className="text-slate-400">{t.icon}</span>
                      <span className="text-sm font-medium text-slate-200">{t.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demo Mockup Column (now a trigger button) */}
              <div className="flex-1 w-full relative">
                <div
                  className={`relative w-full aspect-[4/3] rounded-2xl md:rounded-[2rem] overflow-hidden glass border ${project.borderColor} bg-gradient-to-br ${project.color} flex flex-col items-center justify-center p-8 group cursor-pointer shadow-2xl hover:shadow-${project.color.split('-')[1]}-500/40 transition-shadow duration-500`}
                  onClick={() => setActiveDemoId(project.id)}
                >

                  {/* Decorativo de ventana estilo macOS */}
                  <div className="absolute top-0 left-0 w-full h-12 bg-black/40 backdrop-blur-md flex items-center px-4 gap-2 border-b border-white/10 z-20">
                    <div className="w-3 h-3 rounded-full bg-rose-500 border border-white/10" />
                    <div className="w-3 h-3 rounded-full bg-amber-500 border border-white/10" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500 border border-white/10" />
                    <div className="ml-4 flex-1 text-center pr-12 text-xs font-mono text-slate-400/80 tracking-widest uppercase">
                      App Simulator
                    </div>
                  </div>

                  {/* Content Play Button */}
                  <div className="mt-8 text-center space-y-6 relative z-10 transition-transform duration-500 group-hover:scale-105">
                    <div className="w-20 h-20 mx-auto rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-2xl backdrop-blur-sm group-hover:bg-indigo-500 transition-colors duration-300 text-white">
                      <Play className="w-8 h-8 ml-1" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-bold text-white tracking-wide">Abrir Demo Interactiva</h4>
                      <p className="text-sm text-slate-300 font-light max-w-xs mx-auto">
                        Haz clic para lanzar el simulador PWA de {project.title}
                      </p>
                    </div>
                  </div>

                  {/* Overlay Interaction Hint */}
                  <div className="absolute inset-0 z-30 pointer-events-none rounded-[2rem] border-2 border-transparent transition-all duration-300 group-hover:border-white/20" />
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Interactive Rendering Modal */}
      {activeProject && (
        <AppDemoModal
          isOpen={!!activeDemoId}
          onClose={() => setActiveDemoId(null)}
          title={`Simulando: ${activeProject.title}`}
          mobileOnly={activeProject.id === 'stocksimple' || activeProject.id === 'dailybite'}
          forceWide={activeProject.id === 'saastemplate'}
        >
          {activeProject.demoComponent}
        </AppDemoModal>
      )}

    </section>
  );
}