import { atom, map } from 'nanostores';

// 1. Estado de si el carrito está abierto o cerrado
export const isCartOpen = atom(false);

// 2. El contenido del carrito (Mapa de productos)
// Guardamos: { 'id-producto': { ...datos, quantity: 1 } }
export const cartItems = map({});

// 3. Función para añadir producto (Desde EventCard)
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
  
  // Guardar en LocalStorage 
  saveToLocalStorage();
  // Abrir el carrito automáticamente para feedback visual
  isCartOpen.set(true);
}

// 4. Función para quitar producto
export function removeFromCart(itemId) {
    const existingEntry = cartItems.get()[itemId];
    if(existingEntry && existingEntry.quantity > 1) {
        cartItems.setKey(itemId, {
            ...existingEntry,
            quantity: existingEntry.quantity - 1
        });
    } else {
        cartItems.setKey(itemId, undefined); // Lo borra del mapa
    }
    saveToLocalStorage();
}

// 5. Persistencia (LocalStorage)
function saveToLocalStorage() {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('maserati_cart', JSON.stringify(cartItems.get()));
    }
}

// 6. Cargar al inicio (Para recuperar datos si recarga la página)
export function loadFromLocalStorage() {
    if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('maserati_cart');
        if (stored) {
            cartItems.set(JSON.parse(stored));
        }
    }
}