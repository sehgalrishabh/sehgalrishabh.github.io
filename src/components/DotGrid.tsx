"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

const DotGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Define dot parameters
  const dotRadius = 100; // Radius within which dots change color
  const dotColor = "#10CA8B"; // Color for updated dots
  const dotSize = 1; // Size of dots
  const dotSpacing = 24; // Spacing between dots
  const transitionSpeed = 0.05; // Adjust transition speed

  // State for dot positions
  const [dotPositions, setDotPositions] = useState<
    { x: number; y: number; currentColor: string }[]
  >([]);

  // State for previous mouse coordinates
  const [prevMouseX, setPrevMouseX] = useState<number>(-1);
  const [prevMouseY, setPrevMouseY] = useState<number>(-1);

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

        // Set color based on distance
        const color =
          distance < dotRadius ? dotColor : "rgba(255, 255, 255, 0.1)";
        // Calculate target color based on distance
        const targetColor =
          distance < dotRadius ? dotColor : "rgba(255, 255, 255, 0.1)";
        // Transition color
        dotPos.currentColor = transitionColor(dotPos.currentColor, targetColor);
        // Draw dot with calculated color
        drawDot(dotPos.x, dotPos.y, color);
      }
    },
    [dotPositions, dotSpacing, dotRadius, dotColor]
  );

  // Event listener for mouse movement
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Check if the mouse position has changed
      if (mouseX !== prevMouseX || mouseY !== prevMouseY) {
        const canvas = canvasRef.current;
        const ctx = canvas!.getContext("2d");

        // Clear canvas
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
        // Update dot colors based on mouse position
        updateColor(mouseX, mouseY);
        // Update previous mouse position
        setPrevMouseX(mouseX);
        setPrevMouseY(mouseY);
      }
    },
    [prevMouseX, prevMouseY, updateColor]
  );

  // Event listener for window resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");

    // Update canvas dimensions
    canvas!.width = window.innerWidth;
    canvas!.height = window.innerHeight;
    // Recalculate dot positions
    const newPositions = [];
    for (let i = 0; i < canvas!.width; i += dotSpacing) {
      for (let j = 0; j < canvas!.height; j += dotSpacing) {
        newPositions.push({
          x: i,
          y: j,
          currentColor: dotPositions[i]?.currentColor,
        });
      }
    }
    setDotPositions(newPositions);
  }, [dotPositions, dotSpacing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Set canvas dimensions
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Calculate and store dot positions
      const positions: { x: number; y: number; currentColor: string }[] = [];
      for (let i = 0; i < canvas.width; i += dotSpacing) {
        for (let j = 0; j < canvas.height; j += dotSpacing) {
          positions.push({
            x: i,
            y: j,
            currentColor: "rgba(255, 255, 255, 0.1)",
          });
        }
      }
      setDotPositions(positions);

      // Draw initial dots with inactive color
      for (const dotPos of positions) {
        drawDot(dotPos.x, dotPos.y, dotPos.currentColor);
      }
    }
  }, [dotSpacing]);

  const drawDot = useCallback(
    (x: number, y: number, color: string) => {
      const canvas = canvasRef.current;
      const ctx = canvas!.getContext("2d");

      ctx!.fillStyle = color;
      ctx!.beginPath();
      ctx!.arc(x, y, dotSize, 0, Math.PI * 2);
      ctx!.fill();
    },
    [dotSize]
  );

  const transitionColor = useCallback(
    (currentColor: string, targetColor: string) => {
      // Convert current color and target color to RGB format
      const currentRGB = hexToRgb(currentColor);
      const targetRGB = hexToRgb(targetColor);
      // Calculate new color values by transitioning from current to target values
      const newColor = {
        r: transitionValue(currentRGB.r, targetRGB.r),
        g: transitionValue(currentRGB.g, targetRGB.g),
        b: transitionValue(currentRGB.b, targetRGB.b),
      };
      // Return new color in RGBA format
      return `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${currentRGB.a})`;
    },
    []
  );

  const hexToRgb = useCallback((hex: string) => {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
      a: 0.1, // Default alpha value
    };
  }, []);

  const transitionValue = useCallback(
    (currentValue: number, targetValue: number) => {
      return currentValue + (targetValue - currentValue) * transitionSpeed;
    },
    [transitionSpeed]
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    const canvas = canvasRef.current;
    canvas && canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas && canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleResize, handleMouseMove]);

  return <canvas ref={canvasRef} />;
};

export default DotGrid;
