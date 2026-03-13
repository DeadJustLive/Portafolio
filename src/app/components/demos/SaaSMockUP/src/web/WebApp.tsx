import { useState, useEffect } from 'react';
import {
    ShoppingBag, ShoppingCart, Heart, Star, Instagram, Facebook,
    Menu, X, User, LogOut, Settings, Package, Headphones,
    ShieldCheck, CreditCard, Truck, ChevronRight, Trash2, Plus, Minus
} from 'lucide-react';
import type { Product } from '../shared/types';

interface CartItem extends Product { qty: number; }

interface WebAppProps {
    products: Product[];
}

type Theme = 'rose' | 'slate' | 'contrast';

const THEMES: Record<Theme, Record<string, string>> = {
    rose: {
        '--color-brand-primary': '#f43f5e',
        '--color-brand-secondary': '#4c1d95',
        '--color-brand-accent': '#818cf8',
        '--color-brand-background': '#fffdfd',
        '--color-brand-text': '#1e293b',
    },
    slate: {
        '--color-brand-primary': '#334155',
        '--color-brand-secondary': '#0f172a',
        '--color-brand-accent': '#94a3b8',
        '--color-brand-background': '#f8fafc',
        '--color-brand-text': '#0f172a',
    },
    contrast: {
        '--color-brand-primary': '#000000',
        '--color-brand-secondary': '#eab308',
        '--color-brand-accent': '#eab308',
        '--color-brand-background': '#ffffff',
        '--color-brand-text': '#000000',
    }
};

// ── Helpers ────────────────────────────────────────────────────────────────
const fmt = (n: number) => `$${n.toLocaleString('es-CL')}`;
const EMPRESA = 'NombreEmpresa';

// ── WebApp ─────────────────────────────────────────────────────────────────
export function WebApp({ products }: WebAppProps) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const [showCart, setShowCart] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [theme, setTheme] = useState<Theme>('rose');

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const applyTheme = (t: Theme) => {
        setTheme(t);
        const root = document.documentElement;
        Object.entries(THEMES[t]).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    };

    useEffect(() => {
        applyTheme('rose');
    }, []);

    const addToCart = (p: Product) => {
        if (!p.available || p.stock === 0) return;
        setCart(prev => {
            const existing = prev.find(i => i.id === p.id);
            if (existing) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
            return [...prev, { ...p, qty: 1 }];
        });
    };
    const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.id !== id));
    const updateQty = (id: string, delta: number) =>
        setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
    const toggleFav = (id: string) =>
        setFavorites(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

    const cartCount = cart.reduce((s, i) => s + i.qty, 0);
    const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

    const visibleProducts = products.filter(p => p.available);
    const featuredProducts = visibleProducts.filter(p => p.isFeatured);

    return (
        <div className="flex flex-col overflow-x-hidden min-h-full" style={{ background: 'var(--color-brand-background)' }}>

            {/* ── HEADER ────────────────────────────────────────────────────────── */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
                <div className="container mx-auto px-4 flex items-center justify-between">

                    {/* Mobile: menu + logo (Only on VERY small screens) */}
                    <div className="flex items-center gap-3 sm:hidden">
                        <button className="p-1" style={{ color: 'var(--color-brand-text)' }} onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <div className="flex items-center gap-1.5">
                            <div className="p-1 rounded-full text-white" style={{ background: 'var(--color-brand-primary)' }}>
                                <ShoppingBag size={16} />
                            </div>
                            <span className="text-base font-bold" style={{ color: 'var(--color-brand-secondary)' }}>{EMPRESA}</span>
                        </div>
                    </div>

                    {/* Desktop logo (Visible from sm up) */}
                    <div className="hidden sm:flex items-center gap-3 cursor-pointer shrink-0">
                        <div className="p-2 rounded-xl text-white shadow-lg" style={{ background: 'var(--color-brand-primary)' }}>
                            <ShoppingBag size={20} />
                        </div>
                        <span className="text-xl font-black tracking-tighter" style={{ color: 'var(--color-brand-secondary)' }}>{EMPRESA}</span>
                    </div>

                    {/* Desktop nav (Visible from sm up) */}
                    <nav className="hidden sm:flex items-center gap-4 lg:gap-8 flex-1 justify-center">
                        <div className="flex items-center gap-6 lg:gap-8 px-6 py-2 bg-gray-50/50 rounded-2xl border border-black/5">
                            <a href="#inicio" className="text-sm font-bold transition-all hover:scale-110" style={{ color: 'var(--color-brand-text)' }}>Inicio</a>
                            <a href="#productos" className="text-sm font-bold transition-all hover:scale-110" style={{ color: 'var(--color-brand-text)' }}>Productos</a>
                            <button className="text-sm font-bold transition-all hover:scale-110" style={{ color: 'var(--color-brand-text)' }}>Contacto</button>
                        </div>

                        {/* Theme Switcher */}
                        <div className="flex items-center gap-1.5 p-1.5 bg-gray-100 rounded-xl border border-black/5">
                            {(['rose', 'slate', 'contrast'] as Theme[]).map(t => (
                                <button
                                    key={t}
                                    onClick={() => applyTheme(t)}
                                    className={`w-6 h-6 rounded-lg border-2 transition-all ${theme === t ? 'scale-110 shadow-md border-white' : 'scale-90 opacity-50 border-transparent hover:opacity-100'}`}
                                    style={{ background: THEMES[t]['--color-brand-primary'] }}
                                    title={`Tema ${t}`}
                                />
                            ))}
                        </div>

                        <div className="relative border-l pl-5 lg:pl-8 border-gray-200">
                            {!isLoggedIn ? (
                                <button
                                    onClick={() => setIsLoggedIn(true)}
                                    className="flex items-center gap-2 text-xs font-black px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow-md border bg-white"
                                    style={{ color: 'var(--color-brand-primary)', borderColor: 'var(--color-brand-primary)' }}
                                >
                                    <User size={16} /> <span className="hidden lg:inline">Iniciar Sesión</span>
                                </button>
                            ) : (
                                <div className="relative">
                                    <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-xl transition-colors">
                                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-inner" style={{ background: 'var(--color-brand-primary)' }}>U</div>
                                        <div className="text-left hidden lg:block">
                                            <p className="text-xs font-black text-gray-800 leading-none">Usuario</p>
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Cart + theme toggle for mobile */}
                    <div className="flex items-center gap-2 shrink-0 ml-4">
                        <div className="flex sm:hidden items-center gap-1.5 p-1 bg-gray-100 rounded-lg mr-2">
                            {(['rose', 'slate', 'contrast'] as Theme[]).map(t => (
                                <button
                                    key={t}
                                    onClick={() => applyTheme(t)}
                                    className={`w-5 h-5 rounded-md border transition-all ${theme === t ? 'border-white ring-2 ring-gray-300' : 'border-transparent opacity-60'}`}
                                    style={{ background: THEMES[t]['--color-brand-primary'] }}
                                />
                            ))}
                        </div>
                        {!isLoggedIn
                            ? <button onClick={() => setIsLoggedIn(true)} className="p-2 sm:hidden" style={{ color: 'var(--color-brand-text)' }}><User size={20} /></button>
                            : <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs sm:hidden" style={{ background: 'var(--color-brand-primary)' }}>U</div>
                        }
                        <button
                            onClick={() => setShowCart(true)}
                            className="relative p-2.5 rounded-xl text-white font-bold transition-all hover:scale-105 shadow-lg shadow-rose-500/20"
                            style={{ background: 'var(--color-brand-primary)' }}
                        >
                            <ShoppingCart size={18} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100">
                        <div className="flex flex-col p-4 gap-4">
                            {!isLoggedIn
                                ? <button onClick={() => { setIsLoggedIn(true); setMenuOpen(false); }} className="flex items-center gap-3 p-4 rounded-xl font-bold justify-center text-white" style={{ background: 'var(--color-brand-primary)' }}><User size={20} /> Iniciar Sesión</button>
                                : <div className="bg-gray-50 p-4 rounded-xl mb-2 flex items-center gap-3"><div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: 'var(--color-brand-primary)' }}>U</div><div><p className="font-bold text-gray-800">Usuario Demo</p><p className="text-xs text-gray-500">usuario@demo.com</p></div></div>
                            }
                            {['Inicio', 'Productos', 'Contacto'].map(l => (
                                <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-lg font-medium" style={{ color: 'var(--color-brand-text)' }}>{l}</a>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            {/* ── HERO ──────────────────────────────────────────────────────────── */}
            <section id="inicio" className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] sm:w-[35vw] sm:h-[35vw] max-w-[500px] max-h-[500px] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" style={{ background: 'var(--color-brand-primary)', opacity: 0.15 }} />
                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] sm:w-[25vw] sm:h-[25vw] max-w-[400px] max-h-[400px] rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4" style={{ background: 'var(--color-brand-accent)', opacity: 0.2 }} />

                <div className="container mx-auto px-6 sm:px-12 relative z-10">
                    <div className="grid sm:grid-cols-2 gap-8 lg:gap-16 items-center">
                        {/* Text */}
                        <div className="text-center sm:text-left order-2 sm:order-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm mb-6 mx-auto sm:mx-0 border border-black/5">
                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-brand-secondary)' }}>
                                    Artesanal & Premium
                                </span>
                            </div>
                            <h1 className="text-3xl lg:text-5xl xl:text-6xl font-black leading-[1.1] mb-6 tracking-tight" style={{ color: 'var(--color-brand-text)' }}>
                                Momentos<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-400" style={{ backgroundImage: 'linear-gradient(to right, var(--color-brand-primary), var(--color-brand-accent))' }}>Especiales</span><br />
                                para Compartir
                            </h1>
                            <p className="text-sm lg:text-base text-gray-500 mb-8 max-w-md mx-auto sm:mx-0 leading-relaxed">
                                Descubre nuestra selección artesanal de productos únicos elaborados con los mejores ingredientes para sorprender.
                            </p>
                            <div className="flex flex-col xs:flex-row gap-3 items-center sm:items-start justify-center sm:justify-start">
                                <a href="#productos" className="w-full xs:w-auto px-8 py-3.5 rounded-xl font-bold text-white shadow-lg shadow-rose-500/20 transition-all hover:scale-105 active:scale-95 text-center" style={{ background: 'var(--color-brand-primary)' }}>
                                    Ver Tienda
                                </a>
                                <div className="flex gap-2">
                                    <a href="#" className="p-3 bg-white text-pink-500 rounded-xl hover:bg-pink-50 transition-colors shadow-sm border border-black/5"><Instagram size={20} /></a>
                                    <a href="#" className="p-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors shadow-sm border border-black/5"><Facebook size={20} /></a>
                                </div>
                            </div>
                        </div>

                        {/* Optional: Hero Image or Graphic instead of the problematic carousel */}
                        <div className="order-1 sm:order-2 w-full flex justify-center items-center">
                            <div className="relative w-full max-w-[320px] lg:max-w-[400px] aspect-square">
                                <div className="absolute inset-0 bg-gradient-to-tr from-rose-100 to-indigo-100 rounded-[3rem] rotate-6 opacity-50" />
                                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-[3rem] border border-white/40 shadow-2xl flex items-center justify-center p-8 overflow-hidden">
                                    <ShoppingBag className="w-32 h-32 lg:w-48 lg:h-48 opacity-10 blur-sm absolute -bottom-10 -right-10 rotate-12" style={{ color: 'var(--color-brand-primary)' }} />
                                    <div className="text-center relative z-10">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-xl mx-auto mb-4 animate-bounce">
                                            <ShoppingCart size={32} />
                                        </div>
                                        <p className="font-black text-2xl lg:text-3xl tracking-tight" style={{ color: 'var(--color-brand-text)' }}>Lo Mejor <br />para Ti</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PRODUCT GRID ──────────────────────────────────────────────────── */}
            <main id="productos" className="container mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--color-brand-text)' }}>
                        Nuestros <span style={{ color: 'var(--color-brand-primary)' }}>Productos</span>
                    </h2>
                    <p className="text-gray-600">Selección artesanal elaborada con ingredientes de primera calidad</p>
                </div>

                {visibleProducts.length === 0 ? (
                    <div className="py-20 text-center text-gray-400">
                        <Package size={48} className="mx-auto mb-4 opacity-30" />
                        <p>No hay productos disponibles</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                        {visibleProducts.map(p => (
                            <div key={p.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    {p.isNew && !p.onSale && (
                                        <span className="absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm" style={{ background: 'var(--color-brand-primary)' }}>NUEVO</span>
                                    )}
                                    {p.onSale && (
                                        <span className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                            OFERTA {p.salePercentage ? `-${p.salePercentage}%` : ''}
                                        </span>
                                    )}
                                    <button
                                        onClick={() => toggleFav(p.id)}
                                        className={`absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full transition-colors z-10 shadow-sm ${favorites.has(p.id) ? '' : 'text-gray-500 hover:text-brand'}`}
                                        style={{ color: favorites.has(p.id) ? 'var(--color-brand-primary)' : '' }}
                                    >
                                        <Heart size={16} className={favorites.has(p.id) ? 'fill-current' : ''} />
                                    </button>
                                </div>
                                <div className="p-3 md:p-4 flex flex-col flex-grow">
                                    <div className="mb-3 flex-grow">
                                        <span className="text-[10px] font-medium uppercase tracking-wider block mb-1" style={{ color: 'var(--color-brand-secondary)' }}>{p.category}</span>
                                        <h3 className="text-sm md:text-base font-bold mb-1 leading-tight line-clamp-2" style={{ color: 'var(--color-brand-text)' }}>{p.name}</h3>
                                        <p className="text-gray-500 text-[10px] md:text-sm line-clamp-2 hidden sm:block">{p.description}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto gap-2">
                                        <div>
                                            <span className="text-base md:text-xl font-bold" style={{ color: 'var(--color-brand-primary)' }}>{fmt(p.price)}</span>
                                            {p.onSale && p.originalPrice && (
                                                <span className="text-xs text-gray-400 line-through block">{fmt(p.originalPrice)}</span>
                                            )}
                                            <span className={`text-[10px] font-semibold ${p.stock === 0 ? 'text-red-500' : p.stock <= 5 ? 'text-amber-500' : 'text-emerald-600'}`}>
                                                {p.stock === 0 ? 'Sin stock' : p.stock <= 5 ? `¡Solo ${p.stock} disponibles!` : `${p.stock} disponibles`}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => addToCart(p)}
                                            disabled={p.stock === 0}
                                            className="flex items-center gap-1.5 text-[10px] md:text-sm px-2.5 py-1.5 rounded-full font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                                            style={{ background: 'var(--color-brand-primary)' }}
                                        >
                                            <ShoppingCart size={14} />
                                            {p.stock === 0 ? 'Agotado' : 'Agregar'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* ── FOOTER ────────────────────────────────────────────────────────── */}
            <footer id="footer" className="w-full mt-auto">
                {/* Features bar — color fijo: bg-white */}
                <div className="bg-white py-12 border-t border-gray-100">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { icon: Headphones, title: 'Atención', sub: 'Soporte 24/7' },
                                { icon: ShieldCheck, title: 'Calidad', sub: 'Premium & Fresco' },
                                { icon: CreditCard, title: 'Pagos', sub: 'Seguro & Rápido' },
                                { icon: Truck, title: 'Envíos', sub: 'A todo el país' },
                            ].map(({ icon: Icon, title, sub }) => (
                                <div key={title} className="flex flex-col items-center text-center group">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-slate-400 group-hover:text-rose-500 border border-black/5" style={{ color: 'var(--color-brand-primary)' }}>
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="font-bold text-gray-800 mb-1 text-xs sm:text-sm">{title}</h3>
                                    <p className="text-[10px] sm:text-xs text-gray-400">{sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dark section — color fijo: #1a1a2e */}
                <div className="pt-16 pb-8 text-white" style={{ background: '#0f172a' }}>
                    <div className="container mx-auto px-8 sm:px-12">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                            {[
                                { title: 'Ayuda', links: ['Cómo comprar', 'Envíos', 'FAQ', 'Contacto'] },
                                { title: 'Legal', links: ['Nosotros', 'Términos', 'Privacidad'] },
                                { title: 'Social', links: ['Instagram', 'Facebook'] },
                                { title: 'Horarios', links: ['Región Metropolitana', 'L-V: 09:00 - 19:00'] },
                            ].map(({ title, links }) => (
                                <div key={title}>
                                    <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 opacity-30">{title}</h4>
                                    <ul className="space-y-3 text-gray-400 text-xs">
                                        {links.map(l => <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="text-gray-500 text-xs">
                                <h5 className="font-bold text-gray-400 mb-2 uppercase tracking-wider">Medios de pago</h5>
                                <div className="flex gap-4 items-center opacity-70">
                                    <span className="font-bold text-lg text-white">Webpay</span>
                                    <span className="font-bold text-lg text-blue-400">MercadoPago</span>
                                    <span className="font-bold text-lg text-red-500">Santander</span>
                                </div>
                            </div>
                            <div className="text-center md:text-right text-gray-600 text-xs">
                                <p>© 2025 {EMPRESA} | Todos los derechos reservados</p>
                                <p className="mt-1">Hecho con ❤️ para ti</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* ── CART MODAL ────────────────────────────────────────────────────── */}
            {showCart && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setShowCart(false)} />
                    <div className="relative bg-white h-full w-full max-w-md shadow-2xl flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl text-white" style={{ background: 'var(--color-brand-primary)' }}>
                                    <ShoppingCart size={20} />
                                </div>
                                <h2 className="text-xl font-bold" style={{ color: 'var(--color-brand-text)' }}>
                                    Tu Carrito <span className="text-sm font-normal text-gray-500 ml-1">({cartCount})</span>
                                </h2>
                            </div>
                            <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                                <X size={20} style={{ color: 'var(--color-brand-text)' }} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                                    <ShoppingCart size={56} className="opacity-20" />
                                    <p className="text-lg font-medium">Tu carrito está vacío</p>
                                    <button onClick={() => setShowCart(false)} className="text-sm font-bold px-6 py-2.5 rounded-full text-white" style={{ background: 'var(--color-brand-primary)' }}>
                                        Ver Productos
                                    </button>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-2xl">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-sm leading-tight mb-1 truncate" style={{ color: 'var(--color-brand-text)' }}>{item.name}</p>
                                            <p className="text-xs text-gray-500 mb-2">{fmt(item.price)} / u.</p>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"><Minus size={12} /></button>
                                                <span className="text-sm font-bold w-6 text-center">{item.qty}</span>
                                                <button onClick={() => updateQty(item.id, +1)} className="w-7 h-7 rounded-full text-white flex items-center justify-center hover:opacity-90 transition-colors" style={{ background: 'var(--color-brand-primary)' }}><Plus size={12} /></button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end justify-between">
                                            <button onClick={() => removeFromCart(item.id)} className="p-1 hover:bg-gray-200 rounded-lg text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                                            <span className="text-base font-bold" style={{ color: 'var(--color-brand-primary)' }}>{fmt(item.price * item.qty)}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="border-t border-gray-100 p-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-base font-medium text-gray-600">Subtotal:</span>
                                    <span className="text-2xl font-bold" style={{ color: 'var(--color-brand-primary)' }}>{fmt(cartTotal)}</span>
                                </div>
                                <button className="w-full py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" style={{ background: 'var(--color-brand-primary)' }}>
                                    Ir al Checkout <ChevronRight size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Floating cart button */}
            {cartCount > 0 && !showCart && (
                <button
                    onClick={() => setShowCart(true)}
                    className="fixed bottom-6 right-6 z-40 flex items-center gap-3 pl-4 pr-5 py-3.5 rounded-full shadow-xl text-white font-bold transition-transform hover:scale-105"
                    style={{ background: 'var(--color-brand-primary)' }}
                >
                    <ShoppingCart size={20} />
                    <span>{cartCount} {cartCount === 1 ? 'producto' : 'productos'}</span>
                    <span className="bg-white/25 px-2 py-0.5 rounded-full text-sm">{fmt(cartTotal)}</span>
                </button>
            )}
        </div>
    );
}
