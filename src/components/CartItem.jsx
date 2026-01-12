import { 
    addItemToCart,
    removeOneFromCart, 
    deleteItemFromCart, 
    MAX_QUANTITY_PER_ITEM } from '../stores/cartStores';

export default function CartItem({ item }) {
    
    const handleDelete = () => {
        if (window.confirm(`¿Quieres eliminar "${item.title}" del carrito?`)) {
            deleteItemFromCart(item.id);
        }
    };

    return (
        <div className="flex gap-4 items-center bg-white/5 p-4 rounded-lg border border-white/5 transition-colors hover:bg-white/10 group">
            
            <div className="w-20 h-20 rounded-md overflow-hidden shrink-0 relative bg-white border border-white/10">
                <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-contain p-1" 
                />
            </div>
            
            <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-sm leading-tight mb-1 truncate pr-2">{item.title}</h3>
                <p className="text-maserati-amber text-sm font-bold">€ {item.price.toLocaleString()}</p>
                {item.category && (
                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{item.category}</p>
                )}
            </div>


            <div className="flex flex-col items-end gap-3">
                
                <button 
                    onClick={handleDelete}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-500/10 p-2 rounded transition-all duration-300"
                    aria-label="Eliminar producto"
                    title="Eliminar del carrito"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>


                <div className="flex items-center gap-3 bg-black/40 rounded px-2 py-1 border border-white/10">
                    <button 
                        onClick={() => removeOneFromCart(item.id)}
                        className="text-gray-400 hover:text-white transition-colors w-6 h-6 flex items-center justify-center active:scale-90 text-lg"
                        aria-label="Disminuir cantidad"
                    >-</button>
                    
                    <span className="text-white text-xs w-4 text-center font-bold font-mono">{item.quantity}</span>
                    
                    <button 
                        onClick={() => addItemToCart(item)}
                        className={`w-6 h-6 flex items-center justify-center transition-colors active:scale-90 text-lg ${
                            item.quantity >= MAX_QUANTITY_PER_ITEM 
                                ? 'text-gray-700 cursor-not-allowed' 
                                : 'text-gray-400 hover:text-white'
                        }`}
                        disabled={item.quantity >= MAX_QUANTITY_PER_ITEM}
                        aria-label="Aumentar cantidad"
                    >+</button>
                </div>
            </div>
        </div>
    );
}