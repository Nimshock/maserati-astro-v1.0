import { useRef, useEffect } from 'react';

export function useScratchCanvas(dependencyToReset) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const isDrawing = useRef(false);
    const lastPos = useRef({ x: 0, y: 0 });


    const initCanvas = () => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const rect = container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        canvas.width = rect.width;
        canvas.height = rect.height;
        
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#FFFFFF'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        

        ctx.globalCompositeOperation = "destination-out"; 
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 80; 
        ctx.filter = 'blur(30px)'; 
    };


    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentRect.width > 0) {
                    initCanvas();
                }
            }
        });

        observer.observe(container);
        return () => observer.disconnect();
    }, []);


    useEffect(() => {
        const timer = setTimeout(() => {
            initCanvas();
        }, 50);
        return () => clearTimeout(timer);
    }, [dependencyToReset]);



    const getPos = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        
        const rect = canvas.getBoundingClientRect();

        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

        return {
            x: clientX - rect.left,
            y: clientY - rect.top
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
        if (!isDrawing.current || !canvasRef.current) return;
        
        if (e.type.includes('touch')) {

        }

        const ctx = canvasRef.current.getContext('2d');
        const { x, y } = getPos(e);

        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();

        lastPos.current = { x, y };
    };

    return {
        canvasRef,
        containerRef,
        eventHandlers: {
            onMouseDown: startDrawing,
            onMouseUp: stopDrawing,
            onMouseLeave: stopDrawing,
            onMouseMove: draw,
            onTouchStart: startDrawing,
            onTouchEnd: stopDrawing,
            onTouchMove: draw
        }
    };
}