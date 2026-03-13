import { useState } from 'react';
import {
    Home, BarChart3, Bell, Package, Settings, Search, Plus,
    PlusCircle, MinusCircle, X, Check, ChevronRight, Clock,
    Eye, EyeOff, Star, TrendingUp, Users, ShoppingBag, Edit,
    AlertCircle, CheckCircle, Truck, MessageSquare, Tag
} from 'lucide-react';
import type { Product } from '../shared/types';
import { MOCK_ORDERS } from '../shared/mockData';

type View = 'orders' | 'catalog' | 'reports' | 'notifications' | 'settings';
type OrderStatus = 'pending_approval' | 'approved_pending_payment' | 'payment_review' | 'preparing' | 'shipped' | 'delivered' | 'rejected' | 'cancelled';
type OrderTab = 'inbox' | 'active' | 'history';

interface MobileAppProps {
    products: Product[];
    onProductUpdate: (p: Product) => void;
}

const fmt = (n: number) => `$${n.toLocaleString('es-CL')}`;
const EMPRESA = 'NombreEmpresa';

// ── Status helpers ─────────────────────────────────────────────────────────
const STATUS_LABELS: Record<string, string> = {
    pending_approval: 'Pendiente',
    approved_pending_payment: 'Aprobado',
    payment_review: 'Revisando pago',
    preparing: 'Preparando',
    shipped: 'En camino',
    delivered: 'Entregado',
    rejected: 'Rechazado',
    cancelled: 'Cancelado',
};
const STATUS_COLORS: Record<string, string> = {
    pending_approval: 'bg-amber-100 text-amber-800',
    approved_pending_payment: 'bg-blue-100 text-blue-800',
    payment_review: 'bg-purple-100 text-purple-800',
    preparing: 'bg-indigo-100 text-indigo-800',
    shipped: 'bg-cyan-100 text-cyan-800',
    delivered: 'bg-emerald-100 text-emerald-800',
    rejected: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-600',
};

function timeAgo(date: Date) {
    const diff = Date.now() - date.getTime();
    const m = Math.floor(diff / 60000);
    if (m < 60) return `hace ${m}m`;
    const h = Math.floor(m / 60);
    if (h < 24) return `hace ${h}h`;
    return `hace ${Math.floor(h / 24)}d`;
}

// ── BottomNav ──────────────────────────────────────────────────────────────
function BottomNav({ view, onView, notifCount }: { view: View; onView: (v: View) => void; notifCount: number }) {
    const items = [
        { id: 'orders' as View, icon: Home, label: 'Pedidos' },
        { id: 'catalog' as View, icon: Package, label: 'Catálogo' },
        { id: 'reports' as View, icon: BarChart3, label: 'Reportes' },
        { id: 'notifications' as View, icon: Bell, label: 'Avisos' },
        { id: 'settings' as View, icon: Settings, label: 'Ajustes' },
    ];
    return (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-xl border-t shadow-lg" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 20%, transparent)', paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 0.5rem)' }}>
            <div className="px-2 pt-2 pb-1">
                <div className="grid grid-cols-5 gap-1">
                    {items.map(({ id, icon: Icon, label }) => {
                        const active = view === id;
                        return (
                            <button
                                key={id}
                                onClick={() => onView(id)}
                                className={`flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl transition-colors ${active ? 'text-white' : 'text-gray-400 hover:text-gray-700'}`}
                                style={active ? { background: 'color-mix(in srgb, var(--color-brand-primary) 12%, transparent)', color: 'var(--color-brand-primary)' } : {}}
                            >
                                <div className="relative">
                                    <Icon className={`w-5 h-5 ${active ? 'scale-110' : ''} transition-transform`} />
                                    {id === 'notifications' && notifCount > 0 && (
                                        <span className="absolute -top-1.5 -right-1.5 min-w-[1.1rem] h-[1.1rem] flex items-center justify-center bg-red-500 text-white text-[9px] font-bold rounded-full px-0.5 shadow-sm">
                                            {notifCount > 99 ? '99+' : notifCount}
                                        </span>
                                    )}
                                </div>
                                <span className="text-[10px]">{label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// ── Dashboard (Pedidos) ────────────────────────────────────────────────────
function DashboardView() {
    const [tab, setTab] = useState<OrderTab>('inbox');
    const [orders, setOrders] = useState<{ id: string; customerName: string; phone: string; items: { name: string; qty: number; price: number; }[]; total: number; status: OrderStatus; createdAt: Date; notes: string; }[]>(MOCK_ORDERS);

    const pendingOrders = orders.filter(o => o.status === 'pending_approval');
    const activeOrders = orders.filter(o => ['approved_pending_payment', 'payment_review', 'preparing', 'shipped'].includes(o.status));
    const historyOrders = orders.filter(o => ['delivered', 'rejected', 'cancelled'].includes(o.status));

    const approve = (id: string) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'preparing' as const } : o));
    const reject = (id: string) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'rejected' as const } : o));
    const advance = (id: string) => setOrders(prev => prev.map(o => {
        if (o.id !== id) return o;
        const next: Record<string, any> = { approved_pending_payment: 'preparing', preparing: 'shipped', shipped: 'delivered' };
        return { ...o, status: next[o.status] ?? o.status };
    }));

    const shown = tab === 'inbox' ? pendingOrders : tab === 'active' ? activeOrders : historyOrders;

    return (
        <div className="min-h-full pb-24">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-xl border-b shadow-sm sticky top-0 z-10" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 20%, transparent)' }}>
                <div className="px-4 py-4">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="font-bold text-xl" style={{ color: 'var(--color-brand-text)' }}>Pedidos</h1>
                            <p className="text-sm mt-1 opacity-60" style={{ color: 'var(--color-brand-text)' }}>Gestión de Pedidos</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-full text-white" style={{ background: 'var(--color-brand-primary)' }}>
                                <ShoppingBag size={16} />
                            </div>
                            <span className="font-bold text-sm" style={{ color: 'var(--color-brand-secondary)' }}>{EMPRESA}</span>
                        </div>
                    </div>
                    {/* Tab pills */}
                    <div className="flex gap-2 p-1.5 rounded-full border" style={{ background: 'color-mix(in srgb, var(--color-brand-secondary) 10%, transparent)', borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 5%, transparent)' }}>
                        {([['inbox', `Bandeja (${pendingOrders.length})`], ['active', `Activos (${activeOrders.length})`], ['history', 'Historial']] as [OrderTab, string][]).map(([id, label]) => (
                            <button
                                key={id}
                                onClick={() => setTab(id)}
                                className={`flex-1 px-3 py-2 rounded-full transition-colors text-sm font-medium ${tab === id ? 'text-white shadow-md' : 'opacity-60 hover:opacity-90'}`}
                                style={tab === id ? { background: 'var(--color-brand-primary)', color: 'white' } : { color: 'var(--color-brand-text)' }}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Order list */}
            <div className="px-4 py-4 space-y-3">
                {shown.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 opacity-40" style={{ color: 'var(--color-brand-text)' }}>
                        <Home className="w-16 h-16 mb-4 opacity-50" />
                        <p className="font-medium">Sin pedidos en esta sección</p>
                    </div>
                )}
                {shown.map(order => (
                    <div key={order.id} className="bg-white rounded-2xl border shadow-sm overflow-hidden" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 15%, transparent)' }}>
                        <div className="p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <p className="font-bold" style={{ color: 'var(--color-brand-text)' }}>{order.customerName}</p>
                                    <p className="text-xs text-gray-500">{order.phone} · {timeAgo(order.createdAt)}</p>
                                </div>
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
                                    {STATUS_LABELS[order.status] ?? order.status}
                                </span>
                            </div>
                            <div className="space-y-1 mb-3">
                                {order.items.map((item, i) => (
                                    <p key={i} className="text-sm text-gray-600">{item.qty}× {item.name} — {fmt(item.price * item.qty)}</p>
                                ))}
                            </div>
                            {order.notes && (
                                <div className="flex items-start gap-2 p-2.5 rounded-xl mb-3 text-xs" style={{ background: 'color-mix(in srgb, var(--color-brand-accent) 30%, transparent)', color: 'var(--color-brand-text)' }}>
                                    <MessageSquare size={12} className="mt-0.5 shrink-0" />
                                    <span>{order.notes}</span>
                                </div>
                            )}
                            <div className="flex items-center justify-between border-t pt-3" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 10%, transparent)' }}>
                                <span className="font-bold text-base" style={{ color: 'var(--color-brand-primary)' }}>{fmt(order.total)}</span>
                                {order.status === 'pending_approval' && (
                                    <div className="flex gap-2">
                                        <button onClick={() => reject(order.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                                            <X size={14} /> Rechazar
                                        </button>
                                        <button onClick={() => approve(order.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-opacity" style={{ background: 'var(--color-brand-primary)' }}>
                                            <Check size={14} /> Aprobar
                                        </button>
                                    </div>
                                )}
                                {['approved_pending_payment', 'preparing', 'shipped'].includes(order.status) && (
                                    <button onClick={() => advance(order.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-opacity" style={{ background: 'var(--color-brand-primary)' }}>
                                        <Truck size={14} />
                                        {order.status === 'shipped' ? 'Marcar Entregado' : 'Avanzar Estado'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Catalog ────────────────────────────────────────────────────────────────
function CatalogView({ products, onProductUpdate }: { products: Product[]; onProductUpdate: (p: Product) => void }) {
    const [activeTab, setActiveTab] = useState<'products' | 'stock'>('products');
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [multiSelect, setMultiSelect] = useState(false);
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
    const filtered = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
        const matchCat = category === 'all' || p.category === category;
        return matchSearch && matchCat;
    });

    const toggleSelect = (id: string) => {
        setSelected(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
    };

    const updateStock = (p: Product, delta: number) => {
        const newStock = Math.max(0, p.stock + delta);
        if (newStock !== p.stock) onProductUpdate({ ...p, stock: newStock, available: newStock > 0 ? p.available : false });
    };

    return (
        <div className="min-h-full pb-24">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-xl border-b shadow-sm sticky top-0 z-10" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 20%, transparent)' }}>
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="font-bold text-xl" style={{ color: 'var(--color-brand-text)' }}>Catálogo</h1>
                            <p className="text-sm mt-1 opacity-60" style={{ color: 'var(--color-brand-text)' }}>{filtered.length} productos</p>
                        </div>
                    </div>

                    {/* Segmented control */}
                    <div className="flex p-1 rounded-xl mb-4 border" style={{ background: 'color-mix(in srgb, var(--color-brand-secondary) 10%, transparent)', borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 5%, transparent)' }}>
                        {(['products', 'stock'] as const).map(t => (
                            <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${activeTab === t ? 'text-white shadow-md' : 'opacity-60 hover:opacity-90'}`}
                                style={activeTab === t ? { background: 'var(--color-brand-primary)' } : { color: 'var(--color-brand-text)' }}>
                                {t === 'products' ? 'Productos' : 'Ingreso de Stock'}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-white border rounded-xl mb-3 shadow-sm" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 20%, transparent)' }}>
                        <Search className="w-5 h-5 opacity-40" style={{ color: 'var(--color-brand-text)' }} />
                        <input type="text" placeholder="Buscar productos..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent focus:outline-none text-sm" style={{ color: 'var(--color-brand-text)' }} />
                    </div>

                    {/* Categories */}
                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-colors border shadow-sm ${category === cat ? 'text-white' : 'bg-white opacity-70 hover:opacity-100'}`}
                                style={category === cat ? { background: 'var(--color-brand-primary)', borderColor: 'var(--color-brand-primary)', color: 'white' } : { borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 20%, transparent)', color: 'var(--color-brand-text)' }}>
                                {cat === 'all' ? 'Todos' : cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 py-4">
                {activeTab === 'products' ? (
                    <div className="grid grid-cols-1 gap-3">
                        {filtered.map(p => (
                            <div key={p.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${multiSelect && selected.has(p.id) ? 'ring-2' : ''}`}
                                style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 15%, transparent)', ...(multiSelect && selected.has(p.id) ? { '--tw-ring-color': 'var(--color-brand-primary)' } as any : {}) }}>
                                <div className="p-4 flex gap-3 items-start">
                                    {multiSelect && (
                                        <button onClick={() => toggleSelect(p.id)} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0`}
                                            style={selected.has(p.id) ? { background: 'var(--color-brand-primary)', borderColor: 'var(--color-brand-primary)' } : { borderColor: 'var(--color-brand-secondary)' }}>
                                            {selected.has(p.id) && <Check size={12} className="text-white" />}
                                        </button>
                                    )}
                                    {p.image ? (
                                        <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                                    ) : (
                                        <div className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'color-mix(in srgb, var(--color-brand-secondary) 10%, transparent)' }}>
                                            <Package className="w-8 h-8 opacity-40" style={{ color: 'var(--color-brand-primary)' }} />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="min-w-0">
                                                <p className="font-bold truncate" style={{ color: 'var(--color-brand-text)' }}>{p.name}</p>
                                                <p className="text-xs opacity-60 truncate" style={{ color: 'var(--color-brand-text)' }}>{p.category}</p>
                                            </div>
                                            <div className="flex items-center gap-1.5 shrink-0">
                                                <Star size={14} className="text-amber-500 fill-amber-500" />
                                                {p.onSale && <Tag size={14} className="text-emerald-500" />}
                                                <button onClick={() => setEditingProduct(p)} className="p-1 rounded-lg hover:bg-gray-100 transition-colors"><Edit size={14} className="text-gray-400" /></button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                                            <div>
                                                <span className="font-bold" style={{ color: 'var(--color-brand-primary)' }}>{fmt(p.price)}</span>
                                                {p.onSale && p.originalPrice && <span className="text-xs text-gray-400 line-through ml-1">{fmt(p.originalPrice)}</span>}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {/* Toggle available */}
                                                <button onClick={() => onProductUpdate({ ...p, available: !p.available })}
                                                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-colors ${p.available ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                                                    {p.available ? <Eye size={12} /> : <EyeOff size={12} />}
                                                    {p.available ? 'Visible' : 'Oculto'}
                                                </button>
                                                {/* Toggle sale */}
                                                <button onClick={() => onProductUpdate({ ...p, onSale: !p.onSale, originalPrice: !p.onSale ? p.price + Math.round(p.price * 0.1) : undefined, price: !p.onSale ? Math.round(p.price * 0.9) : (p.originalPrice ?? p.price), salePercentage: !p.onSale ? 10 : undefined })}
                                                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-colors ${p.onSale ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                                    <Tag size={12} /> {p.onSale ? 'Oferta' : 'Normal'}
                                                </button>
                                            </div>
                                        </div>
                                        {/* Stock indicator */}
                                        <div className={`mt-2 text-xs font-semibold ${p.stock === 0 ? 'text-red-500' : p.stock <= 5 ? 'text-amber-500' : 'text-emerald-600'}`}>
                                            {p.stock === 0 ? '⚠ Sin stock' : p.stock <= 5 ? `⚠ Solo ${p.stock} disponibles` : `${p.stock} en stock`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* STOCK tab */
                    <div className="grid grid-cols-1 gap-3">
                        {filtered.map(p => (
                            <div key={p.id} className="bg-white rounded-2xl border shadow-sm p-4" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 20%, transparent)' }}>
                                <div className="flex items-center gap-3 mb-3">
                                    {p.image
                                        ? <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                                        : <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--color-brand-secondary) 10%, transparent)' }}><Package className="w-6 h-6 opacity-40" /></div>
                                    }
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold truncate" style={{ color: 'var(--color-brand-text)' }}>{p.name}</p>
                                        <p className="text-xs opacity-60" style={{ color: 'var(--color-brand-text)' }}>{p.category}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold" style={{ color: 'var(--color-brand-text)' }}>{p.stock}</div>
                                        <div className="text-xs opacity-60 font-medium" style={{ color: 'var(--color-brand-text)' }}>en stock</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between border-t pt-3" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 10%, transparent)' }}>
                                    <span className="text-sm opacity-60 font-medium" style={{ color: 'var(--color-brand-text)' }}>Ajustar inventario:</span>
                                    <div className="flex items-center gap-4 p-1 rounded-xl border" style={{ background: 'color-mix(in srgb, var(--color-brand-secondary) 5%, transparent)', borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 10%, transparent)' }}>
                                        <button onClick={() => updateStock(p, -1)} disabled={p.stock === 0} className="p-2 rounded-lg transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-30" style={{ color: 'rgba(0,0,0,0.3)' }}><MinusCircle className="w-6 h-6" /></button>
                                        <span className="w-12 text-center font-bold" style={{ color: 'var(--color-brand-text)' }}>{p.stock}</span>
                                        <button onClick={() => updateStock(p, +1)} className="p-2 rounded-lg transition-colors hover:opacity-80" style={{ color: 'var(--color-brand-primary)' }}><PlusCircle className="w-6 h-6" /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {editingProduct && (
                <div className="fixed inset-0 z-50 flex items-end">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setEditingProduct(null)} />
                    <div className="relative bg-white w-full rounded-t-3xl p-6 space-y-4 shadow-2xl">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-bold" style={{ color: 'var(--color-brand-text)' }}>Editar Producto</h3>
                            <button onClick={() => setEditingProduct(null)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors"><X size={20} /></button>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider mb-1 block opacity-60" style={{ color: 'var(--color-brand-text)' }}>Nombre</label>
                                <input className="w-full px-4 py-3 rounded-xl border bg-gray-50 font-medium focus:outline-none" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 20%, transparent)', color: 'var(--color-brand-text)' }}
                                    value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider mb-1 block opacity-60" style={{ color: 'var(--color-brand-text)' }}>Precio</label>
                                <input type="number" className="w-full px-4 py-3 rounded-xl border bg-gray-50 font-medium focus:outline-none" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 20%, transparent)', color: 'var(--color-brand-text)' }}
                                    value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })} />
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'color-mix(in srgb, var(--color-brand-secondary) 8%, transparent)' }}>
                                <span className="text-sm font-medium" style={{ color: 'var(--color-brand-text)' }}>Destacado</span>
                                <button onClick={() => setEditingProduct({ ...editingProduct, isFeatured: !editingProduct.isFeatured })}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${editingProduct.isFeatured ? '' : 'bg-gray-200'}`}
                                    style={editingProduct.isFeatured ? { background: 'var(--color-brand-primary)' } : {}}>
                                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${editingProduct.isFeatured ? 'left-6' : 'left-0.5'}`} />
                                </button>
                            </div>
                        </div>
                        <button onClick={() => { onProductUpdate(editingProduct); setEditingProduct(null); }}
                            className="w-full py-4 rounded-2xl font-bold text-white hover:opacity-90 transition-opacity"
                            style={{ background: 'var(--color-brand-primary)' }}>
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            )}

            {/* FABs */}
            {!multiSelect && activeTab === 'products' && (
                <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-3">
                    <button onClick={() => setMultiSelect(true)} className="p-3.5 bg-white text-amber-600 shadow-xl border rounded-full hover:bg-amber-50 transition-colors" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 20%, transparent)' }} title="Selección múltiple">
                        <Clock className="w-5 h-5" />
                    </button>
                    <button className="flex items-center gap-2 pl-4 pr-5 py-3.5 rounded-full shadow-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity" style={{ background: 'var(--color-brand-primary)' }}>
                        <Plus className="w-5 h-5" /> Nuevo
                    </button>
                </div>
            )}
            {multiSelect && (
                <div className="fixed bottom-20 left-0 right-0 z-40 px-4">
                    <div className="bg-amber-500 rounded-2xl shadow-xl border border-amber-400 p-3 max-w-sm mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-3 pl-1">
                            <button onClick={() => { setMultiSelect(false); setSelected(new Set()); }} className="p-1.5 bg-amber-600/50 hover:bg-amber-600/80 text-white rounded-lg transition-colors"><X className="w-5 h-5" /></button>
                            <div className="text-white font-bold">{selected.size} seleccionados</div>
                        </div>
                        {selected.size > 0 && (
                            <button className="bg-white text-amber-600 font-bold px-4 py-1.5 rounded-xl text-sm active:scale-95 transition-transform">
                                Opciones...
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Reports ────────────────────────────────────────────────────────────────
function ReportsView({ products }: { products: Product[] }) {
    const totalRevenue = MOCK_ORDERS
        .filter(o => ['delivered', 'preparing', 'shipped'].includes(o.status))
        .reduce((s, o) => s + o.total, 0);
    const totalOrders = MOCK_ORDERS.length;
    const activeProducts = products.filter(p => p.available).length;
    const lowStock = products.filter(p => p.stock <= 5 && p.stock > 0).length;
    const topProducts = products.slice().sort((a, b) => b.stock - a.stock).slice(0, 4);

    const stats = [
        { label: 'Ingresos (período)', value: fmt(totalRevenue), icon: TrendingUp, color: 'text-emerald-500 bg-emerald-50' },
        { label: 'Total Pedidos', value: totalOrders.toString(), icon: ShoppingBag, color: 'text-blue-500 bg-blue-50' },
        { label: 'Productos Activos', value: activeProducts.toString(), icon: Package, color: 'text-purple-500 bg-purple-50', sub: `${lowStock} con stock bajo` },
        { label: 'Usuarios Totales', value: '24', icon: Users, color: 'text-amber-500 bg-amber-50', sub: '+3 esta semana' },
    ];

    return (
        <div className="min-h-full pb-24">
            <div className="bg-white/80 backdrop-blur-xl border-b shadow-sm sticky top-0 z-10" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 20%, transparent)' }}>
                <div className="px-4 py-4">
                    <h1 className="font-bold text-xl" style={{ color: 'var(--color-brand-text)' }}>Reportes</h1>
                    <p className="text-sm mt-1 opacity-60" style={{ color: 'var(--color-brand-text)' }}>Métricas del negocio</p>
                </div>
            </div>
            <div className="px-4 py-4 space-y-4">
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3">
                    {stats.map(({ label, value, icon: Icon, color, sub }) => (
                        <div key={label} className="bg-white rounded-2xl border p-4 shadow-sm" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 15%, transparent)' }}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}><Icon size={20} /></div>
                            <p className="text-2xl font-bold" style={{ color: 'var(--color-brand-text)' }}>{value}</p>
                            <p className="text-xs opacity-60 mt-1" style={{ color: 'var(--color-brand-text)' }}>{label}</p>
                            {sub && <p className="text-[10px] text-amber-600 mt-0.5 font-medium">{sub}</p>}
                        </div>
                    ))}
                </div>

                {/* Revenue breakdown */}
                <div className="bg-white rounded-2xl border p-4 shadow-sm" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 15%, transparent)' }}>
                    <h3 className="font-bold mb-4" style={{ color: 'var(--color-brand-text)' }}>Ingresos por período</h3>
                    {[['Hoy', 22900], ['Esta semana', 65400], ['Este mes', 198000]].map(([label, val]) => (
                        <div key={label as string} className="flex items-center justify-between py-2.5 border-b last:border-0" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 8%, transparent)' }}>
                            <span className="text-sm opacity-70" style={{ color: 'var(--color-brand-text)' }}>{label}</span>
                            <span className="font-bold" style={{ color: 'var(--color-brand-primary)' }}>{fmt(val as number)}</span>
                        </div>
                    ))}
                </div>

                {/* Order distribution */}
                <div className="bg-white rounded-2xl border p-4 shadow-sm" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 15%, transparent)' }}>
                    <h3 className="font-bold mb-4" style={{ color: 'var(--color-brand-text)' }}>Estado de Pedidos</h3>
                    {[['Pendientes', 2, 'bg-amber-400'], ['En proceso', 2, 'bg-blue-400'], ['Entregados', 1, 'bg-emerald-400']].map(([label, count, color]) => (
                        <div key={label as string} className="flex items-center gap-3 mb-3 last:mb-0">
                            <div className={`w-3 h-3 rounded-full ${color}`} />
                            <span className="text-sm flex-1 opacity-70" style={{ color: 'var(--color-brand-text)' }}>{label}</span>
                            <span className="font-bold text-sm" style={{ color: 'var(--color-brand-text)' }}>{count}</span>
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${color}`} style={{ width: `${(count as number / totalOrders) * 100}%` }} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Top products */}
                <div className="bg-white rounded-2xl border p-4 shadow-sm" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 15%, transparent)' }}>
                    <h3 className="font-bold mb-4" style={{ color: 'var(--color-brand-text)' }}>Productos Destacados</h3>
                    <div className="space-y-3">
                        {topProducts.map((p, i) => (
                            <div key={p.id} className="flex items-center gap-3">
                                <span className="text-lg font-black w-6 text-center" style={{ color: i === 0 ? 'var(--color-brand-primary)' : 'rgba(0,0,0,0.3)' }}>#{i + 1}</span>
                                {p.image ? <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover" /> : <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center"><Package size={16} className="text-gray-400" /></div>}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-brand-text)' }}>{p.name}</p>
                                    <p className="text-xs opacity-60" style={{ color: 'var(--color-brand-text)' }}>{fmt(p.price)}</p>
                                </div>
                                <span className="font-bold text-sm" style={{ color: 'var(--color-brand-primary)' }}>{p.stock} u.</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Notifications ──────────────────────────────────────────────────────────
function NotificationsView() {
    const pending = MOCK_ORDERS.filter(o => o.status === 'pending_approval');
    const notifs = [
        ...pending.map(o => ({ id: o.id, type: 'order', title: `Nuevo pedido de ${o.customerName}`, sub: `${fmt(o.total)} · ${timeAgo(o.createdAt)}`, read: false, icon: ShoppingBag, color: 'text-amber-500 bg-amber-50' })),
        { id: 'n1', type: 'info', title: 'Stock bajo: Medialunas', sub: 'Solo 0 unidades en stock', read: true, icon: AlertCircle, color: 'text-red-500 bg-red-50' },
        { id: 'n2', type: 'success', title: 'Pedido entregado', sub: 'Pedro Soto confirmó la recepción', read: true, icon: CheckCircle, color: 'text-emerald-500 bg-emerald-50' },
    ];

    return (
        <div className="min-h-full pb-24">
            <div className="bg-white/80 backdrop-blur-xl border-b shadow-sm sticky top-0 z-10" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 20%, transparent)' }}>
                <div className="px-4 py-4">
                    <h1 className="font-bold text-xl" style={{ color: 'var(--color-brand-text)' }}>Avisos</h1>
                    <p className="text-sm mt-1 opacity-60" style={{ color: 'var(--color-brand-text)' }}>{pending.length} sin leer</p>
                </div>
            </div>
            <div className="px-4 py-4 space-y-3">
                {notifs.map(n => (
                    <div key={n.id} className={`bg-white rounded-2xl border shadow-sm p-4 flex gap-4 items-start ${!n.read ? 'ring-1' : ''}`}
                        style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 15%, transparent)', ...((!n.read) ? { '--tw-ring-color': 'var(--color-brand-primary)' } as any : {}) }}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
                            <n.icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold ${!n.read ? 'font-bold' : ''}`} style={{ color: 'var(--color-brand-text)' }}>{n.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{n.sub}</p>
                        </div>
                        {!n.read && <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: 'var(--color-brand-primary)' }} />}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Settings ───────────────────────────────────────────────────────────────
function SettingsView() {
    const sections = [
        { title: 'Cuenta', items: ['Perfil del negocio', 'Cambiar PIN de acceso', 'Notificaciones push'] },
        { title: 'Negocio', items: ['Información del negocio', 'Métodos de pago', 'Zonas de envío'] },
        { title: 'Sistema', items: ['Forzar sincronización', 'Limpiar caché', 'Ver cola de acciones'] },
    ];
    return (
        <div className="min-h-full pb-24">
            <div className="bg-white/80 backdrop-blur-xl border-b shadow-sm sticky top-0 z-10" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 20%, transparent)' }}>
                <div className="px-4 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="font-bold text-xl" style={{ color: 'var(--color-brand-text)' }}>Ajustes</h1>
                        <p className="text-sm mt-1 opacity-60" style={{ color: 'var(--color-brand-text)' }}>Administrador</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg" style={{ background: 'var(--color-brand-primary)' }}>A</div>
                </div>
            </div>
            <div className="px-4 py-4 space-y-4">
                {/* Profile card */}
                <div className="bg-white rounded-2xl border shadow-sm p-4 flex items-center gap-4" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 15%, transparent)' }}>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl" style={{ background: 'var(--color-brand-primary)' }}>A</div>
                    <div>
                        <p className="font-bold text-lg" style={{ color: 'var(--color-brand-text)' }}>Admin Demo</p>
                        <p className="text-sm text-gray-500">admin@{EMPRESA.toLowerCase()}.com</p>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: 'var(--color-brand-primary)' }}>Administrador</span>
                    </div>
                </div>

                {sections.map(({ title, items }) => (
                    <div key={title} className="bg-white rounded-2xl border shadow-sm overflow-hidden" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 15%, transparent)' }}>
                        <div className="px-4 py-3 border-b" style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 8%, transparent)', background: 'color-mix(in srgb, var(--color-brand-secondary) 5%, transparent)' }}>
                            <h3 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--color-brand-text)' }}>{title}</h3>
                        </div>
                        {items.map((item, i) => (
                            <button key={item} className={`w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors ${i < items.length - 1 ? 'border-b' : ''}`} style={{ borderColor: 'color-mix(in srgb, var(--color-brand-secondary) 8%, transparent)' }}>
                                <span className="text-sm font-medium" style={{ color: 'var(--color-brand-text)' }}>{item}</span>
                                <ChevronRight size={16} className="text-gray-400" />
                            </button>
                        ))}
                    </div>
                ))}

                <button className="w-full py-4 bg-red-50 text-red-600 font-bold rounded-2xl border border-red-100 hover:bg-red-100 transition-colors">
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}

// ── MobileApp shell ────────────────────────────────────────────────────────
export function MobileApp({ products, onProductUpdate }: MobileAppProps) {
    const [view, setView] = useState<View>('orders');
    const pendingCount = MOCK_ORDERS.filter(o => o.status === 'pending_approval').length;

    return (
        <div className="h-full w-full flex flex-col" style={{ background: 'var(--color-brand-background)', fontFamily: 'Inter, system-ui, sans-serif' }}>
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                {view === 'orders' && <DashboardView />}
                {view === 'catalog' && <CatalogView products={products} onProductUpdate={onProductUpdate} />}
                {view === 'reports' && <ReportsView products={products} />}
                {view === 'notifications' && <NotificationsView />}
                {view === 'settings' && <SettingsView />}
            </div>
            <BottomNav view={view} onView={setView} notifCount={pendingCount} />
        </div>
    );
}
