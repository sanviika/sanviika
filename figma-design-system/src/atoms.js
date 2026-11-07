// ============================================================================
//  ATOMS — smallest controls, bound exclusively to semantic tokens.
// ============================================================================

const STATES4 = ['Default', 'Hover', 'Focus', 'Disabled'];
const SIZES3 = ['Small', 'Medium', 'Large'];
const BTN_STYLE = {
  Primary: { Default: { bg: 'bg/brand', fg: 'text/on-brand', ic: 'icon/on-brand' }, Hover: { bg: 'bg/brand-hover' }, Focus: { ring: 'Focus/Ring' }, Disabled: { bg: 'bg/disabled', fg: 'text/disabled', ic: 'icon/disabled' } },
  Secondary: { Default: { bg: 'bg/surface', bd: 'border/strong', fg: 'text/primary', ic: 'icon/default' }, Hover: { bg: 'bg/hover', bd: 'border/hover' }, Focus: { bd: 'border/focus', ring: 'Focus/Ring' }, Disabled: { bg: 'bg/disabled', bd: 'border/disabled', fg: 'text/disabled', ic: 'icon/disabled' } },
  Tertiary: { Default: { bg: null, fg: 'text/brand', ic: 'icon/brand' }, Hover: { bg: 'bg/brand-subtle' }, Focus: { ring: 'Focus/Ring' }, Disabled: { fg: 'text/disabled', ic: 'icon/disabled' } },
  Destructive: { Default: { bg: 'bg/danger', fg: 'text/on-brand', ic: 'icon/on-brand' }, Hover: { bg: 'bg/danger-hover' }, Focus: { ring: 'Focus/Ring Danger' }, Disabled: { bg: 'bg/disabled', fg: 'text/disabled', ic: 'icon/disabled' } },
};
function btnStyle(h, s) { return Object.assign({}, BTN_STYLE[h].Default, BTN_STYLE[h][s]); }
const BTN_SIZE = {
  Small: { h: 'size/control-sm', px: 'space/300', gap: 'space/150', text: 'Label/Small', icon: 16 },
  Medium: { h: 'size/control-md', px: 'space/400', gap: 'space/200', text: 'Label/Medium', icon: 20 },
  Large: { h: 'size/control-lg', px: 'space/500', gap: 'space/200', text: 'Label/Large', icon: 20 },
};
const TONES = {
  Neutral: { sub: 'bg/neutral-subtle', fg: 'text/secondary', solid: 'bg/neutral', sfg: 'text/on-brand', ic: 'icon/secondary', bd: 'border/default', icon: 'info' },
  Brand: { sub: 'bg/brand-subtle', fg: 'text/brand', solid: 'bg/brand', sfg: 'text/on-brand', ic: 'icon/brand', bd: 'border/brand', icon: 'info' },
  Success: { sub: 'bg/success-subtle', fg: 'text/success', solid: 'bg/success', sfg: 'text/on-brand', ic: 'icon/success', bd: 'border/success', icon: 'check-circle' },
  Warning: { sub: 'bg/warning-subtle', fg: 'text/warning', solid: 'bg/warning', sfg: 'text/on-warning', ic: 'icon/warning', bd: 'border/warning', icon: 'alert-triangle' },
  Danger: { sub: 'bg/danger-subtle', fg: 'text/danger', solid: 'bg/danger', sfg: 'text/on-brand', ic: 'icon/danger', bd: 'border/danger', icon: 'x-circle' },
  Info: { sub: 'bg/info-subtle', fg: 'text/info', solid: 'bg/info', sfg: 'text/on-brand', ic: 'icon/info', bd: 'border/info', icon: 'info' },
};

// ---------------------------------------------------------------- Button
async function buildButton() {
  await componentPage('button', '⚛️ Atoms / Button', async function (vb) {
    const set = await variants('Button', { Hierarchy: Object.keys(BTN_STYLE), Size: SIZES3, State: STATES4 }, async function (v) {
      const st = btnStyle(v.Hierarchy, v.State), sz = BTN_SIZE[v.Size];
      const c = frame('', { component: true, dir: 'H', gap: sz.gap, px: sz.px, align: 'center', justify: 'center', radius: 'radius/md', fill: st.bg, stroke: st.bd, h: sz.h });
      const li = icon('plus', sz.icon, st.ic, 'Leading icon'); li.visible = false;
      const ti = icon('chevron-down', sz.icon, st.ic, 'Trailing icon'); ti.visible = false;
      add(c, li, await text('Button', sz.text, st.fg, 'Label'), ti);
      if (st.ring) await effect(c, st.ring);
      return c;
    }, { parent: vb, description: DOCS.button.summary });
    addTextProp(set, 'Label', 'Label', 'Button');
    addBoolProp(set, 'Show leading icon', 'Leading icon', false);
    addSwapProp(set, 'Leading icon', 'Leading icon', 'plus');
    addBoolProp(set, 'Show trailing icon', 'Trailing icon', false);
    addSwapProp(set, 'Trailing icon', 'Trailing icon', 'chevron-down');
    return { sets: [set], preview: async function (c) {
      ['Primary', 'Secondary', 'Tertiary', 'Destructive'].forEach(function (h) {
        STATES4.forEach(function (s) { add(c, make('Button', { Hierarchy: h, State: s, Size: 'Medium', 'Show leading icon': h === 'Primary' })); });
      });
    } };
  });
}

// ---------------------------------------------------------------- Icon Button
async function buildIconButton() {
  await componentPage('iconButton', '⚛️ Atoms / Icon Button', async function (vb) {
    const set = await variants('Icon Button', { Hierarchy: Object.keys(BTN_STYLE), Size: SIZES3, State: STATES4 }, async function (v) {
      const st = btnStyle(v.Hierarchy, v.State), sz = BTN_SIZE[v.Size];
      const c = frame('', { component: true, dir: 'H', align: 'center', justify: 'center', radius: 'radius/md', fill: st.bg, stroke: st.bd, w: sz.h, h: sz.h });
      add(c, icon('more-horizontal', sz.icon, st.ic, 'Icon'));
      if (st.ring) await effect(c, st.ring);
      return c;
    }, { parent: vb, description: DOCS.iconButton.summary });
    addSwapProp(set, 'Icon', 'Icon', 'more-horizontal');
    return { sets: [set] };
  });
}

// ---------------------------------------------------------------- Input
const INPUT_STATE = {
  Default: { bd: 'border/strong' }, Hover: { bd: 'border/hover' }, Focus: { bd: 'border/focus', ring: 'Focus/Ring' },
  Error: { bd: 'border/danger', ring: null }, Disabled: { bd: 'border/disabled', bg: 'bg/disabled', fg: 'text/disabled', ic: 'icon/disabled' },
};
async function buildInput() {
  await componentPage('input', '⚛️ Atoms / Input', async function (vb) {
    const set = await variants('Input', { Size: ['Small', 'Medium'], Filled: ['False', 'True'], State: Object.keys(INPUT_STATE) }, async function (v) {
      const st = INPUT_STATE[v.State];
      const small = v.Size === 'Small';
      const c = frame('', { component: true, dir: 'H', gap: 'space/200', px: 'space/300', align: 'center', radius: 'radius/md', fill: st.bg || 'bg/surface', stroke: st.bd, w: 320, h: small ? 'size/control-sm' : 'size/control-md' });
      const li = icon('search', small ? 16 : 20, st.ic || 'icon/secondary', 'Leading icon'); li.visible = false;
      const val = await text(v.Filled === 'True' ? 'Acme Inc.' : 'Placeholder', small ? 'Body/Small/Regular' : 'Body/Medium/Regular', st.fg || (v.Filled === 'True' ? 'text/primary' : 'text/tertiary'), 'Value');
      const ti = icon('info', small ? 16 : 20, v.State === 'Error' ? 'icon/danger' : st.ic || 'icon/secondary', 'Trailing icon'); ti.visible = false;
      add(c, li, val, ti); fillW(val);
      if (st.ring) await effect(c, st.ring);
      return c;
    }, { parent: vb, cols: 5, description: DOCS.input.summary });
    addTextProp(set, 'Value', 'Value', 'Placeholder');
    addBoolProp(set, 'Show leading icon', 'Leading icon', false);
    addSwapProp(set, 'Leading icon', 'Leading icon', 'search');
    addBoolProp(set, 'Show trailing icon', 'Trailing icon', false);
    addSwapProp(set, 'Trailing icon', 'Trailing icon', 'info');
    return { sets: [set], limit: 10 };
  });
}

// ---------------------------------------------------------------- Textarea
async function buildTextarea() {
  await componentPage('textarea', '⚛️ Atoms / Textarea', async function (vb) {
    const set = await variants('Textarea', { State: Object.keys(INPUT_STATE) }, async function (v) {
      const st = INPUT_STATE[v.State];
      const c = frame('', { component: true, dir: 'V', gap: 'space/200', p: 'space/300', radius: 'radius/md', fill: st.bg || 'bg/surface', stroke: st.bd, w: 320, h: 120 });
      const val = await text('Add a note for the customer…', 'Body/Medium/Regular', st.fg || 'text/tertiary', 'Value');
      add(c, val); fillW(val); fillH(val);
      const cnt = await text('0 / 280', 'Caption', st.fg || 'text/tertiary', 'Counter', { align: 'RIGHT' });
      add(c, cnt); fillW(cnt);
      if (st.ring) await effect(c, st.ring);
      return c;
    }, { parent: vb, description: DOCS.textarea.summary });
    addTextProp(set, 'Value', 'Value', 'Add a note for the customer…');
    addBoolProp(set, 'Show counter', 'Counter', true);
    return { sets: [set] };
  });
}

// ---------------------------------------------------------------- Checkbox & Radio
function selStyle(on, state) {
  if (state === 'Disabled') return { bg: on ? 'bg/disabled' : 'bg/disabled', bd: 'border/disabled', ic: 'icon/disabled', fg: 'text/disabled' };
  if (on) return { bg: state === 'Hover' ? 'bg/brand-hover' : 'bg/brand', bd: null, ic: 'icon/on-brand', fg: 'text/primary' };
  return { bg: 'bg/surface', bd: state === 'Hover' ? 'border/brand' : state === 'Focus' ? 'border/focus' : 'border/strong', ic: null, fg: 'text/primary' };
}
async function buildCheckbox() {
  await componentPage('checkbox', '⚛️ Atoms / Checkbox', async function (vb) {
    const set = await variants('Checkbox', { Checked: ['False', 'True', 'Indeterminate'], State: STATES4 }, async function (v) {
      const on = v.Checked !== 'False';
      const st = selStyle(on, v.State);
      const c = frame('', { component: true, dir: 'H', gap: 'space/200', align: 'center' });
      const box = frame('Box', { dir: 'H', w: 16, h: 16, radius: 'radius/sm', fill: st.bg, stroke: st.bd, justify: 'center', align: 'center' });
      if (on) add(box, icon(v.Checked === 'True' ? 'check' : 'minus', 12, st.ic, 'Glyph'));
      if (v.State === 'Focus') await effect(box, 'Focus/Ring');
      add(c, box, await text('Label', 'Body/Medium/Regular', st.fg, 'Label'));
      return c;
    }, { parent: vb, description: DOCS.checkbox.summary });
    addTextProp(set, 'Label', 'Label', 'Label');
    addBoolProp(set, 'Show label', 'Label', true);
    return { sets: [set] };
  });
}
async function buildRadio() {
  await componentPage('radio', '⚛️ Atoms / Radio', async function (vb) {
    const set = await variants('Radio', { Selected: ['False', 'True'], State: STATES4 }, async function (v) {
      const on = v.Selected === 'True';
      const st = selStyle(on, v.State);
      const c = frame('', { component: true, dir: 'H', gap: 'space/200', align: 'center' });
      const box = frame('Circle', { dir: 'H', w: 16, h: 16, radius: 'radius/full', fill: st.bg, stroke: st.bd, justify: 'center', align: 'center' });
      if (on) add(box, dot(6, st.ic));
      if (v.State === 'Focus') await effect(box, 'Focus/Ring');
      add(c, box, await text('Label', 'Body/Medium/Regular', st.fg, 'Label'));
      return c;
    }, { parent: vb, description: DOCS.radio.summary });
    addTextProp(set, 'Label', 'Label', 'Label');
    addBoolProp(set, 'Show label', 'Label', true);
    return { sets: [set] };
  });
}

// ---------------------------------------------------------------- Toggle
async function buildToggle() {
  await componentPage('toggle', '⚛️ Atoms / Toggle', async function (vb) {
    const set = await variants('Toggle', { Size: ['Small', 'Medium'], On: ['False', 'True'], State: ['Default', 'Hover', 'Focus', 'Disabled'] }, async function (v) {
      const on = v.On === 'True', small = v.Size === 'Small';
      const track = v.State === 'Disabled' ? 'bg/disabled' : on ? (v.State === 'Hover' ? 'bg/brand-hover' : 'bg/brand') : (v.State === 'Hover' ? 'bg/toggle-off-hover' : 'bg/toggle-off');
      const c = frame('', { component: true, dir: 'H', gap: 'space/200', align: 'center' });
      const t = frame('Track', { dir: 'H', p: 2, w: small ? 28 : 36, h: small ? 16 : 20, radius: 'radius/full', fill: track, justify: on ? 'end' : 'start', align: 'center' });
      const knob = dot(small ? 12 : 16, v.State === 'Disabled' ? 'bg/surface' : 'icon/on-brand'); knob.name = 'Knob';
      await effect(knob, 'Elevation/1 XS');
      add(t, knob);
      if (v.State === 'Focus') await effect(t, 'Focus/Ring');
      add(c, t, await text('Label', small ? 'Body/Small/Regular' : 'Body/Medium/Regular', v.State === 'Disabled' ? 'text/disabled' : 'text/primary', 'Label'));
      return c;
    }, { parent: vb, description: DOCS.toggle.summary });
    addTextProp(set, 'Label', 'Label', 'Label');
    addBoolProp(set, 'Show label', 'Label', true);
    return { sets: [set] };
  });
}

// ---------------------------------------------------------------- Badge
async function buildBadge() {
  await componentPage('badge', '⚛️ Atoms / Badge', async function (vb) {
    const set = await variants('Badge', { Tone: Object.keys(TONES), Style: ['Subtle', 'Solid'], Size: ['Small', 'Medium'] }, async function (v) {
      const t = TONES[v.Tone], solid = v.Style === 'Solid', small = v.Size === 'Small';
      const c = frame('', { component: true, dir: 'H', gap: 'space/100', px: small ? 'space/200' : 'space/300', py: 'space/50', radius: 'radius/full', fill: solid ? t.solid : t.sub, align: 'center' });
      const d = dot(6, solid ? (v.Tone === 'Warning' ? 'text/on-warning' : 'icon/on-brand') : t.ic); d.visible = false;
      add(c, d, await text(v.Tone === 'Neutral' ? 'Draft' : v.Tone === 'Success' ? 'Paid' : v.Tone === 'Warning' ? 'Pending' : v.Tone === 'Danger' ? 'Overdue' : v.Tone === 'Info' ? 'Sent' : 'New', small ? 'Label/Small' : 'Label/Medium', solid ? t.sfg : t.fg, 'Label'));
      return c;
    }, { parent: vb, cols: 4, description: DOCS.badge.summary });
    addTextProp(set, 'Label', 'Label', 'Badge');
    addBoolProp(set, 'Show dot', 'Dot', false);
    return { sets: [set], preview: async function (c) {
      Object.keys(TONES).forEach(function (t) {
        add(c, make('Badge', { Tone: t, Style: 'Subtle', Size: 'Medium', Label: t, 'Show dot': true }));
        add(c, make('Badge', { Tone: t, Style: 'Solid', Size: 'Medium', Label: t }));
      });
    } };
  });
}

// ---------------------------------------------------------------- Tag / Chip
async function buildTag() {
  await componentPage('tag', '⚛️ Atoms / Tag', async function (vb) {
    const ST = {
      Default: { bg: 'bg/surface', bd: 'border/strong', fg: 'text/primary', ic: 'icon/default' },
      Hover: { bg: 'bg/hover', bd: 'border/hover', fg: 'text/primary', ic: 'icon/default' },
      Selected: { bg: 'bg/brand-subtle', bd: 'border/brand', fg: 'text/brand', ic: 'icon/brand' },
      Disabled: { bg: 'bg/disabled', bd: 'border/disabled', fg: 'text/disabled', ic: 'icon/disabled' },
    };
    const set = await variants('Tag', { Size: ['Small', 'Medium'], State: Object.keys(ST) }, async function (v) {
      const st = ST[v.State], small = v.Size === 'Small';
      const c = frame('', { component: true, dir: 'H', gap: 'space/100', px: small ? 'space/200' : 'space/300', radius: 'radius/full', fill: st.bg, stroke: st.bd, align: 'center', h: small ? 24 : 32 });
      const li = icon('filter', small ? 12 : 16, st.ic, 'Leading icon'); li.visible = false;
      const rm = icon('x', small ? 12 : 16, st.ic, 'Remove');
      add(c, li, await text('Status: Overdue', small ? 'Label/Small' : 'Label/Medium', st.fg, 'Label'), rm);
      return c;
    }, { parent: vb, description: DOCS.tag.summary });
    addTextProp(set, 'Label', 'Label', 'Status: Overdue');
    addBoolProp(set, 'Removable', 'Remove', true);
    addBoolProp(set, 'Show leading icon', 'Leading icon', false);
    addSwapProp(set, 'Leading icon', 'Leading icon', 'filter');
    return { sets: [set] };
  });
}

// ---------------------------------------------------------------- Avatar
async function buildAvatar() {
  await componentPage('avatar', '⚛️ Atoms / Avatar', async function (vb) {
    const SZ = { XS: [24, 'Label/Small'], SM: [32, 'Label/Small'], MD: [40, 'Label/Medium'], LG: [48, 'Label/Large'], XL: [64, 'Heading/H3'] };
    const set = await variants('Avatar', { Type: ['Initials', 'Icon'], Size: Object.keys(SZ) }, async function (v) {
      const s = SZ[v.Size][0];
      const c = frame('', { component: true, dir: 'H', w: s, h: s, radius: 'radius/full', fill: 'bg/brand-subtle', justify: 'center', align: 'center' });
      if (v.Type === 'Initials') add(c, await text('OR', SZ[v.Size][1], 'text/brand', 'Initials'));
      else add(c, icon('user', Math.round(s * 0.5 / 4) * 4 || 12, 'icon/brand', 'Icon'));
      const ds = Math.max(8, Math.round(s / 4));
      const st = dot(ds, 'icon/success'); st.name = 'Status';
      setStroke(st, 'bg/surface', 2, 'OUTSIDE');
      add(c, st);
      st.layoutPositioning = 'ABSOLUTE';
      st.x = s - ds; st.y = s - ds;
      st.constraints = { horizontal: 'MAX', vertical: 'MAX' };
      st.visible = false;
      return c;
    }, { parent: vb, description: DOCS.avatar.summary });
    addTextProp(set, 'Initials', 'Initials', 'OR');
    addBoolProp(set, 'Show status', 'Status', false);
    return { sets: [set] };
  });
}

// ---------------------------------------------------------------- Tooltip
async function buildTooltip() {
  await componentPage('tooltip', '⚛️ Atoms / Tooltip', async function (vb) {
    const set = await variants('Tooltip', { Placement: ['Top', 'Bottom', 'Left', 'Right'] }, async function (v) {
      const vertical = v.Placement === 'Top' || v.Placement === 'Bottom';
      const c = frame('', { component: true, dir: vertical ? 'V' : 'H', align: 'center' });
      const bubble = frame('Bubble', { dir: 'H', px: 'space/200', py: 'space/150', radius: 'radius/md', fill: 'bg/inverse' });
      add(bubble, await text('Download invoice as PDF', 'Body/Small/Medium', 'text/inverse', 'Text'));
      const arrow = figma.createPolygon(); arrow.pointCount = 3; arrow.name = 'Arrow';
      arrow.resize(12, 6); setFill(arrow, 'bg/inverse');
      arrow.rotation = { Top: 180, Bottom: 0, Left: -90, Right: 90 }[v.Placement];
      if (v.Placement === 'Top' || v.Placement === 'Left') add(c, bubble, arrow); else add(c, arrow, bubble);
      await effect(bubble, 'Elevation/3 MD');
      return c;
    }, { parent: vb, description: DOCS.tooltip.summary });
    addTextProp(set, 'Text', 'Text', 'Download invoice as PDF');
    return { sets: [set] };
  });
}

// ---------------------------------------------------------------- Link
async function buildLink() {
  await componentPage('link', '⚛️ Atoms / Link', async function (vb) {
    const set = await variants('Link', { Size: ['Small', 'Medium'], State: ['Default', 'Hover', 'Focus', 'Disabled'] }, async function (v) {
      const fg = v.State === 'Disabled' ? 'text/disabled' : v.State === 'Hover' ? 'text/link-hover' : 'text/link';
      const ic = v.State === 'Disabled' ? 'icon/disabled' : 'icon/brand';
      const c = frame('', { component: true, dir: 'H', gap: 'space/100', align: 'center', radius: 'radius/xs' });
      const ext = icon('external-link', v.Size === 'Small' ? 12 : 16, ic, 'External icon'); ext.visible = false;
      add(c, await text('View invoice', v.Size === 'Small' ? 'Label/Small' : 'Label/Medium', fg, 'Label', { underline: v.State === 'Hover' || v.State === 'Focus' }), ext);
      if (v.State === 'Focus') await effect(c, 'Focus/Ring');
      return c;
    }, { parent: vb, description: DOCS.link.summary });
    addTextProp(set, 'Label', 'Label', 'View invoice');
    addBoolProp(set, 'External', 'External icon', false);
    return { sets: [set] };
  });
}

// ---------------------------------------------------------------- Divider
async function buildDivider() {
  await componentPage('divider', '⚛️ Atoms / Divider', async function (vb) {
    const set = await variants('Divider', { Orientation: ['Horizontal', 'Vertical', 'With label'] }, async function (v) {
      if (v.Orientation === 'Vertical') {
        const c = frame('', { component: true, dir: 'V', w: 1, h: 40, fill: 'border/default' });
        return c;
      }
      const c = frame('', { component: true, dir: 'H', gap: 'space/300', align: 'center', w: 320 });
      const l1 = frame('Line', { dir: 'H', h: 1, fill: 'border/default' });
      add(c, l1); fillW(l1);
      if (v.Orientation === 'With label') {
        add(c, await text('OR', 'Overline', 'text/tertiary', 'Label'));
        const l2 = frame('Line', { dir: 'H', h: 1, fill: 'border/default' }); add(c, l2); fillW(l2);
      }
      return c;
    }, { parent: vb, description: DOCS.divider.summary });
    return { sets: [set], contentDir: 'V', contentAlign: 'start' };
  });
}

// ---------------------------------------------------------------- Spinner
async function buildSpinner() {
  await componentPage('spinner', '⚛️ Atoms / Spinner', async function (vb) {
    const SZ = { Small: 16, Medium: 24, Large: 32, XLarge: 48 };
    const set = await variants('Spinner', { Size: Object.keys(SZ) }, async function (v) {
      const s = SZ[v.Size];
      const c = figma.createComponent(); c.resize(s, s); c.fills = [];
      const track = figma.createEllipse(); track.name = 'Track'; track.resize(s, s);
      track.arcData = { startingAngle: 0, endingAngle: 2 * Math.PI, innerRadius: 0.75 };
      setFill(track, 'bg/pressed');
      const arc = figma.createEllipse(); arc.name = 'Indicator'; arc.resize(s, s);
      arc.arcData = { startingAngle: -Math.PI / 2, endingAngle: Math.PI / 4, innerRadius: 0.75 };
      setFill(arc, 'bg/brand');
      [track, arc].forEach(function (n) { c.appendChild(n); n.x = 0; n.y = 0; n.constraints = { horizontal: 'SCALE', vertical: 'SCALE' }; });
      return c;
    }, { parent: vb, description: DOCS.spinner.summary });
    return { sets: [set] };
  });
}

// ---------------------------------------------------------------- Progress Bar
async function buildProgress() {
  await componentPage('progress', '⚛️ Atoms / Progress Bar', async function (vb) {
    const set = await variants('Progress Bar', { Value: ['0', '25', '50', '75', '100'] }, async function (v) {
      const pct = Number(v.Value);
      const c = frame('', { component: true, dir: 'V', gap: 'space/200', w: 320 });
      const lbl = frame('Label row', { dir: 'H', justify: 'between', align: 'center' });
      add(c, lbl); fillW(lbl);
      add(lbl, await text('Importing customers.csv', 'Body/Small/Medium', 'text/primary', 'Label'), await text(pct + '%', 'Body/Small/Regular', 'text/secondary', 'Percent'));
      const track = frame('Track', { dir: 'H', h: 8, radius: 'radius/full', fill: 'bg/pressed', clip: true });
      add(c, track); fillW(track);
      const ind = frame('Indicator', { dir: 'H', h: 8, w: Math.max(1, 320 * pct / 100), radius: 'radius/full', fill: pct === 100 ? 'bg/success' : 'bg/brand' });
      ind.visible = pct > 0;
      add(track, ind);
      return c;
    }, { parent: vb, cols: 1, description: DOCS.progress.summary });
    addTextProp(set, 'Label', 'Label', 'Importing customers.csv');
    addBoolProp(set, 'Show label', 'Label row', true);
    return { sets: [set], contentDir: 'V', contentAlign: 'start' };
  });
}
