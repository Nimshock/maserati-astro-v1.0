import { useStore } from '@nanostores/react';
import { isCartOpen, cartItems, toggleCart } from '../stores/cartStores';

export default function CartFloatingButton() {
    const $isCartOpen = useStore(isCartOpen);
    const $cartItems = useStore(cartItems);

    const totalItems = $cartItems.reduce((acc, item) => acc + item.quantity, 0);

    if ($isCartOpen) return null;

    return (
        <button
            onClick={() => toggleCart(true)}
            className={`
                fixed z-40 flex items-center justify-center transition-all duration-300
                bg-maserati-azul text-white hover:bg-maserati-cian hover:scale-110 shadow-lg shadow-maserati-azul/40
                rounded-full w-14 h-14 border border-white/10
                bottom-24 right-6 md:bottom-10 md:right-10 /* Posición ajustada para no tapar el Scroll-to-top */
            `}
            aria-label="Ver carrito"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>

            {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm animate-bounce">
                    {totalItems}
                </span>
            )}
        </button>
    );
}