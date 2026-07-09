import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Layers, Server, Smartphone, CheckCircle2, Home, Search, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="projects" ref={containerRef} className="relative min-h-screen py-32 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Proyectos <span className="text-gradient">Destacados</span>
        </h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          Como desarrollador de software freelance, diseño y construyo soluciones completas a medida. Aquí presento mi trabajo más reciente.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-32">
        {/* Proyecto 1: Web */}
        <div className="project-block flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-8">
            <div>
              <h4 className="text-indigo-400 font-semibold tracking-wider uppercase text-sm mb-2">Web Corporativa</h4>
              <h3 className="text-4xl font-bold text-white mb-6">Plataforma Web Inmobiliaria</h3>
              <p className="text-lg text-slate-400 leading-relaxed font-light">
                Desarrollo de una plataforma web completa para una agencia inmobiliaria. Enfocada en la experiencia de usuario, velocidad de carga y SEO, permitiendo a los clientes explorar propiedades de manera intuitiva y contactar a los agentes con facilidad.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">Catálogo de propiedades dinámico y optimizado</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">Diseño responsivo para móviles y escritorio</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass bg-white/5 border border-white/10">
                <span className="text-slate-400"><Layers className="w-4 h-4" /></span>
                <span className="text-sm font-medium text-slate-200">React</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass bg-white/5 border border-white/10">
                <span className="text-slate-400"><Server className="w-4 h-4" /></span>
                <span className="text-sm font-medium text-slate-200">Node.js</span>
              </div>
            </div>
            <div className="pt-4">
              <a href="https://paginawebinmobiliaria.netlify.app/#/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors">
                <ExternalLink className="w-5 h-5" />
                Visitar Sitio Web
              </a>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden glass border border-indigo-500/30 bg-gradient-to-br from-indigo-500/20 to-blue-600/20 flex flex-col items-center justify-center p-8 group shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-12 bg-black/40 backdrop-blur-md flex items-center px-4 gap-2 border-b border-white/10 z-20">
                <div className="w-3 h-3 rounded-full bg-rose-500 border border-white/10" />
                <div className="w-3 h-3 rounded-full bg-amber-500 border border-white/10" />
                <div className="w-3 h-3 rounded-full bg-emerald-500 border border-white/10" />
                <div className="ml-4 flex-1 flex justify-center pr-12">
                   <div className="w-1/2 h-4 bg-white/10 rounded-full" />
                </div>
              </div>
              <div className="w-full h-full mt-8 bg-slate-900 rounded-lg shadow-inner overflow-hidden flex flex-col border border-white/5 relative">
                <div className="h-32 bg-indigo-900/30 w-full mb-4" />
                <div className="px-6 flex gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-white/10 rounded w-3/4" />
                    <div className="h-4 bg-white/10 rounded w-1/2" />
                    <div className="h-24 bg-white/5 rounded w-full mt-4" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-white/10 rounded w-3/4" />
                    <div className="h-4 bg-white/10 rounded w-1/2" />
                    <div className="h-24 bg-white/5 rounded w-full mt-4" />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-medium bg-slate-900/80 px-4 py-2 rounded-full backdrop-blur-md">Previsualización Web</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Proyecto 2: PWA */}
        <div className="project-block flex flex-col md:flex-row-reverse gap-12 items-center">
          <div className="flex-1 space-y-8">
            <div>
              <h4 className="text-emerald-400 font-semibold tracking-wider uppercase text-sm mb-2">Progressive Web App</h4>
              <h3 className="text-4xl font-bold text-white mb-6">App PWA Inmobiliaria</h3>
              <p className="text-lg text-slate-400 leading-relaxed font-light">
                Aplicación móvil multiplataforma desarrollada como PWA. Permite a los usuarios llevar la experiencia de búsqueda de propiedades en su bolsillo, con capacidades offline parciales y una interfaz fluida nativa.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">Instalable en iOS y Android sin pasar por tiendas</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">Rendimiento nativo con animaciones fluidas a 60fps</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass bg-white/5 border border-white/10">
                <span className="text-slate-400"><Smartphone className="w-4 h-4" /></span>
                <span className="text-sm font-medium text-slate-200">Capacitor / PWA</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass bg-white/5 border border-white/10">
                <span className="text-slate-400"><Layers className="w-4 h-4" /></span>
                <span className="text-sm font-medium text-slate-200">React</span>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full">
            {/* Tabs explanation UI */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="glass border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-transparent p-6 rounded-2xl flex flex-col items-center text-center group hover:bg-emerald-500/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Home className="w-6 h-6 text-emerald-400" />
                </div>
                <h5 className="text-white font-medium mb-2">Inicio</h5>
                <p className="text-sm text-slate-400">Panel principal con propiedades destacadas y recomendaciones personalizadas según las preferencias del usuario.</p>
              </div>
              
              <div className="glass border border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 to-transparent p-6 rounded-2xl flex flex-col items-center text-center group hover:bg-cyan-500/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Search className="w-6 h-6 text-cyan-400" />
                </div>
                <h5 className="text-white font-medium mb-2">Catálogo</h5>
                <p className="text-sm text-slate-400">Búsqueda avanzada con filtros por precio, ubicación y características, mostrando resultados en tiempo real.</p>
              </div>

              <div className="glass border border-purple-500/30 bg-gradient-to-b from-purple-500/10 to-transparent p-6 rounded-2xl flex flex-col items-center text-center group hover:bg-purple-500/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-purple-400" />
                </div>
                <h5 className="text-white font-medium mb-2">Contacto</h5>
                <p className="text-sm text-slate-400">Acceso directo para agendar visitas o contactar asesores inmobiliarios vía WhatsApp o llamada telefónica.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}