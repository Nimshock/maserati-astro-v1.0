import { atom, map } from 'nanostores';


export const isCartOpen = atom(false);


export const cartItems = map({});


export function addToCart(item) {
  const existingEntry = cartItems.get()[item.id];
  
  if (existingEntry) {
    cartItems.setKey(item.id, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    });
  } else {
    cartItems.setKey(item.id, {
      ...item,
      quantity: 1,
    });
  }
  
  
  saveToLocalStorage();
  
  isCartOpen.set(true);
}


export function removeFromCart(itemId) {
    const existingEntry = cartItems.get()[itemId];
    if(existingEntry && existingEntry.quantity > 1) {
        cartItems.setKey(itemId, {
            ...existingEntry,
            quantity: existingEntry.quantity - 1
        });
    } else {
        cartItems.setKey(itemId, undefined); 
    }
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
            cartItems.set(JSON.parse(stored));
        }
    }
}