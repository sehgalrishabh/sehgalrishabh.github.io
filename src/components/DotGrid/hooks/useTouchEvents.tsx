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
    throttle((e: TouchEvent) => {
      if (canvasRef?.current) {
        const canvas = canvasRef.current;

        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;

        // Check if the touch position has changed
        if (touchX !== prevMouseX || touchY !== prevMouseY) {
          // Get canvas context
          const ctx = canvas!.getContext("2d");
          // Clear canvas
          ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
          // Update dot colors based on touch position
          updateColor(touchX, touchY);
          // Update previous touch position
          setPrevMouseX(touchX);
          setPrevMouseY(touchY);
        }
      }
    }, 16), // ~60fps
    [prevMouseX, prevMouseY, updateColor]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      window.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    }
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleTouchMove]);
};

export default useTouchEvents;
