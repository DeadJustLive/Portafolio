import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, Code, Cpu, Workflow } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function AiPhilosophy() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !cardsRef.current) return;

        // Fade in text
        gsap.fromTo(
            containerRef.current.querySelectorAll('.animate-fade-in'),
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
            }
        );

        // Stagger cards
        gsap.fromTo(
            cardsRef.current.children,
            { y: 50, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: 'top 85%',
                },
            }
        );
    }, []);

    return (
        <section id="about" className="relative min-h-[100svh] flex flex-col justify-center py-24 px-6 bg-slate-950 overflow-hidden" ref={containerRef}>

            {/* Background blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto w-full relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="animate-fade-in text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4">
                        Manifiesto de Desarrollo
                    </h2>
                    <h3 className="animate-fade-in text-4xl md:text-5xl font-bold text-white mb-6">
                        Mi Filosofía con la <span className="text-gradient">Inteligencia Artificial</span>
                    </h3>
                    <p className="animate-fade-in text-lg text-slate-400 leading-relaxed">
                        En un ecosistema en constante evolución, utilizo herramientas de IA como un <strong className="text-slate-200">complemento potenciador</strong>, nunca como una dependencia. Así es como integro la IA en mi proceso de ingeniería.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" ref={cardsRef}>

                    {/* Card 1 */}
                    <div className="glass-card p-6 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6">
                            <Code className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h4 className="text-xl font-semibold text-white mb-3">Acelerador, no Muleta</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Uso la IA para reducir el tiempo en código repetitivo y boilerplate, permitiéndome enfocar toda mi energía cognitiva en la arquitectura y lógica compleja.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="glass-card p-6 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                            <Cpu className="w-6 h-6 text-purple-400" />
                        </div>
                        <h4 className="text-xl font-semibold text-white mb-3">Comprensión Total</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Cada línea de código generada es leída, analizada y refactorizada. No implemento soluciones que no pueda explicar o mantener a largo plazo.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="glass-card p-6 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                            <Workflow className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h4 className="text-xl font-semibold text-white mb-3">Visión Macro</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Al delegar la escritura sintáctica, obtengo una vista panorámica del producto, permitiéndome pensar en el flujo del usuario y el valor real del negocio.
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="glass-card p-6 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
                            <Bot className="w-6 h-6 text-blue-400" />
                        </div>
                        <h4 className="text-xl font-semibold text-white mb-3">Estudio Constante</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Interactuar con IA es también investigar. La utilizo para descubrir patrones de diseño modernos, aprender sobre rendimiento y explorar nuevas bibliotecas.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}
