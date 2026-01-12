import { useState, useMemo } from 'react'; 
import ProductCard from './ProductCard';
import { products } from '../data/products';

export default function ProductGrid() {
    const [activeCategory, setActiveCategory] = useState('Todos');


    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(products.map(p => p.category))];
        return ['Todos', ...uniqueCategories];
    }, []);

    const filteredProducts = useMemo(() => {
        return activeCategory === 'Todos' 
            ? products 
            : products.filter(product => product.category === activeCategory);
    }, [activeCategory]);

    return (
        <div className="w-full">
            <div className="sticky top-20 z-30 bg-maserati-negro/95 backdrop-blur-sm py-4 mb-8 -mx-6 px-6 md:mx-0 md:px-0 md:static md:bg-transparent border-b border-white/5 md:border-none">
                <div className="flex gap-4 overflow-x-auto pb-2 md:justify-center md:flex-wrap no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`
                                whitespace-nowrap px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border
                                ${activeCategory === cat 
                                    ? 'bg-maserati-azul text-white border-maserati-azul shadow-[0_0_15px_rgba(31,64,104,0.5)] transform scale-105' 
                                    : 'bg-transparent text-maserati-plata border-white/10 hover:border-white/30 hover:text-white'}
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-10 min-h-[400px]">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <div 
                            key={product.id} 
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 50}ms` }} 
                        >
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
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center opacity-60">
                        <svg className="w-16 h-16 text-maserati-plata mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <p className="text-maserati-plata text-lg font-medium">No se encontraron productos en esta categoría.</p>
                        <button 
                            onClick={() => setActiveCategory('Todos')}
                            className="mt-4 text-maserati-cian hover:underline text-sm uppercase tracking-widest"
                        >
                            Ver todo el catálogo
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}