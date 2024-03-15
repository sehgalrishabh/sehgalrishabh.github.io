import { throttle } from "lodash";
import { useState, useEffect, useCallback } from "react";

const useTouchEvents = (
  updatePosition: (x: number, y: number) => void,
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
  // Throttled event listener for touch movement
  const handleTouchMove = useCallback(
    throttle((e: TouchEvent) => {
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;

      // Check if the touch position has changed
      updatePosition(touchX, touchY);
    }, 16), // ~60fps
    [updatePosition]
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
