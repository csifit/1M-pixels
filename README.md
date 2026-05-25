# 1M Pixels - Mobile Advertising Marketplace

A modern React Native mobile app where advertisers can purchase individual pixels on a 1000×1000 pixel grid at $1 per pixel. Features include interactive gesture controls with rubber-band effects, Stripe payment integration, and a sleek dark gray & teal UI.

## 🎨 Features

- **1M Pixel Grid**: Interactive 1000×1000 pixel canvas
- **Rubber Band Gesture**: Drag to stretch the canvas with spring-back animation
- **Pixel Selection**: Tap pixels to select/deselect for purchase
- **Payment Gateway**: Integrated Stripe and PayPal support
- **Custom Branding**: Choose pixel colors and add company info
- **Modern UI**: Professional dark gray and teal design
- **Real-time Updates**: See purchased pixels from other advertisers

## 🛠 Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Simplified React Native setup and deployment
- **TypeScript** - Type-safe code
- **React Native Reanimated** - Smooth gesture animations
- **Zustand** - Lightweight state management
- **Stripe React Native SDK** - Secure payment processing
- **Axios** - HTTP client for API calls

## 📱 Installation

### Prerequisites
- Node.js 16+
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (for Mac) or Android Emulator

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/csifit/1M-pixels.git
cd 1M-pixels
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your:
- Stripe Publishable Key
- API URL

4. **Start the development server**
```bash
npm start
```

5. **Run on device/emulator**
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── PixelCanvas.tsx      # Main pixel grid canvas
│   └── PaymentModal.tsx     # Payment interface
├── screens/           # Full-screen components
│   └── MainScreen.tsx       # Main app screen
├── hooks/            # Custom React hooks
│   ├── useGestures.ts       # Gesture handling
│   ├── usePixelGrid.ts      # Grid management
│   └── usePayment.ts        # Payment processing
├── services/         # API and business logic
│   ├── api.ts              # API client
│   ├── stripeService.ts    # Stripe integration
│   └── pixelService.ts     # Pixel operations
├── store/           # Zustand state management
│   ├── pixelStore.ts       # Pixel grid state
│   └── userStore.ts        # User state
├── styles/          # Design system
│   ├── colors.ts           # Color palette
│   ├── spacing.ts          # Typography & spacing
│   └── theme.ts            # Theme configuration
└── types/           # TypeScript types
    └── index.ts            # Type definitions
```

## 🎯 Key Components

### PixelCanvas
Interactive grid component with:
- Tap to select/deselect pixels
- Drag gesture with rubber-band effect
- Spring animation return to center
- Real-time visual feedback

### PaymentModal
Purchase interface with:
- Pixel count and cost display
- Company name input
- Custom color selection
- Stripe/PayPal payment options

### Stores (Zustand)
- **pixelStore**: Grid state, pixel ownership, selections
- **userStore**: User authentication, profile, purchase history

## 💳 Payment Integration

### Stripe Setup
1. Create a Stripe account at https://stripe.com
2. Get your Publishable Key from the Stripe Dashboard
3. Add to `.env.local`: `EXPO_PUBLIC_STRIPE_KEY=pk_test_...`

### Backend Requirements
The app expects a backend API with these endpoints:
- `POST /payments/create-intent` - Create payment intent
- `POST /payments/confirm` - Confirm payment
- `POST /pixels/purchase` - Process pixel purchase
- `GET /pixels` - Fetch all pixels

## 🎨 Customization

### Colors
Edit `src/styles/colors.ts` to customize:
- Primary teal color
- Gray scale
- Status colors

### Gesture Settings
Adjust in `src/components/PixelCanvas.tsx`:
- `resistanceFactor` - Drag sensitivity (0.25)
- `scaleAmount` - Stretch effect intensity
- Spring animation `speed` and `bounciness`

### Grid Size
Configure in `src/store/pixelStore.ts`:
- `width` and `height` - Canvas dimensions (default: 1000×1000)
- `pixelSize` - Individual pixel size (default: 10)

## 📊 State Management

### Pixel State
```typescript
{
  id: string;
  x: number;           // X coordinate
  y: number;           // Y coordinate
  owned: boolean;      // Ownership flag
  ownerName?: string;  // Advertiser name
  advertiserURL?: string;
  color?: string;      // Custom color
  purchasedAt?: Date;
}
```

### User State
```typescript
{
  id: string;
  name: string;
  email: string;
  companyName: string;
  ownedPixels: string[]; // Array of pixel IDs
  totalSpent: number;
}
```

## 🔐 Security Notes

- Never commit `.env` files with real API keys
- Stripe key should be Publishable Key (safe for client)
- Backend should validate payments server-side
- Implement rate limiting on API endpoints
- Add CORS restrictions in production

## 🚀 Deployment

### Build for iOS
```bash
eas build --platform ios
```

### Build for Android
```bash
eas build --platform android
```

### Deploy Web
```bash
npm run build
# Deploy to Netlify, Vercel, or any static host
```

## 📝 API Specification

See [API_SPEC.md](./API_SPEC.md) for detailed endpoint documentation.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

## 💬 Support

For issues and feature requests, please open a GitHub Issue.

## 🙏 Acknowledgments

- Stripe for payment processing
- Expo for React Native tooling
- React Native Gesture Handler for gesture detection
- The React Native community

---

Built with ❤️ for advertisers and developers
