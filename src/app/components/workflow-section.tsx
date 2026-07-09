import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessagesSquare, Map, FileSignature, Code2, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: MessagesSquare,
    title: 'Diagnóstico Inicial',
    description: 'Una reunión sin costo para escuchar el dolor de tu negocio. Evaluamos si mi perfil técnico es el adecuado para ayudarte y definimos la viabilidad del proyecto.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30'
  },
  {
    icon: Map,
    title: 'Inmersión y Arquitectura',
    description: 'Salida a terreno si es necesario. Analizo tus procesos reales para diseñar la arquitectura del sistema y entregarte una propuesta técnica exacta, sin funciones genéricas.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/20',
    border: 'border-indigo-500/30'
  },
  {
    icon: FileSignature,
    title: 'Contrato y Kick-off',
    description: 'Para proteger a ambas partes y asegurar seriedad, firmamos un contrato legal de prestación de servicios. El desarrollo inicia formalmente con el pago del 50% de adelanto.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-500/30'
  },
  {
    icon: Code2,
    title: 'Desarrollo Colaborativo',
    description: 'Comienza la construcción. Mantendremos comunicación fluida para que veas avances reales, asegurando que el software responda exactamente a lo que tu negocio necesita.',
    color: 'text-fuchsia-400',
    bg: 'bg-fuchsia-500/20',
    border: 'border-fuchsia-500/30'
  },
  {
    icon: Rocket,
    title: 'Entrega y Despliegue',
    description: 'Fase final de pruebas (QA), pago del saldo restante y lanzamiento oficial. Te entrego la plataforma estable, segura y lista para operar en producción.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/20',
    border: 'border-rose-500/30'
  }
];

export function WorkflowSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const items = containerRef.current.querySelectorAll('.workflow-item');

    // Animate line
    gsap.fromTo(
      lineRef.current,
      { height: 0 },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
          end: 'bottom 80%',
          scrub: 1,
        }
      }
    );

    // Animate items
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          }
        }
      );
    });
  }, []);

  return (
    <section id="workflow" className="relative py-32 bg-slate-950 overflow-hidden" ref={containerRef}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4">
            Metodología Transparente
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Cómo <span className="text-gradient">construimos</span> tu solución
          </h3>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Un proceso colaborativo, seguro y estructurado para garantizar que el resultado final resuelva el problema real de tu negocio.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line Background */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2" />
          
          {/* Vertical Line Animated Progress */}
          <div 
            ref={lineRef}
            className="absolute left-8 md:left-1/2 top-0 w-1 bg-gradient-to-b from-indigo-500 via-emerald-500 to-rose-500 -translate-x-1/2 origin-top rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
          />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const Icon = step.icon;

              return (
                <div key={index} className={`workflow-item relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* Content */}
                  <div className={`flex-1 w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="glass p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-colors relative overflow-hidden group">
                      <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-2 h-full ${step.bg}`} />
                      <h4 className="text-2xl font-bold text-white mb-4">{step.title}</h4>
                      <p className="text-slate-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Icon Node (Center on Desktop, Left on Mobile) */}
                  <div className="absolute left-8 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full glass border-2 ${step.border} ${step.bg} flex items-center justify-center backdrop-blur-xl shadow-xl`}>
                      <Icon className={`w-6 h-6 md:w-8 md:h-8 ${step.color}`} />
                    </div>
                  </div>

                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block flex-1 w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
