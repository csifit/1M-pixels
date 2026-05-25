import { useState } from 'react';
import { StripeService } from '@services/stripeService';
import { usePixelStore } from '@store/pixelStore';
import { PixelService } from '@services/pixelService';

interface UsePaymentState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const usePayment = () => {
  const [state, setState] = useState<UsePaymentState>({
    loading: false,
    error: null,
    success: false,
  });
  
  const { selectedPixels, clearSelection } = usePixelStore();
  
  const processPayment = async (
    companyName: string,
    advertiserURL: string,
    color: string,
    paymentMethodId: string
  ) => {
    setState({ loading: true, error: null, success: false });
    
    try {
      if (selectedPixels.length === 0) {
        throw new Error('No pixels selected');
      }
      
      const amount = PixelService.calculatePixelCost(selectedPixels.length);
      
      // Create payment intent
      const intent = await StripeService.createPaymentIntent(amount, selectedPixels.length);
      
      if (!intent.clientSecret) {
        throw new Error('Failed to create payment intent');
      }
      
      // Process payment
      const result = await StripeService.confirmPayment(intent.clientSecret);
      
      if (result) {
        // Purchase pixels
        await PixelService.purchasePixels(
          selectedPixels,
          paymentMethodId,
          companyName,
          advertiserURL,
          color
        );
        
        clearSelection();
        setState({ loading: false, error: null, success: true });
        return { success: true, amount };
      }
    } catch (error: any) {
      setState({
        loading: false,
        error: error.message || 'Payment failed',
        success: false,
      });
    }
  };
  
  const resetState = () => {
    setState({ loading: false, error: null, success: false });
  };
  
  return {
    ...state,
    processPayment,
    resetState,
  };
};
