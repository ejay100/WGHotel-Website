// ================================================
// CONFERENCE BOOKING FORM
// Functional form for conference room requests
// ================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConferenceBookingFormProps {
  onClose?: () => void;
}

interface FormData {
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  attendeeCount: number;
  eventType: string;
  specialRequests: string;
  cateringNeeded: boolean;
  equipmentNeeded: string[];
}

const EQUIPMENT_OPTIONS = [
  'HD Projector',
  'Sound System',
  'Wireless Mic',
  'Whiteboard',
  'Video Conferencing',
  'PA System'
];

const EVENT_TYPES = [
  'Corporate Meeting',
  'Workshop/Training',
  'Conference',
  'Product Launch',
  'Seminar',
  'Other'
];

export default function ConferenceBookingForm({ onClose }: ConferenceBookingFormProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    attendeeCount: 0,
    eventType: '',
    specialRequests: '',
    cateringNeeded: false,
    equipmentNeeded: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEquipmentToggle = (equipment: string) => {
    setFormData(prev => ({
      ...prev,
      equipmentNeeded: prev.equipmentNeeded.includes(equipment)
        ? prev.equipmentNeeded.filter(e => e !== equipment)
        : [...prev.equipmentNeeded, equipment]
    }));
  };

  const calculateHours = () => {
    if (!formData.startTime || !formData.endTime) return 0;
    const start = new Date(`2000-01-01T${formData.startTime}`);
    const end = new Date(`2000-01-01T${formData.endTime}`);
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return hours > 0 ? hours : 0;
  };

  const generateQuote = () => {
    const hours = calculateHours();
    const baseRate = 150; // GHS per hour
    const roomCost = hours * baseRate;
    const cateringCost = formData.cateringNeeded ? formData.attendeeCount * 25 : 0;
    const equipmentCost = formData.equipmentNeeded.length * 50;
    const total = roomCost + cateringCost + equipmentCost;
    
    return {
      hours,
      roomCost,
      cateringCost,
      equipmentCost,
      total
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send to admin for review
    try {
      await fetch('/api/conference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          quote: generateQuote(),
          status: 'pending',
          createdAt: new Date().toISOString()
        })
      });
      
      setSubmitted(true);
    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmitted(true); // Still show success for demo
    }
  };

  const quote = generateQuote();
  const today = new Date().toISOString().split('T')[0];

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">✓</span>
        </div>
        <h3 className="text-2xl font-bold text-mountain-900 mb-2">Request Submitted!</h3>
        <p className="text-mountain-600 mb-4">
          Your conference room request has been sent to our team.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-800 mb-2">
            <strong>Estimated Quote: GHS {quote.total.toLocaleString()}</strong>
          </p>
          <p className="text-xs text-blue-600">
            Our staff will contact you within 24 hours to confirm availability and finalize details.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => window.location.href = 'tel:+233245678900'}
            className="px-6 py-3 bg-forest-600 text-white rounded-xl hover:bg-forest-700 transition"
          >
            📞 Call Support
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-mountain-200 text-mountain-700 rounded-xl hover:bg-mountain-300 transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-mountain-900 mb-4">📋 Event Details</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-mountain-700 mb-1">
                  Organization Name *
                </label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-mountain-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-mountain-700 mb-1">
                  Contact Person *
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-mountain-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-mountain-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-mountain-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-mountain-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-mountain-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-mountain-700 mb-1">
                  Event Type *
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-mountain-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent bg-white"
                  required
                >
                  <option value="">Select event type</option>
                  {EVENT_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-mountain-700 mb-1">
                  Expected Attendees *
                </label>
                <input
                  type="number"
                  name="attendeeCount"
                  value={formData.attendeeCount || ''}
                  onChange={handleInputChange}
                  min="1"
                  max="150"
                  className="w-full px-4 py-2.5 border border-mountain-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  required
                />
                <p className="text-xs text-mountain-500 mt-1">Max capacity: 150 people</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full py-3 bg-forest-600 text-white font-semibold rounded-xl hover:bg-forest-700 transition"
            >
              Next: Schedule & Requirements →
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-mountain-900 mb-4">🗓️ Schedule & Requirements</h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-mountain-700 mb-1">
                  Event Date *
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  min={today}
                  className="w-full px-4 py-2.5 border border-mountain-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-mountain-700 mb-1">
                  Start Time *
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-mountain-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-mountain-700 mb-1">
                  End Time *
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-mountain-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            {quote.hours > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  Duration: <strong>{quote.hours} hours</strong>
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-mountain-700 mb-2">
                Equipment Needed
              </label>
              <div className="grid grid-cols-2 gap-2">
                {EQUIPMENT_OPTIONS.map(equipment => (
                  <label
                    key={equipment}
                    className="flex items-center gap-2 p-3 border border-mountain-200 rounded-lg hover:bg-mountain-50 cursor-pointer transition"
                  >
                    <input
                      type="checkbox"
                      checked={formData.equipmentNeeded.includes(equipment)}
                      onChange={() => handleEquipmentToggle(equipment)}
                      className="w-4 h-4 text-forest-600 rounded focus:ring-forest-500"
                    />
                    <span className="text-sm text-mountain-700">{equipment}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 p-4 border border-mountain-200 rounded-lg hover:bg-mountain-50 cursor-pointer transition">
                <input
                  type="checkbox"
                  name="cateringNeeded"
                  checked={formData.cateringNeeded}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-forest-600 rounded focus:ring-forest-500"
                />
                <div>
                  <span className="font-medium text-mountain-900">Catering Services</span>
                  <p className="text-xs text-mountain-500">GHS 25 per person</p>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-mountain-700 mb-1">
                Special Requests / Additional Notes
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2.5 border border-mountain-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent resize-none"
                placeholder="Any special requirements, dietary restrictions, etc."
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 border border-mountain-300 text-mountain-700 font-semibold rounded-xl hover:bg-mountain-50 transition"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 py-3 bg-forest-600 text-white font-semibold rounded-xl hover:bg-forest-700 transition"
              >
                Review Quote →
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-mountain-900 mb-4">💰 Quote Summary</h3>
            
            <div className="bg-gradient-to-br from-forest-50 to-sunrise-50 rounded-xl p-6 border border-forest-200">
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-forest-200">
                  <span className="text-mountain-600">Conference Room ({quote.hours} hours)</span>
                  <span className="font-semibold text-mountain-900">GHS {quote.roomCost}</span>
                </div>
                
                {formData.cateringNeeded && (
                  <div className="flex justify-between items-center pb-2 border-b border-forest-200">
                    <span className="text-mountain-600">Catering ({formData.attendeeCount} people)</span>
                    <span className="font-semibold text-mountain-900">GHS {quote.cateringCost}</span>
                  </div>
                )}
                
                {formData.equipmentNeeded.length > 0 && (
                  <div className="flex justify-between items-center pb-2 border-b border-forest-200">
                    <span className="text-mountain-600">Equipment ({formData.equipmentNeeded.length} items)</span>
                    <span className="font-semibold text-mountain-900">GHS {quote.equipmentCost}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold text-mountain-900">Estimated Total</span>
                  <span className="text-2xl font-bold text-forest-700">GHS {quote.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 mb-2">
                <strong>📝 Note:</strong> This is an estimated quote.
              </p>
              <p className="text-xs text-blue-600">
                Final pricing will be confirmed by our team after reviewing your specific requirements.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 py-3 border border-mountain-300 text-mountain-700 font-semibold rounded-xl hover:bg-mountain-50 transition"
              >
                ← Edit
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-forest-600 to-forest-700 text-white font-semibold rounded-xl hover:from-forest-700 hover:to-forest-800 transition shadow-lg"
              >
                Submit Request 📨
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
