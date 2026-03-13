import { Github, Linkedin, Mail, ExternalLink, MapPin, Briefcase } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="relative bg-slate-950 pt-32 pb-12 px-6 overflow-hidden">

      {/* Background ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para construir algo <span className="text-gradient">increíble?</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Estoy disponible para nuevos proyectos y oportunidades laborales.
            Si buscas un desarrollador que entienda el negocio tanto como el código, hablemos.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">

          {/* Email Card */}
          <a
            href="mailto:matiasretamalbarrera.45@gmail.com"
            className="group glass-card p-10 rounded-3xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Mensaje Directo</h3>
            <p className="text-slate-400 font-light group-hover:text-indigo-300 transition-colors">
              matiasretamalbarrera.45@gmail.com
            </p>
          </a>

          {/* LinkedIn Card */}
          <a
            href="https://www.linkedin.com/in/deadjustlive"
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-card p-10 rounded-3xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-300">
              <Linkedin className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Perfil Profesional</h3>
            <p className="text-slate-400 font-light flex items-center gap-2 group-hover:text-blue-300 transition-colors">
              Conectar en LinkedIn <ExternalLink className="w-4 h-4" />
            </p>
          </a>

          {/* GitHub Card */}
          <a
            href="https://github.com/DeadJustLive"
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-card p-10 rounded-3xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
              <Github className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Código Fuente</h3>
            <p className="text-slate-400 font-light flex items-center gap-2 group-hover:text-emerald-300 transition-colors">
              Repositorios Públicos <ExternalLink className="w-4 h-4" />
            </p>
          </a>

        </div>

        {/* Info & Status row */}
        <div className="flex flex-col md:flex-row justify-between items-center py-10 border-t border-white/10 gap-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <div className="flex items-center gap-2 text-slate-400 bg-white/5 px-4 py-2 rounded-full border border-white/5">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-medium">Santiago, Chile</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 bg-white/5 px-4 py-2 rounded-full border border-white/5">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-medium">Disponible para Proyectos</span>
              </div>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-slate-500 text-sm font-light mb-1">
              Desarrollado con <span className="text-slate-300 font-medium">React, TailwindCSS & GSAP</span>
            </p>
            <p className="text-slate-600 text-xs">
              © {new Date().getFullYear()} Matías Retamal. Todos los derechos reservados.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}