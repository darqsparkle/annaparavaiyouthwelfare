# Annapparavai Ilaignar Nalasangam — Website

A modern, responsive, bilingual (English / Tamil) website for **அன்னப்பறவை இளைஞர் நலச்சங்கம்** (Annapparavai Youth Welfare Association), S. Sankaralingapuram, Madurai District.

Built with React (Vite), Tailwind CSS, React Router, i18next and Framer Motion.

## Quick Start

```bash
npm install
npm run dev       # start local dev server (usually http://localhost:5173)
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

Requires Node.js 18+.

## Project Structure

```
src/
├── assets/
│   ├── logo.png              # organisation seal/logo
│   ├── banner.png             # letterhead banner
│   ├── documents/             # ← REPLACE these placeholder PDFs with the real files
│   └── images/
│       ├── gallery/            # ← REPLACE with real activity photos (keep filenames or update data/gallery.js)
│       └── members/            # ← REPLACE with real committee member photos
├── components/                # reusable UI building blocks
├── pages/                     # Home, Activities, Contact
├── data/                      # members.js, gallery.js, documents.js (image/PDF imports)
├── locales/
│   ├── en.json                 # all English text
│   └── ta.json                 # all Tamil text
├── i18n.js                     # i18next setup (local JSON only, no API)
├── App.jsx / main.jsx
└── index.css                   # Tailwind theme tokens, brand gradient, fonts
```

## Updating Content — No Code Changes Needed

**Text (English & Tamil):** edit `src/locales/en.json` and `src/locales/ta.json`. Every visible string on the site lives in these two files, with matching keys so both languages stay in sync.

**Committee members (17):** edit the `placeholderNames` array in `src/data/members.js`, and edit `committee.roles` in the locale files for titles. Replace the photos in `src/assets/images/members/` (same filenames) with real headshots — square images work best.

**Activities gallery (10 photos):** replace the images in `src/assets/images/gallery/` (same filenames), and edit `activities.items` in the locale files for the matching titles/descriptions. The image at position *N* pairs with `activities.items[N]`.

**Official documents:** replace the PDFs in `src/assets/documents/` (same filenames) with the real signed/scanned documents. Update file sizes and dates in `documents.items` in the locale files. No code changes required — the download buttons already point to these files.

**Founders:** edit `founders.members` in the locale files.

**Logo / banner:** replace `src/assets/logo.png` and `src/assets/banner.png`.

## Placeholder Content Notice

Everything currently in the site is **placeholder content** generated for structure and layout purposes:
- Committee member photos are generic silhouette avatars, and names are placeholders — replace with real members.
- Gallery photos are generated colour-block placeholders — replace with real activity photos.
- The 6 PDF documents are placeholder files with a cover page only — replace with the actual registration certificate, annual report, etc.
- Social media links in the footer/contact page point to `#` — update with your real profile URLs.
- The contact form currently only simulates sending (see the `NOTE` comment in `src/components/ContactForm.jsx`) — connect it to a service like Formspree, EmailJS, or your own backend endpoint to actually receive messages.
- The embedded map uses a text-based location query (Peraiyur, Madurai District) since there's no exact GPS pin yet — for a precise pin, replace the `MAP_QUERY` in `src/pages/Contact.jsx` with your exact coordinates or full address.

## Language Switching

The navbar language switcher (English | தமிழ்) toggles `i18next`'s active language and saves the choice to `localStorage` (`appLanguage` key), so it persists across visits. `<html lang>` is kept in sync automatically so Tamil pages load Tamil-optimised fonts (Hind Madurai / Noto Sans Tamil) while English pages use Playfair Display / Inter.

## Design System

Colors, fonts and the signature maroon/green gradient text effect are defined once in `src/index.css` under `@theme` (Tailwind v4's CSS-first config) — update hex values there to re-theme the whole site consistently.

## Deployment

This is a static site after `npm run build` (output in `dist/`). It can be deployed to Netlify, Vercel, GitHub Pages, or any static host. Since routes are client-side (React Router), configure your host to redirect all paths to `index.html` (a SPA fallback rule) — most static hosts have a one-line setting for this.
