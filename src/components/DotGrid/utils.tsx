import { activeDotColor, dotRadius, inactiveDotColor } from "./constants";

export const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
    a: 0.1, // Default alpha value
  };
};

export const getBrightness = (distance: number) => {
  // Calculate the brightness based on the distance from the center
  // Brightness decreases linearly from 1 (maximum) at the center to 0 (minimum) at the dotRadius
  const brightness = 1 - Math.min(distance / dotRadius, 1);

  return brightness;
};

export const calculateColor = (distance: number) => {
  const brightness = getBrightness(distance);

  if (brightness < 0.1) return inactiveDotColor;

  // Interpolate the color based on the brightness
  const color = `rgba(${hexToRgb(activeDotColor).r}, ${
    hexToRgb(activeDotColor).g
  }, ${hexToRgb(activeDotColor).b}, ${brightness})`;

  return color;
};
