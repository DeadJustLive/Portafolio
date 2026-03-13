import { useState } from "react";
import {
    Utensils, Droplet, Activity, Settings,
    ChevronLeft, ChevronRight, Calendar, Plus, Trash2,
    Milk, Salad, Apple, Wheat, Beef, Nut, Clock, Check, X,
    BookOpen, TrendingDown, TrendingUp, BarChart3, Droplets,
    LineChart as LineChartIcon, Search, User, Target, FileDown,
    FileUp, FileText, Pill, HelpCircle, Bell, Loader2,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────
type Tab = "comidas" | "agua" | "registros" | "config";
type TipoPorcion = "lacteos" | "verduras" | "frutas" | "cereales" | "carnes" | "grasas";

// ── Constants ──────────────────────────────────────────────────────────────
const TIPOS_PORCION: Record<TipoPorcion, { label: string; icon: React.ElementType; color: string }> = {
    lacteos: { label: "Lácteos", icon: Milk, color: "bg-blue-100 text-blue-700" },
    verduras: { label: "Verduras", icon: Salad, color: "bg-green-100 text-green-700" },
    frutas: { label: "Frutas", icon: Apple, color: "bg-red-100 text-red-700" },
    cereales: { label: "Cereales", icon: Wheat, color: "bg-amber-100 text-amber-700" },
    carnes: { label: "Proteínas", icon: Beef, color: "bg-orange-100 text-orange-700" },
    grasas: { label: "Frutos Secos", icon: Nut, color: "bg-yellow-100 text-yellow-700" },
};

const ALIMENTOS_MOCK: Record<TipoPorcion, { id: string; nombre: string; cantidad: string; equiv: number }[]> = {
    lacteos: [
        { id: "l1", nombre: "Leche entera", cantidad: "200 ml (1 taza)", equiv: 1 },
        { id: "l2", nombre: "Yogur natural", cantidad: "180 g (1 pote)", equiv: 1 },
        { id: "l3", nombre: "Queso fresco", cantidad: "45 g (2 fetas)", equiv: 1 },
        { id: "l4", nombre: "Leche en polvo", cantidad: "30 g (3 cdas)", equiv: 1 },
        { id: "l5", nombre: "Yogur griego", cantidad: "120 g", equiv: 1 },
    ],
    verduras: [
        { id: "v1", nombre: "Lechuga", cantidad: "150 g (1 plato hondo)", equiv: 1 },
        { id: "v2", nombre: "Tomate", cantidad: "120 g  (1 unidad med.)", equiv: 1 },
        { id: "v3", nombre: "Zanahoria", cantidad: "100 g (1 unidad)", equiv: 1 },
        { id: "v4", nombre: "Brócoli cocido", cantidad: "100 g (½ taza)", equiv: 1 },
    ],
    frutas: [
        { id: "fr1", nombre: "Manzana", cantidad: "130 g (1 unidad med.)", equiv: 1 },
        { id: "fr2", nombre: "Banana", cantidad: "90 g (1 unidad chica)", equiv: 1 },
        { id: "fr3", nombre: "Naranja", cantidad: "150 g (1 unidad)", equiv: 1 },
        { id: "fr4", nombre: "Durazno", cantidad: "150 g (1 unidad)", equiv: 1 },
    ],
    cereales: [
        { id: "c1", nombre: "Arroz cocido", cantidad: "90 g (½ taza)", equiv: 1 },
        { id: "c2", nombre: "Pan integral", cantidad: "30 g (1 rebanada)", equiv: 1 },
        { id: "c3", nombre: "Avena cruda", cantidad: "35 g (4 cdas)", equiv: 1 },
        { id: "c4", nombre: "Pasta cocida", cantidad: "100 g (½ taza)", equiv: 1 },
        { id: "c5", nombre: "Papa hervida", cantidad: "120 g (1 unidad med.)", equiv: 1 },
    ],
    carnes: [
        { id: "p1", nombre: "Pollo sin piel", cantidad: "90 g (tamaño palma)", equiv: 1 },
        { id: "p2", nombre: "Carne vacuna magra", cantidad: "90 g", equiv: 1 },
        { id: "p3", nombre: "Atún en agua", cantidad: "85 g (½ lata)", equiv: 1 },
        { id: "p4", nombre: "Huevo", cantidad: "1 unidad grande", equiv: 0.5 },
        { id: "p5", nombre: "Lentejas cocidas", cantidad: "100 g (½ taza)", equiv: 1 },
    ],
    grasas: [
        { id: "g1", nombre: "Aceite de oliva", cantidad: "5 ml (1 cdita)", equiv: 1 },
        { id: "g2", nombre: "Palta/Aguacate", cantidad: "40 g (¼ unidad)", equiv: 1 },
        { id: "g3", nombre: "Nueces", cantidad: "15 g (4 unidades)", equiv: 1 },
        { id: "g4", nombre: "Almendras", cantidad: "15 g (12 unidades)", equiv: 1 },
    ],
};

// ── Mock Data ──────────────────────────────────────────────────────────────
const TODAY_LABEL = "jue, 12 de mar";

const INIT_MEALS = [
    {
        id: "desayuno", nombre: "Desayuno", hora: "08:00",
        items: [
            { id: "d1", tipo: "lacteos" as TipoPorcion, label: "Lácteos", consumed: true, hora: "08:15", cant: "1 porción" },
            { id: "d2", tipo: "frutas" as TipoPorcion, label: "Frutas", consumed: true, hora: "08:15", cant: "1 porción" },
            { id: "d3", tipo: "cereales" as TipoPorcion, label: "Cereales", consumed: false, hora: null, cant: null },
        ],
    },
    {
        id: "almuerzo", nombre: "Almuerzo", hora: "13:00",
        items: [
            { id: "a1", tipo: "carnes" as TipoPorcion, label: "Proteínas", consumed: true, hora: "13:20", cant: "1 porción" },
            { id: "a2", tipo: "verduras" as TipoPorcion, label: "Verduras", consumed: true, hora: "13:20", cant: "2 porciones" },
            { id: "a3", tipo: "cereales" as TipoPorcion, label: "Cereales", consumed: true, hora: "13:20", cant: "1 porción" },
            { id: "a4", tipo: "grasas" as TipoPorcion, label: "Frutos Secos", consumed: false, hora: null, cant: null },
        ],
    },
    {
        id: "merienda", nombre: "Merienda", hora: "16:30",
        items: [
            { id: "m1", tipo: "frutas" as TipoPorcion, label: "Frutas", consumed: false, hora: null, cant: null },
            { id: "m2", tipo: "lacteos" as TipoPorcion, label: "Lácteos", consumed: false, hora: null, cant: null },
        ],
    },
    {
        id: "cena", nombre: "Cena", hora: "20:00",
        items: [
            { id: "c1", tipo: "carnes" as TipoPorcion, label: "Proteínas", consumed: false, hora: null, cant: null },
            { id: "c2", tipo: "verduras" as TipoPorcion, label: "Verduras", consumed: false, hora: null, cant: null },
            { id: "c3", tipo: "cereales" as TipoPorcion, label: "Cereales", consumed: false, hora: null, cant: null },
        ],
    },
];

const PROGRESS = [
    { tipo: "lacteos" as TipoPorcion, consumido: 2, objetivo: 3 },
    { tipo: "verduras" as TipoPorcion, consumido: 2, objetivo: 3 },
    { tipo: "frutas" as TipoPorcion, consumido: 1, objetivo: 2 },
    { tipo: "cereales" as TipoPorcion, consumido: 2, objetivo: 4 },
    { tipo: "carnes" as TipoPorcion, consumido: 1, objetivo: 2 },
    { tipo: "grasas" as TipoPorcion, consumido: 0, objetivo: 1 },
];

const AGUA_LOGS_INIT = [
    { id: "w1", cantidadMl: 500, hora: "09:30" },
    { id: "w2", cantidadMl: 350, hora: "11:45" },
    { id: "w3", cantidadMl: 500, hora: "13:20" },
    { id: "w4", cantidadMl: 250, hora: "16:00" },
];

const REGISTROS_PESO = [
    { id: "r1", fecha: "12 mar", peso: 72.4, imc: 23.1, grasa: 18.4 },
    { id: "r2", fecha: "5 mar", peso: 73.0, imc: 23.3, grasa: 18.9 },
    { id: "r3", fecha: "26 feb", peso: 73.8, imc: 23.6, grasa: 19.1 },
    { id: "r4", fecha: "19 feb", peso: 74.2, imc: 23.7, grasa: 19.4 },
];

const ADHERENCIA = [
    { f: "5m", p: 65 }, { f: "6m", p: 80 }, { f: "7m", p: 55 }, { f: "8m", p: 90 },
    { f: "9m", p: 72 }, { f: "10m", p: 85 }, { f: "11m", p: 68 }, { f: "12m", p: 75 },
];

// ── Shared Header ──────────────────────────────────────────────────────────
function PageHeader({ title, showDate = false }: { title: string; showDate?: boolean }) {
    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="pt-6 pb-4 px-4 w-full flex flex-col gap-1">
                <div className="mt-2 flex justify-between items-start">
                    <div className="flex-1 pr-2">
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
                        {showDate && (
                            <div className="flex items-center justify-between mt-1">
                                <button className="flex items-center gap-2 text-sm font-medium bg-white hover:bg-gray-50 border border-gray-200 shadow-sm text-gray-600 px-3 py-2 rounded-md">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span className="capitalize">{TODAY_LABEL}</span>
                                </button>
                                <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                                    <button className="h-7 w-7 rounded-md hover:bg-white hover:shadow-sm flex items-center justify-center">
                                        <ChevronLeft className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <div className="w-px h-3 bg-gray-300 mx-0.5" />
                                    <button className="h-7 w-7 rounded-md hover:bg-white hover:shadow-sm flex items-center justify-center opacity-40 cursor-not-allowed">
                                        <ChevronRight className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

// ── Tabla de Conversión Modal ──────────────────────────────────────────────
function TablaConversionModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [busqueda, setBusqueda] = useState("");
    const [cat, setCat] = useState<TipoPorcion>("lacteos");

    if (!open) return null;

    const allCats = Object.keys(TIPOS_PORCION) as TipoPorcion[];
    const row1 = allCats.slice(0, 3);
    const row2 = allCats.slice(3);

    const filtered = (ALIMENTOS_MOCK[cat] || []).filter(a =>
        busqueda === "" || a.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-lg flex flex-col" style={{ maxHeight: "80vh" }}>
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-100">
                    <h2 className="text-base font-semibold text-gray-900">Tabla de Conversión de Alimentos</h2>
                    <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-500" /></button>
                </div>

                <div className="p-4 flex flex-col gap-3 overflow-hidden flex-1">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            placeholder="Buscar alimento..."
                            value={busqueda}
                            onChange={e => setBusqueda(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm bg-gray-50 focus:outline-none focus:border-blue-400"
                        />
                    </div>

                    {/* Tabs row 1 */}
                    <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-lg">
                        {row1.map(t => (
                            <button key={t} onClick={() => setCat(t)} className={`py-1.5 text-xs font-medium rounded-md transition-colors ${cat === t ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>
                                {TIPOS_PORCION[t].label}
                            </button>
                        ))}
                    </div>
                    {/* Tabs row 2 */}
                    <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-lg">
                        {row2.map(t => (
                            <button key={t} onClick={() => setCat(t)} className={`py-1.5 text-xs font-medium rounded-md transition-colors ${cat === t ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>
                                {TIPOS_PORCION[t].label}
                            </button>
                        ))}
                    </div>

                    {/* Food list */}
                    <div className="overflow-y-auto flex-1 space-y-2">
                        {filtered.length > 0 ? filtered.map(a => (
                            <div key={a.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <p className="font-medium text-sm text-gray-900">{a.nombre}</p>
                                        <p className="text-sm text-gray-600">{a.cantidad}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-block px-2 py-1 rounded text-sm ${TIPOS_PORCION[cat].color}`}>
                                            {a.equiv} porción{a.equiv !== 1 ? "es" : ""}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <p className="text-center text-gray-500 py-8 text-sm">
                                {busqueda ? "No se encontraron alimentos" : "No hay alimentos registrados"}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── COMIDAS PAGE ───────────────────────────────────────────────────────────
function ComidasPage() {
    const [meals, setMeals] = useState(INIT_MEALS);
    const [showTabla, setShowTabla] = useState(false);
    // Multi-select state
    const [selectionMode, setSelectionMode] = useState(false);
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [confirmMealId, setConfirmMealId] = useState<string | null>(null);

    const toggleItem = (mealId: string, itemId: string) => {
        if (selectionMode) return;
        setMeals(prev => prev.map(m =>
            m.id !== mealId ? m : {
                ...m,
                items: m.items.map(i => i.id !== itemId ? i : {
                    ...i, consumed: !i.consumed,
                    hora: !i.consumed ? "ahora" : null,
                    cant: !i.consumed ? "1 porción" : null,
                })
            }
        ));
    };

    const enterSelection = (ghostId: string) => {
        setSelectionMode(true);
        setSelected(new Set([ghostId]));
    };

    const toggleGhost = (ghostId: string) => {
        setSelected(prev => {
            const s = new Set(prev);
            s.has(ghostId) ? s.delete(ghostId) : s.add(ghostId);
            if (s.size === 0) setSelectionMode(false);
            return s;
        });
    };

    const cancelSelection = (mealId: string) => {
        setSelected(prev => {
            const s = new Set(prev);
            [...s].forEach(k => { if (k.startsWith(`ghost-${mealId}-`)) s.delete(k); });
            if (s.size === 0) setSelectionMode(false);
            return s;
        });
    };

    const confirmSelection = (mealId: string) => {
        // Mark selected ghost items as consumed (mock — no real backend)
        setMeals(prev => prev.map(m => {
            if (m.id !== mealId) return m;
            return {
                ...m,
                items: m.items.map(i => {
                    const ghostId = `ghost-${mealId}-${i.id}`;
                    if (!i.consumed && selected.has(ghostId)) {
                        return { ...i, consumed: true, hora: "ahora", cant: "1 porción" };
                    }
                    return i;
                }),
            };
        }));
        cancelSelection(mealId);
        setConfirmMealId(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <PageHeader title="Comidas del Día" showDate />
            <TablaConversionModal open={showTabla} onClose={() => setShowTabla(false)} />

            <div className="p-4 flex-1 max-w-md mx-auto w-full pb-24">
                {/* Botón tabla de conversión */}
                <button
                    onClick={() => setShowTabla(true)}
                    className="mb-4 w-full flex items-center justify-center gap-2 border border-gray-200 bg-white text-gray-700 rounded-md px-4 py-2 text-sm hover:bg-gray-50 shadow-sm"
                >
                    <BookOpen className="w-4 h-4" /> Tabla de Conversión
                </button>

                {/* Progreso diario */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Progreso Diario</h2>
                    <div className="grid grid-cols-3 gap-2">
                        {PROGRESS.filter(p => p.objetivo > 0).map(p => {
                            const cfg = TIPOS_PORCION[p.tipo];
                            const Icon = cfg.icon;
                            const completo = p.consumido >= p.objetivo;
                            return (
                                <div key={p.tipo} className={`flex flex-col items-center p-2 rounded-lg border ${completo ? "bg-green-50 border-green-100" : "bg-white border-gray-100"}`}>
                                    <div className={`mb-1 p-1.5 rounded-full ${completo ? "bg-green-100" : "bg-gray-100"}`}>
                                        <Icon className={`w-4 h-4 ${completo ? "text-green-600" : "text-gray-500"}`} />
                                    </div>
                                    <span className={`text-lg font-bold ${completo ? "text-green-600" : "text-gray-700"}`}>
                                        {p.consumido}<span className="text-xs text-gray-400 font-normal">/{p.objetivo}</span>
                                    </span>
                                    <span className="text-[10px] text-gray-500 uppercase">{cfg.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Meals */}
                <div className="space-y-6">
                    {meals.map(meal => {
                        const selectedInMeal = [...selected].filter(k => k.startsWith(`ghost-${meal.id}-`));
                        const hasSel = selectedInMeal.length > 0;

                        return (
                            <div key={meal.id} className="relative bg-white rounded-xl shadow-sm overflow-visible mb-6">
                                {/* Contextual action bar (identical to real app) */}
                                {hasSel && (
                                    <div className="absolute -top-14 left-0 right-0 h-10 bg-blue-600 text-white rounded-xl shadow-md flex justify-between items-center px-4 z-10 mx-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-white">{selectedInMeal.length}</span>
                                            <span className="text-xs text-blue-100">seleccionados</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => cancelSelection(meal.id)} className="p-1 hover:bg-blue-500 rounded text-blue-100 hover:text-white">
                                                <X className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => confirmSelection(meal.id)}
                                                className="flex items-center text-xs bg-white text-blue-600 px-3 py-1 rounded-full font-bold shadow-sm hover:bg-blue-50"
                                            >
                                                <Check className="w-3 h-3 mr-1" /> Confirmar
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Meal header */}
                                <div className={`px-4 py-2 border-b flex justify-between items-center transition-colors rounded-t-xl ${hasSel ? "bg-blue-600 text-white border-blue-600" : "bg-blue-50 border-blue-100"}`}>
                                    <h3 className={`font-semibold ${hasSel ? "text-white" : "text-blue-900"}`}>{meal.nombre}</h3>
                                    <div className={`flex items-center px-2 py-0.5 rounded-full text-xs shadow-sm ${hasSel ? "bg-blue-500 text-white" : "text-blue-700 bg-white"}`}>
                                        <Clock className="w-3 h-3 mr-1" />{meal.hora}
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="p-3">
                                    {meal.items.map(item => {
                                        const cfg = TIPOS_PORCION[item.tipo];
                                        const Icon = cfg.icon;
                                        const isGhost = !item.consumed;
                                        const ghostId = `ghost-${meal.id}-${item.id}`;
                                        const isSel = isGhost && selected.has(ghostId);

                                        let containerClass = "border-solid border-green-200 bg-green-50";
                                        if (isGhost && !isSel) containerClass = "border-dashed border-gray-300 bg-gray-50 opacity-60 hover:opacity-100 hover:bg-blue-50 hover:border-blue-300";
                                        if (isSel) containerClass = "bg-blue-100 border-blue-400";

                                        return (
                                            <div
                                                key={item.id}
                                                className={`flex items-center p-2 rounded-lg border mb-2 cursor-pointer transition-all ${isSel ? "ring-2 ring-offset-1 ring-blue-200" : ""} ${containerClass}`}
                                                onClick={() => {
                                                    if (selectionMode && isGhost) { toggleGhost(ghostId); return; }
                                                    toggleItem(meal.id, item.id);
                                                }}
                                                onContextMenu={e => { if (isGhost && !selectionMode) { e.preventDefault(); enterSelection(ghostId); } }}
                                            >
                                                <div className={`p-1.5 rounded-full mr-3 ${isSel ? "bg-blue-500 text-white" : isGhost ? "bg-gray-200 text-gray-500" : "bg-green-200 text-green-700"}`}>
                                                    {isSel ? <Check className="w-4 h-4 text-white" /> : <Icon className="w-4 h-4" />}
                                                </div>
                                                <div className="flex-1 select-none">
                                                    <p className={`text-sm font-medium ${isGhost && !isSel ? "text-gray-500" : "text-gray-900"}`}>{item.label}</p>
                                                    <p className="text-xs text-gray-400">{isGhost ? "Pendiente" : item.hora}</p>
                                                </div>
                                                {!isGhost && (
                                                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">{item.cant}</span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* FAB */}
            <button className="fixed bottom-32 right-4 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 z-40">
                <Plus className="w-6 h-6" />
            </button>
        </div>
    );
}

// ── AGUA PAGE ─────────────────────────────────────────────────────────────
function AguaPage() {
    const [logs, setLogs] = useState(AGUA_LOGS_INIT);
    const META = 2000;
    const total = logs.reduce((s, l) => s + l.cantidadMl, 0);
    const pct = Math.min((total / META) * 100, 100);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <PageHeader title="Agua Diaria" showDate />
            <div className="p-4 flex-1 max-w-md mx-auto w-full">

                {/* Meta card */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium">Meta Diaria</h2>
                        <button className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-md hover:bg-gray-50">Editar</button>
                    </div>
                    <div className="text-center mb-4">
                        <div className="text-4xl font-semibold mb-2">
                            {(total / 1000).toFixed(2)}<span className="text-xl text-gray-500 ml-1">L</span>
                        </div>
                        <p className="text-sm text-gray-600">de {(META / 1000).toFixed(1)}L ({total}ml de {META}ml)</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                    {pct >= 100 && <p className="text-green-600 text-center mt-2 text-sm">¡Meta cumplida! 🎉</p>}
                </div>

                {/* Historial */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-20">
                    <h2 className="text-lg font-medium mb-4">Registros de Hoy</h2>
                    <div className="space-y-2">
                        {[...logs].reverse().map(c => (
                            <div key={c.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-700 text-xs font-bold">{(c.cantidadMl / 1000).toFixed(2)}L</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{c.cantidadMl}ml</p>
                                        <p className="text-xs text-gray-600">{c.hora}</p>
                                    </div>
                                </div>
                                <button onClick={() => setLogs(prev => prev.filter(l => l.id !== c.id))} className="p-2 hover:bg-blue-100 rounded-lg">
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button className="fixed bottom-32 right-4 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700">
                <Plus className="w-6 h-6" />
            </button>
        </div>
    );
}

// ── REGISTROS PAGE ─────────────────────────────────────────────────────────
function RegistrosPage() {
    const [activeChart, setActiveChart] = useState<"adherence" | "averages" | "water">("adherence");
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <PageHeader title="Registros De Progreso" />
            <div className="p-4 flex-1 max-w-2xl mx-auto w-full pb-24">

                {/* Último registro */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <h2 className="text-lg font-medium mb-4">Último Registro</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div><p className="text-sm text-gray-600">Fecha</p><p className="font-medium">12 mar 2026</p></div>
                        <div>
                            <p className="text-sm text-gray-600">Peso</p>
                            <p className="flex items-center gap-1 font-medium">
                                72.4 kg <span className="text-sm text-green-600 flex items-center"><TrendingDown className="w-4 h-4" />0.6kg</span>
                            </p>
                        </div>
                        <div><p className="text-sm text-gray-600">IMC</p><p className="font-medium">23.1</p></div>
                        <div><p className="text-sm text-gray-600">% Grasa</p><p className="font-medium">18.4%</p></div>
                    </div>
                </div>

                {/* Estadísticas */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium">Estadísticas Nutricionales</h2>
                        <div className="flex bg-gray-100 p-1 rounded-lg gap-1">
                            {[{ id: "adherence", icon: LineChartIcon, title: "Adherencia" }, { id: "averages", icon: BarChart3, title: "Promedio" }, { id: "water", icon: Droplets, title: "Agua" }].map(c => {
                                const Icon = c.icon;
                                return (
                                    <button key={c.id} onClick={() => setActiveChart(c.id as any)}
                                        className={`p-1.5 rounded-md transition-all ${activeChart === c.id ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"}`} title={c.title}>
                                        <Icon className="w-4 h-4" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="h-[220px] w-full">
                        {activeChart === "adherence" && (
                            <div className="flex flex-col justify-center gap-2 h-full">
                                {ADHERENCIA.map((d, i) => (
                                    <div key={i} className="flex items-center gap-2 h-6">
                                        <span className="text-[9px] text-gray-400 w-8 text-right flex-shrink-0">{d.f}</span>
                                        <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                                            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${d.p}%` }} />
                                        </div>
                                        <span className="text-[9px] text-gray-500 w-8">{d.p}%</span>
                                    </div>
                                ))}
                                <p className="text-[10px] text-gray-400 text-center mt-2">Promedio de objetivos cumplidos por día</p>
                            </div>
                        )}
                        {activeChart === "averages" && (
                            <div className="flex flex-col justify-center gap-2 h-full">
                                {(Object.entries(TIPOS_PORCION) as [TipoPorcion, any][]).map(([t, cfg], i) => {
                                    const vals = [1.8, 2.1, 1.4, 2.6, 1.2, 0.6];
                                    const colors = ["bg-blue-400", "bg-green-400", "bg-red-400", "bg-amber-400", "bg-orange-400", "bg-yellow-400"];
                                    return (
                                        <div key={t} className="flex items-center gap-2">
                                            <span className="text-[9px] text-gray-500 w-16 text-right flex-shrink-0">{cfg.label}</span>
                                            <div className="flex-1 bg-gray-100 rounded-r-full h-5 overflow-hidden">
                                                <div className={`h-full rounded-r-full ${colors[i]}`} style={{ width: `${(vals[i] / 3) * 100}%` }} />
                                            </div>
                                            <span className="text-[9px] text-gray-500 w-6">{vals[i]}</span>
                                        </div>
                                    );
                                })}
                                <p className="text-[10px] text-gray-400 text-center mt-2">Promedio diario de porciones consumidas</p>
                            </div>
                        )}
                        {activeChart === "water" && (
                            <div className="flex items-end gap-1.5 h-full w-full pb-4">
                                {[{ f: "5m", ml: 1800 }, { f: "6m", ml: 2100 }, { f: "7m", ml: 1400 }, { f: "8m", ml: 2200 }, { f: "9m", ml: 1900 }, { f: "10m", ml: 2050 }, { f: "11m", ml: 1650 }, { f: "12m", ml: 1600 }].map((d, i) => (
                                    <div key={i} className="flex flex-col items-center flex-1 gap-1">
                                        <div className={`w-full rounded-t-sm ${d.ml >= 2000 ? "bg-blue-500" : "bg-blue-300"}`} style={{ height: `${(d.ml / 2500) * 150}px` }} />
                                        <span className="text-[8px] text-gray-400">{d.f}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Evolución peso */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <h2 className="text-lg font-medium mb-4">Evolución del Peso</h2>
                    <div className="flex items-end gap-3 h-32 px-2">
                        {[...REGISTROS_PESO].reverse().map(r => {
                            const pesos = REGISTROS_PESO.map(x => x.peso);
                            const min = Math.min(...pesos) - 0.5; const max = Math.max(...pesos) + 0.5;
                            const h = ((r.peso - min) / (max - min)) * 100;
                            return (
                                <div key={r.id} className="flex flex-col items-center flex-1 gap-1">
                                    <span className="text-[9px] text-blue-600 font-bold">{r.peso}</span>
                                    <div className="w-full bg-blue-500 rounded-t-sm" style={{ height: `${h}%` }} />
                                    <span className="text-[8px] text-gray-400">{r.fecha}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Historial */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <h2 className="text-lg font-medium mb-4">Historial</h2>
                    <div className="space-y-3">
                        {REGISTROS_PESO.map((r, idx) => (
                            <div key={r.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-sm text-gray-600">{r.fecha} 2026</span>
                                    <span className="font-semibold">{r.peso} kg</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-sm">
                                    <div><span className="text-gray-600">IMC:</span> {r.imc}</div>
                                    <div><span className="text-gray-600">Grasa:</span> {r.grasa}%</div>
                                </div>
                                {idx < REGISTROS_PESO.length - 1 && (
                                    <div className="mt-2 pt-2 border-t border-gray-200 text-sm text-green-600">
                                        {(r.peso - REGISTROS_PESO[idx + 1].peso).toFixed(1)}kg desde el registro anterior
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button className="fixed bottom-32 right-4 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700">
                <Plus className="w-6 h-6" />
            </button>
        </div>
    );
}

// ── CONFIG PAGE — faithful replica ─────────────────────────────────────────
function ConfigPage() {
    const [showPerfil, setShowPerfil] = useState(false);
    const [nombre, setNombre] = useState("María González");
    const [edad, setEdad] = useState("27");
    const [altura, setAltura] = useState("164");
    const [sexo, setSexo] = useState("femenino");

    const [notifAgua, setNotifAgua] = useState(false);
    const [notifIntervalo, setNotifIntervalo] = useState("90");
    const [notifMeds, setNotifMeds] = useState(false);
    const [showImport, setShowImport] = useState(false);
    const [showPDF, setShowPDF] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSaveIntervalo = () => {
        setSaving(true);
        setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 1500); }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <PageHeader title="Configuración" />

            <div className="p-4 flex-1 max-w-2xl mx-auto w-full pb-24">

                {/* Perfil */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            <h2 className="text-lg font-medium">Perfil de Usuario</h2>
                        </div>
                        <button onClick={() => setShowPerfil(true)} className="text-sm font-medium border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50">Editar</button>
                    </div>
                    <div className="space-y-1 text-sm">
                        <p><span className="text-gray-600">Nombre:</span> {nombre}</p>
                        <p><span className="text-gray-600">Edad:</span> {edad} años</p>
                        <p><span className="text-gray-600">Altura:</span> {altura} cm</p>
                        <p><span className="text-gray-600">Sexo:</span> {sexo}</p>
                    </div>
                </div>

                {/* Horarios */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <h2 className="text-lg font-medium">Horarios de Comida</h2>
                        </div>
                        <button className="text-sm font-medium border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50">Configurar</button>
                    </div>
                    <p className="text-sm text-gray-500">Define tus horarios y porciones ideales para el día.</p>
                </div>

                {/* Medicamentos */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                            <Pill className="w-5 h-5 text-purple-600" />
                            <h2 className="text-lg font-medium">Medicamentos y Extras</h2>
                        </div>
                        <button className="text-sm font-medium border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50">Configurar</button>
                    </div>
                    <p className="text-sm text-gray-500">Agrega medicamentos, vitaminas o porciones personalizadas.</p>
                </div>

                {/* Notificaciones */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <div className="flex items-center gap-2 mb-4">
                        <Bell className="w-5 h-5 text-yellow-500" />
                        <h2 className="text-lg font-medium">Notificaciones</h2>
                    </div>
                    <div className="space-y-4">
                        {/* Agua */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-base font-medium">Recordatorio de Agua</p>
                                <p className="text-xs text-gray-500">Avisar periódicamente para hidratarse</p>
                            </div>
                            <button
                                onClick={() => setNotifAgua(v => !v)}
                                className={`w-11 h-6 rounded-full transition-colors relative ${notifAgua ? "bg-blue-600" : "bg-gray-200"}`}
                            >
                                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifAgua ? "left-[22px]" : "left-0.5"}`} />
                            </button>
                        </div>
                        {notifAgua && (
                            <div className="flex items-center gap-2 ml-1 border-l-2 border-blue-100 pl-3">
                                <span className="text-sm font-medium whitespace-nowrap">Intervalo (min):</span>
                                <select value={notifIntervalo} onChange={e => { setNotifIntervalo(e.target.value); setSaved(false); }}
                                    className="border border-gray-200 rounded-md text-sm px-2 py-1 w-28 focus:outline-none">
                                    {["30", "45", "60", "90", "120", "180"].map(v => (
                                        <option key={v} value={v}>{v === "60" ? "1 hora" : v === "90" ? "1.5 horas" : v === "120" ? "2 horas" : v === "180" ? "3 horas" : `${v} min`}</option>
                                    ))}
                                </select>
                                <button
                                    onClick={handleSaveIntervalo}
                                    disabled={saving}
                                    className={`h-8 w-8 p-0 rounded-full flex items-center justify-center transition-all ${saved ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                </button>
                            </div>
                        )}
                        <hr className="border-gray-100" />
                        {/* Meds */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-base font-medium">Medicamentos</p>
                                <p className="text-xs text-gray-500">Recordar según horario configurado</p>
                            </div>
                            <button
                                onClick={() => setNotifMeds(v => !v)}
                                className={`w-11 h-6 rounded-full transition-colors relative ${notifMeds ? "bg-blue-600" : "bg-gray-200"}`}
                            >
                                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifMeds ? "left-[22px]" : "left-0.5"}`} />
                            </button>
                        </div>
                    </div>
                </div>

                <hr className="my-4 border-gray-200" />

                {/* Backup */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <h2 className="text-lg font-medium mb-3">Backup y Restauración</h2>
                    <div className="space-y-2">
                        <button className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md px-4 py-2 text-sm hover:bg-gray-50 font-medium text-gray-700">
                            <FileDown className="w-4 h-4 mr-2" /> Exportar Datos
                        </button>
                        <button onClick={() => setShowImport(true)} className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md px-4 py-2 text-sm hover:bg-gray-50 font-medium text-gray-700">
                            <FileUp className="w-4 h-4 mr-2" /> Importar Datos
                        </button>
                    </div>
                </div>

                {/* PDF */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <h2 className="text-lg font-medium mb-3">Informe para Nutricionista</h2>
                    <button onClick={() => setShowPDF(true)} className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md px-4 py-2 text-sm hover:bg-gray-50 font-medium text-gray-700">
                        <FileText className="w-4 h-4 mr-2" /> Generar Informe PDF
                    </button>
                </div>

                {/* Ayuda */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-gray-600" />
                            <h2 className="text-lg font-medium">Ayuda</h2>
                        </div>
                    </div>
                    <button className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md px-4 py-2 text-sm hover:bg-gray-50 font-medium text-gray-700">
                        Ver Introducción
                    </button>
                </div>
            </div>

            {/* Modal Perfil */}
            {showPerfil && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowPerfil(false)} />
                    <div className="relative bg-white rounded-xl p-6 w-full max-w-sm mx-4 space-y-4">
                        <h2 className="text-lg font-semibold">Perfil de Usuario</h2>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Nombre *</label>
                            <input value={nombre} onChange={e => setNombre(e.target.value)} className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Edad *</label>
                                <input type="number" value={edad} onChange={e => setEdad(e.target.value)} className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Altura (cm) *</label>
                                <input type="number" value={altura} onChange={e => setAltura(e.target.value)} className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Sexo *</label>
                            <select value={sexo} onChange={e => setSexo(e.target.value)} className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400">
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>
                        <div className="flex gap-2 pt-2">
                            <button onClick={() => setShowPerfil(false)} className="flex-1 border border-gray-200 rounded-md py-2 text-sm font-medium hover:bg-gray-50">Cancelar</button>
                            <button onClick={() => setShowPerfil(false)} className="flex-1 bg-gray-900 text-white rounded-md py-2 text-sm font-medium hover:bg-gray-800">Guardar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Importar */}
            {showImport && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowImport(false)} />
                    <div className="relative bg-white rounded-xl p-6 w-full max-w-sm mx-4 space-y-4">
                        <h2 className="text-lg font-semibold">Importar Datos</h2>
                        <p className="text-sm text-gray-600">Selecciona el modo de importación:</p>
                        <button className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md px-4 py-2 text-sm hover:bg-gray-50 font-medium">
                            <FileUp className="w-4 h-4 mr-2" /> Modo Completo (Sobrescribir todo)
                        </button>
                        <button className="w-full flex items-center justify-start gap-2 border border-gray-200 rounded-md px-4 py-2 text-sm hover:bg-gray-50 font-medium">
                            <FileUp className="w-4 h-4 mr-2" /> Modo Parcial (Combinar datos)
                        </button>
                        <p className="text-xs text-gray-500">
                            <strong>Completo:</strong> Reemplaza todos tus datos actuales.<br />
                            <strong>Parcial:</strong> Combina datos. Te preguntará si deseas sobrescribir tus horarios.
                        </p>
                    </div>
                </div>
            )}

            {/* Modal PDF */}
            {showPDF && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowPDF(false)} />
                    <div className="relative bg-white rounded-xl p-6 w-full max-w-sm mx-4 space-y-4">
                        <h2 className="text-lg font-semibold">Generar Informe PDF</h2>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Fecha Inicio</label>
                            <input type="date" defaultValue="2026-02-10" className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Fecha Fin</label>
                            <input type="date" defaultValue="2026-03-12" className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
                        </div>
                        <div className="flex gap-2 pt-2">
                            <button onClick={() => setShowPDF(false)} className="flex-1 border border-gray-200 rounded-md py-2 text-sm font-medium hover:bg-gray-50">Cancelar</button>
                            <button onClick={() => setShowPDF(false)} className="flex-1 bg-gray-900 text-white rounded-md py-2 text-sm font-medium hover:bg-gray-800">Generar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Main App Shell ──────────────────────────────────────────────────────────
export default function App() {
    const [tab, setTab] = useState<Tab>("comidas");
    const tabs = [
        { id: "comidas" as Tab, icon: Utensils, label: "Comidas" },
        { id: "agua" as Tab, icon: Droplet, label: "Agua" },
        { id: "registros" as Tab, icon: Activity, label: "Registros" },
        { id: "config" as Tab, icon: Settings, label: "Config" },
    ];
    return (
        <div className="flex flex-col h-screen bg-gray-50 overflow-hidden max-w-md mx-auto shadow-2xl">
            <div className="flex-1 overflow-y-auto pb-28">
                {tab === "comidas" && <ComidasPage />}
                {tab === "agua" && <AguaPage />}
                {tab === "registros" && <RegistrosPage />}
                {tab === "config" && <ConfigPage />}
            </div>
            {/* Nav — zinc-900/90 pill, bottom-12, backdrop-blur — identical to real app */}
            <div className="fixed bottom-12 left-0 right-0 z-50 px-4 max-w-md mx-auto" style={{ left: "50%", transform: "translateX(-50%)", width: "calc(100% - 2rem)" }}>
                <nav className="flex justify-around items-center h-16 bg-zinc-900/90 text-white rounded-full shadow-2xl backdrop-blur-md px-2 border border-white/10">
                    {tabs.map(t => {
                        const Icon = t.icon; const isActive = tab === t.id;
                        return (
                            <button key={t.id} onClick={() => setTab(t.id)}
                                className={`flex flex-col items-center justify-center w-16 h-full rounded-full transition-all duration-200 relative ${isActive ? "text-blue-400" : "text-gray-400 hover:text-gray-200 hover:bg-white/5"}`}>
                                {isActive && <span className="absolute top-3 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.6)]" />}
                                <Icon className={`w-6 h-6 ${isActive ? "stroke-[2.5] drop-shadow-sm" : "stroke-2"}`} />
                            </button>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
