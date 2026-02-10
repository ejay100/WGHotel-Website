# Conference Room Booking System - Quick Reference

## Overview
Winners Gold Hotel now includes a complete Conference Room Booking System with an Executive Conference Room featuring HD projector, sound system, and full event management capabilities.

---

## Conference Room Specifications

### Executive Conference Room
- **Capacity:** 150 people
- **Hours:** 8:00 AM - 10:00 PM daily
- **Base Rate:** $100/hour or $600/full day

### Equipment Included
✓ HD Projector  
✓ Wireless Screen Sharing  
✓ Professional Sound System  
✓ Whiteboard  
✓ Air Conditioning  
✓ High-Speed WiFi  
✓ Video Conferencing Setup  
✓ Podium  
✓ Tables & Chairs (150 capacity)

---

## Booking Packages

| Package | Duration | Price | Best For |
|---------|----------|-------|----------|
| **Hourly** | Per hour | $100/hour | Short meetings, interviews |
| **Half Day** | 4 hours | $400 | Workshops, training sessions |
| **Full Day** | 8+ hours | $600 | Conferences, seminars, AGMs |
| **Multi-Day** | Multiple days | $600/day | Multi-day events, retreats |

---

## Additional Services

### Catering Service
- **Cost:** $15 per person
- **Includes:** Light refreshments, beverages, snacks
- **Custom Menus:** Available on request
- **Setup:** Included with service

---

## API Endpoints

### 1. Create Conference Booking
```http
POST /api/conference
Content-Type: application/json

{
  "contact_name": "John Doe",
  "contact_email": "john@example.com",
  "contact_phone": "+233 24 555 1234",
  "organization": "ABC Company",
  "event_type": "Annual Conference",
  "booking_date": "2026-03-15",
  "start_time": "09:00",
  "end_time": "17:00",
  "expected_attendees": 120,
  "package_type": "full_day",
  "requires_projector": true,
  "requires_catering": true,
  "special_requirements": "Need parking for 30 vehicles",
  "payment_method": "bank_transfer"
}
```

**Response:**
```json
{
  "success": true,
  "booking": { /* booking details */ },
  "bookingReference": "CONF702856XYZ123",
  "message": "Conference room booked successfully for 2026-03-15"
}
```

### 2. Check Availability
```http
GET /api/conference?checkAvailability=true&date=2026-03-15
```

**Response:**
```json
{
  "date": "2026-03-15",
  "isAvailable": true,
  "bookedSlots": [
    {
      "booking_date": "2026-03-15",
      "start_time": "09:00",
      "end_time": "12:00"
    }
  ],
  "conferenceRoom": { /* room details */ }
}
```

### 3. List Conference Bookings
```http
GET /api/conference
GET /api/conference?email=john@example.com
```

### 4. Get Specific Booking
```http
GET /api/conference/[booking-id]
```

### 5. Update Booking
```http
PUT /api/conference/[booking-id]
Content-Type: application/json

{
  "status": "confirmed",
  "payment_status": "completed",
  "special_requirements": "Updated requirements"
}
```

### 6. Cancel Booking
```http
DELETE /api/conference/[booking-id]
```

---

## Frontend Component Usage

### Import the Component
```tsx
import ConferenceBookingForm from '@/components/ConferenceBookingForm';
```

### Use in Your Page
```tsx
<ConferenceBookingForm
  onSuccess={(booking) => {
    console.log('Booking created:', booking);
    // Handle success (e.g., show confirmation, redirect)
  }}
  onClose={() => {
    // Handle close (e.g., close modal)
  }}
/>
```

---

## Client API Functions

### Fetch Conference Bookings
```typescript
import { fetchConferenceBookings } from '@/lib/client';

const result = await fetchConferenceBookings();
// Or filter by email:
const result = await fetchConferenceBookings('user@example.com');

if (result.success) {
  console.log('Bookings:', result.data);
}
```

### Create Conference Booking
```typescript
import { createConferenceBooking } from '@/lib/client';

const bookingData = {
  contact_name: 'Jane Doe',
  contact_email: 'jane@example.com',
  // ... other fields
};

const result = await createConferenceBooking(bookingData);
if (result.success) {
  console.log('Booking created:', result.data);
} else {
  console.error('Error:', result.error);
}
```

### Check Availability
```typescript
import { checkConferenceAvailability } from '@/lib/client';

const result = await checkConferenceAvailability('2026-03-15');
if (result.success && result.data.isAvailable) {
  console.log('Room is available!');
}
```

---

## Database Schema

### Conference Bookings Table
```sql
CREATE TABLE conference_bookings (
  id UUID PRIMARY KEY,
  contact_name VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(20) NOT NULL,
  organization VARCHAR(255) NOT NULL,
  event_type VARCHAR(100) NOT NULL,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  duration_hours DECIMAL(4, 2) NOT NULL,
  expected_attendees INT NOT NULL,
  package_type VARCHAR(50) NOT NULL,
  base_price DECIMAL(10, 2) NOT NULL,
  catering_cost DECIMAL(10, 2) DEFAULT 0,
  total_amount DECIMAL(10, 2) NOT NULL,
  requires_projector BOOLEAN DEFAULT true,
  requires_catering BOOLEAN DEFAULT false,
  special_requirements TEXT,
  payment_status VARCHAR(50) NOT NULL,
  payment_method VARCHAR(50),
  status VARCHAR(50) NOT NULL,
  booking_reference VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

To set up the database:
1. Go to Supabase SQL Editor
2. Run the SQL from `docs/conference-schema.sql`

---

## Mock Data

The system includes sample conference bookings for testing:

### Sample Booking 1
- **Organization:** Ghana Business Association
- **Event:** Annual General Meeting
- **Date:** February 15, 2026
- **Attendees:** 120 people
- **Package:** Full Day
- **Total:** $2,400 (includes catering)

### Sample Booking 2
- **Organization:** Techiman Community Church
- **Event:** Leadership Workshop
- **Date:** February 8, 2026
- **Attendees:** 50 people
- **Package:** Half Day
- **Total:** $400 (no catering)

---

## Validation Rules

### Contact Information
- Name: Minimum 2 characters
- Email: Valid email format
- Phone: Valid phone number format

### Event Details
- Event Type: Required, minimum 2 characters
- Expected Attendees: 1-150 people
- Organization: Required, minimum 2 characters

### Date & Time
- Booking Date: Must be today or future date
- Start Time: Valid time format (HH:MM)
- End Time: Must be after start time
- Hours: 8:00 AM - 10:00 PM

### Package Types
- `hourly` - Hourly Rental
- `half_day` - Half Day (4 hours)
- `full_day` - Full Day (8+ hours)
- `multi_day` - Multi-Day Event

---

## Features

### Automatic Conflict Detection
The system automatically checks for booking conflicts:
- Prevents double-booking the conference room
- Checks overlapping time slots
- Returns clear error messages

### Dynamic Pricing
Prices are calculated based on:
- Selected package type
- Duration in hours
- Number of attendees (for catering)
- Additional services requested

### Availability Checking
- Real-time availability verification
- Shows booked time slots for selected date
- Visual feedback on room availability

---

## Payment Methods

The following payment methods are supported:
- Bank Transfer
- MTN Mobile Money
- Vodafone Cash
- Credit/Debit Card (Paystack)
- Cash at Hotel

---

## Status Tracking

### Booking Status
- `confirmed` - Booking confirmed, awaiting event
- `cancelled` - Booking cancelled
- `completed` - Event completed

### Payment Status
- `pending` - Payment not yet received
- `completed` - Payment received
- `refunded` - Payment refunded

---

## Admin Dashboard Integration

Conference bookings can be viewed and managed from the admin dashboard:
- View all conference bookings
- Check upcoming events
- Monitor payment status
- Generate revenue reports
- Track room utilization

---

## Testing

### Test with Mock Data
The system works immediately with built-in mock data. No Supabase setup required for testing.

### Test API Endpoints
```bash
# Check availability
curl http://localhost:3000/api/conference?checkAvailability=true&date=2026-03-15

# List bookings
curl http://localhost:3000/api/conference

# Create booking (use POST with JSON body)
```

---

## Production Setup

1. **Database Setup**
   - Run `docs/conference-schema.sql` in Supabase SQL Editor
   - Verify table creation

2. **Environment Variables**
   - No additional env vars needed
   - Uses existing Supabase credentials

3. **Testing**
   - Test with mock data first
   - Verify API endpoints
   - Test booking flow end-to-end

4. **Go Live**
   - All features ready for production
   - Auto conflict detection active
   - Payment integration ready

---

## Support & Documentation

- **Main Documentation:** README.md
- **API Reference:** docs/API.md
- **Database Schema:** docs/database-schema.sql
- **Conference Schema:** docs/conference-schema.sql

---

**Last Updated:** February 1, 2026  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
