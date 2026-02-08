-- Add conference_bookings table for conference room rentals
CREATE TABLE IF NOT EXISTS conference_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_name VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(20) NOT NULL,
  organization VARCHAR(255) NOT NULL,
  event_type VARCHAR(100) NOT NULL,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  duration_hours DECIMAL(4, 2) NOT NULL,
  expected_attendees INT NOT NULL CHECK (expected_attendees >= 1 AND expected_attendees <= 150),
  package_type VARCHAR(50) NOT NULL CHECK (package_type IN ('hourly', 'half_day', 'full_day', 'multi_day')),
  base_price DECIMAL(10, 2) NOT NULL,
  catering_cost DECIMAL(10, 2) DEFAULT 0,
  total_amount DECIMAL(10, 2) NOT NULL,
  requires_projector BOOLEAN DEFAULT true,
  requires_catering BOOLEAN DEFAULT false,
  special_requirements TEXT,
  payment_status VARCHAR(50) NOT NULL CHECK (payment_status IN ('pending', 'completed', 'refunded')) DEFAULT 'pending',
  payment_method VARCHAR(50),
  status VARCHAR(50) NOT NULL CHECK (status IN ('confirmed', 'cancelled', 'completed')) DEFAULT 'confirmed',
  booking_reference VARCHAR(50) UNIQUE NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_contact_email (contact_email),
  INDEX idx_booking_date (booking_date),
  INDEX idx_status (status),
  INDEX idx_booking_reference (booking_reference)
);

-- Add audit trigger for conference bookings
CREATE TRIGGER conference_bookings_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON conference_bookings
FOR EACH ROW EXECUTE FUNCTION log_audit('CONFERENCE_BOOKING_CHANGE');

-- Create policy for conference bookings
CREATE POLICY admin_manager_view_conference ON conference_bookings FOR SELECT
  USING (
    auth.uid()::uuid IN (SELECT id FROM users WHERE role IN ('admin', 'manager'))
  );
