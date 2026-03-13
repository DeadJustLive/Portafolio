import { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from './shared/mockData';
import type { Product, ProductUpdateMessage } from './shared/types';
import { WebApp } from './web/WebApp';
import { MobileApp } from './mobile/MobileApp';

/**
 * App router: lee el query param ?view=web|app
 *  - ?view=web   → tienda web (cliente)
 *  - ?view=app   → admin móvil
 *
 * Interacción via postMessage:
 *  - Admin emite: window.parent.postMessage({ type:'PRODUCT_UPDATE', product }, '*')
 *  - Web escucha: window.addEventListener('message', ...)
 *
 * Si ambos están en el mismo origen (o misma ventana), también se comunican
 * via el storage event de los productos.
 */
export default function App() {
    const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

    // Detectar si estamos en iframe o ventana directa
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view') ?? 'web';

    // Escuchar mensajes del admin (para la tienda web)
    useEffect(() => {
        if (view !== 'web') return;
        const handler = (e: MessageEvent<ProductUpdateMessage>) => {
            if (e.data?.type === 'PRODUCT_UPDATE') {
                setProducts(prev => prev.map(p => p.id === e.data.product.id ? e.data.product : p));
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, [view]);

    // Callback del admin: actualiza local + emite postMessage al padre
    const handleProductUpdate = (updated: Product) => {
        setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
        // Notificar a la tienda web (si está en el mismo origen en el iframe padre)
        window.parent?.postMessage({ type: 'PRODUCT_UPDATE', product: updated } satisfies ProductUpdateMessage, '*');
    };

    if (view === 'app') {
        return <MobileApp products={products} onProductUpdate={handleProductUpdate} />;
    }

    return <WebApp products={products} />;
}
