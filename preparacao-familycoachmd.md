# Preparation: FamilyCoachMD landing page (revamp of familycoachmd.com)

> Design and build plan for a public, award-level landing page. **Planning only: nothing here has been built yet.**
> Prepared 2026-11-03 by Haderach Solutions for Dr. Larisa Che, MD, CEO and Founder of FamilyCoachMD LLC.
> All on-page copy below is final-draft English, ready to use. Anything marked **[CONFIRM]** must be checked with Larisa before the page goes public (see section 11).
> Sibling project: the Entrepreneurs at Play site (`entregas/site/`, plan in `entregas/site/preparacao-entrepreneurs-at-play.md`). FamilyCoachMD is the **parent company**; EP is "a FamilyCoachMD program". The two sites share the logo, the motion tokens and the build stack, but each has its own personality (section 2).

---

## 1. Project snapshot

| | |
|---|---|
| **Business** | FamilyCoachMD LLC, Omaha, Nebraska. Tagline (kept from the old site): **"Coaching, Caring, and Cultivating Change for Families."** |
| **What it is** | A physician-founded practice that walks alongside families, schools, childcare centers and faith communities. It offers **psychiatric care for children and teens (new)**, **private family coaching**, **group parenting courses** (Positive Discipline), **consulting for schools and childcare centers**, a **faith-based track**, self-paced courses and books (coming), and it runs **Entrepreneurs at Play**, the microschool opening January 4, 2027. |
| **Why the revamp** | The old site (Squarespace) was built by Larisa herself and she calls it "rough". The psychiatric services that will fund the school aren't on it at all, the booking button is buried, the dates are stale (a book "Fall 2024", a blog post from 2020, "coming soon" courses), and the social icons link to Squarespace's own placeholder accounts. |
| **Founder** | Dr. Larisa A. Che, MD. Board-certified adult psychiatrist and board-certified child and adolescent psychiatrist (per her old site), Medical Director of NOVA Treatment Community, Assistant Clinical Professor at Creighton University School of Medicine, Certified Positive Discipline Parent and Early Childhood Educator, licensed in Nebraska and Iowa. Full CV: `../larisa-cv.md`. |
| **Single goal** | **Book a free 15-minute consultation.** Every section ends one tap away from it. |
| **Audiences** | (1) Omaha and Iowa parents of children 0–18, from bedtime battles to teen anxiety. (2) Directors of childcare centers and schools. (3) Parent groups, playgroups and church ministries. (4) Families drawn in by Entrepreneurs at Play. |
| **First 5 seconds** | *"A real doctor who also gets what it's like at home. Calm, warm, and for us."* Clinical trust without the clinic. Never cold, never preachy, never cute. |
| **Stack** | Same as EP: Vite + vanilla JS · GSAP 3.13+ (ScrollTrigger, SplitText, Flip, Draggable, DrawSVG, MotionPath, MorphSVG) · Lenis · Three.js (hero + seasons, desktop) · Vercel |
| **Language** | English (US) |
| **Lives in** | `C:\Users\Ithalo\Desktop\escola\familycoachmd\` (this folder) |

---

## 2. Big idea: "Every season of family life"

Larisa's own words keep coming back to one image: *"no matter the season"*, *"this season of your life"*, *"your family's marathon called life"*. And the new logo is **a big leaf and a small leaf growing from one stem**, a parent and a child.

So the site is a **year in the life of those two leaves**:

1. **The Two Leaves (Three.js).** The hero is the logo's two leaves, rendered as soft, velvety 3D leaves on their hand-drawn stem, swaying in a breeze you control with your cursor. They **breathe**: a slow 4-second inhale, 4-second exhale.
2. **The seasons scroll.** Further down, the same 3D leaves live through five seasons of family life (the early years → the school years → the teen years → the hard seasons → renewal). The **whole page changes color with the season**, the leaves grow, drift apart, weather a storm and turn back toward each other. Each season tells a parent: *this is for you, and here is how we help.*
3. **Take a breath.** A psychiatrist's site should calm you down from the first frame. The loader is a breathing exercise (an amber "sun", Headspace's spirit in FamilyCoachMD's old amber), and the page has a real 16-second breathing pause halfway down.
4. **Care before crisis.** The old site's mission (*"to prevent pathology before it overwhelms an individual, a family… a nation and the world"*) becomes one huge, confident line in a dark band, Patagonia-style.

**Personality in one line:** *Headspace's calm × Patagonia's conviction × Allbirds' natural, earthy craft, with a physician's steadiness that belongs to FamilyCoachMD alone.*

**How it differs from its sibling (EP):** EP is *play* (toy box, growth line, marigold stickers, a busy school day). FamilyCoachMD is *care*: fewer and slower movements, more air, deeper greens, the old site's amber instead of EP's marigold, an editorial serif instead of EP's playful Fraunces. Same logo, same family, a grown-up voice.

**What makes it ours, not a copy:** none of the three references has a living 3D emblem that goes through seasons, a breathing loader, or an interactive "kind and firm" balance. Headspace uses mascots, we use the logo's leaves. Patagonia uses full-bleed adventure photography, we use inset windows, line art and season color. Allbirds sells product tiles, our tiles are people (families, schools, faith communities).

---

## 3. Brand analysis

### 3.1 New logo: `../FamilyCoachMD.png` (3392 × 1248, transparent PNG), already vectorized

| Element | Observation | Approx. hex |
|---|---|---|
| Wordmark "FamilyCoachMD" | Warm old-style serif, letters riding the stem's wave, with a cream "halo" where the "y" and "D" cross the stem | ochre `#B5894C` |
| Stem | Hand-inked, tapered, one sweeping curve that underlines the name and rises into the leaves | charcoal-olive `#3C4136` |
| Big leaf (the parent) | Matte olive, thick dark outline, center vein | olive `#6E7157` |
| Small leaf (the child) | Lighter tan with a sage outline, tucked under the big one | tan `#BDAF90` / sage `#9A9B86` |

**Reuse what exists (built for EP, same logo):**

| File | Contains | Use here |
|---|---|---|
| `../entregas/site/logo/familycoachmd-logo.svg` | Full-color master, paths `#leaf-small`, `#leaf-small-line`, `#leaf-big`, `#stem`, `#wordmark`, `viewBox="197 79 3162 1043"` | Nav, footer, loader |
| `…/familycoachmd-logo-on-dark.svg` | Cream stem, light-ochre wordmark `#D9B27A` | Dark bands, footer |
| `…/familycoachmd-logo-mono-ink.svg` / `-mono-cream.svg` | One-color | Print, watermark |
| `…/familycoachmd-symbol.svg` | Stem + leaves only | Favicon, 3D leaf source shapes, section ornaments |
| `…/familycoachmd-wordmark.svg` | Letters only | Footer giant wordmark |
| `../entregas/site/src/partials/logo-anim.svg` | Animation-ready logo: `.fcmd-stem-center` centerline mask (for drawing the stem) + per-glyph wordmark | Loader |

**Mood statement:** Hand-made, rooted and calm. Two living things on one line, drawn with an ink pen, in the colors of a garden in late summer. The brand should feel like a well-kept home with a doctor's diploma on the wall: warmth first, credentials close behind.

### 3.2 The old site (familycoachmd.com, read on 2026-11-03): audit

**Platform and look:** Squarespace. Fonts *Freight Text Pro* (serif) and *Minerva Modern* (display caps), both Adobe Fonts. Colors: deep forest `#344734`, amber `#F1A638`, blush `#F2E9E9`, white, black. Nav: Home, About, Childcare Center Consultant, Private Family Coaching, Parenting Course, Courses, Contact, Work with me, Services, Blog, Cart.

**Every piece of content on it** (all of it is carried into the new page, rewritten and reorganized; nothing is lost):

| Old page | Content | New home (section) |
|---|---|---|
| Home | Tagline · "Organizations we are currently serving" (New Community Omaha, Nelson Mandela Elementary) · "YOU…" audiences: Systems/Consultation, Childcare centers/schools (4-step approach), Faith-based organizations, Groups/Courses (3–6 week parenting classes), Self-paced (coming soon), Families/Coaching (5 questions) · Learning Corner ("Summer Fun for Kids", 2020) | 02, 04, 07, 09, 10, 14, 15 |
| About | "It all began with a drive to see thriving families, joyful people and empowered kids." Mission (prevent pathology), coaching/consulting/courses/books summary, "Hi, I'm Dr Che" letter, credentials list, "Stay Blessed, Dr Che" | 03, 13, 14 |
| Childcare Center Consultant / Services | 4-step approach **C.A.R.E.**: Collaborate, Assess, Re-imagine, Educate | 09 |
| Private Family Coaching | "Confident parents, capable children, compassionate world" · the 5 questions · approach that honors diverse backgrounds, "a guide walking alongside you" · 2× 1-hour sessions/week for 6 weeks, family + individual sessions, phone or Zoom · personalized plan · extended family welcome · Yale Gesell assessment (2.5–9 yrs) · free 15-min consultation | 07 |
| Parenting Course | Positive Discipline (Dr. Jane Nelsen, Adlerian) · the 5 tenets · Standard $270 / Customized $300 per person for 6 weeks · who, content, time (2 h classes over 3–6 weeks, in person or online) · FAQs | 08, 16 |
| Courses | Online lessons (coming soon) · 1:1 coaching | 15, 07 |
| Work with me | "Empower, encourage, inspire your organization, your family, your kids, you…" · what's included list | 04, 07 |
| Contact | Grow@FamilyCoachMD.com · (501) 819-GROW (4769) | 17, 18 |

**Keep:** the tagline · the forest green and the amber (they become `--evergreen` and `--amber`) · the warm serif feeling of Freight · her voice ("walk alongside you", "this journey called life", "no matter the season") · C.A.R.E. · every service and every FAQ · her faith-based track.

**Change:** 10 thin pages → **one rich landing page** with anchors (old URLs redirect to anchors, section 9) · the missing psychiatric care gets a full section · the hidden "free 15-minute consultation" becomes the main CTA everywhere · stale dates removed · the flat white Squarespace template becomes linen, line art, season color and motion · placeholder social links fixed · the old "FamilyCoachMD" script logo (p00) is replaced by the new leaf logo.

### 3.3 Photos

Available now: the 17 Entrepreneurs at Play photos (identical to `../entregas/instagram/src/img/pNN`), already optimized to WebP in `../entregas/site/public/img/` (`*-sm.webp`, `*-lg.webp`), plus **Dr. Che's portrait** (`founder`, p16: smiling, teal blouse, brick wall).

**Design decisions:**
- **FamilyCoachMD can't live on school photos alone.** Those photos belong to EP; here they only appear where the subject is children and family life (season cards, the EP portal, audience tiles on hover). Elsewhere the page relies on **line art, the 3D leaves and color**, so it looks finished even before new photos arrive.
- **Same grade as EP** so the two sites match: B&W photos get the forest/linen duotone (`#1E2A1F → #F4EFE7`), color photos +5 warmth / −8 saturation, 4% film grain.
- **Inset windows, never full-bleed** (Allbirds): photos sit in rounded frames with a 10–20px margin, so modest resolution (540–1206 px) never stretches.
- **Request from Larisa (priority):** 3–5 high-res portraits (warm, at a desk, outdoors, laughing) · a coaching moment (staged with consenting family, faces optional) · a parent class · a staff training at a center · her signature (scan) · KETV stills · Reading Drive / Cameroon photos if she wants that story told.
- **Consent:** EP photos are already authorized for public use (confirmed by Ithalo, 2026-11-01). Any new photo of a family or child needs written consent; **never use patient imagery.**

### 3.4 Color system

Built from the old site (evergreen, amber, blush) + the new logo (ochre, olive, sage, bark) + a season layer. Contrast ratios measured (WCAG).

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--linen` | `#F4EFE7` | Main background | |
| `--linen-2` | `#EAE3D7` | Alternate band, inputs | |
| `--card` | `#FFFFFF` | Allbirds-style white value cards | |
| `--ink` | `#22261F` | Body text | 13.4:1 on linen |
| `--evergreen` | `#344734` | **Primary** (from the old site): buttons, links, headings accents | 8.7:1 on linen |
| `--evergreen-deep` | `#1E2A1F` | Dark bands, footer, duotone shadow | linen on it 13.0:1 |
| `--bark` | `#3C4136` | Logo stem, line art, outlines | 9.2:1 on linen |
| `--olive` | `#6E7157` | Big leaf, secondary text **≥ 18px only** | 4.4:1 on linen |
| `--sage` | `#9A9B86` | Small leaf outline, dividers, non-text | |
| `--ochre` | `#B5894C` | Logo gold, numerals, decoration (large/non-text only) | 2.8:1 |
| `--ochre-ink` | `#8A6431` | Ochre when it must be small text (eyebrows, years) | 4.6:1 on linen |
| `--amber` | `#F1A638` | **The breath sun** (old site's accent): loader, breathing pause, focus glow, highlights. Text only on `--evergreen-deep` | 7.3:1 on deep |
| `--petal` | `#F2E9E9` | Old blush, kept for the founder band and FAQ | |

**Season tints** (page background during section 05, and the accent of each season card):

| Season | Background | Accent (≥ 4.5:1 with white) |
|---|---|---|
| The early years | `#E4E9D8` (spring sage mist) | `#5E6248` |
| The school years | `#F6E6C4` (summer straw) | `#8E5A33` |
| The teen years | `#EBD7CB` (autumn clay rose) | `#8C5F57` |
| The hard seasons | `#D6DCDE` (winter slate mist) | `#4F6473` |
| Renewal | `#F4EFE7` → `--evergreen-deep` | `#344734` |

**Audience tiles** (section 04, Allbirds' earthy tiles, white text measured): Families `#8C5F57` (5.4:1) · Parents & groups `#8E5A33` (5.7:1) · Schools & centers `#4F6473` (6.2:1) · Faith communities `#584443` (9.0:1) · Kids (EP) `#5E6248` (6.3:1).

**Proportions:** linen ~55%, white cards ~10%, evergreen family ~20%, earth tiles ~10%, amber/ochre ~5%. No dark-mode toggle: the linen and seasons are the identity (a full dark band appears twice on purpose: 03 and the footer).

### 3.5 Typography

| Use | Font | Weights | Fallback | Why |
|---|---|---|---|---|
| Display / headlines | **Newsreader** (Google, variable `opsz` 6–72, `wght` 200–800, italic) | 300, 400, 500 + *italic* at `opsz 72` | `Georgia, 'Times New Roman', serif` | The closest free cousin of the old site's Freight Text: editorial, calm, trustworthy, a doctor who writes well. Patagonia's new serif story titles prove a quiet serif can still feel bold at size. |
| Body / UI | **Figtree** | 400, 500, 600 | `system-ui, sans-serif` | Shared with EP (family resemblance), friendly and very legible. |
| Eyebrows, years, credentials, data | **DM Mono** | 400, 500 | `ui-monospace, monospace` | Allbirds' typewriter eyebrows ("WEAR ALL DAY COMFORT"). Here it reads as a physician's chart note: precise, honest. |
| Hand notes | **Caveat** | 600 | `cursive` | Shared with EP. Max 6 words, never information-critical (Allbirds' handwritten "EVER HAVE A TREE HUG YOU BACK?"). |

Scale (fluid): H1 `clamp(3.1rem, 8vw, 7.75rem)` / line-height .95 / tracking −0.02em · Manifesto `clamp(3.4rem, 11.5vw, 11rem)` · H2 `clamp(2.2rem, 4.8vw, 4.4rem)` · H3 `clamp(1.3rem, 2vw, 1.7rem)` · body `clamp(1.0625rem, 1.1vw, 1.1875rem)` / 1.65 · eyebrow DM Mono 0.78rem, uppercase, letter-spacing .12em.

**Signature move:** in every headline, **one word is set in Newsreader italic** in evergreen (or amber on dark): "every *season*", "care before *crisis*", "kind *and* firm".

### 3.6 Graphic language

- **Inset rounded windows** (Allbirds): hero and photo blocks sit 10px (mobile) / 16px (desktop) from the edges with `border-radius: 22px`. The page feels framed and calm, like looking out of a window.
- **Leaf-vein line art:** a small library of single-weight (2px, `--bark`) line drawings: two hands holding a leaf, a circle of chairs, a schoolhouse, an open book with a candle, a kite, a teapot, a pot with a sprout (5 stages), a balance on a stone, pebbles. They draw themselves in (DrawSVG) and replace missing photography.
- **The stem curve as a divider:** the hero's bottom edge and two section edges are cut with the logo's own wave (SVG mask from the stem path), like Headspace's wavy hero edge but drawn by our logo.
- **The amber breath sun:** a soft amber circle with a radial blur. Appears in the loader, behind the hero leaves, in the breathing pause and as the 404.
- **Pills** for every button and tag; **outlined pills** on colored tiles (Allbirds).
- **Grain:** global SVG noise, `opacity .035`, `mix-blend-mode: multiply`.
- **No faces on mascots, no emoji, no stock "therapy couch" photos.**

---

## 4. Inspiration analysis (observed live in Chrome, 2026-11-03)

### 4.1 Headspace (headspace.com)

**Observed today** (the site served the Portuguese locale, an older layout than the US page the EP study recorded on 2026-11-01; both are used here): white nav with orange-dot logo and a blue pill CTA · hero with tilted phone mockups on both sides and a two-line headline ("Less stress. More Headspace.", in orange) · the hero ends in a **soft wavy edge** · a trio of benefits, each with a **playful illustration of balanced objects** (a bar balanced on a bowl with a smiling face, rising bars, a cluster of sleepy-faced shapes) · alternating rows of **circular illustrations** (a whale with a sailboat) and text · its **404 page is a breathing prompt**: an orange sun with closed eyes, "Take a deep breath. Ready? Breathe in. And out." · `/psychiatry` could not be seen (the locale redirect sent it to that 404), so the clinical flow is **not observed** and is my own design (section 06).
**From the 2026-11-01 study (US layout):** rotating phrase above the H1, chip grid "What kind of headspace are you looking for?", pill tabs with colored panels, Ebb blob mascot, a chat bubble that types, photos with illustrated stickers, count-up stats, FAQ accordion.

| Borrow | Adapt | Skip |
|---|---|---|
| The calm: generous whitespace, slow motion, rounded everything | 404 "take a deep breath" → **the loader, the breathing pause (12) and our 404** | Mascot faces (a psychiatrist's brand shouldn't feel infantile; the leaves are our "characters") |
| Rotating phrase above the H1 | Orange sun → the **old site's amber**, as a breath sun | App mockups, subscription pricing |
| Wavy hero edge | Balanced-objects illustration → **"Kind and firm" balance interaction (08)** | Bright blue CTA (ours is evergreen) |
| Chip grid | Chips → **"What brings you here?"** reason chips in the booking form (17) | AI chat feature |
| FAQ accordion, gentle tone | Count-up stats → used once, only for true facts (14) | |

### 4.2 Patagonia (patagonia.com/home)

**Observed today:** black utility bar with a **rotating announcement** · the hero is now a **black activist band** with a huge wonky serif ("Vote the Assholes Out", with a swash V) and one white pill ("Act Now") · horizontal category carousel with sub-links (Women's · Men's · Kids' · Explore) · full-bleed photo with "Used to be cool. Still is." and **white pills on the photo** · large activity tiles (Climbing / Trail Running / Surfing) with sub-links · **"Latest Stories" cards in serif titles** with author names and **blur-up loading** (blurred previews that sharpen), the first one being *"A Letter from Yvon Chouinard"* (the founder) · round arrow buttons.
**From the 2026-11-01 study:** camera icon on photos opens a story card · a giant "11.2" made of line-drawn people · a black band of 5 brand promises.

| Borrow | Adapt | Skip |
|---|---|---|
| Rotating announcement bar | Black activist band → **evergreen-deep manifesto band "Care before *crisis*."** (03) | The provocative tone (wrong for a medical brand) |
| Big confident serif statements | "A Letter from Yvon Chouinard" → **"A letter from Dr. Che"** as the first Learning Corner card (15) | Mega-menu, e-commerce, cart |
| Story cards with blur-up loading | Activity tiles with sub-links → **season cards with "how we help" sub-links** (05) | Full-bleed photography (our photos are too small, see 3.3) |
| Pills over photos, round arrow buttons | Giant numeral (used by EP) → not reused, to keep the sites distinct | |

### 4.3 Allbirds (allbirds.com + /pages/our-story)

**Observed today:** dark announcement bar with arrows · the nav is a **floating white rounded card**, inset over the hero · the hero is an **inset rounded window** (≈10px from the edges) split in two photos, with a **vertical text strip** running between them ("NZ DASHER NZ DASHER" on a green band) · **hand-drawn white leaf doodles** on the photo and a **handwritten caps note** with a curly arrow ("EVER HAVE A TREE HUG YOU BACK?") · "Wildly Comfortable. Super Natural." with outlined pills · four **earthy color tiles** (slate blue, plum brown, dusty rose, sage) with product cutouts and an **outlined pill label; on hover a second pill slides in under it** ("MENS" → "SHOP MEN") · warm grey page `#ECE9E2`, white rounded product cards · lifestyle photos that **enter under a pale veil that clears** · three white value cards with **monospace eyebrows** · dark footer `#212121` with a pill email field · a floating black pill assistant button.
**Our Story page:** an inset landscape hero with a tiny mono eyebrow and one centered sentence ("Striving for better is in our nature") · a **horizontal story strip of rounded photos at staggered heights, a caption under each**, telling the founder's journey · split image/text blocks ("Better Things"). Font: Geograph everywhere.

| Borrow | Adapt | Skip |
|---|---|---|
| Floating rounded card nav over an inset rounded hero | Product color tiles → **audience tiles** (families, parents, schools, faith, kids) with line art, photo on hover, second pill sliding in | Product cutouts, quick-add, cart |
| Hand-drawn doodles + handwritten note with arrow on the hero | Vertical "NZ DASHER" strip → **"COACHING · CARING · CULTIVATING CHANGE"** vertical marquee on the hero's edge | Country pop-up, AI shopping pill |
| Veil-to-clear photo reveal | Our Story staggered strip → **"From Bafut to Omaha": Dr. Che's journey strip** (13) | Shoe-specific content |
| Mono eyebrows on white value cards | Value cards → **"How coaching works"** cards (07) | |
| Pill email field in a dark footer | | |

**Not observed:** fine hover physics and page transitions on all three (one-page landing, not needed), and Headspace's clinical pages (locale redirect). Specs below for those are my own.

---

## 5. Page architecture and section-by-section experience

Desktop reference 1440 px, mobile reference 390 px. Max content width 1240 px; gutters `clamp(16px, 4vw, 56px)`.

```
00 Loader: "Take a breath"
01 Announcement bar + floating nav card
02 Hero: The Two Leaves (Three.js)            #top
03 Manifesto band: "Care before crisis."
04 Who we walk alongside (audience tiles)
05 Every season of family life (pinned, page changes color)   #seasons
06 Psychiatric care for children and teens (new)               #care
07 Private family coaching                                     #coaching
08 Kind and firm: Positive Discipline parenting course         #courses
09 For schools and childcare centers: C.A.R.E.                 #schools
10 For faith communities                                       #faith
11 Our flagship program: Entrepreneurs at Play                 #ep
12 Take one breath (interactive pause)
13 Meet Dr. Che: letter + "From Bafut to Omaha" strip          #about
14 Trust: credentials marquee, KETV, organizations we serve
15 Learning Corner (stories, media, books, courses)            #learning
16 Questions families ask (FAQ)                                #faq
17 Begin with a free 15-minute call (booking)                  #begin
18 Footer (+ crisis line)
404 page
```

---

### 00 · Loader: "Take a breath" (≈ 3.0 s, hard cap 3.6 s)

Pure SVG + GSAP (no WebGL), so it starts instantly. Uses `logo-anim.svg` inlined. Background `--linen`.

| Time | What happens | How |
|---|---|---|
| 0.0–0.3 s | A small amber sun (24px) glows in at the center. Under it, Newsreader italic 22px: ***Take a breath with us.*** | opacity 0→1, `sine.out` |
| 0.3–1.6 s | **Inhale.** The sun slowly swells to ~240px with a soft halo; the label crossfades to *"Breathe in…"* | `scale 1→10`, `sine.inOut` 1.3 s; halo `filter: blur` grows |
| 1.6–2.6 s | **Exhale.** The sun softens back to ~120px; label *"…and out."* While it exhales, **the two leaves drift in** from the upper left and upper right like falling leaves (swaying paths), and land together on the stem, which **draws itself** underneath from left to right. The wordmark writes in letter by letter along the wave. | Leaves: MotionPath on two hand-drawn curves, rotation sway ±18° → 0, 1.0 s, `power2.inOut`. Stem: DrawSVG on `.fcmd-stem-center` mask. Glyphs: `y 20→0`, stagger .05 s |
| 2.6–3.0 s | The two leaves touch, a tiny pulse (scale 1.04) and settle. The sun sits behind the logo like a morning light. | `elastic.out(1,.6)` |
| 3.0–3.6 s | **Exit:** the amber sun expands into a circle wipe that reveals the hero (circle `clip-path` from the logo's center), while the logo flies to its nav spot (GSAP Flip). | `clip-path: circle(0%→150%)`, 0.8 s, `expo.inOut` |

- **Real loading:** the exit waits for `document.fonts.ready` + the hero's fallback image decode (+ Three.js scene ready if under the cap). Hard cap 3.6 s, then exit anyway.
- **Skip:** any click, tap or key skips straight to the exit.
- **Return visits** (sessionStorage): a 900 ms version (logo appears assembled, one breath pulse, exit).
- **Reduced motion:** the finished logo fades in (300 ms), holds 400 ms, fades out. No breathing, no Flip.
- **Mobile:** identical; logo 76vw wide.

### 01 · Announcement bar + floating nav card

- **Announcement bar** (Patagonia/Allbirds): `--evergreen-deep`, linen Figtree 13px, ‹ › arrows, rotates every 4.5 s with a vertical slide (pause button for WCAG 2.2.2):
  `Free 15-minute consultations: book yours` · `Now enrolling: Entrepreneurs at Play, opening January 2027` · `Physician-led care for families in Nebraska and Iowa` **[CONFIRM states]**
- **Nav = floating white card** (Allbirds): 14px from the edges, `border-radius: 16px`, soft shadow `0 8px 30px rgba(30,42,31,.08)`. Hides on scroll down, returns on scroll up (`y −120% ↔ 0`, 0.35 s). When it returns over a dark band it turns `--evergreen-deep` with the on-dark logo.
  - Left: full FamilyCoachMD logo (SVG, 150px wide).
  - Center: `Care` · `Coaching` · `Courses` · `Schools` · `About` · `Learning`. Hover: a tiny leaf slides in before the word and the word shifts 6px right.
  - Right: **"Free 15-min call"** evergreen pill, magnetic (≤ 8px). On hover an amber dot inside the pill breathes once.
- **Mobile:** logo + pill + two-line burger that morphs into ×. The menu is a full-height linen sheet; big Newsreader links stagger in (`y 40→0`, .06 s), the season tints show as five thin stripes at the bottom, and email/phone sit underneath.

### 02 · Hero: "The Two Leaves"

**Layout desktop:** an **inset rounded window** (16px margin, 22px radius, height `calc(100svh − 32px)`, min 640px) with a dawn gradient inside (`#F4EFE7` → `#EFE3CC` → a faint amber glow at the right). Copy on columns 1–6; the 3D leaves fill columns 6–12. The window's bottom edge is cut by the **stem wave** (SVG mask).
**Layout mobile:** copy first, the leaves in a 48svh band under it, then the CTAs.

**Copy:**
- Rotating line above the H1 (Headspace), Caveat 30px in `--ochre-ink`, swapping every 2.4 s with a soft fade-up: **"For the bedtime battles." → "For the 2 a.m. worries." → "For the teenage years." → "For the hard seasons." → "For the whole family."**
- H1 (Newsreader 400, `opsz 72`): **Care for every *season* of family life.**
- Sub (Newsreader italic 22px, `--evergreen`): **Coaching, Caring, and Cultivating Change for Families.**
- Lede (Figtree 18px, max 40ch): *Physician-led care, coaching and courses for families, schools and communities, from a board-certified child and adolescent psychiatrist and Omaha mom.*
- CTAs: **[Book a free 15-min call]** evergreen pill (magnetic) · **[Find your season ↓]** outlined pill.
- Trust chips (white pills, DM Mono 12px): `MD · BOARD-CERTIFIED` · `CHILD & ADOLESCENT PSYCHIATRY` · `OMAHA, NE`
- **Handwritten note** (Allbirds): near the logo in the nav on desktop, a Caveat note *"yes, a real doctor"* with a hand-drawn curly arrow pointing at the "MD", drawing itself in 1.2 s after the loader. Hidden on mobile.
- **Vertical marquee** (Allbirds' "NZ DASHER" strip): a 44px sage strip on the window's right edge with DM Mono `COACHING · CARING · CULTIVATING CHANGE ·` scrolling slowly upward (40 s/loop). Desktop only.

**3D scene (Three.js):**
- **Geometry, made from our own logo:** `#leaf-big` and `#leaf-small` from `familycoachmd-symbol.svg` loaded with `SVGLoader` → `ExtrudeGeometry` (depth 6, bevel 3, then gently **curled** in the vertex shader so they aren't flat). The stem is a `TubeGeometry` along a `CatmullRomCurve3` sampled from the stem centerline (tapered radius). The center vein is a slightly raised groove via a normal map drawn from the logo's vein line.
- **Material:** `MeshPhysicalMaterial` with `sheen` (velvet leaf surface), roughness .72, colors `--olive` (big) and `#BDAF90` (small) with sage edges; the stem `--bark`. Soft `HemisphereLight` (linen sky / olive ground) + one warm directional "sun" light from the amber side + a blurred contact-shadow plane.
- **Behind it:** the amber breath sun as a soft sprite.
- **Motion:**
  - **Breathing:** the whole group slowly scales 1 ↔ 1.025 and the sun's glow swells, 4 s in, 4 s out (`sine.inOut`).
  - **Breeze:** a vertex-shader wind bends both leaves from the stem outward (two sine waves + noise). The **cursor is the wind**: moving fast near the leaves makes them flutter and lean away, then spring back (lerp .06). The small leaf always reacts a little later and a little more than the big one (the child follows the parent).
  - **Falling leaves:** ~24 tiny instanced leaves drift down slowly across the window, colors from the palette.
  - **Click/tap a leaf:** it bobs once and a white pill tooltip appears: big leaf *"The parent: steady, rooted."* · small leaf *"The child: growing, at their own pace."*
  - **Scroll out:** the camera dollies back and the leaves rotate so the small leaf faces us; the canvas then **stays fixed** on the right side (desktop) to become the star of section 05.
- **Perf:** `setPixelRatio(min(dpr, 1.5))`, one renderer for 02 + 05, **loop paused** whenever neither section is in view (IntersectionObserver) or the tab is hidden; Three.js loaded with dynamic `import()` after first paint; the H1 is the LCP and never waits for 3D.
- **Mobile:** same scene, 12 falling leaves, no cursor wind; touch-drag gives a gust. Gyroscope tilt only after a tap (iOS permission).
- **Fallback (no WebGL, low-end, reduced motion):** a pre-rendered transparent WebP of the leaves (`hero-leaves.webp`, rendered once from the scene) with a CSS sway (±2°, 6 s).

Scroll cue at the bottom: a tiny leaf drifting down with *"find your season"* (Caveat).

### 03 · Manifesto band: "Care before crisis."

- Full-width `--evergreen-deep` band (Patagonia's black activist hero, in our forest). The top edge is cut with the stem wave.
- Giant statement, Newsreader 300, `clamp(3.4rem, 11.5vw, 11rem)`, linen, with "crisis" in amber italic:
  **Care before *crisis*.**
- Under it, max 52ch, Figtree 19px, linen at 85%:
  *FamilyCoachMD was born out of a drive to see thriving families, joyful people and empowered kids. We work to prevent struggle before it overwhelms a child, a family, a classroom or a community, because everyone can reach their God-given potential in a thriving environment, at home, at school and at work.* **[CONFIRM "God-given": her own wording; keep or soften, see flag 7]**
- One white pill: **[Start with a free call]**.
- **Motion:** the three words rise in line by line with a mask reveal (`yPercent 110→0`, .9 s, stagger .12). Then, scrubbed on scroll, a thin amber line draws under "crisis" like a pen underline. The body copy reveals word by word (opacity .2 → 1, scrubbed).
- **Mobile:** same; statement at 3.4rem on two lines.

### 04 · Who we walk alongside (audience tiles)

The old site's "YOU…" becomes Allbirds' color tiles.

- Eyebrow `WE WALK ALONGSIDE` · H2: **Whoever you are, *we're* here for the journey.**
- **5 tiles** in a row (desktop: 5 equal columns, 520px tall; tablet: 3+2; mobile: horizontal scroll-snap at 78vw). Each tile is an earthy color (3.4) with a **line-art illustration in linen** (3.6) drawn in as it enters, and an **outlined pill label**. On hover (or first tap on mobile) the illustration fades, a duotone photo rises in under a veil that clears, and **a second pill slides in under the first** (Allbirds):

| Tile | Color | Illustration | Hover photo | Pill → second pill | Goes to |
|---|---|---|---|---|---|
| **Your family** | `#8C5F57` | two hands holding a leaf | `cooking` (kids baking) | `FAMILIES` → `FAMILY COACHING` | #coaching |
| **Your child or teen** | `#4F6473` | the two leaves under a small umbrella | `speaking` (boy in a vest) | `CHILDREN & TEENS` → `PSYCHIATRIC CARE` | #care |
| **Your parent group** | `#8E5A33` | a circle of chairs | `mentoring` | `PARENTS & GROUPS` → `PARENTING COURSE` | #courses |
| **Your school or center** | `#5E6248` | a schoolhouse with a leaf on the roof | `typewriter` | `SCHOOLS & CENTERS` → `C.A.R.E. CONSULTING` | #schools |
| **Your faith community** | `#584443` | an open book with a candle | `surprise` (dressed-up children) | `FAITH COMMUNITIES` → `FAITH-BASED TRACK` | #faith |

- Under the tiles, centered, Newsreader italic 22px: *"We are here to partner with you on this journey called life."* (her words), signed *— Dr. Che* in Caveat.
- **Motion:** tiles rise in with stagger .1 s; illustration DrawSVG 1.2 s each; hover: tile lifts 6px, photo `scale 1.06→1` + veil `opacity .6→0`, second pill `y 12→0`, .35 s `power3.out`. Click: smooth scroll to the target section, whose H2 flashes a soft amber underline.

### 05 · Every season of family life (the centerpiece)

**Desktop (≥ 1024): pinned for ~450vh.** Left 55%: a horizontal track of **5 season cards** that slides as you scroll. Right 45%: **the hero's 3D leaves**, fixed, living through each season. The **page background color** tweens between season tints (3.4) via a CSS variable `--season-bg`, scrubbed. A progress bar of five little leaves sits at the bottom; the current one is filled.

- Intro (before the pin): eyebrow `NO MATTER THE SEASON` · H2 **Every family goes through *seasons*.** · sub: *Find yours. Here is how we walk with you through it.*

| # | Season card | Copy | How we help (Patagonia-style sub-link pills) | What the 3D leaves do |
|---|---|---|---|---|
| 1 | **The early years** · `AGES 0–5` | *Sleepless nights, big feelings, bedtime battles and the first routines. You want to connect, not just cope.* | `Family coaching` · `Developmental observation (ages 2½–9)` · `Parenting course` | Spring: small fresh-green leaves unfold from buds; light is pale and bright; tiny sprout particles |
| 2 | **The school years** · `AGES 6–12` | *Homework standoffs, screens, friendships and focus. They're growing fast, and so are the questions.* | `Family coaching` · `Courses on kids and technology` · `Entrepreneurs at Play` | Summer: both leaves full and lush olive, gentle breeze, warm straw light |
| 3 | **The teen years** · `AGES 13–18` | *Moods, anxiety, identity and pressure. They need more space, and you need a plan you can trust.* | `Psychiatric care` · `Parent coaching` | Autumn: the small leaf grows almost as big as the parent and **turns outward** (space), both edged in ochre-rose |
| 4 | **The hard seasons** · `ANY AGE` | *Loss, trauma, a move, a divorce, stress brewing at home. You don't have to weather it alone.* | `Psychiatric evaluation` · `Trauma-informed coaching` | Winter storm: slate light, gusts shake the leaves, soft rain streaks (instanced lines). Never scary: slow, quiet, no lightning |
| 5 | **The thriving season** · `ALWAYS` | *Connection, laughter, warmth and growth: your family's marathon called life, run together.* | `Group courses` · `Learning Corner` · `Book a free call` | Renewal: the rain stops, amber sun returns, **the two leaves turn back toward each other** and a tiny new bud appears on the stem |

- **Card design:** white card, 28px radius, 460×560px, DM Mono age eyebrow in the season accent, Newsreader 40px title, Figtree body, sub-link pills outlined in the accent. A small line-art icon per season (bud, sun, branching twig, raincloud, sunrise).
- **Motion:** track `x` scrubbed (`scrub: 1`), cards enter with a slight `rotateY 8°→0` and settle; background tint and the 3D scene's `uSeason` uniform (0→4) are driven by the **same** ScrollTrigger progress so color, light and leaves always agree. Snap to each card (`snap: 1/4`, `inertia: false`, duration .6).
- **Tablet (768–1023):** pin shorter (300vh), leaves above the track.
- **Mobile (< 768): no pin, no 3D.** Five full-width cards stacked; each has an **SVG version of the leaves** in that season's state (5 small illustrations, drawn from the logo). The page background still tweens to each season tint as its card crosses the middle of the screen.
- **Reduced motion:** stacked cards, static tints, static leaf illustrations.

### 06 · Psychiatric care for children and teens (new)

> Content structure is final; service details are **[CONFIRM]** at the Thursday 05/11 call (exact services, ages, telehealth, insurance, states, fees).

- Background `--linen`, generous whitespace (clinical calm).
- Eyebrow `PSYCHIATRIC CARE` · H2 **Physician-led care for *children* and teens.**
- Lede (max 54ch): *When worry, mood, attention or behavior start to take over family life, your child deserves a careful look from a specialist. Dr. Che is board-certified in child and adolescent psychiatry, with experience caring for young people in outpatient, partial hospitalization and residential settings.*
- **"What to expect" stepper** (left column, a leaf-vein line connects the steps and draws on scroll):
  1. **A free 15-minute call.** *Tell us what's going on. We'll be honest about whether we're the right fit, and point you elsewhere if we're not.*
  2. **A thorough evaluation.** *Time with your child and with you, to understand the whole picture: development, school, family, history and strengths.* **[CONFIRM format, length, ages]**
  3. **A plan you understand.** *Clear next steps for home, school and care, and follow-up to see them through.* **[CONFIRM: medication management? therapy referrals? school coordination?]**
- **Right column:** a white card "Who Dr. Che sees" with chips **[CONFIRM all]**: `Ages ?–18` · `In person in Omaha` · `Telehealth in Nebraska & Iowa` · `Insurance / self-pay`. Below: a soft amber halo with the line art "two leaves under an umbrella".
- **Credential row** (DM Mono, small): `BOARD-CERTIFIED, CHILD & ADOLESCENT PSYCHIATRY` · `MEDICAL DIRECTOR, NOVA TREATMENT COMMUNITY` **[CONFIRM she wants her employer named]** · `ASSISTANT CLINICAL PROFESSOR, CREIGHTON UNIVERSITY SCHOOL OF MEDICINE`
- **Safety note** (always visible, bordered card, not hidden in an accordion): *FamilyCoachMD is not an emergency service. If your child is in immediate danger, call **911**. For a mental health crisis, call or text **988** (Suicide & Crisis Lifeline), any time.*
- CTA: **[Book a free 15-min call]**
- **Motion:** deliberately the quietest section: simple fade-ups, the stepper line drawing, no playful bounces.

### 07 · Private family coaching

- Eyebrow `PRIVATE FAMILY COACHING` · H2 **Confident parents. Capable children. A *compassionate* world.** (her line)
- **"Is this you?" interactive checklist** (her five questions as tappable rows, checkbox styled as a little leaf):
  - *Do you hunger to connect better with your child?*
  - *Are you stressed out by morning and bedtime routines with your young children?*
  - *Do you want to raise resilient, empowered children?*
  - *Have you wondered how to move past the trauma or stress brewing in your family this season?*
  - *Are you struggling to loosen the grip technology has on your kids?*
  Beside it, a **pot with a sprout** (line art, 5 growth stages): each check grows it one stage (MorphSVG between stages, `back.out(1.6)`). At 2+ checks, a line appears under the list: ***"Then private family coaching was made for you."*** and the CTA pill breathes once.
- **Her approach** (pull quote, Newsreader italic 28px, petal background panel): *"I come to partner with you not just as an expert telling you what's best for your family, but as a guide, walking alongside you, exploring ways to infuse vitality, joy, endurance, laughter, warmth and growth into your family's marathon called life."* — Dr. Che. Under it: *My approach honors families of every ethnic and sociocultural background.*
- **"How it works": 4 white value cards** (Allbirds, DM Mono eyebrows):
  - `TIME INVESTMENT`: *Two 1-hour sessions a week for 6 weeks. Family sessions mixed with one-on-one time. By phone or Zoom.*
  - `PERSONALIZED`: *We start by understanding your family's dynamics, then build a plan around your goals.*
  - `WHOLE FAMILY`: *Invite grandparents, co-parents or anyone outside the home. When helpful, a Gesell developmental observation for children 2½ to 9.* **[CONFIRM assessment name, see flag 9]**
  - `INCLUDED`: *A comprehensive, trauma-informed assessment · an evidence-based personal plan · unlimited email support between sessions · practical tools for your family's unique obstacles.*
- Note for centers (small, Figtree 15px): *Run a childcare center? You can offer private coaching to your families as a benefit.*
- CTA: **[Book a free 15-min call]** · price line **[CONFIRM: show a price or "discussed on your free call"]**
- **Motion:** checklist rows slide in (stagger .08); value cards rise with stagger .1 and lift 4px on hover.

### 08 · Kind and firm: the Positive Discipline parenting course

- Eyebrow `GROUP PARENTING COURSE` · H2 **Kind *and* firm, at the same time.**
- Lede: *Children don't come with a manual (that would be nice). Positive Discipline, developed by Dr. Jane Nelsen from Adlerian psychology, gives parents and caregivers a respectful, practical way to show up: responsive, respectful and resourceful.*
- **The balance (signature interaction, Headspace's balanced objects reimagined):** a hand-drawn twig balanced on a smooth stone. Left end: soft round pebbles labeled **Kind**. Right end: square stones labeled **Firm**. The user drags a **leaf handle** along the twig (GSAP Draggable, keyboard-accessible as a `role="slider"`):
  - Far left: the twig tips, the stones slide, caption: *"Kind without firm: kids feel loved, but a little lost."*
  - Far right: tips the other way: *"Firm without kind: kids comply, but stop sharing."*
  - Center (± 8%): the twig levels with a soft spring, two leaves sprout from it, amber glow: ***"Kind and firm. That's Positive Discipline."***
  - Physics feel: tilt follows the handle with a damped spring (`gsap.quickTo`, 0.6 s, `elastic.out(1,.5)`).
- **The 5 tenets** as five leaves along a branch (tap/hover a leaf to open its card; on mobile, a vertical list):
  1. *Helps children feel a sense of connection and belonging.*
  2. *Is kind and firm at the same time, building flexibility and resilience.*
  3. *Works for the long term, considering what a child thinks, feels, learns and decides about themselves and their world.*
  4. *Teaches social and life skills: respect, concern for others, problem-solving, communication and cooperation.*
  5. *Invites children to discover how capable they are.*
- **Course details** (4 pill cards):
  `COST` *Standard $270 per person · Customized $300 per person, for 6 weeks* **[CONFIRM still current]** ·
  `WHO` *Parents and caregivers from your school, center, church or group, or any group of friends.* ·
  `FORMAT` *2-hour classes over 3–6 weeks, in person or online, with hands-on parent–child role-play.* ·
  `CUSTOMIZE` *Add faith-based tenets, trauma-informed care and more.*
- Credential line (DM Mono): `CERTIFIED POSITIVE DISCIPLINE PARENT EDUCATOR (2018) · EARLY CHILDHOOD EDUCATOR (2021)`
- **Self-paced courses (coming soon)** strip: four small cards with a "join the waitlist" pill: *Kids and technology* · *Parenting through the holidays* · *Talking with young kids about periods* · *Defining your family's values*.
- CTA: **[Bring this course to my group]** → #begin with reason preselected.

### 09 · For schools and childcare centers: C.A.R.E.

- Background `--linen-2`. Eyebrow `CONSULTING FOR SCHOOLS & CENTERS` · H2 **We help your team *C.A.R.E.***
- Lede: *We partner with schools and childcare centers to equip staff with the tools to drive meaningful, lasting improvement, so you can better serve the children and families at your learning center.*
- **Desktop: pinned (~260vh).** Four giant letters **C · A · R · E** (Newsreader 300, ~18vw) across the top. As you scroll, each letter in turn fills with evergreen (the others stay outlined), and its panel crossfades in below with a photo inside a **leaf-shaped mask**:
  - **C · Collaborate**: *We work with your team to produce positive, sustainable change.* (photo `mentoring`)
  - **A · Assess**: *We assess children's development and growth with scientifically grounded, research-based tools.* **[CONFIRM: old wording said "NAEYC-approved tools", see flag 10]** (photo `typewriter`)
  - **R · Re-imagine**: *Together we rethink existing systems and everyday practices.* (photo `garden`)
  - **E · Educate**: *Multimodal professional development that sticks: workshops, coaching and parent courses for your families.* (photo `speaking`)
- **Also for organizations:** a white card "Systems consultation" with *Certified Empowering People in the Workplace facilitator*, and "Offer our coaching and courses to your families as a benefit."
- **Organizations we serve:** logo strip (grayscale → color on hover): New Community Omaha · Nelson Mandela Elementary **[CONFIRM permission + logo files]**.
- CTA: **[Book a consultation for my center]**
- **Mobile:** no pin; the four letters become big drop caps on stacked panels.

### 10 · For faith communities

- A calm `#584443` (plum bark) band with linen text and a soft amber candle-glow gradient behind the headline.
- Eyebrow `FAITH-BASED TRACK` · H2 **Grounded in *faith*, informed by science.**
- Lede: *We work with Christian organizations, childcare centers and families to transform lives using biblical principles. Every one of our services can be adapted to your community.*
- Three cards (outlined in amber at 40%):
  - **Jericho & Bethesda plans**: *Consultation built around your organization's specific needs.* With the references set small in DM Mono: `JOSHUA 6:4–5 · JOHN 5:1–8`
  - **Fruit of the Spirit**: *A trauma-informed parenting course.*
  - **Daily Declaration for Kids**: *A children's book and coloring workbook.* **[CONFIRM status/date; the old site said "Fall 2024"]**
- CTA: **[Schedule a consultation]**
- **Motion:** the candle glow flickers *very* slowly (opacity .85↔1, 3 s random); cards fade up. Nothing more.
- **[CONFIRM prominence, flag 7]**: if Larisa wants the main page to stay faith-neutral, this section moves below the fold of #learning as a single card.

### 11 · Our flagship program: Entrepreneurs at Play

- Eyebrow `A FAMILYCOACHMD PROGRAM` · H2 **Where we put it all into *practice*.**
- A large **inset window** (Allbirds) in EP's paper color with a fan of three EP photos (`business-fair`, `flight`, `hens`) and the EP wordmark. On hover the photos fan out (Flip, rotation −8° / 0 / 8°), the cursor shows "visit", and a small live-looking badge reads *"Opening January 4, 2027"*.
- Copy: *Entrepreneurs at Play is a physician-founded, multi-age microschool in Omaha for ages 2 to 12, in two pathways: **The Hatch** (2–6) and **The Studio** (7–12). Mornings are rigorous academics; afternoons are real-world learning in the community.*
- Fact chips: `OPENS JAN 4, 2027` · `AGES 2–12` · `5 CHILDREN TO START, UP TO 12` · `OMAHA AREA`
- CTA: **[Visit Entrepreneurs at Play ↗]** → `https://entrepreneurs-at-play.vercel.app` (final domain later)
- **Motion:** the window rises with a slight scale (0.96→1); photos stagger in under a veil.

### 12 · Take one breath (interactive pause)

A breather between the services and the founder: proof of the brand's calm, not a gimmick.

- Full-viewport section, `--linen` → it warms to a faint amber at the center.
- Small eyebrow `A 16-SECOND RESET` · Newsreader 44px: **Take one breath *with* us.**
- Copy (Figtree 17px, max 44ch): *Calm is contagious. Here's a simple reset you can do anywhere, and teach your child too.* **[CONFIRM tone with Larisa]**
- **Interaction:** a big amber sun (min(56vw, 420px)) and, around it, a rounded square path. Press **[Start]** and a small leaf travels the square, one side per 4 seconds: **Breathe in · 4** (sun swells) → **Hold · 4** → **Breathe out · 4** (sun softens) → **Hold · 4**. One cycle, then: *"Nice. Want help bringing this calm home?"* + **[Book a free call]**. A **[Again]** link restarts.
- Big countdown numbers in DM Mono. Fully keyboard operable; the phase text is in an `aria-live="polite"` region; the sun motion stops under reduced motion and the count stays as text.
- No sound.

### 13 · Meet Dr. Che

**A. The letter** (petal background):
- Left: founder portrait (`founder`) in a tall rounded window, with a Caveat note and arrow *"that's me!"* **[replace with a high-res portrait]**.
- Right: eyebrow `MEET THE FOUNDER` · H2 **Hi, I'm *Dr. Che*.**
- Letter (Newsreader 20px, her words, lightly edited):
  *With gratitude and grace, I warmly welcome you to this journey of growth with FamilyCoachMD. I'm here to walk alongside you, or the parents you serve, during this season of your life. Together we'll explore your values, strengthen the ties that bind, and find the openings for change and growth.*
  *As a physician specialized in child and adolescent psychiatry, my passion for thriving families and communities drives me to bring best practices into homes and organizations like yours. My goal is to grow the sense of belonging and significance for every person in your family, your school and your community.*
  *Thank you for being here.*
- Signature: her real signature SVG (DrawSVG, 1.6 s) **[REQUEST scan]**, fallback Caveat "Dr. Che"; then DM Mono `LARISA A. CHE, MD · CEO & FOUNDER, FAMILYCOACHMD`. Sign-off line kept from the old site: *Stay blessed.* **[CONFIRM, flag 7]**

**B. "From Bafut to Omaha": the journey strip** (Allbirds' Our Story, adapted). Horizontal, draggable (Draggable + inertia on desktop, scroll-snap on mobile). Rounded cards at **staggered heights**, each with a caption under it. Years in DM Mono `--ochre-ink`, titles in Newsreader. Cards without a photo are **typographic cards** (big year + a line-art doodle on a season tint), so the strip looks complete today.

| Year | Title | Caption | Visual |
|---|---|---|---|
| 2003–2008 | Bafut, Cameroon | *Secondary school at Presbyterian Secondary School.* **[CONFIRM she wants this told]** | Type card + hills doodle (request photo) |
| 2009 | Omaha | *High school diploma, Benson High School.* | Type card |
| 2013 | Libraries for Cameroon | *With Reading Drive, turned empty rooms into libraries; recognized by Chelsea Clinton and invited to the Clinton Global Initiative University.* | Type card + open book (request photo) |
| 2013 | UNO, with honors | *Dean's List every semester; Thompson Scholar.* | Type card |
| 2017 | MD | *Doctor of Medicine, University of Nebraska Medical Center.* | Type card + stethoscope-leaf doodle |
| 2017–2020 | Psychiatry residency | *Creighton–UNMC Psychiatry Program.* | Type card |
| 2018 | Positive Discipline | *Certified Positive Discipline Parent Educator.* | Type card |
| 2020–2022 | Child & adolescent fellowship | *Creighton University Medical Center.* | Type card |
| 2023 | On KETV | *Helping parents with back-to-school anxiety, and with talking to kids about war.* | KETV still (request) |
| 2024 | FamilyCoachMD | *Founds FamilyCoachMD. Medical Director at NOVA Treatment Community; Assistant Clinical Professor at Creighton.* | Portrait |
| 2027 | Entrepreneurs at Play | *Opens a physician-founded microschool in Omaha.* | `business-fair` photo |

- **Motion:** cards enter with the Allbirds veil (opacity .35 + linen veil → clear) as they reach 70% of the viewport; drag shows a "drag" cursor; on desktop the strip also nudges with vertical scroll (`x` scrubbed −10%).

### 14 · Trust: credentials, media, organizations

- **Credentials marquee:** two rows of DM Mono pills moving in opposite directions (60 s/loop, pauses on hover, static under reduced motion):
  Row 1: `BOARD-CERTIFIED ADULT PSYCHIATRIST` · `BOARD-CERTIFIED CHILD & ADOLESCENT PSYCHIATRIST` · `MD, UNMC` · `FELLOWSHIP, CREIGHTON` · `LICENSED IN NEBRASKA & IOWA`
  Row 2: `CERTIFIED POSITIVE DISCIPLINE PARENT EDUCATOR` · `CERTIFIED POSITIVE DISCIPLINE EARLY CHILDHOOD EDUCATOR` · `EMPOWERING PEOPLE IN THE WORKPLACE FACILITATOR` · `AACAP` · `APA` · `AMA` · `POSITIVE DISCIPLINE ASSOCIATION`
- **"As seen on KETV"** with the two 2023 segments (links in 15).
- **Organizations we serve** (if not shown in 09 on the same screen): the logo strip.
- No invented statistics. If Larisa provides real numbers (families coached, centers served, parents trained), add a 3-item count-up here (Headspace), otherwise skip it.

### 15 · Learning Corner

- Eyebrow `LEARNING CORNER` · H2 **Read, watch, *grow*.** · "View all" link (future blog).
- Patagonia-style **story cards** (serif titles, author line, **blur-up image loading**: a 24px blurred placeholder sharpens when the real image decodes), horizontally scrollable with a round arrow button:
  1. **A letter from Dr. Che** · *Why I started FamilyCoachMD* · opens the full letter in a soft modal (13A text + more). **[CONFIRM: ask her for a longer personal letter]**
  2. **On KETV: back-to-school anxiety** · *Resources for parents and caregivers* · Aug 10, 2023 · external link **[REQUEST URL]**
  3. **On KETV: talking with kids about war** · Oct 12, 2023 · external link **[REQUEST URL]**
  4. **Daily Declaration for Kids** · *A children's book and coloring workbook* · **[CONFIRM date]**
  5. **Self-paced courses** · *Join the waitlist* → email capture (same as footer).
- The 2020 "Summer Fun for Kids" placeholder post is **not** carried over.

### 16 · Questions families ask (FAQ)

Petal background; left column sticky title on desktop, accordion on the right (one open at a time, height auto with Flip, + rotates into ×).

1. **Is coaching the same as therapy or psychiatric care?** *No. Coaching is practical, non-clinical support for parenting and family life. Psychiatric care is medical care from a physician. We'll help you figure out which fits on your free call.* **[CONFIRM wording]**
2. **Do you prescribe medication?** *During coaching and courses, no: we encourage every family to keep working with their current therapist or medication provider. For psychiatric care, [CONFIRM].*
3. **Where do you see families?** *In the Omaha area, and by phone or Zoom. [CONFIRM telehealth states: Nebraska and Iowa].*
4. **Can my school or childcare center offer your services to its families?** *Yes. You can offer all of our services, from private coaching to group courses, to the families at your center.*
5. **What if I don't belong to a school or center?** *Absolutely welcome. We love working with small groups: playgroups, church groups, book clubs, friends.*
6. **How much does it cost?** *The group parenting course is $270 per person (standard) or $300 (customized) for 6 weeks. Coaching and care are discussed on your free 15-minute call.* **[CONFIRM]**
7. **What is the developmental assessment?** *For children about 2½ to 9, a Gesell developmental observation can show where a child is in their growth, so the plan fits them.* **[CONFIRM name]**
8. **Do you work with families of every background and faith?** *Yes. Our approach honors families of every ethnic and sociocultural background. Faith communities can also choose our faith-based track.*
9. **Do you accept insurance?** **[CONFIRM]**
10. **Is this for emergencies?** *No. If your child is in danger, call 911. For a mental health crisis, call or text 988.*

### 17 · Begin with a free 15-minute call (the conversion moment)

- `--evergreen-deep` band with the stem wave on top; the amber sun glows behind the headline.
- H2 (linen): **Let's walk this *season* together.** · sub: *Book a free 15-minute call. No pressure, no forms about your history: just a conversation.*
- **"What brings you here?"** chips (Headspace's chip grid), single select: `Family coaching` · `Psychiatric care for my child` · `Parenting course for a group` · `Consulting for my school or center` · `Faith community` · `Entrepreneurs at Play` · `Something else`
- After a chip is picked, the **scheduler** opens in place (Flip expand): an embedded **HIPAA-appropriate booking tool** (section 9) with the reason passed as a non-clinical tag. Fields we collect ourselves: **name, email, phone, reason** only. **Never** ask for symptoms or history on this page.
- Beside it: `GROW@FAMILYCOACHMD.COM` (copy-to-clipboard pill) · phone **[CONFIRM: (402) 452-0133 from the CV vs (501) 819-GROW from the old site]**.
- Small print (linen 70%): *Please don't share medical details here. In a crisis, call or text 988.*
- **Motion:** chips pop in (stagger .05, `back.out(1.6)`); selected chip fills amber with evergreen text; scheduler expands with Flip 0.5 s.

### 18 · Footer

- `--evergreen-deep`. Top: a pill email field (Allbirds): *"Notes for growing families: occasional, never spammy."* **[CONFIRM newsletter tool]**
- Columns: **Care** (Psychiatric care · Family coaching · Parenting course · Self-paced courses) · **Organizations** (Schools & centers · Faith communities · Systems consultation) · **About** (Dr. Che · Learning Corner · Entrepreneurs at Play ↗) · **Contact** (email · phone · Omaha, NE).
- Socials: Instagram · Facebook · YouTube **[REQUEST real handles; the old icons point to Squarespace's own accounts]**.
- Giant wordmark at the bottom (on-dark logo, 92vw), whose two leaves sway gently when they scroll into view.
- Crisis line, always present: *In a crisis? Call or text 988. In an emergency, call 911.*
- Legal: © 2026 FamilyCoachMD LLC · Privacy · Terms · Notice of Privacy Practices **[if clinical services launch]** · Accessibility · *Site by Haderach Solutions*.

### 404 page

The Headspace homage, in our language: the amber sun slowly breathing, the two leaves resting on it, Newsreader: **"This page took a different path."** · Figtree: *Take a breath. In… and out. Now let's get you home.* · **[Back to FamilyCoachMD]**.

---

## 6. Motion system

**Personality:** *slow, steady, alive.* Calmer than EP: fewer bounces, longer eases, breathing rhythms (4 s in / 4 s out). Playful springs are reserved for the leaves and the sprout. Nothing flashes, nothing loops fast.

| Token | Value | Use |
|---|---|---|
| `ease-soft` | `power3.out` | Most reveals |
| `ease-breath` | `sine.inOut` | Breathing, swaying, sun |
| `ease-leaf` | `back.out(1.6)` / `elastic.out(1,.55)` | Leaves, sprout, balance settling |
| `ease-curtain` | `expo.inOut` | Loader wipe, big transitions |
| `dur-xs / s / m / l` | 0.2 / 0.4 / 0.8 / 1.2 s | Hover / UI / reveals / hero (slightly slower than EP) |
| `breath` | 4 s in, 4 s out | Hero leaves, suns, cursor pulse |
| Stagger | 0.04 chars · 0.06 words · 0.1 lines · 0.1 cards | |

**Global behaviors**
- **Lenis** (`lerp: 0.08`, a touch smoother than EP), synced with ScrollTrigger. Native scroll on touch devices and under reduced motion.
- **Default reveal:** `y 28→0, opacity 0→1`, 0.8 s, at 85% of the viewport, once.
- **Photo reveal (Allbirds veil):** linen veil `opacity .6→0` + image `scale 1.05→1`, 1.0 s.
- **Headlines:** SplitText lines, mask reveal `yPercent 110→0`; the italic word arrives last with a 0.15 s delay.
- **Season engine:** one `--season-bg` CSS variable + one `uSeason` Three.js uniform, both driven by section 05's ScrollTrigger. Outside 05 the page returns to linen.
- **Cursor (desktop only):** a 12px amber dot that **breathes** (scale 1↔1.2 on the 8 s cycle) with a 34px bark ring trailing (lerp .14). Labels: "open" on tiles, "drag" on strips, "visit" on the EP window, "breathe" in section 12. Hidden on touch.
- **Magnetic buttons:** primary CTAs only, ≤ 8px.

---

## 7. Responsive plan

| Breakpoint | Behavior |
|---|---|
| ≥ 1280 | Full experience |
| 1024–1279 | Same, tighter gutters, 3D falling leaves 16 |
| 768–1023 | Seasons pin 300vh with leaves above; tiles 3+2; C.A.R.E. pin 200vh |
| < 768 | Single column · burger · hero leaves in a 48svh band under the copy · **no pins** (05 and 09 stack) · season leaves as SVG · tiles in horizontal scroll-snap (78vw) · journey strip with scroll-snap · balance slider full width · native scroll (no Lenis) |

- Tap targets ≥ 44×44 px. Use `svh` units. Test at 360, 390, 768, 1024, 1440, 1920.
- On mobile the whole page must make sense **without hover**: tiles show their second pill after the first tap, and a second tap navigates.

---

## 8. Accessibility, reduced motion and clinical trust

- **`prefers-reduced-motion`:** loader = static logo fade · no Lenis · no pins · the seasons become stacked cards with static tints · 3D replaced by `hero-leaves.webp` · marquee and rotating text stop on the first item · the breathing exercise keeps the counts as text, without the swelling sun.
- **Pause controls** for the announcement bar, rotating hero line and marquee (WCAG 2.2.2).
- One H1, logical H2s, landmarks. Every interactive element is a real `button`/`a`/`input`, with focus rings `2px solid --evergreen`, offset 3px (amber on dark bands).
- The balance is a `role="slider"` with `aria-valuetext` ("Balanced: kind and firm"). The checklist uses real checkboxes. Season cards are an ordered list.
- Alt text for every photo; line art and canvas `aria-hidden`. The leaf tooltips are duplicated in text.
- Color: ochre and amber never carry small text on light backgrounds (3.4).
- **Clinical trust (non-negotiable for a physician's public page):**
  - Crisis information (988 / 911) visible in 06, 16, 17 and the footer.
  - **No PHI** in our forms; booking through a HIPAA-appropriate tool (section 9). Analytics must be privacy-first (no session replay, no ad pixels on booking pages).
  - No patient testimonials or outcome claims. Parent quotes about coaching or courses only with written consent and without health details.
  - Only claim credentials Larisa confirms (flag 1). Licensure statement for NE and IA in the footer if she wants it.
  - A coaching disclaimer near 07: *Coaching is not therapy or medical treatment.* **[CONFIRM wording]**

---

## 9. Technical plan

**Stack:** identical to EP so code can be shared.
- **Vite** (vanilla JS, ES modules) on **Vercel**. Pin exact versions at install.
- `gsap` 3.13+ with ScrollTrigger, SplitText, Flip, Draggable, InertiaPlugin, DrawSVGPlugin, MotionPathPlugin, MorphSVGPlugin (all free in the npm package).
- `lenis`; `three` (lazy chunk) with `SVGLoader`.
- Hand-written CSS with custom properties (tokens in 3.4/3.5). No framework.
- **Booking:** a HIPAA-appropriate scheduler, chosen with Larisa (e.g., the scheduling tool of her EHR/practice software such as SimplePractice or Jane, or an equivalent with a BAA). For non-clinical bookings (courses, centers) a plain scheduler is fine. **[CONFIRM tool]**
- **Email capture:** her newsletter tool of choice (e.g., MailerLite/ConvertKit) via a serverless function. **[CONFIRM]**

**Structure (inside this folder)**
```
familycoachmd/
  preparacao-familycoachmd.md      # this plan
  index.html
  404.html
  vercel.json                      # redirects from old Squarespace URLs
  src/
    main.js            # boot, Lenis, ScrollTrigger, reduced-motion switch, season engine
    loader.js          # "Take a breath" (reuses logo-anim.svg)
    leaves3d.js        # Three.js: hero + seasons scene (uSeason uniform)
    sections/          # tiles, seasons, care, checklist, balance, care-letters, breathe, journey, marquee, stories, faq, booking
    styles/ tokens.css base.css sections.css
    partials/ logo-anim.svg  (copied from ../entregas/site/src/partials/)
  public/
    img/   (WebP/AVIF from ../entregas/site/public/img + new FCMD photos)
    logo/  (SVGs copied from ../entregas/site/logo/)
    svg/   (line art, season leaves, doodles, signature)
    fonts/ (self-hosted Newsreader, Figtree, DM Mono, Caveat subsets)
```

**Three.js scene notes**
- Leaves from `familycoachmd-symbol.svg` (`#leaf-big`, `#leaf-small`) → `SVGLoader.createShapes` → `ExtrudeGeometry` (depth 6, bevel 3, curveSegments 24) → centered and scaled; curl + wind in `onBeforeCompile` (uniforms `uTime`, `uWind`, `uCursor`, `uSeason`).
- `uSeason` (0–4) drives: leaf base colors (lerp through season palettes), light color/intensity, wind strength (storm at 3), rain `InstancedMesh` opacity (only around 3), the small leaf's rotation and scale (grows at 2, turns back at 4), and the new bud's scale (4).
- One renderer, `alpha: true`, `antialias` only when `dpr ≤ 1.5`. Target ≤ 60k triangles.
- Pre-render `hero-leaves.webp` (and 5 season stills for the mobile SVG reference) from the same scene.

**Old URL redirects** (`vercel.json`, permanent): `/about → /#about` · `/private-family-coaching → /#coaching` · `/parenting-course → /#courses` · `/courses → /#courses` · `/childcare-center-consultant → /#schools` · `/Services → /#schools` · `/work-with-me → /#begin` · `/contact → /#begin` · `/blog → /#learning` · `/cart → /`.

**Domain and email:** familycoachmd.com currently points to Squarespace. Launch first on a Vercel preview (`familycoachmd.vercel.app`). When switching DNS, **keep the MX records untouched** so `Grow@familycoachmd.com` keeps working. **[CONFIRM where her email is hosted]**

**Performance budget:** LCP < 2.0 s on 4G (the H1 is LCP; fonts preloaded with `font-display: swap`) · JS ≤ 180 KB gzip before Three.js · CLS < 0.05 · 60 fps on a mid-range phone, loops paused off-screen.

**Images:** 480 / 960 / 1200 widths as AVIF + WebP (+ JPG fallback), `<picture>` + `srcset`, lazy below the fold, 24px blurred placeholders for the blur-up cards. Duotones made at export.

**SEO and sharing**
- Title: *FamilyCoachMD · Child & Family Psychiatry, Coaching and Parenting Courses in Omaha*
- Meta description: *Physician-led care for every season of family life: child and adolescent psychiatry, private family coaching, Positive Discipline parenting courses and consulting for schools and childcare centers. Book a free 15-minute call.*
- JSON-LD: `MedicalBusiness` (or `MedicalClinic`) + `Physician` (Larisa A. Che, MD, `medicalSpecialty: Psychiatric`) + `Organization` with `subOrganization` Entrepreneurs at Play. Area served Omaha / Nebraska / Iowa **[CONFIRM]**.
- OG image 1200×630: the two 3D leaves + H1 + logo. Favicon: the two leaves (existing symbol).

---

## 10. Image and asset map

Photos: `../entregas/site/public/img/<name>-sm.webp | -lg.webp` (originals in `../entregas/site/img/`, same as `../entregas/instagram/src/img/pNN`).

| File | pNN | Content | Used in |
|---|---|---|---|
| `founder` | p16 | Dr. Che portrait | 13A, 14, Learning card 1 (until hi-res arrives) |
| `cooking` | p12 | Kids mixing batter | 04 "Your family" hover, 05 early years |
| `speaking` | p10 | Boy in a vest (B&W) | 04 "Your child or teen" hover, 09 E |
| `mentoring` | p11 | Older child helping a younger one | 04 "Parent group" hover, 09 C |
| `typewriter` | p14 | Child at an antique typewriter | 04 "School" hover, 09 A |
| `surprise` | p02 | Two dressed-up children (B&W) | 04 "Faith" hover |
| `garden` | p07 | Child pulling weeds (B&W) | 09 R, 05 early years alt |
| `business-fair` | p03 | Boy selling at a fair | 11, 13 strip (2027) |
| `flight` | p06 | Children in a flight simulator | 11 |
| `hens` | p13 | Child feeding hens | 11, 05 school years |
| `guitar`, `horse`, `capitol`, `golf`, `podcast`, `cuisine` | p09, p15, p01, p05, p04, p08 | EP program moments | Spare (season cards variations, Learning Corner thumbnails) |
| `logo-fcmd.png` | p00 | Old script logo | **Not used** (replaced) |

**To create:** loader leaf-fall paths · 5 audience line illustrations · 5 season icons + 5 season leaf SVG states (mobile) · sprout in 5 MorphSVG stages · balance (twig, stone, pebbles) · leaf-shaped image mask · stem-wave divider mask · 3D leaves scene + `hero-leaves.webp` fallback · typographic journey cards · OG image · 404 art.

**To request from Larisa (bring to Thursday 05/11, 1 PM CT):** 3–5 hi-res portraits · coaching / class / training photos with consent · signature scan · KETV links and stills · Reading Drive / Cameroon photos (if she wants that story) · logos of New Community Omaha and Nelson Mandela Elementary (with permission) · social media handles.

---

## 11. Content flags to resolve before going public

1. **Credentials:** the old site says *Board Certified Adult Psychiatrist* and *Board Certified Child and Adolescent Psychiatrist*; the CV only states adult board certification explicitly. Confirm both before publishing.
2. **Psychiatric services (06):** exact services, ages, in-person vs telehealth, states (NE + IA licenses on the CV), insurance or self-pay, fees, medication management. Everything in 06 marked [CONFIRM] waits for this.
3. **Phone:** CV `(402) 452-0133` vs old site `(501) 819-GROW (4769)`. Pick one public number.
4. **Employer mentions:** OK to name NOVA Treatment Community (Medical Director) and Creighton (Assistant Clinical Professor) on a private-practice site?
5. **Prices:** group course $270 / $300 per person for 6 weeks: still current? Show a coaching price or not?
6. **Stale items:** "Daily Declaration for Kids" (was "Fall 2024"), self-paced courses ("coming soon" since 2024), 2020 blog post (dropped).
7. **Faith:** the old site is openly Christian ("child of God", "God-given potential", "Stay blessed", faith-based track), while EP says it welcomes all faiths. Confirm how prominent faith should be on the parent brand: keep section 10 as a full band, or move it to a single card.
8. **Cameroon story (13B):** the CV shows school in Bafut, not birthplace. Ask before telling "From Bafut to Omaha".
9. **Assessment name:** old site says "Yale Gesell Assessment"; confirm the exact instrument name she uses (e.g., the Gesell Developmental Observation).
10. **"NAEYC-approved tools" (09 A):** keep her exact claim only if she can name the tools; otherwise use "research-based tools" (current draft).
11. **Positive Discipline founder:** the old site spells "Dr Jane Nelson"; the correct spelling is **Jane Nelsen** (fixed in the draft).
12. **Organizations served:** permission to show New Community Omaha and Nelson Mandela Elementary names/logos.
13. **Social links:** the old icons point to Squarespace's accounts; get her real handles (or hide icons).
14. **Booking + newsletter tools** and **email hosting** (DNS switch safety).
15. Build with `data-confirm` attributes on every [CONFIRM] element, and `grep` for them before launch.

---

## 12. Build order (when approved)

1. Copy assets into this folder (logo SVGs, `logo-anim.svg`, WebP photos); tokens, fonts, base layout; all sections as static HTML with real copy (mobile first).
2. Line art, season SVGs, masks; image exports and duotones.
3. Core motion: Lenis, reveals, SplitText, floating nav, announcement bar, cursor.
4. Signature pieces: season engine (05, CSS first, then 3D) → audience tiles → "Is this you?" sprout → kind-and-firm balance → C.A.R.E. pin → journey strip → breathing pause.
5. Loader "Take a breath" → Three.js leaves (hero + seasons) → fallbacks and `hero-leaves.webp`.
6. Booking embed, email capture, redirects, SEO/JSON-LD, 404.
7. Reduced-motion and accessibility pass, Lighthouse (≥ 90 in all four on mobile), clinical-trust checklist (section 8).
8. Device testing (iPhone Safari, Android Chrome, desktop Chrome/Safari/Firefox) → Vercel preview link for Larisa → resolve section 11 flags → DNS switch.

> **Next step:** review this plan, then give the go-ahead to start step 1. Nothing will be built before that confirmation.
