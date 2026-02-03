import * as dotenv from 'dotenv';
import { sql } from './db';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

export async function seedRooms() {
  try {
    console.log('Seeding rooms data...');

    // Check if rooms already exist
    const existingRooms = await sql`SELECT COUNT(*) as count FROM rooms`;
    
    if (existingRooms[0].count > 0) {
      console.log('Rooms already exist, skipping seed');
      return;
    }

    // Insert sample rooms
    await sql`
      INSERT INTO rooms (room_number, room_type, building, capacity, price_per_night, status, amenities)
      VALUES
        ('101', 'standard', 'main', 2, 250, 'available', '["WiFi", "Air Conditioning", "TV", "Mini Fridge"]'::json),
        ('102', 'standard', 'main', 2, 250, 'available', '["WiFi", "Air Conditioning", "TV", "Mini Fridge"]'::json),
        ('103', 'standard', 'main', 2, 250, 'available', '["WiFi", "Air Conditioning", "TV", "Mini Fridge"]'::json),
        ('201', 'executive', 'main', 3, 400, 'available', '["WiFi", "Air Conditioning", "TV", "Mini Fridge", "Work Desk", "Balcony"]'::json),
        ('202', 'executive', 'main', 3, 400, 'available', '["WiFi", "Air Conditioning", "TV", "Mini Fridge", "Work Desk", "Balcony"]'::json),
        ('203', 'executive', 'main', 3, 400, 'available', '["WiFi", "Air Conditioning", "TV", "Mini Fridge", "Work Desk", "Balcony"]'::json),
        ('301', 'presidential', 'main', 4, 750, 'available', '["WiFi", "Air Conditioning", "Smart TV", "Mini Bar", "Work Desk", "Balcony", "Jacuzzi", "Living Room"]'::json),
        ('C1', 'chalet', 'chalet', 6, 1200, 'available', '["WiFi", "Air Conditioning", "Full Kitchen", "Living Room", "Dining Area", "Private Parking", "Garden View"]'::json),
        ('C2', 'chalet', 'chalet', 6, 1200, 'available', '["WiFi", "Air Conditioning", "Full Kitchen", "Living Room", "Dining Area", "Private Parking", "Garden View"]'::json),
        ('C3', 'chalet', 'chalet', 8, 1500, 'available', '["WiFi", "Air Conditioning", "Full Kitchen", "Living Room", "Dining Area", "Private Parking", "Garden View", "BBQ Grill"]'::json)
    `;

    console.log('✓ Rooms seeded successfully');

    // Insert sample discount codes
    const discountCount = await sql`SELECT COUNT(*) as count FROM discount_codes`;
    
    if (discountCount[0].count === 0) {
      console.log('Seeding discount codes...');
      
      await sql`
        INSERT INTO discount_codes (code, description, discount_percent, valid_from, valid_until, max_uses, is_active)
        VALUES
          ('WELCOME2026', 'New customer welcome discount', 10.00, '2026-01-01', '2026-12-31', 100, true),
          ('SUMMER25', 'Summer vacation special', 15.00, '2026-06-01', '2026-08-31', 50, true),
          ('LONGSTAY', 'Discount for stays over 5 nights', 20.00, '2026-01-01', '2026-12-31', null, true)
      `;
      
      console.log('✓ Discount codes seeded successfully');
    }

    console.log('✓ Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Run if executed directly
if (require.main === module) {
  seedRooms()
    .then(() => {
      console.log('Seed completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seed failed:', error);
      process.exit(1);
    });
}
