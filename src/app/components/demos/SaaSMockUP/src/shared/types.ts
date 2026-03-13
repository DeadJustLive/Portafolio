// Tipos compartidos entre la tienda web y la app admin
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: string;
    image: string;
    stock: number;
    available: boolean;
    onSale: boolean;
    salePercentage?: number;
    isFeatured: boolean;
    isNew?: boolean;
}

// Mensaje postMessage entre web ↔ app
export interface ProductUpdateMessage {
    type: 'PRODUCT_UPDATE';
    product: Product;
}
