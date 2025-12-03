import React, { useState, useRef } from 'react';
import { allProducts } from './products';
import { ProductCard } from './ProductCard';
import type { Product } from './types';
import type { Currency } from './currency';

// URL del Catálogo Actualizado
const INTERACTIVE_CATALOG_URL = 'https://es-catalogue.oriflame.com/oriflame/es/2024016?HideStandardUI=true&Page=1';
const FALLBACK_CATALOG_URL = 'https://es.oriflame.com/products/digital-catalogue-current';

interface CatalogPageProps {
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onBuyNow: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
    currency: Currency;
}

const VisaIcon = () => (
    <svg className="w-8 h-5" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
       <rect width="38" height="24" rx="2" fill="white"/>
       <path d="M15.5 15.5L13.5 4.5H11.5L9 10.5L7.5 6.5L7 4.5H5L8.5 15.5H11L13 9.5L14.5 4.5H15.5V15.5Z" fill="#1A1F71"/>
       <path d="M20.5 15.5L22.5 4.5H20.5L19.5 9L18.5 4.5H16.5L18.5 15.5H20.5Z" fill="#1A1F71"/>
       <path d="M26.5 15.5L28.5 4.5H26.5L25 8.5L23.5 4.5H21.5L23.5 15.5H26.5Z" fill="#1A1F71"/>
       <path d="M32.5 4.5H29.5L28.5 9L27.5 4.5H25.5L28.5 15.5H30.5L34.5 4.5H32.5Z" fill="#1A1F71"/>
       <path d="M11 15.5L13 4.5H15L13 15.5H11Z" fill="#1A1F71"/>
    </svg>
);

const MastercardIcon = () => (
    <svg className="w-8 h-5" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="38" height="24" rx="2" fill="white"/>
        <circle cx="13" cy="12" r="7" fill="#EB001B"/>
        <circle cx="25" cy="12" r="7" fill="#F79E1B"/>
        <path d="M19 16.4C20.3 15.4 21.2 13.8 21.2 12C21.2 10.2 20.3 8.6 19 7.6C17.7 8.6 16.8 10.2 16.8 12C16.8 13.8 17.7 15.4 19 16.4Z" fill="#FF5F00"/>
    </svg>
);

const CatalogPage: React.FC<CatalogPageProps> = ({ onAddToCart, onQuickAddToCart, onBuyNow, onProductSelect, onQuickView, currency }) => {
    const [quickAddCode, setQuickAddCode] = useState('');
    const [addStatus, setAddStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleQuickAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!quickAddCode.trim()) return;

        const code = parseInt(quickAddCode.trim());
        const product = allProducts.find(p => p.id === code);

        if (product) {
            onAddToCart(product, buttonRef.current, null);
            setAddStatus('success');
            setStatusMessage(`¡${product.name} añadido!`);
            setQuickAddCode('');
            setTimeout(() => { setAddStatus('idle'); setStatusMessage(''); }, 3000);
        } else {
            setAddStatus('error');
            setStatusMessage('Producto no encontrado.');
            setTimeout(() => { setAddStatus('idle'); setStatusMessage(''); }, 3000);
        }
    };

    // Productos destacados del catálogo para mostrar abajo
    const catalogProducts = allProducts.slice(0, 8); 

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                
                {/* Cabecera del Catálogo */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-4">
                        <img 
                            src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" 
                            alt="Logo" 
                            className="h-16 w-auto object-contain" 
                        />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Catálogo Digital</h1>
                            <p className="text-gray-600">Explora y compra directamente desde el catálogo interactivo.</p>
                        </div>
                    </div>
                    
                    {/* Formulario Rápido Flotante en Desktop */}
                    <div className="hidden md:block bg-white p-4 rounded-lg shadow-md border border-gray-200 w-80">
                        <form onSubmit={handleQuickAdd} className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Código producto..."
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-fuchsia-500 outline-none"
                                value={quickAddCode}
                                onChange={(e) => setQuickAddCode(e.target.value)}
                            />
                            <button
                                ref={buttonRef}
                                type="submit"
                                disabled={!quickAddCode}
                                className="bg-black text-white px-4 py-2 rounded text-sm font-bold hover:bg-gray-800 transition-colors"
                            >
                                Añadir
                            </button>
                        </form>
                        {statusMessage && (
                            <p className={`text-xs mt-2 font-bold ${addStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                {statusMessage}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* VISOR DEL CATÁLOGO (IFRAME) */}
                    <div className="flex-grow bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 relative" style={{ minHeight: '75vh' }}>
                        <iframe
                            src={INTERACTIVE_CATALOG_URL}
                            title="Catálogo Digital Vellaperfumeria"
                            className="w-full h-full absolute inset-0"
                            style={{ border: 'none' }}
                            allowFullScreen
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                            loading="lazy"
                        />
                    </div>

                    {/* BARRA LATERAL MÓVIL (PEDIDO RÁPIDO) */}
                    <div className="lg:hidden bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            Pedido Rápido
                        </h3>
                        <form onSubmit={handleQuickAdd} className="space-y-3">
                            <input
                                type="number"
                                placeholder="Introduce el código del producto"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-fuchsia-500"
                                value={quickAddCode}
                                onChange={(e) => setQuickAddCode(e.target.value)}
                            />
                            <button
                                type="submit"
                                disabled={!quickAddCode}
                                className="w-full bg-[var(--color-primary-solid)] text-white font-bold py-3 rounded-lg hover:bg-fuchsia-700 transition-colors shadow-md"
                            >
                                Añadir a la Cesta
                            </button>
                        </form>
                        {statusMessage && (
                            <div className={`mt-3 p-2 rounded text-center text-sm font-bold ${addStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {statusMessage}
                            </div>
                        )}
                    </div>
                </div>

                {/* PRODUCTOS DESTACADOS DEBAJO DEL CATÁLOGO */}
                <div className="mt-16 border-t border-gray-200 pt-12">
                    <h2 className="text-2xl font-bold text-center mb-8">Destacados del Catálogo</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {catalogProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                currency={currency}
                                onAddToCart={onAddToCart}
                                onQuickAddToCart={onQuickAddToCart}
                                onBuyNow={onBuyNow}
                                onProductSelect={onProductSelect}
                                onQuickView={onQuickView}
                            />
                        ))}
                    </div>
                </div>

                {/* Enlace de Respaldo */}
                <div className="text-center mt-8 pb-8">
                    <a href={FALLBACK_CATALOG_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 underline hover:text-black">
                        ¿Problemas para ver el catálogo? Ábrelo en una ventana nueva
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;