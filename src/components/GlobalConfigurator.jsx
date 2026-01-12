import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { isConfiguratorOpen, activeModelId, closeConfigurator } from '../stores/configuratorStore';
import { carsData } from '../data/cars';
import CarColorizer from './CarColorizer';
import { useScrollLock } from '../hooks/useScrollLock'; 

export default function GlobalConfigurator() {
    const $isOpen = useStore(isConfiguratorOpen);
    const $modelId = useStore(activeModelId);

    const currentCar = $modelId ? carsData[$modelId] : null;

    useScrollLock($isOpen);

    useEffect(() => {
        if ($isOpen) {
            const handleEsc = (e) => {
                if (e.key === 'Escape') closeConfigurator();
            };
            window.addEventListener('keydown', handleEsc);

            return () => {
                window.removeEventListener('keydown', handleEsc);
            };
        }
    }, [$isOpen]);
    
    return (
        <div 
            className={`fixed inset-0 z-10000 flex items-center justify-center p-4 transition-all duration-500
            ${$isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
            role="dialog"
            aria-modal="true"
        >
            <div 
                className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-500"
                onClick={closeConfigurator}
                aria-hidden="true"
            ></div>

            <div 
                className={`relative w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)
                ${$isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}
            >
                {currentCar && (
                    <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white z-50 shrink-0">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-maserati-negro uppercase tracking-tight">{currentCar.name}</h2>
                            <p className="text-xs text-maserati-plata tracking-[0.2em] uppercase font-bold mt-1">{currentCar.tagline}</p>
                        </div>
                        <button 
                            onClick={closeConfigurator} 
                            className="group p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-maserati-negro"
                            aria-label="Cerrar configurador"
                        >
                            <svg className="w-8 h-8 text-gray-400 group-hover:text-maserati-negro transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto bg-gray-50 relative custom-scrollbar">
                    {currentCar ? (
                        <CarColorizer 
                            colors={currentCar.colors}
                            sketchImage={currentCar.sketchImage}
                        />
                    ) : (

                        <div className="flex items-center justify-center h-64 text-gray-400 animate-pulse">
                            Cargando modelo...
                        </div>
                    )}
                </div>
                
                <div className="p-4 bg-white border-t border-gray-100 flex justify-end items-center gap-4 shrink-0">
                    <button 
                        onClick={closeConfigurator}
                        className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-maserati-azul transition-colors px-4 py-2"
                    >
                        Seguir mirando
                    </button>
                    <a 
                        href="/contacto" 
                        className="bg-maserati-negro text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-maserati-azul hover:shadow-lg transition-all transform active:scale-95"
                    >
                        Solicitar Presupuesto
                    </a>
                </div>
            </div>
        </div>
    );
}