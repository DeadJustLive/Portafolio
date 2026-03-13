import { useState } from "react";
import {
    ShoppingCart, Package, TrendingUp, Wallet, Settings,
    Wifi, Search, Star, Store, Sparkles, Camera, Clock, PackageX,
    CreditCard, Banknote, Smartphone, Check, Trash2, Plus, Edit,
    Archive, Filter, DollarSign, AlertTriangle, Award, TrendingDown,
    Bell, Percent, ChevronDown,
} from "lucide-react";

// ── Mock Data ───────────────────────────────────────────────────────────────
const PRODUCTS = [
    { id: "1", name: "Coca Cola 500ml", category: "Bebidas", currentPrice: 1800, stock: 24, minStock: 5 },
    { id: "2", name: "Sprite 500ml", category: "Bebidas", currentPrice: 1800, stock: 12, minStock: 5 },
    { id: "3", name: "Agua Mineral 600ml", category: "Bebidas", currentPrice: 1200, stock: 36, minStock: 8 },
    { id: "4", name: "Doritos Original", category: "Snacks", currentPrice: 2200, stock: 18, minStock: 4 },
    { id: "5", name: "Lay's Clásicas", category: "Snacks", currentPrice: 2200, stock: 15, minStock: 4 },
    { id: "6", name: "Chocolate Jumbo", category: "Dulces", currentPrice: 1500, stock: 30, minStock: 6 },
    { id: "7", name: "Chiclets Spearmint", category: "Dulces", currentPrice: 500, stock: 3, minStock: 10 },
    { id: "8", name: "Galletas Oreo", category: "Dulces", currentPrice: 1800, stock: 10, minStock: 5 },
    { id: "9", name: "Pan Molde", category: "Panadería", currentPrice: 2500, stock: 8, minStock: 3 },
    { id: "10", name: "Empanada Pino", category: "Panadería", currentPrice: 1800, stock: 14, minStock: 5 },
    { id: "11", name: "Cerveza Cristal Lata", category: "Bebidas", currentPrice: 2200, stock: 2, minStock: 6 },
    { id: "12", name: "Jugo Watt's 1L", category: "Bebidas", currentPrice: 2800, stock: 9, minStock: 4 },
];

const FAVORITES = [PRODUCTS[0], PRODUCTS[3], PRODUCTS[5], PRODUCTS[8]];

const CATEGORIES = ["Todas", "Bebidas", "Snacks", "Dulces", "Panadería"];

const TOP_SELLERS = [
    { name: "Coca Cola 500ml", units: 142, revenue: 255600 },
    { name: "Empanada Pino", units: 98, revenue: 176400 },
    { name: "Doritos Original", units: 76, revenue: 167200 },
    { name: "Chocolate Jumbo", units: 65, revenue: 97500 },
    { name: "Lay's Clásicas", units: 58, revenue: 127600 },
];

const EXPENSES = [
    { id: "1", description: "Compra de bolsas plásticas", amount: 4500, date: "Hoy, 10:30", paidWith: "caja" },
    { id: "2", description: "Limpieza local", amount: 8000, date: "Hoy, 09:00", paidWith: "caja" },
    { id: "3", description: "Gas garrafa", amount: 12000, date: "Ayer, 15:20", paidWith: "personal" },
    { id: "4", description: "Jabón de manos", amount: 2800, date: "Ayer, 11:00", paidWith: "caja" },
];

const STOCK_ENTRIES = [
    { id: "1", productName: "Coca Cola 500ml", qty: 24, type: "ingreso", purchasePrice: 950, date: "Hoy 09:15" },
    { id: "2", productName: "Doritos Original", qty: 12, type: "ingreso", purchasePrice: 1100, date: "Hoy 09:20" },
    { id: "3", productName: "Chiclets Spearmint", qty: -2, type: "retiro", date: "Hoy 11:30" },
    { id: "4", productName: "Cerveza Cristal Lata", qty: 24, type: "ingreso", purchasePrice: 1100, date: "Ayer 16:00" },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
type Page = "caja" | "inventario" | "reportes" | "gastos" | "config";

// ── Shell Layout ─────────────────────────────────────────────────────────────
export default function App() {
    const [page, setPage] = useState<Page>("caja");

    const navItems: { page: Page; icon: React.ElementType; label: string }[] = [
        { page: "caja", icon: ShoppingCart, label: "Caja" },
        { page: "inventario", icon: Package, label: "Inventario" },
        { page: "reportes", icon: TrendingUp, label: "Reportes" },
        { page: "gastos", icon: Wallet, label: "Gastos" },
        { page: "config", icon: Settings, label: "Config" },
    ];

    const pageTitle: Record<Page, string> = {
        caja: "Caja",
        inventario: "Inventario",
        reportes: "Reportes",
        gastos: "Gastos",
        config: "Config",
    };

    return (
        <div className="h-screen flex flex-col bg-slate-50 max-w-md mx-auto relative overflow-hidden shadow-2xl">
            {/* ── Header ── */}
            <header className="bg-slate-800 text-white px-4 pt-3 pb-2 shadow-lg relative z-[56] flex-shrink-0">
                <div className="flex items-center justify-between">
                    <h1 className="text-base font-semibold text-white tracking-tight">{pageTitle[page]}</h1>
                    <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-1 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-2 py-1 rounded-lg text-xs font-semibold">
                            2 <ChevronDown className="w-3 h-3" />
                        </div>
                        <button className="p-2 hover:bg-white/10 rounded-lg">
                            <Wifi className="w-5 h-5 text-emerald-400" />
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Main Content ── */}
            <main className="flex-1 overflow-auto bg-slate-50 pb-24">
                {page === "caja" && <CajaPage />}
                {page === "inventario" && <InventarioPage />}
                {page === "reportes" && <ReportesPage />}
                {page === "gastos" && <GastosPage />}
                {page === "config" && <ConfigPage />}
            </main>

            {/* ── Bottom Nav ── */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-[55] px-3 pb-2">
                <nav className="bg-slate-900 rounded-[1.5rem] shadow-2xl overflow-hidden">
                    <div className="flex justify-around px-1 py-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = page === item.page;
                            return (
                                <button
                                    key={item.page}
                                    onClick={() => setPage(item.page)}
                                    className={`flex flex-col items-center py-2 px-2 flex-1 rounded-xl ${isActive ? "text-white" : "text-slate-500"}`}
                                >
                                    <div className={`p-1.5 rounded-lg ${isActive ? "bg-blue-600" : ""}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className={`text-[10px] mt-0.5 font-medium ${isActive ? "text-blue-400" : ""}`}>
                                        {item.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </nav>
            </div>
        </div>
    );
}

// ── CAJA PAGE ────────────────────────────────────────────────────────────────
function CajaPage() {
    const [activeOwner, setActiveOwner] = useState < "Principal | "Secundario">("Principal");
    const [activeCategory, setActiveCategory] = useState("Todas");
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState<{ id: string; name: string; price: number; qty: number }[]>([]);
    const [showCheckout, setShowCheckout] = useState(false);

    const filtered = PRODUCTS.filter(
        (p) =>
            (activeCategory === "Todas" || p.category === activeCategory) &&
            p.name.toLowerCase().includes(search.toLowerCase())
    );

    const addToCart = (p: typeof PRODUCTS[0]) => {
        setCart((prev) => {
            const ex = prev.find((i) => i.id === p.id);
            if (ex) return prev.map((i) => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
            return [...prev, { id: p.id, name: p.name, price: p.currentPrice, qty: 1 }];
        });
    };

    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const cartQty = cart.reduce((s, i) => s + i.qty, 0);

    if (showCheckout) {
        return (
            <div className="flex flex-col h-full animate-fadeIn">
                <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-10 shadow-sm">
                    <button onClick={() => setShowCheckout(false)} className="text-slate-500 font-semibold text-sm">← Volver</button>
                    <h2 className="font-bold text-slate-800">Finalizar venta</h2>
                </div>
                <div className="p-4 space-y-3">
                    {cart.map((item) => (
                        <div key={item.id} className="rounded-xl p-3 space-y-2 border bg-slate-50 border-slate-200">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h4 className="font-semibold text-sm text-slate-800">{item.name}</h4>
                                    <p className="text-xs text-slate-400">${item.price.toLocaleString()} × {item.qty}</p>
                                </div>
                                <button onClick={() => setCart(c => c.filter(i => i.id !== item.id))} className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setCart(c => c.map(i => i.id === item.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))} className="w-8 h-8 bg-white border border-slate-200 rounded-lg font-bold text-slate-600 flex items-center justify-center">−</button>
                                <span className="flex-1 text-center font-semibold text-slate-800">{item.qty}</span>
                                <button onClick={() => setCart(c => c.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i))} className="w-8 h-8 bg-white border border-slate-200 rounded-lg font-bold text-slate-600 flex items-center justify-center">+</button>
                            </div>
                            <button className="w-full py-2 bg-white border border-slate-200 rounded-lg flex items-center justify-center gap-2 text-sm text-slate-600">
                                <Banknote className="w-4 h-4 text-emerald-500" /> <span className="font-medium">Efectivo</span>
                            </button>
                            <p className="text-right font-bold text-slate-800">${(item.price * item.qty).toLocaleString()}</p>
                        </div>
                    ))}
                    <div className="bg-slate-50 rounded-xl p-4 space-y-2 border border-slate-200">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-slate-800">Total</span>
                            <span className="text-2xl font-bold text-slate-900">${total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
                            <span>Efectivo</span><span className="font-medium">${total.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <button className="bg-amber-100 hover:bg-amber-200 text-amber-700 py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                            <Clock className="w-5 h-5" /> Pausar
                        </button>
                        <button onClick={() => { setCart([]); setShowCheckout(false); }} className="bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                            <Check className="w-5 h-5" /> Cobrar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full relative">
            {/* Sticky header */}
            <div className="bg-white border-b border-gray-100 px-4 pt-4 pb-0 sticky top-0 z-10 shadow-sm">
                {/* Owner toggle */}
                <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-3">
                    <button
                        onClick={() => setActiveOwner("Principal")}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-semibold rounded-lg transition-all ${activeOwner === "Principal" ? "bg-white shadow text-blue-600" : "text-slate-500"}`}
                    >
                        <Store className="w-4 h-4" /> Principal
                    </button>
                    <button
                        onClick={() => setActiveOwner("Secundario")}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-semibold rounded-lg transition-all ${activeOwner === "Secundario" ? "bg-white shadow text-pink-600" : "text-slate-500"}`}
                    >
                        <Sparkles className="w-4 h-4" /> Secundario
                    </button>
                </div>

                {/* Search row */}
                <div className="flex gap-2 mb-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Nombre o código de barras..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <button className="px-3 py-2 bg-amber-100 text-amber-700 rounded-lg relative">
                        <Clock className="w-5 h-5" />
                    </button>
                    <button className="px-3 py-2 bg-slate-700 text-white rounded-lg">
                        <Camera className="w-5 h-5" />
                    </button>
                </div>

                {/* Category chips */}
                <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${activeCategory === cat ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products */}
            <div className="flex-1 overflow-auto p-3 pb-32">
                {/* Favorites */}
                {search === "" && activeCategory === "Todas" && (
                    <div className="mb-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Frecuentes
                        </h3>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                            {FAVORITES.map((product) => (
                                <button
                                    key={`fav-${product.id}`}
                                    onClick={() => addToCart(product)}
                                    className="flex-shrink-0 w-32 bg-amber-50 rounded-xl p-3 shadow-sm border border-amber-100 text-left transition-all active:scale-[0.97] hover:border-amber-300"
                                >
                                    <p className="font-semibold text-sm text-slate-800 line-clamp-2 leading-tight">{product.name}</p>
                                    <p className="text-[10px] text-amber-600 mt-0.5 uppercase tracking-wide">{product.category}</p>
                                    <div className="mt-2 flex items-end justify-between">
                                        <p className="text-base font-bold text-blue-600">${product.currentPrice.toLocaleString()}</p>
                                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${product.stock <= product.minStock ? "bg-red-100 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
                                            {product.stock}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Product Grid */}
                <div className="grid grid-cols-2 gap-2">
                    {filtered.map((product) => {
                        const outOfStock = product.stock <= 0;
                        return (
                            <button
                                key={product.id}
                                onClick={() => addToCart(product)}
                                disabled={outOfStock}
                                className={`bg-white rounded-xl p-3 shadow-sm border text-left transition-all active:scale-[0.97] ${outOfStock ? "opacity-40 border-gray-100 cursor-not-allowed" : "border-gray-100 hover:border-blue-200"}`}
                            >
                                <p className="font-semibold text-sm text-slate-800 line-clamp-2 leading-tight">{product.name}</p>
                                <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wide">{product.category}</p>
                                <div className="mt-2 flex items-end justify-between">
                                    <p className="text-base font-bold text-blue-600">${product.currentPrice.toLocaleString()}</p>
                                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${product.stock <= product.minStock ? "bg-red-100 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
                                        {product.stock}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Cart FAB */}
            {cart.length > 0 && (
                <div className="fixed bottom-20 right-4 z-[56]">
                    <button
                        onClick={() => setShowCheckout(true)}
                        className="h-14 px-4 rounded-full shadow-xl flex items-center gap-2 active:scale-95 transition-all bg-slate-800 text-white"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        <span className="font-bold">${total.toLocaleString()}</span>
                        <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{cartQty}</span>
                    </button>
                </div>
            )}
        </div>
    );
}

// ── INVENTARIO PAGE ──────────────────────────────────────────────────────────
function InventarioPage() {
    const [tab, setTab] = useState<"productos" | "inventario">("productos");
    const [activeOwner, setActiveOwner] = useState<"panicrima" | "paula">("panicrima");
    const [search, setSearch] = useState("");

    const filtered = PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="pb-32">
            <div className="bg-white border-b border-gray-100 px-4 pt-4 pb-0 sticky top-0 z-10 shadow-sm">
                <h2 className="text-xl font-bold mb-3 text-slate-800">Inventario</h2>

                <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-2">
                    <button onClick={() => setActiveOwner("Principal")} className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeOwner === "Principal" ? "bg-white shadow text-blue-600" : "text-slate-500"}`}>
                        <Store className="w-3.5 h-3.5" /> Principal
                    </button>
                    <button onClick={() => setActiveOwner("Secundario")} className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeOwner === "Secundario" ? "bg-white shadow text-pink-600" : "text-slate-500"}`}>
                        <Sparkles className="w-3.5 h-3.5" /> Secundario
                    </button>
                </div>

                <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-3">
                    <button onClick={() => setTab("productos")} className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${tab === "productos" ? "bg-white shadow text-blue-600" : "text-slate-500"}`}>
                        <Package className="w-4 h-4" /> Productos
                    </button>
                    <button onClick={() => setTab("inventario")} className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${tab === "inventario" ? "bg-white shadow text-emerald-600" : "text-slate-500"}`}>
                        <Archive className="w-4 h-4" /> Ingresos
                    </button>
                </div>

                {tab === "productos" && (
                    <div className="flex gap-2 mb-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="Nombre, categoría o código..." value={search} onChange={e => setSearch(e.target.value)}
                                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-slate-50" />
                        </div>
                        <button className="px-3 py-2.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            {tab === "productos" && (
                <div className="p-4 space-y-2">
                    {filtered.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="font-semibold text-slate-800">{product.name}</h3>
                                        {product.stock <= product.minStock && (
                                            <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-semibold uppercase tracking-wide">Stock bajo</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-400 mt-0.5">{product.category}</p>
                                </div>
                                <div className="flex gap-1">
                                    <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                                    <button className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-sm">
                                <div className="bg-blue-50 rounded-lg p-2 text-center">
                                    <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">Precio</p>
                                    <p className="font-bold text-blue-600 text-base">${product.currentPrice.toLocaleString()}</p>
                                </div>
                                <div className={`rounded-lg p-2 text-center ${product.stock <= product.minStock ? "bg-red-50" : "bg-emerald-50"}`}>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">Stock</p>
                                    <p className={`font-bold text-base ${product.stock <= product.minStock ? "text-red-500" : "text-emerald-600"}`}>{product.stock}</p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-2 text-center">
                                    <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">Mínimo</p>
                                    <p className="font-bold text-slate-600 text-base">{product.minStock}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === "inventario" && (
                <div className="p-4 space-y-2">
                    {STOCK_ENTRIES.map((entry) => (
                        <div key={entry.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-slate-800">{entry.productName}</p>
                                        <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${entry.type === "retiro" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                                            {entry.type === "retiro" ? "Retiro" : "Ingreso"}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-0.5">{entry.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold text-lg ${entry.qty < 0 ? "text-red-500" : "text-emerald-600"}`}>
                                        {entry.qty > 0 ? "+" : ""}{entry.qty} uds
                                    </p>
                                    {entry.purchasePrice && (
                                        <p className="text-xs text-slate-400">Compra: ${entry.purchasePrice.toLocaleString()}/u</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* FAB */}
            <div className="fixed bottom-20 right-4 z-[56]">
                <button className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all active:scale-95 ${tab === "productos" ? "bg-blue-600 hover:bg-blue-700" : "bg-emerald-600 hover:bg-emerald-700"}`}>
                    <Plus className="w-7 h-7 text-white" />
                </button>
            </div>
        </div>
    );
}

// ── REPORTES PAGE ────────────────────────────────────────────────────────────
function ReportesPage() {
    const [activeSection, setActiveSection] = useState<"ventas" | "productos" | "stock" | "rotacion">("ventas");

    const lowStock = PRODUCTS.filter(p => p.stock <= p.minStock);

    const colorMap = {
        ventas: { bg: "bg-blue-600", text: "text-blue-500", border: "border-blue-600" },
        productos: { bg: "bg-emerald-600", text: "text-emerald-500", border: "border-emerald-600" },
        stock: { bg: "bg-red-600", text: "text-red-500", border: "border-red-600" },
        rotacion: { bg: "bg-orange-500", text: "text-orange-500", border: "border-orange-500" },
    };

    const sections = [
        { id: "ventas" as const, icon: DollarSign, label: "Ventas", value: "$287.400", subtitle: "hoy" },
        { id: "productos" as const, icon: Award, label: "Más vendidos", value: "5", subtitle: "productos" },
        { id: "stock" as const, icon: AlertTriangle, label: "Stock bajo", value: `${lowStock.length}`, subtitle: "productos" },
        { id: "rotacion" as const, icon: TrendingDown, label: "Sin movimiento", value: "3", subtitle: "+30 días" },
    ];

    return (
        <div className="pb-32">
            {/* Date selector */}
            <div className="px-4 pt-4">
                <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100 flex items-center gap-2 overflow-x-auto hide-scrollbar">
                    <button className="flex-none px-4 py-2 rounded-xl text-sm font-bold bg-slate-900 text-white">Hoy</button>
                    <button className="flex-none px-4 py-2 rounded-xl text-sm font-bold bg-slate-50 text-slate-500">Ayer</button>
                    <input type="date" className="flex-none w-36 px-3 py-2 text-sm font-bold rounded-xl border bg-slate-50 border-transparent text-slate-600" />
                </div>
            </div>

            {/* Cards */}
            <div className="p-4 grid grid-cols-2 gap-3">
                {sections.map((sec) => {
                    const Icon = sec.icon;
                    const isActive = activeSection === sec.id;
                    const c = colorMap[sec.id];
                    return (
                        <button
                            key={sec.id}
                            onClick={() => setActiveSection(sec.id)}
                            className={`rounded-2xl p-4 text-left border-2 transition-all ${isActive ? `${c.bg} ${c.border} text-white` : "bg-white border-slate-100 shadow-sm"}`}
                        >
                            <Icon className={`w-5 h-5 mb-2 ${isActive ? "text-white" : c.text}`} />
                            <p className={`text-2xl font-bold ${isActive ? "text-white" : "text-slate-800"}`}>{sec.value}</p>
                            <p className={`text-xs font-medium ${isActive ? "text-white/80" : "text-slate-400"}`}>{sec.label}</p>
                            <p className={`text-[10px] ${isActive ? "text-white/60" : "text-slate-300"}`}>{sec.subtitle}</p>
                        </button>
                    );
                })}
            </div>

            {/* Section: Ventas */}
            {activeSection === "ventas" && (
                <div className="px-4 space-y-3 pb-4 animate-fadeIn">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-blue-50 rounded-2xl p-4">
                            <p className="text-xs text-blue-400 font-medium mb-1">Total del día</p>
                            <p className="text-2xl font-bold text-blue-700">$287.400</p>
                            <p className="text-xs text-blue-400">18 ventas confirmadas</p>
                        </div>
                        <div className="bg-orange-50 rounded-2xl p-4 flex flex-col justify-between">
                            <div><p className="text-xs text-orange-400 font-medium mb-1">Mermas</p></div>
                            <div>
                                <p className="text-2xl font-bold text-orange-600">$4.500</p>
                                <p className="text-xs text-orange-400">3 registros</p>
                            </div>
                        </div>
                    </div>
                    {[["Efectivo", "$198.400"], ["Tarjeta", "$64.000"], ["Transferencia", "$25.000"]].map(([type, amount]) => (
                        <div key={type} className="bg-white rounded-xl border border-slate-100 px-4 py-3 flex justify-between items-center">
                            <span className="text-slate-600 text-sm font-medium">{type}</span>
                            <span className="font-bold text-slate-800">{amount}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Section: Top sellers */}
            {activeSection === "productos" && (
                <div className="px-4 space-y-4 pb-4 animate-fadeIn">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Más vendidos</p>
                    {TOP_SELLERS.map((item, i) => (
                        <div key={item.name} className="bg-white rounded-xl border border-slate-100 px-4 py-3 flex items-center gap-3">
                            <span className={`text-sm font-bold w-5 text-center ${i === 0 ? "text-yellow-500" : i === 1 ? "text-slate-400" : "text-amber-700"}`}>#{i + 1}</span>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                                <p className="text-xs text-slate-400">${item.revenue.toLocaleString()} recaudado</p>
                            </div>
                            <p className="text-sm font-bold text-emerald-600">{item.units} uds</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Section: Stock bajo */}
            {activeSection === "stock" && (
                <div className="px-4 space-y-2 pb-4 animate-fadeIn">
                    {lowStock.map((p) => (
                        <div key={p.id} className="bg-white rounded-xl border border-red-100 px-4 py-3 flex justify-between items-center">
                            <div>
                                <p className="text-sm font-semibold text-slate-800">{p.name}</p>
                                <p className="text-xs text-slate-400">{p.category} · mín {p.minStock}</p>
                            </div>
                            <span className="text-sm font-bold text-red-500">{p.stock} uds</span>
                        </div>
                    ))}
                    <button className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold mt-3 flex items-center justify-center gap-2">
                        <Bell className="w-4 h-4" /> Ver alerta completa
                    </button>
                </div>
            )}

            {/* Section: Rotación */}
            {activeSection === "rotacion" && (
                <div className="px-4 space-y-2 pb-4 animate-fadeIn">
                    {[
                        { name: "Galletas Oreo", lastSold: "Hace 35 días" },
                        { name: "Jugo Watt's 1L", lastSold: "Hace 42 días" },
                        { name: "Pan Molde", lastSold: "Sin ventas" },
                    ].map((p) => (
                        <div key={p.name} className="bg-white rounded-xl border border-amber-100 px-4 py-3 flex justify-between items-center">
                            <div>
                                <p className="text-sm font-semibold text-slate-800">{p.name}</p>
                                <p className="text-xs text-slate-400">{p.lastSold}</p>
                            </div>
                            <button className="text-xs font-semibold text-orange-600 border border-orange-200 bg-orange-50 px-2.5 py-1 rounded-lg">
                                <Percent className="w-3 h-3 inline mr-0.5" />Oferta
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── GASTOS PAGE ──────────────────────────────────────────────────────────────
function GastosPage() {
    const [activeTab, setActiveTab] = useState<"gastos" | "mermas">("gastos");

    return (
        <div className="p-4 space-y-4 pb-32">
            <h2 className="text-2xl font-bold">Gastos &amp; Mermas</h2>

            {/* Cash summary */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4 shadow-lg">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <DollarSign className="w-6 h-6" /> Resumen de Caja - Hoy
                </h3>
                <div className="space-y-2">
                    <div className="flex justify-between items-center pb-2 border-b border-blue-400">
                        <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Ventas en Efectivo:</span>
                        <span className="font-bold text-lg">$198.400</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-blue-400">
                        <span className="flex items-center gap-2"><TrendingDown className="w-4 h-4" /> Gastos de Caja:</span>
                        <span className="font-bold text-lg">-$12.500</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 bg-blue-700/30 -mx-4 px-4 py-3 rounded-lg mt-3">
                        <span className="font-bold">A Devolver/Disponible:</span>
                        <span className="font-bold text-2xl">$185.900</span>
                    </div>
                </div>
            </div>

            {/* Tab toggle */}
            <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
                <button onClick={() => setActiveTab("gastos")} className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === "gastos" ? "bg-white shadow text-blue-600" : "text-slate-500"}`}>
                    <TrendingDown className="w-4 h-4" /> Gastos
                </button>
                <button onClick={() => setActiveTab("mermas")} className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === "mermas" ? "bg-white shadow text-orange-600" : "text-slate-500"}`}>
                    <PackageX className="w-4 h-4" /> Mermas
                </button>
            </div>

            {activeTab === "gastos" && (
                <>
                    <div className="bg-white rounded-lg p-4 shadow-sm border-2 border-gray-200">
                        <h3 className="font-bold mb-2">Gastos de Hoy</h3>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total:</span>
                            <span className="text-2xl font-bold text-red-600">$12.500</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-bold text-lg">Todos los Gastos</h3>
                        {EXPENSES.map((expense) => (
                            <div key={expense.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex-1">
                                        <h4 className="font-semibold">{expense.description}</h4>
                                        <p className="text-sm text-gray-600">{expense.date}</p>
                                    </div>
                                    <p className="text-xl font-bold text-red-600">-${expense.amount.toLocaleString()}</p>
                                </div>
                                <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${expense.paidWith === "caja" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                                        {expense.paidWith === "caja" ? "💰 Pagado con Caja" : "👤 Pagado Personal"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {activeTab === "mermas" && (
                <>
                    <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                        <h3 className="font-bold mb-1 text-orange-800 flex items-center gap-2">
                            <PackageX className="w-5 h-5" /> Mermas de Hoy
                        </h3>
                        <p className="text-sm text-orange-600 mb-3">Productos consumidos o perdidos por el local</p>
                        <div className="flex justify-between items-center">
                            <span className="text-orange-700">Unidades perdidas hoy:</span>
                            <span className="text-2xl font-bold text-orange-700">4 uds</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-bold text-lg">Historial de Mermas</h3>
                        {[
                            { name: "Chiclets Spearmint", qty: 2, who: "Carlos", note: "Producto vencido", date: "Hoy 11:30" },
                            { name: "Empanada Pino", qty: 2, who: "María", note: "Consumo personal", date: "Ayer 14:00" },
                        ].map((m, i) => (
                            <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-orange-100">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-slate-800">{m.name}</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">{m.date}</p>
                                        <p className="text-xs text-gray-500 mt-0.5 italic">"{m.note}"</p>
                                    </div>
                                    <p className="text-xl font-bold text-orange-600">-{m.qty} uds</p>
                                </div>
                                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">👤 {m.who}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* FAB */}
            <div className="fixed bottom-20 right-4 z-[56]">
                <button className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all active:scale-95 ${activeTab === "gastos" ? "bg-red-500" : "bg-orange-500"}`}>
                    <Plus className="w-7 h-7 text-white" />
                </button>
            </div>
        </div>
    );
}

// ── CONFIG PAGE ──────────────────────────────────────────────────────────────
function ConfigPage() {
    return (
        <div className="p-4 space-y-4 pb-32">
            <h2 className="text-2xl font-bold text-slate-800">Configuración</h2>

            {/* Profile card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-5 shadow-lg">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-2xl font-bold">A</div>
                    <div>
                        <p className="font-bold text-lg">Admin</p>
                        <p className="text-slate-300 text-sm">Administrador · Panicrima</p>
                    </div>
                </div>
            </div>

            {/* Settings sections */}
            {[
                {
                    title: "Seguridad",
                    items: ["Cambiar PIN de seguridad", "Gestión de usuarios", "Roles y permisos"],
                },
                {
                    title: "Apariencia",
                    items: ["Tema de color", "Tamaño de fuente", "Modo compacto"],
                },
                {
                    title: "Datos",
                    items: ["Exportar datos", "Sincronizar con nube", "Limpiar caché local"],
                },
                {
                    title: "Información",
                    items: ["Versión 2.4.1", "Términos de uso", "Soporte técnico"],
                },
            ].map((section) => (
                <div key={section.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <p className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wide bg-slate-50 border-b border-gray-100">
                        {section.title}
                    </p>
                    {section.items.map((item, i) => (
                        <button
                            key={item}
                            className={`w-full text-left px-4 py-3.5 text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between ${i < section.items.length - 1 ? "border-b border-gray-100" : ""}`}
                        >
                            {item}
                            <span className="text-slate-300">›</span>
                        </button>
                    ))}
                </div>
            ))}

            <button className="w-full bg-red-50 text-red-600 border border-red-100 py-3.5 rounded-2xl font-semibold hover:bg-red-100 transition-colors">
                Cerrar sesión
            </button>
        </div>
    );
}
