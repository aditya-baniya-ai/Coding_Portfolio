# Aaditya Baniya — Software + AI

Live portfolio: https://adityabaniya.netlify.app/

Next.js, React, TypeScript, and Three.js portfolio with a responsive light/dark design, an interactive 3D focal element, project filtering and search, accessible native case-study dialogs, and two resume PDFs.

## Development

```sh
npm ci
npm run dev
```

## Validation

```sh
npm run lint
npm test
npm run build
npm audit
```

The test suite covers email-draft encoding and header boundaries, case-study completeness/link invariants, and the grants/prizes total. The responsive interface, keyboard interactions, themes, project filters, contact validation, and downloads also receive browser verification.

## Content

- `lib/portfolio.ts`: projects, experience, skills, and recognition. Preserve each numerical claim's context when editing.
- `public/resumes/`: supplied Software Engineering and AI / Computer Vision resumes.
- `lib/contact.ts`: mailto draft construction. The form opens the visitor's email client; it does not deliver messages from a server or report a false send success. Direct email, clipboard copy, and telephone links are available.
- No public repository is claimed for Makerspace Sentinel, MOSTify, or the job-search automation workflow. Removed legacy Seremo and Drum Kit demo actions were unreachable; their repository links remain available.

## Motion and accessibility

The Three.js scene is loaded dynamically. It caps pixel density, renders at approximately 30 FPS, suspends work offscreen/in hidden tabs, respects `prefers-reduced-motion`, and has an explicit pause control. Paused and reduced-motion scenes render still frames; a text fallback appears if WebGL cannot initialize. CSS disables transition and smooth scrolling for reduced motion.

Navigation and dialogs support keyboards and focus restoration. Search labels, input labels, live result announcements, and a skip link are included.

## Deployment

The existing Netlify site `adityabaniya` is connected to this repository's `main` branch. Its build command is `npm run build` and publish directory is `.next`; Netlify supplies its Next.js runtime integration. Push validated changes to `main` to trigger the existing deployment. Do not create a substitute site or commit account credentials.
