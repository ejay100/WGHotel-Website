import { calculateNights, calculateBookingTotal, formatCurrency } from '@/lib/helpers';
import { useState } from 'react';
import DidYouKnowPopup from './DidYouKnowPopup';

interface BookingCheckoutProps {
  roomName: string;
  pricePerNight: number;
  checkInDate: string;
  checkOutDate: string;
  tourPrice?: number;
  discountPercent?: number;
  onConfirm: (bookingData: any) => void;
  isLoading?: boolean;
}

const BookingCheckout: React.FC<BookingCheckoutProps> = ({
  roomName,
  pricePerNight,
  checkInDate,
  checkOutDate,
  tourPrice = 0,
  discountPercent = 0,
  onConfirm,
  isLoading = false,
}) => {
  const [didYouKnowOpen, setDidYouKnowOpen] = useState(false);
  
  const nights = calculateNights(checkInDate, checkOutDate);
  const { baseTotal, afterTour, afterDiscount } = calculateBookingTotal(
    pricePerNight,
    nights,
    tourPrice,
    discountPercent
  );

  const discountAmount = afterTour - afterDiscount;

  return (
    <div className="bg-slate-50 rounded-lg p-6 shadow-md border-2 border-amber-200">
      <h3 className="text-xl font-bold text-slate-800 mb-6">Booking Summary</h3>

      {/* Room & Dates */}
      <div className="space-y-3 mb-6 pb-6 border-b border-slate-300">
        <div className="flex justify-between">
          <span className="text-slate-700">Room:</span>
          <span className="font-semibold text-slate-900">{roomName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-700">Check-in:</span>
          <span className="font-semibold text-slate-900">{new Date(checkInDate).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-700">Check-out:</span>
          <span className="font-semibold text-slate-900">{new Date(checkOutDate).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-700">Nights:</span>
          <span className="font-semibold text-amber-700">{nights} night(s)</span>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-3 mb-6 pb-6 border-b border-slate-300">
        <div className="flex justify-between">
          <span className="text-slate-700">
            Room ({nights}× GHS {pricePerNight}):
          </span>
          <span className="font-semibold text-slate-900">{formatCurrency(baseTotal)}</span>
        </div>

        {tourPrice > 0 && (
          <div className="flex justify-between">
            <span className="text-slate-700">Tour Add-on:</span>
            <span className="font-semibold text-slate-900">+{formatCurrency(tourPrice)}</span>
          </div>
        )}

        {discountAmount > 0 && (
          <div className="flex justify-between text-green-700">
            <span>Discount ({discountPercent}%):</span>
            <span className="font-semibold">-{formatCurrency(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-slate-700">Breakfast (Included):</span>
          <span className="font-semibold text-green-700">Free</span>
        </div>
      </div>

      {/* Final Total */}
      <div className="bg-amber-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-slate-800">Total Amount Due:</span>
          <span className="text-2xl font-bold text-amber-700">
            {formatCurrency(afterDiscount)}
          </span>
        </div>
      </div>

      {/* Terms */}
      <div className="text-xs text-slate-600 mb-6 space-y-2">
        <p>✓ Payment is due at check-in or online before arrival</p>
        <p>✓ Complimentary breakfast included every morning</p>
        <p>✓ Free cancellation up to 7 days before arrival</p>
        <p>✓ Valid ID required at check-in</p>
      </div>

      {/* Did You Know Button */}
      <button
        onClick={() => setDidYouKnowOpen(true)}
        className="w-full mb-4 p-4 bg-gradient-to-r from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 border-2 border-amber-300 transition-all group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">💡</div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-800">Did You Know?</p>
              <p className="text-xs text-slate-600">Discover Bono Region Heritage</p>
            </div>
          </div>
          <span className="text-amber-600 text-xl group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </button>

      {/* Payment Methods */}
      <div className="mb-6 p-4 bg-white rounded-lg border border-slate-200">
        <p className="text-sm font-semibold text-slate-700 mb-3">Accepted Payment Methods:</p>
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
          <span>💳 Credit/Debit Card (Paystack)</span>
          <span>📱 MTN Mobile Money</span>
          <span>🏦 Bank Transfer</span>
          <span>💰 Cash at Hotel</span>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={() =>
          onConfirm({
            nights,
            baseTotal,
            tourPrice,
            discountAmount,
            finalTotal: afterDiscount,
          })
        }
        disabled={isLoading}
        className={`
          w-full py-3 rounded-lg font-bold text-white transition-all
          ${isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-amber-600 hover:bg-amber-700 cursor-pointer'
          }
        `}
      >
        {isLoading ? 'Processing...' : 'Continue to Payment'}
      </button>

      {/* Did You Know Popup */}
      <DidYouKnowPopup 
        isOpen={didYouKnowOpen} 
        onClose={() => setDidYouKnowOpen(false)}
        autoRotate={false}
      />
    </div>
  );
};

export default BookingCheckout;
