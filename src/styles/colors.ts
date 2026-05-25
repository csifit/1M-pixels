export const Colors = {
  // Primary Colors (Modern Gray & Teal)
  primary: {
    teal: '#14B8A6',      // Main teal accent
    darkTeal: '#0D9488',  // Darker teal for interactions
    lightTeal: '#2DD4BF', // Light teal for highlights
  },
  
  // Gray Scale
  gray: {
    darkest: '#0F0F0F',   // Near black
    dark: '#1A1A1A',      // Very dark gray
    medium: '#2D2D2D',    // Medium gray
    light: '#4A4A4A',     // Light gray
    lighter: '#6B7280',   // Even lighter
    pale: '#E5E7EB',      // Pale gray
    white: '#FFFFFF',     // Pure white
  },
  
  // Status Colors
  status: {
    success: '#10B981',   // Green
    error: '#EF4444',     // Red
    warning: '#F59E0B',   // Amber
    info: '#3B82F6',      // Blue
  },
  
  // Transparent Variants
  overlay: 'rgba(15, 15, 15, 0.7)',
  
  // Gradient (for backgrounds)
  gradient: {
    start: '#1A1A1A',
    end: '#2D2D2D',
  },
};

export const TextColors = {
  primary: Colors.gray.white,
  secondary: Colors.gray.pale,
  accent: Colors.primary.teal,
  muted: Colors.gray.lighter,
};
