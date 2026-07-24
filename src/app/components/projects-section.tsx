import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Layers, Server, Smartphone, CheckCircle2, Home, Search, Phone, LayoutDashboard, MessageSquare, Star, Settings, X, Image as ImageIcon, ChevronLeft, ChevronRight, ChevronUp, BookOpen } from 'lucide-react';
import { CaseStudyModal } from './case-study-modal';

gsap.registerPlugin(ScrollTrigger);

type AppTab = {
  id: string;
  title: string;
  desc: string;
  icon: any;
  borderHover: string;
  bgHover: string;
  iconBgHover: string;
  iconColor: string;
};

const appTabs: AppTab[] = [
  { id: 'Publicaciones', title: 'Publicaciones', desc: 'CRUD interactivo para gestión completa del catálogo de inmuebles, con vistas tácticas y operacionales.', icon: Home, borderHover: 'hover:border-emerald-500', bgHover: 'hover:bg-emerald-950/20', iconBgHover: 'group-hover:bg-emerald-500/20', iconColor: 'text-emerald-400' },
  { id: 'MenuEdicionPublicaciones_01', title: 'Gestión de Inmuebles', desc: 'Formularios avanzados para edición de propiedades, con borradores locales y persistencia de datos.', icon: Layers, borderHover: 'hover:border-indigo-500', bgHover: 'hover:bg-indigo-950/20', iconBgHover: 'group-hover:bg-indigo-500/20', iconColor: 'text-indigo-400' },
  { id: 'Inbox', title: 'Inbox Colaborativo', desc: 'CRM integrado para gestionar consultas y comunicación centralizada con los prospectos.', icon: MessageSquare, borderHover: 'hover:border-blue-500', bgHover: 'hover:bg-blue-950/20', iconBgHover: 'group-hover:bg-blue-500/20', iconColor: 'text-blue-400' },
  { id: 'testimonios', title: 'Testimonios', desc: 'Gestión y moderación de reseñas para publicar de forma dinámica en la plataforma web.', icon: Star, borderHover: 'hover:border-amber-500', bgHover: 'hover:bg-amber-950/20', iconBgHover: 'group-hover:bg-amber-500/20', iconColor: 'text-amber-400' },
  { id: 'dashboard', title: 'Dashboard', desc: 'Panel de control con métricas clave, estadísticas en tiempo real y vista general del rendimiento.', icon: LayoutDashboard, borderHover: 'hover:border-rose-500', bgHover: 'hover:bg-rose-950/20', iconBgHover: 'group-hover:bg-rose-500/20', iconColor: 'text-rose-400' },
  { id: 'Configuracion_basica', title: 'Configuraciones e IA', desc: 'Ajustes globales, herramientas para generación de copywriting y hashtags con Inteligencia Artificial, e integraciones.', icon: Settings, borderHover: 'hover:border-fuchsia-500', bgHover: 'hover:bg-fuchsia-950/20', iconBgHover: 'group-hover:bg-fuchsia-500/20', iconColor: 'text-fuchsia-400' },
];

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeAppModal, setActiveAppModal] = useState<AppTab | null>(null);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [showMobileInfo, setShowMobileInfo] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [activeCaseStudy, setActiveCaseStudy] = useState<string | null>(null);

  const activeModalIndex = activeAppModal ? appTabs.findIndex(t => t.id === activeAppModal.id) : -1;
  const goPrevModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeModalIndex > 0) {
      setActiveAppModal(appTabs[activeModalIndex - 1]);
    }
  };
  const goNextModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeModalIndex < appTabs.length - 1) {
      setActiveAppModal(appTabs[activeModalIndex + 1]);
    }
  };

  // Lock scroll when modal is open
  useEffect(() => {
    if (activeAppModal) {
      document.body.style.overflow = 'hidden';
      // En móvil: No reseteamos showMobileInfo aquí para permitir una transición suave
      // al cambiar de sección mientras se está viendo la información.
    } else {
      document.body.style.overflow = '';
      setShowMobileInfo(false); // Solo se resetea al cerrar el modal por completo
    }
    setCarouselIndex(0); // Resetear el carrusel al cambiar de tab
  }, [activeAppModal]);

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
              <div className="flex items-center gap-3 mb-3">
                <span className="text-emerald-400 font-bold tracking-wider uppercase text-xs border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 rounded-full">
                  Schmidt Corredores
                </span>
                <span className="text-indigo-400 font-semibold tracking-wider uppercase text-sm">
                  Web Corporativa
                </span>
              </div>
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
            <div className="pt-4 flex flex-wrap gap-4">
              <a href="https://www.schmidtcorredores.cl" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors">
                <ExternalLink className="w-5 h-5" />
                Visitar Sitio Web
              </a>
              <button 
                onClick={() => setActiveCaseStudy('schmidt')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/10 hover:bg-white/10 text-white font-medium transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                Caso de Estudio
              </button>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden glass border border-indigo-500/30 bg-gradient-to-br from-indigo-500/20 to-blue-600/20 flex flex-col items-center justify-center p-8 group shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-12 bg-black/40 backdrop-blur-md flex items-center px-4 gap-2 border-b border-white/10 z-20">
                <div className="w-3 h-3 rounded-full bg-rose-500 border border-white/10" />
                <div className="w-3 h-3 rounded-full bg-amber-500 border border-white/10" />
                <div className="w-3 h-3 rounded-full bg-emerald-500 border border-white/10" />
                <div className="ml-4 flex-1 flex items-center justify-center pr-12">
                   <div className="h-6 bg-slate-800/80 rounded flex items-center px-4 text-xs text-slate-400 border border-white/5 font-mono truncate max-w-[200px]">schmidtcorredores.cl</div>
                </div>
              </div>
              <a href="https://www.schmidtcorredores.cl" target="_blank" rel="noreferrer" className="w-full h-full mt-8 bg-slate-900 rounded-lg shadow-inner overflow-hidden flex flex-col border border-white/5 relative group/img cursor-pointer">
                <img src={`${import.meta.env.BASE_URL}SC_Propiedades/HomeSC.png`} alt="Sitio Web Schmidt Corredores" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-opacity">
                  <span className="text-white font-medium bg-slate-900/90 px-6 py-3 rounded-full backdrop-blur-md shadow-xl border border-white/10 flex items-center gap-2">
                    <ExternalLink className="w-5 h-5" /> Visitar Sitio Web
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Proyecto 2: Tauri & Capacitor */}
        <div className="project-block flex flex-col md:flex-row-reverse gap-12 items-center">
          <div className="flex-1 space-y-8">
            <div>
              <h4 className="text-emerald-400 font-semibold tracking-wider uppercase text-sm mb-2">PWA, Escritorio y Móvil</h4>
              <h3 className="text-4xl font-bold text-white mb-6">CRM & Gestión Inmobiliaria</h3>
              <p className="text-lg text-slate-400 leading-relaxed font-light">
                Una solución SaaS integral para administración inmobiliaria. Permite gestionar propiedades, clientes (CRM) y métricas desde cualquier dispositivo gracias a su arquitectura moderna (React 18 + Supabase), compilada de forma nativa usando Capacitor para Android y Tauri para Escritorio.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">Base de datos en tiempo real (PostgreSQL / Supabase) con soporte offline parcial (Persistencia local).</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">Rendimiento nativo interplataforma mediante Capacitor (Móvil) y Tauri (Linux/Windows).</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass bg-white/5 border border-white/10">
                <span className="text-slate-400"><Layers className="w-4 h-4" /></span>
                <span className="text-sm font-medium text-slate-200">React + TS</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass bg-white/5 border border-white/10">
                <span className="text-slate-400"><Smartphone className="w-4 h-4" /></span>
                <span className="text-sm font-medium text-slate-200">Capacitor</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass bg-white/5 border border-white/10">
                <span className="text-slate-400"><Server className="w-4 h-4" /></span>
                <span className="text-sm font-medium text-slate-200">Supabase</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <h5 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Módulos de la Aplicación</h5>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {appTabs.map((tab) => (
                <div 
                  key={tab.id}
                  onClick={() => setActiveAppModal(tab)}
                  className={`aspect-square rounded-2xl glass border border-white/10 ${tab.borderHover} bg-slate-900/50 ${tab.bgHover} flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 group`}
                >
                  <div className={`w-14 h-14 rounded-full bg-slate-800 ${tab.iconBgHover} flex items-center justify-center mb-3 transition-colors`}>
                    <tab.icon className={`w-7 h-7 ${tab.iconColor} transition-colors`} />
                  </div>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{tab.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* App Tab Detail Modal */}
      <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center md:p-8 transition-all duration-300 ${activeAppModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div 
          className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
          onClick={() => setActiveAppModal(null)}
        />
        
        <div 
          className={`glass-card bg-slate-900 border border-white/10 md:rounded-3xl w-full h-full md:h-auto md:max-w-5xl md:max-h-[90vh] overflow-hidden relative z-10 shadow-2xl flex flex-col md:flex-row transition-all duration-500 delay-100 ${activeAppModal ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'}`}
        >
          {activeAppModal && (
            <>
              {/* Photo Area in Modal */}
              <div className={`w-full h-full absolute inset-0 md:relative md:w-1/2 bg-slate-950 flex flex-col items-center justify-center border-r border-white/10 overflow-hidden md:min-h-[600px]`}>
                
                {/* Stories Style Progress Bars (Mobile Only) */}
                <div className="absolute top-4 left-4 right-4 z-30 md:hidden flex gap-1.5 px-2">
                  {activeAppModal.id === 'MenuEdicionPublicaciones_01' ? (
                    [1, 2, 3, 4, 5, 6, 7, 8].map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`h-1.5 rounded-full transition-all duration-300 flex-1 ${idx === carouselIndex ? 'bg-emerald-400' : 'bg-white/30'}`} 
                      />
                    ))
                  ) : (
                    appTabs.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`h-1.5 rounded-full transition-all duration-300 flex-1 ${idx === activeModalIndex ? 'bg-emerald-400' : 'bg-white/30'}`} 
                      />
                    ))
                  )}
                </div>

                {/* Close Button Top Right (Mobile & Desktop) */}
                <button 
                  onClick={() => setActiveAppModal(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/80 hover:bg-white/10 text-white transition-colors z-40 shadow-lg border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content: Sequence vs Single */}
                {activeAppModal.id === 'MenuEdicionPublicaciones_01' ? (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    {/* Tapping areas for Stories format */}
                    <div className="absolute top-0 left-0 w-1/2 h-full z-20 md:hidden" onClick={() => setCarouselIndex(prev => prev > 0 ? prev - 1 : 7)} />
                    <div className="absolute top-0 right-0 w-1/2 h-full z-20 md:hidden" onClick={() => setCarouselIndex(prev => prev < 7 ? prev + 1 : 0)} />

                    <img 
                      key={`MenuEdicionPublicaciones_0${carouselIndex + 1}`}
                      src={`${import.meta.env.BASE_URL}SC_Propiedades/AppMobil/MenuEdicionPublicaciones_0${carouselIndex + 1}.png`} 
                      alt={`${activeAppModal.title} ${carouselIndex + 1}`}
                      className="absolute inset-0 w-full h-full object-contain p-2 pt-16 pb-24 md:p-8 md:pt-8 drop-shadow-2xl m-auto z-10 transition-opacity duration-300"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    
                    {/* Desktop Carousel Controls */}
                    <div className="hidden md:flex absolute bottom-8 items-center gap-4 bg-slate-900/80 p-2.5 rounded-full backdrop-blur-md border border-white/10 shadow-2xl z-20">
                      <button 
                        onClick={() => setCarouselIndex(prev => prev > 0 ? prev - 1 : 7)}
                        className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="flex gap-1.5 px-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => setCarouselIndex(idx)}
                            className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${idx === carouselIndex ? 'bg-emerald-400 w-6' : 'bg-white/30 hover:bg-white/50 w-2'}`} 
                          />
                        ))}
                      </div>
                      <button 
                        onClick={() => setCarouselIndex(prev => prev < 7 ? prev + 1 : 0)}
                        className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    {/* Tapping areas for Stories format */}
                    <div className="absolute top-0 left-0 w-1/2 h-full z-20 md:hidden" onClick={goPrevModal} />
                    <div className="absolute top-0 right-0 w-1/2 h-full z-20 md:hidden" onClick={goNextModal} />

                    {!imageError[activeAppModal.id] && (
                      <img 
                        key={activeAppModal.id}
                        src={`${import.meta.env.BASE_URL}SC_Propiedades/AppMobil/${activeAppModal.id}.png`} 
                        alt={activeAppModal.title}
                        className="absolute inset-0 w-full h-full object-contain p-2 pt-16 pb-24 md:p-8 md:pt-8 drop-shadow-2xl m-auto z-10"
                        onError={() => setImageError(prev => ({ ...prev, [activeAppModal.id]: true }))}
                      />
                    )}
                    {imageError[activeAppModal.id] && (
                      <div className="flex flex-col items-center justify-center text-slate-500 w-full h-full pt-16">
                        <ImageIcon className="w-16 h-16 mb-4 opacity-30" />
                        <span className="text-lg font-medium text-center px-4">Fotografía no encontrada</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Mobile Floating Button (TikTok Style) */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 md:hidden">
                  <button onClick={() => setShowMobileInfo(true)} className="px-6 py-3 bg-slate-900/90 text-white border border-white/10 backdrop-blur-md shadow-2xl rounded-full font-semibold text-sm flex items-center gap-2 animate-bounce">
                    <ChevronUp className="w-5 h-5" /> Leer Descripción
                  </button>
                </div>
              </div>
              
              {/* Invisible Overlay for closing Mobile Info Sheet when clicking outside */}
              {showMobileInfo && (
                <div 
                  className="fixed inset-0 z-40 md:hidden" 
                  onClick={() => setShowMobileInfo(false)} 
                />
              )}

              {/* Info Area (Bottom Sheet on Mobile, Right side on Desktop) */}
              <div className={`absolute bottom-0 left-0 w-full h-auto max-h-[80vh] rounded-t-3xl md:rounded-none z-50 md:relative md:w-1/2 p-8 md:p-12 pb-12 bg-slate-900 border-t border-white/10 md:border-t-0 overflow-y-auto transform transition-transform duration-500 ease-[cubic-bezier(0.3,0,0.1,1)] ${showMobileInfo ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}`}>
                
                {/* Mobile Pull Down Handle */}
                <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6 md:hidden cursor-pointer" onClick={() => setShowMobileInfo(false)} />
                
                <div className={`w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-8 shadow-lg shrink-0 ${activeAppModal.iconBgHover.replace('group-hover:', '')}`}>
                  <activeAppModal.icon className={`w-8 h-8 ${activeAppModal.iconColor}`} />
                </div>
                
                <h4 className="text-emerald-400 font-semibold tracking-wider uppercase text-sm mb-2">Módulo</h4>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{activeAppModal.title}</h3>
                
                <p className="text-slate-300 text-lg leading-relaxed font-light mb-8">
                  {activeAppModal.desc}
                </p>
                
                <div className="bg-slate-950/50 p-6 rounded-xl border border-white/5 mt-auto">
                  <h5 className="text-white font-medium mb-2">Detalles de Arquitectura</h5>
                  <p className="text-sm text-slate-400">Desarrollado con React 18, Tailwind CSS y Supabase. Preparado para distribución universal (PWA, Android vía Capacitor y Desktop vía Tauri), garantizando flexibilidad y velocidad en el manejo de operaciones diarias.</p>
                </div>

                {/* Desktop Navigation Controls */}
                <div className="hidden md:flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                  <button 
                    onClick={goPrevModal}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${activeModalIndex > 0 ? 'bg-white/5 hover:bg-white/10 text-white cursor-pointer' : 'opacity-30 cursor-not-allowed text-slate-500'}`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm font-medium">Anterior</span>
                  </button>
                  <div className="flex gap-2">
                    {appTabs.map((_, idx) => (
                      <div key={idx} className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeModalIndex ? 'bg-emerald-400 w-4' : 'bg-white/20'}`} />
                    ))}
                  </div>
                  <button 
                    onClick={goNextModal}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${activeModalIndex < appTabs.length - 1 ? 'bg-white/5 hover:bg-white/10 text-white cursor-pointer' : 'opacity-30 cursor-not-allowed text-slate-500'}`}
                  >
                    <span className="text-sm font-medium hidden sm:inline">Siguiente</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <CaseStudyModal 
        isOpen={activeCaseStudy === 'schmidt'} 
        onClose={() => setActiveCaseStudy(null)}
        title="Plataforma Web Inmobiliaria"
        problem="La agencia operaba sobre una solución web genérica (Wix). Aunque estas herramientas ofrecen facilidades iniciales, terminaron limitando el crecimiento del negocio: interfaces sobrecargadas, funciones innecesarias que causaban ruido, y una carencia total de herramientas operativas reales para gestionar clientes o administrar un gran inventario de propiedades."
        challenge="Migrar de un sistema 'enlatado' a un ecosistema tecnológico 100% propietario. El desafío era construir una solución que tuviera exactamente las herramientas justas (ni más, ni menos): una vitrina pública de alta velocidad orientada a conversiones y un sistema interno que simplificara el día a día de los corredores."
        solution={`Reemplacé la plantilla genérica diseñando una arquitectura dividida en dos frentes, conectados por una base de datos centralizada (Supabase):\n\n1. Vitrina Pública (React/Vite): Un portal inmobiliario limpio y estructurado, enfocado exclusivamente en la velocidad, usabilidad (UX) y captación de prospectos, eliminando todo el peso muerto del antiguo sitio Wix.\n2. Ecosistema Interno (PWA / CRM): Una aplicación a la medida instalable en celulares (Capacitor) y escritorio (Tauri). Doté a la agencia con las utilidades exactas que solicitaron: un gestor de propiedades con guardado de borradores offline, un inbox colaborativo, y una automatización clave: la capacidad de crear la ficha de una propiedad e instantáneamente generar y publicarla en Instagram desde la misma aplicación, fusionando dos tareas manuales en un solo clic.\n\nResultado: La agencia recuperó el control de su tecnología. Ahora operan con un software que se adapta a su forma de trabajar (y no al revés), agilizando su gestión interna y proyectando una imagen sumamente profesional hacia sus clientes.`}
      />
    </section>
  );
}