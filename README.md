# 🏨 Winners Gold Hotel - Hotel Booking System

**Premium Accommodation & Cultural Gateway to the Bono Heartland**

A modern, full-stack hotel booking system for Winners Gold Hotel in Techiman, Bono East, Ghana. Built with Next.js, TypeScript, and Supabase.

🌐 **Live Demo:** [https://ejay100.github.io/WGHotel-Website/](https://ejay100.github.io/WGHotel-Website/)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit **http://localhost:3000** - Your system is ready to use with mock data!

### URLs
| URL | Purpose |
|-----|---------|
| http://localhost:3000 | Guest booking website |
| http://localhost:3000/admin | Admin dashboard |

---

## ✨ Features

### Guest Portal
- ✅ Browse 44 rooms (40 Main Building + 4 Premium Chalets)
- ✅ Real-time availability checking
- ✅ Secure online booking with payment options
- ✅ Discount code validation
- ✅ Tour add-ons (Kintampo Falls, Boabeng-Fiema, Tano Boase, Bono Manso)
- ✅ Tourist information about Techiman & Bono heritage
- ✅ Instant booking confirmation
- ✅ **Conference Room Booking (NEW!)** - 150-capacity room with HD projector

### Admin Dashboard
- ✅ Staff authentication (JWT-based)
- ✅ Live booking calendar (44 rooms + conference room)
- ✅ Dashboard KPIs (occupancy, RevPAR, revenue, satisfaction)
- ✅ Booking management (create, update, cancel)
- ✅ Role-based access control (Admin, Manager, Receptionist)
- ✅ Discount code management
- ✅ Payment tracking & reconciliation
- ✅ Audit logging for all actions
- ✅ **Conference booking management (NEW!)**

### Payment Integration
- ✅ Paystack (credit/debit cards)
- ✅ Hubtel (Mobile Money - MTN, Vodafone, AirtelTigo)

---

## 🏗️ Technology Stack

- **Framework:** Next.js 16.1.6
- **Language:** TypeScript 5.3.3
- **UI:** React 18.3.1 + Tailwind CSS 3.4.0
- **Database:** Supabase (PostgreSQL)
- **Validation:** Zod
- **State Management:** TanStack Query 5.0+
- **Charts:** Recharts
- **Authentication:** JWT tokens
- **Payments:** Paystack & Hubtel APIs

---

## 📁 Project Structure

```
WGH/
├── src/
│   ├── pages/
│   │   ├── index.tsx              # Guest website
│   │   ├── admin.tsx              # Admin dashboard
│   │   └── api/                   # API routes
│   │       ├── rooms.ts
│   │       ├── bookings.ts
│   │       ├── discount.ts
│   │       ├── admin/
│   │       │   ├── login.ts
│   │       │   └── stats.ts
│   │       ├── bookings/
│   │       │   └── [id].ts
│   │       ├── payments/
│   │       │   ├── paystack.ts
│   │       │   ├── hubtel.ts
│   │       │   └── verify.ts
│   │       └── rooms/
│   │           └── availability.ts
│   ├── components/                # React components
│   │   ├── BookingCheckout.tsx
│   │   ├── RoomCard.tsx
│   │   └── TourSelector.tsx
│   ├── admin/                     # Admin components
│   │   ├── AdminLoginForm.tsx
│   │   ├── BookingCalendar.tsx
│   │   └── DashboardStats.tsx
│   └── lib/                       # Utilities
│       ├── supabase.ts            # Database client
│       ├── client.ts              # API wrapper
│       ├── mockData.ts            # Sample data
│       ├── validators.ts          # Zod schemas
│       ├── helpers.ts             # Utilities
│       ├── auth.ts                # Auth helpers
│       └── constants.ts           # Constants
├── docs/
│   ├── database-schema.sql        # PostgreSQL schema
│   ├── API.md                     # API documentation
│   └── DEPLOYMENT.md              # Deployment guide
├── .env.local                     # Environment variables
├── next.config.js                 # Next.js config
├── tsconfig.json                  # TypeScript config
└── package.json                   # Dependencies
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Security
ADMIN_SECRET_KEY=your-32-char-secret
JWT_SECRET=your-32-char-jwt-secret

# Payment Gateways (Optional)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxx
HUBTEL_CLIENT_ID=your-hubtel-client-id
HUBTEL_CLIENT_SECRET=your-hubtel-secret
```

### Database Setup

1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Run the SQL schema from `docs/database-schema.sql` in Supabase SQL Editor
4. Add Supabase credentials to `.env.local`

**Note:** The system works immediately with mock data. Supabase is optional for persistent storage.

---

## 📚 API Endpoints

### Rooms
- `GET /api/rooms` - List all rooms
- `GET /api/rooms/availability` - Check availability by date

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - List all bookings
- `GET /api/bookings/[id]` - Get booking details
- `PUT /api/bookings/[id]` - Update booking
- `DELETE /api/bookings/[id]` - Cancel booking

### Conference Room (NEW!)
- `POST /api/conference` - Create conference booking
- `GET /api/conference` - List conference bookings
- `GET /api/conference/[id]` - Get conference booking details
- `PUT /api/conference/[id]` - Update conference booking
- `DELETE /api/conference/[id]` - Cancel conference booking

### Admin
- `POST /api/admin/login` - Staff authentication
- `GET /api/admin/stats` - Dashboard metrics

### Payments
- `POST /api/payments/paystack` - Initialize Paystack payment
- `POST /api/payments/hubtel` - Initialize Hubtel payment
- `POST /api/payments/verify` - Verify payment

### Discount
- `POST /api/discount` - Validate discount code

See [docs/API.md](docs/API.md) and [docs/CONFERENCE_ROOM_GUIDE.md](docs/CONFERENCE_ROOM_GUIDE.md) for complete API documentation.

---

## 🗺️ About Winners Gold Hotel

### Location
**Winners Gold Hotel**, Techiman, Bono East Region, Ghana

### Accommodation
- **44 Rooms Total**: 40 Main Building + 4 Premium Chalets
- **Room Categories**: Standard, Executive, Presidential, Chalet
- **Amenities**: 100% Air Conditioning, Complimentary Breakfast, WiFi, Smart TV
- **Facilities**: Restaurant & Bar, Conference Rooms, Event Compound
- **Swimming Pool**: Coming Soon
- **Conference Room**: Executive Conference Room (150 capacity) with HD Projector, Sound System, Wireless Sharing

### Nearby Attractions
| Attraction | Distance | Highlights |
|-----------|----------|------------|
| Kintampo Falls | 35 mins | Natural pools, hiking trails |
| Boabeng-Fiema Sanctuary | 45 mins | Sacred monkey forest, bird watching |
| Tano Boase Grove | 20 mins | Spiritual site, river sanctuary |
| Bono Manso | 25 mins | Historical Bono Kingdom settlement |
| Techiman Market | 10 mins | One of West Africa's largest markets |

### Cultural Heritage
Techiman is the historic capital of the ancient **Bono Kingdom** (15th century), the first great Akan empire. The region is rich in:
- Akan cultural practices and symbols
- Traditional chieftaincy institutions
- Historical sites and sacred groves
- Authentic Bono cuisine and crafts

---

## 🧪 Testing

### With Mock Data (Default)
The system works immediately with built-in mock data:
```bash
npm run dev
# Visit http://localhost:3000
```

### With Supabase Database
1. Set up database using `docs/database-schema.sql`
2. Configure `.env.local` with Supabase credentials
3. Restart server

---

## 🚀 Deployment

### GitHub Pages (Static Demo)

This repository is configured to automatically deploy to GitHub Pages when changes are pushed to the main branch.

**Live Demo:** [https://ejay100.github.io/WGHotel-Website/](https://ejay100.github.io/WGHotel-Website/)

The deployment process:
1. Push changes to the `main` branch
2. GitHub Actions automatically builds the static site
3. The site is deployed to GitHub Pages
4. Visit the URL above to view the live site

**Note:** The GitHub Pages deployment is a static demo. API routes and server-side features are not available. For full functionality including bookings and admin dashboard, deploy to Vercel (see below).

### Production Deployment (Vercel)

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for production deployment instructions including:
- Vercel deployment
- Environment variable configuration
- Domain setup
- SSL/HTTPS configuration

---

## 📖 Documentation

- **[API.md](docs/API.md)** - Complete API reference
- **[CONFERENCE_ROOM_GUIDE.md](docs/CONFERENCE_ROOM_GUIDE.md)** - Conference room booking guide
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Production deployment guide
- **[database-schema.sql](docs/database-schema.sql)** - PostgreSQL database schema
- **[conference-schema.sql](docs/conference-schema.sql)** - Conference room database schema

---

## 🤝 Support

For issues or questions about this system, contact the development team or refer to the documentation in the `/docs` folder.

---

## 📄 License

© 2026 Winners Gold Hotel. All rights reserved.

---

**Built with ❤️ for Winners Gold Hotel, Techiman**
- **Framework**: Next.js 14+ (SEO-optimized for tourist searches)
- **UI Library**: React + Tailwind CSS
- **State Management**: TanStack Query (for real-time booking updates)
- **Charts**: Recharts (for KPI dashboards)

### Admin Dashboard
- **Framework**: React + TypeScript
- **Admin Library**: Refine (rapid CRUD interface)
- **Authentication**: JWT + Role-based access control
- **Real-time Updates**: Supabase realtime subscriptions

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime
- **File Storage**: Supabase Storage (for receipts, contracts)

### Payments
- **Paystack API** - Card & International payments
- **Hubtel API** - MTN MoMo, Vodafone Cash, AirtelTigo

### Hosting
- **Frontend**: Vercel (Next.js optimized)
- **Admin**: Vercel or AWS Amplify
- **Database**: Supabase Cloud

---

## Getting Started

### For Developers

```bash
# Clone repository

cd winnersgoldhotel

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev

# Build for production
npm run build

# Run admin dashboard
npm run dev:admin
```

### For Guests

1. Visit [www.winnersgoldhotel.com](https://www.winnersgoldhotel.com)
2. Browse available dates and room types
3. Add tour preferences (optional)
4. Proceed to secure checkout
5. Receive confirmation email with booking details

---

## Contact & Support

**General Inquiries:**
- 📞 +233 241 XXX XXX
- 📧 info@winnersgoldhotel.com
- 🌐 www.winnersgoldhotel.com

**Bookings:**
- 📞 +233 244 XXX XXX
- 📧 bookings@winnersgoldhotel.com

**Group/Conference Bookings:**
- 📧 groups@winnersgoldhotel.com

---

## License & Copyright

© 2024 Winners Gold Hotel. All rights reserved.

**Developed by:** Senior Project & Software Engineering Team

---

**Last Updated:** February 2026

