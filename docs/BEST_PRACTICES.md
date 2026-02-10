# Winners Gold Hotel - Codebase Best Practices & Refactoring Guide

## Overview
This document outlines the coding standards, best practices, and refactoring decisions applied to the Winners Gold Hotel codebase.

---

## 1. Project Structure

### Recommended Organization
```
src/
├── admin/           # Admin dashboard components
├── components/      # Shared UI components
├── lib/             # Utilities, constants, helpers
├── pages/           # Next.js pages and API routes
│   ├── api/         # API endpoints
│   └── admin/       # Admin pages
└── styles/          # Global styles
```

### Naming Conventions
- **Components**: PascalCase (e.g., `BookingManagement.tsx`)
- **Utilities**: camelCase (e.g., `helpers.ts`, `currency.ts`)
- **Types/Interfaces**: PascalCase with descriptive names
- **Constants**: SCREAMING_SNAKE_CASE for static values

---

## 2. Component Best Practices

### State Management
```tsx
// ✅ Good: Use useState with proper typing
const [bookings, setBookings] = useState<Booking[]>([]);

// ✅ Good: Use useMemo for computed values
const roomsByFloor = useMemo(() => {
  const grouped: Record<number, Room[]> = {};
  rooms.forEach(room => { /* ... */ });
  return grouped;
}, [rooms]);

// ✅ Good: Use useCallback for handlers passed to children
const handleBookNow = useCallback((roomType: string) => {
  router.push(`/booking?room=${roomType}`);
}, [router]);
```

### Props Interface Pattern
```tsx
// ✅ Good: Define interfaces above component
interface BookingCalendarProps {
  rooms: Array<Room>;
  onDateRangeSelect?: (startDate: string, endDate: string, roomIds: string[]) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ rooms, onDateRangeSelect }) => {
  // ...
};
```

### Avoid Unused Imports
```tsx
// ❌ Bad: Importing unused components
import { Filter, Trash2, unused } from 'lucide-react';

// ✅ Good: Only import what you use
import { Search, RefreshCw } from 'lucide-react';
```

---

## 3. Styling Best Practices (Tailwind CSS)

### Search Bar Pattern
```tsx
// ✅ Good: Proper icon spacing with search input
<div className="relative">
  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
  <input
    type="text"
    placeholder="Search..."
    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg"
  />
</div>
```

Key points:
- Use `left-4` (16px) for icon positioning
- Use `pl-12` (48px) for input padding to prevent overlap
- Keep placeholder text concise

### Status Color Configuration
```tsx
// ✅ Good: Centralized status configuration
const statusConfig = {
  available: { 
    bg: 'bg-emerald-500', 
    light: 'bg-emerald-50', 
    border: 'border-emerald-400', 
    text: 'text-emerald-700',
    icon: CheckCircle 
  },
  occupied: { /* ... */ },
  maintenance: { /* ... */ },
};
```

### Responsive Grid Patterns
```tsx
// ✅ Good: Mobile-first responsive grid
<div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-11 gap-2">
  {/* Room tiles */}
</div>
```

---

## 4. Room Status Display Best Practices

### Visual Hierarchy
1. **Stats Header**: Show key metrics prominently at top
2. **Legend**: Clear color/status mapping before the grid
3. **Grid View**: Compact tiles for overview
4. **Floor View**: Grouped by floor for spatial context
5. **Action Bar**: Selected items with clear CTAs

### Selection Feedback
```tsx
// ✅ Good: Clear visual feedback for selected items
className={`
  ${isSelected 
    ? 'bg-blue-600 text-white ring-4 ring-blue-300 scale-110 z-10' 
    : `${config.light} ${config.text} ${config.border} border-2`
  }
`}
```

---

## 5. Landing Page Design Principles

### Minimal Design Guidelines
1. **Hero Section**: Full-screen with clear CTA buttons
2. **Navigation**: Fixed top nav with smooth scroll links
3. **Sections**: Clear separation with section IDs for anchor links
4. **Content Hierarchy**: 
   - Hero → Rooms → Conference → Heritage → Contact → Footer
5. **Mobile First**: Responsive design with mobile menu

### Image Best Practices
```tsx
// ✅ Good: Professional conference room image
const CONFERENCE_IMAGE = 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1600&q=80';
```

Choose images that:
- Are high-resolution (1600px+ width)
- Match the professional tone
- Load optimized formats (webp/avif when possible)

---

## 6. Performance Optimizations

### Lazy Loading
- Use `next/image` for optimized image loading
- Implement intersection observer for below-fold content

### Memoization
```tsx
// ✅ Good: Memoize expensive computations
const filteredBookings = useMemo(() => 
  bookings.filter(booking => /* ... */),
  [bookings, searchTerm, statusFilter]
);
```

### Effect Cleanup
```tsx
// ✅ Good: Clean up intervals/subscriptions
useEffect(() => {
  const interval = setInterval(() => setIndex(prev => (prev + 1) % length), 6000);
  return () => clearInterval(interval);
}, [length]);
```

---

## 7. API Route Structure

### REST Conventions
```
GET    /api/bookings          - List all bookings
POST   /api/bookings          - Create booking
GET    /api/bookings/[id]     - Get single booking
PUT    /api/bookings/[id]     - Update booking
DELETE /api/bookings/[id]     - Delete booking
```

### Error Handling
```tsx
// ✅ Good: Consistent error response format
return res.status(400).json({
  success: false,
  error: 'Validation failed',
  message: 'Room is not available for selected dates'
});
```

---

## 8. TypeScript Best Practices

### Type Definitions
```tsx
// ✅ Good: Explicit status union types
type RoomStatus = 'available' | 'occupied' | 'maintenance' | 'cleaning';
type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'checked-in' | 'checked-out';
```

### Avoid `any`
```tsx
// ❌ Bad
const data: any = await response.json();

// ✅ Good
interface ApiResponse { success: boolean; data: Booking[] }
const data = await response.json() as ApiResponse;
```

---

## 9. Component Checklist

Before shipping any component:

- [ ] No unused imports
- [ ] Proper TypeScript types (no `any`)
- [ ] Responsive design tested
- [ ] Accessibility (keyboard navigation, ARIA labels)
- [ ] Loading states handled
- [ ] Error states handled
- [ ] Empty states handled
- [ ] Consistent color scheme with design system

---

## 10. Files Refactored

| File | Changes |
|------|---------|
| `BookingManagement.tsx` | Fixed search bar spacing (pl-10 → pl-12), shortened placeholder |
| `RoomManagement.tsx` | Fixed search bar spacing, removed unused imports |
| `ConferenceManagement.tsx` | Fixed search bar spacing, removed unused imports |
| `BookingCalendar.tsx` | Complete redesign with floor view, better stats display, view toggle |

---

## Future Improvements

1. **State Management**: Consider Zustand or React Query for complex state
2. **Testing**: Add unit tests with Jest and React Testing Library
3. **Accessibility**: Full WCAG 2.1 AA compliance audit
4. **Internationalization**: Add i18n support for multi-language
5. **Analytics**: Integrate usage tracking for admin features
6. **Real-time Updates**: WebSocket integration for live room status

---

*Last Updated: February 2026*
