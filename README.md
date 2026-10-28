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

- `lib/portfolio.ts`: experience, skills, recognition, and the hackathon strip. Preserve each numerical claim's context when editing.
- `lib/projects.ts` and `lib/case-studies/*.ts`: every project. Each one gets a card on the home page and a full case study at `/projects/<id>`.
- `public/resumes/`: supplied Software Engineering and AI / Computer Vision resumes.
- `lib/contact.ts`: mailto draft construction. The form opens the visitor's email client; it does not deliver messages from a server or report a false send success. Direct email, clipboard copy, and telephone links are available.
- No public repository is claimed for Makerspace Sentinel, MOSTify, or the job-search automation workflow. Removed legacy Seremo and Drum Kit demo actions were unreachable; their repository links remain available.

## Adding or editing a project

Open `lib/projects.ts` (short projects) or copy one of `lib/case-studies/*.ts` (full case studies) and fill in the fields in `lib/project-types.ts`:

- `media`: put a YouTube video first (`{ type: "youtube", id }`), then images. `devpostImages("Title", ["005/463/686", ...])` builds a Devpost gallery from the path segment in each Devpost image URL. Self-hosted files go in `public/projects/<id>/` and are referenced as `/projects/<id>/file.jpg`; `{ type: "video", src, poster }` plays an MP4 once the visitor presses play.
- `did` / `how`: the two short lines shown on the home-page card. `sections` is the long-form story on the case-study page.
- Add the new `id` to the `order` list in `lib/projects.ts` to place it; the first featured project is the wide spotlight card.

`npm test` checks ids, links, alt text, YouTube ids, and that local media files exist.

## Motion and accessibility

The Three.js scene is loaded dynamically. It caps pixel density, renders at approximately 30 FPS, suspends work offscreen/in hidden tabs, respects `prefers-reduced-motion`, and has an explicit pause control. Paused and reduced-motion scenes render still frames; a text fallback appears if WebGL cannot initialize. CSS disables transition and smooth scrolling for reduced motion.

Slideshows pause on hover and focus, have a visible pause control, and do not auto-advance for reduced-motion visitors; YouTube loads only after a visitor presses play. Navigation and dialogs support keyboards and focus restoration. Search labels, input labels, live result announcements, and a skip link are included.

## Deployment

The existing Netlify site `adityabaniya` is connected to this repository's `main` branch. Its build command is `npm run build` and publish directory is `.next`; Netlify supplies its Next.js runtime integration. Push validated changes to `main` to trigger the existing deployment. Do not create a substitute site or commit account credentials.
