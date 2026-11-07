# FamilyCoachMD: landing page

Revamp of familycoachmd.com. Vite + vanilla JS, GSAP (ScrollTrigger, SplitText, DrawSVG, MotionPath), Lenis, Three.js (the logo's two leaves in 3D, hero + seasons).
The design plan is in `preparacao-familycoachmd.md`; facts about Dr. Che come from `../larisa-cv.md`.

```bash
npm install
npm run dev      # http://localhost:5173 (the shared launch config uses 5174)
npm run build    # outputs dist/
```

## Deploy (Vercel)

```bash
npx vercel           # first time: link/create the project, gives a preview URL
npx vercel --prod    # publish to production
```

`vercel.json` redirects the old Squarespace URLs (`/about`, `/private-family-coaching`, `/parenting-course`, …) to the matching sections.
When pointing familycoachmd.com at Vercel, keep the domain's MX records untouched so `Grow@familycoachmd.com` keeps working.

## Booking and newsletter

No booking tool is connected yet: "Request my free call" and the footer sign-up open the visitor's email app with a pre-filled message to Grow@familycoachmd.com. The form only asks for name, email, phone and preferred times, never health details. To switch to a scheduler, replace the `.book` form in section 17 with its embed (use a HIPAA-appropriate tool for clinical bookings).

## Assets

- `public/img/`: the program photos, same exports as the Entrepreneurs at Play site (`-sm` 480 px, `-lg` up to 1200 px).
- `public/logo/`: FamilyCoachMD SVGs (traced from `../FamilyCoachMD.png`).
- `public/svg/`: season leaf illustrations (phones and reduced motion), the leaf photo mask and the slider thumb.
- `src/partials/logo-anim.svg`: the animatable logo used by the loader, inlined into `index.html` at build time.

## Dev helpers

- `?shot=<section-id>&dy=<px>` skips the loader and jumps to a section; `?no3d` skips the WebGL leaves.
- `tools/mobile.html` shows the site in a 390 px frame (not part of the build).
- `tools/shots.sh` takes headless screenshots (unreliable for pinned sections; check those in a real browser).
