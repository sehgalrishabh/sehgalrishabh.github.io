import { useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { dotSpacing } from "../constants";

const useWindowResize = (
  dotPositions: { x: number; y: number; currentColor: string }[],
  setDotPositions: React.Dispatch<React.SetStateAction<any>>,
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
  // Debouced event listener for window resize
  const handleResize = useCallback(
    debounce(() => {
      if (canvasRef?.current) {
        const canvas = canvasRef.current;
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
      }
    }, 200),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);
};

export default useWindowResize;
