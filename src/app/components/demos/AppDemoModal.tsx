import { useState, useEffect } from 'react';
import { X, Smartphone, Tablet, Monitor } from 'lucide-react';
import { createPortal } from 'react-dom';

interface AppDemoModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    mobileOnly?: boolean;
    forceWide?: boolean;
}

type DeviceView = 'mobile' | 'tablet' | 'wide';

export function AppDemoModal({ isOpen, onClose, title, children, mobileOnly, forceWide }: AppDemoModalProps) {
    const [view, setView] = useState<DeviceView>('mobile');

    // Prevent scrolling on background when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Reiniciar la vista por defecto
            setView(forceWide ? 'wide' : 'mobile');
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, forceWide]);

    if (!isOpen) return null;

    const viewWidths = {
        mobile: 'max-w-[390px] h-full md:h-[min(844px,85dvh)]',
        tablet: 'max-w-[768px] h-full md:h-[min(1024px,85dvh)]',
        wide: 'max-w-[1280px] h-full md:h-[min(900px,90dvh)]',
    };

    const modalContent = (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300 p-0 md:p-6">

            {/* Modal Container */}
            <div className={`w-full flex flex-col shadow-2xl relative transition-all duration-500 overflow-hidden ${viewWidths[view]} md:rounded-3xl md:border md:border-white/10 mx-auto`}>

                {/* Header / Controls */}
                <div className="h-16 border-b border-white/10 flex justify-between items-center px-4 md:px-5 bg-slate-950/80 shrink-0 w-full">
                    <div className="flex items-center gap-3 min-w-0 flex-1 mr-4">
                        <div className="flex gap-1.5 opacity-50 md:opacity-100 hidden sm:flex shrink-0">
                            <div className="w-3 h-3 rounded-full bg-rose-500" />
                            <div className="w-3 h-3 rounded-full bg-amber-500" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        </div>
                        <h3 className="font-bold text-white text-sm md:text-base tracking-wide truncate min-w-0">{title}</h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        {/* Viewport Toggles (Hidden on real mobile devices, only for desktop simulation) */}
                        {!mobileOnly && (
                            <div className="hidden md:flex bg-slate-800/50 p-1 rounded-xl border border-white/5 shrink-0">
                                <button
                                    onClick={() => setView('mobile')}
                                    className={`p-1.5 rounded-lg transition-colors ${view === 'mobile' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                    title="Vista Móvil"
                                >
                                    <Smartphone className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setView('tablet')}
                                    className={`p-1.5 rounded-lg transition-colors ${view === 'tablet' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                    title="Vista Tablet"
                                >
                                    <Tablet className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setView('wide')}
                                    className={`p-1.5 rounded-lg transition-colors ${view === 'wide' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                    title="Vista Escritorio"
                                >
                                    <Monitor className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {/* Back/Close Button */}
                        <button
                            onClick={onClose}
                            className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white rounded-xl font-medium transition-colors flex items-center justify-center shrink-0"
                            title="Cerrar Simulador"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Demo Content Area (Mobile Container Frame Simulation) */}
                <div className="flex-1 w-full bg-slate-950 overflow-hidden relative shadow-inner">
                    {children}
                </div>

            </div>
        </div>
    );

    // Usa createPortal para asegurar que el modal se renderice en el body y cubra todo sin problemas de overflow
    return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
