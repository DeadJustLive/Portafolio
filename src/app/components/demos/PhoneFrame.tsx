import React from 'react';

interface PhoneFrameProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

/**
 * Reusable Phone Frame Component
 * Simulates a modern smartphone frame with correct proportions (9:19.5 approx).
 * Ensures content stays contained and doesn't stretch horizontally.
 */
export function PhoneFrame({ children, title, className = "" }: PhoneFrameProps) {
    return (
        <div className={`relative w-full h-full flex items-center justify-center p-2 md:p-4 ${className}`}>
            <div className="relative bg-slate-800 rounded-[3.2rem] p-2.5 shadow-2xl border-2 border-white/10 w-auto h-full max-w-full max-h-full aspect-[9/19.5] flex flex-col isolation-isolate overflow-hidden mx-auto">

                {/* Physical Bezel/Frame simulation */}
                <div
                    className="flex-1 w-full bg-slate-900 rounded-[2.4rem] overflow-hidden relative z-10"
                    style={{
                        maskImage: 'radial-gradient(white, black)',
                        WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                        clipPath: 'inset(0 round 2.4rem)'
                    }}
                >
                    {children}
                </div>

                {/* Bottom Bar Indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 rounded-full z-20" />

                {/* Optional Title Overlay (Native-like) */}
                {title && (
                    <div className="absolute top-8 left-0 w-full text-center z-20 pointer-events-none">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{title}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
