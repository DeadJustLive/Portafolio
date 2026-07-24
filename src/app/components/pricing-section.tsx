import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Laptop, Wrench, CheckCircle2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.pricing-card');
    
    gsap.fromTo(
      cards,
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

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="pricing" className="relative py-32 px-6 bg-slate-950 overflow-hidden" ref={containerRef}>
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-emerald-400 uppercase mb-4">
            Tu Inversión
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Soluciones de valor, <span className="text-gradient">no plantillas</span>
          </h3>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            No ofrezco soluciones genéricas porque cada negocio tiene dolores únicos. La inversión se calcula estrictamente en base a la complejidad del problema y el retorno que mi solución le traerá a tu empresa.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Tarjeta 1: Web Corporativa */}
          <div className="pricing-card glass-card bg-slate-900/50 rounded-3xl p-8 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 flex flex-col relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform">
              <Laptop className="w-7 h-7" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-2">Presencia Web</h4>
            <p className="text-slate-400 mb-6 min-h-[60px]">
              Landing pages y sitios web institucionales diseñados para destacar tu marca.
            </p>
            <div className="space-y-4 mb-8 flex-1">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">Diseño enfocado en usabilidad (UX/UI)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">Optimización de rendimiento y SEO básico</span>
              </div>
            </div>
            <div className="pt-6 border-t border-white/10 mt-auto">
              <p className="text-sm font-medium text-slate-400 mb-1">Inversión inicial desde:</p>
              <p className="text-2xl font-bold text-indigo-300">$75.000 CLP</p>
            </div>
          </div>

          {/* Tarjeta 2: Software a la Medida (Destacada) */}
          <div className="pricing-card glass-card bg-slate-900/80 rounded-3xl p-8 border border-emerald-500/30 hover:border-emerald-500 transition-all duration-300 relative overflow-hidden flex flex-col group transform md:-translate-y-4">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
              <Building2 className="w-7 h-7" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-2">Desarrollo de Software</h4>
            <p className="text-slate-400 mb-6 min-h-[60px]">
              Sistemas de gestión, plataformas web y herramientas a la medida para Empresas y PYMEs.
            </p>
            <div className="space-y-4 mb-8 flex-1">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">Para PYMEs: Opción de pago mensual a plazos (hasta 12 meses).</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">Cobro inicial de instalación (Set-up Fee) según requerimientos.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm text-opacity-80">Cancelación anticipada permitida abonando el saldo del desarrollo.</span>
              </div>
            </div>
            <div className="pt-6 border-t border-emerald-500/30 mt-auto">
              <p className="text-sm font-medium text-emerald-400/80 mb-1">Mensualidad desde:</p>
              <p className="text-2xl font-bold text-emerald-400">$45.000 CLP</p>
            </div>
          </div>

          {/* Tarjeta 3: Consultoría */}
          <div className="pricing-card glass-card bg-slate-900/50 rounded-3xl p-8 border border-white/10 hover:border-rose-500/50 transition-all duration-300 flex flex-col relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 flex items-center justify-center mb-6 text-rose-400 group-hover:scale-110 transition-transform">
              <Wrench className="w-7 h-7" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-2">Consultoría Técnica</h4>
            <p className="text-slate-400 mb-6 min-h-[60px]">
              Análisis de viabilidad, diseño de arquitectura de software y elaboración de prototipos.
            </p>
            <div className="space-y-4 mb-8 flex-1">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">Entrega de informe detallado y diseño visual del proyecto.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">Propiedad total sobre los diseños y especificaciones técnicas entregadas.</span>
              </div>
            </div>
            <div className="pt-6 border-t border-white/10 mt-auto">
              <p className="text-sm font-medium text-slate-400 mb-1">Honorarios desde:</p>
              <p className="text-2xl font-bold text-rose-300">$25.000 CLP</p>
            </div>
          </div>
          
        </div>

        <div className="mt-16 flex flex-col items-center justify-center">
          <a 
            href="#contact" 
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold text-white transition-all duration-300 ease-in-out bg-indigo-600 rounded-full overflow-hidden hover:bg-indigo-500"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="relative flex items-center gap-3">
              Agendar Llamada de Diagnóstico
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <p className="mt-4 text-slate-400 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Totalmente gratuita y sin compromiso.
          </p>
        </div>

      </div>
    </section>
  );
}
