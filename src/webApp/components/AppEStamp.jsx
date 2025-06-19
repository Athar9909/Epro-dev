import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, PenTool, Upload, Stamp } from 'lucide-react';

export default function AppESignatureComponent() {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas size
        canvas.width = 300;
        canvas.height = 200;

        // Set drawing styles
        ctx.strokeStyle = '#272727';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Draw sample signature
        drawSampleSignature(ctx);
        setHasSignature(true);
    }, []);

    const drawSampleSignature = (ctx) => {
        ctx.beginPath();

        // Draw "John Doe" signature style
        // J
        ctx.moveTo(50, 120);
        ctx.quadraticCurveTo(45, 100, 55, 80);
        ctx.quadraticCurveTo(65, 90, 60, 110);
        ctx.stroke();

        // o
        ctx.beginPath();
        ctx.moveTo(75, 100);
        ctx.quadraticCurveTo(85, 95, 90, 105);
        ctx.quadraticCurveTo(85, 115, 75, 110);
        ctx.quadraticCurveTo(70, 105, 75, 100);
        ctx.stroke();

        // h
        ctx.beginPath();
        ctx.moveTo(100, 80);
        ctx.lineTo(100, 120);
        ctx.moveTo(100, 100);
        ctx.quadraticCurveTo(110, 95, 115, 105);
        ctx.lineTo(115, 120);
        ctx.stroke();

        // n
        ctx.beginPath();
        ctx.moveTo(125, 105);
        ctx.lineTo(125, 120);
        ctx.moveTo(125, 105);
        ctx.quadraticCurveTo(135, 100, 140, 110);
        ctx.lineTo(140, 120);
        ctx.stroke();

        // Space and flourish
        ctx.beginPath();
        ctx.moveTo(155, 110);
        ctx.quadraticCurveTo(180, 95, 220, 105);
        ctx.quadraticCurveTo(240, 110, 250, 100);
        ctx.quadraticCurveTo(255, 95, 250, 105);
        ctx.quadraticCurveTo(245, 115, 250, 120);
        ctx.stroke();
    };

    const startDrawing = (e) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const draw = (e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ctx = canvas.getContext('2d');
        ctx.lineTo(x, y);
        ctx.stroke();
        setHasSignature(true);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasSignature(false);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white min-h-screen">
            {/* Header */}
            <div className="flex items-center px-4 py-4 border-b" style={{ borderColor: '#e5e5e5' }}>
                <ChevronLeft className="w-6 h-6" style={{ color: '#272727' }} />
                <h1 className="ml-4 text-lg font-semibold" style={{ color: '#272727' }}>Add E-Signature/Stamp</h1>
            </div>

            <div className="p-6 space-y-6">
                {/* Draw Signature Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-1 mb-4">
                        <img src="/resourcesApp/iconsApp/pen.svg" alt="pdf-icon" className="w-4 h-4" />
                        <h2 className="text-lg font-medium" style={{ color: '#272727' }}>Draw Signature</h2>
                    </div>

                    {/* Canvas Area */}
                    <div className="border-2 border-dashed rounded-lg p-4" style={{ borderColor: '#e5e5e5' }}>
                        <canvas
                            ref={canvasRef}
                            className="w-full h-48 border rounded cursor-crosshair"
                            style={{ borderColor: '#e5e5e5' }}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                        />

                        {/* Clear button */}
                        {hasSignature && (
                            <div className="mt-3 text-center">
                                <button
                                    onClick={clearCanvas}
                                    className="text-sm px-4 py-2 rounded border"
                                    style={{
                                        borderColor: '#e5e5e5',
                                        color: '#A8A8A8'
                                    }}
                                >
                                    Clear
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Upload Options */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Upload Signature */}
                    <div className="text-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors flex justify-center items-center flex-col gap-2" style={{ borderColor: '#e5e5e5' }}>
                        <img src="/resourcesApp/iconsApp/uploadSign.svg" alt="pdf-icon" className="w-12 h-12" />
                        <p className="text-sm font-medium" style={{ color: '#272727' }}>Upload Signature</p>
                    </div>

                    {/* Upload Stamp */}
                    <div className="text-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors flex justify-center items-center flex-col gap-2" style={{ borderColor: '#e5e5e5' }}>
                        <img src="/resourcesApp/iconsApp/uploadStamp.svg" alt="pdf-icon" className="w-12 h-12" />
                        <p className="text-sm font-medium" style={{ color: '#272727' }}>Upload Stamp</p>
                    </div>
                </div>

                {/* Continue Button */}
                <div className="fixed bottom-4 right-0 left-0 w-[95vw] mx-auto pt-6">
                    <button
                        className="w-full py-4 px-6 rounded-lg text-white font-semibold text-lg"
                        style={{ backgroundColor: '#009eb4' }}
                        disabled={!hasSignature}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}