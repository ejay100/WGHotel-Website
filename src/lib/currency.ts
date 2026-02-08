// ================================================
// CURRENCY CONVERSION SYSTEM
// ================================================
// Supports GHS (default), XOF (CFA), USD, GBP, EUR

export type CurrencyCode = 'GHS' | 'XOF' | 'USD' | 'GBP' | 'EUR';

export interface CurrencyInfo {
  code: CurrencyCode;
  name: string;
  symbol: string;
  flag: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  GHS: { code: 'GHS', name: 'Ghana Cedis', symbol: '₵', flag: '🇬🇭' },
  XOF: { code: 'XOF', name: 'CFA Franc', symbol: 'CFA', flag: '🇨🇮' },
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
};

// Default exchange rates (GHS as base currency = 1)
// These are placeholder rates - should be updated via admin panel
export const DEFAULT_RATES: Record<CurrencyCode, number> = {
  GHS: 1,
  XOF: 50.5,    // 1 GHS = ~50.5 XOF (CFA)
  USD: 0.078,   // 1 GHS = ~0.078 USD
  GBP: 0.062,   // 1 GHS = ~0.062 GBP
  EUR: 0.072,   // 1 GHS = ~0.072 EUR
};

// Interface for stored rates with metadata
export interface ExchangeRates {
  rates: Record<CurrencyCode, number>;
  lastUpdated: string;
  approvedBy?: string;
  source?: string;
}

// Get exchange rates from localStorage or use defaults
export function getExchangeRates(): ExchangeRates {
  if (typeof window === 'undefined') {
    return {
      rates: DEFAULT_RATES,
      lastUpdated: new Date().toISOString(),
      source: 'default',
    };
  }

  try {
    const stored = localStorage.getItem('wgh_exchange_rates');
    if (stored) {
      const parsed = JSON.parse(stored) as ExchangeRates;
      return parsed;
    }
  } catch (error) {
    console.error('Error reading exchange rates:', error);
  }

  return {
    rates: DEFAULT_RATES,
    lastUpdated: new Date().toISOString(),
    source: 'default',
  };
}

// Save exchange rates (admin function)
export function saveExchangeRates(
  rates: Record<CurrencyCode, number>,
  approvedBy: string
): ExchangeRates {
  const exchangeRates: ExchangeRates = {
    rates,
    lastUpdated: new Date().toISOString(),
    approvedBy,
    source: 'admin',
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem('wgh_exchange_rates', JSON.stringify(exchangeRates));
  }

  return exchangeRates;
}

// Convert amount from GHS to target currency
export function convertFromGHS(
  amountInGHS: number,
  targetCurrency: CurrencyCode
): number {
  const { rates } = getExchangeRates();
  const rate = rates[targetCurrency] || 1;
  return Math.round(amountInGHS * rate * 100) / 100;
}

// Convert amount from any currency to GHS
export function convertToGHS(
  amount: number,
  fromCurrency: CurrencyCode
): number {
  const { rates } = getExchangeRates();
  const rate = rates[fromCurrency] || 1;
  return Math.round((amount / rate) * 100) / 100;
}

// Format currency with proper symbol and locale
export function formatCurrency(
  amount: number,
  currency: CurrencyCode = 'GHS'
): string {
  const info = CURRENCIES[currency];
  
  // Format based on currency
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  // Return with symbol
  if (currency === 'XOF') {
    return `${formattedAmount} ${info.symbol}`;
  }
  
  return `${info.symbol}${formattedAmount}`;
}

// Get display price in selected currency
export function getDisplayPrice(
  priceInGHS: number,
  targetCurrency: CurrencyCode = 'GHS'
): string {
  const convertedAmount = convertFromGHS(priceInGHS, targetCurrency);
  return formatCurrency(convertedAmount, targetCurrency);
}

// Fetch live rates (mock function - would connect to API in production)
export async function fetchLiveRates(): Promise<Record<CurrencyCode, number>> {
  // In production, this would fetch from an API like:
  // - Open Exchange Rates
  // - Currency Layer
  // - Bank of Ghana API
  
  // For now, return slightly varied rates to simulate live data
  const baseRates = { ...DEFAULT_RATES };
  
  // Add small random variation (±2%)
  const variation = () => 1 + (Math.random() - 0.5) * 0.04;
  
  return {
    GHS: 1,
    XOF: baseRates.XOF * variation(),
    USD: baseRates.USD * variation(),
    GBP: baseRates.GBP * variation(),
    EUR: baseRates.EUR * variation(),
  };
}

// Currency context for React
export interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  rates: ExchangeRates;
  formatPrice: (priceInGHS: number) => string;
  convert: (priceInGHS: number) => number;
}

// Alias for formatCurrency (convenience export)
export const formatPrice = (amount: number, currency: CurrencyCode = 'GHS'): string => {
  const converted = convertFromGHS(amount, currency);
  return formatCurrency(converted, currency);
};

// Convert price from GHS to target currency
export const convertPrice = (amount: number, currency: CurrencyCode): number => {
  return convertFromGHS(amount, currency);
};
