/**
 * DailyBiteDemo
 * Carga el mockup pre-compilado de DailyBite
 * desde /public/demos/dailybite/ via iframe.
 */
import { PhoneFrame } from './PhoneFrame';

export function DailyBiteDemo() {
    return (
        <PhoneFrame title="DailyBite PWA">
            <iframe
                src="demos/dailybite/index.html"
                title="DailyBite Demo"
                className="w-full h-full border-0 block"
                style={{ minHeight: '100%' }}
            />
        </PhoneFrame>
    );
}
