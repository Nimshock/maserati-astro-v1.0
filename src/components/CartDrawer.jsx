import { useStore } from '@nanostores/react';
import { 
    isCartOpen, 
    cartItems, 
    toggleCart, 
    addItemToCart, 
    removeOneFromCart, 
    deleteItemFromCart, 
    MAX_QUANTITY_PER_ITEM 
} from '../stores/cartStores';
import { useEffect, useRef } from 'react';

export default function CartDrawer() {
    const $isCartOpen = useStore(isCartOpen);
    const $cartItems = useStore(cartItems);
    const cartRef = useRef(null);


    const total = $cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    useEffect(() => {
        function handleClickOutside(event) {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                toggleCart(false);
            }
        }
        if ($isCartOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [$isCartOpen]);

    return (
        <div className={`fixed inset-0 z-9999 transition-opacity duration-300 ${$isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>

            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>


            <div 
                ref={cartRef}
                className={`absolute top-0 right-0 h-full w-full max-w-md bg-maserati-negro border-l border-white/10 shadow-2xl transform transition-transform duration-300 flex flex-col ${$isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >

                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-maserati-gris/10">
                    <h2 className="text-xl font-bold text-white uppercase tracking-widest">
                        Tu Cesta <span className="text-maserati-amber">({$cartItems.length})</span>
                    </h2>
                    <button onClick={() => toggleCart(false)} className="text-gray-400 hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>


                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {$cartItems.length === 0 ? (
                        <div className="text-center py-20 opacity-50">
                            <svg className="w-16 h-16 mx-auto mb-4 text-maserati-plata" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <p className="text-maserati-plata">Tu cesta está vacía</p>
                            <button onClick={() => toggleCart(false)} className="mt-4 text-maserati-cian hover:underline text-sm font-bold">
                                Volver a la tienda
                            </button>
                        </div>
                    ) : (
                        $cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center bg-white/5 p-4 rounded-lg border border-white/5">
    
                                <div className="w-20 h-20 rounded-md overflow-hidden shrink-0 relative">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                </div>
                                

                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-sm leading-tight mb-1">{item.title}</h3>
                                    <p className="text-maserati-amber text-sm font-bold">€ {item.price.toLocaleString()}</p>
                                    {item.category && <p className="text-xs text-gray-500 mt-1 capitalize">{item.category}</p>}
                                </div>


                                <div className="flex flex-col items-end gap-3">

                                    <button 
                                        onClick={() => deleteItemFromCart(item.id)}
                                        className="text-gray-500 hover:text-red-500 transition-colors p-1"
                                        title="Eliminar producto"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>


                                    <div className="flex items-center gap-3 bg-black/40 rounded px-2 py-1 border border-white/10">
                                        <button 
                                            onClick={() => removeOneFromCart(item.id)}
                                            className="text-gray-400 hover:text-white transition-colors w-4 text-center"
                                        >-</button>
                                        <span className="text-white text-xs w-4 text-center font-bold">{item.quantity}</span>
                                        <button 
                                            onClick={() => addItemToCart(item)}
                                            className={`w-4 text-center transition-colors ${item.quantity >= MAX_QUANTITY_PER_ITEM ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:text-white'}`}
                                            disabled={item.quantity >= MAX_QUANTITY_PER_ITEM}
                                        >+</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>


                {$cartItems.length > 0 && (
                    <div className="p-6 bg-maserati-gris/10 border-t border-white/10">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-maserati-plata uppercase text-sm tracking-wider">Total estimado</span>
                            <span className="text-2xl font-bold text-white">€ {total.toLocaleString()}</span>
                        </div>
                        <button className="w-full bg-maserati-azul text-white font-bold py-4 rounded uppercase tracking-widest hover:bg-maserati-cian transition-colors shadow-lg shadow-maserati-azul/20">
                            Tramitar Pedido
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}