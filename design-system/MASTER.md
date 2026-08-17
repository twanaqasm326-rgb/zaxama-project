# FAKHAMA DECOR Digital Showroom — Master Design System (Source of Truth)

> **Document Status**: Active / Persistent Master Token Specification (Phase 1: Immersive Editorial Showroom)  
> **Target Application**: Digital Product Showcase, Selection Box & Architectural PDF Platform  
> **Visual Archetype**: Immersive Editorial Showroom (Evolution of Warm Architectural Minimalism)  
> **Default Priority**: Light Atmospheric Atelier (`#FAF8F5`) with Dark Monolith Contrast Zones (`#181614`)

---

## 1. Design Strategy & Principles

1. **Product-First Primacy & Spatial Atmosphere**: The interface is an atmospheric architectural showroom. Products are staged within calibrated light fields, radial luminescence, and environmental zones that celebrate physical materiality (Roman travertine, old-growth walnut, raw bouclé, living brass).
2. **Editorial Typographic Tension**: Monumental serif display headlines (`Cormorant Garamond` with italicized bronze emphasis) balanced against structured architectural sans (`Plus Jakarta Sans`) and precision technical monospace blueprint metadata (`JetBrains Mono`/`ui-monospace`).
3. **Dynamic Environmental Zones**: Rather than a flat, uniform white page, the showroom transitions through intentional spatial chambers:
   - *Light Atmosphere Canvas* (`#FAF8F5`) for spacious daytime discovery.
   - *Linen Travertine Chamber* (`#F4EFEA`) for curated duets and editorial showcases.
   - *Dark Obsidian Monolith Zone* (`#181614`) for dramatic signature specimen illumination.
   - *Tactile Umber Atelier* (`#EFE9E0`) for material provenance and craftsmanship narrative.
4. **Weighted Architectural Motion**: Restrained, multi-stage entrance choreographies (600–900ms) with gentle easing. Strict `prefers-reduced-motion` compliance where all decorative transitions resolve instantly to zero.
5. **Resilient & Accessible Foundations**: Minimum contrast ratio of 4.5:1 for body copy and 3:1 for large display titles. Radix UI headless accessibility primitives underneath bespoke styling. Full keyboard navigation (`Tab`, `Escape`, `ArrowLeft`/`ArrowRight`), 44px touch targets, and ARIA live regions.

---

## 2. Color System & Environmental Tokens

The color architecture blends warm architectural neutrals with deep basalt anchors and champagne bronze highlights:

| Semantic / Environmental Token | Hex Value | Semantic Role & Application |
|---|---|---|
| `showroom.alabaster` | `#FAF8F5` | Primary canvas & light atmosphere background |
| `showroom.travertine` | `#F4EFEA` | Secondary linen travertine chamber & subtle cards |
| `showroom.stone` | `#EAE3D8` | Muted stone architectural dividers & swatch backdrops |
| `showroom.hairline` | `#E2DDD5` | 1px precision structural hairline borders |
| `showroom.obsidian` | `#181614` | Deep obsidian monolith chamber & high-drama anchors |
| `showroom.charcoal` | `#221F1B` | Warm smoked charcoal text & elevated dark cards |
| `showroom.basalt` | `#141311` | Closing basalt foundation & footer background |
| `showroom.bronze` (Primary) | `#B89358` | Signature champagne bronze accent & active highlights |
| `showroom.burnished` | `#9F7A40` | Burnished bronze secondary accent & hover states |
| `showroom.umber` | `#706B63` | Muted umber slate for technical helper labels & dimensions |

---

## 3. Typography Architecture & Hierarchy

| Category | Font Family | Weights | Intended Application |
|---|---|---|---|
| **Editorial Display** | `Cormorant Garamond`, serif | 300, 400, 600, 700 (Italics) | Hero display statement, exhibition marquees, modal headers |
| **Architectural Sans** | `Plus Jakarta Sans`, `Outfit`, sans-serif | 500, 600, 700 | Category pills, object titles, navigation, CTAs, button labels |
| **Precision Body** | `Plus Jakarta Sans`, sans-serif | 300, 400, 500 | Narrative descriptions, material stories, specifications |
| **Technical Monospace** | `ui-monospace`, `JetBrains Mono` | 400, 500, 600 | SKUs, coordinates, dimensions, origin tags, spec tables |

### Scale & Hierarchy:
- **Hero Display 1**: `text-4xl sm:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.04]`
- **Section Marquee 2**: `text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-foreground`
- **Exhibition Subhead**: `text-base sm:text-lg lg:text-xl font-sans text-muted-foreground font-light leading-relaxed`
- **Object Title**: `text-xl sm:text-2xl font-serif font-normal text-foreground`
- **Technical Meta**: `text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground`

---

## 4. Hero Staging Standards ("The Monolith & The Word")

1. **Integrated Composition**: The signature piece is not confined to a generic card border; it is presented as a floating sculptural specimen on a subtle warm ambient pedestal (`bg-[#F0ECE4]/60`) with layered coordinates (`[01 / 12]`, `TUSCANY, ITALY`).
2. **Atmospheric Header Bar**: Monospace exhibition provenance (`2026 PERMANENT COLLECTION • ATELIER VOL. IV`) establishing authentic gallery context.
3. **Editorial CTA & Fast Discovery**: Clear primary action (`Explore Permanent Collection`) paired with curated category jump links (`Living Monoliths`, `Architectural Lighting`, `Bespoke Seating`).
4. **5-Stage Weighted Choreography**: Sequence: Atmosphere -> Provenance Metadata -> Editorial Title -> Product Specimen Mask Reveal -> CTA & Jump Pills.

---

## 5. Signature Monolith & Deep Obsidian Chamber Standards

1. **Environmental Contrast**: Rendered in `#181614` (`showroom.obsidian`) with ambient radial bronze lighting (`bg-radial-spotlight`) to create intense focal drama without distracting effects.
2. **Monumental Staging**: Asymmetric 7/5 layout. The physical specimen is presented on a deep stone surface with coordinate badges (`[01]`, `FD-TAB-02`), live quarry swatch toggles, and direct physical blueprint inspection.
3. **Honest Material Metrics**: Displays physical mass, dimensions, and quarry provenance (`Geological Roman Travertine`, `115 kg`).
4. **Weighted Inertia Motion**: Scroll-linked soft entrance (`y: 28px -> 0`, `850ms`, ease `[0.16, 1, 0.3, 1]`) with reduced-motion fallback.

---

## 6. Curated Spotlight & Asymmetric Editorial Dialogue Standards

1. **Linen Chamber Environment**: Transitions out of the dark monolith into `#F4EFEA` (`showroom.travertine`) with hairline architectural grid lines.
2. **Editorial Conversation (7 / 5 Hierarchy)**: Dominant form centerpiece (7 Cols) juxtaposed with complementary luminaire/accent (5 Cols).
3. **Material Storytelling**: Explicit highlighting of living materials (old-growth timber, spun brass discs, lost-wax bronze).
4. **Secondary Angle Crossfade**: Hovering over either spotlight object crossfades to a secondary craftsmanship angle without layout shifts.

---

## 7. Permanent Collection & Catalog Exhibition Standards (Phase 3)

### 7.1 Collection Entry
1. **Exhibition Marquee Entrance**: The Permanent Collection section opens with an architectural provenance badge (`Permanent Collection • Archive Volume IV`), specimen index counter, and editorial headline. The introduction establishes the spatial transition: *"You are now entering the collection."*
2. **Provenance Assurance**: Desktop displays a quiet `ShieldCheck` provenance marker (`Direct Atelier Provenance & Numbered Certificate`) — never aggressive, never promotional.

### 7.2 Product Hierarchy (3-Tier Exhibition System)
The collection communicates visual importance through layout rather than badges:

| Tier | Role | Layout Behavior | Aspect Ratio | Typography Scale |
|---|---|---|---|---|
| **Tier 1** (Signature Specimen) | Commanding standout pieces | `col-span-2` full-width in editorial mode | `aspect-[16/9]` landscape | `text-2xl sm:text-3xl` serif |
| **Tier 2** (Featured Collection) | Balanced editorial framing | Standard grid cell | `aspect-[4/3]` or `aspect-[1:1]` or `aspect-[3:4]` per product | `text-xl sm:text-2xl` serif |
| **Tier 3** (Gallery Standard) | Clean, minimal focus | Standard grid cell | `aspect-[4/3]` default | `text-xl sm:text-2xl line-clamp-1` serif |

Tier assignments are stored in product data (`tier: 'tier-1' | 'tier-2' | 'tier-3'`) alongside `aspectRatio` and `curationNote` fields.

### 7.3 Exhibition Index Navigation
1. **Category Presentation**: Refined text-based horizontal index (`ALL OBJECTS 10`, `LIVING & SEATING 03`) with active champagne bronze underline indicator — not pill buttons.
2. **Counts**: Zero-padded monospace numerals (`03`, `02`) as secondary typographic punctuation, never colorful badges.
3. **Mobile Horizontal Scroll**: Subtle `from-background to-transparent` gradient edge masks indicate scrollable overflow.
4. **ARIA**: `role="tablist"` container with `role="tab"` and `aria-selected` for each category.

### 7.4 Discovery Controls
1. **Integrated Search**: Rounded search field with `Search` icon, clear button, quiet active query banner with `SlidersHorizontal` icon.
2. **Sort**: Minimal rounded dropdown (`Curated Sequence`, `Valuation: High to Low`, etc.) — never oversized.
3. **Layout Switcher**: `Editorial` (curated 2-column rhythm) vs `Index` (efficient 3-column archive grid) with labeled toggle.

### 7.5 Gallery Specimen Card
The product card is a **gallery pedestal**, not an e-commerce container:
1. **Image-First**: Tier-aware aspect ratios with secondary image crossfade on hover (700ms ease-out).
2. **Specimen Coordinates**: Top-left `product.code` monospace tag; top-right tier/provenance tag.
3. **Hover Inspection**: `Inspect Blueprint` pill rises from bottom on hover with `translate-y` transition.
4. **Typography Hierarchy**: Category (mono, 10px) → Serif Title → Curation Note (sans, light) → Interactive Swatches → Valuation.
5. **Interactive Swatches**: On-card `role="radiogroup"` finish selectors with active bronze ring, synchronized with Shopping Box selection state.
6. **Curate Action**: "Curate" / "Curated" toggle with `aria-pressed`, calm charcoal-to-obsidian confirmed state. No confetti, no urgency.

### 7.6 Editorial Composition Rhythm
In full unfiltered editorial mode, the collection follows a deliberate rhythm:
- **Lead Sequence** (first 4 products) → **Material Interlude Break** (travertine panel, craftsmanship narrative) → **Subsequent Sequence** (remaining products)
- The interlude only appears in full collection editorial view — never during filtered/searched/compact states.

### 7.7 Empty Search State
- Serif headline: "Archive Query Unmatched"
- Brief editorial guidance
- Single "Reset Archive Filters" action
- No generic SaaS illustrations

### 7.8 Collection Background
- Warm Alabaster (`#FAF8F5`) base with subtle architectural grid overlay (`opacity-15`)
- Products remain color-accurate — no tinted overlays affecting product perception



## 8. Product Detail & Inspection Experience Standards

1. **Multi-Angle Gallery**:
   - Aspect ratio: `aspect-[4/3]` with smooth image switching.
   - Image counter indicator (`1 / 3`) and keyboard arrow support (`ArrowLeft` / `ArrowRight`).
   - Accessible thumbnail bar (`role="tablist"`) with active bronze ring (`border-primary ring-2 ring-primary/20`).
2. **Focused Zoom / Magnifier**:
   - Clean click-to-zoom (`scale-150 cursor-zoom-out`) with clear exit controls (`Minimize2` and hint label).
   - Touch-safe: never traps page scroll on mobile viewports.
3. **Structured Specifications Matrix**:
   - Generic table rendering only attributes that exist on the product (dimensions, weight, materials, lead time, custom specs).
   - No awkward empty blocks when optional fields are absent.
4. **Interactive Material / Finish Options**:
   - Visual swatches with `role="radiogroup"` and `role="radio"`.
   - Selecting a swatch updates the active preview label and synchronizes with the Selection Box item.
5. **Selection Action & Non-Intrusive Feedback**:
   - "Add to Showroom Selection" button with immediate, calm confirmation state (`"Included in Showroom Selection"`).
   - No confetti or aggressive gamification.
6. **Complementary Objects Discovery**:
   - 2 restrained related product cards at the bottom of the modal, allowing uninterrupted exploration.

---

## 9. Shopping Box & Selection Review Standards

1. **Shopping Box Drawer (`ShoppingBoxDrawer.tsx`)**:
   - Slide-over container (`w-screen max-w-md bg-card border-l border-border shadow-modal`).
   - Persistent item count & estimated selection value indicator.
   - Item row: thumbnail, SKU code, product title, selected finish swatch, quantity stepper (`-` / `+`), and remove button.
   - Screen reader live region (`aria-live="polite"`) announcing quantity and item state updates.
   - Thoughtful showroom empty state with "Explore Catalog" CTA.
2. **Selection Review Modal (`SelectionReviewModal.tsx`)**:
   - Client & Project Information Form (optional client name, design firm, project title, email, phone, notes).
   - Responsive sub-360px grid stacking to eliminate mobile horizontal compression.
   - Document preferences toggles (Include Pricing, Include Specifications).
   - Real-time summary breakdown with instant "Generate Specification PDF" trigger.
3. **Document Success View (`PDFSuccessView`)**:
   - Reference badge (`FD-SPEC-2026-XXXX`).
   - Direct download and print actions.
   - Direct email inquiry link (using contact data from `brand.ts`).

---

## 10. Architectural PDF Specification Document System

1. **Vector Document Grid**: Standard A4 layout (`210mm × 297mm`) with `16mm` margins.
2. **Color Strictness in PDF**:
   - Obsidian Charcoal (`RGB: 33, 30, 26`) for titles and borders.
   - Champagne Bronze (`RGB: 184, 147, 88`) for accents, rules, and totals.
   - Travertine Divider (`RGB: 232, 227, 218`) for hairline separators.
   - Warm Linen (`RGB: 250, 248, 245`) for card containers.
3. **Multi-Page Pagination**:
   - Dynamic page-break calculations using computed card heights.
   - Running header with brand wordmark and document ID.
   - Running footer with contact credentials from `brand.ts` and `PRODUCT SELECTION & SPECIFICATION SHEET • PAGE X OF Y`.
4. **Product Card in PDF**:
   - Base64 embedded high-res photograph (32mm × 32mm) with 2500ms timeout and vector fallback.
   - Multi-line wrapped product title (`splitTextToSize`) preventing collision with price columns.
   - SKU, category, name, selected option, dimensions, materials, lead time, quantity, and estimated price.
5. **Summary & Non-Binding Notice**:
   - Clear statement that the document represents a curated product selection and specification overview.
   - "Estimated Selection Value" label (not "Total", "Invoice", or "Amount Due").
   - No unsupported warranty, authenticity, or delivery claims.
6. **Location & Business Data**:
   - All business-specific text (address, tagline, contact) is sourced from `brand.ts` data, not hardcoded into architectural logic.
   - PDF branding fields (`companyName`, `tagline`, `address`, `contactEmail`, `contactPhone`) are data-driven.

---

## 7. Data Integrity & Resilience Standards

1. **Minimal Selection Persistence**:
   - Local storage stores only `{ productId, optionId, quantity, customNotes, addedAt }` with schema versioning (`v2`).
   - Full product metadata is hydrated from the active product catalog upon initialization.
   - Deleted or invalid products are safely discarded on load without crashing.
2. **Single Source of Selection Truth**:
   - All selection state is managed exclusively by `ShoppingBoxContext`.
   - `ShowroomContext` is strictly dedicated to catalog discovery, filtering, and inspection.
3. **Root Error Boundary**:
   - Application root is wrapped in an accessible `<ErrorBoundary>` with a calm architectural recovery UI.

---

## 8. Anti-Patterns Checklist (Strictly Prohibited)

- ❌ No bright neon gradients or unmotivated saturated glow filters.
- ❌ No dense, cluttered bento grids that crop or compromise product images.
- ❌ No hover-only interactions for essential information or actions on mobile.
- ❌ No low-contrast gray text on tinted backgrounds (below 4.5:1).
- ❌ No generic e-commerce checkout steps (shipping calculator, credit card inputs, coupons).
- ❌ No aggressive e-commerce urgency ("Only 1 left!", fake countdowns, discount badges).
- ❌ No celebration confetti or fireworks.
