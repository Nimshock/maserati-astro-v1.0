import { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products'; // Asegúrate de que esta ruta es correcta

export default function ProductGrid() {
    // 1. Estado para saber qué filtro está activo (por defecto 'Todos')
    const [activeCategory, setActiveCategory] = useState('Todos');

    // 2. Definimos las categorías disponibles (Deben coincidir con tu data/products.js)
    // Nota: En tu imagen pone "Modelismo", en los datos pusimos "Coleccionismo". 
    // He puesto ambas opciones para que no falle.
    const categories = ['Todos', 'Ropa', 'Accesorios', 'Relojes', 'Coleccionismo', 'Equipaje'];

    // 3. Filtramos los productos
    const filteredProducts = activeCategory === 'Todos' 
        ? products 
        : products.filter(product => product.category === activeCategory);

    return (
        <div>
            {/* --- BOTONES DE FILTRO --- */}
            <div className="flex justify-center gap-8 mb-12 text-sm uppercase tracking-widest overflow-x-auto pb-4">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`transition-all duration-300 font-bold pb-1 border-b-2 ${
                            activeCategory === cat 
                                ? 'text-maserati-cian border-maserati-cian'   // Estilo Activo (Azul Cian)
                                : 'text-maserati-plata border-transparent hover:text-white' // Estilo Inactivo
                        }`}
                    >
                        {cat === 'Coleccionismo' ? 'Modelismo' : cat} {/* Pequeño truco para mostrar Modelismo en pantalla pero usar Coleccionismo en lógica */}
                    </button>
                ))}
            </div>

            {/* --- REJILLA DE RESULTADOS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="animate-fade-in-up"> {/* Animación suave al filtrar */}
                            <ProductCard 
                                id={product.id}
                                title={product.title}
                                category={product.category}
                                price={product.price}
                                image={product.image}
                                description={product.description}
                            />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20">
                        <p className="text-maserati-plata text-lg">No hay productos en esta categoría por ahora.</p>
                    </div>
                )}
            </div>
            
            {/* Estilo inline para la animación simple */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
}