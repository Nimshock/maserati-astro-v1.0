import { useStore } from '@nanostores/react';
import { isConfiguratorOpen, activeModelId, closeConfigurator } from '../stores/configuratorStore';
import { carsData } from '../data/cars';
import CarColorizer from './CarColorizer';

export default function GlobalConfigurator() {
    const $isOpen = useStore(isConfiguratorOpen);
    const $modelId = useStore(activeModelId);

    const currentCar = $modelId ? carsData[$modelId] : null;

    return (
        <div className={`fixed inset-0 z-10000 flex items-center justify-center p-4 transition-all duration-300 ${$isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
            
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={closeConfigurator}></div>

            <div className={`relative w-full max-w-6xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[95vh] h-auto transition-transform duration-300 ${$isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'}`}>
                

                {currentCar && (
                    <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-100 bg-white z-50 shrink-0">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-maserati-negro uppercase">{currentCar.name}</h2>
                            <p className="text-[10px] md:text-xs text-gray-500 tracking-widest uppercase">{currentCar.tagline}</p>
                        </div>
                        <button onClick={closeConfigurator} className="p-2 hover:bg-gray-100 rounded-full transition-colors group cursor-pointer">
                            <svg className="w-6 h-6 text-gray-500 group-hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto bg-gray-50 relative">
                    {currentCar && (
                        <CarColorizer 
                            colors={currentCar.colors}
                            sketchImage={currentCar.sketchImage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}