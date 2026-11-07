// ============================================================================
//  ORGANISMS — built only from atom + molecule instances.
//  Plus: importer for organisms from the linked source file, and templates.
// ============================================================================

const TABLE_DATA = [
  ['INV-2026-0142', 'Net 30', 'Acme Inc.', 'billing@acme.com', 'AI', 'Success', 'Paid', '$12,480.00', 'Nov 02, 2026'],
  ['INV-2026-0141', 'Net 15', 'Northwind Traders', 'ap@northwind.co', 'NT', 'Warning', 'Pending', '$4,250.00', 'Oct 30, 2026'],
  ['INV-2026-0140', 'Net 30', 'Brightline Health', 'finance@brightline.io', 'BH', 'Danger', 'Overdue', '$28,900.00', 'Oct 12, 2026'],
  ['INV-2026-0139', 'Net 45', 'Halcyon Logistics', 'pay@halcyon.com', 'HL', 'Success', 'Paid', '$9,120.50', 'Oct 08, 2026'],
  ['INV-2026-0138', 'Due on receipt', 'Juniper Labs', 'ops@juniperlabs.dev', 'JL', 'Neutral', 'Draft', '$1,875.00', 'Oct 05, 2026'],
  ['INV-2026-0137', 'Net 30', 'Kestrel Analytics', 'accounts@kestrel.ai', 'KA', 'Info', 'Sent', '$15,600.00', 'Oct 01, 2026'],
];

// ---------------------------------------------------------------- Top Navigation
async function buildTopNav() {
  await componentPage('topNav', '🦠 Organisms / Top Navigation', async function (vb) {
    const c = frame('', { component: true, dir: 'H', justify: 'between', align: 'center', px: 'space/600', w: 1192, h: 'size/nav-height', fill: 'bg/surface' });
    setSideStroke(c, 'border/default', 'bottom');
    const s = make('Search Bar', { Placeholder: 'Search invoices, customers, reports…' }, 'Search');
    add(c, s); setW(s, 400);
    const right = frame('Actions', { dir: 'H', gap: 'space/200', align: 'center' });
    add(right, make('Icon Button', { Hierarchy: 'Tertiary', Icon: 'help-circle' }, 'Help'));
    const n = frame('Notifications', { dir: 'H' });
    add(n, make('Icon Button', { Hierarchy: 'Tertiary', Icon: 'bell' }, 'Bell'));
    const d = dot(8, 'bg/danger'); d.name = 'Unread'; setStroke(d, 'bg/surface', 2, 'OUTSIDE');
    add(n, d); d.layoutPositioning = 'ABSOLUTE'; d.x = 24; d.y = 8;
    add(right, n);
    const dv = make('Divider', { Orientation: 'Vertical' }); add(right, dv); dv.resize(1, 24);
    const user = frame('User menu', { dir: 'H', gap: 'space/200', align: 'center', pl: 'space/200' });
    const who = frame('Who', { dir: 'V' });
    add(who, await text('Olivia Rhye', 'Label/Medium', 'text/primary', 'Name'), await text('Admin · Acme Inc.', 'Body/Small/Regular', 'text/tertiary', 'Role'));
    add(user, make('Avatar', { Size: 'SM', Initials: 'OR', 'Show status': true }, 'Avatar'), who, icon('chevron-down', 16, 'icon/secondary', 'Chevron'));
    add(right, user);
    add(c, right);
    single('Top Navigation', c, vb, DOCS.topNav.summary);
    addTextProp(c, 'Name', 'Name', 'Olivia Rhye');
    addTextProp(c, 'Role', 'Role', 'Admin · Acme Inc.');
    addBoolProp(c, 'Show unread', 'Unread', true);
    expose(c, 'Search');
    return { sets: [c], stack: true };
  });
}

// ---------------------------------------------------------------- Sidebar
async function buildSidebar() {
  await componentPage('sidebar', '🦠 Organisms / Sidebar', async function (vb) {
    const NAV = [
      ['MAIN', null], ['Dashboard', 'grid', 'Active'], ['Customers', 'users'], ['Invoices', 'credit-card', 'Default', '12'], ['Reports', 'chart'], ['Documents', 'file'],
      ['WORKSPACE', null], ['Team', 'building'], ['Settings', 'settings'],
    ];
    const set = await variants('Sidebar', { Collapsed: ['False', 'True'] }, async function (v) {
      const col = v.Collapsed === 'True';
      const c = frame('', { component: true, dir: 'V', gap: 'space/100', p: 'space/400', w: col ? 'size/sidebar-collapsed' : 'size/sidebar', h: 960, fill: 'bg/surface', align: col ? 'center' : 'start' });
      setSideStroke(c, 'border/default', 'right');
      const logo = frame('Logo', { dir: 'H', gap: 'space/300', align: 'center', px: col ? null : 'space/200', pb: 'space/500' });
      const mk = frame('Mark', { dir: 'H', w: 32, h: 32, radius: 'radius/md', fill: 'bg/brand', justify: 'center', align: 'center' });
      add(mk, await text('N', 'Label/Large', 'text/on-brand', 'Letter'));
      add(logo, mk);
      if (!col) add(logo, await text(DS_NAME, 'Heading/H5', 'text/primary', 'Product'));
      add(c, logo);
      for (let i = 0; i < NAV.length; i++) {
        const n = NAV[i];
        if (!n[1]) {
          if (col) { const d = make('Divider', { Orientation: 'Horizontal' }, 'Group divider'); add(c, d); d.resize(40, 1); }
          else { const g = frame(n[0], { dir: 'H', px: 'space/300', pt: i ? 'space/500' : 'space/100', pb: 'space/200' }); add(g, await text(n[0], 'Overline', 'text/tertiary', 'Group label')); add(c, g); }
          continue;
        }
        const it = make('Nav Item', { Collapsed: col ? 'True' : 'False', State: n[2] || 'Default', Icon: n[1] }, n[0]);
        if (!col) { props(it, { Label: n[0], 'Show count': !!n[3] }); if (n[3]) setText(it, 'Label', n[3], 1); }
        add(c, it);
        if (!col) fillW(it);
      }
      const sp = spacer('V'); add(c, sp); fillH(sp);
      if (col) {
        add(c, make('Avatar', { Size: 'SM', Initials: 'OR' }, 'Account'));
      } else {
        const acc = frame('Account', { dir: 'H', gap: 'space/300', p: 'space/300', radius: 'radius/lg', stroke: 'border/default', align: 'center' });
        add(c, acc); fillW(acc);
        const who = frame('Who', { dir: 'V' });
        add(who, await text('Olivia Rhye', 'Label/Medium', 'text/primary', 'Name'), await text('olivia@acme.com', 'Body/Small/Regular', 'text/tertiary', 'Email'));
        add(acc, make('Avatar', { Size: 'SM', Initials: 'OR' }, 'Avatar'), who, make('Icon Button', { Hierarchy: 'Tertiary', Size: 'Small', Icon: 'log-out' }, 'Log out'));
        fillW(who);
      }
      return c;
    }, { parent: vb, description: DOCS.sidebar.summary });
    return { sets: [set], contentAlign: 'start' };
  });
}

// ---------------------------------------------------------------- Page Header
async function buildPageHeader() {
  await componentPage('pageHeader', '🦠 Organisms / Page Header', async function (vb) {
    const c = frame('', { component: true, dir: 'V', gap: 'space/400', w: 1144 });
    add(c, make('Breadcrumb', null, 'Breadcrumb'));
    const row = frame('Title row', { dir: 'H', gap: 'space/600', align: 'end' }); add(c, row); fillW(row);
    const tt = frame('Titles', { dir: 'V', gap: 'space/100' }); add(row, tt); fillW(tt);
    add(tt, await text('Invoices', 'Heading/H1', 'text/primary', 'Title'));
    add(tt, await text('Create, send and track invoices across all customers.', 'Body/Medium/Regular', 'text/secondary', 'Description'));
    const act = frame('Actions', { dir: 'H', gap: 'space/300' });
    add(act, make('Icon Button', { Hierarchy: 'Secondary', Icon: 'more-horizontal' }, 'More'));
    add(act, make('Button', { Hierarchy: 'Secondary', Label: 'Export', 'Show leading icon': true, 'Leading icon': 'download' }, 'Secondary action'));
    add(act, make('Button', { Hierarchy: 'Primary', Label: 'New invoice', 'Show leading icon': true, 'Leading icon': 'plus' }, 'Primary action'));
    add(row, act);
    const tabs = make('Tab Group', null, 'Tabs'); add(c, tabs); fillW(tabs);
    single('Page Header', c, vb, DOCS.pageHeader.summary);
    addTextProp(c, 'Title', 'Title', 'Invoices');
    addTextProp(c, 'Description', 'Description', 'Create, send and track invoices across all customers.');
    addBoolProp(c, 'Show breadcrumb', 'Breadcrumb', true);
    addBoolProp(c, 'Show tabs', 'Tabs', true);
    ['Secondary action', 'Primary action'].forEach(function (n) { expose(c, n); });
    return { sets: [c], stack: true };
  });
}

// ---------------------------------------------------------------- KPI Overview
async function buildKpi() {
  await componentPage('kpi', '🦠 Organisms / KPI Overview', async function (vb) {
    const c = frame('', { component: true, dir: 'H', gap: 'space/600', w: 1144 });
    const data = [['Total revenue', '$482,940', 'Up', '↑ 12.4%'], ['Outstanding', '$64,210', 'Down', '↓ 3.2%'], ['Active customers', '1,284', 'Up', '↑ 4.1%'], ['Avg. days to pay', '18.6', 'Neutral', '0.0%']];
    data.forEach(function (d) {
      const s = make('Stat Card', { Trend: d[2], Label: d[0], Value: d[1] }, d[0]);
      setText(s, 'Label', d[3], 1);
      add(c, s); fillW(s);
    });
    single('KPI Overview', c, vb, DOCS.kpi.summary);
    return { sets: [c], stack: true };
  });
}

// ---------------------------------------------------------------- Filter Bar
async function buildFilterBar() {
  await componentPage('filterBar', '🦠 Organisms / Filter Bar', async function (vb) {
    const c = frame('', { component: true, dir: 'V', gap: 'space/300', w: 1144 });
    const r1 = frame('Controls', { dir: 'H', gap: 'space/300', align: 'center' }); add(c, r1); fillW(r1);
    const s = make('Search Bar', { Placeholder: 'Search invoices…', 'Show shortcut': false }, 'Search'); add(r1, s); setW(s, 280);
    ['Status: All', 'Customer: Any', 'Last 30 days'].forEach(function (v) {
      const sel = make('Select', null, v); add(r1, sel); setW(sel, 180);
      setText(sel, 'Value', v);
    });
    add(r1, make('Button', { Hierarchy: 'Secondary', Label: 'More filters', 'Show leading icon': true, 'Leading icon': 'filter' }, 'More filters'));
    const sp = spacer('H'); add(r1, sp); fillW(sp);
    add(r1, make('Button', { Hierarchy: 'Tertiary', Label: 'Clear all' }, 'Clear all'));
    const r2 = frame('Applied filters', { dir: 'H', gap: 'space/200', align: 'center' }); add(c, r2);
    add(r2, await text('Applied:', 'Body/Small/Medium', 'text/tertiary', 'Applied label'));
    ['Status: Overdue', 'Amount > $5,000', 'Owner: Me'].forEach(function (t) { add(r2, make('Tag', { Size: 'Small', State: 'Selected', Label: t }, t)); });
    single('Filter Bar', c, vb, DOCS.filterBar.summary);
    addBoolProp(c, 'Show applied filters', 'Applied filters', true);
    return { sets: [c], stack: true };
  });
}

// ---------------------------------------------------------------- Data Table
async function fillRow(row, d) {
  setText(child(row, 'Invoice'), 'Text', d[0]); setText(child(row, 'Invoice'), 'Subtext', d[1]);
  setText(child(row, 'Customer'), 'Text', d[2]); setText(child(row, 'Customer'), 'Subtext', d[3]);
  setText(child(row, 'Customer'), 'Initials', d[4]);
  props(child(child(row, 'Status'), 'Badge'), { Tone: d[5] });
  setText(child(row, 'Status'), 'Label', d[6]);
  setText(child(row, 'Amount'), 'Text', d[7]);
  setText(child(row, 'Issued'), 'Text', d[8]);
}
async function buildDataTable() {
  await componentPage('dataTable', '🦠 Organisms / Data Table', async function (vb) {
    const c = frame('', { component: true, dir: 'V', w: 1144, fill: 'bg/surface', stroke: 'border/default', radius: 'radius/lg', clip: true });
    const tb = frame('Toolbar', { dir: 'H', gap: 'space/300', px: 'space/500', py: 'space/400', align: 'center' }); add(c, tb); fillW(tb);
    const tl = frame('Title', { dir: 'H', gap: 'space/200', align: 'center' }); add(tb, tl); fillW(tl);
    add(tl, await text('Recent invoices', 'Heading/H4', 'text/primary', 'Title'), make('Badge', { Tone: 'Brand', Size: 'Small', Label: '248' }, 'Count'));
    const s = make('Search Bar', { Size: 'Small', Placeholder: 'Search…', 'Show shortcut': false }, 'Search'); add(tb, s); setW(s, 240);
    add(tb, make('Button', { Hierarchy: 'Secondary', Size: 'Small', Label: 'Filter', 'Show leading icon': true, 'Leading icon': 'filter' }, 'Filter'));
    add(tb, make('Button', { Hierarchy: 'Secondary', Size: 'Small', Label: 'Export', 'Show leading icon': true, 'Leading icon': 'download' }, 'Export'));
    const h = make('Table Header Row', null, 'Header'); add(c, h); fillW(h);
    for (let i = 0; i < TABLE_DATA.length; i++) {
      const r = make('Table Row', { State: i === 2 ? 'Selected' : i === 1 ? 'Hover' : 'Default' }, 'Row ' + (i + 1));
      add(c, r); fillW(r);
      await fillRow(r, TABLE_DATA[i]);
    }
    const ft = frame('Footer', { dir: 'H', px: 'space/500', py: 'space/300' }); add(c, ft); fillW(ft);
    const p = make('Pagination', null, 'Pagination'); add(ft, p); fillW(p);
    single('Data Table', c, vb, DOCS.dataTable.summary);
    addTextProp(c, 'Title', 'Title', 'Recent invoices');
    addBoolProp(c, 'Show toolbar', 'Toolbar', true);
    addBoolProp(c, 'Show pagination', 'Footer', true);
    return { sets: [c], stack: true };
  });
}

// ---------------------------------------------------------------- Modal
async function buildModal() {
  await componentPage('modal', '🦠 Organisms / Modal', async function (vb, root) {
    const set = await variants('Modal', { Type: ['Form', 'Confirm'] }, async function (v) {
      if (v.Type === 'Form') {
        const c = frame('', { component: true, dir: 'V', w: 560, fill: 'bg/surface-raised', stroke: 'border/subtle', radius: 'radius/xl', clip: true });
        await effect(c, 'Elevation/5 XL');
        const h = frame('Header', { dir: 'H', gap: 'space/400', p: 'space/600', pb: 'space/200', align: 'start' }); add(c, h); fillW(h);
        const tt = frame('Titles', { dir: 'V', gap: 'space/100' }); add(h, tt); fillW(tt);
        add(tt, await text('Create invoice', 'Heading/H3', 'text/primary', 'Title'), await text('Bill a customer for products or services.', 'Body/Medium/Regular', 'text/secondary', 'Description'));
        add(h, make('Icon Button', { Hierarchy: 'Tertiary', Size: 'Small', Icon: 'x' }, 'Close'));
        const b = frame('Body', { dir: 'V', gap: 'space/400', p: 'space/600' }); add(c, b); fillW(b);
        const cust = make('Form Field', { Type: 'Select', Label: 'Customer', Required: true, 'Show helper': false }, 'Customer'); add(b, cust); fillW(cust);
        setText(cust, 'Value', 'Acme Inc.');
        const row = frame('Row', { dir: 'H', gap: 'space/400' }); add(b, row); fillW(row);
        const amt = make('Form Field', { Type: 'Input', Label: 'Amount', Required: true, 'Show helper': false }, 'Amount'); add(row, amt); fillW(amt);
        props(child(amt, 'Control'), { Filled: 'True', Value: '$12,480.00' });
        const due = make('Form Field', { Type: 'Input', Label: 'Due date', 'Show helper': false }, 'Due date'); add(row, due); fillW(due);
        props(child(due, 'Control'), { 'Show leading icon': true, 'Leading icon': 'calendar', Filled: 'True', Value: 'Dec 02, 2026' });
        const notes = make('Form Field', { Type: 'Textarea', Label: 'Notes', Helper: 'Visible to the customer on the invoice PDF.' }, 'Notes'); add(b, notes); fillW(notes);
        const f = frame('Footer', { dir: 'H', gap: 'space/300', px: 'space/600', py: 'space/400', justify: 'end', fill: 'bg/surface-sunken' }); add(c, f); fillW(f);
        setSideStroke(f, 'border/subtle', 'top');
        add(f, make('Button', { Hierarchy: 'Secondary', Label: 'Cancel' }, 'Cancel'), make('Button', { Hierarchy: 'Primary', Label: 'Create invoice' }, 'Confirm'));
        return c;
      }
      const c = frame('', { component: true, dir: 'V', gap: 'space/500', p: 'space/600', w: 440, fill: 'bg/surface-raised', stroke: 'border/subtle', radius: 'radius/xl' });
      await effect(c, 'Elevation/5 XL');
      const ic = frame('Icon wrap', { dir: 'H', w: 48, h: 48, radius: 'radius/full', fill: 'bg/danger-subtle', justify: 'center', align: 'center' });
      add(ic, icon('trash', 24, 'icon/danger', 'Icon')); add(c, ic);
      const tt = frame('Titles', { dir: 'V', gap: 'space/150' }); add(c, tt); fillW(tt);
      add(tt, await text('Delete invoice INV-2026-0140?', 'Heading/H4', 'text/primary', 'Title'));
      const d = await text('This permanently deletes the invoice and its payment history. This action cannot be undone.', 'Body/Medium/Regular', 'text/secondary', 'Description'); add(tt, d); fillW(d);
      const f = frame('Footer', { dir: 'H', gap: 'space/300', justify: 'end' }); add(c, f); fillW(f);
      add(f, make('Button', { Hierarchy: 'Secondary', Label: 'Cancel' }, 'Cancel'), make('Button', { Hierarchy: 'Destructive', Label: 'Delete invoice' }, 'Confirm'));
      return c;
    }, { parent: vb, cols: 2, description: DOCS.modal.summary });
    addTextProp(set, 'Title', 'Title', 'Create invoice');
    addTextProp(set, 'Description', 'Description', 'Bill a customer for products or services.');
    ['Cancel', 'Confirm'].forEach(function (n) { expose(set, n); });
    return { sets: [set], stack: true, preview: async function (c) {
      const ov = frame('Modal on overlay', { dir: 'H', gap: 'space/1200', p: 'space/1200', fill: 'bg/overlay', radius: 'radius/lg', justify: 'center', align: 'center' });
      add(c, ov); fillW(ov);
      add(ov, make('Modal', { Type: 'Form' }), make('Modal', { Type: 'Confirm' }));
    } };
  });
}

// ---------------------------------------------------------------- Settings form section
async function buildFormSection() {
  await componentPage('formSection', '🦠 Organisms / Settings Form Section', async function (vb) {
    const c = frame('', { component: true, dir: 'H', gap: 'space/1200', p: 'space/800', w: 1144, fill: 'bg/surface', stroke: 'border/default', radius: 'radius/lg', align: 'start' });
    const l = frame('Intro', { dir: 'V', gap: 'space/100', w: 300 }); add(c, l);
    add(l, await text('Company profile', 'Heading/H5', 'text/primary', 'Title'));
    const d = await text('This information appears on invoices, receipts and customer emails.', 'Body/Medium/Regular', 'text/secondary', 'Description'); add(l, d); fillW(d);
    const r = frame('Fields', { dir: 'V', gap: 'space/500' }); add(c, r); fillW(r);
    const pair = async function (a, b) {
      const row = frame('Row', { dir: 'H', gap: 'space/400' }); add(r, row); fillW(row);
      [a, b].forEach(function (f) {
        const ff = make('Form Field', { Type: f[0], Label: f[1], 'Show helper': !!f[3], Required: !!f[4] }, f[1]); add(row, ff); fillW(ff);
        if (f[3]) props(ff, { Helper: f[3] });
        setText(ff, 'Value', f[2]);
        if (f[0] === 'Input') props(child(ff, 'Control'), { Filled: 'True' });
      });
    };
    await pair(['Input', 'Company name', 'Acme Inc.', null, true], ['Input', 'Tax ID', 'US-84-2190331']);
    await pair(['Input', 'Billing email', 'billing@acme.com', 'Invoices are sent from this address.', true], ['Input', 'Phone', '+1 (415) 555-0132']);
    await pair(['Select', 'Default currency', 'USD — US Dollar'], ['Select', 'Payment terms', 'Net 30']);
    const dv = make('Divider', { Orientation: 'Horizontal' }); add(r, dv); fillW(dv);
    const toggles = [['Automatic reminders', 'Email customers 3 days before and after the due date.', 'True'], ['Attach PDF to emails', 'Include the invoice PDF as an attachment.', 'False']];
    for (let i = 0; i < toggles.length; i++) {
      const row = frame('Toggle row', { dir: 'H', gap: 'space/400', align: 'center' }); add(r, row); fillW(row);
      const tx = frame('Text', { dir: 'V', gap: 'space/50' }); add(row, tx); fillW(tx);
      add(tx, await text(toggles[i][0], 'Label/Medium', 'text/primary'), await text(toggles[i][1], 'Body/Small/Regular', 'text/tertiary'));
      add(row, make('Toggle', { On: toggles[i][2], 'Show label': false }, 'Toggle'));
    }
    const f = frame('Footer', { dir: 'H', gap: 'space/300', justify: 'end', pt: 'space/200' }); add(r, f); fillW(f);
    add(f, make('Button', { Hierarchy: 'Secondary', Label: 'Cancel' }, 'Cancel'), make('Button', { Hierarchy: 'Primary', Label: 'Save changes' }, 'Save'));
    single('Settings Form Section', c, vb, DOCS.formSection.summary);
    addTextProp(c, 'Title', 'Title', 'Company profile');
    addTextProp(c, 'Description', 'Description', 'This information appears on invoices, receipts and customer emails.');
    return { sets: [c], stack: true };
  });
}

// ---------------------------------------------------------------- Source analysis & import
const SRC_TEXT = SEMANTIC.filter(function (r) { return r[0].indexOf('text/') === 0; }).map(function (r) { return r[0]; });
const SRC_BG = SEMANTIC.filter(function (r) { return r[0].indexOf('bg/') === 0 && r[0] !== 'bg/overlay'; }).map(function (r) { return r[0]; }).concat(['chart/1', 'chart/2', 'chart/3', 'chart/4', 'chart/5', 'chart/6']);
const SRC_BORDER = SEMANTIC.filter(function (r) { return r[0].indexOf('border/') === 0; }).map(function (r) { return r[0]; });
const SRC_ICON = SEMANTIC.filter(function (r) { return r[0].indexOf('icon/') === 0; }).map(function (r) { return r[0]; });

function walkLimited(node, fn, limit) {
  let count = 0;
  const stack = [node];
  while (stack.length && count < limit) {
    const n = stack.pop(); count++;
    fn(n);
    if ('children' in n) for (let i = n.children.length - 1; i >= 0; i--) stack.push(n.children[i]);
  }
  return count;
}
/** Read colours + fonts of the linked node, before tokens are created. */
async function analyzeSource(nodeId) {
  const out = { found: false, id: nodeId, palette: [], brand: null, brandFromSource: false, fontFamily: null };
  if (!nodeId) return out;
  let node = null;
  try { node = await figma.getNodeByIdAsync(nodeId); } catch (e) { node = null; }
  if (!node || node.type === 'DOCUMENT' || node.type === 'PAGE') { warn('Source node ' + nodeId + ' was not found in this file. Run the plugin inside the linked file to import its organisms.'); return out; }
  out.found = true; out.name = node.name; out.node = node;
  let p = node.parent; while (p && p.type !== 'PAGE') p = p.parent; out.page = p ? p.name : '';
  const colours = {}, fonts = {};
  walkLimited(node, function (n) {
    if (n.visible === false) return;
    if (Array.isArray(n.fills)) n.fills.forEach(function (f) {
      if (f.type === 'SOLID' && f.visible !== false && (f.opacity == null || f.opacity > 0.5)) { const h = rgb2hex(f.color); colours[h] = (colours[h] || 0) + 1; }
    });
    if (n.type === 'TEXT' && n.fontName && typeof n.fontName === 'object' && n.fontName.family) fonts[n.fontName.family] = (fonts[n.fontName.family] || 0) + (n.characters ? n.characters.length : 1);
  }, 20000);
  const sorted = Object.keys(colours).sort(function (a, b) { return colours[b] - colours[a]; });
  out.palette = sorted.slice(0, 16).map(function (h) { return { hex: h, count: colours[h] }; });
  for (let i = 0; i < sorted.length; i++) {
    const hsl = rgb2hsl(rgb(sorted[i]));
    const hueDeg = hsl.h * 360;
    const isStatus = (hueDeg < 15 || hueDeg > 345) || (hueDeg > 90 && hueDeg < 160); // skip red & green — reserved for status
    if (hsl.s >= 0.35 && hsl.l >= 0.3 && hsl.l <= 0.68 && !isStatus) { out.brand = sorted[i]; break; }
  }
  const f = Object.keys(fonts).sort(function (a, b) { return fonts[b] - fonts[a]; })[0];
  if (f) out.fontFamily = f;
  return out;
}
function nearest(hex, candidates) {
  const c = rgb(hex); let best = null, bd = 1e9;
  candidates.forEach(function (name) {
    const t = rgb(semHex(name, 'Light'));
    const d = 0.3 * Math.pow(c.r - t.r, 2) + 0.59 * Math.pow(c.g - t.g, 2) + 0.11 * Math.pow(c.b - t.b, 2);
    if (d < bd) { bd = d; best = name; }
  });
  return best;
}
function nearestTextStyle(size, weight) {
  const w = String(weight || '').toLowerCase();
  const wv = w.indexOf('bold') >= 0 && w.indexOf('semi') < 0 ? 'bold' : w.indexOf('semi') >= 0 ? 'semibold' : w.indexOf('medium') >= 0 ? 'medium' : 'regular';
  let best = null, bd = 1e9;
  TYPE_SCALE.forEach(function (t) {
    if (t[1] === 'mono' || t[6]) return;
    const d = Math.abs(t[3] - size) * 10 + (t[2] === wv ? 0 : 3);
    if (d < bd) { bd = d; best = t[0]; }
  });
  return best;
}
async function tokenize(root) {
  const nodes = [];
  walkLimited(root, function (n) { nodes.push(n); }, 20000);
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    const iconish = ['VECTOR', 'BOOLEAN_OPERATION', 'STAR', 'LINE', 'POLYGON'].indexOf(n.type) >= 0 && n.width <= 32 && n.height <= 32;
    try {
      if (Array.isArray(n.fills) && n.fills.length) {
        const pool = n.type === 'TEXT' ? SRC_TEXT : iconish ? SRC_ICON : SRC_BG;
        n.fills = n.fills.map(function (p) {
          if (p.type !== 'SOLID' || (p.boundVariables && p.boundVariables.color)) return p;
          const tok = nearest(rgb2hex(p.color), pool); S.stats.bindings++;
          return figma.variables.setBoundVariableForPaint(p, 'color', S.sem[tok]);
        });
      }
      if (Array.isArray(n.strokes) && n.strokes.length) {
        const pool = iconish ? SRC_ICON : SRC_BORDER;
        n.strokes = n.strokes.map(function (p) {
          if (p.type !== 'SOLID' || (p.boundVariables && p.boundVariables.color)) return p;
          const tok = nearest(rgb2hex(p.color), pool); S.stats.bindings++;
          return figma.variables.setBoundVariableForPaint(p, 'color', S.sem[tok]);
        });
      }
      if (n.type === 'TEXT' && typeof n.fontSize === 'number' && n.fontName && typeof n.fontName === 'object') {
        const st = nearestTextStyle(n.fontSize, n.fontName.style);
        if (st) {
          try { await figma.loadFontAsync(n.fontName); } catch (e) { /* missing font */ }
          await n.setTextStyleIdAsync(S.ts[st].id); S.stats.bindings++;
        }
      }
    } catch (e) { /* locked or read-only layer inside instance — skip */ }
  }
}
async function buildSourceImport() {
  const meta = DOCS.sourceImport;
  progress('Importing organisms from the linked file…');
  await newPage('🦠 Organisms / From Source File');
  const root = await docRoot(meta);
  await usageSection(root, meta);
  const src = S.source;
  const ib = await section(root, 'Imported organisms', src && src.found ? 'Source: “' + src.name + '” (' + src.id + ') on page “' + src.page + '”.' : 'Source node not available.');
  if (!src || !src.found) {
    const c = card('How to import');
    add(ib, c); fillW(c);
    await bullets(c, [
      'Open the plugin inside the Figma file that contains node ' + ((src && src.id) || '6349:84202') + '.',
      'Paste the node id (from the URL ?node-id=6349-84202 → 6349:84202) in the plugin’s “Source node” field.',
      'Tick “Rebuild” and run again — every top-level frame in that node becomes a token-bound organism component here.',
    ], 'chevron-right', 'icon/brand');
    return;
  }
  const node = src.node;
  let targets;
  const kids = 'children' in node ? node.children.filter(function (k) { return k.visible !== false && ['FRAME', 'GROUP', 'INSTANCE', 'COMPONENT', 'SECTION'].indexOf(k.type) >= 0; }) : [];
  if (node.type === 'SECTION' || node.type === 'PAGE' || (node.type === 'FRAME' && kids.length >= 2 && kids.length <= 40 && kids.every(function (k) { return k.width >= 160; }) && node.layoutMode === 'NONE')) targets = kids;
  else targets = [node];
  targets = targets.slice(0, 24);
  const imported = [];
  for (let i = 0; i < targets.length; i++) {
    const t = targets[i];
    progress('Importing “' + t.name + '” (' + (i + 1) + '/' + targets.length + ')…');
    let clone;
    try { clone = t.clone(); } catch (e) { warn('Could not clone “' + t.name + '”: ' + e.message); continue; }
    if (clone.type === 'INSTANCE') { try { clone = clone.detachInstance(); } catch (e) { /* keep */ } }
    let comp = clone;
    if (clone.type !== 'COMPONENT' && clone.type !== 'COMPONENT_SET') {
      try { comp = figma.createComponentFromNode(clone); } catch (e) { comp = clone; warn('“' + t.name + '” kept as a frame (contains nested component masters).'); }
    }
    comp.name = 'Source / ' + t.name;
    try { comp.description = 'Imported from ' + src.name + ' (' + t.id + '). Colours & text re-bound to ' + DS_NAME + ' tokens.'; } catch (e) { /* frames have no description */ }
    const wrap = frame(t.name, { dir: 'V', gap: 'space/300' });
    add(ib, wrap);
    add(wrap, await text(t.name, 'Heading/H4', 'text/primary'), await text(Math.round(t.width) + ' × ' + Math.round(t.height) + ' · source ' + t.id, 'Code/Small', 'text/tertiary'));
    add(wrap, comp);
    await tokenize(comp);
    imported.push(comp);
    S.stats.imported++;
    if (comp.type === 'COMPONENT') { S.sets['Source / ' + t.name] = comp; S.stats.components++; }
  }
  if (imported.length) {
    const tb = await section(root, 'Light & Dark', 'Imported organisms re-rendered with the Dark variable mode.');
    await themePreview(tb, async function (c) {
      imported.forEach(function (o) { add(c, o.type === 'COMPONENT' ? o.createInstance() : o.clone()); });
    }, { stack: true, contentDir: 'V', contentAlign: 'start' });
    const kb = await section(root, 'Design tokens', 'Tokens applied by the importer.');
    await tokenChips(kb, imported);
  }
  await dosSection(root, meta);
  await a11ySection(root, meta);
}

// ---------------------------------------------------------------- Templates
async function shell(name, mode, density, buildMain) {
  const t = frame(name, { dir: 'H', w: 1440, fill: 'bg/canvas', align: 'start', clip: true });
  const side = make('Sidebar', { Collapsed: 'False' }, 'Sidebar');
  add(t, side); fillH(side);
  const main = frame('Main', { dir: 'V' }); add(t, main); fillW(main);
  const nav = make('Top Navigation', null, 'Top Navigation'); add(main, nav); fillW(nav);
  const content = frame('Content', { dir: 'V', gap: 'space/600', p: 'space/800' }); add(main, content); fillW(content);
  await buildMain(content);
  setMode(t, mode);
  if (density) setMode(t, density);
  return t;
}
async function templatePage(title, pageName, buildMain) {
  progress('Building template ' + title + '…');
  await newPage(pageName);
  const meta = Object.assign({}, DOCS.templates, { title: title });
  const root = await docRoot(meta, 3200);
  await usageSection(root, meta);
  const b = await section(root, 'Light · Dark · Compact', 'Same frame, three variable-mode combinations. Organisms are instances — edit the library, not the template.');
  const row = frame('Variants', { dir: 'H', gap: 'space/1200', align: 'start', wrap: true });
  add(b, row); fillW(row);
  add(row, await shell(title + ' — Light', 'Light', null, buildMain));
  if (S.hasDark) add(row, await shell(title + ' — Dark', 'Dark', null, buildMain));
  if (S.hasCompact) add(row, await shell(title + ' — Light · Compact', 'Light', 'Compact', buildMain));
  await dosSection(root, meta);
}
async function buildTemplates() {
  await templatePage('Dashboard', '📐 Templates / Dashboard', async function (c) {
    const ph = make('Page Header', { Title: 'Dashboard', Description: 'Revenue, receivables and customer health at a glance.', 'Show tabs': false }, 'Page Header'); add(c, ph); fillW(ph);
    const k = make('KPI Overview', null, 'KPI Overview'); add(c, k); fillW(k);
    const t = make('Data Table', null, 'Data Table'); add(c, t); fillW(t);
  });
  await templatePage('Invoices', '📐 Templates / Invoices', async function (c) {
    const ph = make('Page Header', null, 'Page Header'); add(c, ph); fillW(ph);
    const a = make('Alert', { Layout: 'Inline', Tone: 'Warning', Title: '3 invoices are due this week', Description: 'Send reminders to avoid late payments.' }, 'Alert'); add(c, a); fillW(a);
    const fb = make('Filter Bar', null, 'Filter Bar'); add(c, fb); fillW(fb);
    const t = make('Data Table', { Title: 'All invoices' }, 'Data Table'); add(c, t); fillW(t);
  });
  await templatePage('Settings', '📐 Templates / Settings', async function (c) {
    const ph = make('Page Header', { Title: 'Settings', Description: 'Manage your company profile, billing defaults and notifications.' }, 'Page Header'); add(c, ph); fillW(ph);
    const fs = make('Settings Form Section', null, 'Company profile'); add(c, fs); fillW(fs);
    const fs2 = make('Settings Form Section', { Title: 'Billing defaults', Description: 'Applied to every new invoice. You can override them per invoice.' }, 'Billing defaults'); add(c, fs2); fillW(fs2);
  });
}
