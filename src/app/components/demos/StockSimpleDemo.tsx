import { useState } from 'react';
import { Search, ScanBarcode, Barcode, Tags, CheckCircle2, Package, Archive, RefreshCcw } from 'lucide-react';

export function StockSimpleDemo() {
    const [activeTab, setActiveTab] = useState<'scan' | 'list'>('list');
    const [isScanning, setIsScanning] = useState(false);

    return (
        <div className="w-full h-full flex flex-col relative bg-slate-900 rounded-b-[2rem] overflow-hidden text-slate-100">

            {/* Mobile Frame Header */}
            <div className="pt-8 pb-4 px-6 bg-slate-950 border-b border-slate-800 flex justify-between items-center z-10">
                <div>
                    <h2 className="text-xl font-bold">StockSimple</h2>
                    <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Sincronizado
                    </div>
                </div>
                <button
                    onClick={() => setIsScanning(!isScanning)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isScanning ? 'bg-rose-500 text-white' : 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'}`}
                >
                    {isScanning ? <Barcode className="w-6 h-6 animate-pulse" /> : <ScanBarcode className="w-5 h-5" />}
                </button>
            </div>

            <div className="flex-1 relative overflow-hidden flex flex-col">

                {/* Scanning Overlay Simulation */}
                {isScanning && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6">
                        <div className="w-full max-w-sm aspect-square border-2 border-dashed border-blue-500 rounded-3xl relative flex items-center justify-center">
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-3xl"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-3xl"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-3xl"></div>

                            <div className="w-full h-0.5 bg-red-500/50 absolute top-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-[scan_2s_ease-in-out_infinite]" />

                            <p className="text-white font-mono text-sm absolute bottom-4">Enfocando cód. barras...</p>
                        </div>
                        <button
                            onClick={() => setIsScanning(false)}
                            className="mt-8 px-6 py-2 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                )}

                {/* Search Bar */}
                <div className="p-4 bg-slate-900 border-b border-white/5">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, código..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 transition-colors"
                            disabled={isScanning}
                        />
                    </div>
                </div>

                {/* Inventory List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">

                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-white">Chorizo Sureño 1Kg</h3>
                                <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded uppercase font-bold tracking-wide">Stock Bajo</span>
                            </div>
                        </div>
                        <div className="text-xs text-slate-400 mb-4 flex items-center gap-1">
                            <Tags className="w-3 h-3" /> Fiambrería • San Jorge
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-slate-950 rounded-xl p-2 text-center border border-slate-800">
                                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wide mb-1">Stock</div>
                                <div className="text-lg font-bold text-red-400">4</div>
                            </div>
                            <div className="bg-slate-950 rounded-xl p-2 text-center border border-slate-800">
                                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wide mb-1">Mínimo</div>
                                <div className="text-lg font-bold text-slate-300">10</div>
                            </div>
                            <div className="bg-blue-600/10 rounded-xl p-2 text-center border border-blue-500/20">
                                <div className="text-[10px] text-blue-400 uppercase font-bold tracking-wide mb-1">Precio</div>
                                <div className="text-lg font-bold text-blue-400">$6.500</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/20 border border-slate-800 rounded-2xl p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-slate-200">Bebida Cola 3L</h3>
                            </div>
                        </div>
                        <div className="text-xs text-slate-500 mb-4">Bebidas • Coca-Cola</div>

                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-slate-900 rounded-xl p-2 text-center">
                                <div className="text-[10px] text-slate-600 uppercase font-bold mb-1">Stock</div>
                                <div className="text-lg font-bold text-emerald-400">45</div>
                            </div>
                            <div className="bg-slate-900 rounded-xl p-2 text-center">
                                <div className="text-[10px] text-slate-600 uppercase font-bold mb-1">Mínimo</div>
                                <div className="text-lg font-bold text-slate-400">20</div>
                            </div>
                            <div className="bg-slate-900 rounded-xl p-2 text-center">
                                <div className="text-[10px] text-slate-600 uppercase font-bold mb-1">Precio</div>
                                <div className="text-lg font-bold text-slate-300">$2.800</div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
