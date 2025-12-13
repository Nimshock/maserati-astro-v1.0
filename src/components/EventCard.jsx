import { useState } from 'react';
import { addToCart } from '../stores/cartStores'; // <--- IMPORTAMOS LA TIENDA

export default function EventCard({ id, title, date, location, image, price, initialStock, description }) {
    const [stock, setStock] = useState(initialStock);
    const [isAdding, setIsAdding] = useState(false);

    const handleBuy = () => {
        if (stock > 0) {
            setIsAdding(true);
            
            // Simular proceso
            setTimeout(() => {
                setStock(stock - 1);
                
                // --- AQUÍ GUARDAMOS EN EL CARRITO ---
                addToCart({
                    id,
                    title,
                    price,
                    image,
                });
                // ------------------------------------

                setIsAdding(false);
            }, 500);
        }
    };

    const isSoldOut = stock === 0;

    // ... (El resto de tu diseño visual se mantiene igual) ...
    return (
        <div className="group relative flex flex-col h-full bg-maserati-gris/40 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:border-maserati-azul/50">
            
            <div className="relative h-64 overflow-hidden">
                <img 
                    src={image} 
                    alt={title} 
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${isSoldOut ? 'grayscale opacity-60' : ''}`} 
                />
                <div className="absolute inset-0 bg-linear-to-t from-maserati-negro to-transparent opacity-60"></div>
                <div className="absolute top-4 right-4">
                    {isSoldOut ? (
                        <span className="bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-widest shadow-lg backdrop-blur-md">Agotado</span>
                    ) : (
                        <span className={`text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-widest shadow-lg backdrop-blur-md text-white ${stock < 5 ? 'bg-orange-500/90' : 'bg-maserati-azul/90'}`}>{stock < 5 ? 'Últimas Plazas' : 'Disponible'}</span>
                    )}
                </div>
            </div>

            <div className="flex flex-col grow p-6 relative">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-maserati-amber text-xs font-bold uppercase tracking-widest">{date}</span>
                    <span className="text-maserati-plata text-xs">{location}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-maserati-cian transition-colors">{title}</h3>
                <p className="text-maserati-plata text-sm leading-relaxed mb-6 line-clamp-2">{description}</p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex flex-col">
                        <span className="text-white font-bold text-xl">{price}€</span>
                        <span className="text-[10px] uppercase tracking-wider text-maserati-plata">Por persona</span>
                    </div>

                    <button
                        onClick={handleBuy}
                        disabled={isSoldOut || isAdding}
                        className={`relative overflow-hidden px-6 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all duration-300 ${isSoldOut ? 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5' : 'bg-maserati-azul text-white hover:bg-maserati-cian hover:shadow-[0_0_15px_rgba(69,162,158,0.4)]'}`}
                    >
                        {isAdding ? '...' : isSoldOut ? 'Completo' : 'Reservar'}
                    </button>
                </div>
            </div>
        </div>
    );
}