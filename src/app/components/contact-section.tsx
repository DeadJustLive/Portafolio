import { useState, useEffect } from 'react';
import { Mail, MessageSquare, ArrowRight, CheckCircle2, Loader2, X } from 'lucide-react';

export function ContactSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Prevenir scroll cuando el modal está abierto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/matiasretamalbarrera.45@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Nuevo mensaje de ${formData.name} desde tu Portafolio`,
          _template: 'box'
        })
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setFormStatus('idle');
          setIsModalOpen(false);
        }, 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 bg-slate-950 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h2 className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4 flex items-center justify-center gap-2">
          ¿Listo para empezar?
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Hablemos de tu <span className="text-gradient">próximo proyecto</span>
        </h3>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed mb-12">
          Ya sea que necesites automatizar procesos, crear una aplicación web o diseñar un sistema a medida, estoy disponible para conversar y explorar cómo puedo aportar valor a tu negocio.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 ease-in-out bg-indigo-600 rounded-full overflow-hidden hover:bg-indigo-500 w-full sm:w-auto"
          >
            <span className="relative flex items-center gap-3 text-lg">
              <Mail className="w-5 h-5" />
              Agendar Llamada
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <a
            href="https://wa.me/56985955546"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-slate-300 transition-all duration-300 ease-in-out glass hover:text-white hover:bg-white/10 rounded-full overflow-hidden w-full sm:w-auto"
          >
            <span className="relative flex items-center gap-3 text-lg">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              Escribir por WhatsApp
            </span>
          </a>
        </div>
      </div>

      {/* Modal de Contacto */}
      <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
        
        <div className={`glass-card bg-slate-900 border border-indigo-500/20 rounded-3xl w-full max-w-xl relative z-10 shadow-2xl transition-all duration-500 delay-100 ${isModalOpen ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'}`}>
          <button 
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 md:p-10">
            <h3 className="text-3xl font-bold text-white mb-2">Solicitar Diagnóstico</h3>
            <p className="text-slate-400 mb-8">Cuéntame brevemente de tu negocio y tu dolor principal. Te contactaré a la brevedad.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Tu Nombre</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Tu Correo</label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                    placeholder="correo@empresa.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Cuéntame de tu proyecto</label>
                <textarea 
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none"
                  placeholder="Me gustaría desarrollar un ecosistema para..."
                />
              </div>

              <button 
                type="submit" 
                disabled={formStatus === 'sending' || formStatus === 'success'}
                className={`w-full group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold text-white transition-all duration-300 ease-in-out rounded-xl overflow-hidden mt-4 ${formStatus === 'success' ? 'bg-emerald-600' : formStatus === 'error' ? 'bg-rose-600' : 'bg-indigo-600 hover:bg-indigo-500'}`}
              >
                {formStatus === 'idle' && (
                  <>
                    <Mail className="w-5 h-5" /> Enviar Solicitud
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
                {formStatus === 'sending' && <><Loader2 className="w-5 h-5 animate-spin" /> Procesando...</>}
                {formStatus === 'success' && <><CheckCircle2 className="w-5 h-5" /> Solicitud Enviada</>}
                {formStatus === 'error' && <>Error al enviar. Intenta por WhatsApp.</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
