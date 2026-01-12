import { useEffect, useRef, useMemo } from 'react';
import { useStore } from '@nanostores/react';
import { isCartOpen, cartItems, toggleCart } from '../stores/cartStores';
import CartItem from './CartItem';
import { useScrollLock } from '../hooks/useScrollLock'; 

export default function CartDrawer() {
    const $isCartOpen = useStore(isCartOpen);
    const $cartItems = useStore(cartItems);
    const cartRef = useRef(null);

    useScrollLock($isCartOpen);

    const total = useMemo(() => {
        return $cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [$cartItems]);

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
        <div 
            className={`fixed inset-0 z-50 transition-all duration-500 
            ${$isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible delay-300'}`}
        >

            <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${$isCartOpen ? 'opacity-100' : 'opacity-0'}`}></div>

            <div 
                ref={cartRef}
                className={`absolute top-0 right-0 h-full w-full max-w-md bg-maserati-negro border-l border-white/10 shadow-2xl flex flex-col transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) 
                ${$isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-maserati-gris/10">
                    <h2 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-2">
                        Tu Cesta 
                        <span className="bg-maserati-amber text-black text-xs px-2 py-0.5 rounded-full font-bold">
                            {$cartItems.length}
                        </span>
                    </h2>
                    <button 
                        onClick={() => toggleCart(false)} 
                        className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                        aria-label="Cerrar carrito"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {$cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                            <div className="bg-white/5 p-6 rounded-full">
                                <svg className="w-12 h-12 text-maserati-plata" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-maserati-plata text-lg">Tu cesta está vacía</p>
                                <p className="text-sm text-gray-500 mt-1">Descubre nuestra colección exclusiva</p>
                            </div>
                            <button 
                                onClick={() => toggleCart(false)} 
                                className="mt-4 text-maserati-cian hover:text-maserati-amber text-sm font-bold uppercase tracking-widest transition-colors"
                            >
                                Volver a la tienda
                            </button>
                        </div>
                    ) : (
                        $cartItems.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))
                    )}
                </div>


                {$cartItems.length > 0 && (
                    <div className="p-6 bg-maserati-gris/5 border-t border-white/10 space-y-4">
                        
                        <div className="space-y-2 pb-4 border-b border-white/5">
                            <div className="flex justify-between items-center text-maserati-plata text-sm">
                                <span>Subtotal</span>
                                <span>€ {total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-maserati-plata text-sm">
                                <span>Envío</span>
                                <span className="text-maserati-cian text-xs font-bold uppercase">Gratis</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end">
                            <span className="text-white uppercase text-sm tracking-wider font-bold">Total</span>
                            <span className="text-3xl font-bold text-white">€ {total.toLocaleString()}</span>
                        </div>
                        
                        <button className="w-full bg-maserati-azul text-white font-bold py-4 rounded uppercase tracking-widest hover:bg-maserati-cian transition-all shadow-lg hover:shadow-maserati-azul/20 active:scale-[0.99]">
                            Tramitar Pedido
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}