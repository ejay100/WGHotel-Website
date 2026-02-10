// ================================================
// CURRENCY SELECTOR COMPONENT
// ================================================

import { useState, useEffect } from 'react';
import { 
  CurrencyCode, 
  CURRENCIES, 
  getExchangeRates,
  ExchangeRates 
} from '@/lib/currency';

interface CurrencySelectorProps {
  value: CurrencyCode;
  onChange: (currency: CurrencyCode) => void;
  showFlag?: boolean;
  showName?: boolean;
  className?: string;
  variant?: 'dropdown' | 'toggle';
}

export default function CurrencySelector({
  value,
  onChange,
  showFlag = true,
  showName = false,
  className = '',
  variant = 'dropdown'
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rates, setRates] = useState<ExchangeRates | null>(null);

  useEffect(() => {
    setRates(getExchangeRates());
  }, []);

  const currencies = Object.values(CURRENCIES);
  const selectedCurrency = CURRENCIES[value];

  if (variant === 'toggle') {
    // Compact toggle - just shows current currency with small dropdown
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 px-2 py-1 bg-white/10 backdrop-blur-sm rounded-md text-xs font-medium text-white hover:bg-white/20 transition-all"
          title="Change currency"
        >
          <span className="opacity-80">{selectedCurrency.flag}</span>
          <span>{selectedCurrency.code}</span>
          <svg
            className={`w-3 h-3 opacity-60 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-20 min-w-[120px]">
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => {
                    onChange(currency.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-all ${
                    value === currency.code
                      ? 'bg-forest-50 text-forest-700'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span>{currency.flag}</span>
                  <span className="font-medium">{currency.code}</span>
                  <span className="text-gray-400">{currency.symbol}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
      >
        {showFlag && <span>{selectedCurrency.flag}</span>}
        <span className="font-medium">{selectedCurrency.symbol}</span>
        {showName && <span className="text-sm opacity-80">{selectedCurrency.code}</span>}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20">
            <div className="p-2">
              <p className="text-xs text-gray-500 px-3 py-1 font-medium">Select Currency</p>
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => {
                    onChange(currency.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    value === currency.code
                      ? 'bg-slate-100 text-slate-900'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="text-xl">{currency.flag}</span>
                  <div className="flex-1 text-left">
                    <p className="font-medium">{currency.name}</p>
                    <p className="text-xs text-gray-500">
                      {currency.symbol} {currency.code}
                    </p>
                  </div>
                  {value === currency.code && (
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            {rates && (
              <div className="border-t border-gray-100 px-4 py-2 bg-gray-50">
                <p className="text-xs text-gray-500">
                  Rates updated: {new Date(rates.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Price display component with currency conversion
interface PriceDisplayProps {
  amount: number;
  currency: CurrencyCode;
  className?: string;
  showOriginal?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function PriceDisplay({
  amount,
  currency,
  className = '',
  showOriginal = false,
  size = 'md'
}: PriceDisplayProps) {
  const [convertedAmount, setConvertedAmount] = useState(amount);
  const currencyInfo = CURRENCIES[currency];

  useEffect(() => {
    const { rates } = getExchangeRates();
    const rate = rates[currency] || 1;
    setConvertedAmount(Math.round(amount * rate * 100) / 100);
  }, [amount, currency]);

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };

  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedAmount);

  return (
    <div className={className}>
      <span className={`font-bold ${sizeClasses[size]}`}>
        {currency === 'XOF' ? (
          <>{formattedAmount} <span className="text-sm font-medium">CFA</span></>
        ) : (
          <>{currencyInfo.symbol}{formattedAmount}</>
        )}
      </span>
      {showOriginal && currency !== 'GHS' && (
        <span className="text-xs opacity-60 ml-2">
          (₵{amount.toFixed(2)})
        </span>
      )}
    </div>
  );
}
