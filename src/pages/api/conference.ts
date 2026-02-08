import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import { ConferenceBookingSchema } from '@/lib/validators';
import { generateBookingReference } from '@/lib/helpers';
import { CONFERENCE_ROOM } from '@/lib/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET - List all conference bookings or check availability
  if (req.method === 'GET') {
    try {
      const { email, date, checkAvailability } = req.query;

      // Check availability for a specific date
      if (checkAvailability === 'true' && date) {
        const { data: bookings, error } = await supabase
          .from('conference_bookings')
          .select('booking_date, start_time, end_time')
          .eq('booking_date', date)
          .in('status', ['confirmed', 'completed']);

        if (error) {
          console.error('Database error:', error);
          return res.status(500).json({ error: 'Failed to check availability' });
        }

        return res.status(200).json({
          date,
          isAvailable: true,
          bookedSlots: bookings || [],
          conferenceRoom: CONFERENCE_ROOM,
        });
      }

      // List bookings (filtered by email if provided)
      let query = supabase
        .from('conference_bookings')
        .select('*')
        .order('booking_date', { ascending: true })
        .order('start_time', { ascending: true });

      if (email) {
        query = query.eq('contact_email', email);
      }

      const { data: bookings, error } = await query;

      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Failed to fetch conference bookings' });
      }

      return res.status(200).json(bookings || []);
    } catch (error) {
      console.error('API error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // POST - Create new conference booking
  if (req.method === 'POST') {
    try {
      // Handle new form structure
      const bookingData = req.body;
      
      // If using new form format (from ConferenceBookingForm), adapt it
      if (bookingData.organizationName && !bookingData.organization) {
        bookingData.organization = bookingData.organizationName;
        bookingData.contact_name = bookingData.contactPerson;
        bookingData.contact_email = bookingData.email;
        bookingData.contact_phone = bookingData.phone;
        bookingData.booking_date = bookingData.eventDate;
        bookingData.start_time = bookingData.startTime;
        bookingData.end_time = bookingData.endTime;
        bookingData.expected_attendees = bookingData.attendeeCount;
        bookingData.event_type = bookingData.eventType;
        bookingData.special_requirements = bookingData.specialRequests;
        bookingData.requires_catering = bookingData.cateringNeeded;
        bookingData.package_type = 'hourly';
        bookingData.payment_method = 'pending';
      }
      
      // Validate booking data
      const validatedData = ConferenceBookingSchema.parse(bookingData);

      // Calculate duration in hours
      const startTime = new Date(`2000-01-01T${validatedData.start_time}`);
      const endTime = new Date(`2000-01-01T${validatedData.end_time}`);
      const durationHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

      // Calculate price based on package type
      let basePrice = 0;
      switch (validatedData.package_type) {
        case 'hourly':
          basePrice = durationHours * CONFERENCE_ROOM.hourlyRate;
          break;
        case 'half_day':
          basePrice = CONFERENCE_ROOM.hourlyRate * 4;
          break;
        case 'full_day':
          basePrice = CONFERENCE_ROOM.dailyRate;
          break;
        case 'multi_day':
          basePrice = CONFERENCE_ROOM.dailyRate * Math.ceil(durationHours / 8);
          break;
      }

      // Add catering cost if requested (estimate $15 per person)
      const cateringCost = validatedData.requires_catering
        ? validatedData.expected_attendees * 15
        : 0;

      const totalAmount = basePrice + cateringCost;

      // Check for conflicts with existing bookings
      const { data: conflicts, error: conflictError } = await supabase
        .from('conference_bookings')
        .select('id')
        .eq('booking_date', validatedData.booking_date)
        .in('status', ['confirmed', 'completed'])
        .or(`and(start_time.lte.${validatedData.end_time},end_time.gte.${validatedData.start_time})`);

      if (conflictError) {
        console.error('Conflict check error:', conflictError);
      }

      if (conflicts && conflicts.length > 0) {
        return res.status(409).json({
          error: 'Conference room is not available for the selected time slot',
          conflicts,
        });
      }

      // Generate booking reference
      const bookingReference = generateBookingReference('CONF');

      // Create booking
      const { data: booking, error } = await supabase
        .from('conference_bookings')
        .insert([
          {
            contact_name: validatedData.contact_name,
            contact_email: validatedData.contact_email,
            contact_phone: validatedData.contact_phone,
            organization: validatedData.organization,
            event_type: validatedData.event_type,
            booking_date: validatedData.booking_date,
            start_time: validatedData.start_time,
            end_time: validatedData.end_time,
            duration_hours: durationHours,
            expected_attendees: validatedData.expected_attendees,
            package_type: validatedData.package_type,
            base_price: basePrice,
            catering_cost: cateringCost,
            total_amount: totalAmount,
            requires_projector: validatedData.requires_projector,
            requires_catering: validatedData.requires_catering,
            special_requirements: validatedData.special_requirements,
            payment_status: 'pending',
            payment_method: validatedData.payment_method,
            status: 'confirmed',
            booking_reference: bookingReference,
          },
        ])
        .select('*')
        .single();

      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Failed to create conference booking' });
      }

      return res.status(201).json({
        success: true,
        booking,
        bookingReference,
        message: `Conference room booked successfully for ${validatedData.booking_date}`,
      });
    } catch (error: any) {
      console.error('API error:', error);

      if (error.name === 'ZodError') {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors,
        });
      }

      return res.status(500).json({ error: 'Failed to create conference booking' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
