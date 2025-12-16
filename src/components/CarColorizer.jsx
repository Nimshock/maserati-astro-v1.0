import { useState, useRef, useEffect } from 'react';

export default function CarColorizer({ colors = [], sketchImage = '' }) {
    if (!colors.length) return null;

    const [activeColorIdx, setActiveColorIdx] = useState(0);
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const isDrawing = useRef(false);
    const lastPos = useRef({ x: 0, y: 0 });

    const activeColor = colors[activeColorIdx];

    const initCanvas = () => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const rect = container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        canvas.width = rect.width;
        canvas.height = rect.height;
        
        const ctx = canvas.getContext('2d');
        
        // 1. LLENAR DE BLANCO (Tapar el color)
        ctx.fillStyle = '#FFFFFF'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 2. CONFIGURAR EL "BORRADOR"
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 60; 
        ctx.globalCompositeOperation = "destination-out"; 
        ctx.filter = 'blur(15px)';
    };

    useEffect(() => {
        const timer = setTimeout(initCanvas, 100);
        window.addEventListener('resize', initCanvas);
        return () => {
            window.removeEventListener('resize', initCanvas);
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        setTimeout(initCanvas, 10);
    }, [activeColorIdx]);

    const getPos = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        if (e.type.includes('touch')) {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
            };
        }
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const startDrawing = (e) => {
        isDrawing.current = true;
        lastPos.current = getPos(e);
        draw(e);
    };

    const stopDrawing = () => {
        isDrawing.current = false;
    };

    const draw = (e) => {
        if (!isDrawing.current) return;
        
        const ctx = canvasRef.current.getContext('2d');
        const { x, y } = getPos(e);

        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();

        lastPos.current = { x, y };
    };

    return (
        <div className="w-full min-h-full bg-white flex flex-col items-center py-8 px-4 select-none">
            
            {/* SELECTOR DE COLOR */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 z-30 relative">
                {colors.map((color, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveColorIdx(index)}
                        className="group flex flex-col items-center gap-2"
                    >
                        <div 
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-200 shadow-sm transition-transform duration-300
                            ${index === activeColorIdx ? 'scale-125 ring-2 ring-offset-2 ring-maserati-negro' : 'group-hover:scale-110'}`}
                            style={{ backgroundColor: color.hex }}
                        ></div>
                        <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${index === activeColorIdx ? 'text-black' : 'text-gray-400'}`}>
                            {color.name}
                        </span>
                    </button>
                ))}
            </div>

            {/* ZONA DE PINTURA */}
            <div 
                ref={containerRef}
                className="relative w-full max-w-5xl aspect-[16/9] shadow-inner rounded-xl overflow-hidden bg-white border border-gray-100"
                style={{ touchAction: 'none' }}
                onMouseDown={startDrawing} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} onMouseMove={draw}
                onTouchStart={startDrawing} onTouchEnd={stopDrawing} onTouchMove={draw}
            >
                {/* CAPA 1: FOTO COLOR (FONDO) */}
                <div className="absolute inset-0 z-0 flex items-center justify-center">
                    <img 
                        src={activeColor.image} 
                        alt={activeColor.name}
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* CAPA 2: LIENZO BLANCO (MÁSCARA) */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 z-10 w-full h-full cursor-crosshair"
                />

                {/* CAPA 3: BOCETO (ARRIBA) - ¡AQUÍ ESTÁ EL TRUCO! */}
                <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                    <img 
                        src={sketchImage} 
                        alt="Boceto"
                        // mix-blend-multiply: Hace transparente lo blanco, sea JPG o PNG.
                        className="w-full h-full object-contain opacity-90 mix-blend-multiply"
                    />
                </div>
            </div>
            
            <div className="mt-6 text-center animate-pulse">
                <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest font-semibold">
                    Arrastra para pintar
                </p>
            </div>
        </div>
    );
}