"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { Colors } from "../../tailwind.config";
import { throttle, debounce } from "lodash";

const DotGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Define dot parameters
  const isPortrait =
    typeof window !== "undefined"
      ? window.innerWidth < window.innerHeight
      : false;
  const dotRadius =
    typeof window !== "undefined"
      ? window.innerWidth / (isPortrait ? 4 : 8)
      : 50; // Radius within which dots change color
  const inactiveDotColor = Colors["inactive-dots-color"]; // Color for inactive dots
  const activeDotColor = Colors.primary; // Color for updated dots
  const dotSize = 1; // Size of dots
  const dotSpacing = 24; // Spacing between dots
  const zoomFactor = 4; // Zoom factor for active dots

  // State for dot positions
  const [dotPositions, setDotPositions] = useState<
    { x: number; y: number; currentColor: string }[]
  >([]);

  // State for previous mouse coordinates
  const [prevMouseX, setPrevMouseX] = useState<number>(-1);
  const [prevMouseY, setPrevMouseY] = useState<number>(-1);

  const getBrightness = (distance: number) => {
    // Calculate the brightness based on the distance from the center
    // Brightness decreases linearly from 1 (maximum) at the center to 0 (minimum) at the dotRadius
    const brightness = 1 - Math.min(distance / dotRadius, 1);

    return brightness;
  };

  const calculateColor = (distance: number) => {
    const brightness = getBrightness(distance);

    if (brightness < 0.1) return inactiveDotColor;

    // Interpolate the color based on the brightness
    const color = `rgba(${hexToRgb(activeDotColor).r}, ${
      hexToRgb(activeDotColor).g
    }, ${hexToRgb(activeDotColor).b}, ${brightness})`;

    return color;
  };

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
          dotSize +
          (zoomFactor - 1) * parseFloat(getBrightness(distance).toFixed(2));

        // Draw dot with calculated color
        drawDot(dotPos.x, dotPos.y, dotPos.currentColor, zoomedSize);
      }
    },
    [dotPositions, dotSpacing, dotRadius, activeDotColor]
  );

  // Throttled event listeners
  const throttledMouseMove = throttle(handleMouseMove, 16); // ~60fps
  const throttledTouchMove = throttle(handleTouchMove, 16); // ~60fps
  const debouncedResize = debounce(handleResize, 200); // Resize optimization

  // Event listener for mouse movement
  function handleMouseMove(e: MouseEvent) {
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
  }

  // Event listener for touch movement
  function handleTouchMove(e: TouchEvent) {
    e.preventDefault(); // Prevent default touch behavior (like scrolling)
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    updateColor(touchX, touchY);
  }

  // Event listener for window resize
  function handleResize() {
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

  useLayoutEffect(() => {
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
  }, [dotSpacing]);

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
    [dotSize]
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

  useEffect(() => {
    window.addEventListener("resize", debouncedResize);
    window.addEventListener("mousemove", throttledMouseMove);
    window.addEventListener("touchmove", throttledTouchMove);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("mousemove", throttledMouseMove);
      window.removeEventListener("touchmove", throttledTouchMove);
    };
  }, [debouncedResize, throttledMouseMove, throttledTouchMove]);

  return <canvas ref={canvasRef} />;
};

export default DotGrid;
