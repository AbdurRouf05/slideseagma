'use client';

import React, { useRef, useEffect } from 'react';

interface WavesProps {
  lineColor?: string;
  backgroundColor?: string;
  waveSpeedX?: number;
  waveSpeedY?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  friction?: number;
  tension?: number;
  maxCursorMove?: number;
  xGap?: number;
  yGap?: number;
}

const Waves: React.FC<WavesProps> = ({
  lineColor = 'rgba(16, 185, 129, 0.3)',
  backgroundColor = 'transparent',
  waveSpeedX = 0.0125,
  waveSpeedY = 0.005,
  waveAmpX = 32,
  waveAmpY = 16,
  friction = 0.9,
  tension = 0.01,
  maxCursorMove = 100,
  xGap = 10,
  yGap = 32,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, v: 0, vs: 0, a: 0, as: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number, height: number, points: { x: number, y: number, ox: number, oy: number, vx: number, vy: number }[][] = [], lines: number, nodes: number;

    const updateSize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      lines = Math.ceil(width / xGap) + 1;
      nodes = Math.ceil(height / yGap) + 1;
      points = [];
      for (let i = 0; i < lines; i++) {
        points[i] = [];
        for (let j = 0; j < nodes; j++) {
          points[i][j] = { x: i * xGap, y: j * yGap, ox: i * xGap, oy: j * yGap, vx: 0, vy: 0 };
        }
      }
    };

    const render = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      const mouse = mouseRef.current;
      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;

      const time = Date.now() * 0.001;

      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        for (let j = 0; j < nodes; j++) {
          const p = points[i][j];
          
          // Wave movement
          const waveX = Math.sin(time * waveSpeedX + p.oy * 0.01) * waveAmpX;
          const waveY = Math.cos(time * waveSpeedY + p.ox * 0.01) * waveAmpY;
          
          // Mouse interaction
          const dx = p.ox - mouse.sx;
          const dy = p.oy - mouse.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const force = Math.max(0, (maxCursorMove - dist) / maxCursorMove);
          
          p.vx += (p.ox + waveX - p.x) * tension;
          p.vy += (p.oy + waveY - p.y) * tension;
          
          p.vx += (dx / dist) * force * 2;
          p.vy += (dy / dist) * force * 2;
          
          p.vx *= friction;
          p.vy *= friction;
          
          p.x += p.vx;
          p.y += p.vy;

          if (j === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('resize', updateSize);
    window.addEventListener('mousemove', handleMouseMove);
    updateSize();
    render();

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lineColor, backgroundColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove, xGap, yGap]);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, pointerEvents: 'none' }} />;
};

export default Waves;
