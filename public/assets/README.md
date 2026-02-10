Asset drop zone for static files (images, icons, videos).

Naming guidance:
- Use kebab-case with context first: e.g., hero-lobby.jpg, room-deluxe-queen.jpg, amenity-breakfast.svg.
- Group by feature when helpful: hero/, rooms/, amenities/, admin/, marketing/.
- Prefer SVG for illustrations and PNG/JPG/WebP for photos.
- Keep raw/originals separately if needed (e.g., originals/), and commit optimized versions here.

Usage:
- Reference assets with absolute paths like `/assets/rooms/room-deluxe-queen.jpg`.
- Centralized TS exports live in src/assets/index.ts to keep imports consistent.
