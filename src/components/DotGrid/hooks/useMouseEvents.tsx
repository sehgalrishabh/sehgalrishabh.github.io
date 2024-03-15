import { useEffect, useState, useCallback } from "react";
import { throttle } from "lodash";

const useMouseEvents = (
  updatePosition: (x: number, y: number) => void,
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
  // Throttled event listener for mouse movement
  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      updatePosition(mouseX, mouseY);
    }, 16), // ~60fps
    [updatePosition]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);
};

export default useMouseEvents;
