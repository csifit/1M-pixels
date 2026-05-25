import { API } from './api';
import { usePixelStore } from '@store/pixelStore';
import { useUserStore } from '@store/userStore';

export const PixelService = {
  async fetchPixels() {
    try {
      const response = await API.getPixels();
      return response.data;
    } catch (error) {
      console.error('Error fetching pixels:', error);
      throw error;
    }
  },
  
  async fetchUserPixels(userId: string) {
    try {
      const response = await API.getPixelsByUser(userId);
      return response.data;
    } catch (error) {
      console.error('Error fetching user pixels:', error);
      throw error;
    }
  },
  
  async purchasePixels(
    pixelIds: string[],
    paymentMethodId: string,
    companyName: string,
    advertiserURL: string,
    color: string
  ) {
    try {
      const amount = pixelIds.length * 1; // $1 per pixel
      
      // Create payment intent
      const paymentIntent = await API.createPaymentIntent(amount, pixelIds.length);
      
      // Process payment
      const paymentResult = await API.purchasePixels(pixelIds, paymentMethodId);
      
      if (paymentResult.data.success) {
        // Update stores
        const pixelStore = usePixelStore.getState();
        const userStore = useUserStore.getState();
        
        pixelStore.purchasePixels(pixelIds, companyName, advertiserURL, color);
        userStore.updateTotalSpent(amount);
        
        return paymentResult.data;
      }
    } catch (error) {
      console.error('Error purchasing pixels:', error);
      throw error;
    }
  },
  
  calculatePixelCost(pixelCount: number): number {
    return pixelCount * 1; // $1 per pixel
  },
  
  isPixelOwned(pixelId: string): boolean {
    const { grid } = usePixelStore.getState();
    const pixel = grid.pixels.find((p) => p.id === pixelId);
    return pixel?.owned || false;
  },
  
  getPixelInfo(pixelId: string) {
    const { grid } = usePixelStore.getState();
    return grid.pixels.find((p) => p.id === pixelId);
  },
};
