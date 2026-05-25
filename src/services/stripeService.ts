import { initStripe, useStripe, useCardForm } from '@stripe/stripe-react-native';

const STRIPE_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_STRIPE_KEY || '';

export const initializeStripe = async () => {
  try {
    await initStripe({
      publishableKey: STRIPE_PUBLISHABLE_KEY,
      merchantIdentifier: 'merchant.com.1mpixels',
      enableGooglePay: true,
    });
  } catch (error) {
    console.error('Failed to initialize Stripe:', error);
    throw error;
  }
};

export const StripeService = {
  async createPaymentMethod(cardDetails: any) {
    try {
      const { stripe } = useStripe();
      if (!stripe) throw new Error('Stripe not initialized');
      
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'Card',
        card: cardDetails,
      });
      
      if (error) throw error;
      return paymentMethod;
    } catch (error) {
      console.error('Error creating payment method:', error);
      throw error;
    }
  },
  
  async createPaymentIntent(amount: number, pixelCount: number) {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/payments/create-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to cents
          pixelCount,
          currency: 'usd',
        }),
      });
      
      if (!response.ok) throw new Error('Failed to create payment intent');
      return await response.json();
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  },
  
  async confirmPayment(clientSecret: string) {
    try {
      const { stripe } = useStripe();
      if (!stripe) throw new Error('Stripe not initialized');
      
      const result = await stripe.confirmPaymentSheetPayment();
      
      if (result.error) throw result.error;
      return result;
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw error;
    }
  },
  
  async handleApplePayPayment(amount: number) {
    try {
      const { stripe, isApplePaySupported } = useStripe();
      if (!stripe) throw new Error('Stripe not initialized');
      
      const supported = await isApplePaySupported();
      if (!supported) throw new Error('Apple Pay not supported');
      
      // Implementation would continue here
    } catch (error) {
      console.error('Error with Apple Pay:', error);
      throw error;
    }
  },
};
