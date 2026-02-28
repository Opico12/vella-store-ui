
import React, { useState, useRef } from 'react';
import { allProducts } from './products';
import { ProductCard } from './ProductCard';
import type { Product } from './types';
import type { Currency } from './currency';

// URL Oficial del Catálogo Actual (Oriflame España) - Se actualiza sola
const INTERACTIVE_CATALOG_URL = 'https://es-catalogue.oriflame.com/oriflame/es/2026003-brp?HideStandardUI=true&Page=1';
const FALLBACK_CATALOG_URL = 'https://es.oriflame.com/products/digital-catalogue-current';

interface CatalogPageProps {
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onBuyNow: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
    currency: Currency;
}

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
            setStatusMessage('Producto no encontrado. Revisa el código.');
            setTimeout(() => { setAddStatus('idle'); setStatusMessage(''); }, 3000);
        }
    };

    // Selección de productos destacados para mostrar bajo el catálogo
    const catalogProducts = allProducts.slice(0, 8); 

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Cabecera: Título y Pedido Rápido */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 border-b border-gray-100 pb-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-black text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-widest">
                            Catálogo Actual
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Catálogo Digital Interactivo</h1>
                            <p className="text-gray-500 text-sm mt-1">Explora las páginas, encuentra los códigos y añádelos aquí.</p>
                        </div>
                    </div>
                    
                    {/* Formulario de Pedido Rápido (Desktop/Mobile) */}
                    <div className="w-full md:w-auto bg-fuchsia-50 p-4 rounded-xl border border-fuchsia-100 shadow-sm">
                        <h3 className="text-xs font-bold text-fuchsia-800 uppercase mb-2 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            Pedido Rápido por Código
                        </h3>
                        <form onSubmit={handleQuickAdd} className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Ej: 46801"
                                className="flex-grow w-full md:w-48 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-fuchsia-500 outline-none transition-shadow"
                                value={quickAddCode}
                                onChange={(e) => setQuickAddCode(e.target.value)}
                            />
                            <button
                                ref={buttonRef}
                                type="submit"
                                disabled={!quickAddCode}
                                className="bg-black text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Añadir
                            </button>
                        </form>
                        {statusMessage && (
                            <p className={`text-xs mt-2 font-bold animate-pulse ${addStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                {statusMessage}
                            </p>
                        )}
                    </div>
                </div>

                {/* VISOR DEL CATÁLOGO (IFRAME) */}
                <div className="relative w-full bg-gray-100 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 mb-16" style={{ height: '80vh', minHeight: '600px' }}>
                    <iframe
                        data-ipaper="true"
                        id="ipaper-catalogue"
                        data-testid="Presentation-catalogue-ipaper-iframe"
                        src={INTERACTIVE_CATALOG_URL}
                        title="iPaper"
                        className="w-full h-full absolute inset-0 products-app-emotion-z39r5g"
                        style={{ border: 'none' }}
                        allowFullScreen
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        loading="lazy"
                    />
                </div>

                {/* PRODUCTOS DESTACADOS */}
                <div className="border-t border-gray-100 pt-12">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-extrabold text-black mb-2">Destacados de la Campaña</h2>
                        <p className="text-gray-500">Los productos que todo el mundo está buscando esta campaña.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {catalogProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                currency={currency}
                                onAddToCart={onAddToCart}
                                onQuickAddToCart={onQuickAddToCart}
                                onBuyNow={onBuyNow || (() => {})} // Fallback if onBuyNow is optional
                                onProductSelect={onProductSelect}
                                onQuickView={onQuickView}
                            />
                        ))}
                    </div>
                </div>

                {/* Enlace de Ayuda */}
                <div className="text-center mt-12 pb-8">
                    <p className="text-gray-500 text-sm mb-2">¿No ves el catálogo correctamente?</p>
                    <a href={FALLBACK_CATALOG_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-black font-bold hover:underline">
                        Abrir catálogo en ventana externa
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;
