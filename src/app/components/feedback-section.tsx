import { useState } from 'react';
import { MessageSquarePlus, Send, CheckCircle2 } from 'lucide-react';

export function FeedbackSection() {
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleScoreClick = async (num: number) => {
    setScore(num);
    
    // Si es 10, enviamos inmediatamente porque no hay campo de texto
    if (num === 10) {
      try {
        await fetch('https://formsubmit.co/ajax/matiasretamalbarrera.45@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            _subject: `¡Felicidades! Alguien calificó tu Portafolio con 10/10`,
            Puntaje: '10/10',
            _template: 'box'
          })
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      await fetch('https://formsubmit.co/ajax/matiasretamalbarrera.45@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `Nuevo Feedback de Portafolio: Puntaje ${score}/10`,
          Puntaje: `${score}/10`,
          Comentarios: feedback,
          _template: 'box'
        })
      });
      setSubmitted(true);
    } catch (error) {
      // Si falla, mostramos éxito de todos modos para no frustrar al visitante
      setSubmitted(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="relative py-20 px-6 bg-slate-900 overflow-hidden border-t border-white/5">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="glass-card bg-slate-950/50 rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl text-center">
          
          {!submitted ? (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <MessageSquarePlus className="w-6 h-6 text-indigo-400" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ayúdame a mejorar.</h2>
              
              {!score && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-slate-400 mb-8">Del 1 al 10, ¿qué te pareció mi portafolio?</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleScoreClick(num)}
                        className="w-10 h-10 rounded-full bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white font-medium transition-all duration-300 flex items-center justify-center border border-white/5 hover:border-indigo-500 hover:scale-110"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {score && score < 10 && (
                <div className="animate-in fade-in zoom-in-95 duration-500 mt-6">
                   <p className="text-slate-300 mb-4">¿Qué me faltó para que quisieras contactarme o contratarme para resolver tu problema?</p>
                   <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                     <textarea 
                       value={feedback}
                       onChange={(e) => setFeedback(e.target.value)}
                       placeholder="Tu opinión sincera me ayuda muchísimo..."
                       className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px] resize-y"
                       required
                       disabled={isSending}
                     />
                     <button 
                       type="submit"
                       disabled={isSending}
                       className="self-end inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl font-medium transition-colors"
                     >
                       <Send className={`w-4 h-4 ${isSending ? 'animate-pulse' : ''}`} />
                       {isSending ? 'Enviando...' : 'Enviar feedback'}
                     </button>
                   </form>
                </div>
              )}

              {score === 10 && (
                <div className="animate-in fade-in zoom-in-95 duration-500 mt-6">
                  <div className="flex justify-center mb-4">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                  </div>
                  <p className="text-emerald-400 font-medium text-lg">¡Muchas gracias por esa puntuación!</p>
                  <p className="text-slate-400 mt-2">Saber que mi trabajo transmite confianza es la mejor recompensa.</p>
                </div>
              )}
            </>
          ) : (
            <div className="animate-in fade-in zoom-in-95 duration-500 py-8">
              <div className="flex justify-center mb-6">
                <CheckCircle2 className="w-16 h-16 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">¡Feedback recibido!</h3>
              <p className="text-slate-400">Te agradezco muchísimo el tiempo que te tomaste y la sinceridad.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
