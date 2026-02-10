import React from 'react';
import { TOUR_OPTIONS } from '@/lib/constants';

interface TourSelectorProps {
  selectedTour: string | null;
  onTourSelect: (tourKey: string | null) => void;
}

const TourSelector: React.FC<TourSelectorProps> = ({ selectedTour, onTourSelect }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-bold text-slate-800 mb-4">
        🗺️ Explore Techiman - Optional Tours
      </h3>

      <p className="text-sm text-slate-600 mb-6">
        Enhance your stay with guided tours to iconic Bono heritage sites
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* No Tour Option */}
        <button
          onClick={() => onTourSelect(null)}
          className={`
            p-4 rounded-lg border-2 transition-all text-left
            ${selectedTour === null
              ? 'border-amber-500 bg-amber-50'
              : 'border-gray-300 hover:border-amber-300'
            }
          `}
        >
          <p className="font-bold text-slate-800">No Tour</p>
          <p className="text-xs text-slate-600">Just relax at the hotel</p>
        </button>

        {/* Tour Options */}
        {Object.entries(TOUR_OPTIONS).map(([key, tour]) => (
          <button
            key={key}
            onClick={() => onTourSelect(key)}
            className={`
              p-4 rounded-lg border-2 transition-all text-left
              ${selectedTour === key
                ? 'border-amber-500 bg-amber-50'
                : 'border-gray-300 hover:border-amber-300'
              }
            `}
          >
            <div className="flex justify-between items-start mb-2">
              <p className="font-bold text-slate-800">{tour.name}</p>
              <span className="text-lg">🎫</span>
            </div>
            <p className="text-xs text-slate-600 mb-2">{tour.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">⏱️ {tour.distance}</span>
              <span className="font-bold text-amber-600">+GHS {tour.price}</span>
            </div>
          </button>
        ))}
      </div>

      {selectedTour && selectedTour !== 'none' && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            ℹ️ Tours include professional guide and transportation. Bookable upon check-in.
          </p>
        </div>
      )}
    </div>
  );
};

export default TourSelector;
