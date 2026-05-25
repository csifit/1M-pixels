export interface Pixel {
  id: string;
  x: number;
  y: number;
  owned: boolean;
  ownerName?: string;
  advertiserURL?: string;
  color?: string;
  purchasedAt?: Date;
}

export interface PixelGrid {
  width: number;
  height: number;
  pixelSize: number;
  pixels: Pixel[];
}

export interface PaymentInfo {
  pixelCount: number;
  totalCost: number;
  selectedPixels: string[];
  advertiserId: string;
  companyName: string;
  url: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  companyName: string;
  ownedPixels: string[];
  totalSpent: number;
}

export interface StripeConfig {
  publishableKey: string;
  merchantCountry: string;
  enableApplePay: boolean;
  enableGooglePay: boolean;
}
