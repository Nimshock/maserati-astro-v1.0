import { useState } from 'react';
import { useScratchCanvas } from '../hooks/useScratchCanvas'; 

export default function CarColorizer({ colors = [], sketchImage = '' }) {
    if (!colors.length) return null;

    const [activeColorIdx, setActiveColorIdx] = useState(0);
    const activeColor = colors[activeColorIdx];


    const { canvasRef, containerRef, eventHandlers } = useScratchCanvas(activeColorIdx);

    return (
        <div className="w-full min-h-full bg-white flex flex-col items-center py-8 px-4 select-none">
            

            <div className="flex flex-wrap justify-center gap-6 mb-8 z-30 relative w-full">
                {colors.map((color, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveColorIdx(index)}
                        aria-label={`Seleccionar color ${color.name}`}
                        className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
                    >
                        <div 
                            className={`w-8 h-8 md:w-12 md:h-12 rounded-full border border-gray-200 shadow-sm transition-transform duration-300
                            ${index === activeColorIdx ? 'scale-125 ring-2 ring-offset-2 ring-maserati-negro' : 'group-hover:scale-110'}`}
                            style={{ backgroundColor: color.hex }}
                        ></div>
                        <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors ${index === activeColorIdx ? 'text-black' : 'text-gray-400'}`}>
                            {color.name}
                        </span>
                    </button>
                ))}
            </div>


            <div 
                ref={containerRef}
                className="relative w-full max-w-6xl aspect-video shadow-inner rounded-xl overflow-hidden bg-white border border-gray-100 touch-none" 
                {...eventHandlers} 
            >


                <div className="absolute inset-0 z-0 flex items-center justify-center">
                    <img 
                        src={activeColor.image} 
                        alt={activeColor.name}
                        className="w-full h-full object-contain"
                        draggable="false"
                    />
                </div>


                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 z-10 w-full h-full cursor-crosshair"
                />

                <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                    <img 
                        src={sketchImage} 
                        alt="Boceto técnico"
                        className="w-full h-full object-contain opacity-40 mix-blend-multiply"
                        draggable="false"
                    />
                </div>
            </div>
            
            <div className="mt-8 text-center animate-pulse">
                <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest font-bold">
                    Arrastra el cursor para revelar
                </p>
            </div>
        </div>
    );
}