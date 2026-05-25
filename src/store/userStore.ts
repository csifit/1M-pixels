import { create } from 'zustand';
import { User } from '@types/index';

interface UserStoreState {
  user: User | null;
  isAuthenticated: boolean;
  
  // Actions
  setUser: (user: User) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addOwnedPixel: (pixelId: string) => void;
  updateTotalSpent: (amount: number) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  setUser: (user: User) => {
    set({
      user,
      isAuthenticated: true,
    });
  },
  
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },
  
  updateProfile: (updates: Partial<User>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    }));
  },
  
  addOwnedPixel: (pixelId: string) => {
    set((state) => ({
      user: state.user
        ? { ...state.user, ownedPixels: [...state.user.ownedPixels, pixelId] }
        : null,
    }));
  },
  
  updateTotalSpent: (amount: number) => {
    set((state) => ({
      user: state.user
        ? { ...state.user, totalSpent: state.user.totalSpent + amount }
        : null,
    }));
  },
}));
