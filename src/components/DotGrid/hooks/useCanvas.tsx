import { useLayoutEffect } from "react";
import { dotSpacing, inactiveDotColor } from "../constants";

const useCanvas = (
  setDotPositions: React.Dispatch<React.SetStateAction<any>>,
  drawDot: (x: number, y: number, color: string, size?: number) => void,
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
  useLayoutEffect(() => {
    // Adjust the canvas size to handle high DPI screens
    const adjustCanvasSize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const ratio = window.devicePixelRatio || 1;

        // Set canvas dimensions
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        canvas.width = width * ratio;
        canvas.height = height * ratio;

        // Scale the drawing context to handle high DPI
        ctx && ctx.scale(ratio, ratio);
      }
    };

    adjustCanvasSize(); // Adjust canvas size synchronously

    // Calculate and store dot positions based on the actual canvas dimensions
    const positions: { x: number; y: number; currentColor: string }[] = [];
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ratio = window.devicePixelRatio || 1;
      const width = canvas.clientWidth * ratio;
      const height = canvas.clientHeight * ratio;

      for (let i = 0; i < width; i += dotSpacing * ratio) {
        for (let j = 0; j < height; j += dotSpacing * ratio) {
          positions.push({
            x: i,
            y: j,
            currentColor: inactiveDotColor,
          });
        }
      }
    }

    setDotPositions(positions);

    // Draw initial dots with inactive color
    for (const dotPos of positions) {
      drawDot(dotPos.x, dotPos.y, dotPos.currentColor);
    }
  }, []);
};

export default useCanvas;
