import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Code2, Rocket, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function AboutMe() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !contentRef.current || !imageRef.current) return;

        const ctx = gsap.context(() => {
            // Image animation
            gsap.fromTo(
                imageRef.current,
                { x: -50, opacity: 0, scale: 0.9 },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                }
            );

            // Content animation
            gsap.fromTo(
                contentRef.current!.querySelectorAll('.animate-text'),
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about-me" className="relative py-24 px-6 bg-slate-950 overflow-hidden" ref={sectionRef}>
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left: Image/Photo Section */}
                    <div ref={imageRef} className="relative aspect-square max-w-md mx-auto lg:mx-0 order-1 lg:order-1">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-emerald-500/20 rounded-3xl transform rotate-3" />
                        <div className="glass shadow-2xl rounded-3xl w-full h-full relative z-10 flex items-center justify-center overflow-hidden border border-white/10 group">
                            
                            <img 
                                src="ProfileImg.jpeg" 
                                alt="Matias Retamal" 
                                className="w-full h-full object-cover rounded-3xl transition-transform duration-500 hover:scale-105"
                            />
                            
                            {/* Decorative element inside photo frame */}
                            <div className="absolute bottom-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                                <Code2 className="text-emerald-400 w-12 h-12" />
                            </div>
                        </div>
                        {/* Decorative background circle */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-[60px]" />
                    </div>

                    {/* Right: Text Content */}
                    <div ref={contentRef} className="order-2 lg:order-2">
                        <h2 className="animate-text text-sm font-bold tracking-widest text-emerald-400 uppercase mb-4 flex items-center gap-2">
                            Sobre mí
                        </h2>
                        <h3 className="animate-text text-4xl font-bold text-white mb-8">
                            Arquitecto de soluciones con <span className="text-gradient">visión humana</span> y potencia digital.
                        </h3>

                        <div className="space-y-6 text-lg text-slate-400 leading-relaxed">

                            <p className="animate-text">
                                Mi nombre es Matias Retamal, tengo 22 años y soy estudiante de <strong className="text-slate-200">Desarrollo de Software en Duoc UC</strong>, me apasiona crear soluciones que no solo funcionen, sino que se sientan naturales. Me especializo en ecosistemas modernos como <span className="text-indigo-400">Angular</span>, <span className="text-emerald-400">Ionic</span> y <span className="text-blue-400">Node.js</span>.
                            </p>

                            <p className="animate-text">
                                Mi metodología se aleja de la codificación mecánica. Trabajo bajo lo que llamo <strong className="text-indigo-300">"Sinergia Agentic"</strong>: utilizo la IA como un motor de ejecución para centrar mi energía en la arquitectura, la experiencia de usuario y la resolución de problemas de negocio complejos. Creo firmemente que el código debe ser tan elocuente como su propósito.
                            </p>

                            <p className="animate-text border-l-2 border-emerald-500/30 pl-6 italic">
                                "Mi objetivo es transformar ideas abstractas en herramientas reales y escalables que simplifiquen la vida de las personas, cuidando cada detalle desde la lógica del servidor hasta la última animación de la interfaz."
                            </p>
                        </div>

                        <div className="animate-text mt-10 grid grid-cols-2 gap-6 pb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                                    <Rocket size={20} />
                                </div>
                                <span className="text-sm font-medium text-slate-300">Mejora Continua</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                                    <Heart size={20} />
                                </div>
                                <span className="text-sm font-medium text-slate-300">Diseño Consciente</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
