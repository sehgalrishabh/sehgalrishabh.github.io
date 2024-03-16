import { activeDotColor, dotRadius, inactiveDotColor } from "./constants";
import { rgb } from "color-convert";

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
  return Math.max(0, 1 - Math.pow(distance / dotRadius, 2));
};

const rgba = hexToRgb(activeDotColor);
const hsl = rgb.hsl(rgba.r, rgba.g, rgba.b);

export const calculateColor = (distance: number) => {
  const brightness = getBrightness(distance);

  if (brightness <= 0.1) return inactiveDotColor;

  // Interpolate the color based on the brightness
  // const color = `rgba(${hexToRgb(activeDotColor).r}, ${
  //   hexToRgb(activeDotColor).g
  // }, ${hexToRgb(activeDotColor).b}, ${brightness})`;

  // Adjust hue, saturation, and lightness to enhance visibility
  const hue = hsl[0]; // Adjust hue to your preference
  const saturation = 100; // Maximum saturation for punchy flavor
  const lightness = 50 + brightness; // Scale lightness based on brightness

  // Convert HSL to RGB
  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  return color;
};
