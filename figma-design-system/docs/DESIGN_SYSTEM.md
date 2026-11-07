# Northstar Design System — Style Guide (v1.0.0)

> Generated from `src/docs-content.js` and `src/tokens.js` by `build.js`. The same content is rendered on every page of the Figma file.

## Contents

- **Foundations**: [Colour](#colour) · [Typography](#typography) · [Spacing](#spacing) · [Radius & Borders](#radius--borders) · [Elevation](#elevation) · [Grid & Layout](#grid--layout) · [Iconography](#iconography)
- **Atoms**: [Button](#button) · [Icon Button](#icon-button) · [Input](#input) · [Textarea](#textarea) · [Checkbox](#checkbox) · [Radio](#radio) · [Toggle](#toggle) · [Badge](#badge) · [Tag / Chip](#tag--chip) · [Avatar](#avatar) · [Tooltip](#tooltip) · [Link](#link) · [Divider](#divider) · [Spinner](#spinner) · [Progress Bar](#progress-bar)
- **Molecules**: [Menu](#menu) · [Select](#select) · [Form Field](#form-field) · [Search Bar](#search-bar) · [Tabs](#tabs) · [Breadcrumb](#breadcrumb) · [Pagination](#pagination) · [Alert](#alert) · [Toast](#toast) · [Stat Card](#stat-card) · [Nav Item](#nav-item) · [Table Cell & Row](#table-cell--row) · [Card](#card) · [Empty State](#empty-state)
- **Organisms**: [Top Navigation](#top-navigation) · [Sidebar](#sidebar) · [Page Header](#page-header) · [KPI Overview](#kpi-overview) · [Filter Bar](#filter-bar) · [Data Table](#data-table) · [Modal](#modal) · [Settings Form Section](#settings-form-section) · [Organisms from Source File](#organisms-from-source-file)
- **Templates**: [Templates](#templates)

## Token architecture

| Tier | Collection | Modes | Example | Applied by |
|---|---|---|---|---|
| Primitive | `Primitives` | Value | `brand/600` | Semantic tokens only (hidden scopes) |
| Semantic colour | `Color` | Light, Dark | `bg/brand` | Designers & components |
| Dimension | `Dimensions` | Comfortable, Compact | `space/400`, `size/control-md` | Auto-layout padding, gap, radius, size |
| Typography | `Typography` | Value | `font-size/14` | Text styles |

### Semantic colours

| Token | Light | Dark | Usage |
|---|---|---|---|
| `bg/canvas` | `neutral/50` | `neutral/950` | App/page background behind surfaces. |
| `bg/surface` | `neutral/0` | `neutral/900` | Default container surface: cards, tables, inputs. |
| `bg/surface-raised` | `neutral/0` | `neutral/800` | Floating surfaces: menus, popovers, modals, toasts. |
| `bg/surface-sunken` | `neutral/100` | `#07090E` | Recessed areas: table headers, code blocks, wells. |
| `bg/hover` | `neutral/100` | `neutral/800` | Hover state for neutral interactive rows & items. |
| `bg/pressed` | `neutral/200` | `neutral/700` | Pressed state for neutral interactive items; progress tracks. |
| `bg/selected` | `brand/50` | `brand/950` | Selected rows, active navigation items. |
| `bg/disabled` | `neutral/100` | `neutral/800` | Disabled controls. |
| `bg/inverse` | `neutral/900` | `neutral/100` | High-contrast inverse surface: tooltips. |
| `bg/overlay` | `#0C101899` | `#000000B3` | Scrim behind modals & drawers. |
| `bg/brand` | `brand/600` | `brand/500` | Primary actions, checked controls. |
| `bg/brand-hover` | `brand/700` | `brand/400` | Hover for bg/brand. |
| `bg/brand-pressed` | `brand/800` | `brand/300` | Pressed for bg/brand. |
| `bg/brand-subtle` | `brand/50` | `brand/950` | Low-emphasis brand tint: avatars, ghost hover, info chips. |
| `bg/neutral` | `neutral/600` | `neutral/600` | Solid neutral badges. |
| `bg/neutral-subtle` | `neutral/100` | `neutral/800` | Subtle neutral badges and chips. |
| `bg/danger` | `red/600` | `red/600` | Destructive actions, solid danger badges. |
| `bg/danger-hover` | `red/700` | `red/700` | Hover for bg/danger. |
| `bg/danger-subtle` | `red/50` | `red/950` | Danger alerts, error badges. |
| `bg/success` | `green/700` | `green/700` | Solid success badges. |
| `bg/success-subtle` | `green/50` | `green/950` | Success alerts & badges. |
| `bg/warning` | `amber/400` | `amber/400` | Solid warning badges (pair with text/on-warning). |
| `bg/warning-subtle` | `amber/50` | `amber/950` | Warning alerts & badges. |
| `bg/info` | `blue/600` | `blue/700` | Solid info badges. |
| `bg/info-subtle` | `blue/50` | `blue/950` | Info alerts & badges. |
| `bg/toggle-off` | `neutral/300` | `neutral/600` | Track of an unchecked toggle. |
| `bg/toggle-off-hover` | `neutral/400` | `neutral/500` | Hover track of an unchecked toggle. |
| `text/primary` | `neutral/900` | `neutral/50` | Headings, body copy, values. |
| `text/secondary` | `neutral/600` | `neutral/300` | Supporting copy, labels, table body. |
| `text/tertiary` | `neutral/500` | `neutral/400` | Placeholders, captions, metadata. |
| `text/disabled` | `neutral/400` | `neutral/600` | Disabled text. |
| `text/inverse` | `neutral/0` | `neutral/900` | Text on bg/inverse. |
| `text/on-brand` | `neutral/0` | `neutral/0` | Text on bg/brand, bg/danger and other solid fills. |
| `text/on-warning` | `neutral/900` | `neutral/950` | Text on bg/warning. |
| `text/brand` | `brand/600` | `brand/300` | Brand-coloured text, ghost buttons, active nav. |
| `text/link` | `brand/600` | `brand/300` | Inline links. |
| `text/link-hover` | `brand/800` | `brand/200` | Hovered links. |
| `text/danger` | `red/700` | `red/300` | Error messages, destructive menu items. |
| `text/success` | `green/700` | `green/300` | Positive values & messages. |
| `text/warning` | `amber/700` | `amber/300` | Warning messages. |
| `text/info` | `blue/700` | `blue/300` | Informational messages. |
| `border/default` | `neutral/200` | `neutral/700` | Card, table and divider borders. |
| `border/subtle` | `neutral/100` | `neutral/800` | Row separators inside tables & lists. |
| `border/strong` | `neutral/450` | `neutral/500` | Form control borders (≥ 3:1 against bg/surface, WCAG 1.4.11). |
| `border/hover` | `neutral/500` | `neutral/400` | Hovered form control borders. |
| `border/focus` | `brand/500` | `brand/400` | Focused control borders. |
| `border/brand` | `brand/600` | `brand/400` | Selected / checked borders. |
| `border/danger` | `red/500` | `red/400` | Invalid control borders, danger alerts. |
| `border/success` | `green/500` | `green/400` | Success alert borders. |
| `border/warning` | `amber/500` | `amber/400` | Warning alert borders. |
| `border/info` | `blue/500` | `blue/400` | Info alert borders. |
| `border/disabled` | `neutral/200` | `neutral/800` | Disabled control borders. |
| `icon/default` | `neutral/600` | `neutral/300` | Default icons. |
| `icon/secondary` | `neutral/400` | `neutral/500` | De-emphasised icons, placeholders. |
| `icon/brand` | `brand/600` | `brand/300` | Brand icons, active nav icons. |
| `icon/inverse` | `neutral/0` | `neutral/900` | Icons on bg/inverse. |
| `icon/on-brand` | `neutral/0` | `neutral/0` | Icons on solid fills; toggle knobs. |
| `icon/disabled` | `neutral/300` | `neutral/600` | Disabled icons. |
| `icon/danger` | `red/600` | `red/400` | Danger icons. |
| `icon/success` | `green/600` | `green/400` | Success icons, online status. |
| `icon/warning` | `amber/500` | `amber/400` | Warning icons. |
| `icon/info` | `blue/600` | `blue/400` | Info icons. |
| `shadow/strong` | `#1018281A` | `#00000080` | Primary (key) shadow layer. |
| `shadow/soft` | `#1018280F` | `#0000004D` | Secondary (ambient) shadow layer. |
| `focus/ring` | `@brand/500:3D` | `@brand/400:66` | Focus ring (4px spread). |
| `focus/ring-danger` | `@red/500:3D` | `@red/400:66` | Focus ring on invalid controls. |
| `chart/1` | `brand/500` | `brand/400` | Categorical series 1. |
| `chart/2` | `teal/500` | `teal/400` | Categorical series 2. |
| `chart/3` | `amber/500` | `amber/400` | Categorical series 3. |
| `chart/4` | `violet/500` | `violet/400` | Categorical series 4. |
| `chart/5` | `red/400` | `red/300` | Categorical series 5. |
| `chart/6` | `blue/400` | `blue/300` | Categorical series 6. |

### Typography

| Style | Font | Size / Line | Tracking | Usage |
|---|---|---|---|---|
| Display/Large | Inter Bold | 48/56 | -2% | Marketing-style hero numbers, empty dashboards, cover pages. |
| Display/Medium | Inter Bold | 36/44 | -2% | Large KPI figures, onboarding headlines. |
| Heading/H1 | Inter Semi Bold | 30/38 | -1% | Page titles (one per page). |
| Heading/H2 | Inter Semi Bold | 24/32 | -1% | Section titles, KPI values. |
| Heading/H3 | Inter Semi Bold | 20/28 | 0% | Modal titles, large card titles. |
| Heading/H4 | Inter Semi Bold | 18/26 | 0% | Card & table titles. |
| Heading/H5 | Inter Semi Bold | 16/24 | 0% | Sub-section titles, form section headers. |
| Body/Large/Regular | Inter Regular | 16/24 | 0% | Long-form reading, descriptions in docs. |
| Body/Large/Medium | Inter Medium | 16/24 | 0% | Emphasised long-form text. |
| Body/Medium/Regular | Inter Regular | 14/20 | 0% | Default UI text: table cells, form values, paragraphs. |
| Body/Medium/Medium | Inter Medium | 14/20 | 0% | Emphasised UI text: names in tables, numbers. |
| Body/Medium/Semibold | Inter Semi Bold | 14/20 | 0% | Strong emphasis inside UI text. |
| Body/Small/Regular | Inter Regular | 12/18 | 0% | Helper text, metadata, timestamps. |
| Body/Small/Medium | Inter Medium | 12/18 | 0% | Emphasised helper text. |
| Label/Large | Inter Medium | 16/24 | 0% | Large buttons. |
| Label/Medium | Inter Medium | 14/20 | 0% | Buttons, form labels, tabs, nav items. |
| Label/Small | Inter Medium | 12/16 | 0% | Small buttons, badges, chips. |
| Overline | Inter Semi Bold | 11/16 | 6% UPPER | Section eyebrows, sidebar group labels. |
| Caption | Inter Regular | 12/16 | 0% | Chart axes, legal copy, footnotes. |
| Code/Medium | Roboto Mono Regular | 13/20 | 0% | IDs, API keys, code snippets. |
| Code/Small | Roboto Mono Regular | 12/16 | 0% | Keyboard hints, inline IDs in tables. |

### Dimensions

| Token | Comfortable | Compact | Usage |
|---|---|---|---|
| `space/0` | 0 | 0 | No spacing. |
| `space/50` | 2 | 2 | Hairline gaps (badge dot ↔ label). |
| `space/100` | 4 | 4 | Icon ↔ text in tight controls. |
| `space/150` | 6 | 6 | Label ↔ control. |
| `space/200` | 8 | 8 | Default inline gap. |
| `space/300` | 12 | 12 | Control inner padding (SM). |
| `space/400` | 16 | 16 | Control inner padding (MD), card gaps. |
| `space/500` | 20 | 20 | Card padding. |
| `space/600` | 24 | 24 | Section gaps, page gutters. |
| `space/800` | 32 | 32 | Page padding. |
| `space/1000` | 40 | 40 | Large section gaps. |
| `space/1200` | 48 | 48 | Layout gaps. |
| `space/1600` | 64 | 64 | Documentation section gaps. |
| `space/2000` | 80 | 80 | Documentation page padding. |
| `radius/none` | 0 | 0 | Sharp corners: banners, table cells. |
| `radius/xs` | 2 | 2 | Kbd hints, tiny tags. |
| `radius/sm` | 4 | 4 | Checkboxes, menu items. |
| `radius/md` | 6 | 6 | Buttons, inputs, chips. |
| `radius/lg` | 8 | 8 | Cards, menus, tables. |
| `radius/xl` | 12 | 12 | Modals, large cards. |
| `radius/2xl` | 16 | 16 | Documentation panels. |
| `radius/full` | 999 | 999 | Pills, avatars, toggles. |
| `border-width/default` | 1 | 1 | Default stroke. |
| `border-width/thick` | 2 | 2 | Selected/active indicators. |
| `size/control-sm` | 32 | 28 | Small control height. |
| `size/control-md` | 40 | 32 | Medium (default) control height. |
| `size/control-lg` | 48 | 40 | Large control height. |
| `size/table-row` | 56 | 40 | Data table body row height. |
| `size/table-header` | 44 | 36 | Data table header row height. |
| `size/nav-height` | 64 | 56 | Top navigation height. |
| `size/sidebar` | 248 | 248 | Expanded sidebar width. |
| `size/sidebar-collapsed` | 72 | 64 | Collapsed sidebar width. |
| `size/icon-sm` | 16 | 16 | Small icon. |
| `size/icon-md` | 20 | 20 | Medium icon. |
| `size/icon-lg` | 24 | 24 | Large icon. |

### Elevation

| Style | Usage |
|---|---|
| Elevation/0 Flat | No shadow. Cards on canvas with a border. |
| Elevation/1 XS | Buttons, inputs (subtle lift). |
| Elevation/2 SM | Cards, stat tiles. |
| Elevation/3 MD | Hovered cards, sticky headers. |
| Elevation/4 LG | Dropdown menus, popovers, toasts. |
| Elevation/5 XL | Modals, drawers. |
| Focus/Ring | Keyboard focus on any interactive control. |
| Focus/Ring Danger | Keyboard focus on invalid controls. |

---

# Foundations

## Colour

*Foundation* — Colour is delivered through a three-tier token system. Primitives hold raw values and are hidden from pickers. Semantic tokens describe a role (bg/surface, text/secondary, border/focus) and carry a Light and a Dark value. Components only ever reference semantic tokens, so every element in this file supports dark mode automatically.

**When to use**

- Always pick a semantic token by role (bg / text / border / icon) — never a primitive.
- Use status colours (success, warning, danger, info) only to communicate status, not for decoration.
- Use chart/1–6 in order for categorical data series.

**When not to use**

- Do not detach a variable to “tweak” a hex — add or request a new semantic token instead.
- Do not use brand colour for large background areas; reserve it for primary actions and selection.

**Do**

- Pair bg/*-subtle with the matching text/* tone (e.g. bg/success-subtle + text/success).
- Switch frames to Dark via Appearance → Color → Dark to review every screen.

**Don’t**

- Hard-code #FFFFFF or #000000 on a layer.
- Rely on colour alone to convey status — always pair with an icon or label.

**Accessibility**

- All text/* tokens meet WCAG 2.2 AA (4.5:1) on bg/surface and bg/canvas in both modes — see the contrast column.
- Focus rings use a 4px focus/ring halo plus border/focus so focus is visible in both themes.

## Typography

*Foundation* — Inter is the UI typeface: neutral, highly legible at small sizes and offers tabular numerals for dense B2B data. Roboto Mono is used for IDs, code and keyboard hints. Every text style binds font size, line height and family to variables in the Typography collection.

**When to use**

- Use Heading/H1 once per page for the page title.
- Body/Medium/Regular (14/20) is the default UI size for tables, forms and paragraphs.
- Use Label/* styles inside interactive controls only.

**When not to use**

- Do not set font sizes manually — always apply a text style.
- Do not use Display styles inside dense data views.

**Do**

- Keep line length between 60–80 characters for descriptions.
- Use Overline for sidebar group labels and section eyebrows.

**Don’t**

- Mix more than three type sizes in one card.
- Use all-caps for anything longer than a short label.

**Accessibility**

- Minimum text size in product UI is 12px (Body/Small, Caption).
- Line heights are ≥ 1.33× to support WCAG 1.4.12 text spacing.

## Spacing

*Foundation* — A 4px base grid with Atlassian-style numeric names (space/100 = 4px, space/400 = 16px). Spacing variables are bound to every padding and gap in the components, and the Dimensions collection offers Comfortable and Compact density modes for control sizes.

**When to use**

- space/100–200 inside controls; space/300–500 inside cards; space/600–1200 between page sections.
- Switch a frame to the Compact mode for data-dense admin screens.

**When not to use**

- Do not use odd values like 5, 7 or 15px.

**Do**

- Bind padding & gap to a space variable (right-click the field → Apply variable).

**Don’t**

- Nudge layers manually — use auto layout with tokens.

**Accessibility**

- Interactive targets are at least 24×24 (WCAG 2.5.8); default controls are 40px tall.

## Radius & Borders

*Foundation* — Corner radius communicates the size and layer of an element: small controls use radius/md (6), containers use radius/lg (8), overlays use radius/xl (12). Borders are 1px (border-width/default) with 2px reserved for active indicators.

**When to use**

- radius/full for pills, avatars and toggles.
- radius/none for full-width banners and table cells.

**When not to use**

- Do not nest a larger radius inside a smaller one.

**Do**

- Inner radius = outer radius − padding when nesting.

**Don’t**

- Mix radius scales within one component.

**Accessibility**

- Borders on form controls use border/strong (≥ 3:1 against the surface) to meet WCAG 1.4.11.

## Elevation

*Foundation* — Five elevation levels plus focus rings, published as effect styles. Shadow colours bind to the shadow/strong and shadow/soft variables, so shadows automatically deepen in dark mode, where surfaces also step lighter (surface → surface-raised).

**When to use**

- Elevation/2 for cards on canvas, Elevation/4 for menus & toasts, Elevation/5 for modals.
- Focus/Ring on any focused interactive element.

**When not to use**

- Do not stack shadows with heavy borders — choose one separation method.

**Do**

- Pair raised surfaces with bg/surface-raised so dark mode stays legible.

**Don’t**

- Invent custom shadows on layers.

**Accessibility**

- Never rely on shadow alone to indicate focus or selection.

## Grid & Layout

*Foundation* — Responsive column grids published as grid styles. Desktop app shells use a 248px sidebar + fluid content area on a 12-column grid with 24px gutters.

**When to use**

- Apply Grid/Desktop 1440 to page templates.
- Align cards and KPI tiles to columns (3 or 4 per row on desktop).

**When not to use**

- Do not apply column grids inside small components.

**Do**

- Keep the page header, filters and table on the same left edge.

**Don’t**

- Centre-align dense data layouts.

**Accessibility**

- Layouts must reflow at 320 CSS px (WCAG 1.4.10) — use the Mobile grid to check.

## Iconography

*Foundation* — A 24px line icon set (2px stroke, round caps & joins). Icons are individual components so they can be swapped through the instance-swap “Icon” property on buttons, inputs, nav items and menus. Strokes bind to icon/* variables.

**When to use**

- 16px inside small controls, 20px inside medium controls & nav, 24px standalone.
- Recolour with icon/* tokens only.

**When not to use**

- Do not use icons without a label for non-universal actions (provide a tooltip at minimum).

**Do**

- Use the Icon property on components instead of detaching.

**Don’t**

- Scale icons to odd sizes like 18px or 22px.

**Accessibility**

- Icon-only buttons need an accessible name (aria-label) in code — note it in the handoff.


---

# Atoms

## Button

*Atom* — Buttons trigger actions. Four hierarchies × three sizes × four states, with optional leading/trailing icons swappable via instance-swap properties.

**When to use**

- Primary: the single most important action in a view (Save, Create invoice).
- Secondary: alternative actions (Cancel, Export).
- Tertiary: low-emphasis actions in toolbars and cards.
- Destructive: irreversible actions (Delete) — usually inside a confirm modal.

**When not to use**

- Do not use buttons for navigation between pages — use Link or Nav Item.
- Do not place more than one Primary button in a view.

**Anatomy**

- Container (radius/md, height size/control-*)
- Leading icon (optional, Icon swap)
- Label (Label/* text style)
- Trailing icon (optional)

**Do**

- Use verb-first labels: “Create invoice”, “Export CSV”.
- Right-align action groups in modals and forms, Primary on the far right.

**Don’t**

- Wrap button labels onto two lines.
- Disable a button without explaining why nearby.

**Accessibility**

- Minimum target height 32px (Small).
- Focus state shows Focus/Ring — never remove it.
- Contrast of label on fill ≥ 4.5:1 in both themes.

## Icon Button

*Atom* — Square, icon-only buttons for compact toolbars, table row actions and dismiss controls. Shares hierarchies, sizes and states with Button.

**When to use**

- Universally understood actions: close, more, filter, settings.
- Row-level actions in data tables.

**When not to use**

- Ambiguous actions — use a Button with a label instead.

**Anatomy**

- Square container
- Icon (Icon swap)

**Do**

- Pair with a Tooltip describing the action.

**Don’t**

- Use Primary icon buttons in dense toolbars.

**Accessibility**

- Requires aria-label in code.
- Target size equals control height (≥ 32px).

## Input

*Atom* — Single-line text entry. Five states (Default, Hover, Focus, Error, Disabled), placeholder or filled content and two sizes. Leading and trailing icon slots are swappable.

**When to use**

- Short free-text values: names, amounts, emails, search.

**When not to use**

- Long text — use Textarea.
- Choosing from a known list — use Select.

**Anatomy**

- Container (border/strong, radius/md)
- Leading icon (optional)
- Value / placeholder
- Trailing icon (optional)

**Do**

- Always wrap in a Form Field to provide a visible label.
- Size the width to the expected content length.

**Don’t**

- Use placeholder text as a label.

**Accessibility**

- Error state must be accompanied by error text (see Form Field).
- Border contrast ≥ 3:1.

## Textarea

*Atom* — Multi-line text entry with character counter.

**When to use**

- Notes, descriptions, comments.

**When not to use**

- Single values — use Input.

**Anatomy**

- Container
- Value / placeholder
- Character counter

**Do**

- Show remaining characters when a limit exists.

**Don’t**

- Make it shorter than 3 lines.

**Accessibility**

- Counter should be announced via aria-describedby.

## Checkbox

*Atom* — Select zero or more options, or toggle a single setting that applies on submit. Supports indeterminate for “select all” in tables.

**When to use**

- Multi-select lists, table row selection, terms acceptance.

**When not to use**

- Settings that apply instantly — use Toggle.
- Mutually exclusive choices — use Radio.

**Anatomy**

- Box (16px, radius/sm)
- Check / minus glyph
- Label (optional)

**Do**

- Use indeterminate in a table header when some rows are selected.

**Don’t**

- Use a checkbox to trigger an immediate action.

**Accessibility**

- Whole row (box + label) is clickable.
- Use aria-checked="mixed" for indeterminate.

## Radio

*Atom* — Select exactly one option from a small set (2–5).

**When to use**

- Billing cycle, export format, plan selection.

**When not to use**

- More than ~6 options — use Select.

**Anatomy**

- Circle (16px)
- Dot
- Label

**Do**

- Pre-select the most common option.

**Don’t**

- Allow a group with nothing selected unless “none” is valid.

**Accessibility**

- Group radios in a fieldset with a legend; arrow keys move selection.

## Toggle

*Atom* — Switch a setting on or off with immediate effect.

**When to use**

- Notification preferences, feature flags, auto-renew.

**When not to use**

- Choices that require Save — use Checkbox.

**Anatomy**

- Track
- Knob
- Label (optional)

**Do**

- Label states clearly: “Email notifications”.

**Don’t**

- Use On/Off text inside the track.

**Accessibility**

- role="switch" with aria-checked.

## Badge

*Atom* — Compact, non-interactive status indicator for tables, cards and navigation counts. Six tones × subtle/solid × two sizes, with optional dot.

**When to use**

- Invoice / order status (Paid, Overdue, Draft).
- Counts on tabs and nav items.

**When not to use**

- Interactive filters — use Tag/Chip.

**Anatomy**

- Container (radius/full)
- Dot (optional)
- Label

**Do**

- Map status consistently: Paid=Success, Pending=Warning, Overdue=Danger, Draft=Neutral.

**Don’t**

- Use more than one solid badge per row.

**Accessibility**

- Never rely on tone alone; the label must state the status.

## Tag / Chip

*Atom* — Interactive chips for filters, multi-select values and applied tags.

**When to use**

- Active filters in a Filter Bar.
- Selected values in a multi-select.

**When not to use**

- Read-only status — use Badge.

**Anatomy**

- Container
- Leading icon (optional)
- Label
- Remove icon (optional)

**Do**

- Make removable chips dismissible via keyboard (Backspace/Delete).

**Don’t**

- Truncate labels without a tooltip.

**Accessibility**

- Remove button needs aria-label “Remove <label>”.

## Avatar

*Atom* — Represents a user or company with initials or an icon. Five sizes with optional online status.

**When to use**

- Owner columns in tables, user menu, comments.

**When not to use**

- Decorative imagery.

**Anatomy**

- Circle (bg/brand-subtle)
- Initials / icon
- Status dot (optional)

**Do**

- Use two initials max.

**Don’t**

- Show status dots in dense tables.

**Accessibility**

- Provide alt text with the person’s full name.

## Tooltip

*Atom* — Short, non-interactive hint shown on hover/focus. Uses the inverse surface for maximum contrast in both themes.

**When to use**

- Label icon-only buttons.
- Explain truncated text or metric definitions.

**When not to use**

- Critical information or interactive content — use a Popover or inline text.

**Anatomy**

- Bubble (bg/inverse)
- Arrow
- Text (Body/Small)

**Do**

- Keep to one short sentence.

**Don’t**

- Put links or buttons inside tooltips.

**Accessibility**

- Show on focus as well as hover; dismiss with Esc (WCAG 1.4.13).

## Link

*Atom* — Inline or standalone navigation to another page or resource.

**When to use**

- Navigating to detail pages, docs, external resources.

**When not to use**

- Triggering actions — use Button (Tertiary).

**Anatomy**

- Label
- External icon (optional)

**Do**

- Use descriptive text (“View invoice INV-0042”).

**Don’t**

- Use “click here”.

**Accessibility**

- Underline on hover/focus; external links announce “opens in new tab”.

## Divider

*Atom* — Separates content groups horizontally, vertically or with a label.

**When to use**

- Between menu groups, toolbar groups, form sections.

**When not to use**

- Between every list item — use spacing first.

**Anatomy**

- Line (border/default, 1px)
- Label (optional)

**Do**

- Prefer whitespace; add a divider only when grouping is unclear.

**Don’t**

- Use thick or coloured dividers.

**Accessibility**

- Decorative dividers should be aria-hidden; semantic ones use role="separator".

## Spinner

*Atom* — Indeterminate loading indicator for short waits.

**When to use**

- Button loading states, refreshing a widget.

**When not to use**

- Page-level loads > 1s — use skeletons; known progress — use Progress Bar.

**Anatomy**

- Track ring
- Indicator arc

**Do**

- Match spinner size to the surrounding control.

**Don’t**

- Show multiple spinners on one screen.

**Accessibility**

- role="status" with an aria-label such as “Loading invoices”.

## Progress Bar

*Atom* — Shows determinate progress of an upload, import or onboarding checklist.

**When to use**

- File imports, usage vs plan limits.

**When not to use**

- Unknown duration — use Spinner.

**Anatomy**

- Label row (optional)
- Track
- Indicator

**Do**

- Show the percentage or count alongside.

**Don’t**

- Animate backwards.

**Accessibility**

- role="progressbar" with aria-valuenow / min / max.


---

# Molecules

## Menu

*Molecule* — Menu Item and Dropdown Menu. Used by Select, overflow (⋯) buttons and the user menu.

**When to use**

- Overflow actions on rows and cards.
- Select option lists.

**When not to use**

- Primary navigation — use Sidebar.

**Anatomy**

- Surface (bg/surface-raised, Elevation/4)
- Group label (Overline)
- Menu Items
- Divider

**Do**

- Group destructive items at the bottom, separated by a Divider.

**Don’t**

- Exceed ~8 items without search.

**Accessibility**

- role="menu"; arrow keys move focus; Esc closes and returns focus to the trigger.

## Select

*Molecule* — Choose one option from a list. Composed of the Input atom (with chevron trailing icon) and the Dropdown Menu molecule.

**When to use**

- 6+ options, or where space is limited.

**When not to use**

- 2–5 options that benefit from being visible — use Radio.

**Anatomy**

- Trigger (Input instance)
- Chevron
- Dropdown Menu (Open state)

**Do**

- Default to the most common value or a clear placeholder (“Select status”).

**Don’t**

- Use for navigation.

**Accessibility**

- Native <select> or a combobox pattern with aria-expanded.

## Form Field

*Molecule* — Wraps an Input or Textarea atom with a label, required marker and helper / error text. Built from the Input and Textarea atoms.

**When to use**

- Every form input in the product.

**When not to use**

- Inline table editing — use the bare Input.

**Anatomy**

- Label (Label/Medium)
- Required marker
- Control (Input / Textarea instance)
- Helper or error text

**Do**

- Write helper text that prevents errors (“Shown on the invoice PDF”).
- Make error text actionable (“Enter an amount greater than 0”).

**Don’t**

- Show errors before the user has interacted.

**Accessibility**

- Label is programmatically linked (for/id); error uses aria-invalid + aria-describedby.

## Search Bar

*Molecule* — Global or in-page search field with a keyboard shortcut hint.

**When to use**

- Top navigation (global, ⌘K).
- Table toolbars (scoped).

**When not to use**

- Filtering by known attributes — use Select in a Filter Bar.

**Anatomy**

- Search icon
- Query / placeholder
- Shortcut hint (kbd)

**Do**

- Indicate the scope in the placeholder (“Search invoices…”).

**Don’t**

- Hide search behind an icon on desktop.

**Accessibility**

- role="search" landmark; shortcut announced via aria-keyshortcuts.

## Tabs

*Molecule* — Tab (atom-level item) and Tab Group. Switch between views of the same object. Count badges reuse the Badge atom.

**When to use**

- Sub-views of a page: Overview / Invoices / Activity.

**When not to use**

- Sequential steps — use a stepper.
- Primary navigation — use Sidebar.

**Anatomy**

- Tab label
- Optional icon
- Optional count (Badge)
- Active indicator (2px bg/brand)

**Do**

- Keep labels to 1–2 words.

**Don’t**

- Nest tabs within tabs.

**Accessibility**

- role="tablist"; arrow keys move between tabs.

## Breadcrumb

*Molecule* — Shows the user’s location within the hierarchy and provides a path back.

**When to use**

- Detail pages 2+ levels deep.

**When not to use**

- Top-level pages.

**Anatomy**

- Items (Link style)
- Separators (chevron-right)
- Current page (not a link)

**Do**

- Truncate middle items with “…” beyond 4 levels.

**Don’t**

- Repeat the page title as a link.

**Accessibility**

- nav aria-label="Breadcrumb"; current item has aria-current="page".

## Pagination

*Molecule* — Navigate large data sets page by page. Composed of Icon Buttons and Page Buttons.

**When to use**

- Data tables with more than one page of results.

**When not to use**

- Feeds — use infinite scroll / “Load more”.

**Anatomy**

- Results summary
- Previous (Icon Button)
- Page buttons
- Next (Icon Button)

**Do**

- Always show total results.

**Don’t**

- Show more than 7 page buttons — collapse with ellipsis.

**Accessibility**

- Current page uses aria-current="page".

## Alert

*Molecule* — Inline or page-level banner messages. Composed of icons, Buttons and an Icon Button for dismissal.

**When to use**

- Inline: contextual messages within a form or card.
- Banner: system-wide messages (billing, maintenance).

**When not to use**

- Transient confirmations — use Toast.

**Anatomy**

- Status icon
- Title
- Description
- Actions (Buttons)
- Dismiss (Icon Button)

**Do**

- Lead with the outcome, then the action.

**Don’t**

- Stack more than two alerts.

**Accessibility**

- role="alert" for errors, role="status" for info.

## Toast

*Molecule* — Brief, auto-dismissing confirmation of a completed action, shown bottom-right.

**When to use**

- “Invoice sent”, “Changes saved”.

**When not to use**

- Errors requiring action — use Alert.

**Anatomy**

- Status icon
- Title + description
- Action (Link)
- Dismiss (Icon Button)

**Do**

- Offer Undo for reversible actions.

**Don’t**

- Auto-dismiss in under 5 seconds.

**Accessibility**

- aria-live="polite"; pause dismissal on hover/focus.

## Stat Card

*Molecule* — KPI tile showing a metric, its trend (Badge atom) and a mini chart.

**When to use**

- Dashboard summaries: revenue, outstanding, active customers.

**When not to use**

- Detailed trends — use a full chart card.

**Anatomy**

- Label + info icon
- Value (Heading/H2)
- Trend badge + comparison text
- Sparkline (chart/1)

**Do**

- Always state the comparison period.

**Don’t**

- Show more than 4 stat cards in one row.

**Accessibility**

- Trend must be readable as text (“up 12.4%”), not just colour.

## Nav Item

*Molecule* — Sidebar navigation item with icon, label and optional count badge. Supports collapsed (icon-only) layout.

**When to use**

- Inside the Sidebar organism.

**When not to use**

- In-page view switching — use Tabs.

**Anatomy**

- Icon (swap)
- Label
- Count (Badge)
- Active background (bg/selected)

**Do**

- Keep labels to one word where possible.

**Don’t**

- Use more than 8 top-level items.

**Accessibility**

- aria-current="page" on the active item; collapsed items show a tooltip.

## Table Cell & Row

*Molecule* — Table Cell types (header, text, two-line, avatar, badge, checkbox, number, actions) composed from atoms, and a Table Row with hover/selected states.

**When to use**

- Building any Data Table.

**When not to use**

- Layout grids of cards.

**Anatomy**

- Cell (size/table-row height, border/subtle bottom)
- Content atom (Avatar, Badge, Checkbox, Icon Button)

**Do**

- Right-align numeric columns and use tabular figures.

**Don’t**

- Centre-align text columns.

**Accessibility**

- Header cells use <th scope="col">; sortable headers expose aria-sort.

## Card

*Molecule* — Generic container with header, content slot and optional footer actions.

**When to use**

- Grouping related content on dashboards and settings pages.

**When not to use**

- Wrapping a single line of text.

**Anatomy**

- Header (title, subtitle, overflow Icon Button)
- Content slot
- Footer (Buttons)

**Do**

- Swap the content slot with an instance or frame.

**Don’t**

- Nest cards inside cards.

**Accessibility**

- Use a heading element for the card title.

## Empty State

*Molecule* — Explains why a view is empty and how to fill it.

**When to use**

- First-use tables, no search results, cleared filters.

**When not to use**

- Errors — use Alert.

**Anatomy**

- Icon in tinted circle
- Title
- Description
- Actions (Buttons)

**Do**

- Offer the primary next step.

**Don’t**

- Blame the user (“You have no…”).

**Accessibility**

- Title is a heading; actions are real buttons.


---

# Organisms

## Top Navigation

*Organism* — Global header containing search, help, notifications and the user menu. Built from Search Bar, Icon Button, Divider and Avatar.

**When to use**

- Every authenticated page, to the right of the Sidebar.

**When not to use**

- Modal / focused flows (checkout, onboarding).

**Anatomy**

- Search Bar
- Help (Icon Button)
- Notifications (Icon Button + dot)
- Divider
- User menu (Avatar + name + chevron)

**Do**

- Keep it sticky at the top of the scroll area.

**Don’t**

- Add page-specific actions here — use Page Header.

**Accessibility**

- <header role="banner">; notifications button announces unread count.

## Sidebar

*Organism* — Primary app navigation with logo, grouped Nav Items and the user account footer. Expanded (248px) and Collapsed (72px) variants.

**When to use**

- All desktop app layouts.

**When not to use**

- Mobile (<768px) — move to a drawer.

**Anatomy**

- Logo
- Group labels (Overline)
- Nav Items
- Account footer (Avatar, Icon Button)

**Do**

- Persist the collapsed preference per user.

**Don’t**

- Mix icons with and without labels in the expanded state.

**Accessibility**

- <nav aria-label="Main">; collapsed items expose labels via tooltip & aria-label.

## Page Header

*Organism* — Top of every page: Breadcrumb, title, description, page actions (Buttons) and optional Tab Group.

**When to use**

- Every page directly under the Top Navigation.

**When not to use**

- Inside modals.

**Anatomy**

- Breadcrumb
- Title (H1) + description
- Actions (Secondary + Primary Button)
- Tab Group (optional)

**Do**

- Limit to one Primary and two Secondary actions; overflow the rest into ⋯.

**Don’t**

- Repeat the title in the breadcrumb as a link.

**Accessibility**

- The title is the page’s only <h1>.

## KPI Overview

*Organism* — Row of four Stat Cards summarising the most important metrics.

**When to use**

- Top of dashboards and report pages.

**When not to use**

- Pages without a clear metric focus.

**Anatomy**

- 4 × Stat Card (fill width)

**Do**

- Order metrics by business importance.

**Don’t**

- Mix time ranges between cards.

**Accessibility**

- Each card is a list item in a <ul> with an accessible heading.

## Filter Bar

*Organism* — Search, attribute filters (Select), more filters and applied filter chips for data tables.

**When to use**

- Above any Data Table with more than ~20 rows.

**When not to use**

- Small static lists.

**Anatomy**

- Search Bar
- Selects
- More filters (Button)
- Clear all (Button)
- Applied filter Tags

**Do**

- Reflect filters in the URL so views can be shared.

**Don’t**

- Apply filters on every keystroke without debounce.

**Accessibility**

- Announce result counts after filtering (aria-live).

## Data Table

*Organism* — Sortable, selectable table for business records, inspired by Carbon & Polaris data tables. Composed of a toolbar, Table Rows (Table Cells → Avatar, Badge, Checkbox, Icon Button) and Pagination.

**When to use**

- Lists of invoices, customers, orders, users.

**When not to use**

- Fewer than 3 attributes per record — use a list.

**Anatomy**

- Toolbar (title, count Badge, Search, Buttons)
- Header row
- Body rows
- Pagination footer

**Do**

- Switch to Compact density for >50 rows.
- Keep the first column the record identifier.

**Don’t**

- Put more than one action button per row — use the ⋯ menu.

**Accessibility**

- Selection checkboxes have row-specific labels; sort state via aria-sort.

## Modal

*Organism* — Focused dialog for short forms (Form) or confirmations (Confirm). Built from Form Fields, Select, Buttons and Icon Button.

**When to use**

- Create/edit flows with ≤ 6 fields.
- Confirming destructive actions.

**When not to use**

- Long or multi-step forms — use a full page or drawer.

**Anatomy**

- Overlay (bg/overlay)
- Header (title, description, close)
- Body
- Footer (Secondary + Primary/Destructive)

**Do**

- Name the primary button after the action (“Delete invoice”).

**Don’t**

- Open a modal from a modal.

**Accessibility**

- Trap focus; Esc closes; return focus to the trigger; role="dialog" aria-modal="true".

## Settings Form Section

*Organism* — Two-column settings section: description on the left, Form Fields, Select and Toggle rows on the right, actions in the footer.

**When to use**

- Settings, profile and configuration pages.

**When not to use**

- Quick edits — use a Modal.

**Anatomy**

- Section title + description
- Form Fields grid
- Toggle rows
- Footer actions

**Do**

- Save per section, not per page.

**Don’t**

- Mix instant-apply toggles and Save-required fields without explanation.

**Accessibility**

- Each section is a <form> with its own heading.

## Organisms from Source File

*Organism* — Organisms imported from the linked product file (node 6349:84202). Each top-level frame was converted into a component, and every fill, stroke and text layer was re-bound to the nearest semantic colour variable and text style — so they inherit the token system and support dark mode.

**When to use**

- Reference for the product’s existing screens while migrating them to atoms & molecules.

**When not to use**

- New work — compose from the Atoms & Molecules pages instead.

**Do**

- Review each imported organism, replace raw layers with library instances, then move it to its own organism page.

**Don’t**

- Detach the token bindings applied by the importer.

**Accessibility**

- Re-check contrast after re-binding; the nearest-token match is automatic.


---

# Templates

## Templates

*Template* — Full page layouts assembled exclusively from organisms, shown side by side in Light and Dark modes.

**When to use**

- Starting point for new screens and stakeholder reviews.

**When not to use**

- As a component — templates are frames, duplicate them.

**Do**

- Switch density to Compact (Appearance → Dimensions) for data-heavy screens.

**Don’t**

- Detach organisms to make one-off changes.

**Accessibility**

- Landmarks: banner (Top Nav), navigation (Sidebar), main (content).

