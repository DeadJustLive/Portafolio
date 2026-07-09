import { Mail, MessageSquare, ArrowRight } from 'lucide-react';

export function ContactSection() {
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
          <a
            href="mailto:matiasretamalbarrera.45@gmail.com"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 ease-in-out bg-indigo-600 rounded-full overflow-hidden hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] w-full sm:w-auto"
          >
            <span className="relative flex items-center gap-3 text-lg">
              <Mail className="w-5 h-5" />
              Envíame un correo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

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
    </section>
  );
}
