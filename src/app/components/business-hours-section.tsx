import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, AlertTriangle, MessageCircle, ShieldAlert } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function BusinessHoursSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      containerRef.current.querySelectorAll('.animate-up'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <section id="business-hours" ref={containerRef} className="relative py-24 bg-slate-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center bg-slate-950/50 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="flex-1 animate-up z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass bg-white/5 border border-white/10 mb-6">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-slate-300 tracking-wide uppercase">Disponibilidad</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Atención a <span className="text-amber-400">Clientes</span>
            </h2>
            
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              Para garantizar la calidad de mi trabajo y mantener un equilibrio saludable, tengo un horario establecido para consultas, reuniones y soporte general.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-white font-medium">Lunes a Viernes</span>
                <span className="text-amber-400 font-bold">10:00 - 19:00</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-white font-medium">Sábados</span>
                <span className="text-amber-400 font-bold">10:00 - 14:00</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 opacity-60">
                <span className="text-white font-medium">Domingos y Festivos</span>
                <span className="text-slate-400 font-bold">Cerrado</span>
              </div>
            </div>
          </div>

          <div className="flex-1 animate-up z-10">
            <div className="glass-card bg-indigo-950/20 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <MessageCircle className="w-24 h-24 text-indigo-500" />
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-indigo-400" />
                <h3 className="text-xl font-bold text-white">Tiempos de Respuesta</h3>
              </div>
              
              <p className="text-slate-300 mb-4 leading-relaxed">
                Para ofrecerte el <strong>100% de enfoque y creatividad</strong> en tus proyectos, reservo mis horarios nocturnos y los domingos para descansar y recargar energías.
              </p>
              
              <div className="bg-indigo-950/40 border border-indigo-500/30 p-4 rounded-xl flex gap-4">
                <Clock className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-slate-300">
                    Cualquier mensaje o consulta recibida fuera de este horario será revisada con prioridad a primera hora del <strong>siguiente día hábil</strong>. <br/><span className="text-xs text-slate-400 mt-2 block">* A excepción de urgencias críticas (ej. caída de servidor) para clientes activos.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
