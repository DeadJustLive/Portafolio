import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Store, Wrench, Check, Minus, Plus, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type MainTab = 'pyme' | 'empresa' | 'tecnico';

export function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<MainTab>('pyme');

  // Estado para el simulador PYME (columnas Web y App)
  const [selectedAddons, setSelectedAddons] = useState<Record<string, Record<string, boolean>>>({
    web: { gateway: false, users: false, reports: false, internalApp: false },
    app: { gateway: false, users: false, reports: false, internalApp: false }
  });

  const [quoteModal, setQuoteModal] = useState<{isOpen: boolean, type: 'web'|'app'|null}>({ isOpen: false, type: null });
  const [quoteForm, setQuoteForm] = useState({ name: '', business: '', details: '' });

  const togglePymeAddon = (plan: 'web' | 'app', addon: string) => {
    setSelectedAddons(prev => ({
      ...prev,
      [plan]: {
        ...prev[plan],
        [addon]: !prev[plan][addon]
      }
    }));
  };

  const getPymeTotal = (plan: 'web' | 'app') => {
    let year1 = 75000;
    let year2 = 45000;
    if (selectedAddons[plan].gateway) { year1 += 25000; year2 += 15000; }
    if (selectedAddons[plan].users) year1 += 15000;
    if (selectedAddons[plan].reports) year1 += 10000;
    if (selectedAddons[plan].internalApp) year1 += 20000;
    return { year1, year2 };
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteModal.type) return;
    
    const typeName = quoteModal.type === 'web' ? 'Plataforma Web' : 'Software Personalizado';
    const addons = selectedAddons[quoteModal.type];
    
    let activeModules = [];
    if (addons.gateway) activeModules.push("- Pasarela de Pagos / POS");
    if (addons.users) activeModules.push("- Módulo de Usuarios");
    if (addons.reports) activeModules.push("- Panel de Reportes");
    if (addons.internalApp) activeModules.push("- Gestión Interna Avanzada");

    const modulesText = activeModules.length > 0 
      ? `\n\nMódulos adicionales de interés:\n${activeModules.join('\n')}` 
      : '';

    const subject = encodeURIComponent(`Cotización ${typeName} - ${quoteForm.business}`);
    const body = encodeURIComponent(`Hola, mi nombre es ${quoteForm.name} de ${quoteForm.business}.

Me gustaría solicitar una reunión para cotizar el servicio de ${typeName}.
${modulesText}

Detalles adicionales sobre mi proyecto:
${quoteForm.details}

Quedo atento/a a sus comentarios para coordinar una reunión.
Saludos cordiales.`);

    window.location.href = `mailto:contacto@scpropiedades.cl?subject=${subject}&body=${body}`;
    setQuoteModal({ isOpen: false, type: null });
  };

  const webTotals = getPymeTotal('web');
  const appTotals = getPymeTotal('app');

  useEffect(() => {
    if (quoteModal.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [quoteModal.isOpen]);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current.querySelector('.pricing-container'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
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
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full filter blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 pricing-container">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4">
            Inversión y Modelos de Trabajo
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Transparencia en <span className="text-gradient">Costos</span>
          </h3>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Construye tu presupuesto de forma interactiva. Selecciona tu perfil y personaliza los módulos según tus necesidades reales.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button 
            onClick={() => setActiveTab('pyme')}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300 w-full sm:w-auto ${activeTab === 'pyme' ? 'bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'bg-slate-900/50 border-white/10 hover:border-emerald-500/30 text-slate-400'}`}
          >
            <Store className={`w-5 h-5 ${activeTab === 'pyme' ? 'text-emerald-400' : ''}`} />
            <span className={`font-bold ${activeTab === 'pyme' ? 'text-white' : ''}`}>Modelo PYME (SaaS)</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('empresa')}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300 w-full sm:w-auto ${activeTab === 'empresa' ? 'bg-indigo-500/20 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'bg-slate-900/50 border-white/10 hover:border-indigo-500/30 text-slate-400'}`}
          >
            <Building2 className={`w-5 h-5 ${activeTab === 'empresa' ? 'text-indigo-400' : ''}`} />
            <span className={`font-bold ${activeTab === 'empresa' ? 'text-white' : ''}`}>Empresas a Medida</span>
          </button>

          <button 
            onClick={() => setActiveTab('tecnico')}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300 w-full sm:w-auto ${activeTab === 'tecnico' ? 'bg-rose-500/20 border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.2)]' : 'bg-slate-900/50 border-white/10 hover:border-rose-500/30 text-slate-400'}`}
          >
            <Wrench className={`w-5 h-5 ${activeTab === 'tecnico' ? 'text-rose-400' : ''}`} />
            <span className={`font-bold ${activeTab === 'tecnico' ? 'text-white' : ''}`}>Servicio Técnico</span>
          </button>
        </div>

        {/* --- CONTENIDO PYME --- */}
        {activeTab === 'pyme' && (
          <div className="glass-card bg-slate-900/60 rounded-3xl overflow-hidden border border-emerald-500/20 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 md:p-8 border-b border-white/5 bg-emerald-500/5">
              <h4 className="text-2xl font-bold text-white mb-2">Simulador de Planes SaaS (Valores Base)</h4>
              <p className="text-slate-400">Integramos el costo de desarrollo en tus primeras 12 mensualidades para no descapitalizarte. Los precios mostrados son <strong className="text-emerald-400">valores "Desde"</strong> para requerimientos estándar. El valor final dependerá de la complejidad exacta de las funciones que solicites y será pactado de mutuo acuerdo tras nuestro análisis técnico.</p>
            </div>
            
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left min-w-[700px]">
                <thead>
                  <tr className="bg-slate-900/80">
                    <th className="p-6 font-semibold text-slate-300 border-b border-white/5 w-1/3">Características</th>
                    <th className="p-6 font-bold text-white border-b border-white/5 border-l border-white/5 w-1/3 bg-slate-800/30">
                      <div className="text-emerald-400 text-lg mb-1">Plataforma Web</div>
                      <div className="text-xs text-slate-400 font-normal">Sitio público + Funciones base</div>
                    </th>
                    <th className="p-6 font-bold text-white border-b border-white/5 border-l border-white/5 w-1/3 bg-slate-800/30">
                      <div className="text-teal-400 text-lg mb-1">Software Personalizado</div>
                      <div className="text-xs text-slate-400 font-normal">Sistemas de gestión interna privados</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {/* Módulos Base */}
                  <tr><td colSpan={3} className="bg-slate-900/50 p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Módulos Base Incluidos ($0 extra)</td></tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-slate-300">Diseño UI/UX Front-end</td>
                    <td className="p-6 border-l border-white/5"><Check className="w-5 h-5 text-emerald-500" /></td>
                    <td className="p-6 border-l border-white/5"><Check className="w-5 h-5 text-teal-500" /></td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-slate-300">Sitio Público y Catálogo / E-commerce Base</td>
                    <td className="p-6 border-l border-white/5"><Check className="w-5 h-5 text-emerald-500" /></td>
                    <td className="p-6 border-l border-white/5"><Minus className="w-5 h-5 text-slate-600" /></td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-slate-300">Módulo de Gestión / Control Interno Base</td>
                    <td className="p-6 border-l border-white/5"><Minus className="w-5 h-5 text-slate-600" /></td>
                    <td className="p-6 border-l border-white/5"><Check className="w-5 h-5 text-teal-500" /></td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-slate-300">Hosting Alto Rendimiento + Soporte</td>
                    <td className="p-6 border-l border-white/5"><Check className="w-5 h-5 text-emerald-500" /></td>
                    <td className="p-6 border-l border-white/5"><Check className="w-5 h-5 text-teal-500" /></td>
                  </tr>

                  {/* Complementos Interactivos */}
                  <tr><td colSpan={3} className="bg-slate-900/50 p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Complementos Opcionales (Click para agregar)</td></tr>
                  
                  {/* Pasarela */}
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-slate-300">
                      <div>Pasarela de Pagos / Sistema POS</div>
                      <div className="text-xs text-slate-500 mt-1">Transbank, Flow, o Terminal de Venta (Permanente)</div>
                    </td>
                    <td className="p-6 border-l border-white/5 bg-slate-800/10">
                      <button onClick={() => togglePymeAddon('web', 'gateway')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${selectedAddons.web.gateway ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-slate-900 border-white/10 text-slate-400 hover:border-emerald-500/30'}`}>
                        {selectedAddons.web.gateway ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />} $25k / mes
                      </button>
                    </td>
                    <td className="p-6 border-l border-white/5 bg-slate-800/10">
                      <button onClick={() => togglePymeAddon('app', 'gateway')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${selectedAddons.app.gateway ? 'bg-teal-500/20 border-teal-500/50 text-teal-400' : 'bg-slate-900 border-white/10 text-slate-400 hover:border-teal-500/30'}`}>
                        {selectedAddons.app.gateway ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />} $25k / mes
                      </button>
                    </td>
                  </tr>

                  {/* Usuarios */}
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-slate-300">
                      <div>Módulo de Usuarios (12 meses)</div>
                      <div className="text-xs text-slate-500 mt-1">Cuentas, roles y accesos</div>
                    </td>
                    <td className="p-6 border-l border-white/5 bg-slate-800/10">
                      <button onClick={() => togglePymeAddon('web', 'users')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${selectedAddons.web.users ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-slate-900 border-white/10 text-slate-400 hover:border-emerald-500/30'}`}>
                        {selectedAddons.web.users ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />} $15k / mes
                      </button>
                    </td>
                    <td className="p-6 border-l border-white/5 bg-slate-800/10">
                      <button onClick={() => togglePymeAddon('app', 'users')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${selectedAddons.app.users ? 'bg-teal-500/20 border-teal-500/50 text-teal-400' : 'bg-slate-900 border-white/10 text-slate-400 hover:border-teal-500/30'}`}>
                        {selectedAddons.app.users ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />} $15k / mes
                      </button>
                    </td>
                  </tr>

                  {/* Reportes */}
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-slate-300">
                      <div>Panel de Reportes (12 meses)</div>
                      <div className="text-xs text-slate-500 mt-1">Estadísticas y gráficas avanzadas</div>
                    </td>
                    <td className="p-6 border-l border-white/5 bg-slate-800/10">
                      <button onClick={() => togglePymeAddon('web', 'reports')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${selectedAddons.web.reports ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-slate-900 border-white/10 text-slate-400 hover:border-emerald-500/30'}`}>
                        {selectedAddons.web.reports ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />} $10k / mes
                      </button>
                    </td>
                    <td className="p-6 border-l border-white/5 bg-slate-800/10">
                      <button onClick={() => togglePymeAddon('app', 'reports')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${selectedAddons.app.reports ? 'bg-teal-500/20 border-teal-500/50 text-teal-400' : 'bg-slate-900 border-white/10 text-slate-400 hover:border-teal-500/30'}`}>
                        {selectedAddons.app.reports ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />} $10k / mes
                      </button>
                    </td>
                  </tr>

                  {/* App Interna Addon */}
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-slate-300">
                      <div>App de Gestión Interna Avanzada</div>
                      <div className="text-xs text-slate-500 mt-1">Inventario complejo, RRHH o Finanzas</div>
                    </td>
                    <td className="p-6 border-l border-white/5 bg-slate-800/10">
                      <button onClick={() => togglePymeAddon('web', 'internalApp')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${selectedAddons.web.internalApp ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-slate-900 border-white/10 text-slate-400 hover:border-emerald-500/30'}`}>
                        {selectedAddons.web.internalApp ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />} $20k / mes
                      </button>
                    </td>
                    <td className="p-6 border-l border-white/5 bg-slate-800/10">
                      <button onClick={() => togglePymeAddon('app', 'internalApp')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${selectedAddons.app.internalApp ? 'bg-teal-500/20 border-teal-500/50 text-teal-400' : 'bg-slate-900 border-white/10 text-slate-400 hover:border-teal-500/30'}`}>
                        {selectedAddons.app.internalApp ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />} $20k / mes
                      </button>
                    </td>
                  </tr>
                </tbody>
                
                {/* Totales */}
                <tfoot className="bg-slate-900 border-t-2 border-emerald-500/30">
                  <tr>
                    <td className="p-6">
                      <div className="text-lg font-bold text-white">Inversión Mensual Estimada</div>
                      <div className="text-xs text-emerald-400/80 mt-1 font-medium bg-emerald-500/10 inline-block px-2 py-1 rounded">Valores "Desde" para complejidad estándar</div>
                      <p className="text-xs text-slate-500 mt-2 max-w-[250px] leading-relaxed">
                        Cotización final sujeta a reunión. La complejidad técnica del proyecto determinará si existen ajustes en la cuota.
                      </p>
                    </td>
                    <td className="p-6 border-l border-white/5">
                      <div className="text-sm text-slate-400 font-medium mb-1">Desde</div>
                      <div className="text-3xl font-bold text-emerald-400">${webTotals.year1.toLocaleString('es-CL')} <span className="text-sm text-slate-400 font-normal">CLP / mes</span></div>
                      <div className="text-xs text-emerald-500/70 mt-1">Mes 1 al 12 (Setup Financiado)</div>
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <div className="text-lg font-bold text-white">${webTotals.year2.toLocaleString('es-CL')} <span className="text-xs text-slate-400 font-normal">CLP / mes</span></div>
                        <div className="text-xs text-slate-500 mt-1">A partir del Año 2 (Mantenimiento)</div>
                      </div>
                      <button onClick={() => setQuoteModal({ isOpen: true, type: 'web' })} className="mt-6 w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl transition-colors">
                        Cotizar Web
                      </button>
                    </td>
                    <td className="p-6 border-l border-white/5">
                      <div className="text-sm text-slate-400 font-medium mb-1">Desde</div>
                      <div className="text-3xl font-bold text-teal-400">${appTotals.year1.toLocaleString('es-CL')} <span className="text-sm text-slate-400 font-normal">CLP / mes</span></div>
                      <div className="text-xs text-teal-500/70 mt-1">Mes 1 al 12 (Setup Financiado)</div>
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <div className="text-lg font-bold text-white">${appTotals.year2.toLocaleString('es-CL')} <span className="text-xs text-slate-400 font-normal">CLP / mes</span></div>
                        <div className="text-xs text-slate-500 mt-1">A partir del Año 2 (Mantenimiento)</div>
                      </div>
                      <button onClick={() => setQuoteModal({ isOpen: true, type: 'app' })} className="mt-6 w-full py-3 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold rounded-xl transition-colors">
                        Cotizar Software Personalizado
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* --- CONTENIDO EMPRESA --- */}
        {activeTab === 'empresa' && (
          <div className="glass-card bg-slate-900/60 rounded-3xl overflow-hidden border border-indigo-500/20 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 md:p-8 border-b border-white/5 bg-indigo-500/5">
              <h4 className="text-2xl font-bold text-white mb-2">Desarrollo a Medida Empresarial</h4>
              <p className="text-slate-400">Soluciones de software exactas para problemas complejos, diseñadas sin funciones genéricas. Tú eres el propietario del código fuente.</p>
            </div>
            
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="bg-slate-900/80">
                    <th className="p-6 font-semibold text-slate-300 border-b border-white/5 w-1/2">Características Arquitectónicas</th>
                    <th className="p-6 font-bold text-white border-b border-white/5 border-l border-white/5 w-1/2 bg-slate-800/30">
                      <div className="text-indigo-400 text-lg mb-1">Software Corporativo</div>
                      <div className="text-xs text-slate-400 font-normal">Desde $1.400.000 CLP (Pago único o Hitos)</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-slate-300">Entrega de Código Fuente (Propiedad Total)</td>
                    <td className="p-6 border-l border-white/5"><Check className="w-5 h-5 text-indigo-500" /></td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-slate-300">Arquitectura Cloud Escalable (AWS/Supabase)</td>
                    <td className="p-6 border-l border-white/5"><Check className="w-5 h-5 text-indigo-500" /></td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-slate-300">Testing, QA y Documentación Técnica</td>
                    <td className="p-6 border-l border-white/5"><Check className="w-5 h-5 text-indigo-500" /></td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-slate-300">Integración con ERP/CRM existentes vía API</td>
                    <td className="p-6 border-l border-white/5"><Check className="w-5 h-5 text-indigo-500" /></td>
                  </tr>
                </tbody>
                <tfoot className="bg-slate-900 border-t-2 border-indigo-500/30">
                  <tr>
                    <td colSpan={2} className="p-6 text-center">
                      <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
                        Cada sistema empresarial se cotiza en base a horas de ingeniería, complejidad de bases de datos y requerimientos de seguridad.
                      </p>
                      <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors inline-block">
                        Solicitar Auditoría y Cotización
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* --- CONTENIDO TECNICO --- */}
        {activeTab === 'tecnico' && (
          <div className="glass-card bg-slate-900/60 rounded-3xl overflow-hidden border border-rose-500/20 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 md:p-8 border-b border-white/5 bg-rose-500/5">
              <h4 className="text-2xl font-bold text-white mb-2">Servicio Técnico y Hardware</h4>
              <p className="text-slate-400">Mantenimiento preventivo, correctivo y optimización de computadoras de escritorio y laptops (Sujeto a disponibilidad y ubicación).</p>
            </div>
            
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="bg-slate-900/80">
                    <th className="p-6 font-semibold text-slate-300 border-b border-white/5 w-1/2">Servicio</th>
                    <th className="p-6 font-bold text-white border-b border-white/5 border-l border-white/5 w-1/2 bg-slate-800/30">
                      <div className="text-rose-400 text-lg mb-1">Valor Estimado</div>
                      <div className="text-xs text-slate-400 font-normal">Precios en CLP (No incluye repuestos)</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-slate-300">
                      <div className="font-bold text-white mb-1">Formateo e Instalación de OS</div>
                      <div className="text-xs text-slate-500">Windows/Linux + Drivers + Programas Básicos</div>
                    </td>
                    <td className="p-6 border-l border-white/5 font-bold text-rose-400">$30.000</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-slate-300">
                      <div className="font-bold text-white mb-1">Mantenimiento Físico Profundo</div>
                      <div className="text-xs text-slate-500">Limpieza de polvo, cambio de pasta térmica (Artic Silver) y lubricación de fans</div>
                    </td>
                    <td className="p-6 border-l border-white/5 font-bold text-rose-400">$35.000</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-slate-300">
                      <div className="font-bold text-white mb-1">Armado de PC / Upgrades</div>
                      <div className="text-xs text-slate-500">Instalación de SSD, RAM, Tarjeta Gráfica y gestión de cables (Cable Management)</div>
                    </td>
                    <td className="p-6 border-l border-white/5 font-bold text-rose-400">Desde $40.000</td>
                  </tr>
                </tbody>
                <tfoot className="bg-slate-900 border-t-2 border-rose-500/30">
                  <tr>
                    <td colSpan={2} className="p-6 text-center">
                      <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl transition-colors inline-block">
                        Agendar Visita / Consulta
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* Modal de Cotización Mailto */}
        {quoteModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setQuoteModal({ isOpen: false, type: null })} />
            <div className={`glass-card relative w-full max-w-lg p-6 md:p-8 rounded-3xl border shadow-2xl animate-in zoom-in-95 duration-200 ${quoteModal.type === 'web' ? 'border-emerald-500/20' : 'border-teal-500/20'}`}>
              <button 
                onClick={() => setQuoteModal({ isOpen: false, type: null })}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-2xl font-bold text-white mb-2">
                Cotizar {quoteModal.type === 'web' ? 'Plataforma Web' : 'Software Personalizado'}
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Completa tus datos y se abrirá tu cliente de correo (ej. Outlook, Gmail) con un mensaje pre-armado basado en los módulos que seleccionaste.
              </p>
              
              <form onSubmit={handleSendQuote} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Tu Nombre</label>
                  <input 
                    type="text" 
                    required
                    value={quoteForm.name}
                    onChange={e => setQuoteForm({...quoteForm, name: e.target.value})}
                    className={`w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-all ${quoteModal.type === 'web' ? 'focus:border-emerald-500/50 focus:ring-emerald-500/50' : 'focus:border-teal-500/50 focus:ring-teal-500/50'}`}
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Nombre de tu Empresa / Negocio</label>
                  <input 
                    type="text" 
                    required
                    value={quoteForm.business}
                    onChange={e => setQuoteForm({...quoteForm, business: e.target.value})}
                    className={`w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-all ${quoteModal.type === 'web' ? 'focus:border-emerald-500/50 focus:ring-emerald-500/50' : 'focus:border-teal-500/50 focus:ring-teal-500/50'}`}
                    placeholder="Ej. Comercializadora SpA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Cuéntame brevemente de tu proyecto</label>
                  <textarea 
                    required
                    value={quoteForm.details}
                    onChange={e => setQuoteForm({...quoteForm, details: e.target.value})}
                    className={`w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-all min-h-[100px] resize-none ${quoteModal.type === 'web' ? 'focus:border-emerald-500/50 focus:ring-emerald-500/50' : 'focus:border-teal-500/50 focus:ring-teal-500/50'}`}
                    placeholder="Necesito un software que me permita..."
                  />
                </div>
                
                <button type="submit" className={`w-full py-4 font-bold rounded-xl transition-colors mt-4 flex items-center justify-center gap-2 ${quoteModal.type === 'web' ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950' : 'bg-teal-500 hover:bg-teal-600 text-slate-950'}`}>
                  <Check className="w-5 h-5" />
                  Abrir mi correo y enviar
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
