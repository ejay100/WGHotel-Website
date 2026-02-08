// Room Configuration
export const ROOM_TYPES = {
  standard: {
    name: 'Standard Room',
    price: 250,
    quantity: 15,
    capacity: 2,
  },
  executive: {
    name: 'Executive Room',
    price: 350,
    quantity: 15,
    capacity: 3,
  },
  presidential: {
    name: 'Presidential Suite',
    price: 500,
    quantity: 10,
    capacity: 4,
  },
  chalet: {
    name: 'Mountain Chalet',
    price: 450,
    quantity: 4,
    capacity: 4,
  },
};

export const TOTAL_ROOMS = 44;

// Conference Room Configuration
export const CONFERENCE_ROOM = {
  id: 'conference-1',
  name: 'Executive Conference Room',
  capacity: 150,
  hourlyRate: 100, // USD per hour
  dailyRate: 600, // USD for full day (8+ hours)
  amenities: [
    'HD Projector',
    'Wireless Screen Sharing',
    'Sound System',
    'Whiteboard',
    'AC',
    'WiFi',
    'Video Conferencing',
    'Podium',
    'Tables & Chairs',
  ],
  availability: {
    openingTime: '08:00',
    closingTime: '22:00',
  },
};

export const CONFERENCE_PACKAGE_TYPES = {
  hourly: 'Hourly Rental',
  half_day: 'Half Day (4 hours)',
  full_day: 'Full Day (8+ hours)',
  multi_day: 'Multi-Day Event',
} as const;

// Tour Options
export const TOUR_OPTIONS = {
  kintampo: {
    name: 'Kintampo Falls',
    distance: '35 mins',
    price: 50,
    description: 'Natural pools and hiking trails',
  },
  boabeng_fiema: {
    name: 'Boabeng-Fiema Wildlife Sanctuary',
    distance: '45 mins',
    price: 60,
    description: 'Sacred monkey forest and bird watching',
  },
  tano_boase: {
    name: 'Tano Boase Grove',
    distance: '20 mins',
    price: 35,
    description: 'Ancient river sanctuary and hiking',
  },
  bono_manso: {
    name: 'Bono Manso Historical Site',
    distance: '25 mins',
    price: 40,
    description: 'Historical settlement and cultural education',
  },
};

// Admin Roles & Permissions
export const ROLES = {
  admin: {
    name: 'Administrator',
    permissions: ['all'],
  },
  manager: {
    name: 'Manager',
    permissions: [
      'view_bookings',
      'create_bookings',
      'cancel_bookings',
      'manage_discounts',
      'view_reports',
      'manage_staff',
      'manage_conference_bookings',
    ],
  },
  receptionist: {
    name: 'Receptionist',
    permissions: [
      'view_bookings',
      'create_bookings',
      'check_in_guest',
      'check_out_guest',
      'view_guest_info',
    ],
  },
};

// Payment Methods
export const PAYMENT_METHODS = {
  paystack: 'Credit Card / Debit Card',
  mtn_momo: 'MTN Mobile Money',
  vodafone: 'Vodafone Cash',
  airteltigo: 'AirtelTigo Money',
  bank_transfer: 'Bank Transfer',
  cash: 'Cash at Hotel',
};

// Cancellation Policies
export const CANCELLATION_POLICY = {
  full_refund_days: 7,
  partial_refund_percent: 50,
  partial_refund_days: 3,
  no_refund_days: 0,
};

// Akan Symbols (for decoration)
export const AKAN_SYMBOLS = [
  { symbol: '⏣', meaning: 'Gyedu - Strength' },
  { symbol: '⏢', meaning: 'Unity & Interdependence' },
  { symbol: '⏥', meaning: 'Sankofa - Learn from History' },
];
