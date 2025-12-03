
import React from 'react';
import type { View } from './types';

interface InteractiveCatalogSectionProps {
    onNavigate: (view: View) => void;
}

const InteractiveCatalogSection: React.FC<InteractiveCatalogSectionProps> = ({ onNavigate }) => {
    const INTERACTIVE_CATALOG_URL = 'https://es-catalogue.oriflame.com/oriflame/es/2024016?HideStandardUI=true&Page=1';

    return (
        <section className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
                <span className="inline-block py-1 px-3 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider mb-4">
                    Campaña Actual
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-4">
                    Catálogo 16 Digital
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Explora las páginas de nuestro catálogo interactivo. Descubre las ofertas de Black Friday, sets de regalo y las últimas tendencias de belleza directamente desde tu pantalla.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => onNavigate('catalog')}
                        className="bg-[var(--color-primary-solid)] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-fuchsia-700 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        Ver Catálogo 16
                    </button>
                    <button
                         onClick={() => onNavigate('ofertas')}
                         className="bg-white text-black border-2 border-gray-200 font-bold py-3 px-8 rounded-full hover:border-black transition-colors"
                    >
                        Ver Ofertas
                    </button>
                </div>
            </div>

            {/* AQUÍ ESTÁ EL CAMBIO: IFRAME REAL EN LUGAR DE IMAGEN */}
            <div className="w-full md:w-1/2 relative aspect-[4/3] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <iframe
                    src={INTERACTIVE_CATALOG_URL}
                    title="Catálogo Interactivo Sección"
                    className="w-full h-full border-0"
                    allowFullScreen
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    loading="lazy"
                />
            </div>
        </section>
    );
};

export default InteractiveCatalogSection;
