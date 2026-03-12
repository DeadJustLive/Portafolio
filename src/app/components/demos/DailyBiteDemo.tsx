import { useState } from 'react';
import { Utensils, Droplet, Activity, Settings, Plus, BookOpen, Circle, Check } from 'lucide-react';

type Tab = 'comidas' | 'agua' | 'registros' | 'config';

export function DailyBiteDemo() {
    const [activeTab, setActiveTab] = useState<Tab>('comidas');
    const [showAddMenu, setShowAddMenu] = useState(false);

    // Simulated consumption data
    const consumed = [
        { id: 1, type: 'Milk', label: 'Lácteos', time: '08:30', amount: 1, icon: 'bg-blue-100 text-blue-600', border: 'border-blue-200 bg-blue-50' },
        { id: 2, type: 'Wheat', label: 'Cereales', time: '08:35', amount: 2, icon: 'bg-amber-100 text-amber-600', border: 'border-amber-200 bg-amber-50' },
        { id: 3, type: 'Beef', label: 'Proteínas', time: '13:00', amount: 1, icon: 'bg-rose-100 text-rose-600', border: 'border-rose-200 bg-rose-50' },
        { id: 4, type: 'Salad', label: 'Verduras', time: '13:10', amount: 1, icon: 'bg-emerald-100 text-emerald-600', border: 'border-emerald-200 bg-emerald-50' },
    ];

    const pending = [
        { id: 5, type: 'Apple', label: 'Frutas', time: 'Pendiente', amount: 1 },
        { id: 6, type: 'Nut', label: 'Grasas', time: 'Pendiente', amount: 1 },
    ];

    return (
        <div className="w-full h-full flex flex-col relative bg-gray-50 overflow-hidden font-sans text-gray-800">

            {/* App Header */}
            <div className="pt-6 pb-4 px-6 bg-white shadow-sm shrink-0 flex justify-between items-center z-10">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Comidas del Día</h2>
                    <div className="text-sm font-medium text-gray-500 mt-0.5">Hoy</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold relative">
                    D
                    <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                </div>
            </div>

            {/* Main Content Scroll */}
            <div className="flex-1 overflow-y-auto w-full p-4 pb-28">
                <div className="max-w-md mx-auto space-y-6">

                    {/* Daily Progress Widget */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
                        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Progreso Diario</h2>
                        <div className="grid grid-cols-4 gap-3">

                            <div className="flex flex-col items-center p-2 rounded-xl bg-blue-50 border border-blue-100">
                                <div className="mb-2 p-1.5 rounded-full bg-blue-100 text-blue-600"><Circle className="w-4 h-4 fill-current" /></div>
                                <span className="text-lg font-bold text-blue-700">1<span className="text-xs text-blue-400 font-normal">/2</span></span>
                                <span className="text-[9px] text-gray-500 uppercase font-semibold mt-1">Lácteos</span>
                            </div>

                            <div className="flex flex-col items-center p-2 rounded-xl bg-amber-50 border border-amber-100">
                                <div className="mb-2 p-1.5 rounded-full bg-amber-100 text-amber-600"><Circle className="w-4 h-4 fill-current" /></div>
                                <span className="text-lg font-bold text-amber-700">2<span className="text-xs text-amber-400 font-normal">/4</span></span>
                                <span className="text-[9px] text-gray-500 uppercase font-semibold mt-1">Cereales</span>
                            </div>

                            <div className="flex flex-col items-center p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                                <div className="mb-2 p-1.5 rounded-full bg-emerald-100 text-emerald-600"><Circle className="w-4 h-4 fill-current" /></div>
                                <span className="text-lg font-bold text-emerald-700">1<span className="text-xs text-emerald-400 font-normal">/3</span></span>
                                <span className="text-[9px] text-gray-500 uppercase font-semibold mt-1">Verduras</span>
                            </div>

                            <div className="flex flex-col items-center p-2 rounded-xl bg-rose-50 border border-rose-100">
                                <div className="mb-2 p-1.5 rounded-full bg-rose-100 text-rose-600"><Circle className="w-4 h-4 fill-current" /></div>
                                <span className="text-lg font-bold text-rose-700">1<span className="text-xs text-rose-400 font-normal">/2</span></span>
                                <span className="text-[9px] text-gray-500 uppercase font-semibold mt-1">Proteínas</span>
                            </div>

                        </div>
                    </div>

                    {/* Meal Time Block (e.g. Desayuno) */}
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                        <div className="px-5 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-bold text-gray-800">Desayuno</h3>
                            <div className="text-xs font-semibold px-2 py-1 bg-white shadow-sm border border-gray-100 rounded-full text-gray-500">08:00</div>
                        </div>
                        <div className="p-4 space-y-2">

                            {consumed.slice(0, 2).map((item) => (
                                <div key={item.id} className={`flex items-center p-2 rounded-xl border ${item.border}`}>
                                    <div className={`p-2 rounded-full mr-3 ${item.icon}`}>
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-800">{item.label}</p>
                                        <p className="text-xs text-gray-500 font-medium">{item.time}</p>
                                    </div>
                                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/50 text-gray-700">
                                        {item.amount} un
                                    </span>
                                </div>
                            ))}

                            {/* Ghost pending item */}
                            <div className="flex items-center p-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 opacity-60 hover:opacity-100 hover:border-indigo-300 transition-all cursor-pointer">
                                <div className="p-2 rounded-full mr-3 bg-gray-200 text-gray-500">
                                    <Circle className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-600">Frutas</p>
                                    <p className="text-xs text-gray-400 font-medium">Pendiente</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Meal Time Block (e.g. Almuerzo) */}
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                        <div className="px-5 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-bold text-gray-800">Almuerzo</h3>
                            <div className="text-xs font-semibold px-2 py-1 bg-white shadow-sm border border-gray-100 rounded-full text-gray-500">13:30</div>
                        </div>
                        <div className="p-4 space-y-2">

                            {consumed.slice(2, 4).map((item) => (
                                <div key={item.id} className={`flex items-center p-2 rounded-xl border ${item.border}`}>
                                    <div className={`p-2 rounded-full mr-3 ${item.icon}`}>
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-800">{item.label}</p>
                                        <p className="text-xs text-gray-500 font-medium">{item.time}</p>
                                    </div>
                                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/50 text-gray-700">
                                        {item.amount} un
                                    </span>
                                </div>
                            ))}

                            {/* Ghost pending items */}
                            {pending.map(p => (
                                <div key={p.id} className="flex items-center p-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 opacity-60 hover:opacity-100 hover:border-indigo-300 transition-all cursor-pointer">
                                    <div className="p-2 rounded-full mr-3 bg-gray-200 text-gray-500">
                                        <Circle className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-600">{p.label}</p>
                                        <p className="text-xs text-gray-400 font-medium">{p.time}</p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>
            </div>

            {/* Floating Action Menu (Simulated) */}
            <div className="absolute z-40 right-6 bottom-32 flex flex-col items-center gap-3">
                {showAddMenu && (
                    <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 mb-2">
                        <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-indigo-600 border border-gray-100 hover:bg-gray-50">
                            <BookOpen className="w-4 h-4" />
                        </button>
                    </div>
                )}
                <button
                    onClick={() => setShowAddMenu(!showAddMenu)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(79,70,229,0.4)] transition-all duration-300 ${showAddMenu ? 'bg-indigo-700 rotate-45' : 'bg-indigo-600'}`}
                >
                    <Plus className="w-6 h-6 text-white" />
                </button>
            </div>

            {/* Floating Bottom Navigation Bar */}
            <div className="absolute bottom-12 left-4 right-4 z-50">
                <nav className="flex justify-around items-center h-16 bg-zinc-900/90 text-white rounded-full shadow-2xl backdrop-blur-md px-2 max-w-sm mx-auto border border-white/10 relative">

                    <button
                        onClick={() => setActiveTab('comidas')}
                        className={`flex flex-col items-center justify-center w-16 h-full relative transition-all duration-200 ${activeTab === 'comidas' ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
                    >
                        {activeTab === 'comidas' && <span className="absolute top-3 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.6)]" />}
                        <Utensils className={`w-6 h-6 ${activeTab === 'comidas' ? 'stroke-[2.5] drop-shadow-sm' : 'stroke-2'}`} />
                    </button>

                    <button
                        onClick={() => setActiveTab('agua')}
                        className={`flex flex-col items-center justify-center w-16 h-full relative transition-all duration-200 ${activeTab === 'agua' ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
                    >
                        {activeTab === 'agua' && <span className="absolute top-3 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.6)]" />}
                        <Droplet className={`w-6 h-6 ${activeTab === 'agua' ? 'stroke-[2.5] drop-shadow-sm' : 'stroke-2'}`} />
                    </button>

                    <button
                        onClick={() => setActiveTab('registros')}
                        className={`flex flex-col items-center justify-center w-16 h-full relative transition-all duration-200 ${activeTab === 'registros' ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
                    >
                        {activeTab === 'registros' && <span className="absolute top-3 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.6)]" />}
                        <Activity className={`w-6 h-6 ${activeTab === 'registros' ? 'stroke-[2.5] drop-shadow-sm' : 'stroke-2'}`} />
                    </button>

                    <button
                        onClick={() => setActiveTab('config')}
                        className={`flex flex-col items-center justify-center w-16 h-full relative transition-all duration-200 ${activeTab === 'config' ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
                    >
                        {activeTab === 'config' && <span className="absolute top-3 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.6)]" />}
                        <Settings className={`w-6 h-6 ${activeTab === 'config' ? 'stroke-[2.5] drop-shadow-sm' : 'stroke-2'}`} />
                    </button>

                </nav>
            </div>

        </div>
    );
}
