import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Building2, Store, Wrench, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      containerRef.current.querySelectorAll('.pricing-card'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );
  }, []);

  return (
    <section id="pricing" className="relative py-32 bg-slate-950 overflow-hidden" ref={containerRef}>
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full filter blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4">
            Inversión y Modelos de Trabajo
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Transparencia en <span className="text-gradient">Costos</span>
          </h3>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Cada proyecto es único. Los valores a continuación son <strong className="text-white">referenciales</strong>. El presupuesto final se define tras una reunión técnica, adaptando el modelo de cobro según si eres una empresa que requiere propiedad total, o una PYME que busca un modelo accesible de suscripción.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: PYMEs (SaaS) */}
          <div className="pricing-card glass p-8 rounded-3xl border border-white/10 hover:border-emerald-500/50 transition-all duration-300 relative flex flex-col overflow-hidden transform-gpu">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-3xl" />
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
              <Store className="w-6 h-6 text-emerald-400" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-2">Modelo PYME (SaaS)</h4>
            <p className="text-slate-400 text-sm mb-6">Ideal para emprendedores y negocios locales.</p>
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-white">Desde $290.000 CLP</span>
              <p className="text-slate-400 text-sm mt-1">(Ref: ~$300 USD)</p>
              <p className="text-emerald-400 font-semibold mt-2">+ Mensualidad (desde $45.000 CLP)</p>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-slate-300">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Pago inicial bajo por personalización e instalación.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Suscripción mensual que incluye hosting y mantenimiento.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Uso de la plataforma como servicio (licencia de uso).</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Empresas (Custom) */}
          <div className="pricing-card glass bg-indigo-950/30 p-8 rounded-3xl border border-indigo-500/30 hover:border-indigo-400 transition-all duration-300 relative flex flex-col transform md:-translate-y-4 overflow-hidden transform-gpu">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-t-3xl" />
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              A Medida
            </div>
            
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6 mt-2">
              <Building2 className="w-6 h-6 text-indigo-400" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-2">Desarrollo a Medida</h4>
            <p className="text-slate-400 text-sm mb-6">Para empresas que requieren sistemas exclusivos.</p>
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-white flex items-center gap-2">
                Desde $1.400.000 CLP
              </span>
              <p className="text-slate-400 text-sm mt-1">(Ref: ~$1,500 USD)</p>
              <p className="text-slate-400 text-sm mt-2">Cobro por trabajo realizado y alcance, no por hora.</p>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-slate-300">
                <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span>Soluciones exactas: Resolvemos problemas reales sin funciones genéricas que no necesitas.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span>Flexibilidad: Opción de entrega de código fuente o modelo de suscripción (SaaS).</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span>Arquitectura escalable diseñada exclusivamente para las reglas de tu negocio.</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Servicio Técnico */}
          <div className="pricing-card glass p-8 rounded-3xl border border-white/10 hover:border-rose-500/50 transition-all duration-300 relative flex flex-col overflow-hidden transform-gpu">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-rose-500 rounded-t-3xl" />
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center mb-6">
              <Wrench className="w-6 h-6 text-rose-400" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-2">Servicio Técnico</h4>
            <p className="text-slate-400 text-sm mb-6">Mantenimiento local de hardware y software.</p>
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-white">Desde $30.000 CLP</span>
              <p className="text-slate-400 text-sm mt-1">(Ref: ~$35 USD)</p>
              <p className="text-slate-400 text-sm mt-2">Dependiendo del equipo y complejidad.</p>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-slate-300">
                <Check className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <span>Formateos e instalación de Sistemas Operativos.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <Check className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <span>Limpieza física profunda y cambio de pasta térmica.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <Check className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <span>Upgrades de Hardware (Instalación de SSD, RAM).</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 ease-in-out bg-slate-800 rounded-full hover:bg-slate-700 border border-white/10"
          >
            Agendar reunión para cotizar
          </button>
        </div>
      </div>
    </section>
  );
}
