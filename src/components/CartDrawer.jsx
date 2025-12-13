// src/components/CartDrawer.jsx
import { useStore } from '@nanostores/react';
import { isCartOpen, cartItems, removeFromCart, addToCart } from '../stores/cartStores';
import { useEffect } from 'react';
import { loadFromLocalStorage } from '../stores/cartStores';

export default function CartDrawer() {
    // "Escuchamos" los cambios en la tienda
    const $isCartOpen = useStore(isCartOpen);
    const $cartItems = useStore(cartItems);

    // Cargar datos guardados al entrar en la web
    useEffect(() => {
        loadFromLocalStorage();
    }, []);

    // Calcular Totales
    const items = Object.values($cartItems);
    const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <>
            <div 
                className={`fixed inset-0 bg-black/80 z-60 transition-opacity duration-300 ${$isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => isCartOpen.set(false)} 
            />

            {/* EL PANEL DESLIZANTE */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-maserati-negro border-l border-maserati-gris shadow-2xl z-70 transform transition-transform duration-300 ease-in-out ${$isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                
                {/* CABECERA */}
                <div className="flex items-center justify-between p-6 border-b border-maserati-gris">
                    <h2 className="text-white text-xl font-bold uppercase tracking-widest">
                        Tu Garaje <span className="text-maserati-cian">({totalQty})</span>
                    </h2>
                    <button onClick={() => isCartOpen.set(false)} className="text-maserati-plata hover:text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {/* LISTA DE ENTRADAS */}
                <div className="p-6 overflow-y-auto h-[calc(100%-200px)] space-y-6">
                    {items.length === 0 ? (
                        <div className="text-center text-maserati-plata mt-10">
                            <p>No tienes reservas activas.</p>
                            <p className="text-sm mt-2">Explora nuestros eventos exclusivos.</p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center bg-maserati-gris/30 p-4 rounded border border-white/5">
                                {/* Foto miniatura */}
                                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                                
                                <div className="grow">
                                    <h4 className="text-white font-bold text-sm leading-tight">{item.title}</h4>
                                    <p className="text-maserati-cian text-sm mt-1 font-bold">{item.price}€</p>
                                </div>

                                {/* Control Cantidad */}
                                <div className="flex flex-col items-center gap-1 bg-maserati-negro p-1 rounded border border-white/10">
                                    <button onClick={() => addToCart(item)} className="text-white hover:text-maserati-cian p-1 text-xs">+</button>
                                    <span className="text-white text-xs font-bold">{item.quantity}</span>
                                    <button onClick={() => removeFromCart(item.id)} className="text-maserati-plata hover:text-red-400 p-1 text-xs">-</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* RESUMEN FINAL (Footer del Drawer) */}
                <div className="absolute bottom-0 w-full bg-maserati-gris p-6 border-t border-white/10">
                    <div className="flex justify-between items-center mb-4 text-white">
                        <span className="uppercase tracking-widest text-sm text-maserati-plata">Total Estimado</span>
                        <span className="text-2xl font-bold">{totalPrice}€</span>
                    </div>
                    <button className="w-full bg-maserati-azul text-white py-3 font-bold uppercase tracking-widest hover:bg-maserati-cian transition-colors shadow-lg">
                        Confirmar Reserva
                    </button>
                </div>

            </div>
        </>
    );
}