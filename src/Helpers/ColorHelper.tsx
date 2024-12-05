// Function to interpolate between two colors
const interpolateColor = (
  color1: string,
  color2: string,
  factor: number
): string => {
  const hex = (color: string) => {
    const hexColor = color.charAt(0) === "#" ? color.substring(1, 7) : color;
    return [
      parseInt(hexColor.substring(0, 2), 16),
      parseInt(hexColor.substring(2, 4), 16),
      parseInt(hexColor.substring(4, 6), 16),
    ];
  };

  const [r1, g1, b1] = hex(color1);
  const [r2, g2, b2] = hex(color2);

  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  const toHex = (n: number) => n.toString(16).padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Function to generate a range of colors between two given colors
const generateColorRange = (
  color1: string,
  color2: string,
  steps: number
): string[] => {
  const colors = [];
  for (let i = 0; i <= steps; i++) {
    colors.push(interpolateColor(color1, color2, i / steps));
  }
  return colors;
};

// Export the functions to be used in other components
export { interpolateColor, generateColorRange };
