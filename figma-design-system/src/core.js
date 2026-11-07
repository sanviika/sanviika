// ============================================================================
//  CORE — state, colour maths, variable/style creation, node helpers and the
//  documentation-page renderer shared by every page.
// ============================================================================

const MARK = 'northstar-ds';
function freshState() {
  return {
  prims: null,          // primitive palette actually used (brand may be regenerated)
  prim: {}, sem: {}, dim: {}, typo: {},   // variables by name
  ts: {}, es: {}, gs: {},                 // text / effect / grid styles by name
  icons: {},            // icon components by name
  sets: {},             // component sets / components by name
  col: {}, modes: {},   // collections + mode ids
  varName: {}, styleName: {},             // id → name lookups for docs
  hasDark: true, hasCompact: true,
  sans: 'Inter', mono: 'Roboto Mono',
  warnings: [], errors: [],
  source: null,         // analysis of the linked Figma node
  stats: { pages: 0, components: 0, variants: 0, variables: 0, textStyles: 0, effectStyles: 0, imported: 0, bindings: 0 },
  };
}
const S = freshState();
function resetState() { const f = freshState(); Object.keys(f).forEach(function (k) { S[k] = f[k]; }); }

function warn(msg) { S.warnings.push(msg); console.warn('[Northstar] ' + msg); }
function progress(msg) { try { figma.ui.postMessage({ type: 'progress', msg: msg }); } catch (e) { /* no ui */ } }

// ---------------------------------------------------------------- colour maths
function hex2rgba(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
    a: h.length === 8 ? Math.round(parseInt(h.slice(6, 8), 16) / 255 * 1000) / 1000 : 1,
  };
}
function rgb(hex) { const c = hex2rgba(hex); return { r: c.r, g: c.g, b: c.b }; }
function rgb2hex(c) {
  const t = function (v) { const s = Math.round(Math.max(0, Math.min(1, v)) * 255).toString(16); return s.length === 1 ? '0' + s : s; };
  return ('#' + t(c.r) + t(c.g) + t(c.b)).toUpperCase();
}
function rgb2hsl(c) {
  const max = Math.max(c.r, c.g, c.b), min = Math.min(c.r, c.g, c.b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === c.r) h = (c.g - c.b) / d + (c.g < c.b ? 6 : 0);
    else if (max === c.g) h = (c.b - c.r) / d + 2;
    else h = (c.r - c.g) / d + 4;
    h /= 6;
  }
  return { h: h, s: s, l: l };
}
function hsl2rgb(h, s, l) {
  if (s === 0) return { r: l, g: l, b: l };
  const hue = function (p, q, t) {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
  return { r: hue(p, q, h + 1 / 3), g: hue(p, q, h), b: hue(p, q, h - 1 / 3) };
}
function luminance(hex) {
  const c = rgb(hex);
  const f = function (v) { return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
}
function contrast(a, b) {
  const la = luminance(a), lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
// Generates a perceptually even 50–950 ramp around any brand colour.
function generateRamp(hex) {
  const base = rgb2hsl(rgb(hex));
  const L = { 50: 0.97, 100: 0.94, 200: 0.87, 300: 0.77, 400: 0.66, 500: 0.56, 600: 0.47, 700: 0.39, 800: 0.31, 900: 0.25, 950: 0.16 };
  const out = {};
  Object.keys(L).forEach(function (k) {
    const step = Number(k);
    const sat = Math.max(0.12, Math.min(1, base.s * (step <= 100 ? 0.9 : step >= 900 ? 0.85 : 1)));
    out[k] = rgb2hex(hsl2rgb(base.h, sat, L[k]));
  });
  // Guarantee AA for white text on bg/brand (600 light, 500 dark) and brand text on white.
  let prevL = 1;
  ['500', '600', '700', '800', '900', '950'].forEach(function (k) {
    let l = Math.max(0.03, Math.min(L[k], prevL - 0.05));
    out[k] = rgb2hex(hsl2rgb(base.h, Math.max(0.12, Math.min(1, base.s)), l));
    while (Number(k) <= 700 && contrast('#FFFFFF', out[k]) < 4.5 && l > 0.1) { l -= 0.02; out[k] = rgb2hex(hsl2rgb(base.h, Math.max(0.12, Math.min(1, base.s)), l)); }
    prevL = l;
  });
  return out;
}
function semRow(name) { for (let i = 0; i < SEMANTIC.length; i++) if (SEMANTIC[i][0] === name) return SEMANTIC[i]; return null; }
function semHex(name, mode) {
  const row = semRow(name); if (!row) return '#000000';
  return resolveTokenHex(mode === 'Dark' ? row[2] : row[1], S.prims).slice(0, 7);
}
const DIM_MAP = {}; DIMENSIONS.forEach(function (d) { DIM_MAP[d[0]] = d[1]; });

// ---------------------------------------------------------------- fonts
async function loadFonts() {
  const want = (S.source && S.source.fontFamily) || 'Inter';
  const styles = ['Regular', 'Medium', 'Semi Bold', 'Bold'];
  const tryFamily = async function (fam) {
    for (let i = 0; i < styles.length; i++) await figma.loadFontAsync({ family: fam, style: styles[i] });
  };
  try { await tryFamily(want); S.sans = want; } catch (e) {
    if (want !== 'Inter') warn('Font “' + want + '” from the source file lacks Regular/Medium/Semi Bold/Bold — falling back to Inter.');
    await tryFamily('Inter'); S.sans = 'Inter';
  }
  try { await figma.loadFontAsync({ family: 'Roboto Mono', style: 'Regular' }); S.mono = 'Roboto Mono'; } catch (e) {
    S.mono = S.sans; warn('Roboto Mono unavailable — Code styles use ' + S.sans + '.');
  }
}

// ---------------------------------------------------------------- variables
function codeSyntax(v, name) {
  try { v.setVariableCodeSyntax('WEB', 'var(--ns-' + name.replace(/\//g, '-') + ')'); } catch (e) { /* older API */ }
}
function mark(obj) { try { obj.setPluginData(MARK, '1'); } catch (e) { /* not supported */ } }

function colourScopes(name) {
  if (name.indexOf('bg/') === 0) return ['FRAME_FILL', 'SHAPE_FILL'];
  if (name.indexOf('text/') === 0) return ['TEXT_FILL'];
  if (name.indexOf('border/') === 0) return ['STROKE_COLOR'];
  if (name.indexOf('icon/') === 0) return ['SHAPE_FILL', 'STROKE_COLOR'];
  if (name.indexOf('shadow/') === 0 || name.indexOf('focus/') === 0) return ['EFFECT_COLOR'];
  return ['FRAME_FILL', 'SHAPE_FILL', 'STROKE_COLOR'];
}

async function buildVariables() {
  progress('Creating variables…');
  // Primitives -------------------------------------------------------------
  const pc = figma.variables.createVariableCollection('Primitives'); mark(pc);
  const pm = pc.modes[0].modeId; pc.renameMode(pm, 'Value');
  S.col.prim = pc;
  Object.keys(S.prims).forEach(function (fam) {
    Object.keys(S.prims[fam]).forEach(function (step) {
      const name = fam + '/' + step;
      const v = figma.variables.createVariable(name, pc, 'COLOR');
      v.setValueForMode(pm, hex2rgba(S.prims[fam][step]));
      v.scopes = []; // hidden from pickers — use semantic tokens
      v.description = 'Primitive. Do not apply directly — reference through a semantic token.';
      codeSyntax(v, 'color-' + name);
      S.prim[name] = v; S.varName[v.id] = name; S.stats.variables++;
    });
  });

  // Semantic colour (Light / Dark) -----------------------------------------
  const cc = figma.variables.createVariableCollection('Color'); mark(cc);
  const light = cc.modes[0].modeId; cc.renameMode(light, 'Light');
  let dark = null;
  try { dark = cc.addMode('Dark'); } catch (e) {
    S.hasDark = false;
    warn('This Figma plan allows only one variable mode, so the Dark mode could not be added. Upgrade to Professional+ and re-run with “Rebuild” to enable dark mode.');
  }
  S.col.color = cc; S.modes.light = light; S.modes.dark = dark;
  const val = function (ref) {
    if (ref.charAt(0) === '#' || ref.charAt(0) === '@') return hex2rgba(resolveTokenHex(ref, S.prims));
    if (!S.prim[ref]) throw new Error('Unknown primitive ' + ref);
    return figma.variables.createVariableAlias(S.prim[ref]);
  };
  SEMANTIC.forEach(function (row) {
    const v = figma.variables.createVariable(row[0], cc, 'COLOR');
    v.setValueForMode(light, val(row[1]));
    if (dark) v.setValueForMode(dark, val(row[2]));
    v.description = row[3];
    v.scopes = colourScopes(row[0]);
    codeSyntax(v, row[0]);
    S.sem[row[0]] = v; S.varName[v.id] = row[0]; S.stats.variables++;
  });

  // Dimensions (Comfortable / Compact) --------------------------------------
  const dc = figma.variables.createVariableCollection('Dimensions'); mark(dc);
  const dm = dc.modes[0].modeId; dc.renameMode(dm, 'Comfortable');
  let cm = null;
  try { cm = dc.addMode('Compact'); } catch (e) { S.hasCompact = false; }
  S.col.dim = dc; S.modes.comfortable = dm; S.modes.compact = cm;
  DIMENSIONS.forEach(function (row) {
    const v = figma.variables.createVariable(row[0], dc, 'FLOAT');
    v.setValueForMode(dm, row[1]);
    if (cm) v.setValueForMode(cm, row[2]);
    v.description = row[3];
    const p = row[0].split('/')[0];
    v.scopes = p === 'space' ? ['GAP'] : p === 'radius' ? ['CORNER_RADIUS'] : p === 'border-width' ? ['STROKE_FLOAT'] : ['WIDTH_HEIGHT'];
    codeSyntax(v, row[0]);
    S.dim[row[0]] = v; S.varName[v.id] = row[0]; S.stats.variables++;
  });

  // Typography primitives -----------------------------------------------------
  const tc = figma.variables.createVariableCollection('Typography'); mark(tc);
  const tm = tc.modes[0].modeId; tc.renameMode(tm, 'Value');
  S.col.typo = tc;
  const mk = function (name, type, value, scopes) {
    const v = figma.variables.createVariable(name, tc, type);
    v.setValueForMode(tm, value); v.scopes = scopes; codeSyntax(v, name);
    S.typo[name] = v; S.varName[v.id] = name; S.stats.variables++;
  };
  mk('font-family/sans', 'STRING', S.sans, ['FONT_FAMILY']);
  mk('font-family/mono', 'STRING', S.mono, ['FONT_FAMILY']);
  const sizes = {}, heights = {};
  TYPE_SCALE.forEach(function (t) { sizes[t[3]] = 1; heights[t[4]] = 1; });
  Object.keys(sizes).forEach(function (s) { mk('font-size/' + s, 'FLOAT', Number(s), ['FONT_SIZE']); });
  Object.keys(heights).forEach(function (s) { mk('line-height/' + s, 'FLOAT', Number(s), ['LINE_HEIGHT']); });
}

// ---------------------------------------------------------------- styles
async function buildStyles() {
  progress('Creating text, effect and grid styles…');
  TYPE_SCALE.forEach(function (t) {
    const st = figma.createTextStyle(); mark(st);
    st.name = t[0];
    st.fontName = { family: t[1] === 'mono' ? S.mono : S.sans, style: t[1] === 'mono' ? 'Regular' : FONT_STYLE[t[2]] };
    st.fontSize = t[3];
    st.lineHeight = { unit: 'PIXELS', value: t[4] };
    st.letterSpacing = { unit: 'PERCENT', value: t[5] };
    if (t[6]) st.textCase = t[6];
    st.description = t[7];
    try { st.setBoundVariable('fontSize', S.typo['font-size/' + t[3]]); } catch (e) { /* optional */ }
    try { st.setBoundVariable('lineHeight', S.typo['line-height/' + t[4]]); } catch (e) { /* optional */ }
    try { st.setBoundVariable('fontFamily', S.typo[t[1] === 'mono' ? 'font-family/mono' : 'font-family/sans']); } catch (e) { /* optional */ }
    S.ts[t[0]] = st; S.styleName[st.id] = t[0]; S.stats.textStyles++;
  });
  ELEVATION.forEach(function (e) {
    const st = figma.createEffectStyle(); mark(st);
    st.name = e[0]; st.description = e[2];
    st.effects = e[1].map(function (l) {
      let fx = {
        type: 'DROP_SHADOW', color: hex2rgba(resolveTokenHex(semRow(l[4])[1], S.prims)),
        offset: { x: l[0], y: l[1] }, radius: l[2], spread: l[3], visible: true, blendMode: 'NORMAL', showShadowBehindNode: false,
      };
      try { fx = figma.variables.setBoundVariableForEffect(fx, 'color', S.sem[l[4]]); } catch (err) { /* static colour fallback */ }
      return fx;
    });
    S.es[e[0]] = st; S.styleName[st.id] = e[0]; S.stats.effectStyles++;
  });
  GRIDS.forEach(function (g) {
    try {
      const st = figma.createGridStyle(); mark(st);
      st.name = g[0];
      st.layoutGrids = [{ pattern: 'COLUMNS', alignment: 'STRETCH', gutterSize: g[3], count: g[2], offset: g[4], visible: true, color: { r: 0.94, g: 0.27, b: 0.22, a: 0.08 } }];
      S.gs[g[0]] = st;
    } catch (e) { warn('Grid style ' + g[0] + ' failed: ' + e.message); }
  });
}

// ---------------------------------------------------------------- node helpers
function paintVar(name) {
  const v = S.sem[name] || S.prim[name];
  if (!v) throw new Error('Unknown colour token: ' + name);
  return figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', v);
}
function setFill(n, name) { n.fills = name ? [paintVar(name)] : []; return n; }
function setStroke(n, name, w, align) {
  if (!name) { n.strokes = []; return n; }
  n.strokes = [paintVar(name)]; n.strokeWeight = w || 1; n.strokeAlign = align || 'INSIDE';
  return n;
}
// Single-side stroke (e.g. table rows, headers, sidebars).
function setSideStroke(n, name, side) {
  setStroke(n, name, 1, 'INSIDE');
  ['Top', 'Right', 'Bottom', 'Left'].forEach(function (s) { n['stroke' + s + 'Weight'] = s.toLowerCase() === side ? 1 : 0; });
  return n;
}
function dimVal(tok) {
  if (typeof tok === 'number') return tok;
  if (DIM_MAP[tok] == null) throw new Error('Unknown dimension token: ' + tok);
  return DIM_MAP[tok];
}
function bindDim(n, field, tok) {
  if (typeof tok !== 'string' || !S.dim[tok]) return;
  try { n.setBoundVariable(field, S.dim[tok]); } catch (e) { /* field not bindable on this node */ }
}
function setRadius(n, tok) {
  n.cornerRadius = dimVal(tok);
  if (typeof tok === 'string') ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius'].forEach(function (f) { bindDim(n, f, tok); });
  return n;
}
function first() { for (let i = 0; i < arguments.length; i++) if (arguments[i] != null) return arguments[i]; return null; }
function setW(n, tok) {
  const keepV = n.layoutMode && n.layoutMode !== 'NONE' ? n.layoutSizingVertical : null;
  n.resize(dimVal(tok), n.height);
  try { n.layoutSizingHorizontal = 'FIXED'; } catch (e) { /* not auto layout */ }
  if (keepV && keepV !== 'FILL') try { n.layoutSizingVertical = keepV; } catch (e) { /* ignore */ }
  bindDim(n, 'width', tok);
  return n;
}
function setH(n, tok) {
  const keepH = n.layoutMode && n.layoutMode !== 'NONE' ? n.layoutSizingHorizontal : null;
  n.resize(n.width, dimVal(tok));
  try { n.layoutSizingVertical = 'FIXED'; } catch (e) { /* not auto layout */ }
  if (keepH && keepH !== 'FILL') try { n.layoutSizingHorizontal = keepH; } catch (e) { /* ignore */ }
  bindDim(n, 'height', tok);
  return n;
}
/**
 * Auto-layout frame/component factory. Every padding, gap, radius and size
 * passed as a token string is bound to its Dimensions variable.
 */
function frame(name, o) {
  o = o || {};
  const f = o.component ? figma.createComponent() : figma.createFrame();
  f.name = name || 'Frame';
  f.fills = [];
  f.clipsContent = !!o.clip;
  if (o.dir !== 'none') {
    f.layoutMode = o.dir === 'H' ? 'HORIZONTAL' : 'VERTICAL';
    f.primaryAxisSizingMode = 'AUTO';
    f.counterAxisSizingMode = 'AUTO';
    if (o.gap != null) { f.itemSpacing = dimVal(o.gap); bindDim(f, 'itemSpacing', o.gap); }
    const pads = {
      paddingTop: first(o.pt, o.py, o.p), paddingBottom: first(o.pb, o.py, o.p),
      paddingLeft: first(o.pl, o.px, o.p), paddingRight: first(o.pr, o.px, o.p),
    };
    Object.keys(pads).forEach(function (k) { if (pads[k] != null) { f[k] = dimVal(pads[k]); bindDim(f, k, pads[k]); } });
    if (o.align) f.counterAxisAlignItems = { start: 'MIN', center: 'CENTER', end: 'MAX', baseline: 'BASELINE' }[o.align];
    if (o.justify) f.primaryAxisAlignItems = { start: 'MIN', center: 'CENTER', end: 'MAX', between: 'SPACE_BETWEEN' }[o.justify];
    if (o.wrap) {
      f.layoutWrap = 'WRAP';
      const rg = o.rowGap != null ? o.rowGap : o.gap;
      if (rg != null) { f.counterAxisSpacing = dimVal(rg); bindDim(f, 'counterAxisSpacing', rg); }
    }
  }
  if (o.fill) setFill(f, o.fill);
  if (o.stroke) setStroke(f, o.stroke, o.strokeW, o.strokeAlign);
  if (o.radius != null) setRadius(f, o.radius);
  if (o.w != null) setW(f, o.w);
  if (o.h != null) setH(f, o.h);
  return f;
}
function add(parent) {
  for (let i = 1; i < arguments.length; i++) if (arguments[i]) parent.appendChild(arguments[i]);
  return parent;
}
function fillW(n) {
  try { n.layoutSizingHorizontal = 'FILL'; } catch (e) { warn('fillW failed on ' + n.name + ': ' + e.message); }
  if (n.type === 'TEXT') n.textAutoResize = 'HEIGHT';
  return n;
}
function fillH(n) { try { n.layoutSizingVertical = 'FILL'; } catch (e) { warn('fillH failed on ' + n.name); } return n; }
function spacer(dir) { const s = frame('Spacer', { dir: dir || 'V' }); return s; }
async function text(chars, style, color, name, o) {
  o = o || {};
  const st = S.ts[style];
  if (!st) throw new Error('Unknown text style: ' + style);
  const t = figma.createText();
  t.fontName = st.fontName;
  t.characters = String(chars);
  await t.setTextStyleIdAsync(st.id);
  if (color) setFill(t, color);
  t.name = name || String(chars).slice(0, 40);
  if (o.w) { t.textAutoResize = 'HEIGHT'; t.resize(o.w, t.height); }
  if (o.align) t.textAlignHorizontal = o.align;
  if (o.underline) t.textDecoration = 'UNDERLINE';
  return t;
}
async function effect(n, name) {
  if (!S.es[name]) return n;
  try { await n.setEffectStyleIdAsync(S.es[name].id); } catch (e) { warn('Effect ' + name + ' failed: ' + e.message); }
  return n;
}
function setMode(n, mode) {
  const isDim = mode === 'Comfortable' || mode === 'Compact';
  const col = isDim ? S.col.dim : S.col.color;
  const id = S.modes[mode.toLowerCase()];
  if (!col || !id) return n;
  try { n.setExplicitVariableModeForCollection(col, id); } catch (e) {
    try { n.setExplicitVariableModeForCollection(col.id, id); } catch (e2) { warn('Could not set ' + mode + ' mode on ' + n.name); }
  }
  return n;
}
function dot(size, color) { const d = frame('Dot', { dir: 'none', w: size, h: size, radius: 'radius/full', fill: color }); return d; }

// ---------------------------------------------------------------- icons & instances
function tint(node, color) {
  const p = paintVar(color);
  const walk = function (n) {
    if ('strokes' in n && n.strokes && n.strokes.length) n.strokes = [p];
    if ('children' in n) n.children.forEach(walk);
  };
  walk(node);
  return node;
}
function icon(name, size, color, layerName) {
  const c = S.icons[name] || S.icons.placeholder;
  const i = c.createInstance();
  i.name = layerName || 'Icon';
  if (size && size !== 24) i.rescale(size / 24);
  if (color) tint(i, color);
  return i;
}
function propKey(defs, name) {
  const keys = Object.keys(defs);
  for (let i = 0; i < keys.length; i++) if (keys[i] === name || keys[i].split('#')[0] === name) return keys[i];
  return null;
}
/** Set variant / text / boolean / instance-swap props by friendly name. */
function props(inst, obj) {
  const defs = inst.componentProperties;
  const out = {};
  Object.keys(obj).forEach(function (k) {
    const key = propKey(defs, k);
    if (!key) { warn('Property “' + k + '” not found on ' + inst.name); return; }
    let v = obj[k];
    if (defs[key].type === 'INSTANCE_SWAP' && typeof v === 'string' && S.icons[v]) v = S.icons[v].id;
    out[key] = v;
  });
  try { inst.setProperties(out); } catch (e) { warn('setProperties on ' + inst.name + ' failed: ' + e.message); }
  return inst;
}
/** Instance of a registered component (set). */
function make(name, p, layerName) {
  const s = S.sets[name];
  if (!s) throw new Error('Component not built yet: ' + name);
  const comp = s.type === 'COMPONENT_SET' ? s.defaultVariant : s;
  const i = comp.createInstance();
  i.name = layerName || name;
  if (p) props(i, p);
  return i;
}
/** Override a text layer deep inside an instance. */
function setText(inst, layer, chars, index) {
  const all = inst.findAll(function (n) { return n.type === 'TEXT' && n.name === layer; });
  const t = all[index || 0];
  if (!t) { warn('Text layer “' + layer + '” not found in ' + inst.name); return inst; }
  t.characters = String(chars);
  return inst;
}
function child(inst, name) {
  // Prefer direct children (e.g. a table cell named “Status”) over deeper layers with the same name.
  const direct = (inst.children || []).filter(function (n) { return n.name === name; })[0];
  return direct || inst.findOne(function (n) { return n.name === name; });
}

// ---------------------------------------------------------------- component sets
function cartesian(arrays) {
  return arrays.reduce(function (acc, arr) {
    const out = [];
    acc.forEach(function (a) { arr.forEach(function (b) { out.push(a.concat([b])); }); });
    return out;
  }, [[]]);
}
function gridLayout(set, cols, gap, pad) {
  gap = gap == null ? 24 : gap; pad = pad == null ? 32 : pad;
  const kids = set.children.slice();
  const rows = Math.ceil(kids.length / cols);
  const colW = [], rowH = [];
  kids.forEach(function (k, i) {
    const c = i % cols, r = Math.floor(i / cols);
    colW[c] = Math.max(colW[c] || 0, k.width);
    rowH[r] = Math.max(rowH[r] || 0, k.height);
  });
  let y = pad;
  for (let r = 0; r < rows; r++) {
    let x = pad;
    for (let c = 0; c < cols; c++) {
      const k = kids[r * cols + c]; if (!k) break;
      k.x = x; k.y = y; x += colW[c] + gap;
    }
    y += rowH[r] + gap;
  }
  const w = pad * 2 + colW.reduce(function (a, b) { return a + b; }, 0) + gap * (colW.length - 1);
  const h = pad * 2 + rowH.reduce(function (a, b) { return a + b; }, 0) + gap * (rowH.length - 1);
  set.resizeWithoutConstraints(w, h);
}
function ownNodes(root, pred) {
  // Walk a component without descending into nested instances (their layers
  // cannot reference the parent's component properties).
  const out = [];
  const walk = function (n) {
    if (n !== root && pred(n)) out.push(n);
    if (n.type !== 'INSTANCE' && 'children' in n) n.children.forEach(walk);
  };
  walk(root);
  return out;
}
function ref(n, obj) {
  try { n.componentPropertyReferences = Object.assign({}, n.componentPropertyReferences || {}, obj); } catch (e) { warn('Property binding on ' + n.name + ' failed: ' + e.message); }
}
function comps(target) { return target.type === 'COMPONENT_SET' ? target.children : [target]; }
function addTextProp(target, prop, layer, def) {
  const key = target.addComponentProperty(prop, 'TEXT', def);
  comps(target).forEach(function (c) { ownNodes(c, function (n) { return n.type === 'TEXT' && n.name === layer; }).forEach(function (n) { ref(n, { characters: key }); }); });
  return key;
}
function addBoolProp(target, prop, layer, def) {
  const key = target.addComponentProperty(prop, 'BOOLEAN', def);
  comps(target).forEach(function (c) { ownNodes(c, function (n) { return n.name === layer; }).forEach(function (n) { ref(n, { visible: key }); }); });
  return key;
}
function addSwapProp(target, prop, layer, defIcon, preferred) {
  let opts;
  try {
    const list = (preferred || Object.keys(S.icons)).map(function (k) { return { type: 'COMPONENT', key: S.icons[k].key }; });
    opts = { preferredValues: list };
  } catch (e) { opts = undefined; }
  let key;
  try { key = target.addComponentProperty(prop, 'INSTANCE_SWAP', S.icons[defIcon].id, opts); } catch (e) { key = target.addComponentProperty(prop, 'INSTANCE_SWAP', S.icons[defIcon].id); }
  comps(target).forEach(function (c) { ownNodes(c, function (n) { return n.type === 'INSTANCE' && n.name === layer; }).forEach(function (n) { ref(n, { mainComponent: key }); }); });
  return key;
}
function expose(target, layer) {
  comps(target).forEach(function (c) {
    ownNodes(c, function (n) { return n.type === 'INSTANCE' && n.name === layer; }).forEach(function (n) { try { n.isExposedInstance = true; } catch (e) { /* ignore */ } });
  });
}
/**
 * Build a component set from variant axes.
 *   axes   { Hierarchy: [...], Size: [...], State: [...] }
 *   build  async (vals) => ComponentNode
 */
async function variants(name, axes, build, o) {
  o = o || {};
  const keys = Object.keys(axes);
  const combos = cartesian(keys.map(function (k) { return axes[k]; }));
  const list = [];
  for (let i = 0; i < combos.length; i++) {
    const vals = {}; keys.forEach(function (k, j) { vals[k] = combos[i][j]; });
    const c = await build(vals);
    c.name = keys.map(function (k) { return k + '=' + vals[k]; }).join(', ');
    figma.currentPage.appendChild(c);
    list.push(c);
  }
  const set = figma.combineAsVariants(list, o.parent || figma.currentPage);
  set.name = name;
  set.fills = [];
  set.strokes = [{ type: 'SOLID', color: rgb('#9747FF') }];
  set.strokeWeight = 1; set.dashPattern = [10, 5]; set.cornerRadius = 8;
  gridLayout(set, o.cols || axes[keys[keys.length - 1]].length);
  if (o.description) set.description = o.description;
  S.sets[name] = set;
  S.stats.components++; S.stats.variants += list.length;
  return set;
}
/** Register a single (non-variant) component. */
function single(name, c, parent, description) {
  c.name = name;
  if (description) c.description = description;
  if (parent) parent.appendChild(c);
  S.sets[name] = c;
  S.stats.components++; S.stats.variants++;
  return c;
}

// ---------------------------------------------------------------- documentation renderer
async function newPage(name) {
  const p = figma.createPage();
  p.name = name; mark(p);
  await figma.setCurrentPageAsync(p);
  try { p.backgrounds = [{ type: 'SOLID', color: rgb('#E4E7EE'), opacity: 1, visible: true, blendMode: 'NORMAL' }]; } catch (e) { /* ignore */ }
  if (name !== '---') S.stats.pages++;
  return p;
}
async function separator() { await newPage('---'); }

async function docRoot(meta, width) {
  const root = frame(meta.title + ' · Documentation', { dir: 'V', gap: 'space/1600', p: 'space/2000', fill: 'bg/canvas', radius: 'radius/2xl', w: width || 1600 });
  figma.currentPage.appendChild(root);
  const head = frame('Header', { dir: 'V', gap: 'space/300' });
  add(root, head); fillW(head);
  const crumbs = await text(meta.category.toUpperCase() + '  ·  ' + DS_NAME.toUpperCase() + ' ' + DS_VERSION, 'Overline', 'text/brand', 'Eyebrow');
  add(head, crumbs, await text(meta.title, 'Display/Large', 'text/primary', 'Title'));
  add(head, await text(meta.summary, 'Body/Large/Regular', 'text/secondary', 'Summary', { w: 1040 }));
  const chips = frame('Meta', { dir: 'H', gap: 'space/200', pt: 'space/200' });
  add(head, chips);
  const labels = ['Status: Stable', 'Light + Dark', 'Comfortable + Compact', 'v' + DS_VERSION];
  for (let i = 0; i < labels.length; i++) {
    const c = frame('Chip', { dir: 'H', px: 'space/300', py: 'space/100', radius: 'radius/full', fill: i === 0 ? 'bg/success-subtle' : 'bg/neutral-subtle' });
    add(c, await text(labels[i], 'Label/Small', i === 0 ? 'text/success' : 'text/secondary'));
    add(chips, c);
  }
  return root;
}
async function section(root, title, desc) {
  const s = frame(title, { dir: 'V', gap: 'space/600' });
  add(root, s); fillW(s);
  const h = frame('Section header', { dir: 'V', gap: 'space/150', pb: 'space/400' });
  add(s, h); fillW(h); setSideStroke(h, 'border/default', 'bottom');
  add(h, await text(title, 'Heading/H2', 'text/primary', 'Section title'));
  if (desc) add(h, await text(desc, 'Body/Medium/Regular', 'text/secondary', 'Section description', { w: 960 }));
  const body = frame('Body', { dir: 'V', gap: 'space/600' });
  add(s, body); fillW(body);
  return body;
}
function card(name, o) {
  o = o || {};
  return frame(name, { dir: o.dir || 'V', gap: o.gap || 'space/300', p: o.p || 'space/600', fill: o.fill || 'bg/surface', stroke: 'border/default', radius: 'radius/xl' });
}
async function bullets(parent, items, iconName, color) {
  for (let i = 0; i < items.length; i++) {
    const row = frame('Item', { dir: 'H', gap: 'space/200', align: 'start' });
    add(parent, row); fillW(row);
    add(row, icon(iconName, 16, color));
    const t = await text(items[i], 'Body/Medium/Regular', 'text/secondary', 'Text');
    add(row, t); fillW(t);
  }
}
async function twoCards(body, a, b) {
  const row = frame('Row', { dir: 'H', gap: 'space/600', align: 'start' });
  add(body, row); fillW(row);
  const specs = [a, b];
  for (let i = 0; i < 2; i++) {
    const s = specs[i];
    const c = card(s.title);
    add(row, c); fillW(c);
    if (s.bar) { const bar = frame('Accent', { dir: 'H', h: 4, fill: s.bar, radius: 'radius/full' }); add(c, bar); fillW(bar); }
    add(c, await text(s.title, 'Heading/H5', 'text/primary'));
    await bullets(c, s.items, s.icon, s.color);
  }
}
async function usageSection(root, meta) {
  if (!meta.whenToUse) return;
  const body = await section(root, 'Usage', 'When to reach for this element — and when another element is a better fit.');
  await twoCards(body,
    { title: 'When to use', items: meta.whenToUse, icon: 'check-circle', color: 'icon/success' },
    { title: 'When not to use', items: meta.whenNot || [], icon: 'x-circle', color: 'icon/danger' });
}
async function anatomySection(root, meta) {
  if (!meta.anatomy) return;
  const body = await section(root, 'Anatomy', 'The parts that make up this element. Layer names in Figma match these names.');
  const c = card('Anatomy', { gap: 'space/300' });
  add(body, c); fillW(c);
  for (let i = 0; i < meta.anatomy.length; i++) {
    const row = frame('Part', { dir: 'H', gap: 'space/300', align: 'center' });
    const n = frame('Number', { dir: 'H', w: 24, h: 24, radius: 'radius/full', fill: 'bg/brand', justify: 'center', align: 'center' });
    add(n, await text(String(i + 1), 'Label/Small', 'text/on-brand'));
    add(row, n, await text(meta.anatomy[i], 'Body/Medium/Regular', 'text/primary'));
    add(c, row);
  }
}
async function dosSection(root, meta) {
  if (!meta.dos) return;
  const body = await section(root, 'Do & Don’t', 'Guidelines for designers and engineers.');
  await twoCards(body,
    { title: 'Do', items: meta.dos, icon: 'check', color: 'icon/success', bar: 'bg/success' },
    { title: 'Don’t', items: meta.donts || [], icon: 'x', color: 'icon/danger', bar: 'bg/danger' });
}
async function a11ySection(root, meta) {
  if (!meta.a11y) return;
  const body = await section(root, 'Accessibility', 'WCAG 2.2 AA requirements for this element.');
  const c = card('Accessibility');
  add(body, c); fillW(c);
  await bullets(c, meta.a11y, 'eye', 'icon/brand');
}
async function themePreview(body, fillFn, o) {
  o = o || {};
  const row = frame('Light & Dark', { dir: o.stack ? 'V' : 'H', gap: 'space/600', align: 'start' });
  add(body, row); fillW(row);
  const modes = S.hasDark ? ['Light', 'Dark'] : ['Light'];
  for (let i = 0; i < modes.length; i++) {
    const panel = frame(modes[i] + ' mode', { dir: 'V', gap: 'space/400', p: 'space/800', fill: o.panelFill || 'bg/canvas', stroke: 'border/default', radius: 'radius/xl' });
    add(row, panel); fillW(panel);
    setMode(panel, modes[i]);
    add(panel, await text(modes[i].toUpperCase() + ' MODE', 'Overline', 'text/tertiary', 'Mode label'));
    const c = frame('Content', { dir: o.contentDir || 'H', gap: 'space/400', wrap: o.contentDir !== 'V', align: o.contentAlign || 'center' });
    add(panel, c); fillW(c);
    await fillFn(c, modes[i]);
  }
  if (!S.hasDark) add(body, await text('Dark mode preview unavailable: this file’s plan supports one variable mode.', 'Body/Small/Regular', 'text/warning'));
}
function defaultPreview(sets, limit) {
  return async function (c) {
    sets.forEach(function (s) {
      comps(s).slice(0, limit || 64).forEach(function (k) { c.appendChild(k.createInstance()); });
    });
  };
}
async function propsTable(body, target) {
  const defs = target.componentPropertyDefinitions;
  const keys = Object.keys(defs);
  if (!keys.length) return;
  const t = frame(target.name + ' properties', { dir: 'V', fill: 'bg/surface', stroke: 'border/default', radius: 'radius/lg', clip: true });
  add(body, t); fillW(t);
  const cols = [['Property', 220], ['Type', 160], ['Values', null], ['Default', 240]];
  const row = async function (cells, header) {
    const r = frame(header ? 'Header' : 'Row', { dir: 'H', px: 'space/500', py: 'space/300', gap: 'space/400', fill: header ? 'bg/surface-sunken' : null });
    add(t, r); fillW(r); setSideStroke(r, 'border/subtle', 'bottom');
    for (let i = 0; i < cols.length; i++) {
      const tx = await text(cells[i], header ? 'Label/Small' : i === 0 ? 'Body/Medium/Medium' : i === 1 ? 'Code/Small' : 'Body/Medium/Regular', header ? 'text/secondary' : i === 0 ? 'text/primary' : 'text/secondary');
      add(r, tx);
      if (cols[i][1]) { tx.textAutoResize = 'HEIGHT'; tx.resize(cols[i][1], tx.height); } else fillW(tx);
    }
  };
  await row(['Property', 'Type', 'Values', 'Default'], true);
  for (let i = 0; i < keys.length; i++) {
    const d = defs[keys[i]];
    let values = d.type === 'VARIANT' ? (d.variantOptions || []).join('  ·  ') : d.type === 'BOOLEAN' ? 'true  ·  false' : d.type === 'TEXT' ? 'Any text' : 'Any icon component';
    let def = String(d.defaultValue);
    if (d.type === 'INSTANCE_SWAP') { const ic = Object.keys(S.icons).filter(function (k) { return S.icons[k].id === d.defaultValue; })[0]; def = ic ? 'Icon/' + ic : 'Icon'; }
    await row([keys[i].split('#')[0], d.type.replace('_', '-').toLowerCase(), values, def], false);
  }
  const cap = await text(target.name, 'Caption', 'text/tertiary', 'Caption');
  body.insertChild(body.children.indexOf(t), cap);
}
function collectTokens(nodes) {
  const vars = {}, styles = {};
  const walk = function (n) {
    const bv = n.boundVariables || {};
    Object.keys(bv).forEach(function (k) {
      const v = bv[k];
      (Array.isArray(v) ? v : [v]).forEach(function (a) { if (a && a.id && S.varName[a.id]) vars[S.varName[a.id]] = 1; });
    });
    ['fills', 'strokes'].forEach(function (f) {
      if (Array.isArray(n[f])) n[f].forEach(function (p) { if (p.boundVariables && p.boundVariables.color && S.varName[p.boundVariables.color.id]) vars[S.varName[p.boundVariables.color.id]] = 1; });
    });
    if (n.type === 'TEXT' && typeof n.textStyleId === 'string' && S.styleName[n.textStyleId]) styles[S.styleName[n.textStyleId]] = 1;
    if (typeof n.effectStyleId === 'string' && S.styleName[n.effectStyleId]) styles[S.styleName[n.effectStyleId]] = 1;
    if ('children' in n) n.children.forEach(walk);
  };
  nodes.forEach(walk);
  return { vars: Object.keys(vars).sort(), styles: Object.keys(styles).sort() };
}
async function tokenChips(body, sets) {
  const t = collectTokens(sets);
  const groups = [['Colour variables', t.vars.filter(function (v) { return !!S.sem[v]; })], ['Dimension variables', t.vars.filter(function (v) { return !!S.dim[v]; })], ['Styles', t.styles]];
  for (let g = 0; g < groups.length; g++) {
    if (!groups[g][1].length) continue;
    add(body, await text(groups[g][0], 'Heading/H5', 'text/primary'));
    const wrap = frame(groups[g][0], { dir: 'H', gap: 'space/200', wrap: true });
    add(body, wrap); fillW(wrap);
    for (let i = 0; i < groups[g][1].length; i++) {
      const name = groups[g][1][i];
      const chip = frame('Token', { dir: 'H', gap: 'space/150', px: 'space/200', py: 'space/100', radius: 'radius/sm', fill: 'bg/surface', stroke: 'border/default', align: 'center' });
      if (S.sem[name]) add(chip, dot(10, name));
      add(chip, await text(name, 'Code/Small', 'text/secondary'));
      add(wrap, chip);
    }
  }
}
/** Full documented page for one element. buildFn(variantsBody) → { sets, preview?, stack? } */
async function componentPage(docKey, pageName, buildFn) {
  const meta = DOCS[docKey];
  progress('Building ' + pageName + '…');
  await newPage(pageName);
  const root = await docRoot(meta);
  await usageSection(root, meta);
  await anatomySection(root, meta);
  const vb = await section(root, 'Variants', 'All variants are published as one component set — switch them from the right-hand Properties panel.');
  const res = await buildFn(vb, root);
  const sets = res.sets;
  const tb = await section(root, 'Light & Dark', 'Every layer is bound to semantic colour variables. The Dark panel only changes the variable mode (Appearance → Color → Dark) — there are no duplicate dark components.');
  await themePreview(tb, res.preview || defaultPreview(sets, res.limit), { stack: res.stack, contentDir: res.contentDir, contentAlign: res.contentAlign });
  const pb = await section(root, 'Properties', 'Generated from the component property definitions.');
  for (let i = 0; i < sets.length; i++) await propsTable(pb, sets[i]);
  await dosSection(root, meta);
  const kb = await section(root, 'Design tokens', 'Variables and styles referenced by this element — generated by scanning its layers.');
  await tokenChips(kb, sets);
  await a11ySection(root, meta);
  return root;
}
async function setLabel(parent, label) { add(parent, await text(label, 'Heading/H4', 'text/primary', 'Set label')); }
