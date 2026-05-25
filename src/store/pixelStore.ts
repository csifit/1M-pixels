import { create } from 'zustand';
import { Pixel, PixelGrid } from '@types/index';

interface PixelStoreState {
  grid: PixelGrid;
  selectedPixels: string[];
  
  // Actions
  initializeGrid: (width: number, height: number) => void;
  purchasePixels: (pixelIds: string[], ownerName: string, advertiserURL: string, color: string) => void;
  selectPixel: (pixelId: string) => void;
  deselectPixel: (pixelId: string) => void;
  clearSelection: () => void;
  updatePixel: (pixelId: string, updates: Partial<Pixel>) => void;
  getOwnedPixelCount: () => number;
}

export const usePixelStore = create<PixelStoreState>((set, get) => ({
  grid: {
    width: 1000,
    height: 1000,
    pixelSize: 10,
    pixels: [],
  },
  selectedPixels: [],
  
  initializeGrid: (width: number, height: number) => {
    set((state) => {
      const pixelSize = state.grid.pixelSize;
      const cols = Math.floor(width / pixelSize);
      const rows = Math.floor(height / pixelSize);
      const pixels: Pixel[] = [];
      
      for (let i = 0; i < cols * rows; i++) {
        pixels.push({
          id: `pixel-${i}`,
          x: (i % cols) * pixelSize,
          y: Math.floor(i / cols) * pixelSize,
          owned: false,
        });
      }
      
      return {
        grid: {
          width,
          height,
          pixelSize,
          pixels,
        },
      };
    });
  },
  
  purchasePixels: (pixelIds: string[], ownerName: string, advertiserURL: string, color: string) => {
    set((state) => {
      const updatedPixels = state.grid.pixels.map((pixel) => {
        if (pixelIds.includes(pixel.id)) {
          return {
            ...pixel,
            owned: true,
            ownerName,
            advertiserURL,
            color,
            purchasedAt: new Date(),
          };
        }
        return pixel;
      });
      
      return {
        grid: { ...state.grid, pixels: updatedPixels },
        selectedPixels: [],
      };
    });
  },
  
  selectPixel: (pixelId: string) => {
    set((state) => {
      if (!state.selectedPixels.includes(pixelId)) {
        return { selectedPixels: [...state.selectedPixels, pixelId] };
      }
      return state;
    });
  },
  
  deselectPixel: (pixelId: string) => {
    set((state) => ({
      selectedPixels: state.selectedPixels.filter((id) => id !== pixelId),
    }));
  },
  
  clearSelection: () => {
    set({ selectedPixels: [] });
  },
  
  updatePixel: (pixelId: string, updates: Partial<Pixel>) => {
    set((state) => ({
      grid: {
        ...state.grid,
        pixels: state.grid.pixels.map((pixel) =>
          pixel.id === pixelId ? { ...pixel, ...updates } : pixel
        ),
      },
    }));
  },
  
  getOwnedPixelCount: () => {
    const { grid } = get();
    return grid.pixels.filter((p) => p.owned).length;
  },
}));
