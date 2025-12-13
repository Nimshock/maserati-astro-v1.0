import { addToCart } from '../stores/cartStores';

export default function ProductCard({ id, title, category, price, image, description }) {
    
    // Función que conecta con el carrito que ya creamos
    const handleAddToCart = () => {
        addToCart({
            id,
            title,
            price,
            image
        });
    };

    return (
        <div className="group bg-maserati-azul/20 border border-white/5 rounded-lg overflow-hidden hover:border-maserati-azul/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            
            {/* Imagen del Producto */}
            <div className="relative h-64 overflow-hidden bg-white">
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110" 
                />
                {/* Etiqueta de Categoría */}
                <span className="absolute top-3 left-3 bg-maserati-negro/80 text-white text-[10px] uppercase font-bold px-2 py-1 rounded backdrop-blur-sm">
                    {category}
                </span>
            </div>

            {/* Información */}
            <div className="p-6">
                <h3 className="text-white text-lg font-bold mb-1 group-hover:text-maserati-cian transition-colors">{title}</h3>
                <p className="text-maserati-plata text-sm mb-4 line-clamp-2 min-h-40px">{description}</p>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <span className="text-white font-bold text-xl">{price}€</span>
                    
                    <button 
                        onClick={handleAddToCart}
                        className="bg-maserati-azul text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-maserati-cian transition-all shadow-lg hover:shadow-maserati-azul/20 active:scale-95"
                    >
                        Añadir
                    </button>
                </div>
            </div>
        </div>
    );
}