import { useState, useEffect } from 'react';
import { X, Smartphone, Tablet, Monitor } from 'lucide-react';
import { createPortal } from 'react-dom';

interface AppDemoModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

type DeviceView = 'mobile' | 'tablet' | 'desktop';

export function AppDemoModal({ isOpen, onClose, title, children }: AppDemoModalProps) {
    const [view, setView] = useState<DeviceView>('desktop');

    // Prevent scrolling on background when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const viewWidths = {
        mobile: 'max-w-[375px]',
        tablet: 'max-w-[768px]',
        desktop: 'max-w-[1200px]',
    };

    const modalContent = (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300">

            {/* Modal Container */}
            <div className={`w-full h-full md:h-[90vh] bg-slate-900 md:rounded-3xl border border-white/10 flex flex-col shadow-2xl relative transition-all duration-500 overflow-hidden ${viewWidths[view]}`}>

                {/* Header / Controls */}
                <div className="h-16 border-b border-white/10 flex justify-between items-center px-4 md:px-6 bg-slate-950/50 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1.5 opacity-50 md:opacity-100 hidden sm:flex">
                            <div className="w-3 h-3 rounded-full bg-rose-500" />
                            <div className="w-3 h-3 rounded-full bg-amber-500" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        </div>
                        <h3 className="font-bold text-white text-lg tracking-wide">{title}</h3>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Viewport Toggles (Hidden on real mobile devices, only for desktop simulation) */}
                        <div className="hidden md:flex bg-slate-800/50 p-1 rounded-xl border border-white/5">
                            <button
                                onClick={() => setView('mobile')}
                                className={`p-2 rounded-lg transition-colors ${view === 'mobile' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                title="Vista Móvil"
                            >
                                <Smartphone className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setView('tablet')}
                                className={`p-2 rounded-lg transition-colors ${view === 'tablet' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                title="Vista Tablet"
                            >
                                <Tablet className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setView('desktop')}
                                className={`p-2 rounded-lg transition-colors ${view === 'desktop' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                title="Vista Escritorio"
                            >
                                <Monitor className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Back/Close Button */}
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                        >
                            <span className="hidden sm:inline">Volver al Portafolio</span>
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Demo Content Area */}
                <div className="flex-1 w-full bg-slate-950 overflow-hidden relative border-x-4 md:border-x-0 border-slate-900 shadow-inner">
                    {children}
                </div>

            </div>
        </div>
    );

    // Usa createPortal para asegurar que el modal se renderice en el body y cubra todo sin problemas de overflow
    return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
