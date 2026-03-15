import { useState, useEffect } from 'react';
import { ShoppingCart, LayoutGrid, Package, Settings, Search, Menu, CheckCircle2, ChevronRight, Store, Smartphone, Loader2, ArrowRightLeft, User, Bell } from 'lucide-react';
import { toast } from 'sonner';

export function MarceDemo() {
    const [viewMode, setViewMode] = useState<'client' | 'admin'>('client');
    const [isSaving, setIsSaving] = useState(false);

    // Shared State between Admin and Client
    const [productStock, setProductStock] = useState(5);
    const [productPrice, setProductPrice] = useState(1200);
    const [tempPrice, setTempPrice] = useState('1200');

    // Sync input when props change externally (though here it's all local)
    useEffect(() => {
        setTempPrice(productPrice.toString());
    }, [productPrice]);

    const handleUpdateStock = (change: number) => {
        setIsSaving(true);
        setTimeout(() => {
            setProductStock(prev => Math.max(0, prev + change));
            setIsSaving(false);
            toast.success('Stock actualizado en tiempo real');
        }, 600);
    };

    const handleUpdatePrice = () => {
        setIsSaving(true);
        setTimeout(() => {
            setProductPrice(Number(tempPrice));
            setIsSaving(false);
            toast.success('Precio guardado y publicado en la tienda');
        }, 800);
    };

    const handleAddToCart = () => {
        if (productStock > 0) {
            toast.success('Producto agregado al carrito');
        } else {
            toast.error('Producto sin stock disponible');
        }
    };

    return (
        <div className="w-full h-full flex flex-col relative bg-slate-100 overflow-hidden font-sans">

            {/* Viewport Toggle Switcher */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-white p-1.5 rounded-full shadow-lg border border-slate-200 flex items-center gap-1">
                    <button
                        onClick={() => setViewMode('client')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${viewMode === 'client' ? 'bg-rose-50 text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                    >
                        <Store className="w-4 h-4" /> Tienda Web
                    </button>
                    <div className="w-6 flex justify-center text-slate-300">
                        <ArrowRightLeft className="w-4 h-4" />
                    </div>
                    <button
                        onClick={() => setViewMode('admin')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${viewMode === 'admin' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                    >
                        <Smartphone className="w-4 h-4" /> App SaaS
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 w-full h-full relative overflow-hidden flex items-center justify-center pt-20 pb-4">

                {/* -------------------- CLIENT VIEW (WEB TIENDA) -------------------- */}
                <div className={`absolute inset-4 sm:inset-8 transition-all duration-700 ease-in-out transform ${viewMode === 'client' ? 'opacity-100 translate-y-0 scale-100 z-10' : 'opacity-0 translate-y-12 scale-95 pointer-events-none z-0'}`}>
                    <div className="w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col border border-slate-200">
                        {/* Browser Bar */}
                        <div className="h-12 bg-slate-100 border-b border-slate-200 flex items-center px-4 shrink-0">
                            <div className="flex gap-1.5 mr-4">
                                <div className="w-3 h-3 rounded-full bg-rose-400" />
                                <div className="w-3 h-3 rounded-full bg-amber-400" />
                                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                            </div>
                            <div className="flex-1 max-w-lg mx-auto bg-white h-7 rounded px-3 flex items-center text-xs text-slate-400 border border-slate-200 justify-center font-medium shadow-sm">
                                https://tienda.dulcesmarce.cl/producto/alfajor-milka
                            </div>
                        </div>

                        {/* Web Content */}
                        <div className="flex-1 overflow-y-auto w-full flex flex-col pt-10">
                            <div className="max-w-4xl mx-auto w-full px-8 pb-16 flex flex-col md:flex-row gap-12">
                                {/* Product Image Mock */}
                                <div className="w-full md:w-1/2 aspect-square bg-rose-50 rounded-3xl border-2 border-dashed border-rose-200 flex items-center justify-center relative overflow-hidden group">
                                    <div className="w-48 h-48 bg-white rounded-full shadow-2xl flex items-center justify-center text-rose-300">
                                        <Package className="w-20 h-20" />
                                    </div>
                                    {productStock === 0 && (
                                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
                                            <div className="bg-slate-900 text-white font-black text-2xl px-8 py-4 rounded-xl rotate-[-10deg] shadow-2xl border-4 border-slate-800">
                                                AGOTADO
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="w-full md:w-1/2 flex flex-col justify-center">
                                    <div className="text-xs font-bold text-rose-500 tracking-wider uppercase mb-3">Golosinas Premium</div>
                                    <h1 className="text-4xl font-black text-slate-900 mb-4 leading-tight">Alfajor Triple Milka Dulce de Leche</h1>

                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="text-3xl font-bold text-slate-800">${productPrice.toLocaleString('es-CL')}</div>
                                        {productStock > 0 ? (
                                            <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold flex items-center gap-1">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                                Stock Disponible ({productStock})
                                            </div>
                                        ) : (
                                            <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center gap-1">
                                                <div className="w-2 h-2 bg-red-500 rounded-full" />
                                                Sin Stock
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-slate-500 leading-relaxed mb-8">
                                        Delicioso alfajor relleno con el más suave dulce de leche, bañado en el inconfundible chocolate Milka con leche alpina. El bocadillo perfecto para acompañar tu café o darte un gusto a cualquier hora.
                                    </p>

                                    <button
                                        onClick={handleAddToCart}
                                        disabled={productStock === 0}
                                        className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${productStock > 0 ? 'bg-rose-500 text-white shadow-xl shadow-rose-500/30 hover:bg-rose-600 hover:scale-[1.02]' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        {productStock > 0 ? 'Agregar al Carrito' : 'No Disponible'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* -------------------- ADMIN VIEW (SAAS APP) -------------------- */}
                <div className={`transition-all duration-700 ease-in-out transform flex items-center justify-center ${viewMode === 'admin' ? 'opacity-100 translate-y-0 scale-100 z-10' : 'opacity-0 translate-y-12 scale-95 pointer-events-none absolute z-0'}`}>
                    {/* Mobile Phone Frame Wrapper */}
                    <div className="w-[min(320px,80vw)] h-[min(600px,72vh)] bg-slate-900 rounded-[3rem] p-3 shadow-2xl relative border-slate-800 border-2">
                        {/* Hardware Buttons */}
                        <div className="absolute top-24 -left-[3px] w-[3px] h-12 bg-slate-700 rounded-l-md" />
                        <div className="absolute top-40 -left-[3px] w-[3px] h-12 bg-slate-700 rounded-l-md" />
                        <div className="absolute top-32 -right-[3px] w-[3px] h-16 bg-slate-700 rounded-r-md" />

                        {/* Screen */}
                        <div className="w-full h-full bg-slate-50 rounded-[2.25rem] overflow-hidden flex flex-col relative">
                            {/* Dynamic Island / Notch Mock */}
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30" />

                            {/* App Header */}
                            <div className="bg-indigo-600 pt-12 pb-6 px-6 rounded-b-3xl shadow-lg relative z-20 shrink-0">
                                <div className="flex justify-between items-center mb-6 text-white">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                            <Store className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h1 className="font-bold text-base leading-tight">Marce Admin</h1>
                                            <p className="text-[10px] text-indigo-200">Panel de Control</p>
                                        </div>
                                    </div>
                                    <button className="p-2 bg-indigo-700/50 rounded-full hover:bg-indigo-700 transition">
                                        <Bell className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* App Content */}
                            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5 -mt-4 relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <Package className="w-5 h-5 text-slate-400" />
                                    <h2 className="font-bold text-slate-700">Edición Rápida</h2>
                                </div>

                                {/* Active Editing Product Card */}
                                <div className="bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                                    <div className="flex gap-4 mb-5">
                                        <div className="w-16 h-16 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-center text-indigo-300">
                                            <Package className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800 text-sm mb-1 leading-tight">Alfajor Triple Milka Dulce de Leche</h3>
                                            <p className="text-[10px] text-slate-400 font-medium">SKU: MILKA-TRIPLE-01</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Stock Control */}
                                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-bold text-slate-500 uppercase">Stock Actual</p>
                                                <p className="font-black text-xl text-slate-800">{productStock}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleUpdateStock(-1)}
                                                    disabled={isSaving || productStock === 0}
                                                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg transition-colors cursor-pointer ${productStock > 0 ? 'bg-white border border-slate-200 text-slate-700 shadow-sm hover:bg-slate-50' : 'bg-slate-100 text-slate-300'}`}
                                                >
                                                    -
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateStock(1)}
                                                    disabled={isSaving}
                                                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg bg-indigo-600 border border-indigo-700 text-white shadow-sm hover:bg-indigo-700 transition-colors cursor-pointer"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* Price Control */}
                                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                            <p className="text-xs font-bold text-slate-500 uppercase mb-2">Precio Público ($)</p>
                                            <div className="flex gap-2">
                                                <div className="relative flex-1">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                                                    <input
                                                        type="number"
                                                        value={tempPrice}
                                                        onChange={(e) => setTempPrice(e.target.value)}
                                                        className="w-full pl-7 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                                    />
                                                </div>
                                                <button
                                                    onClick={handleUpdatePrice}
                                                    disabled={isSaving || Number(tempPrice) === productPrice}
                                                    className={`px-4 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center min-w-[80px] ${Number(tempPrice) !== productPrice ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700' : 'bg-slate-200 text-slate-400'}`}
                                                >
                                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Guardar'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Nav */}
                            <div className="h-[72px] bg-white border-t border-slate-100 flex justify-around items-center px-4 shrink-0 pb-2">
                                <div className="flex flex-col items-center gap-1 text-indigo-600">
                                    <LayoutGrid className="w-5 h-5" />
                                    <span className="text-[10px] font-bold">Catálogo</span>
                                </div>
                                <div className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                                    <ShoppingCart className="w-5 h-5" />
                                    <span className="text-[10px] font-bold">Pedidos</span>
                                </div>
                                <div className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                                    <Settings className="w-5 h-5" />
                                    <span className="text-[10px] font-bold">Ajustes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
