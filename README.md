# Drivehouse showcase

A polished, front-end-only dealership experience that showcases an inventory of luxury vehicles with concierge-level
branding. It includes:

- A modern landing page with featured vehicles, concierge services, and testimonials.
- A fully interactive inventory page with search, filtering, sorting, and grid/list view toggles.
- An owner-only admin console that hides the quick-add form behind a private passphrase and stores custom vehicles in
  `localStorage` for instant previewing.

## Getting started

This project is framework-free—just open the HTML files in a browser:

```bash
# from the repository root
python -m http.server 8000
# visit http://localhost:8000/index.html
```

The same approach works with any static file server.

## Owner console

Open `admin.html` to access the owner console. The default passphrase is defined in `scripts/admin.js` via the
`ADMIN_PASSWORD` constant. Update that value to something unique so only you can add inventory.

Custom listings are saved to `localStorage`. They display immediately on `inventory.html`, can be removed from the admin
console, and persist in the browser where you added them.
