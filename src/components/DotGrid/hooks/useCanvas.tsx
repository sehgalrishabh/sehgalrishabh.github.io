import { useLayoutEffect } from "react";
import { dotSpacing, inactiveDotColor } from "../constants";

const useCanvas = (
  setDotPositions: React.Dispatch<React.SetStateAction<any>>,
  drawDot: (x: number, y: number, color: string, size?: number) => void,
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
  useLayoutEffect(() => {
    if (canvasRef?.current) {
      const canvas = canvasRef.current;
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
            currentColor: inactiveDotColor,
          });
        }
      }
      setDotPositions(positions);

      // Draw initial dots with inactive color
      for (const dotPos of positions) {
        drawDot(dotPos.x, dotPos.y, dotPos.currentColor);
      }
    }
  }, []);
};

export default useCanvas;
