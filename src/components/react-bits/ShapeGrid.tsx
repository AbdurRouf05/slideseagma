'use client';

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import "./ShapeGrid.css";

interface ShapeGridProps {
  speed?: number;
  shape?: "square" | "circle" | "hexagon" | "triangle";
  size?: number;
  spacing?: number;
  borderColor?: string;
  hoverColor?: string;
  hoverTrailAmount?: number;
  direction?: "up" | "down" | "left" | "right" | "diagonal";
}

const ShapeGrid = ({
  speed = 0.5,
  shape = "square",
  size = 40,
  spacing = 40,
  borderColor = "#fff",
  hoverColor = "#222",
  hoverTrailAmount = 10,
  direction = "diagonal",
}: ShapeGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const drawShape = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, s: number, type: string) => {
      ctx.beginPath();
      if (type === "circle") {
        ctx.arc(x + s / 2, y + s / 2, s / 2, 0, Math.PI * 2);
      } else if (type === "square") {
        ctx.rect(x, y, s, s);
      } else if (type === "triangle") {
        ctx.moveTo(x + s / 2, y);
        ctx.lineTo(x + s, y + s);
        ctx.lineTo(x, y + s);
        ctx.closePath();
      } else if (type === "hexagon") {
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const px = x + s / 2 + (s / 2) * Math.cos(angle);
          const py = y + s / 2 + (s / 2) * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
      }
      ctx.stroke();
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;

      const cols = Math.ceil(canvas.width / (size + spacing)) + 2;
      const rows = Math.ceil(canvas.height / (size + spacing)) + 2;

      offset = (offset + speed) % (size + spacing);

      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          let x = i * (size + spacing);
          let y = j * (size + spacing);

          if (direction === "up") y -= offset;
          if (direction === "down") y += offset;
          if (direction === "left") x -= offset;
          if (direction === "right") x += offset;
          if (direction === "diagonal") {
            x += offset;
            y += offset;
          }

          drawShape(ctx, x, y, size, shape);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [speed, shape, size, spacing, borderColor, direction, drawShape]);

  return (
    <canvas
      ref={canvasRef}
      className="shape-grid-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        backgroundColor: "transparent",
      }}
    />
  );
};

export default ShapeGrid;
