
import React from 'react';
import type { View } from './types';

interface InteractiveCatalogSectionProps {
    onNavigate: (view: View) => void;
}

const InteractiveCatalogSection: React.FC<InteractiveCatalogSectionProps> = ({ onNavigate }) => {
    // Usamos el enlace 'current' para que nunca caduque
    const INTERACTIVE_CATALOG_URL = 'https://es-catalogue.oriflame.com/oriflame/es-ES/current?HideStandardUI=true&Page=1';

    return (
        <section className="flex flex-col md:flex-row gap-8 items-center bg-gray-50 rounded-2xl p-6 md:p-10 border border-gray-100">
            <div className="w-full md:w-1/2 space-y-6">
                <div>
                    <span className="inline-block py-1 px-3 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider mb-3">
                        Nuevo
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight leading-tight">
                        Catálogo <span className="text-fuchsia-600">Digital</span>
                    </h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Descubre las nuevas tendencias, ofertas de Black Friday y sets de regalo exclusivos. Hojea las páginas interactivas y compra tus favoritos al instante.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                    <button
                        onClick={() => onNavigate('catalog')}
                        className="bg-black text-white font-bold py-4 px-8 rounded-full shadow-xl hover:bg-gray-800 transition-all transform hover:-translate-y-1 flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        Abrir Catálogo
                    </button>
                    <button
                         onClick={() => onNavigate('ofertas')}
                         className="bg-white text-black border-2 border-gray-200 font-bold py-4 px-8 rounded-full hover:border-black transition-colors"
                    >
                        Ver Ofertas
                    </button>
                </div>
            </div>

            <div className="w-full md:w-1/2">
                <div className="relative aspect-[4/3] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transform md:rotate-1 hover:rotate-0 transition-transform duration-500">
                    <iframe
                        src={INTERACTIVE_CATALOG_URL}
                        title="Vista Previa Catálogo"
                        className="w-full h-full border-0 pointer-events-none" // pointer-events-none para que al hacer click vaya a la pagina dedicada si se desea, o dejarlo interactivo
                        loading="lazy"
                    />
                    {/* Overlay invisible para capturar click y navegar a la página completa (opcional, mejora UX en móviles) */}
                    <div 
                        className="absolute inset-0 z-10 cursor-pointer"
                        onClick={() => onNavigate('catalog')}
                    ></div>
                </div>
                <p className="text-center text-xs text-gray-400 mt-4 font-medium uppercase tracking-widest">
                    Haz clic para ampliar a pantalla completa
                </p>
            </div>
        </section>
    );
};

export default InteractiveCatalogSection;
