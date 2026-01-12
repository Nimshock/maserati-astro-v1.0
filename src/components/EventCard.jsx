import { useState } from 'react';
import { useCartAction } from '../hooks/useCartAction';

export default function EventCard({ id, title, date, location, image, price, initialStock, description }) {
    const [stock, setStock] = useState(initialStock);

    const { addToCart, isAdding, showSuccess } = useCartAction({
        id,
        title,
        price,
        image,
        category: 'Evento'
    });

    const isSoldOut = stock === 0;
    const isLowStock = stock > 0 && stock <= 5; 

    const handleBuy = () => {
        
        if (stock > 0 && !isAdding) {
            
            setStock(prev => Math.max(0, prev - 1));
            
            addToCart();
        }
    };

    return (
        <div className={`group relative flex flex-col h-full border rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] 
            ${isSoldOut 
                ? 'bg-maserati-gris/20 border-white/5 opacity-70 grayscale' 
                : 'bg-maserati-gris/40 border-white/10 hover:border-maserati-azul/50' 
            }`}
        >
            
            <div className="relative h-64 overflow-hidden">
                <img 
                    src={image} 
                    alt={title} 
                    className={`w-full h-full object-cover transition-transform duration-700 
                    ${isSoldOut ? 'scale-100' : 'group-hover:scale-110'}`} 
                />
                
                <div className="absolute inset-0 bg-linear-to-t from-maserati-negro/80 via-transparent to-transparent"></div>

                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                    {isSoldOut ? (
                        <span className="bg-red-600/90 text-white text-[10px] font-bold px-3 py-1 rounded backdrop-blur-md uppercase tracking-widest shadow-lg">
                            Agotado
                        </span>
                    ) : isLowStock ? (
                        <span className="bg-maserati-amber text-black text-[10px] font-bold px-3 py-1 rounded backdrop-blur-md uppercase tracking-widest shadow-lg animate-pulse">
                            ¡Últimas {stock} plazas!
                        </span>
                    ) : (
                        <span className="bg-maserati-negro/60 text-white text-[10px] font-bold px-3 py-1 rounded backdrop-blur-md border border-white/10">
                            {stock} plazas disponibles
                        </span>
                    )}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-4">
                    <span className="bg-maserati-azul/20 text-maserati-cian px-2 py-1 rounded text-xs font-bold uppercase tracking-widest border border-maserati-azul/20">
                        {date}
                    </span>
                    <span className="text-maserati-plata text-xs flex items-center gap-1 truncate">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {location}
                    </span>
                </div>

                <h3 className={`text-2xl font-bold text-white mb-3 leading-tight transition-colors ${!isSoldOut && 'group-hover:text-maserati-cian'}`}>
                    {title}
                </h3>
                
                <p className="text-maserati-plata text-sm leading-relaxed mb-6 line-clamp-2">
                    {description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex flex-col">
                        <span className={`font-bold text-xl ${isSoldOut ? 'text-gray-500' : 'text-white'}`}>
                            {price}€
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-maserati-plata opacity-60">Por persona</span>
                    </div>

                    <button
                        onClick={handleBuy}
                        disabled={isSoldOut || isAdding || showSuccess}
                        className={`
                            relative overflow-hidden px-6 py-2 rounded text-xs font-bold uppercase tracking-widest transition-all duration-300 min-w-[120px]
                            ${isSoldOut 
                                ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5' 
                                : showSuccess
                                    ? 'bg-green-600 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)] scale-105 border border-transparent'
                                    : 'bg-maserati-azul text-white hover:bg-maserati-cian hover:shadow-[0_0_15px_rgba(69,162,158,0.4)] active:scale-95'
                            }
                        `}
                    >

                        <div className="flex items-center justify-center gap-2">
                            {isAdding ? (
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : showSuccess ? (
                                <>
                                    <span>Añadido</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                </>
                            ) : isSoldOut ? (
                                'Agotado'
                            ) : (
                                'Reservar'
                            )}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}