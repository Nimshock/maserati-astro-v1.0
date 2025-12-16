import { atom } from 'nanostores';

export const MAX_QUANTITY_PER_ITEM = 5;


export const isCartOpen = atom(false);
export const cartItems = atom([]); 


export function toggleCart(isOpen) {
    if (isOpen === undefined) {
        isCartOpen.set(!isCartOpen.get());
    } else {
        isCartOpen.set(isOpen);
    }
}


export function addItemToCart(item) {
    const currentItems = cartItems.get();
    const existingItem = currentItems.find((i) => i.id === item.id);

    if (existingItem) {

        if (existingItem.quantity >= MAX_QUANTITY_PER_ITEM) {
            alert(`¡Lo sentimos! Solo puedes comprar un máximo de ${MAX_QUANTITY_PER_ITEM} unidades por producto.`);
            return;
        }

        const updatedItems = currentItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
        cartItems.set(updatedItems);
    } else {

        cartItems.set([...currentItems, { ...item, quantity: 1 }]);
        isCartOpen.set(true); 
    }
    
    saveToLocalStorage();
}

export function removeOneFromCart(itemId) {
    const currentItems = cartItems.get();
    const existingItem = currentItems.find((i) => i.id === itemId);

    if (existingItem && existingItem.quantity > 1) {
        const updatedItems = currentItems.map((i) =>
            i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
        cartItems.set(updatedItems);
        saveToLocalStorage();
    } else {

        deleteItemFromCart(itemId);
    }
}

export function deleteItemFromCart(itemId) {
    const currentItems = cartItems.get();
    const updatedItems = currentItems.filter((i) => i.id !== itemId);
    cartItems.set(updatedItems);
    saveToLocalStorage();
}



function saveToLocalStorage() {

    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('maserati_cart', JSON.stringify(cartItems.get()));
    }
}

export function loadFromLocalStorage() {
    if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('maserati_cart');
        if (stored) {
            try {
                cartItems.set(JSON.parse(stored));
            } catch (e) {
                console.error("Error cargando el carrito", e);
            }
        }
    }
}