
import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen animate-fade-in">
            {/* Hero Section */}
            <div className="relative bg-black text-white py-20">
                <div className="absolute inset-0 overflow-hidden">
                     <img 
                        src="https://images.unsplash.com/photo-1522335789203-abd652322ed8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2087&q=80" 
                        alt="Fondo Vellaperfumeria" 
                        className="w-full h-full object-cover opacity-40"
                    />
                </div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 font-serif">
                        Vellaperfumeria
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-fuchsia-200 max-w-2xl mx-auto">
                        Proveedor de Cosmética y Wellness
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-4xl mx-auto space-y-16">
                    
                    {/* Mission Statement based on user description */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-black mb-6">Nuestra Esencia</h2>
                        <p className="text-xl text-gray-700 leading-relaxed font-light">
                            "Realizamos estilismos con el color y ofrecemos una galería de cosméticos exclusiva. 
                            El color y el timeline stylo son nuestra pasión."
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="bg-fuchsia-50 p-8 rounded-2xl border border-fuchsia-100 transform hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Estilismo y Color</h3>
                            <p className="text-gray-600">
                                Expertos en la creación de estilismos únicos a través del color. Nuestra galería de cosméticos está curada para ofrecerte las últimas tendencias y tonos vibrantes que definen tu estilo personal.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300">
                             <div className="w-12 h-12 bg-[var(--color-primary-solid)] text-white rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Wellness y Cosmética</h3>
                            <p className="text-gray-600">
                                Como tu proveedor de confianza, nos dedicamos al bienestar integral. Seleccionamos productos de alta calidad que cuidan de ti por dentro y por fuera, fusionando la belleza con la salud.
                            </p>
                        </div>
                    </div>

                    {/* Contact CTA */}
                    <div className="bg-black text-white rounded-3xl p-10 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-4">¿Tienes dudas sobre tu estilismo?</h2>
                            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                                Nuestro equipo está listo para asesorarte sobre los mejores productos de color y cosmética para ti.
                            </p>
                            <a 
                                href="https://api.whatsapp.com/send?phone=34661202616" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-fuchsia-400 hover:text-white transition-colors"
                            >
                                Contactar ahora
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default AboutPage;
