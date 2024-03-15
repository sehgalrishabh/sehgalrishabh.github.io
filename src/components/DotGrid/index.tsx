"use client";
import React, { useState, useRef, useCallback } from "react";
import {
  activeDotColor,
  dotRadius,
  dotSize,
  dotSpacing,
  inactiveDotColor,
  zoomFactor,
} from "./constants";
import { calculateColor, getBrightness } from "./utils";
import useMouseEvents from "./hooks/useMouseEvents";
import useTouchEvents from "./hooks/useTouchEvents";
import useWindowResize from "./hooks/useWindowResize";
import useCanvas from "./hooks/useCanvas";

const DotGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // State for dot positions
  const [dotPositions, setDotPositions] = useState<
    { x: number; y: number; currentColor: string }[]
  >([]);

  const updateColor = useCallback(
    (x: number, y: number) => {
      for (const dotPos of dotPositions) {
        // Calculate the coordinates of the nearest box of four dots
        const nearestX = Math.floor(x / dotSpacing) * dotSpacing;
        const nearestY = Math.floor(y / dotSpacing) * dotSpacing;

        // Calculate the center of the box of four dots
        const boxCenterX = nearestX + dotSpacing / 2;
        const boxCenterY = nearestY + dotSpacing / 2;

        // Calculate distance between mouse position and dot position
        const distance = Math.hypot(
          boxCenterX - dotPos.x,
          boxCenterY - dotPos.y
        );

        // Calculate target color based on distance
        const targetColor =
          distance < dotRadius ? calculateColor(distance) : inactiveDotColor;

        // Transition color
        dotPos.currentColor = targetColor;

        // Draw dot with calculated color and apply zoom to active dots
        const zoomedSize =
          dotSize +
          (zoomFactor - 1) * parseFloat(getBrightness(distance).toFixed(2));

        // Draw dot with calculated color
        drawDot(dotPos.x, dotPos.y, dotPos.currentColor, zoomedSize);
      }
    },
    [dotPositions, dotSpacing, dotRadius, activeDotColor]
  );

  const drawDot = useCallback(
    (x: number, y: number, color: string, size = dotSize) => {
      const canvas = canvasRef.current;
      const ctx = canvas!.getContext("2d");

      // Create a glowing effect using shadow
      ctx!.shadowBlur = dotSpacing;
      ctx!.shadowColor = color;

      ctx!.fillStyle = color;
      ctx!.beginPath();
      ctx!.arc(x, y, size, 0, Math.PI * 2);
      ctx!.fill();

      // Reset shadow after drawing the dot
      ctx!.shadowBlur = 0;
      ctx!.shadowColor = "transparent";
    },
    [dotSize]
  );

  useWindowResize(dotPositions, setDotPositions, canvasRef);
  useMouseEvents(updateColor, canvasRef);
  useTouchEvents(updateColor, canvasRef);
  useCanvas(setDotPositions, drawDot, canvasRef);

  return <canvas ref={canvasRef} />;
};

export default DotGrid;
