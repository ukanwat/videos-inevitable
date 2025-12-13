/**
 * Theme color utilities
 * All colors should use CSS variables defined in index.css
 */

/**
 * Get a CSS variable value
 */
export const getCSSVar = (name: string): string => {
  return `hsl(var(${name}))`;
};

/**
 * Theme colors - always use these instead of hardcoded values
 */
export const colors = {
  // Base colors
  background: getCSSVar('--background'),
  foreground: getCSSVar('--foreground'),

  // UI colors
  card: getCSSVar('--card'),
  cardForeground: getCSSVar('--card-foreground'),
  primary: getCSSVar('--primary'),
  primaryForeground: getCSSVar('--primary-foreground'),
  secondary: getCSSVar('--secondary'),
  secondaryForeground: getCSSVar('--secondary-foreground'),
  muted: getCSSVar('--muted'),
  mutedForeground: getCSSVar('--muted-foreground'),
  accent: getCSSVar('--accent'),
  accentForeground: getCSSVar('--accent-foreground'),
  destructive: getCSSVar('--destructive'),
  destructiveForeground: getCSSVar('--destructive-foreground'),

  // Border and input
  border: getCSSVar('--border'),
  input: getCSSVar('--input'),
  ring: getCSSVar('--ring'),

  // Chart colors
  chart1: getCSSVar('--chart-1'),
  chart2: getCSSVar('--chart-2'),
  chart3: getCSSVar('--chart-3'),
  chart4: getCSSVar('--chart-4'),
  chart5: getCSSVar('--chart-5'),

  // Vibrant accent colors
  electricBlue: getCSSVar('--electric-blue'),
  yellow: getCSSVar('--yellow'),
  purple: getCSSVar('--purple'),
  orange: getCSSVar('--orange'),
  pink: getCSSVar('--pink'),
  green: getCSSVar('--green'),
} as const;

/**
 * Get chart color by index (1-5)
 */
export const getChartColor = (index: number): string => {
  const colors = [
    getCSSVar('--chart-1'),
    getCSSVar('--chart-2'),
    getCSSVar('--chart-3'),
    getCSSVar('--chart-4'),
    getCSSVar('--chart-5'),
  ];
  return colors[(index - 1) % 5];
};
