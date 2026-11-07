// ============================================================================
//  MOLECULES — every molecule is composed of atom instances.
// ============================================================================

// ---------------------------------------------------------------- Menu
async function buildMenu() {
  await componentPage('menu', '🧬 Molecules / Menu', async function (vb) {
    await setLabel(vb, 'Menu Item');
    const ST = {
      Default: { fg: 'text/primary', ic: 'icon/default' }, Hover: { bg: 'bg/hover', fg: 'text/primary', ic: 'icon/default' },
      Selected: { bg: 'bg/selected', fg: 'text/brand', ic: 'icon/brand' }, Disabled: { fg: 'text/disabled', ic: 'icon/disabled' },
    };
    const item = await variants('Menu Item', { Type: ['Default', 'Destructive'], State: Object.keys(ST) }, async function (v) {
      const st = Object.assign({}, ST[v.State]);
      if (v.Type === 'Destructive' && v.State !== 'Disabled') { st.fg = 'text/danger'; st.ic = 'icon/danger'; if (v.State === 'Selected' || v.State === 'Hover') st.bg = 'bg/danger-subtle'; }
      const c = frame('', { component: true, dir: 'H', gap: 'space/200', px: 'space/300', align: 'center', radius: 'radius/sm', fill: st.bg, w: 232, h: 36 });
      const label = await text(v.Type === 'Destructive' ? 'Delete' : 'Menu item', 'Body/Medium/Regular', st.fg, 'Label');
      const sc = await text('⌘E', 'Code/Small', 'text/tertiary', 'Shortcut'); sc.visible = false;
      const chk = icon('check', 16, 'icon/brand', 'Check'); chk.visible = v.State === 'Selected' && v.Type === 'Default';
      add(c, icon(v.Type === 'Destructive' ? 'trash' : 'edit', 16, st.ic, 'Leading icon'), label, sc, chk); fillW(label);
      return c;
    }, { parent: vb, description: 'Single row inside a Dropdown Menu.' });
    addTextProp(item, 'Label', 'Label', 'Menu item');
    addBoolProp(item, 'Show icon', 'Leading icon', true);
    addSwapProp(item, 'Icon', 'Leading icon', 'edit');
    addBoolProp(item, 'Show shortcut', 'Shortcut', false);
    addTextProp(item, 'Shortcut', 'Shortcut', '⌘E');

    await setLabel(vb, 'Dropdown Menu');
    const menu = await variants('Dropdown Menu', { Type: ['Actions', 'Options'] }, async function (v) {
      const c = frame('', { component: true, dir: 'V', gap: 'space/50', p: 'space/100', w: 240, fill: 'bg/surface-raised', stroke: 'border/default', radius: 'radius/lg' });
      await effect(c, 'Elevation/4 LG');
      if (v.Type === 'Actions') {
        const g = await text('Invoice actions', 'Overline', 'text/tertiary', 'Group label');
        const gl = frame('Group', { dir: 'H', px: 'space/300', py: 'space/150' }); add(gl, g); add(c, gl); fillW(gl);
        const rows = [['Edit', 'edit', 'Default', '⌘E'], ['Duplicate', 'copy', 'Default', '⌘D'], ['Download PDF', 'download', 'Hover', null], ['Send reminder', 'mail', 'Default', null]];
        rows.forEach(function (r) {
          const i = make('Menu Item', { Label: r[0], Icon: r[1], State: r[2], 'Show shortcut': !!r[3] }, r[0]);
          if (r[3]) props(i, { Shortcut: r[3] });
          add(c, i); fillW(i);
        });
        const d = make('Divider', { Orientation: 'Horizontal' }); add(c, d); fillW(d);
        const del = make('Menu Item', { Label: 'Delete invoice', Icon: 'trash', Type: 'Destructive' }, 'Delete'); add(c, del); fillW(del);
      } else {
        [['All statuses', 'Default'], ['Paid', 'Selected'], ['Pending', 'Hover'], ['Overdue', 'Default'], ['Draft', 'Default']].forEach(function (r) {
          const i = make('Menu Item', { Label: r[0], State: r[1], 'Show icon': false }, r[0]);
          add(c, i); fillW(i);
        });
      }
      return c;
    }, { parent: vb, description: DOCS.menu.summary });
    return { sets: [item, menu], preview: async function (c) { add(c, make('Dropdown Menu', { Type: 'Actions' }), make('Dropdown Menu', { Type: 'Options' })); }, contentAlign: 'start' };
  });
}

// ---------------------------------------------------------------- Select
async function buildSelect() {
  await componentPage('select', '🧬 Molecules / Select', async function (vb) {
    const MAP = { Default: 'Default', Hover: 'Hover', Open: 'Focus', Error: 'Error', Disabled: 'Disabled' };
    const set = await variants('Select', { State: Object.keys(MAP) }, async function (v) {
      const c = frame('', { component: true, dir: 'V', gap: 'space/100', w: 320 });
      const trig = make('Input', { State: MAP[v.State], Filled: 'True', Size: 'Medium', 'Show trailing icon': true, 'Trailing icon': v.State === 'Open' ? 'chevron-up' : 'chevron-down', Value: 'All statuses' }, 'Trigger');
      add(c, trig); fillW(trig);
      if (v.State === 'Open') { const m = make('Dropdown Menu', { Type: 'Options' }, 'Menu'); add(c, m); fillW(m); }
      return c;
    }, { parent: vb, description: DOCS.select.summary });
    expose(set, 'Trigger');
    return { sets: [set], contentAlign: 'start' };
  });
}

// ---------------------------------------------------------------- Form Field
async function buildFormField() {
  await componentPage('formField', '🧬 Molecules / Form Field', async function (vb) {
    const set = await variants('Form Field', { Type: ['Input', 'Select', 'Textarea'], State: ['Default', 'Error', 'Disabled'] }, async function (v) {
      const dis = v.State === 'Disabled', err = v.State === 'Error';
      const c = frame('', { component: true, dir: 'V', gap: 'space/150', w: 320 });
      const lr = frame('Label row', { dir: 'H', gap: 'space/50' });
      add(lr, await text('Label', 'Label/Medium', dis ? 'text/disabled' : 'text/primary', 'Label'));
      const req = await text('*', 'Label/Medium', 'text/danger', 'Required'); req.visible = false; add(lr, req);
      add(c, lr);
      let ctl;
      if (v.Type === 'Input') ctl = make('Input', { State: v.State, Filled: 'False' }, 'Control');
      else if (v.Type === 'Select') ctl = make('Select', { State: v.State }, 'Control');
      else ctl = make('Textarea', { State: v.State }, 'Control');
      add(c, ctl); fillW(ctl);
      const hr = frame('Helper row', { dir: 'H', gap: 'space/150', align: 'center' });
      const hi = icon('alert-triangle', 16, 'icon/danger', 'Error icon'); hi.visible = err;
      add(hr, hi, await text(err ? 'Enter a valid value' : 'Helper text', 'Body/Small/Regular', err ? 'text/danger' : dis ? 'text/disabled' : 'text/tertiary', 'Helper'));
      add(c, hr); fillW(hr);
      return c;
    }, { parent: vb, description: DOCS.formField.summary });
    addTextProp(set, 'Label', 'Label', 'Label');
    addBoolProp(set, 'Required', 'Required', false);
    addTextProp(set, 'Helper', 'Helper', 'Helper text');
    addBoolProp(set, 'Show helper', 'Helper row', true);
    expose(set, 'Control');
    return { sets: [set], contentAlign: 'start' };
  });
}

// ---------------------------------------------------------------- Search Bar
async function buildSearch() {
  await componentPage('search', '🧬 Molecules / Search Bar', async function (vb) {
    const ST = { Default: 'border/default', Hover: 'border/hover', Focus: 'border/focus' };
    const set = await variants('Search Bar', { Size: ['Small', 'Medium'], State: Object.keys(ST) }, async function (v) {
      const small = v.Size === 'Small';
      const c = frame('', { component: true, dir: 'H', gap: 'space/200', px: 'space/300', align: 'center', radius: 'radius/md', fill: 'bg/surface', stroke: ST[v.State], w: 320, h: small ? 'size/control-sm' : 'size/control-md' });
      const q = await text('Search…', small ? 'Body/Small/Regular' : 'Body/Medium/Regular', 'text/tertiary', 'Placeholder');
      const kbd = frame('Shortcut', { dir: 'H', px: 'space/150', py: 'space/50', radius: 'radius/xs', fill: 'bg/surface-sunken', stroke: 'border/default' });
      add(kbd, await text('⌘K', 'Code/Small', 'text/tertiary', 'Keys'));
      add(c, icon('search', 16, 'icon/secondary', 'Search icon'), q, kbd); fillW(q);
      if (v.State === 'Focus') await effect(c, 'Focus/Ring');
      return c;
    }, { parent: vb, description: DOCS.search.summary });
    addTextProp(set, 'Placeholder', 'Placeholder', 'Search…');
    addBoolProp(set, 'Show shortcut', 'Shortcut', true);
    return { sets: [set] };
  });
}

// ---------------------------------------------------------------- Tabs
async function buildTabs() {
  await componentPage('tabs', '🧬 Molecules / Tabs', async function (vb) {
    await setLabel(vb, 'Tab');
    const FG = { Default: 'text/secondary', Hover: 'text/primary', Active: 'text/brand', Disabled: 'text/disabled' };
    const IC = { Default: 'icon/default', Hover: 'icon/default', Active: 'icon/brand', Disabled: 'icon/disabled' };
    const tab = await variants('Tab', { State: Object.keys(FG) }, async function (v) {
      const c = frame('', { component: true, dir: 'V' });
      const row = frame('Content', { dir: 'H', gap: 'space/200', px: 'space/100', py: 'space/300', align: 'center' });
      const ic = icon('file', 16, IC[v.State], 'Icon'); ic.visible = false;
      const b = make('Badge', { Tone: v.State === 'Active' ? 'Brand' : 'Neutral', Style: 'Subtle', Size: 'Small', Label: '24' }, 'Count'); b.visible = false;
      add(row, ic, await text('Tab', 'Label/Medium', FG[v.State], 'Label'), b);
      add(c, row);
      const ind = frame('Indicator', { dir: 'H', h: 2, fill: v.State === 'Active' ? 'bg/brand' : v.State === 'Hover' ? 'border/strong' : null });
      add(c, ind); fillW(ind);
      return c;
    }, { parent: vb, description: 'Single tab. Use inside a Tab Group.' });
    addTextProp(tab, 'Label', 'Label', 'Tab');
    addBoolProp(tab, 'Show icon', 'Icon', false);
    addSwapProp(tab, 'Icon', 'Icon', 'file');
    addBoolProp(tab, 'Show count', 'Count', false);
    expose(tab, 'Count');

    await setLabel(vb, 'Tab Group');
    const g = frame('', { component: true, dir: 'H', gap: 'space/600', w: 640 });
    setSideStroke(g, 'border/default', 'bottom');
    [['Overview', 'Active', false], ['Invoices', 'Default', true], ['Payments', 'Default', false], ['Activity', 'Default', false], ['Settings', 'Disabled', false]].forEach(function (t) {
      add(g, make('Tab', { Label: t[0], State: t[1], 'Show count': t[2] }, t[0]));
    });
    single('Tab Group', g, vb, DOCS.tabs.summary);
    return { sets: [tab, g], contentAlign: 'start' };
  });
}

// ---------------------------------------------------------------- Breadcrumb
async function buildBreadcrumb() {
  await componentPage('breadcrumb', '🧬 Molecules / Breadcrumb', async function (vb) {
    await setLabel(vb, 'Breadcrumb Item');
    const item = await variants('Breadcrumb Item', { Current: ['False', 'True'] }, async function (v) {
      const c = frame('', { component: true, dir: 'H', align: 'center' });
      add(c, await text('Billing', v.Current === 'True' ? 'Body/Medium/Semibold' : 'Label/Medium', v.Current === 'True' ? 'text/primary' : 'text/secondary', 'Label'));
      return c;
    }, { parent: vb });
    addTextProp(item, 'Label', 'Label', 'Billing');
    await setLabel(vb, 'Breadcrumb');
    const b = frame('', { component: true, dir: 'H', gap: 'space/200', align: 'center' });
    add(b, icon('home', 16, 'icon/secondary', 'Home'));
    [['Billing', 'False'], ['Invoices', 'False'], ['INV-2026-0142', 'True']].forEach(function (r) {
      add(b, icon('chevron-right', 16, 'icon/secondary', 'Separator'), make('Breadcrumb Item', { Label: r[0], Current: r[1] }, r[0]));
    });
    single('Breadcrumb', b, vb, DOCS.breadcrumb.summary);
    return { sets: [item, b], contentAlign: 'start' };
  });
}

// ---------------------------------------------------------------- Pagination
async function buildPagination() {
  await componentPage('pagination', '🧬 Molecules / Pagination', async function (vb) {
    await setLabel(vb, 'Page Button');
    const pb = await variants('Page Button', { State: ['Default', 'Hover', 'Active'] }, async function (v) {
      const c = frame('', { component: true, dir: 'H', w: 'size/control-sm', h: 'size/control-sm', radius: 'radius/md', justify: 'center', align: 'center', fill: v.State === 'Active' ? 'bg/brand-subtle' : v.State === 'Hover' ? 'bg/hover' : null });
      add(c, await text('1', 'Label/Small', v.State === 'Active' ? 'text/brand' : 'text/secondary', 'Label'));
      return c;
    }, { parent: vb });
    addTextProp(pb, 'Label', 'Label', '1');
    await setLabel(vb, 'Pagination');
    const p = frame('', { component: true, dir: 'H', justify: 'between', align: 'center', w: 960 });
    add(p, await text('Showing 1–10 of 248 results', 'Body/Small/Regular', 'text/secondary', 'Summary'));
    const r = frame('Controls', { dir: 'H', gap: 'space/100', align: 'center' });
    add(r, make('Icon Button', { Hierarchy: 'Secondary', Size: 'Small', State: 'Disabled', Icon: 'chevron-left' }, 'Previous'));
    [['1', 'Active'], ['2', 'Default'], ['3', 'Default']].forEach(function (x) { add(r, make('Page Button', { Label: x[0], State: x[1] }, 'Page ' + x[0])); });
    add(r, await text('…', 'Label/Small', 'text/tertiary', 'Ellipsis'));
    add(r, make('Page Button', { Label: '25' }, 'Page 25'));
    add(r, make('Icon Button', { Hierarchy: 'Secondary', Size: 'Small', Icon: 'chevron-right' }, 'Next'));
    add(p, r);
    single('Pagination', p, vb, DOCS.pagination.summary);
    addTextProp(p, 'Summary', 'Summary', 'Showing 1–10 of 248 results');
    return { sets: [pb, p], stack: true };
  });
}

// ---------------------------------------------------------------- Alert
async function buildAlert() {
  await componentPage('alert', '🧬 Molecules / Alert', async function (vb) {
    const tones = ['Info', 'Success', 'Warning', 'Danger'];
    const COPY = {
      Info: ['Your plan renews on Dec 1, 2026', 'You will be charged $1,200 for 25 seats.'],
      Success: ['Payment received', 'Acme Inc. paid INV-2026-0142 ($12,480.00).'],
      Warning: ['3 invoices are due this week', 'Send reminders to avoid late payments.'],
      Danger: ['Payment failed', 'The card ending in 4242 was declined.'],
    };
    const set = await variants('Alert', { Layout: ['Inline', 'Banner'], Tone: tones }, async function (v) {
      const t = TONES[v.Tone], banner = v.Layout === 'Banner';
      const c = frame('', { component: true, dir: 'H', gap: 'space/300', p: banner ? null : 'space/400', px: banner ? 'space/600' : null, py: banner ? 'space/300' : null, align: banner ? 'center' : 'start', fill: t.sub, radius: banner ? 'radius/none' : 'radius/lg', w: banner ? 1144 : 560 });
      if (banner) setSideStroke(c, t.bd, 'bottom'); else setStroke(c, t.bd);
      add(c, icon(t.icon, 20, t.ic, 'Status icon'));
      const body = frame('Content', { dir: banner ? 'H' : 'V', gap: banner ? 'space/200' : 'space/100', align: banner ? 'center' : 'start' });
      add(c, body); fillW(body);
      add(body, await text(COPY[v.Tone][0], 'Body/Medium/Semibold', 'text/primary', 'Title'));
      const d = await text(COPY[v.Tone][1], 'Body/Medium/Regular', 'text/secondary', 'Description'); add(body, d); if (!banner) fillW(d);
      const actions = frame('Actions', { dir: 'H', gap: 'space/200', pt: banner ? null : 'space/200' });
      add(actions, make('Button', { Hierarchy: 'Secondary', Size: 'Small', Label: 'Review' }), make('Button', { Hierarchy: 'Tertiary', Size: 'Small', Label: 'Learn more' }));
      if (banner) add(c, actions); else add(body, actions);
      add(c, make('Icon Button', { Hierarchy: 'Tertiary', Size: 'Small', Icon: 'x' }, 'Dismiss'));
      return c;
    }, { parent: vb, cols: 1, description: DOCS.alert.summary });
    addTextProp(set, 'Title', 'Title', 'Alert title');
    addTextProp(set, 'Description', 'Description', 'Supporting description for this alert.');
    addBoolProp(set, 'Show actions', 'Actions', true);
    addBoolProp(set, 'Dismissible', 'Dismiss', true);
    return { sets: [set], preview: async function (c) {
      tones.forEach(function (t) { add(c, make('Alert', { Layout: 'Inline', Tone: t, Title: ({ Info: 'Your plan renews on Dec 1', Success: 'Payment received', Warning: '3 invoices due this week', Danger: 'Payment failed' })[t] })); });
    }, contentAlign: 'start' };
  });
}

// ---------------------------------------------------------------- Toast
async function buildToast() {
  await componentPage('toast', '🧬 Molecules / Toast', async function (vb) {
    const set = await variants('Toast', { Tone: ['Success', 'Info', 'Warning', 'Danger'] }, async function (v) {
      const t = TONES[v.Tone];
      const c = frame('', { component: true, dir: 'H', gap: 'space/300', p: 'space/400', w: 380, radius: 'radius/lg', fill: 'bg/surface-raised', stroke: 'border/default', align: 'start' });
      await effect(c, 'Elevation/4 LG');
      add(c, icon(t.icon, 20, t.ic, 'Status icon'));
      const body = frame('Content', { dir: 'V', gap: 'space/100' });
      add(c, body); fillW(body);
      add(body, await text({ Success: 'Invoice sent', Info: 'Export started', Warning: 'Sync delayed', Danger: 'Could not send invoice' }[v.Tone], 'Label/Medium', 'text/primary', 'Title'));
      const d = await text({ Success: 'INV-2026-0142 was emailed to billing@acme.com.', Info: 'We’ll email you when the CSV is ready.', Warning: 'Bank feed will retry in 5 minutes.', Danger: 'The customer email address is invalid.' }[v.Tone], 'Body/Small/Regular', 'text/secondary', 'Description');
      add(body, d); fillW(d);
      const a = make('Link', { Size: 'Small', Label: v.Tone === 'Success' ? 'Undo' : 'View details' }, 'Action');
      add(body, a);
      add(c, make('Icon Button', { Hierarchy: 'Tertiary', Size: 'Small', Icon: 'x' }, 'Dismiss'));
      return c;
    }, { parent: vb, cols: 2, description: DOCS.toast.summary });
    addTextProp(set, 'Title', 'Title', 'Invoice sent');
    addTextProp(set, 'Description', 'Description', 'INV-2026-0142 was emailed to billing@acme.com.');
    addBoolProp(set, 'Show action', 'Action', true);
    return { sets: [set], contentAlign: 'start' };
  });
}

// ---------------------------------------------------------------- Stat Card
async function buildStatCard() {
  await componentPage('statCard', '🧬 Molecules / Stat Card', async function (vb) {
    const set = await variants('Stat Card', { Trend: ['Up', 'Down', 'Neutral'] }, async function (v) {
      const c = frame('', { component: true, dir: 'V', gap: 'space/300', p: 'space/500', w: 280, fill: 'bg/surface', stroke: 'border/default', radius: 'radius/lg' });
      await effect(c, 'Elevation/1 XS');
      const head = frame('Header', { dir: 'H', justify: 'between', align: 'center' }); add(c, head); fillW(head);
      add(head, await text('Total revenue', 'Body/Medium/Medium', 'text/secondary', 'Label'), icon('info', 16, 'icon/secondary', 'Info'));
      add(c, await text('$482,940', 'Heading/H2', 'text/primary', 'Value'));
      const foot = frame('Footer', { dir: 'H', justify: 'between', align: 'end' }); add(c, foot); fillW(foot);
      const left = frame('Trend', { dir: 'H', gap: 'space/200', align: 'center' });
      add(left, make('Badge', { Tone: v.Trend === 'Up' ? 'Success' : v.Trend === 'Down' ? 'Danger' : 'Neutral', Size: 'Small', Label: v.Trend === 'Up' ? '↑ 12.4%' : v.Trend === 'Down' ? '↓ 3.2%' : '0.0%' }, 'Delta'));
      add(left, await text('vs last month', 'Body/Small/Regular', 'text/tertiary', 'Comparison'));
      add(foot, left);
      const spark = frame('Sparkline', { dir: 'H', gap: 3, align: 'end', h: 32 });
      const hs = v.Trend === 'Up' ? [10, 14, 12, 18, 16, 22, 20, 26, 28, 32] : v.Trend === 'Down' ? [30, 28, 26, 27, 22, 20, 18, 16, 14, 12] : [18, 20, 17, 19, 18, 20, 19, 18, 20, 19];
      hs.forEach(function (h) { const b = frame('Bar', { dir: 'none', w: 5, h: h, radius: 'radius/xs', fill: v.Trend === 'Down' ? 'chart/5' : 'chart/1' }); add(spark, b); });
      add(foot, spark);
      return c;
    }, { parent: vb, description: DOCS.statCard.summary });
    addTextProp(set, 'Label', 'Label', 'Total revenue');
    addTextProp(set, 'Value', 'Value', '$482,940');
    addTextProp(set, 'Comparison', 'Comparison', 'vs last month');
    addBoolProp(set, 'Show sparkline', 'Sparkline', true);
    expose(set, 'Delta');
    return { sets: [set] };
  });
}

// ---------------------------------------------------------------- Nav Item
async function buildNavItem() {
  await componentPage('navItem', '🧬 Molecules / Nav Item', async function (vb) {
    const ST = {
      Default: { fg: 'text/secondary', ic: 'icon/default' }, Hover: { bg: 'bg/hover', fg: 'text/primary', ic: 'icon/default' },
      Active: { bg: 'bg/selected', fg: 'text/brand', ic: 'icon/brand' }, Disabled: { fg: 'text/disabled', ic: 'icon/disabled' },
    };
    const set = await variants('Nav Item', { Collapsed: ['False', 'True'], State: Object.keys(ST) }, async function (v) {
      const st = ST[v.State];
      if (v.Collapsed === 'True') {
        const c = frame('', { component: true, dir: 'H', w: 'size/control-md', h: 'size/control-md', radius: 'radius/md', fill: st.bg, justify: 'center', align: 'center' });
        add(c, icon('grid', 20, st.ic, 'Icon'));
        return c;
      }
      const c = frame('', { component: true, dir: 'H', gap: 'space/300', px: 'space/300', align: 'center', radius: 'radius/md', fill: st.bg, w: 216, h: 'size/control-md' });
      const l = await text('Dashboard', v.State === 'Active' ? 'Body/Medium/Semibold' : 'Label/Medium', st.fg, 'Label');
      const b = make('Badge', { Tone: v.State === 'Active' ? 'Brand' : 'Neutral', Size: 'Small', Label: '12' }, 'Count'); b.visible = false;
      add(c, icon('grid', 20, st.ic, 'Icon'), l, b); fillW(l);
      return c;
    }, { parent: vb, description: DOCS.navItem.summary });
    addTextProp(set, 'Label', 'Label', 'Dashboard');
    addSwapProp(set, 'Icon', 'Icon', 'grid');
    addBoolProp(set, 'Show count', 'Count', false);
    expose(set, 'Count');
    return { sets: [set] };
  });
}

// ---------------------------------------------------------------- Table Cell & Row
const TABLE_COLS = [
  ['Select', 'Checkbox', 48], ['Invoice', 'Two-line', 200], ['Customer', 'Avatar', null],
  ['Status', 'Badge', 140], ['Amount', 'Number', 160], ['Issued', 'Text', 150], ['Actions', 'Actions', 64],
];
async function buildTable() {
  await componentPage('table', '🧬 Molecules / Table', async function (vb) {
    await setLabel(vb, 'Table Cell');
    const W = { Header: 200, Text: 200, 'Two-line': 240, Avatar: 280, Badge: 160, Checkbox: 48, Number: 160, Actions: 64 };
    const cell = await variants('Table Cell', { Type: Object.keys(W) }, async function (v) {
      const header = v.Type === 'Header';
      const c = frame('', { component: true, dir: 'H', gap: 'space/300', px: v.Type === 'Checkbox' ? 'space/400' : 'space/400', align: 'center', w: W[v.Type], h: header ? 'size/table-header' : 'size/table-row', justify: v.Type === 'Number' ? 'end' : v.Type === 'Actions' ? 'center' : 'start' });
      setSideStroke(c, 'border/subtle', 'bottom');
      if (header) {
        add(c, await text('Column', 'Body/Small/Medium', 'text/secondary', 'Text'), icon('sort', 16, 'icon/secondary', 'Sort'));
      } else if (v.Type === 'Text') {
        add(c, await text('Oct 12, 2026', 'Body/Medium/Regular', 'text/secondary', 'Text'));
      } else if (v.Type === 'Two-line') {
        const s = frame('Stack', { dir: 'V' });
        add(s, await text('INV-2026-0142', 'Body/Medium/Medium', 'text/primary', 'Text'), await text('Net 30', 'Body/Small/Regular', 'text/tertiary', 'Subtext'));
        add(c, s);
      } else if (v.Type === 'Avatar') {
        const s = frame('Stack', { dir: 'V' });
        add(s, await text('Acme Inc.', 'Body/Medium/Medium', 'text/primary', 'Text'), await text('billing@acme.com', 'Body/Small/Regular', 'text/tertiary', 'Subtext'));
        add(c, make('Avatar', { Size: 'SM', Initials: 'AI' }, 'Avatar'), s);
      } else if (v.Type === 'Badge') {
        add(c, make('Badge', { Tone: 'Success', Size: 'Small', Label: 'Paid', 'Show dot': true }, 'Badge'));
      } else if (v.Type === 'Checkbox') {
        add(c, make('Checkbox', { 'Show label': false }, 'Checkbox'));
      } else if (v.Type === 'Number') {
        add(c, await text('$12,480.00', 'Body/Medium/Medium', 'text/primary', 'Text', { align: 'RIGHT' }));
      } else {
        add(c, make('Icon Button', { Hierarchy: 'Tertiary', Size: 'Small', Icon: 'more-horizontal' }, 'Row actions'));
      }
      return c;
    }, { parent: vb, cols: 4, description: 'Building block for Data Table rows. Cells are transparent so the row controls hover/selected backgrounds.' });
    addTextProp(cell, 'Text', 'Text', 'Cell');
    addTextProp(cell, 'Subtext', 'Subtext', 'Secondary');
    addBoolProp(cell, 'Sortable', 'Sort', true);
    ['Avatar', 'Badge', 'Checkbox', 'Row actions'].forEach(function (n) { expose(cell, n); });

    const mkRow = async function (header, state) {
      const r = frame('', { component: true, dir: 'H', w: 1144, fill: header ? 'bg/surface-sunken' : state === 'Hover' ? 'bg/hover' : state === 'Selected' ? 'bg/selected' : 'bg/surface' });
      TABLE_COLS.forEach(function (col) {
        const type = header ? (col[1] === 'Checkbox' ? 'Checkbox' : col[1] === 'Actions' ? 'Header' : 'Header') : col[1];
        const i = make('Table Cell', { Type: type }, col[0]);
        add(r, i);
        if (header && col[1] !== 'Checkbox') props(i, { Text: col[1] === 'Actions' ? ' ' : col[0], Sortable: col[1] !== 'Actions' });
        if (header && col[1] === 'Checkbox') { setH(i, 'size/table-header'); props(child(i, 'Checkbox'), { Checked: 'Indeterminate' }); }
        if (!header && col[1] === 'Checkbox' && state === 'Selected') props(child(i, 'Checkbox'), { Checked: 'True' });
        if (col[2]) setW(i, col[2]); else fillW(i);
        if (col[1] === 'Number' && header) { try { i.primaryAxisAlignItems = 'MAX'; } catch (e) { /* instance layout locked */ } }
      });
      return r;
    };
    await setLabel(vb, 'Table Row');
    const row = await variants('Table Row', { State: ['Default', 'Hover', 'Selected'] }, async function (v) { return mkRow(false, v.State); }, { parent: vb, cols: 1, description: 'Data row composed of Table Cells. Override cell content per row.' });
    await setLabel(vb, 'Table Header Row');
    const hrow = single('Table Header Row', await mkRow(true), vb, 'Header row composed of Header cells and a select-all Checkbox.');
    return { sets: [cell, row, hrow], stack: true };
  });
}

// ---------------------------------------------------------------- Card
async function buildCard() {
  await componentPage('card', '🧬 Molecules / Card', async function (vb) {
    const set = await variants('Card', { Elevation: ['Flat', 'Raised'] }, async function (v) {
      const c = frame('', { component: true, dir: 'V', w: 360, fill: 'bg/surface', stroke: v.Elevation === 'Flat' ? 'border/default' : 'border/subtle', radius: 'radius/lg', clip: true });
      if (v.Elevation === 'Raised') await effect(c, 'Elevation/2 SM');
      const h = frame('Header', { dir: 'H', gap: 'space/300', p: 'space/500', pb: 'space/300', align: 'start' }); add(c, h); fillW(h);
      const tt = frame('Titles', { dir: 'V', gap: 'space/50' }); add(h, tt); fillW(tt);
      add(tt, await text('Revenue by plan', 'Heading/H5', 'text/primary', 'Title'), await text('Last 30 days', 'Body/Small/Regular', 'text/tertiary', 'Subtitle'));
      add(h, make('Icon Button', { Hierarchy: 'Tertiary', Size: 'Small', Icon: 'more-horizontal' }, 'Overflow'));
      const body = frame('Body', { dir: 'V', px: 'space/500', pb: 'space/500' }); add(c, body); fillW(body);
      const slot = frame('Content slot', { dir: 'V', h: 120, radius: 'radius/md', fill: 'bg/surface-sunken', stroke: 'border/default', justify: 'center', align: 'center' });
      slot.dashPattern = [4, 4];
      add(slot, await text('Swap with chart, list or form', 'Caption', 'text/tertiary', 'Slot label'));
      add(body, slot); fillW(slot);
      const f = frame('Footer', { dir: 'H', gap: 'space/200', px: 'space/500', py: 'space/400', justify: 'end' }); add(c, f); fillW(f);
      setSideStroke(f, 'border/subtle', 'top');
      add(f, make('Button', { Hierarchy: 'Secondary', Size: 'Small', Label: 'View report' }), make('Button', { Hierarchy: 'Primary', Size: 'Small', Label: 'Export' }));
      return c;
    }, { parent: vb, description: DOCS.card.summary });
    addTextProp(set, 'Title', 'Title', 'Revenue by plan');
    addTextProp(set, 'Subtitle', 'Subtitle', 'Last 30 days');
    addBoolProp(set, 'Show footer', 'Footer', true);
    return { sets: [set], contentAlign: 'start' };
  });
}

// ---------------------------------------------------------------- Empty State
async function buildEmptyState() {
  await componentPage('emptyState', '🧬 Molecules / Empty State', async function (vb) {
    const c = frame('', { component: true, dir: 'V', gap: 'space/500', p: 'space/1200', w: 520, align: 'center', fill: 'bg/surface', radius: 'radius/lg', stroke: 'border/default' });
    const ic = frame('Icon wrap', { dir: 'H', w: 56, h: 56, radius: 'radius/full', fill: 'bg/brand-subtle', justify: 'center', align: 'center' });
    add(ic, icon('file', 24, 'icon/brand', 'Icon'));
    const tx = frame('Text', { dir: 'V', gap: 'space/150', align: 'center' });
    add(tx, await text('No invoices yet', 'Heading/H4', 'text/primary', 'Title', { align: 'CENTER' }), await text('Create your first invoice or import existing ones from a CSV file.', 'Body/Medium/Regular', 'text/secondary', 'Description', { align: 'CENTER', w: 360 }));
    const act = frame('Actions', { dir: 'H', gap: 'space/300' });
    add(act, make('Button', { Hierarchy: 'Secondary', Label: 'Import CSV', 'Show leading icon': true, 'Leading icon': 'upload' }), make('Button', { Hierarchy: 'Primary', Label: 'Create invoice', 'Show leading icon': true, 'Leading icon': 'plus' }));
    add(c, ic, tx, act);
    single('Empty State', c, vb, DOCS.emptyState.summary);
    addTextProp(c, 'Title', 'Title', 'No invoices yet');
    addTextProp(c, 'Description', 'Description', 'Create your first invoice or import existing ones from a CSV file.');
    addBoolProp(c, 'Show actions', 'Actions', true);
    addSwapProp(c, 'Icon', 'Icon', 'file');
    return { sets: [c] };
  });
}
