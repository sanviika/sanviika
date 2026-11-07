// ============================================================================
//  NORTHSTAR B2B DESIGN SYSTEM — TOKEN SOURCE OF TRUTH
//  Three-tier token architecture (primitive → semantic → component usage),
//  modelled on Atlassian / Carbon / Polaris token naming.
//  This file is concatenated into code.js by build.js and also exported to
//  tokens/design-tokens.json + tokens/variables.css for developers.
// ============================================================================

const DS_NAME = 'Northstar';
const DS_VERSION = '1.0.0';

// ---------------------------------------------------------------------------
// 1. PRIMITIVE COLOURS (collection "Primitives", single mode, hidden scopes)
// ---------------------------------------------------------------------------
const PRIMITIVES = {
  neutral: {
    0: '#FFFFFF', 25: '#FCFCFD', 50: '#F8F9FB', 100: '#F1F3F7', 200: '#E4E7EE',
    300: '#D0D5DF', 400: '#9AA3B5', 450: '#858EA1', 500: '#6B7489', 600: '#4D5668', 700: '#384052',
    800: '#232A39', 900: '#161B26', 950: '#0C1018', 1000: '#000000',
  },
  // Default brand ramp. Replaced at runtime by a ramp generated from the
  // dominant brand colour found in the linked Figma file (or the UI input).
  brand: {
    50: '#EEF2FF', 100: '#E0E7FF', 200: '#C3CFFE', 300: '#9DB0FC', 400: '#7187F8',
    500: '#4F63F0', 600: '#3A47E0', 700: '#2F38C4', 800: '#29309E', 900: '#262E7D', 950: '#171B49',
  },
  green: {
    50: '#ECFDF3', 100: '#D1FADF', 200: '#A6F4C5', 300: '#6CE9A6', 400: '#32D583',
    500: '#12B76A', 600: '#039855', 700: '#027A48', 800: '#05603A', 900: '#054F31', 950: '#032B1A',
  },
  amber: {
    50: '#FFFAEB', 100: '#FEF0C7', 200: '#FEDF89', 300: '#FEC84B', 400: '#FDB022',
    500: '#F79009', 600: '#DC6803', 700: '#B54708', 800: '#93370D', 900: '#7A2E0E', 950: '#4E1D09',
  },
  red: {
    50: '#FEF3F2', 100: '#FEE4E2', 200: '#FECDCA', 300: '#FDA29B', 400: '#F97066',
    500: '#F04438', 600: '#D92D20', 700: '#B42318', 800: '#912018', 900: '#7A271A', 950: '#55160C',
  },
  blue: {
    50: '#EFF8FF', 100: '#D1E9FF', 200: '#B2DDFF', 300: '#84CAFF', 400: '#53B1FD',
    500: '#2E90FA', 600: '#1570EF', 700: '#175CD3', 800: '#1849A9', 900: '#194185', 950: '#102A56',
  },
  teal: { 300: '#5EEAD4', 400: '#2DD4BF', 500: '#14B8A6', 600: '#0D9488' },
  violet: { 300: '#D8B4FE', 400: '#C084FC', 500: '#A855F7', 600: '#9333EA' },
};

// ---------------------------------------------------------------------------
// 2. SEMANTIC COLOURS (collection "Color", modes Light + Dark)
//    [token, light, dark, description]
//    Values are primitive refs ("neutral/900") or literal hex (#RRGGBB[AA]).
// ---------------------------------------------------------------------------
const SEMANTIC = [
  // Backgrounds -------------------------------------------------------------
  ['bg/canvas', 'neutral/50', 'neutral/950', 'App/page background behind surfaces.'],
  ['bg/surface', 'neutral/0', 'neutral/900', 'Default container surface: cards, tables, inputs.'],
  ['bg/surface-raised', 'neutral/0', 'neutral/800', 'Floating surfaces: menus, popovers, modals, toasts.'],
  ['bg/surface-sunken', 'neutral/100', '#07090E', 'Recessed areas: table headers, code blocks, wells.'],
  ['bg/hover', 'neutral/100', 'neutral/800', 'Hover state for neutral interactive rows & items.'],
  ['bg/pressed', 'neutral/200', 'neutral/700', 'Pressed state for neutral interactive items; progress tracks.'],
  ['bg/selected', 'brand/50', 'brand/950', 'Selected rows, active navigation items.'],
  ['bg/disabled', 'neutral/100', 'neutral/800', 'Disabled controls.'],
  ['bg/inverse', 'neutral/900', 'neutral/100', 'High-contrast inverse surface: tooltips.'],
  ['bg/overlay', '#0C101899', '#000000B3', 'Scrim behind modals & drawers.'],
  ['bg/brand', 'brand/600', 'brand/500', 'Primary actions, checked controls.'],
  ['bg/brand-hover', 'brand/700', 'brand/400', 'Hover for bg/brand.'],
  ['bg/brand-pressed', 'brand/800', 'brand/300', 'Pressed for bg/brand.'],
  ['bg/brand-subtle', 'brand/50', 'brand/950', 'Low-emphasis brand tint: avatars, ghost hover, info chips.'],
  ['bg/neutral', 'neutral/600', 'neutral/600', 'Solid neutral badges.'],
  ['bg/neutral-subtle', 'neutral/100', 'neutral/800', 'Subtle neutral badges and chips.'],
  ['bg/danger', 'red/600', 'red/600', 'Destructive actions, solid danger badges.'],
  ['bg/danger-hover', 'red/700', 'red/700', 'Hover for bg/danger.'],
  ['bg/danger-subtle', 'red/50', 'red/950', 'Danger alerts, error badges.'],
  ['bg/success', 'green/700', 'green/700', 'Solid success badges.'],
  ['bg/success-subtle', 'green/50', 'green/950', 'Success alerts & badges.'],
  ['bg/warning', 'amber/400', 'amber/400', 'Solid warning badges (pair with text/on-warning).'],
  ['bg/warning-subtle', 'amber/50', 'amber/950', 'Warning alerts & badges.'],
  ['bg/info', 'blue/600', 'blue/700', 'Solid info badges.'],
  ['bg/info-subtle', 'blue/50', 'blue/950', 'Info alerts & badges.'],
  ['bg/toggle-off', 'neutral/300', 'neutral/600', 'Track of an unchecked toggle.'],
  ['bg/toggle-off-hover', 'neutral/400', 'neutral/500', 'Hover track of an unchecked toggle.'],
  // Text --------------------------------------------------------------------
  ['text/primary', 'neutral/900', 'neutral/50', 'Headings, body copy, values.'],
  ['text/secondary', 'neutral/600', 'neutral/300', 'Supporting copy, labels, table body.'],
  ['text/tertiary', 'neutral/500', 'neutral/400', 'Placeholders, captions, metadata.'],
  ['text/disabled', 'neutral/400', 'neutral/600', 'Disabled text.'],
  ['text/inverse', 'neutral/0', 'neutral/900', 'Text on bg/inverse.'],
  ['text/on-brand', 'neutral/0', 'neutral/0', 'Text on bg/brand, bg/danger and other solid fills.'],
  ['text/on-warning', 'neutral/900', 'neutral/950', 'Text on bg/warning.'],
  ['text/brand', 'brand/600', 'brand/300', 'Brand-coloured text, ghost buttons, active nav.'],
  ['text/link', 'brand/600', 'brand/300', 'Inline links.'],
  ['text/link-hover', 'brand/800', 'brand/200', 'Hovered links.'],
  ['text/danger', 'red/700', 'red/300', 'Error messages, destructive menu items.'],
  ['text/success', 'green/700', 'green/300', 'Positive values & messages.'],
  ['text/warning', 'amber/700', 'amber/300', 'Warning messages.'],
  ['text/info', 'blue/700', 'blue/300', 'Informational messages.'],
  // Borders -----------------------------------------------------------------
  ['border/default', 'neutral/200', 'neutral/700', 'Card, table and divider borders.'],
  ['border/subtle', 'neutral/100', 'neutral/800', 'Row separators inside tables & lists.'],
  ['border/strong', 'neutral/450', 'neutral/500', 'Form control borders (≥ 3:1 against bg/surface, WCAG 1.4.11).'],
  ['border/hover', 'neutral/500', 'neutral/400', 'Hovered form control borders.'],
  ['border/focus', 'brand/500', 'brand/400', 'Focused control borders.'],
  ['border/brand', 'brand/600', 'brand/400', 'Selected / checked borders.'],
  ['border/danger', 'red/500', 'red/400', 'Invalid control borders, danger alerts.'],
  ['border/success', 'green/500', 'green/400', 'Success alert borders.'],
  ['border/warning', 'amber/500', 'amber/400', 'Warning alert borders.'],
  ['border/info', 'blue/500', 'blue/400', 'Info alert borders.'],
  ['border/disabled', 'neutral/200', 'neutral/800', 'Disabled control borders.'],
  // Icons -------------------------------------------------------------------
  ['icon/default', 'neutral/600', 'neutral/300', 'Default icons.'],
  ['icon/secondary', 'neutral/400', 'neutral/500', 'De-emphasised icons, placeholders.'],
  ['icon/brand', 'brand/600', 'brand/300', 'Brand icons, active nav icons.'],
  ['icon/inverse', 'neutral/0', 'neutral/900', 'Icons on bg/inverse.'],
  ['icon/on-brand', 'neutral/0', 'neutral/0', 'Icons on solid fills; toggle knobs.'],
  ['icon/disabled', 'neutral/300', 'neutral/600', 'Disabled icons.'],
  ['icon/danger', 'red/600', 'red/400', 'Danger icons.'],
  ['icon/success', 'green/600', 'green/400', 'Success icons, online status.'],
  ['icon/warning', 'amber/500', 'amber/400', 'Warning icons.'],
  ['icon/info', 'blue/600', 'blue/400', 'Info icons.'],
  // Effects -----------------------------------------------------------------
  ['shadow/strong', '#1018281A', '#00000080', 'Primary (key) shadow layer.'],
  ['shadow/soft', '#1018280F', '#0000004D', 'Secondary (ambient) shadow layer.'],
  ['focus/ring', '@brand/500:3D', '@brand/400:66', 'Focus ring (4px spread).'],
  ['focus/ring-danger', '@red/500:3D', '@red/400:66', 'Focus ring on invalid controls.'],
  // Data visualisation --------------------------------------------------------
  ['chart/1', 'brand/500', 'brand/400', 'Categorical series 1.'],
  ['chart/2', 'teal/500', 'teal/400', 'Categorical series 2.'],
  ['chart/3', 'amber/500', 'amber/400', 'Categorical series 3.'],
  ['chart/4', 'violet/500', 'violet/400', 'Categorical series 4.'],
  ['chart/5', 'red/400', 'red/300', 'Categorical series 5.'],
  ['chart/6', 'blue/400', 'blue/300', 'Categorical series 6.'],
];

// ---------------------------------------------------------------------------
// 3. DIMENSIONS (collection "Dimensions", modes Comfortable + Compact)
//    [token, comfortable, compact, description]
// ---------------------------------------------------------------------------
const DIMENSIONS = [
  ['space/0', 0, 0, 'No spacing.'],
  ['space/50', 2, 2, 'Hairline gaps (badge dot ↔ label).'],
  ['space/100', 4, 4, 'Icon ↔ text in tight controls.'],
  ['space/150', 6, 6, 'Label ↔ control.'],
  ['space/200', 8, 8, 'Default inline gap.'],
  ['space/300', 12, 12, 'Control inner padding (SM).'],
  ['space/400', 16, 16, 'Control inner padding (MD), card gaps.'],
  ['space/500', 20, 20, 'Card padding.'],
  ['space/600', 24, 24, 'Section gaps, page gutters.'],
  ['space/800', 32, 32, 'Page padding.'],
  ['space/1000', 40, 40, 'Large section gaps.'],
  ['space/1200', 48, 48, 'Layout gaps.'],
  ['space/1600', 64, 64, 'Documentation section gaps.'],
  ['space/2000', 80, 80, 'Documentation page padding.'],
  ['radius/none', 0, 0, 'Sharp corners: banners, table cells.'],
  ['radius/xs', 2, 2, 'Kbd hints, tiny tags.'],
  ['radius/sm', 4, 4, 'Checkboxes, menu items.'],
  ['radius/md', 6, 6, 'Buttons, inputs, chips.'],
  ['radius/lg', 8, 8, 'Cards, menus, tables.'],
  ['radius/xl', 12, 12, 'Modals, large cards.'],
  ['radius/2xl', 16, 16, 'Documentation panels.'],
  ['radius/full', 999, 999, 'Pills, avatars, toggles.'],
  ['border-width/default', 1, 1, 'Default stroke.'],
  ['border-width/thick', 2, 2, 'Selected/active indicators.'],
  ['size/control-sm', 32, 28, 'Small control height.'],
  ['size/control-md', 40, 32, 'Medium (default) control height.'],
  ['size/control-lg', 48, 40, 'Large control height.'],
  ['size/table-row', 56, 40, 'Data table body row height.'],
  ['size/table-header', 44, 36, 'Data table header row height.'],
  ['size/nav-height', 64, 56, 'Top navigation height.'],
  ['size/sidebar', 248, 248, 'Expanded sidebar width.'],
  ['size/sidebar-collapsed', 72, 64, 'Collapsed sidebar width.'],
  ['size/icon-sm', 16, 16, 'Small icon.'],
  ['size/icon-md', 20, 20, 'Medium icon.'],
  ['size/icon-lg', 24, 24, 'Large icon.'],
];

// ---------------------------------------------------------------------------
// 4. TYPOGRAPHY
// ---------------------------------------------------------------------------
const FONT_FAMILY = { sans: 'Inter', mono: 'Roboto Mono' };
const FONT_STYLE = { regular: 'Regular', medium: 'Medium', semibold: 'Semi Bold', bold: 'Bold' };

// [name, family, weight, size, lineHeight, letterSpacing(%), textCase, usage]
const TYPE_SCALE = [
  ['Display/Large', 'sans', 'bold', 48, 56, -2, null, 'Marketing-style hero numbers, empty dashboards, cover pages.'],
  ['Display/Medium', 'sans', 'bold', 36, 44, -2, null, 'Large KPI figures, onboarding headlines.'],
  ['Heading/H1', 'sans', 'semibold', 30, 38, -1, null, 'Page titles (one per page).'],
  ['Heading/H2', 'sans', 'semibold', 24, 32, -1, null, 'Section titles, KPI values.'],
  ['Heading/H3', 'sans', 'semibold', 20, 28, 0, null, 'Modal titles, large card titles.'],
  ['Heading/H4', 'sans', 'semibold', 18, 26, 0, null, 'Card & table titles.'],
  ['Heading/H5', 'sans', 'semibold', 16, 24, 0, null, 'Sub-section titles, form section headers.'],
  ['Body/Large/Regular', 'sans', 'regular', 16, 24, 0, null, 'Long-form reading, descriptions in docs.'],
  ['Body/Large/Medium', 'sans', 'medium', 16, 24, 0, null, 'Emphasised long-form text.'],
  ['Body/Medium/Regular', 'sans', 'regular', 14, 20, 0, null, 'Default UI text: table cells, form values, paragraphs.'],
  ['Body/Medium/Medium', 'sans', 'medium', 14, 20, 0, null, 'Emphasised UI text: names in tables, numbers.'],
  ['Body/Medium/Semibold', 'sans', 'semibold', 14, 20, 0, null, 'Strong emphasis inside UI text.'],
  ['Body/Small/Regular', 'sans', 'regular', 12, 18, 0, null, 'Helper text, metadata, timestamps.'],
  ['Body/Small/Medium', 'sans', 'medium', 12, 18, 0, null, 'Emphasised helper text.'],
  ['Label/Large', 'sans', 'medium', 16, 24, 0, null, 'Large buttons.'],
  ['Label/Medium', 'sans', 'medium', 14, 20, 0, null, 'Buttons, form labels, tabs, nav items.'],
  ['Label/Small', 'sans', 'medium', 12, 16, 0, null, 'Small buttons, badges, chips.'],
  ['Overline', 'sans', 'semibold', 11, 16, 6, 'UPPER', 'Section eyebrows, sidebar group labels.'],
  ['Caption', 'sans', 'regular', 12, 16, 0, null, 'Chart axes, legal copy, footnotes.'],
  ['Code/Medium', 'mono', 'regular', 13, 20, 0, null, 'IDs, API keys, code snippets.'],
  ['Code/Small', 'mono', 'regular', 12, 16, 0, null, 'Keyboard hints, inline IDs in tables.'],
];

// ---------------------------------------------------------------------------
// 5. ELEVATION (effect styles). Colours bind to shadow/* tokens so shadows
//    deepen automatically in dark mode.
// ---------------------------------------------------------------------------
const ELEVATION = [
  ['Elevation/0 Flat', [], 'No shadow. Cards on canvas with a border.'],
  ['Elevation/1 XS', [[0, 1, 2, 0, 'shadow/soft']], 'Buttons, inputs (subtle lift).'],
  ['Elevation/2 SM', [[0, 1, 3, 0, 'shadow/strong'], [0, 1, 2, 0, 'shadow/soft']], 'Cards, stat tiles.'],
  ['Elevation/3 MD', [[0, 4, 8, -2, 'shadow/strong'], [0, 2, 4, -2, 'shadow/soft']], 'Hovered cards, sticky headers.'],
  ['Elevation/4 LG', [[0, 12, 16, -4, 'shadow/strong'], [0, 4, 6, -2, 'shadow/soft']], 'Dropdown menus, popovers, toasts.'],
  ['Elevation/5 XL', [[0, 20, 24, -4, 'shadow/strong'], [0, 8, 8, -4, 'shadow/soft']], 'Modals, drawers.'],
  ['Focus/Ring', [[0, 0, 0, 4, 'focus/ring']], 'Keyboard focus on any interactive control.'],
  ['Focus/Ring Danger', [[0, 0, 0, 4, 'focus/ring-danger']], 'Keyboard focus on invalid controls.'],
];

// ---------------------------------------------------------------------------
// 6. LAYOUT GRIDS
// ---------------------------------------------------------------------------
const GRIDS = [
  ['Grid/Desktop 1440 · 12 col', 1440, 12, 24, 32],
  ['Grid/Laptop 1280 · 12 col', 1280, 12, 24, 24],
  ['Grid/Tablet 768 · 8 col', 768, 8, 16, 24],
  ['Grid/Mobile 375 · 4 col', 375, 4, 16, 16],
];

// Utility: resolve a token reference to hex for a given mode (used by docs
// pages for contrast checks and by build.js for exports).
function resolveTokenHex(ref, prims) {
  prims = prims || PRIMITIVES;
  if (ref.charAt(0) === '#') return ref;
  if (ref.charAt(0) === '@') { // "@brand/500:3D" → primitive + alpha
    const parts = ref.slice(1).split(':');
    return resolveTokenHex(parts[0], prims) + parts[1];
  }
  const p = ref.split('/');
  const fam = prims[p[0]];
  if (!fam || !fam[p[1]]) throw new Error('Unknown primitive ' + ref);
  return fam[p[1]];
}
