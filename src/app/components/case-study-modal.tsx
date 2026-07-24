import { X, BookOpen, Lightbulb, Target } from 'lucide-react';
import { useEffect } from 'react';

type CaseStudyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  problem: string;
  challenge: string;
  solution: string;
};

export function CaseStudyModal({ isOpen, onClose, title, problem, challenge, solution }: CaseStudyModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl max-h-full overflow-y-auto custom-scrollbar bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-10 animate-in slide-in-from-bottom-8 duration-500">
        <button 
          onClick={onClose}
          className="sticky top-4 left-[calc(100%-3rem)] w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-12 space-y-12">
          <div>
            <h3 className="text-indigo-400 font-semibold tracking-wider uppercase text-sm mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Caso de Estudio
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-rose-400 mb-2">
                <Target className="w-6 h-6" />
                <h3 className="text-xl font-semibold">El Problema</h3>
              </div>
              <p className="text-slate-300 leading-relaxed font-light">{problem}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-amber-400 mb-2">
                <Lightbulb className="w-6 h-6" />
                <h3 className="text-xl font-semibold">El Reto</h3>
              </div>
              <p className="text-slate-300 leading-relaxed font-light">{challenge}</p>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3 text-emerald-400 mb-2">
              <span className="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center font-bold text-sm">3</span>
              <h3 className="text-xl font-semibold">Mi Enfoque y Solución</h3>
            </div>
            <p className="text-slate-300 leading-relaxed font-light whitespace-pre-wrap">{solution}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
