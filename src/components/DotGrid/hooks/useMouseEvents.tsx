import { useEffect, useState, useCallback } from "react";
import { throttle } from "lodash";

const useMouseEvents = (
  updateColor: (x: number, y: number) => void,
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
  const [prevMouseX, setPrevMouseX] = useState<number>(-1);
  const [prevMouseY, setPrevMouseY] = useState<number>(-1);

  // Throttled event listener for mouse movement
  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      if (canvasRef?.current) {
        const canvas = canvasRef.current;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Check if the mouse position has changed
        if (mouseX !== prevMouseX || mouseY !== prevMouseY) {
          // Get canvas context
          const ctx = canvas!.getContext("2d");
          // Clear canvas
          ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
          // Update dot colors based on mouse position
          updateColor(mouseX, mouseY);
          // Update previous mouse position
          setPrevMouseX(mouseX);
          setPrevMouseY(mouseY);
        }
      }
    }, 16), // ~60fps
    [prevMouseX, prevMouseY, updateColor]
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
