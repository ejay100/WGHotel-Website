-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'manager', 'receptionist', 'guest')),
  status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
);

-- Rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_number VARCHAR(50) UNIQUE NOT NULL,
  room_type VARCHAR(50) NOT NULL CHECK (room_type IN ('standard', 'executive', 'presidential', 'chalet')),
  building VARCHAR(50) NOT NULL CHECK (building IN ('main', 'chalet')),
  capacity INT NOT NULL,
  price_per_night DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('available', 'occupied', 'maintenance')) DEFAULT 'available',
  amenities JSON DEFAULT '[]'::json,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_room_type (room_type),
  INDEX idx_status (status),
  INDEX idx_building (building)
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE RESTRICT,
  guest_name VARCHAR(255) NOT NULL,
  guest_email VARCHAR(255) NOT NULL,
  guest_phone VARCHAR(20) NOT NULL,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  total_nights INT NOT NULL,
  base_price DECIMAL(10, 2) NOT NULL,
  tour_addon_price DECIMAL(10, 2) DEFAULT 0,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_status VARCHAR(50) NOT NULL CHECK (payment_status IN ('pending', 'completed', 'refunded')) DEFAULT 'pending',
  payment_method VARCHAR(50),
  status VARCHAR(50) NOT NULL CHECK (status IN ('confirmed', 'cancelled', 'checked_in', 'checked_out')) DEFAULT 'confirmed',
  tour_preference VARCHAR(100),
  special_requests TEXT,
  booking_reference VARCHAR(50) UNIQUE NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_room_id (room_id),
  INDEX idx_guest_email (guest_email),
  INDEX idx_check_in_date (check_in_date),
  INDEX idx_payment_status (payment_status),
  INDEX idx_status (status)
);

-- Discount codes table
CREATE TABLE IF NOT EXISTS discount_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_percent DECIMAL(5, 2),
  discount_amount DECIMAL(10, 2),
  valid_from DATE NOT NULL,
  valid_until DATE NOT NULL,
  max_uses INT,
  current_uses INT DEFAULT 0,
  min_booking_amount DECIMAL(10, 2),
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_code (code),
  INDEX idx_is_active (is_active)
);

-- Audit logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(255) NOT NULL,
  resource_type VARCHAR(100) NOT NULL,
  resource_id UUID,
  changes JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  status VARCHAR(50) DEFAULT 'success',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_action (action),
  INDEX idx_resource_type (resource_type),
  INDEX idx_created_at (created_at)
);

-- Payment transactions table
CREATE TABLE IF NOT EXISTS payment_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  transaction_reference VARCHAR(255) UNIQUE,
  status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'success', 'failed', 'refunded')) DEFAULT 'pending',
  response_data JSONB,
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_booking_id (booking_id),
  INDEX idx_transaction_reference (transaction_reference),
  INDEX idx_status (status)
);

-- Guest reviews table
CREATE TABLE IF NOT EXISTS guest_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  cleanliness_rating INT CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
  staff_rating INT CHECK (staff_rating >= 1 AND staff_rating <= 5),
  value_rating INT CHECK (value_rating >= 1 AND value_rating <= 5),
  would_recommend BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_booking_id (booking_id),
  INDEX idx_rating (rating)
);

-- Row Level Security Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Admin can see all users
CREATE POLICY admin_view_users ON users FOR SELECT
  USING (
    auth.uid()::uuid IN (SELECT id FROM users WHERE role = 'admin')
  );

-- Manager can see booking-related data
CREATE POLICY manager_view_bookings ON bookings FOR SELECT
  USING (
    auth.uid()::uuid IN (SELECT id FROM users WHERE role IN ('admin', 'manager'))
  );

-- Receptionist can view and create bookings
CREATE POLICY receptionist_manage_bookings ON bookings FOR ALL
  USING (
    auth.uid()::uuid IN (SELECT id FROM users WHERE role IN ('admin', 'manager', 'receptionist'))
  );

-- Create indexes for performance
CREATE INDEX idx_bookings_check_in_out ON bookings(room_id, check_in_date, check_out_date);
CREATE INDEX idx_bookings_payment ON bookings(payment_status, created_at);
CREATE INDEX idx_rooms_availability ON rooms(status, room_type);

-- Create a trigger to update room status when booking is made
CREATE OR REPLACE FUNCTION update_room_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'checked_in' THEN
    UPDATE rooms SET status = 'occupied' WHERE id = NEW.room_id;
  ELSIF NEW.status = 'checked_out' AND OLD.status = 'checked_in' THEN
    UPDATE rooms SET status = 'available' WHERE id = NEW.room_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER booking_room_status_trigger
AFTER UPDATE ON bookings
FOR EACH ROW
EXECUTE FUNCTION update_room_status();

-- Log all changes to audit table
CREATE OR REPLACE FUNCTION log_audit()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (
    user_id,
    action,
    resource_type,
    resource_id,
    changes
  ) VALUES (
    auth.uid()::uuid,
    TG_ARGV[0],
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    jsonb_build_object('old', to_jsonb(OLD), 'new', to_jsonb(NEW))
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW EXECUTE FUNCTION log_audit('USER_CHANGE');

CREATE TRIGGER bookings_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON bookings
FOR EACH ROW EXECUTE FUNCTION log_audit('BOOKING_CHANGE');

CREATE TRIGGER discount_codes_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON discount_codes
FOR EACH ROW EXECUTE FUNCTION log_audit('DISCOUNT_CODE_CHANGE');
