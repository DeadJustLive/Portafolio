/**
 * StockSimpleDemo
 * Carga el mockup pre-compilado del proyecto StockSimple
 * desde /public/demos/stocksimple/ via iframe.
 */
export function StockSimpleDemo() {
    return (
        <iframe
            src="demos/stocksimple/index.html"
            title="StockSimple Demo"
            className="w-full h-full border-0 block"
            style={{ minHeight: '100%' }}
        />
    );
}
