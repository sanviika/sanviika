// ============================================================================
//  FOUNDATIONS — icons, cover, getting started, colour, typography, spacing,
//  radius, elevation, grid, iconography.
// ============================================================================

// 24×24 line icons, 2px stroke, round caps/joins (original geometry).
const ICONS = {
  placeholder: '<circle cx="12" cy="12" r="8"/><path d="M12 8v8M8 12h8"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  'chevron-down': '<path d="M6 9l6 6 6-6"/>',
  'chevron-up': '<path d="M6 15l6-6 6 6"/>',
  'chevron-left': '<path d="M15 6l-6 6 6 6"/>',
  'chevron-right': '<path d="M9 6l6 6-6 6"/>',
  check: '<path d="M5 12l5 5L20 7"/>',
  minus: '<path d="M5 12h14"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  'more-horizontal': '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M18 14.6c2.4.6 4 2.5 4 5.4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
  'credit-card': '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
  chart: '<path d="M3 21h18"/><path d="M6 17v-6M11 17V5M16 17v-9M21 17v-3"/>',
  file: '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  settings: '<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
  bell: '<path d="M6 9a6 6 0 0 1 12 0c0 6 3 8 3 8H3s3-2 3-8"/><path d="M10 21h4"/>',
  'help-circle': '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6"/><path d="M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
  'alert-triangle': '<path d="M12 3l10 18H2z"/><path d="M12 10v4"/><path d="M12 17.5h.01"/>',
  'check-circle': '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  'x-circle': '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
  sort: '<path d="M8 9l4-4 4 4M8 15l4 4 4-4"/>',
  'arrow-up': '<path d="M12 19V5M5 12l7-7 7 7"/>',
  'arrow-down': '<path d="M12 5v14M5 12l7 7 7-7"/>',
  'trend-up': '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  'trend-down': '<path d="M3 7l6 6 4-4 8 8"/><path d="M15 17h6v-6"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
  upload: '<path d="M12 15V3M7 8l5-5 5 5M4 21h16"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  'log-out': '<path d="M9 21H5V3h4"/><path d="M16 17l5-5-5-5M21 12H9"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 7l4 4"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3"/>',
  'external-link': '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v6H4V6h6"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
};
const ICON_GROUPS = {
  Navigation: ['home', 'grid', 'users', 'user', 'building', 'credit-card', 'chart', 'file', 'settings', 'menu', 'log-out', 'globe'],
  Actions: ['search', 'plus', 'minus', 'x', 'check', 'edit', 'copy', 'trash', 'download', 'upload', 'filter', 'sort', 'more-horizontal', 'external-link', 'mail', 'calendar', 'lock', 'eye'],
  Arrows: ['chevron-down', 'chevron-up', 'chevron-left', 'chevron-right', 'arrow-up', 'arrow-down', 'trend-up', 'trend-down'],
  Status: ['info', 'help-circle', 'alert-triangle', 'check-circle', 'x-circle', 'bell', 'placeholder'],
};

function buildIconComponents() {
  progress('Drawing icons…');
  let x = -4000;
  Object.keys(ICONS).forEach(function (name) {
    const body = ICONS[name].replace(/<(path|circle|rect)/g, '<$1 fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"');
    const svg = figma.createNodeFromSvg('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' + body + '</svg>');
    const c = figma.createComponent();
    c.name = 'Icon/' + name;
    c.resize(24, 24);
    c.fills = [];
    c.clipsContent = false;
    const kids = svg.children.slice();
    kids.forEach(function (k) { c.appendChild(k); });
    svg.remove();
    let vec;
    try { vec = figma.flatten(c.children, c); } catch (e) { vec = c.children[0]; }
    vec.name = 'Vector';
    try { vec.constraints = { horizontal: 'SCALE', vertical: 'SCALE' }; } catch (e) { /* ignore */ }
    tint(c, 'icon/default');
    c.description = 'Icon “' + name + '”. Recolour via icon/* variables; swap via the Icon property on components.';
    c.x = x; c.y = -4000; x += 40;
    figma.currentPage.appendChild(c);
    S.icons[name] = c;
  });
}

// ---------------------------------------------------------------- cover
async function buildCover(page) {
  await figma.setCurrentPageAsync(page);
  const f = frame('Cover', { dir: 'V', gap: 'space/1200', p: 120, w: 1920, h: 1080, fill: 'bg/surface', justify: 'between' });
  figma.currentPage.appendChild(f);
  const top = frame('Top', { dir: 'V', gap: 'space/600' });
  add(f, top);
  const logo = frame('Logo', { dir: 'H', gap: 'space/300', align: 'center' });
  const mk = frame('Mark', { dir: 'H', w: 56, h: 56, radius: 'radius/xl', fill: 'bg/brand', justify: 'center', align: 'center' });
  add(mk, await text('N', 'Heading/H2', 'text/on-brand'));
  add(logo, mk, await text(DS_NAME, 'Heading/H2', 'text/primary'));
  add(top, logo);
  add(top, await text('Atomic design system for B2B SaaS', 'Display/Large', 'text/primary'));
  add(top, await text('Foundations → Atoms → Molecules → Organisms → Templates. Every element is token-driven, documented, and ships in Light & Dark.', 'Body/Large/Regular', 'text/secondary', null, { w: 1000 }));
  const stats = frame('Stats', { dir: 'H', gap: 'space/600' });
  add(f, stats);
  const items = [
    [S.stats.pages, 'Pages'], [S.stats.components, 'Components'], [S.stats.variants, 'Variants'],
    [S.stats.variables, 'Variables'], [S.stats.textStyles, 'Text styles'], [S.stats.effectStyles, 'Effect styles'],
  ];
  for (let i = 0; i < items.length; i++) {
    const c = card('Stat', { gap: 'space/100' });
    setW(c, 240);
    add(c, await text(String(items[i][0]), 'Display/Medium', 'text/brand'), await text(items[i][1], 'Label/Medium', 'text/secondary'));
    add(stats, c);
  }
  const foot = frame('Footer', { dir: 'H', gap: 'space/600', align: 'center' });
  add(f, foot);
  add(foot, await text('v' + DS_VERSION + '  ·  ' + (S.hasDark ? 'Light + Dark' : 'Light only') + '  ·  ' + S.sans + ' / ' + S.mono + (S.source && S.source.found ? '  ·  Brand & organisms from “' + S.source.name + '”' : ''), 'Body/Medium/Regular', 'text/tertiary'));
  if (S.hasDark) {
    const d = f.clone();
    d.name = 'Cover · Dark';
    d.x = 2000;
    figma.currentPage.appendChild(d);
    setMode(d, 'Dark');
  }
  try { await figma.setFileThumbnailNodeAsync(f); } catch (e) { /* not permitted in all contexts */ }
}

// ---------------------------------------------------------------- getting started
async function buildGettingStarted() {
  await newPage('🚀 Getting Started');
  const root = await docRoot({
    title: 'Getting started', category: 'Guide',
    summary: DS_NAME + ' follows Brad Frost’s atomic design methodology and the token architecture used by Atlassian, IBM Carbon and Shopify Polaris. This page explains how the file is organised, how tokens flow into components, and how to use dark mode and density.',
  });

  const a = await section(root, 'Atomic structure', 'Each element lives on its own page. Higher levels are built exclusively from instances of lower levels — never from raw layers.');
  const row = frame('Levels', { dir: 'H', gap: 'space/400', align: 'start' });
  add(a, row); fillW(row);
  const levels = [
    ['🎨 Foundations', 'Colour, typography, spacing, radius, elevation, grid and icons — published as variables & styles.'],
    ['⚛️ Atoms', 'Smallest UI controls: Button, Input, Checkbox, Badge, Avatar… Bound only to tokens.'],
    ['🧬 Molecules', 'Groups of atoms with one job: Form Field, Select, Tabs, Pagination, Stat Card…'],
    ['🦠 Organisms', 'Complex, product-level sections: Sidebar, Data Table, Modal, Filter Bar…'],
    ['📐 Templates', 'Full pages composed of organisms, in Light, Dark and Compact.'],
  ];
  for (let i = 0; i < levels.length; i++) {
    const c = card(levels[i][0]);
    add(row, c); fillW(c);
    add(c, await text(levels[i][0], 'Heading/H5', 'text/primary'));
    const t = await text(levels[i][1], 'Body/Medium/Regular', 'text/secondary'); add(c, t); fillW(t);
  }

  const b = await section(root, 'Token architecture', 'Three tiers keep themes, density and brand changes to a single edit.');
  const flow = frame('Flow', { dir: 'H', gap: 'space/400', align: 'center' });
  add(b, flow); fillW(flow);
  const tiers = [
    ['1 · Primitive', 'brand/600', 'Raw palette values. Hidden from pickers (no scopes).'],
    ['2 · Semantic', 'bg/brand', 'Role-based, with Light & Dark values. The only colours designers apply.'],
    ['3 · Component', 'Button · Primary · Default → fill', 'Components reference semantic tokens per state.'],
  ];
  for (let i = 0; i < tiers.length; i++) {
    const c = card(tiers[i][0]);
    add(flow, c); fillW(c);
    add(c, await text(tiers[i][0], 'Overline', 'text/brand'), await text(tiers[i][1], 'Code/Medium', 'text/primary'));
    const t = await text(tiers[i][2], 'Body/Medium/Regular', 'text/secondary'); add(c, t); fillW(t);
    if (i < 2) add(flow, icon('chevron-right', 24, 'icon/secondary'));
  }

  const c = await section(root, 'Dark mode & density', 'Modes are applied per frame — nothing is duplicated.');
  await twoCards(c,
    { title: 'Switch to Dark', items: ['Select any frame, section or page-level frame.', 'In the right panel → Appearance → click the variable-mode icon → Color → Dark.', 'Every nested component re-resolves its semantic tokens automatically.'], icon: 'check', color: 'icon/brand' },
    { title: 'Switch to Compact', items: ['Same panel → Dimensions → Compact.', 'Control heights drop (40 → 32), table rows drop (56 → 40), nav drops (64 → 56).', 'Use Compact for admin & data-heavy screens.'], icon: 'check', color: 'icon/brand' });

  const d = await section(root, 'Naming conventions', 'Consistent names make the library searchable and map 1:1 to code.');
  const nc = card('Naming');
  add(d, nc); fillW(nc);
  await bullets(nc, [
    'Variables: category/role[-modifier] — bg/surface-raised, text/on-brand, space/400, size/control-md.',
    'Code syntax: every variable exposes WEB code syntax var(--ns-<token>) in Dev Mode.',
    'Components: Title Case nouns (Button, Form Field). Variant properties: Hierarchy, Size, State, Tone, Type.',
    'Booleans start with “Show” or describe the layer (Leading icon). Instance swaps are named “Icon”.',
    'Text styles: Category/Size/Weight — Body/Medium/Regular.',
  ], 'chevron-right', 'icon/brand');

  const e = await section(root, 'Contributing', 'How to propose a change to the system.');
  const cc = card('Contributing');
  add(e, cc); fillW(cc);
  await bullets(cc, [
    '1. Check whether an existing component + property covers the need.',
    '2. Prototype with existing atoms/molecules on a branch; never edit the main file directly.',
    '3. Document usage, do/don’t and accessibility on the element’s page using the existing sections.',
    '4. Request review from the design-system team; publish with a changelog entry.',
  ], 'chevron-right', 'icon/brand');

  const f = await section(root, 'Inspiration & references', 'Patterns adapted from public design systems (see LogRocket’s “17 Figma design systems”).');
  const rc = card('References');
  add(f, rc); fillW(rc);
  await bullets(rc, [
    'IBM Carbon — data table anatomy, density modes, 2px focus treatment.',
    'Atlassian Design System — semantic token naming (bg / text / border / icon) and numeric spacing scale.',
    'Shopify Polaris — documentation structure: usage, do/don’t, accessibility per component.',
    'Salesforce Lightning — B2B record pages: page header with breadcrumb, actions and tabs.',
    'Material 3 & Fluent 2 — elevation tiers and tonal surfaces in dark mode.',
    'Untitled UI & GitHub Primer — status colour ramps and badge tones.',
  ], 'external-link', 'icon/brand');
}

// ---------------------------------------------------------------- colour
async function buildColours() {
  progress('Building Colour page…');
  await newPage('🎨 Foundations / Colour');
  const meta = DOCS.colors;
  const root = await docRoot(meta, 1760);
  await usageSection(root, meta);

  // Primitives
  const pb = await section(root, 'Primitives', 'Raw colour ramps (collection “Primitives”). These are hidden from pickers — always apply a semantic token. ' + (S.source && S.source.brandFromSource ? 'The brand ramp was generated from ' + S.source.brand + ', the dominant brand colour in the linked file.' : 'Brand ramp: default indigo.'));
  const fams = Object.keys(S.prims);
  for (let f = 0; f < fams.length; f++) {
    const row = frame(fams[f], { dir: 'H', gap: 'space/200', align: 'start' });
    add(pb, row);
    const lbl = await text(fams[f].charAt(0).toUpperCase() + fams[f].slice(1), 'Heading/H5', 'text/primary');
    lbl.textAutoResize = 'HEIGHT'; lbl.resize(120, lbl.height);
    add(row, lbl);
    const steps = Object.keys(S.prims[fams[f]]);
    for (let s = 0; s < steps.length; s++) {
      const sw = frame(fams[f] + '/' + steps[s], { dir: 'V', gap: 'space/100' });
      const chip = frame('Swatch', { dir: 'none', w: 104, h: 64, radius: 'radius/lg', stroke: 'border/subtle' });
      chip.fills = [paintVar(fams[f] + '/' + steps[s])];
      add(sw, chip, await text(steps[s], 'Label/Small', 'text/primary'), await text(S.prims[fams[f]][steps[s]], 'Code/Small', 'text/tertiary'));
      add(row, sw);
    }
  }

  // Source palette
  if (S.source && S.source.palette && S.source.palette.length) {
    const sb = await section(root, 'Palette found in the linked file', 'Most-used solid colours in “' + S.source.name + '”. Imported organisms were re-bound to the nearest semantic token.');
    const wrap = frame('Source palette', { dir: 'H', gap: 'space/300', wrap: true });
    add(sb, wrap); fillW(wrap);
    for (let i = 0; i < S.source.palette.length; i++) {
      const p = S.source.palette[i];
      const sw = frame(p.hex, { dir: 'V', gap: 'space/100' });
      const chip = frame('Swatch', { dir: 'none', w: 104, h: 64, radius: 'radius/lg', stroke: 'border/subtle' });
      chip.fills = [{ type: 'SOLID', color: rgb(p.hex) }];
      add(sw, chip, await text(p.hex, 'Code/Small', 'text/primary'), await text(p.count + ' uses', 'Caption', 'text/tertiary'));
      add(wrap, sw);
    }
  }

  // Semantic tables
  const groups = [
    ['Background', 'bg/'], ['Text', 'text/'], ['Border', 'border/'], ['Icon', 'icon/'], ['Effects', 'shadow/'], ['Focus', 'focus/'], ['Data visualisation', 'chart/'],
  ];
  const sb2 = await section(root, 'Semantic tokens', 'Collection “Color” with Light and Dark modes. Contrast is checked against the background each token is designed for (WCAG AA: 4.5:1 text, 3:1 UI).');
  for (let g = 0; g < groups.length; g++) {
    const rows = SEMANTIC.filter(function (r) { return r[0].indexOf(groups[g][1]) === 0; });
    add(sb2, await text(groups[g][0], 'Heading/H4', 'text/primary'));
    const table = frame(groups[g][0] + ' tokens', { dir: 'V', fill: 'bg/surface', stroke: 'border/default', radius: 'radius/lg', clip: true });
    add(sb2, table); fillW(table);
    const cols = [['Token', 240], ['Light', 96], ['Dark', 96], ['Description', null], ['Light → Dark', 300], ['Contrast (L / D)', 180]];
    const head = frame('Header', { dir: 'H', gap: 'space/400', px: 'space/500', py: 'space/300', fill: 'bg/surface-sunken' });
    add(table, head); fillW(head);
    for (let i = 0; i < cols.length; i++) {
      const t = await text(cols[i][0], 'Label/Small', 'text/secondary');
      add(head, t);
      if (cols[i][1]) { t.textAutoResize = 'HEIGHT'; t.resize(cols[i][1], t.height); } else fillW(t);
    }
    for (let r = 0; r < rows.length; r++) {
      const name = rows[r][0];
      const tr = frame(name, { dir: 'H', gap: 'space/400', px: 'space/500', py: 'space/300', align: 'center' });
      add(table, tr); fillW(tr); setSideStroke(tr, 'border/subtle', 'top');
      const n = await text(name, 'Code/Medium', 'text/primary'); n.textAutoResize = 'HEIGHT'; n.resize(240, n.height); add(tr, n);
      const isText = name.indexOf('text/') === 0;
      const bgFor = name === 'text/inverse' ? 'bg/inverse' : name === 'text/on-brand' ? 'bg/brand' : name === 'text/on-warning' ? 'bg/warning' : 'bg/surface';
      const modes = ['Light', 'Dark'];
      for (let m = 0; m < 2; m++) {
        const sw = frame('Swatch ' + modes[m], { dir: 'H', w: 96, h: 40, radius: 'radius/md', stroke: 'border/default', justify: 'center', align: 'center' });
        if (isText) { setFill(sw, bgFor); add(sw, await text('Aa', 'Heading/H5', name)); } else { setFill(sw, name); }
        add(tr, sw);
        if (m === 1) setMode(sw, 'Dark'); else setMode(sw, 'Light');
      }
      const d = await text(rows[r][3], 'Body/Small/Regular', 'text/secondary'); add(tr, d); fillW(d);
      const refTxt = await text(rows[r][1] + '  →  ' + rows[r][2], 'Code/Small', 'text/tertiary'); refTxt.textAutoResize = 'HEIGHT'; refTxt.resize(300, refTxt.height); add(tr, refTxt);
      let cTxt = '—';
      if (isText || name.indexOf('icon/') === 0 || name.indexOf('border/') === 0) {
        const bg = isText ? bgFor : 'bg/surface';
        const cl = contrast(semHex(name, 'Light'), semHex(bg, 'Light')), cd = contrast(semHex(name, 'Dark'), semHex(bg, 'Dark'));
        const need = isText ? 4.5 : 3;
        cTxt = cl.toFixed(1) + ' / ' + cd.toFixed(1) + (Math.min(cl, cd) >= need ? '  ✓ AA' : (name.indexOf('disabled') >= 0 || name.indexOf('subtle') >= 0 || name === 'border/default' || name === 'icon/secondary' || name === 'text/tertiary' ? '  (decorative)' : '  ⚠'));
      }
      const ct = await text(cTxt, 'Code/Small', 'text/secondary'); ct.textAutoResize = 'HEIGHT'; ct.resize(180, ct.height); add(tr, ct);
    }
  }
  await dosSection(root, meta);
  await a11ySection(root, meta);
}

// ---------------------------------------------------------------- typography
async function buildTypography() {
  progress('Building Typography page…');
  await newPage('🎨 Foundations / Typography');
  const meta = DOCS.typography;
  const root = await docRoot(meta);
  await usageSection(root, meta);

  const fb = await section(root, 'Typefaces', 'Two families, loaded as variables (font-family/sans, font-family/mono).');
  const row = frame('Families', { dir: 'H', gap: 'space/600' });
  add(fb, row); fillW(row);
  const fams = [[S.sans, 'Display/Large', 'UI typeface — headings, body, labels, data.'], [S.mono, 'Code/Medium', 'Monospace — IDs, code, keyboard hints.']];
  for (let i = 0; i < fams.length; i++) {
    const c = card(fams[i][0]); add(row, c); fillW(c);
    add(c, await text('Aa', 'Display/Large', 'text/brand'), await text(fams[i][0], 'Heading/H3', 'text/primary'));
    add(c, await text('ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 $€£%', fams[i][1], 'text/secondary', null, { w: 600 }));
    add(c, await text(fams[i][2], 'Body/Medium/Regular', 'text/tertiary'));
  }

  const sb = await section(root, 'Type scale', 'All 21 text styles. Font size, line height and family are bound to Typography variables.');
  const table = frame('Scale', { dir: 'V', fill: 'bg/surface', stroke: 'border/default', radius: 'radius/lg', clip: true });
  add(sb, table); fillW(table);
  const sample = function (n) {
    if (n.indexOf('Display') === 0) return '$1.24M ARR';
    if (n.indexOf('Heading') === 0) return 'Quarterly revenue report';
    if (n.indexOf('Code') === 0) return 'INV-2026-0142 · sk_live_51H…';
    if (n === 'Overline') return 'Workspace settings';
    if (n.indexOf('Label') === 0) return 'Create invoice';
    return 'Invoices are sent automatically 3 days before the due date.';
  };
  for (let i = 0; i < TYPE_SCALE.length; i++) {
    const t = TYPE_SCALE[i];
    const r = frame(t[0], { dir: 'H', gap: 'space/600', px: 'space/600', py: 'space/500', align: 'center' });
    add(table, r); fillW(r);
    if (i) setSideStroke(r, 'border/subtle', 'top');
    const left = frame('Spec', { dir: 'V', gap: 'space/100', w: 280 });
    add(r, left);
    const fam = t[1] === 'mono' ? S.mono : S.sans;
    add(left, await text(t[0], 'Label/Medium', 'text/primary'), await text(fam + ' ' + (t[1] === 'mono' ? 'Regular' : FONT_STYLE[t[2]]) + ' · ' + t[3] + '/' + t[4] + ' · ' + t[5] + '%' + (t[6] ? ' · UPPER' : ''), 'Code/Small', 'text/tertiary'));
    const sp = await text(sample(t[0]), t[0], 'text/primary', 'Specimen'); add(r, sp); fillW(sp);
    const u = await text(t[7], 'Body/Small/Regular', 'text/secondary', 'Usage', { w: 320 }); add(r, u);
  }

  const hb = await section(root, 'Hierarchy in context', 'A typical record page header and table cell using the scale.');
  await themePreview(hb, async function (c) {
    const ex = frame('Example', { dir: 'V', gap: 'space/200', p: 'space/600', fill: 'bg/surface', radius: 'radius/lg', stroke: 'border/default' });
    add(c, ex); setW(ex, 560);
    add(ex, await text('Billing', 'Overline', 'text/tertiary'), await text('Acme Inc.', 'Heading/H1', 'text/primary'));
    add(ex, await text('Enterprise plan · Customer since 2021', 'Body/Medium/Regular', 'text/secondary'));
    add(ex, await text('$48,250.00', 'Display/Medium', 'text/primary'), await text('Lifetime value · updated 5 minutes ago', 'Caption', 'text/tertiary'));
  });
  await dosSection(root, meta);
  await a11ySection(root, meta);
}

// ---------------------------------------------------------------- spacing
async function buildSpacing() {
  progress('Building Spacing page…');
  await newPage('🎨 Foundations / Spacing');
  const meta = DOCS.spacing;
  const root = await docRoot(meta);
  await usageSection(root, meta);
  const sb = await section(root, 'Spacing scale', 'Bars are bound to the variables — change a value in the Dimensions collection and everything updates.');
  const c = card('Scale', { gap: 'space/300' });
  add(sb, c); fillW(c);
  const rows = DIMENSIONS.filter(function (d) { return d[0].indexOf('space/') === 0; });
  for (let i = 0; i < rows.length; i++) {
    const r = frame(rows[i][0], { dir: 'H', gap: 'space/600', align: 'center' });
    add(c, r);
    const n = await text(rows[i][0], 'Code/Medium', 'text/primary'); n.textAutoResize = 'HEIGHT'; n.resize(160, n.height);
    const v = await text(rows[i][1] + 'px', 'Body/Medium/Medium', 'text/secondary'); v.textAutoResize = 'HEIGHT'; v.resize(64, v.height);
    const bar = frame('Bar', { dir: 'none', h: 16, w: Math.max(rows[i][1], 1), fill: 'bg/brand', radius: 'radius/xs' });
    bindDim(bar, 'width', rows[i][0]);
    const u = await text(rows[i][3], 'Body/Small/Regular', 'text/tertiary');
    add(r, n, v, bar, u);
  }
  const db = await section(root, 'Density modes', 'The Dimensions collection has Comfortable and Compact modes. Only component sizes change; the spacing scale stays constant.');
  const t = card('Sizes', { gap: 'space/200' });
  add(db, t); fillW(t);
  const sizeRows = DIMENSIONS.filter(function (d) { return d[0].indexOf('size/') === 0; });
  for (let i = 0; i < sizeRows.length; i++) {
    const r = frame(sizeRows[i][0], { dir: 'H', gap: 'space/600' });
    add(t, r);
    const n = await text(sizeRows[i][0], 'Code/Medium', 'text/primary'); n.textAutoResize = 'HEIGHT'; n.resize(240, n.height);
    const v = await text('Comfortable ' + sizeRows[i][1] + '  ·  Compact ' + sizeRows[i][2], 'Body/Medium/Regular', 'text/secondary'); v.textAutoResize = 'HEIGHT'; v.resize(320, v.height);
    add(r, n, v, await text(sizeRows[i][3], 'Body/Small/Regular', 'text/tertiary'));
  }
  await dosSection(root, meta);
  await a11ySection(root, meta);
}

// ---------------------------------------------------------------- radius & borders
async function buildRadius() {
  progress('Building Radius page…');
  await newPage('🎨 Foundations / Radius & Borders');
  const meta = DOCS.radius;
  const root = await docRoot(meta);
  await usageSection(root, meta);
  const rb = await section(root, 'Corner radius', 'Shapes below are bound to radius variables.');
  await themePreview(rb, async function (c) {
    const rows = DIMENSIONS.filter(function (d) { return d[0].indexOf('radius/') === 0; });
    for (let i = 0; i < rows.length; i++) {
      const w = frame(rows[i][0], { dir: 'V', gap: 'space/200', align: 'center' });
      const sq = frame('Shape', { dir: 'none', w: 88, h: 88, fill: 'bg/brand-subtle', stroke: 'border/brand', radius: rows[i][0] });
      add(w, sq, await text(rows[i][0], 'Code/Small', 'text/primary'), await text(rows[i][1] + 'px', 'Caption', 'text/tertiary'));
      add(c, w);
    }
  });
  const bb = await section(root, 'Border widths & colours', 'Strokes are bound to border-width and border/* variables.');
  await themePreview(bb, async function (c) {
    const list = ['border/subtle', 'border/default', 'border/strong', 'border/focus', 'border/danger'];
    for (let i = 0; i < list.length; i++) {
      const w = frame(list[i], { dir: 'V', gap: 'space/200', align: 'center' });
      const sq = frame('Shape', { dir: 'none', w: 120, h: 64, fill: 'bg/surface', stroke: list[i], strokeW: list[i] === 'border/focus' ? 2 : 1, radius: 'radius/lg' });
      bindDim(sq, 'strokeWeight', list[i] === 'border/focus' ? 'border-width/thick' : 'border-width/default');
      add(w, sq, await text(list[i], 'Code/Small', 'text/primary'));
      add(c, w);
    }
  });
  await dosSection(root, meta);
  await a11ySection(root, meta);
}

// ---------------------------------------------------------------- elevation
async function buildElevation() {
  progress('Building Elevation page…');
  await newPage('🎨 Foundations / Elevation');
  const meta = DOCS.elevation;
  const root = await docRoot(meta);
  await usageSection(root, meta);
  const eb = await section(root, 'Elevation levels', 'Effect styles; shadow colours are variables, so they deepen in dark mode.');
  await themePreview(eb, async function (c) {
    for (let i = 0; i < ELEVATION.length; i++) {
      const e = ELEVATION[i];
      const box = frame(e[0], { dir: 'V', gap: 'space/100', p: 'space/500', w: 200, h: 128, fill: 'bg/surface-raised', radius: 'radius/lg', stroke: e[0].indexOf('Focus') === 0 ? 'border/focus' : null });
      await effect(box, e[0]);
      add(box, await text(e[0], 'Label/Medium', 'text/primary'));
      const d = await text(e[2], 'Body/Small/Regular', 'text/secondary'); add(box, d); fillW(d);
      add(c, box);
    }
  }, { panelFill: 'bg/canvas' });
  await dosSection(root, meta);
  await a11ySection(root, meta);
}

// ---------------------------------------------------------------- grid
async function buildGrid() {
  progress('Building Grid page…');
  await newPage('🎨 Foundations / Grid & Layout');
  const meta = DOCS.grid;
  const root = await docRoot(meta, 1760);
  await usageSection(root, meta);
  const gb = await section(root, 'Breakpoints', 'Published as grid styles — apply from the Layout grid panel.');
  for (let i = 0; i < GRIDS.length; i++) {
    const g = GRIDS[i];
    add(gb, await text(g[0] + '  ·  gutter ' + g[3] + ' · margin ' + g[4], 'Heading/H5', 'text/primary'));
    const f = frame(g[0], { dir: 'none', w: g[1], h: 160, fill: 'bg/surface', stroke: 'border/default', radius: 'radius/lg' });
    add(gb, f);
    if (S.gs[g[0]]) { try { await f.setGridStyleIdAsync(S.gs[g[0]].id); } catch (e) { f.layoutGrids = S.gs[g[0]].layoutGrids; } }
  }
  const ab = await section(root, 'App shell', 'Desktop layout used by every template.');
  const shell = frame('App shell', { dir: 'H', w: 1440, h: 400, fill: 'bg/canvas', stroke: 'border/default', radius: 'radius/lg', clip: true });
  add(ab, shell);
  const side = frame('Sidebar · 248', { dir: 'V', p: 'space/400', w: 'size/sidebar', fill: 'bg/surface', justify: 'center', align: 'center' });
  setSideStroke(side, 'border/default', 'right');
  add(side, await text('Sidebar\nsize/sidebar · 248', 'Code/Small', 'text/secondary', null, { align: 'CENTER' }));
  add(shell, side); fillH(side);
  const main = frame('Main', { dir: 'V' });
  add(shell, main); fillW(main); fillH(main);
  const nav = frame('Top nav', { dir: 'H', h: 'size/nav-height', fill: 'bg/surface', justify: 'center', align: 'center' });
  setSideStroke(nav, 'border/default', 'bottom');
  add(nav, await text('Top Navigation · size/nav-height · 64', 'Code/Small', 'text/secondary'));
  add(main, nav); fillW(nav);
  const content = frame('Content', { dir: 'V', p: 'space/800', gap: 'space/600', justify: 'center', align: 'center' });
  add(content, await text('Content · padding space/800 · section gap space/600 · 12 columns', 'Code/Small', 'text/secondary'));
  add(main, content); fillW(content); fillH(content);
  await dosSection(root, meta);
  await a11ySection(root, meta);
}

// ---------------------------------------------------------------- iconography
async function buildIconPage() {
  progress('Building Iconography page…');
  await newPage('🎨 Foundations / Iconography');
  const meta = DOCS.icons;
  const root = await docRoot(meta);
  await usageSection(root, meta);
  const groups = Object.keys(ICON_GROUPS);
  const lb = await section(root, 'Icon library', Object.keys(ICONS).length + ' icon components. These masters are the source for every Icon instance-swap property.');
  for (let g = 0; g < groups.length; g++) {
    add(lb, await text(groups[g], 'Heading/H4', 'text/primary'));
    const wrap = frame(groups[g], { dir: 'H', gap: 'space/300', wrap: true });
    add(lb, wrap); fillW(wrap);
    const names = ICON_GROUPS[groups[g]];
    for (let i = 0; i < names.length; i++) {
      const cell = frame(names[i], { dir: 'V', gap: 'space/200', w: 120, h: 104, fill: 'bg/surface', stroke: 'border/default', radius: 'radius/lg', justify: 'center', align: 'center' });
      add(cell, S.icons[names[i]]);
      add(cell, await text(names[i], 'Code/Small', 'text/secondary'));
      add(wrap, cell);
    }
  }
  const sb = await section(root, 'Sizes & colours', '16 / 20 / 24px and the icon/* colour roles.');
  await themePreview(sb, async function (c) {
    [16, 20, 24].forEach(function (s) { add(c, icon('settings', s, 'icon/default')); });
    ['icon/default', 'icon/secondary', 'icon/brand', 'icon/success', 'icon/warning', 'icon/danger', 'icon/info', 'icon/disabled'].forEach(function (col) { add(c, icon('bell', 24, col)); });
  });
  await dosSection(root, meta);
  await a11ySection(root, meta);
}

// ---------------------------------------------------------------- changelog
async function buildChangelog() {
  await newPage('📝 Changelog');
  const root = await docRoot({ title: 'Changelog', category: 'Guide', summary: 'Release history of the ' + DS_NAME + ' design system. Follow semantic versioning: MAJOR for breaking token/property renames, MINOR for new components or variants, PATCH for fixes.' });
  const b = await section(root, 'v' + DS_VERSION + ' — Initial release', new Date().toDateString());
  const c = card('Release');
  add(b, c); fillW(c);
  await bullets(c, [
    S.stats.variables + ' variables across Primitives, Color (Light/Dark), Dimensions (Comfortable/Compact) and Typography collections.',
    S.stats.textStyles + ' text styles, ' + S.stats.effectStyles + ' effect styles, ' + GRIDS.length + ' grid styles.',
    S.stats.components + ' components / sets with ' + S.stats.variants + ' variants across atoms, molecules and organisms.',
    'Every page documents usage, anatomy, variants, light & dark, properties, do/don’t, tokens and accessibility.',
    S.source && S.source.found ? S.stats.imported + ' organisms imported from “' + S.source.name + '” with ' + S.stats.bindings + ' token bindings.' : 'Linked source node not found in this file — organisms page lists how to import.',
  ], 'check', 'icon/success');
}
