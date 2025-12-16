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
        if (!canvas || !container) return false; 

        const rect = container.getBoundingClientRect();

        if (rect.width === 0 || rect.height === 0) return false;


        canvas.width = rect.width;
        canvas.height = rect.height;
        
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#FFFFFF'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.globalCompositeOperation = "destination-out"; 
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 100; 
        ctx.filter = 'blur(40px)'; 
        
        return true; 
    };


    useEffect(() => {

        const interval = setInterval(() => {
            const success = initCanvas();
            if (success) clearInterval(interval); 
        }, 100);


        const timeout = setTimeout(() => clearInterval(interval), 2000);

        const handleResize = () => initCanvas();
        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(() => {

        setTimeout(initCanvas, 50);
    }, [activeColorIdx]);


    const getPos = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        
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
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const { x, y } = getPos(e);

        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();

        lastPos.current = { x, y };
    };

    return (
        <div className="w-full min-h-full bg-white flex flex-col items-center py-8 px-4 select-none">
            

            <div className="flex flex-wrap justify-center gap-6 mb-8 z-30 relative w-full">
                {colors.map((color, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveColorIdx(index)}
                        className="group flex flex-col items-center gap-2 cursor-pointer"
                    >
                        <div 
                            className={`w-8 h-8 md:w-12 md:h-12 rounded-full border border-gray-200 shadow-sm transition-transform duration-300
                            ${index === activeColorIdx ? 'scale-125 ring-2 ring-offset-2 ring-maserati-negro' : 'group-hover:scale-110'}`}
                            style={{ backgroundColor: color.hex }}
                        ></div>
                        <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${index === activeColorIdx ? 'text-black' : 'text-gray-400'}`}>
                            {color.name}
                        </span>
                    </button>
                ))}
            </div>


            <div 
                ref={containerRef}
                className="relative w-full max-w-6xl aspect-video shadow-inner rounded-xl overflow-hidden bg-white"
                style={{ touchAction: 'none' }} 
                onMouseDown={startDrawing} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} onMouseMove={draw}
                onTouchStart={startDrawing} onTouchEnd={stopDrawing} onTouchMove={draw}
            >

                <div className="absolute inset-0 z-0 flex items-center justify-center">
                    <img 
                        src={activeColor.image} 
                        alt={activeColor.name}
                        className="w-full h-full object-contain"
                    />
                </div>


                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 z-10 w-full h-full cursor-crosshair"
                />


                <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                    <img 
                        src={sketchImage} 
                        alt="Boceto"
                        className="w-full h-full object-contain opacity-100 mix-blend-multiply pointer-events-none"
                    />
                </div>
            </div>
            
            <div className="mt-8 text-center animate-pulse">
                <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest font-bold">
                    Arrastra el cursor para pintar
                </p>
            </div>
        </div>
    );
}