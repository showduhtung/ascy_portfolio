# UI/UX Critique: Amanda Sarah Chin Portfolio Site

**Date:** March 10, 2026
**Scope:** Desktop (1440px+), Tablet (768–991px), and Mobile (≤479px) viewports
**Standards referenced:** WCAG 2.1 AA, Nielsen Norman Group research, Google Material Design guidelines

---

## 1. Accessibility Issues

### 1a. Active Nav Link Fails WCAG AA Contrast (HIGH)
The active nav link color `#0082f3` on the cream background `#fcf6e6` produces a contrast ratio of only **3.55:1** — this **fails** the WCAG AA minimum of 4.5:1 for normal-sized text. At nav link font sizes (roughly 16px, not "large text"), this is non-compliant.

**Fix:** Darken the blue to at least `#0065c1` (~4.5:1) or pair it with an underline/bold treatment so color isn't the sole active-state indicator.

### 1b. Empty or Missing Alt Text on Key Images (HIGH)
- The hero GIF (`amanda-gif.gif`) has `alt=""` — it's marked decorative, but if this conveys personality or context, it should have descriptive alt text.
- All three case study cover images (`cover-task-tracker.jpg`, `cover-airasia.jpg`, `cover-health-startup.png`) have `alt=""`. These are **not** decorative; they're meaningful project thumbnails tied to linked case studies. Screen reader users get zero context about what each project looks like.

**Fix:** Add descriptive alt text like `alt="Screenshot of the student task tracker interface"`, etc.

### 1c. No Visible Focus Styles (HIGH)
The CSS contains zero `:focus` or `:focus-visible` rules. Keyboard-only users have no visual indication of where they are on the page. WCAG 2.4.7 requires a visible focus indicator on all interactive elements. The browser default outline is likely suppressed or insufficient against these backgrounds.

**Fix:** Add explicit focus styles to `.nav-link`, `.main-button`, `.case-card-link`, and footer links with at least a 3:1 contrast focus ring.

### 1d. No `<main>` Landmark (MEDIUM)
The page uses `<nav>`, `<section>`, and `<footer>` but never wraps the primary content in a `<main>` element. Screen reader users who navigate by landmarks can't jump directly to the main content.

**Fix:** Wrap the hero section and case studies in `<main>`.

### 1e. No Skip-to-Content Link (MEDIUM)
There's no mechanism for keyboard users to bypass the navigation and jump directly to content — standard practice for accessible sites.

### 1f. Heading Hierarchy Issues (LOW)
The page uses `<h1>` for the name (correct), `<h2>` for "case studies" (correct), and `<h3>` for card titles (correct). However, the `<h2>` "case studies" heading is nested inside `<header>` > `<div>` > `<div>` > `<div>`, making the DOM structure needlessly deep and potentially confusing for assistive technology.

---

## 2. Responsive Design & Mobile Issues

### 2a. Hero Layout Breaks on Tablet/Small Laptop (767px) (HIGH)
At the 767px breakpoint, `.hero-img1` is set to `width: 12%` and `height: 80vw`. A 12%-wide column on a 767px screen is only ~92px wide — far too narrow to display a portrait photo meaningfully. The `80vw` height (~614px) creates a bizarrely tall, pencil-thin image column. This suggests the layout was designed at desktop and retrofitted for smaller screens without visual testing.

**Fix:** Stack the hero content vertically at this breakpoint instead of forcing a three-column layout into a small space.

### 2b. Aggressive Negative Margins on Mobile (≤479px) (HIGH)
`.hero-img1` at mobile uses `margin: -6em 0 -6.8em 19vw` — nearly 7em of negative vertical margin. This is a fragile layout hack that can cause content overlap, clipping, or scroll issues depending on content length and device. It signals that the layout needs structural rethinking, not margin patching.

**Fix:** Redesign the mobile hero as a simple stacked layout: name → subtitle → CTA → photo.

### 2c. Case Study Cards Stay Side-by-Side Too Long (MEDIUM)
The case card grid uses `grid-template-columns: 1fr 1fr` down to 479px. On a 400px phone screen, that means two columns sharing ~200px each — the image gets tiny and card text becomes nearly unreadable at `0.8rem` / `0.7rem`. Cards only stack to single-column at ≤479px.

**Fix:** Switch to single-column cards at 600–640px or earlier, when the two-column layout becomes cramped.

### 2d. Inconsistent Unit Mixing (MEDIUM)
The CSS mixes `vw`, `vh`, `rem`, `em`, `px`, and `%` unpredictably:
- `.section-heading` uses `4vw` at desktop, `5vh` at mobile — viewport height for a heading size means the text grows/shrinks as you scroll or rotate your phone.
- Card font sizes jump between `rem` and `px` across breakpoints.
- Spacing uses `vw` in some places and fixed `rem`/`px` in others.

This makes the design unpredictable across devices. `vh` for font sizes is particularly risky since mobile viewport height changes when the address bar appears/disappears.

**Fix:** Standardize on `rem` for typography and use `clamp()` for fluid scaling (e.g., `clamp(1.5rem, 4vw, 3rem)`).

### 2e. No `max-width` on Body Text (LOW)
The hero subtitle and card text don't have a constrained line length. On very wide screens (1920px+), text could run to 100+ characters per line, well beyond the readable 50–75 character range.

---

## 3. Navigation

### 3a. Dead Links (HIGH)
Three of four nav links point to `href="#"`: Home, About, and Now. The "my projects" CTA scrolls to `#UX`, which works. But `#` links scroll to page top and provide no value — they're placeholders that suggest an incomplete site.

**Fix:** Either build out those pages, or remove the links until they lead somewhere real.

### 3b. Hamburger Menu Has No Close Affordance (MEDIUM)
The mobile menu opens with the hamburger icon, but the icon doesn't change to an "X" or close symbol when open. The `aria-expanded` attribute is toggled correctly (good), but visually the user sees the same three-line icon whether the menu is open or closed.

**Fix:** Swap the icon to an X when `.nav-menu.open` is active.

### 3c. Navbar Is Not Sticky (LOW)
The navbar uses `position: relative`, so it scrolls out of view. For a portfolio site with long scroll, a sticky nav (or a back-to-top button) helps users navigate without scrolling all the way up.

### 3d. No Logo or Site Identity in Nav (LOW)
The nav contains only text links — there's no logo, site name, or home-identifiable element on the left side. The nav is right-aligned with `justify-content: flex-end`, leaving a large empty left space on desktop.

---

## 4. Visual Hierarchy & Layout

### 4a. Hero Section Competing Elements (MEDIUM)
The hero packs in: a large heading, subtitle, CTA button, an animated GIF, a portrait photo, and a lifestyle photo — all in one viewport. There's no clear visual flow guiding the eye from name → role → action. The three images fight for attention rather than supporting a single narrative.

**Fix:** Simplify. Lead with name + role + CTA, and use one strong photo. The GIF and lifestyle photo could live on an About page.

### 4b. Case Study Cards Lack Hover Feedback (MEDIUM)
The entire card is wrapped in an `<a>` tag and is clickable, but there's no visual hover state on the card itself — no background change, shadow, elevation, or border color shift. The only hover interaction is the subtle `.main-button-circle` animation on the hero CTA. On desktop, users get no feedback that cards are interactive.

**Fix:** Add a card hover state: subtle shadow, slight scale, or background tint.

### 4c. Excessive Wrapper Nesting (LOW)
The case studies section has 6 levels of wrapping divs: `.case-studies-bg` → `.case-studies-section` → `header.case-studies-header` → `.case-studies-padding` → `.case-studies-container` → `.case-studies-inner`. This is hard to maintain and makes the CSS overly specific. Most of these could be consolidated.

### 4d. "Read More" Looks Like Plain Text (LOW)
The "Read more" element inside case cards is a `<span>` inside a `<div>` — it has no underline, no button styling, and no color differentiation. Since the whole card is a link, users might not realize the card itself is clickable (especially on mobile where there's no hover).

---

## 5. Typography

### 5a. Three Custom Fonts Is Heavy (MEDIUM)
The site loads three Google font families: Climate Crisis, Space Grotesk (4 weights), and Unbounded (3 weights). That's potentially 10 font files. Each adds latency and competes for rendering time. The `font-display` strategy isn't specified in the Google Fonts URL, which defaults to `block` — meaning invisible text (FOIT) until fonts load.

**Fix:** Add `&display=swap` to the Google Fonts URL. Consider whether Unbounded (used only on card titles) justifies a full font load, or if Space Grotesk bold could serve that role.

### 5b. Viewport-Based Heading Sizes Are Unpredictable (MEDIUM)
`.section-heading` uses `font-size: 4vw` on desktop — that's 57px at 1440px but 77px at 1920px. At mobile (≤479px) it switches to `5vh`, which on a typical 844px-tall phone is 42px but on a short landscape phone could be 20px. Heading size shouldn't depend on viewport height.

**Fix:** Use `clamp()` for bounded fluid typography: `font-size: clamp(2rem, 4vw, 4rem)`.

### 5c. Card Text Too Small on Mobile (MEDIUM)
At ≤479px, `.case-card-title` drops to `0.8rem` (~12.8px) and `.case-card-subtitle` to `0.7rem` (~11.2px). The subtitle is below the recommended 12px minimum for readable mobile text.

**Fix:** Keep card text at a minimum of `0.875rem` (14px) on mobile.

---

## 6. Performance

### 6a. Hero Portrait Uses `loading="eager"` Correctly (GOOD)
The main portrait image correctly uses `loading="eager"` — it's the LCP candidate and shouldn't be lazy-loaded. However, it's missing `fetchpriority="high"` which would further prioritize it.

### 6b. No `width`/`height` Attributes on Most Images (MEDIUM)
Only the GIF has `width="183"`. The portrait and lifestyle photos and all card images lack explicit dimensions. Without them, the browser can't reserve space before images load, causing Cumulative Layout Shift (CLS).

**Fix:** Add `width` and `height` attributes to all `<img>` tags.

### 6c. No Image Format Optimization (LOW)
All images are JPG/PNG/GIF. Modern formats like WebP (with fallback) would reduce file sizes by 25–35% with no quality loss.

### 6d. GIF in Hero May Be Large (LOW)
Animated GIFs are notoriously heavy. If this file is more than a few hundred KB, it could significantly slow initial load. Consider converting to a short looping video (`<video>` with `autoplay muted loop`) for dramatically smaller file size.

---

## 7. Interactive Elements

### 7a. "My Projects" CTA Has Unusual Padding (LOW)
The `.main-button` has `padding: 1em 1.56em 0.5em` — the top padding is double the bottom. This makes the text sit lower in the button than centered, which looks off-balance. The purple circle hover animation (`translateY`) sweeps down from the top, but the asymmetric padding means it doesn't feel centered.

### 7b. Hover-Only Interactions Don't Work on Touch (MEDIUM)
The `.main-button-circle` hover animation (the purple sweep) is triggered by `:hover`. On mobile/touch devices, there's no hover state — this interaction is invisible to ~60% of web users. There's no `:active` or tap feedback as a substitute.

**Fix:** Add a `:active` state for touch devices, or make the button visually distinct without requiring hover.

### 7c. Footer Links Have No Visual Differentiation (LOW)
The footer email and LinkedIn links inherit `color: var(--text)` with no underline. They look identical to surrounding text. Users may not realize they're clickable.

**Fix:** Add underline or color differentiation to footer links.

---

## 8. Miscellaneous

### 8a. LinkedIn Link Opens in Same Tab (LOW)
The LinkedIn nav link (`href="https://linkedin.com/in/amandasarahchin"`) opens in the same tab, navigating users away from the portfolio. External links on portfolio sites typically use `target="_blank" rel="noopener noreferrer"`.

### 8b. No Open Graph Image (LOW)
The meta tags include `og:title` and `og:description` but no `og:image`. When shared on social media or Slack, the link preview will have no thumbnail — a missed opportunity for a visual portfolio.

### 8c. No Favicon (LOW)
No `<link rel="icon">` is present. The browser tab shows a generic icon.

---

## Summary Scorecard

| Category | Critical | Medium | Low |
|----------|----------|--------|-----|
| Accessibility | 3 | 2 | 1 |
| Responsive/Mobile | 2 | 2 | 1 |
| Navigation | 1 | 1 | 2 |
| Visual Hierarchy | 0 | 2 | 2 |
| Typography | 0 | 3 | 0 |
| Performance | 0 | 1 | 3 |
| Interactive Elements | 0 | 1 | 2 |
| Miscellaneous | 0 | 0 | 3 |
| **Total** | **6** | **12** | **14** |

**Top 5 priorities to address first:**
1. Fix active nav link contrast ratio (accessibility/legal compliance)
2. Add meaningful alt text to case study images
3. Add visible keyboard focus styles
4. Redesign hero layout for tablet/mobile (stop using negative margin hacks)
5. Add hover/active states to case study cards
