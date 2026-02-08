# Winners Gold Hotel - API Documentation

## Guest Booking API

### POST /api/bookings/create
Create a new booking

**Request:**
```json
{
  "guest_name": "John Doe",
  "guest_email": "john@example.com",
  "guest_phone": "+233 241 123 456",
  "check_in_date": "2024-03-15",
  "check_out_date": "2024-03-18",
  "room_id": "uuid",
  "room_type": "standard",
  "tour_preference": "kintampo",
  "payment_method": "paystack",
  "special_requests": "High floor, quiet room"
}
```

**Response:**
```json
{
  "success": true,
  "booking": {
    "id": "uuid",
    "booking_reference": "WGH0315A2C3K",
    "total_amount": 1250.00,
    "payment_url": "https://paystack.com/pay/...",
    "status": "pending"
  }
}
```

### GET /api/availability
Check room availability for dates

**Query Parameters:**
- `check_in_date`: YYYY-MM-DD
- `check_out_date`: YYYY-MM-DD
- `room_type`: optional (standard, executive, presidential, chalet)

**Response:**
```json
{
  "available_rooms": [
    {
      "id": "uuid",
      "room_number": "101",
      "type": "standard",
      "price": 250,
      "capacity": 2,
      "amenities": ["AC", "WiFi", "TV", "Ensuite"]
    }
  ],
  "total_available": 12
}
```

### GET /api/tours
Get available tours

**Response:**
```json
{
  "tours": [
    {
      "key": "kintampo",
      "name": "Kintampo Falls",
      "distance": "35 mins",
      "price": 50,
      "description": "Natural pools and hiking trails"
    }
  ]
}
```

## Admin API

### Authentication
All admin endpoints require JWT token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

### POST /api/admin/auth/login
Admin login

**Request:**
```json
{
  "email": "admin@winnersgoldhotel.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "admin@winnersgoldhotel.com",
    "role": "admin",
    "full_name": "Hotel Admin"
  },
  "token": "eyJhbGc...",
  "expires_in": 604800
}
```

### GET /api/admin/dashboard/stats
Get dashboard KPI metrics

**Response:**
```json
{
  "occupancy_rate": 78.5,
  "rooms_occupied": 35,
  "total_rooms": 44,
  "total_revenue": 45000.00,
  "pending_bookings": 8,
  "guest_satisfaction": 4.6,
  "revenue_per_room": 1022.73
}
```

### GET /api/admin/bookings
List all bookings with filters

**Query Parameters:**
- `page`: 1
- `limit`: 20
- `status`: confirmed, cancelled, checked_in, checked_out
- `payment_status`: pending, completed, refunded
- `date_from`: YYYY-MM-DD
- `date_to`: YYYY-MM-DD

**Response:**
```json
{
  "bookings": [
    {
      "id": "uuid",
      "booking_reference": "WGH0115A2C3K",
      "guest_name": "John Doe",
      "guest_email": "john@example.com",
      "room_number": "205",
      "check_in_date": "2024-03-15",
      "check_out_date": "2024-03-18",
      "total_amount": 1250.00,
      "payment_status": "completed",
      "status": "confirmed",
      "created_at": "2024-02-01T14:23:00Z"
    }
  ],
  "total": 156,
  "pages": 8
}
```

### POST /api/admin/bookings/{id}/check-in
Check in a guest

**Request:**
```json
{
  "processed_by": "receptionist_user_id",
  "notes": "Guest arrived early"
}
```

**Response:**
```json
{
  "success": true,
  "booking": {
    "id": "uuid",
    "status": "checked_in",
    "check_in_time": "2024-03-15T14:30:00Z"
  }
}
```

### POST /api/admin/bookings/{id}/refund
Process refund

**Request:**
```json
{
  "refund_reason": "Guest cancellation",
  "refund_amount": 625.00,
  "approved_by": "manager_user_id"
}
```

**Response:**
```json
{
  "success": true,
  "refund": {
    "id": "uuid",
    "booking_id": "uuid",
    "amount": 625.00,
    "status": "processed",
    "processed_at": "2024-02-01T15:00:00Z"
  }
}
```

### POST /api/admin/discount-codes
Create discount code

**Request:**
```json
{
  "code": "TECHFAIR2024",
  "discount_percent": 15,
  "valid_from": "2024-03-01",
  "valid_until": "2024-03-31",
  "max_uses": 100,
  "min_booking_amount": 500
}
```

**Response:**
```json
{
  "success": true,
  "code": {
    "id": "uuid",
    "code": "TECHFAIR2024",
    "discount_percent": 15,
    "created_by": "admin_user_id"
  }
}
```

### GET /api/admin/audit-logs
Get audit trail

**Query Parameters:**
- `user_id`: filter by user
- `action`: filter by action
- `date_from`: YYYY-MM-DD
- `date_to`: YYYY-MM-DD
- `limit`: 50

**Response:**
```json
{
  "logs": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "action": "BOOKING_CREATED",
      "resource_type": "booking",
      "resource_id": "uuid",
      "changes": {
        "old": null,
        "new": { "booking_id": "uuid", "guest": "John Doe" }
      },
      "ip_address": "192.168.1.1",
      "created_at": "2024-02-01T14:23:00Z"
    }
  ],
  "total": 1256
}
```

### GET /api/admin/reports/revenue
Get revenue report

**Query Parameters:**
- `period`: daily, weekly, monthly, yearly
- `date_from`: YYYY-MM-DD
- `date_to`: YYYY-MM-DD

**Response:**
```json
{
  "period": "monthly",
  "total_revenue": 45000.00,
  "by_room_type": {
    "standard": 15000,
    "executive": 12000,
    "presidential": 10000,
    "chalet": 8000
  },
  "by_source": {
    "individual_bookings": 35000,
    "group_bookings": 8000,
    "tour_addons": 2000
  },
  "chart_data": [
    { "date": "2024-02-01", "revenue": 1500 }
  ]
}
```

### POST /api/admin/users
Create new staff account

**Request:**
```json
{
  "email": "staff@winnersgoldhotel.com",
  "full_name": "Staff Member",
  "role": "receptionist",
  "temporary_password": "TempPass123!"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "staff@winnersgoldhotel.com",
    "role": "receptionist",
    "created_at": "2024-02-01T14:23:00Z"
  }
}
```

### GET /api/admin/rooms
List rooms with real-time status

**Response:**
```json
{
  "rooms": [
    {
      "id": "uuid",
      "room_number": "101",
      "room_type": "standard",
      "building": "main",
      "capacity": 2,
      "price_per_night": 250,
      "status": "available",
      "amenities": ["AC", "WiFi", "TV"],
      "last_occupied": "2024-02-01T11:30:00Z"
    }
  ],
  "summary": {
    "total": 44,
    "available": 32,
    "occupied": 8,
    "maintenance": 4
  }
}
```

## Error Handling

All endpoints return errors in format:
```json
{
  "success": false,
  "error": {
    "code": "BOOKING_CONFLICT",
    "message": "Room already booked for selected dates",
    "details": {}
  }
}
```

## Rate Limiting

- Public endpoints: 100 requests/hour
- Authenticated endpoints: 1000 requests/hour
- Payment endpoints: 10 requests/minute

## Response Headers

```
X-Request-ID: uuid
X-Response-Time: 145ms
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1643644800
```

---

**API Version:** 1.0.0
**Last Updated:** February 2026
