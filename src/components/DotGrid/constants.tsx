import { Colors } from "../../../tailwind.config";

// Define dot parameters
export const isPortrait =
  typeof window !== "undefined"
    ? window.innerWidth < window.innerHeight
    : false;
export const dotRadius =
  typeof window !== "undefined" ? window.innerWidth / (isPortrait ? 4 : 8) : 50; // Radius within which dots change color
export const inactiveDotColor = Colors["inactive-dots-color"]; // Color for inactive dots
export const activeDotColor = Colors.primary; // Color for updated dots
export const dotSize = 1; // Size of dots
export const dotSpacing = 48; // Spacing between dots
export const zoomFactor = 4; // Zoom factor for active dots
