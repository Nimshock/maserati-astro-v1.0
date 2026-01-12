import { useState } from 'react';
import { addItemToCart } from '../stores/cartStores';

export function useCartAction(item) {
    const [isAdding, setIsAdding] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const addToCart = () => {
        if (isAdding) return;
        setIsAdding(true);

        setTimeout(() => {
            addItemToCart(item);
            setIsAdding(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        }, 500);
    };

    return { addToCart, isAdding, showSuccess };
}