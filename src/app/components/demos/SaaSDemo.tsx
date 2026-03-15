import { useRef, useEffect, useState } from 'react';
import { Smartphone, Monitor, ArrowRightLeft } from 'lucide-react';
import { PhoneFrame } from './PhoneFrame';

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

                // Forzar vista individual si el contenedor o la ventana son pequeños
                if (width < 900 || window.innerWidth < 900) {
                    setActiveView(prev => prev === 'both' ? 'web' : prev);
                }
            }
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // La vista dual solo tiene sentido en pantallas con suficiente espacio real (> 900px)
    const canShowDualView = containerWidth >= 900 && typeof window !== 'undefined' && window.innerWidth >= 900;

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
                {/* Web Store Iframe Area with Smart Scaling */}
                <div className={`transition-all duration-500 ease-in-out bg-white relative flex justify-center overflow-hidden ${activeView === 'both' ? 'flex-1 h-full' :
                    activeView === 'web' ? 'w-full h-full' : 'absolute w-0 opacity-0 pointer-events-none'
                    }`}>

                    {/* Scaling Wrapper for ultra-narrow viewports (e.g., Galaxy Fold) */}
                    <div
                        style={{
                            width: containerWidth < 375 && activeView === 'web' ? 375 : '100%',
                            height: '100%',
                            transform: containerWidth < 375 && activeView === 'web' ? `scale(${containerWidth / 375})` : 'scale(1)',
                            transformOrigin: 'top center',
                            flexShrink: 0
                        }}
                        className="relative h-full transition-transform duration-300"
                    >
                        <iframe
                            ref={webIframeRef}
                            src="demos/saas/index.html?view=web"
                            title="SaaS Web Store"
                            className="absolute inset-0 w-full h-full border-0"
                        />
                    </div>
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

                    {/* Full-screen on actual mobile (< md), phone frame on md+ */}
                    {/* Mobile Admin App View */}
                    {activeView === 'app' ? (
                        <PhoneFrame title="SaaS Admin App" className="w-full h-full">
                            <iframe
                                ref={appIframeRef}
                                src="demos/saas/index.html?view=app"
                                title="SaaS Admin App"
                                className="w-full h-full border-0 scrollbar-hide"
                                style={{ transform: 'translateZ(0)' }}
                            />
                        </PhoneFrame>
                    ) : (
                        /* Dual view: compact frame on the right */
                        <div className="w-[320px] xl:w-[380px] h-full flex items-center justify-center bg-slate-950 border-l border-white/5">
                            <PhoneFrame title="Admin App" className="w-full h-full p-2 md:p-4">
                                <iframe
                                    ref={appIframeRef}
                                    src="demos/saas/index.html?view=app"
                                    title="SaaS Admin App Dual"
                                    className="w-full h-full border-0 scrollbar-hide"
                                    style={{ transform: 'translateZ(0)' }}
                                />
                            </PhoneFrame>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
