# MLAN Engineering — Company Website

A self-contained marketing website for **MLAN Engineering Ltd**, built from the
company profile PDF. Plain HTML + Tailwind CSS + vanilla JavaScript — no
frameworks, no build step required to run it.

## Run it

Just open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Structure

```
index.html                 – all page markup & content
assets/css/styles.css      – design tokens, blueprint motifs, animations
assets/css/tailwind.css    – compiled Tailwind output (already built, don't hand-edit)
assets/css/tailwind-input.css – Tailwind's @tailwind directives (source)
assets/js/script.js        – theme toggle, nav, reveal animations, gallery filter,
                              accordion, lightbox, contact form
assets/fonts/              – self-hosted Space Grotesk / Inter / JetBrains Mono
assets/img/                – photos & renders extracted from the company profile
tailwind.config.js         – brand colors (gold/ink/paper) & font families
package.json               – Tailwind build scripts
```

## Editing content

All copy lives directly in `index.html` — sections are labelled with HTML
comments (`<!-- === SERVICES === -->` etc.) matching the original company
profile's chapters (Introduction, Mission/Vision/Values, Services, Team,
Organizational Structure, Certifications, Projects, CSR, Contact).

## Editing styles / adding Tailwind classes

If you add new Tailwind utility classes to `index.html` that aren't already
compiled into `assets/css/tailwind.css`, rebuild it:

```
npm install          # first time only
npm run build:css    # one-off build
npm run watch:css     # rebuild automatically while you edit
```

Brand colors and fonts are defined once in `tailwind.config.js`
(`gold`, `ink`, `paper`, `bone`) and in the CSS custom properties at the top
of `assets/css/styles.css` (used for the dark/light theme swap).

## Dark / light mode

Toggled by the switch in the header. The choice is remembered per browser
(`localStorage`) and falls back to the visitor's OS preference on first
visit. No page reload needed — colors are driven by CSS variables that swap
when the `dark` class is toggled on `<html>`.

## Contact form

The form has no backend. On submit it opens the visitor's email client via a
`mailto:` link, pre-filled with their message, addressed to
`mlanengineeringltd@gmail.com`. Nothing is stored or sent silently.

## Images

Photos and 3D structural renders were extracted directly from the supplied
company profile PDF (`M_LAN_Engineering_Company_Profile_13.pdf`) — they are
MLAN Engineering's own project photography, not stock imagery.
