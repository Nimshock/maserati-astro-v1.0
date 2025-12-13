import { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

export default function ProductGrid() {
    
    const [activeCategory, setActiveCategory] = useState('Todos');

    
    const categories = ['Todos', 'Ropa', 'Accesorios', 'Relojes', 'Coleccionismo', 'Equipaje'];

    const filteredProducts = activeCategory === 'Todos' 
        ? products 
        : products.filter(product => product.category === activeCategory);

    return (
        <div>
            
            <div className="flex gap-6 mb-12 text-sm uppercase tracking-widest overflow-x-auto pb-4 whitespace-nowrap snap-x touch-pan-x px-4 md:justify-center md:gap-8 md:px-0">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`transition-all duration-300 font-bold pb-1 border-b-2 ${
                            activeCategory === cat 
                                ? 'text-maserati-cian border-maserati-cian'   
                                : 'text-maserati-plata border-transparent hover:text-white' 
                        }`}
                    >
                        {cat === 'Coleccionismo' ? 'Modelismo' : cat} 
                    </button>
                ))}
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="animate-fade-in-up">
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