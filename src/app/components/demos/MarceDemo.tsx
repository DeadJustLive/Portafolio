import { useState } from 'react';
import { ShoppingCart, LayoutGrid, Package, Settings, Truck, CreditCard, User, LogOut, Search, Menu, CheckCircle2 } from 'lucide-react';

export function MarceDemo() {
    const [activeTab, setActiveTab] = useState<'kiosk' | 'web'>('web');
    const [theme, setTheme] = useState<'light' | 'dark' | 'brand'>('dark');

    const themeClasses = {
        light: 'bg-white text-slate-800 border-slate-200',
        dark: 'bg-slate-900 text-white border-slate-700',
        brand: 'bg-rose-950 text-rose-50 border-rose-800'
    };

    const accentClasses = {
        light: 'bg-rose-500 text-white',
        dark: 'bg-rose-600 text-white',
        brand: 'bg-rose-500 text-white'
    };

    return (
        <div className="w-full h-full flex flex-col relative bg-slate-950/50 rounded-b-[2rem] overflow-hidden">
            {/* Controls Bar */}
            <div className="absolute top-4 right-4 z-50 flex gap-2">
                <div className="flex bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10">
                    <button
                        onClick={() => setTheme('light')}
                        className={`w-6 h-6 rounded-full transition-all ${theme === 'light' ? 'bg-white scale-110 shadow-lg' : 'bg-slate-300 opacity-50 hover:opacity-100'}`}
                        title="Tema Claro"
                    />
                    <button
                        onClick={() => setTheme('dark')}
                        className={`w-6 h-6 rounded-full ml-1 transition-all ${theme === 'dark' ? 'bg-slate-800 border border-slate-600 scale-110 shadow-lg' : 'bg-slate-700 opacity-50 hover:opacity-100'}`}
                        title="Tema Oscuro"
                    />
                    <button
                        onClick={() => setTheme('brand')}
                        className={`w-6 h-6 rounded-full ml-1 transition-all ${theme === 'brand' ? 'bg-rose-900 border border-rose-500 scale-110 shadow-lg' : 'bg-rose-900 opacity-50 hover:opacity-100'}`}
                        title="Tema Marca"
                    />
                </div>
            </div>

            <div className="flex-1 flex w-full h-full p-6 gap-6 items-center justify-center">

                {/* Mobile App Standin (Admin/Kiosk Context) */}
                <div className={`w-[280px] h-[500px] shrink-0 rounded-[2.5rem] border-8 shadow-2xl relative overflow-hidden flex flex-col transition-colors duration-500 ${themeClasses[theme]} border-black/80`}>
                    {/* Notch */}
                    <div className="absolute top-0 inset-x-0 h-6 bg-black/80 rounded-b-xl w-32 mx-auto z-20" />

                    {/* App Header */}
                    <div className={`pt-10 pb-4 px-5 flex justify-between items-center border-b transition-colors duration-500 ${theme === 'light' ? 'border-slate-100' : 'border-white/10'}`}>
                        <div className="flex items-center gap-2">
                            <Menu className="w-5 h-5 opacity-70" />
                            <span className="font-bold text-lg">Pedidos App</span>
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${accentClasses[theme]}`}>
                            <Package className="w-4 h-4" />
                        </div>
                    </div>

                    {/* App Content (Active Orders) */}
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar">
                        <div className="text-xs font-bold uppercase tracking-wider opacity-50 mb-2">Para preparar</div>

                        <div className={`p-4 rounded-2xl border transition-colors duration-500 ${theme === 'light' ? 'bg-white shadow-sm border-slate-100' : 'bg-white/5 border-white/5'}`}>
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold">#ORD-089</span>
                                <span className={`text-[10px] px-2 py-1 rounded font-bold ${accentClasses[theme]}`}>NUEVO</span>
                            </div>
                            <div className="text-sm opacity-70 mb-3">Retiro en Domicilio • 3 items</div>
                            <button className={`w-full py-2 rounded-xl text-sm font-semibold transition-colors duration-500 ${accentClasses[theme]}`}>
                                Preparar
                            </button>
                        </div>

                        <div className={`p-4 rounded-2xl border transition-colors duration-500 ${theme === 'light' ? 'bg-slate-50 border-slate-100' : 'bg-black/20 border-white/5'}`}>
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold opacity-70">#ORD-088</span>
                                <span className="text-[10px] px-2 py-1 rounded font-bold bg-amber-500/20 text-amber-500">PAGO PENDIENTE</span>
                            </div>
                            <div className="text-sm opacity-50">Starken • 1 item</div>
                        </div>
                    </div>

                    {/* Mobile Nav */}
                    <div className={`h-16 border-t flex justify-around items-center px-2 transition-colors duration-500 ${theme === 'light' ? 'border-slate-100 bg-white' : 'border-white/10 bg-black/20'}`}>
                        <LayoutGrid className={`w-6 h-6 ${theme === 'light' ? 'text-rose-500' : 'text-rose-400'}`} />
                        <Search className="w-6 h-6 opacity-40" />
                        <Settings className="w-6 h-6 opacity-40" />
                    </div>
                </div>

                {/* Web View Standin (E-commerce Checkout) */}
                <div className={`flex-1 max-w-[500px] h-[500px] rounded-xl shadow-2xl relative overflow-hidden flex flex-col transition-colors duration-500 ${themeClasses[theme]} border ${theme === 'light' ? 'border-slate-200' : 'border-white/10'}`}>
                    {/* Browser Header */}
                    <div className={`h-10 flex items-center px-4 gap-2 border-b transition-colors duration-500 ${theme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-black/40 border-white/10'}`}>
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                        </div>
                        <div className={`flex-1 mx-4 h-6 rounded bg-black/10 flex items-center justify-center text-[10px] opacity-50`}>
                            tienda.dulcesmarce.cl/checkout
                        </div>
                    </div>

                    {/* Web Content */}
                    <div className="flex-1 p-8 overflow-y-auto">
                        <div className="flex justify-between items-end mb-8">
                            <h1 className="text-2xl font-bold">Finalizar Compra</h1>
                            <div className="flex gap-2 text-sm font-semibold opacity-50">
                                <span className={`${theme === 'light' ? 'text-rose-500 opacity-100' : 'text-rose-400 opacity-100'}`}>1. Datos</span>
                                <span>—</span>
                                <span>2. Pago</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Simulated Form */}
                            <div className={`p-5 rounded-2xl border transition-colors duration-500 ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-black/20 border-white/5'}`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <User className="w-5 h-5 opacity-70" />
                                    <h2 className="font-semibold">Información Personal</h2>
                                </div>
                                <div className="space-y-3">
                                    <div className={`h-10 rounded-lg border flex items-center px-3 text-sm opacity-50 transition-colors duration-500 ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-black/20 border-white/10'}`}>Nombre Completo</div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className={`h-10 rounded-lg border flex items-center px-3 text-sm opacity-50 transition-colors duration-500 ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-black/20 border-white/10'}`}>RUT</div>
                                        <div className={`h-10 rounded-lg border flex items-center px-3 text-sm opacity-50 transition-colors duration-500 ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-black/20 border-white/10'}`}>Teléfono</div>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Options */}
                            <div className="space-y-3">
                                <div className={`p-4 rounded-xl border-2 flex justify-between items-center cursor-pointer transition-colors duration-500 ${theme === 'light' ? 'border-rose-500 bg-rose-50' : 'border-rose-500 bg-rose-500/10'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 rounded-full border-4 ${theme === 'light' ? 'border-rose-500 bg-white' : 'border-rose-500 bg-transparent'}`} />
                                        <div>
                                            <div className="font-bold">Retiro en Domicilio</div>
                                            <div className="text-xs opacity-70">Gratis - Coordina por Whatsapp</div>
                                        </div>
                                    </div>
                                    <span className="font-bold text-rose-500">$0</span>
                                </div>

                                <div className={`p-4 rounded-xl border flex justify-between items-center opacity-50 transition-colors duration-500 ${theme === 'light' ? 'border-slate-200 bg-white' : 'border-white/10 bg-transparent'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 rounded-full border-2 ${theme === 'light' ? 'border-slate-300' : 'border-slate-600'}`} />
                                        <div>
                                            <div className="font-bold">Envío Starken</div>
                                            <div className="text-xs">Por pagar en destino</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button className={`px-8 py-3 rounded-xl font-bold shadow-lg transition-transform hover:scale-105 duration-300 ${accentClasses[theme]}`}>
                                    Continuar al Pago
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
