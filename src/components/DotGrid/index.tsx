"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
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

  const [prevXY, setPrevXY] = useState<{ x: number; y: number }>({
    x: -1,
    y: -1,
  });

  // Function to draw a dot on the canvas
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
    []
  );

  // Update dot colors based on distance from mouse or touch position
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
          dotSize * (1 + (zoomFactor - 1) * getBrightness(distance));

        // Draw dot with calculated color
        drawDot(dotPos.x, dotPos.y, dotPos.currentColor, zoomedSize);
      }
    },
    [dotPositions, drawDot]
  );

  // Update dot positions and colors based on mouse or touch coordinates
  const updatePosition = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const mouseXChanged = x !== prevXY.x;
      const mouseYChanged = y !== prevXY.y;

      // Check if the mouse position has changed
      if (mouseXChanged || mouseYChanged) {
        const ctx = canvas.getContext("2d");

        // Clear canvas
        ctx!.clearRect(0, 0, canvas.width, canvas.height);

        // Update dot colors based on mouse position
        updateColor(x, y);

        // Update previous mouse position
        setPrevXY({ x, y });
      }
    },
    [prevXY, updateColor]
  );

  useWindowResize(dotPositions, setDotPositions, canvasRef);
  useMouseEvents(updatePosition, canvasRef);
  useTouchEvents(updatePosition, canvasRef);
  useCanvas(setDotPositions, drawDot, canvasRef);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default DotGrid;
