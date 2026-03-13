/**
 * DailyBiteDemo
 * Carga el mockup pre-compilado de DailyBite
 * desde /public/demos/dailybite/ via iframe.
 */
export function DailyBiteDemo() {
    return (
        <iframe
            src="demos/dailybite/index.html"
            title="DailyBite Demo"
            className="w-full h-full border-0 block"
            style={{ minHeight: '100%' }}
        />
    );
}
