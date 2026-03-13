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
    const [activeView, setActiveView] = useState<'both' | 'web' | 'app'>('both');

    // Relay de mensajes entre iframes
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Validar que el mensaje viene de uno de nuestros iframes
            const isFromApp = event.source === appIframeRef.current?.contentWindow;
            const isFromWeb = event.source === webIframeRef.current?.contentWindow;

            if (!isFromApp && !isFromWeb) return;

            // Retransmitir al otro iframe
            if (isFromApp && webIframeRef.current?.contentWindow) {
                webIframeRef.current.contentWindow.postMessage(event.data, '*');
            } else if (isFromWeb && appIframeRef.current?.contentWindow) {
                appIframeRef.current.contentWindow.postMessage(event.data, '*');
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // Detectar tamaño de pantalla para ajustar vista inicial
    useEffect(() => {
        const checkSize = () => {
            if (window.innerWidth < 1024) {
                setActiveView('web');
            } else {
                setActiveView('both');
            }
        };
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    return (
        <div className="w-full h-full flex flex-col bg-slate-900 overflow-hidden">
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
                    <div className="hidden lg:block w-px h-4 bg-white/10 mx-1" />
                    <button
                        onClick={() => setActiveView('both')}
                        className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeView === 'both' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <ArrowRightLeft className="w-3.5 h-3.5" /> Vista Dual
                    </button>

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
                <div className={`transition-all duration-500 ease-in-out bg-slate-950 flex items-center justify-center overflow-hidden border-l border-white/5 ${activeView === 'both' ? 'w-[280px] xl:w-[320px]' :
                    activeView === 'app' ? 'w-full' : 'absolute w-0 opacity-0 pointer-events-none right-0'
                    }`}>
                    {/* Device Simulation Container */}
                    <div className="relative flex items-center justify-center p-2">
                        {/* Realistic Phone Frame Overlay */}
                        <div className="relative bg-slate-800 rounded-[3rem] p-2 shadow-2xl border-2 border-white/10 scale-[0.85] xl:scale-100 origin-center transition-transform">

                            {/* Clipping container for the iframe - Using !important and mask-image for definitive clipping */}
                            <div
                                className="w-[280px] h-[580px] sm:w-[300px] sm:h-[600px] !rounded-[2.4rem] !overflow-hidden relative z-10 isolation-isolate"
                                style={{
                                    maskImage: 'radial-gradient(white, black)', // Trigger for some engines
                                    WebkitMaskImage: '-webkit-radial-gradient(white, black)', // Legacy trigger
                                    clipPath: 'inset(0 round 2.4rem)' // Modern standard
                                }}
                            >
                                <iframe
                                    ref={appIframeRef}
                                    src="demos/saas/index.html?view=app"
                                    title="SaaS Admin App"
                                    className="w-full h-full border-0 !rounded-[2.4rem]"
                                    style={{ transform: 'translateZ(0)' }}
                                />
                            </div>

                            {/* Bottom Home Indicator */}
                            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full z-20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
