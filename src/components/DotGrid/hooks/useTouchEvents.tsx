import { throttle } from "lodash";
import { useState, useEffect, useCallback } from "react";

const useTouchEvents = (
  updateColor: (x: number, y: number) => void,
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
  const [prevMouseX, setPrevMouseX] = useState<number>(-1);
  const [prevMouseY, setPrevMouseY] = useState<number>(-1);

  // Throttled event listener for touch movement
  const handleTouchMove = useCallback(
    throttle((e: MouseEvent) => {
      if (canvasRef?.current) {
        const canvas = canvasRef.current;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Check if the touch position has changed
        if (mouseX !== prevMouseX || mouseY !== prevMouseY) {
          // Get canvas context
          const ctx = canvas!.getContext("2d");
          // Clear canvas
          ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
          // Update dot colors based on touch position
          updateColor(mouseX, mouseY);
          // Update previous touch position
          setPrevMouseX(mouseX);
          setPrevMouseY(mouseY);
        }
      }
    }, 16), // ~60fps
    [prevMouseX, prevMouseY, updateColor]
  );

  useEffect(() => {
    window.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleTouchMove]);
};

export default useTouchEvents;
