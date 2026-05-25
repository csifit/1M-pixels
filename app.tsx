import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StripeProvider } from '@stripe/stripe-react-native';
import { MainScreen } from './src/screens/MainScreen';
import { initializeStripe } from './src/services/stripeService';

const STRIPE_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_STRIPE_KEY || '';

export default function App() {
  useEffect(() => {
    // Initialize Stripe
    if (STRIPE_PUBLISHABLE_KEY) {
      initializeStripe().catch(console.error);
    }
  }, []);
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <MainScreen />
      </StripeProvider>
    </GestureHandlerRootView>
  );
}
