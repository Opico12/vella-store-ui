import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import type { CartItem } from './types';

interface Message {
    role: 'user' | 'model';
    text: string;
}

interface AsistenteIAPageProps {
    cartItems?: CartItem[];
}

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-fuchsia-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m1-9l2-2 2 2m-2 4v6m2-6l2 2-2 2M15 3l2 2-2 2m-2-4v4m2 4l2 2-2 2m-8 4h12" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const AsistenteIAPage: React.FC<AsistenteIAPageProps> = ({ cartItems = [] }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [chat, setChat] = useState<Chat | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initAI = async () => {
            try {
                // Obtener API KEY de forma segura (compatible con Vite y Node)
                const apiKey = (import.meta as any).env?.VITE_API_KEY || (typeof process !== 'undefined' ? process.env?.API_KEY : undefined);

                if (!apiKey) {
                    console.warn("⚠️ No se encontró la API Key de Gemini. El chat funcionará en modo limitado o simulación.");
                    // No mostramos error fatal para no bloquear la UI, pero el chat real no funcionará sin la clave.
                }

                const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });
                
                let cartContext = "";
                if (cartItems.length > 0) {
                    cartContext = "El cliente tiene actualmente en su carrito: " + 
                        cartItems.map(item => `${item.product.name}`).join(', ') + 
                        ". Úsalo para dar consejos.";
                }

                const newChat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: `Eres el Asistente Experto de Vellaperfumeria. Tu tono es profesional, cálido y experto en belleza. Recomienda productos del catálogo. ${cartContext}`,
                    },
                });
                setChat(newChat);
            } catch (e) {
                console.error("Error al iniciar IA:", e);
                setError("El asistente está descansando un momento. Inténtalo de nuevo más tarde.");
            }
        };

        initAI();
    }, [cartItems]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isProcessing]);

    const handleSendMessage = async (messageText: string) => {
        if (!messageText.trim() || isProcessing) return;

        // Añadir mensaje del usuario
        const userMessage: Message = { role: 'user', text: messageText };
        setMessages(prev => [...prev, userMessage, { role: 'model', text: '' }]);
        setInput('');
        setIsProcessing(true);
        setError(null);

        try {
            if (!chat) throw new Error("Chat no inicializado");

            const responseStream = await chat.sendMessageStream({ message: messageText });

            for await (const chunk of responseStream) {
                const chunkText = chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    lastMessage.text += chunkText;
                    return newMessages;
                });
            }
        } catch (e) {
            console.error("Error al enviar mensaje:", e);
            setMessages(prev => {
                const newMessages = [...prev];
                // Si falló, mostramos un mensaje genérico amable en el chat en lugar de un error rojo feo
                const lastMessage = newMessages[newMessages.length - 1];
                lastMessage.text = "Lo siento, estoy teniendo problemas para conectar con el servidor de belleza. ¿Podrías repetirlo?";
                return newMessages;
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(input);
    };

    const suggestions = [
        "¿Qué perfume me recomiendas para la noche?",
        "Busco una rutina para piel seca",
        "Ideas de regalo para mujer",
        "Diferencia entre Giordani Gold y The ONE"
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-black mb-2">Asistente de Belleza IA</h1>
                <p className="text-gray-600">Pregúntame sobre productos, rutinas o consejos de estilo.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col h-[600px]">
                {/* Chat Area */}
                <div ref={chatContainerRef} className="flex-grow p-6 overflow-y-auto space-y-6">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-80">
                            <div className="bg-fuchsia-100 p-4 rounded-full">
                                <SparklesIcon />
                            </div>
                            <p className="text-lg font-medium text-gray-700">¡Hola! Soy tu experto personal. ¿En qué puedo ayudarte?</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-lg">
                                {suggestions.map(s => (
                                    <button 
                                        key={s} 
                                        onClick={() => handleSendMessage(s)}
                                        className="text-sm bg-gray-50 hover:bg-fuchsia-50 border border-gray-200 p-3 rounded-xl transition-colors text-left text-gray-700"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'model' && (
                                <div className="w-8 h-8 rounded-full bg-fuchsia-100 flex items-center justify-center flex-shrink-0">
                                    <SparklesIcon />
                                </div>
                            )}
                            <div className={`max-w-[80%] p-4 rounded-2xl ${
                                msg.role === 'user' 
                                ? 'bg-black text-white rounded-tr-none' 
                                : 'bg-gray-100 text-gray-800 rounded-tl-none'
                            }`}>
                                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                            </div>
                            {msg.role === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                    <UserIcon />
                                </div>
                            )}
                        </div>
                    ))}
                    
                    {isProcessing && messages[messages.length - 1]?.text === '' && (
                        <div className="flex items-center gap-2 text-gray-400 ml-12">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                    <form onSubmit={handleFormSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Escribe tu consulta aquí..."
                            className="flex-grow px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent bg-white"
                            disabled={isProcessing}
                        />
                        <button 
                            type="submit"
                            disabled={!input.trim() || isProcessing}
                            className="bg-[var(--color-primary-solid)] text-white px-6 py-3 rounded-xl font-bold hover:bg-fuchsia-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AsistenteIAPage;