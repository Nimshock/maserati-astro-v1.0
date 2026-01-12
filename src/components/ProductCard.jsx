import { useCartAction } from '../hooks/useCartAction';

export default function ProductCard({ id, title, category, price, image, description }) {
    
    const { addToCart, isAdding, showSuccess } = useCartAction({
        id, title, category, price, image
    });
    return (
        <div className="group flex flex-col h-full bg-maserati-gris/10 border border-white/5 rounded-xl overflow-hidden hover:border-maserati-azul/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
            
            <div className="relative h-64 overflow-hidden bg-white flex items-center justify-center p-4">
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 will-change-transform" 
                    loading="lazy"
                />

                <span className="absolute top-4 left-4 bg-maserati-negro/90 text-white text-[10px] uppercase font-bold px-3 py-1 rounded backdrop-blur-md shadow-lg border border-white/10">
                    {category}
                </span>


                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none"></div>
            </div>


            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-white text-lg font-bold mb-2 leading-tight group-hover:text-maserati-cian transition-colors">
                    {title}
                </h3>
                
                <p className="text-maserati-plata text-sm mb-6 line-clamp-2 min-h-10 leading-relaxed opacity-80">
                    {description}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex flex-col">
                        <span className="text-white font-bold text-xl">
                            {price}€
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-maserati-plata opacity-50">IVA incluido</span>
                    </div>
                    
                    <button 
                        onClick={addToCart}
                        disabled={isAdding || showSuccess}
                        className={`
                            relative overflow-hidden px-6 py-2.5 rounded text-xs font-bold uppercase tracking-widest transition-all duration-300 min-w-[130px] shadow-lg
                            ${showSuccess 
                                ? 'bg-green-600 text-white shadow-green-500/20 scale-105' 
                                : 'bg-maserati-azul text-white hover:bg-maserati-cian hover:shadow-maserati-cian/30 active:scale-95'
                            }
                        `}
                        aria-label={showSuccess ? "Añadido al carrito" : "Añadir al carrito"}
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
                            ) : (

                                <span>Comprar</span>
                            )}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}