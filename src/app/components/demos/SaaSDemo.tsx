import { useRef, useEffect, useState } from 'react';
import { Smartphone, Monitor, ArrowRightLeft } from 'lucide-react';

/**
 * SaaSDemo
 * Integración dual del sistema SaaS: Tienda Web + App Admin.
 * Implementa un relay de postMessage para mantener ambos iframes sincronizados.
 */
export function SaaSDemo() {
    const webIframeRef = useRef<HTMLIFrameElement>(null);
    const appIframeRef = useRef<HTMLIFrameElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeView, setActiveView] = useState<'both' | 'web' | 'app'>('both');
    const [containerWidth, setContainerWidth] = useState(0);

    // Relay de mensajes entre iframes
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const isFromApp = event.source === appIframeRef.current?.contentWindow;
            const isFromWeb = event.source === webIframeRef.current?.contentWindow;

            if (!isFromApp && !isFromWeb) return;

            if (isFromApp && webIframeRef.current?.contentWindow) {
                webIframeRef.current.contentWindow.postMessage(event.data, '*');
            } else if (isFromWeb && appIframeRef.current?.contentWindow) {
                appIframeRef.current.contentWindow.postMessage(event.data, '*');
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // Detectar tamaño del contenedor para ajustar vista (Responsive basado en contenedor)
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const width = entry.contentRect.width;
                setContainerWidth(width);

                // Si el contenedor es pequeño (ej. vista móvil del modal), forzar vista individual
                if (width < 1000) {
                    setActiveView(prev => prev === 'both' ? 'web' : prev);
                }
            }
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // Evaluar si mostramos la opción Vista Dual basada en el ancho del contenedor
    const canShowDualView = containerWidth >= 1000;

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col bg-slate-900 overflow-hidden">
            {/* View Switcher Bar */}
            <div className="flex items-center justify-center gap-2 p-3 bg-slate-950 border-b border-white/5 shrink-0 z-30">
                <div className="bg-slate-900 p-1 rounded-xl border border-white/5 flex items-center gap-1">
                    <button
                        onClick={() => setActiveView('web')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeView === 'web' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Monitor className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Tienda</span> Web
                    </button>

                    {/* Solo mostrar Vista Dual en pantallas grandes */}
                    {canShowDualView && (
                        <>
                            <div className="w-px h-4 bg-white/10 mx-1" />
                            <button
                                onClick={() => setActiveView('both')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeView === 'both' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <ArrowRightLeft className="w-3.5 h-3.5" /> Vista Dual
                            </button>
                        </>
                    )}

                    <div className="w-px h-4 bg-white/10 mx-1" />

                    <button
                        onClick={() => setActiveView('app')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeView === 'app' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Smartphone className="w-3.5 h-3.5" /> <span className="hidden sm:inline">App</span> Admin
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex overflow-hidden relative z-10">
                {/* Web Store Iframe Area */}
                <div className={`transition-all duration-500 ease-in-out bg-white relative ${activeView === 'both' ? 'flex-1 h-full' :
                    activeView === 'web' ? 'w-full h-full' : 'absolute w-0 opacity-0 pointer-events-none'
                    }`}>
                    <iframe
                        ref={webIframeRef}
                        src="demos/saas/index.html?view=web"
                        title="SaaS Web Store"
                        className="absolute inset-0 w-full h-full border-0"
                    />
                </div>

                {/* Mobile Admin Iframe */}
                <div className={`transition-all duration-500 ease-in-out bg-slate-950 flex justify-center border-l border-white/5 scrollbar-hide overflow-y-auto ${activeView === 'both' ? 'w-[320px] xl:w-[380px] items-stretch' :
                    activeView === 'app' ? 'w-full items-stretch' : 'absolute w-0 opacity-0 pointer-events-none right-0'
                    }`}>
                    <style>{`
                        .scrollbar-hide::-webkit-scrollbar {
                            display: none;
                        }
                        .scrollbar-hide {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }
                    `}</style>
                    {/* Device Simulation Container Centrado */}
                    <div className="relative flex items-center justify-center p-4 my-auto min-h-full">
                        {/* Realistic Phone Frame Overlay - Ajustado para 6.5" y mejor escalado */}
                        <div className="relative bg-slate-800 rounded-[3.2rem] p-2.5 shadow-2xl border-2 border-white/10 scale-[0.70] sm:scale-[0.80] xl:scale-90 2xl:scale-100 origin-center transition-transform">

                            {/* Clipping container for the iframe */}
                            <div
                                className="w-[300px] h-[640px] sm:w-[310px] sm:h-[670px] !rounded-[2.4rem] !overflow-hidden relative z-10 isolation-isolate"
                                style={{
                                    maskImage: 'radial-gradient(white, black)',
                                    WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                                    clipPath: 'inset(0 round 2.4rem)'
                                }}
                            >
                                <iframe
                                    ref={appIframeRef}
                                    src="demos/saas/index.html?view=app"
                                    title="SaaS Admin App"
                                    className="w-full h-full border-0 !rounded-[2.4rem] scrollbar-hide"
                                    style={{ transform: 'translateZ(0)' }}
                                />
                            </div>

                            {/* Bottom Home Indicator */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 rounded-full z-20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
