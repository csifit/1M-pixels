import { useEffect } from 'react';
import { usePixelStore } from '@store/pixelStore';

export const usePixelGrid = (width: number = 1000, height: number = 1000) => {
  const { grid, initializeGrid } = usePixelStore();
  
  useEffect(() => {
    if (grid.pixels.length === 0) {
      initializeGrid(width, height);
    }
  }, []);
  
  return {
    grid,
    cols: Math.floor(width / grid.pixelSize),
    rows: Math.floor(height / grid.pixelSize),
  };
};
