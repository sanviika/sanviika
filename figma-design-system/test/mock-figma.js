// Minimal, strict mock of the Figma Plugin API used to smoke-test code.js in
// Node. It enforces the rules that most often break real plugins: FILL sizing
// needs an auto-layout parent, text needs loaded fonts, component property
// keys / variant combinations must exist, etc.
let uid = 1;
const nid = () => (uid++) + ':' + 1;
const loadedFonts = new Set();
const fontKey = (f) => f.family + '|' + f.style;
const registry = new Map();

class Node {
  constructor(type) {
    this.type = type; this.id = nid(); this.name = type; this.parent = null; this._pd = {};
    this.visible = true; this.x = 0; this.y = 0; this.width = 100; this.height = 100; this.rotation = 0;
    this.fills = []; this.strokes = []; this.effects = []; this.boundVariables = {};
    this._cpr = null; this.constraints = {};
    registry.set(this.id, this);
  }
  setPluginData(k, v) { this._pd[k] = v; } getPluginData(k) { return this._pd[k] || ''; }
  remove() { if (this.parent) { const i = this.parent.children.indexOf(this); this.parent.children.splice(i, 1); this.parent = null; } this.removed = true; }
  resize(w, h) { if (!(w >= 0.01) || !(h >= 0.01)) throw new Error('resize: invalid size ' + w + 'x' + h + ' on ' + this.name); this.width = w; this.height = h; }
  resizeWithoutConstraints(w, h) { this.resize(w, h); }
  rescale(s) { this.width *= s; this.height *= s; }
  setBoundVariable(field, v) { if (!v || !v.id) throw new Error('setBoundVariable: bad variable for ' + field); this.boundVariables[field] = { type: 'VARIABLE_ALIAS', id: v.id }; }
  setExplicitVariableModeForCollection(col, modeId) { if (!col || !modeId) throw new Error('bad mode'); this._modes = this._modes || {}; this._modes[col.id || col] = modeId; }
  async setEffectStyleIdAsync(id) { if (!registry.get(id)) throw new Error('bad effect style'); this.effectStyleId = id; }
  async setGridStyleIdAsync(id) { this.gridStyleId = id; }
  get componentPropertyReferences() { return this._cpr; }
  set componentPropertyReferences(v) {
    // must be inside a component (not inside a nested instance), keys must exist
    let p = this.parent, comp = null;
    while (p) { if (p.type === 'INSTANCE') throw new Error('Cannot reference props inside nested instance: ' + this.name); if (p.type === 'COMPONENT') { comp = p; break; } p = p.parent; }
    if (!comp) throw new Error('componentPropertyReferences outside component: ' + this.name);
    const defs = comp.parent && comp.parent.type === 'COMPONENT_SET' ? comp.parent._defs : comp._defs;
    Object.keys(v).forEach((k) => { if (!defs[v[k]]) throw new Error('Unknown property key ' + v[k] + ' on ' + this.name); });
    this._cpr = v;
  }
  set layoutSizingHorizontal(v) { this._sizing(v, 'H'); }
  get layoutSizingHorizontal() { return this._lsh || 'FIXED'; }
  set layoutSizingVertical(v) { this._sizing(v, 'V'); }
  get layoutSizingVertical() { return this._lsv || 'FIXED'; }
  _sizing(v, ax) {
    const parentAL = this.parent && this.parent.layoutMode && this.parent.layoutMode !== 'NONE';
    if (v === 'FILL' && !parentAL) throw new Error('FILL requires auto-layout parent: ' + this.name);
    if (v === 'HUG' && !((this.layoutMode && this.layoutMode !== 'NONE') || this.type === 'TEXT' || this.type === 'INSTANCE')) throw new Error('HUG only for auto-layout frames/text: ' + this.name);
    if (!parentAL && !(this.layoutMode && this.layoutMode !== 'NONE') && this.type !== 'TEXT') throw new Error('layoutSizing on non auto-layout node w/o AL parent: ' + this.name);
    if (ax === 'H') this._lsh = v; else this._lsv = v;
  }
  set layoutPositioning(v) { if (v === 'ABSOLUTE' && !(this.parent && this.parent.layoutMode && this.parent.layoutMode !== 'NONE')) throw new Error('ABSOLUTE needs AL parent'); this._lp = v; }
  get layoutPositioning() { return this._lp || 'AUTO'; }
  clone() {
    const c = new (this.constructor)(this.type);
    Object.keys(this).forEach((k) => { if (['id', 'parent', 'children', '_defs'].indexOf(k) < 0) c[k] = this[k]; });
    c.id = nid(); registry.set(c.id, c);
    if (this.children) { c.children = []; this.children.forEach((k) => c.appendChild(k.clone())); }
    if (this._defs) c._defs = JSON.parse(JSON.stringify(this._defs));
    if (this.parent) this.parent.appendChild(c);
    return c;
  }
}
class Parent extends Node {
  constructor(t) { super(t); this.children = []; this.layoutMode = 'NONE'; }
  appendChild(n) { if (!n) throw new Error('appendChild(null)'); if (n === this) throw new Error('self append'); if (n.parent) n.remove(); n.removed = false; n.parent = this; this.children.push(n); }
  insertChild(i, n) { if (n.parent) n.remove(); n.parent = this; this.children.splice(i, 0, n); }
  findAll(pred) { const out = []; const w = (n) => { (n.children || []).forEach((c) => { if (!pred || pred(c)) out.push(c); w(c); }); }; w(this); return out; }
  findOne(pred) { return this.findAll(pred)[0] || null; }
}
class Frame extends Parent {
  constructor(t) { super(t || 'FRAME'); this.itemSpacing = 0; }
  set layoutWrap(v) { if (v === 'WRAP' && this.layoutMode !== 'HORIZONTAL') throw new Error('wrap needs HORIZONTAL'); this._wrap = v; }
  get layoutWrap() { return this._wrap || 'NO_WRAP'; }
}
class Component extends Frame {
  constructor() { super('COMPONENT'); this._defs = {}; this.key = 'key' + this.id; this.description = ''; }
  get componentPropertyDefinitions() { return this._defs; }
  addComponentProperty(name, type, def, opts) {
    if (this.parent && this.parent.type === 'COMPONENT_SET') throw new Error('Add props on the set, not variant');
    return addProp(this, name, type, def);
  }
  createInstance() { return makeInstance(this); }
}
function addProp(owner, name, type, def) {
  if (['TEXT', 'BOOLEAN', 'INSTANCE_SWAP'].indexOf(type) < 0) throw new Error('bad prop type');
  if (type === 'INSTANCE_SWAP' && !(registry.get(def) && registry.get(def).type === 'COMPONENT')) throw new Error('INSTANCE_SWAP default must be component id');
  if (type === 'BOOLEAN' && typeof def !== 'boolean') throw new Error('BOOLEAN default must be boolean');
  const key = name + '#' + (uid++) + ':0';
  owner._defs[key] = { type: type, defaultValue: def };
  return key;
}
class ComponentSet extends Parent {
  constructor() { super('COMPONENT_SET'); this._defs = {}; this.description = ''; }
  get componentPropertyDefinitions() {
    const out = Object.assign({}, this._defs);
    const opts = {};
    this.children.forEach((c) => c.name.split(', ').forEach((kv) => { const [k, v] = kv.split('='); (opts[k] = opts[k] || []).indexOf(v) < 0 && opts[k].push(v); }));
    Object.keys(opts).forEach((k) => { out[k] = { type: 'VARIANT', defaultValue: opts[k][0], variantOptions: opts[k] }; });
    return out;
  }
  get defaultVariant() { return this.children[0]; }
  addComponentProperty(name, type, def) { return addProp(this, name, type, def); }
}
class Instance extends Parent {
  constructor() { super('INSTANCE'); }
  get componentProperties() {
    const main = this._main; const set = main.parent && main.parent.type === 'COMPONENT_SET' ? main.parent : null;
    const defs = set ? set.componentPropertyDefinitions : main._defs;
    const out = {};
    Object.keys(defs).forEach((k) => { out[k] = { type: defs[k].type, value: (this._vals && k in this._vals) ? this._vals[k] : defs[k].defaultValue }; });
    if (set) main.name.split(', ').forEach((kv) => { const [k, v] = kv.split('='); out[k] = { type: 'VARIANT', value: v }; });
    return out;
  }
  setProperties(obj) {
    const cur = this.componentProperties;
    let variantChange = null;
    Object.keys(obj).forEach((k) => {
      if (!cur[k]) throw new Error('Unknown property ' + k + ' on instance ' + this.name);
      if (cur[k].type === 'VARIANT') { variantChange = variantChange || {}; variantChange[k] = obj[k]; }
      else if (cur[k].type === 'BOOLEAN' && typeof obj[k] !== 'boolean') throw new Error('bool expected for ' + k);
      else if (cur[k].type === 'INSTANCE_SWAP' && !(registry.get(obj[k]) && registry.get(obj[k]).type === 'COMPONENT')) throw new Error('swap needs component id: ' + k);
      else if (cur[k].type === 'TEXT' && typeof obj[k] !== 'string') throw new Error('text expected for ' + k);
      else { this._vals = this._vals || {}; this._vals[k] = obj[k]; }
    });
    if (variantChange) {
      const set = this._main.parent;
      const want = {}; this._main.name.split(', ').forEach((kv) => { const [k, v] = kv.split('='); want[k] = v; });
      Object.assign(want, variantChange);
      const target = set.children.find((c) => c.name.split(', ').every((kv) => { const [k, v] = kv.split('='); return want[k] === v; }));
      if (!target) throw new Error('No variant ' + JSON.stringify(want) + ' in ' + set.name);
      this.swapComponent(target);
    }
  }
  swapComponent(c) { const w = this.width, h = this.height; this._main = c; this.children.slice().forEach((k) => k.remove()); c.children.forEach((k) => this.appendChild(k.clone())); this.width = c.width; this.height = c.height; this.layoutMode = c.layoutMode; }
  async getMainComponentAsync() { return this._main; }
  detachInstance() { const f = new Frame(); f.name = this.name; this.children.slice().forEach((k) => f.appendChild(k)); if (this.parent) { this.parent.appendChild(f); this.remove(); } return f; }
  set isExposedInstance(v) { let p = this.parent; while (p && p.type !== 'COMPONENT') { if (p.type === 'INSTANCE') throw new Error('expose: nested deeper'); p = p.parent; } if (!p) throw new Error('isExposedInstance outside component'); this._exp = v; }
}
function makeInstance(comp) {
  if (comp.removed) throw new Error('instance of removed component');
  const i = new Instance(); i.name = comp.name; i._main = comp; i.width = comp.width; i.height = comp.height; i.layoutMode = comp.layoutMode;
  comp.children.forEach((k) => i.appendChild(k.clone()));
  return i;
}
class Text extends Node {
  constructor() { super('TEXT'); this._chars = ''; this.fontName = { family: 'Inter', style: 'Regular' }; this.fontSize = 12; this.textAutoResize = 'WIDTH_AND_HEIGHT'; }
  get characters() { return this._chars; }
  set characters(v) { if (!loadedFonts.has(fontKey(this.fontName))) throw new Error('Font not loaded: ' + fontKey(this.fontName)); if (typeof v !== 'string') throw new Error('chars must be string'); this._chars = v; }
  async setTextStyleIdAsync(id) { const s = registry.get(id); if (!s) throw new Error('bad text style'); if (!loadedFonts.has(fontKey(s.fontName))) throw new Error('style font not loaded'); this.textStyleId = id; this.fontName = s.fontName; }
}
class Style { constructor(type) { this.type = type; this.id = 'S:' + (uid++); this._pd = {}; registry.set(this.id, this); this.boundVariables = {}; }
  setPluginData(k, v) { this._pd[k] = v; } getPluginData(k) { return this._pd[k] || ''; } remove() { this.removed = true; }
  setBoundVariable(f, v) { if (!v) throw new Error('bad var'); this.boundVariables[f] = v.id; }
  set fontName(f) { if (!loadedFonts.has(fontKey(f))) throw new Error('Style font not loaded ' + fontKey(f)); this._fn = f; } get fontName() { return this._fn; } }

// ---------------------------------------------------------------- variables
class Collection { constructor(name, maxModes) { this.id = 'VC:' + (uid++); this.name = name; this.modes = [{ modeId: 'm' + (uid++), name: 'Mode 1' }]; this._pd = {}; this._max = maxModes; }
  renameMode(id, n) { this.modes.find((m) => m.modeId === id).name = n; }
  addMode(n) { if (this.modes.length >= this._max) throw new Error('Mode limit'); const id = 'm' + (uid++); this.modes.push({ modeId: id, name: n }); return id; }
  setPluginData(k, v) { this._pd[k] = v; } getPluginData(k) { return this._pd[k] || ''; } remove() { this.removed = true; } }
class Variable { constructor(name, col, type) { if (!col || !col.modes) throw new Error('createVariable needs collection object'); this.id = 'V:' + (uid++); this.name = name; this.resolvedType = type; this.valuesByMode = {}; this.scopes = []; this.collection = col; registry.set(this.id, this); }
  setValueForMode(m, v) { if (!this.collection.modes.find((x) => x.modeId === m)) throw new Error('bad mode'); if (this.resolvedType === 'COLOR' && !(v.type === 'VARIABLE_ALIAS' || ('r' in v))) throw new Error('bad color value ' + JSON.stringify(v)); this.valuesByMode[m] = v; }
  setVariableCodeSyntax() {} setPluginData() {} }

function createMock(opts) {
  opts = opts || {};
  const pages = [];
  const root = new Parent('DOCUMENT'); root.children = pages;
  const newPage = () => { const p = new Parent('PAGE'); p.name = 'Page'; p.parent = root; pages.push(p); p.remove = function () { if (figma.currentPage === p) throw new Error('cannot remove current page'); pages.splice(pages.indexOf(p), 1); }; return p; };
  const first = newPage(); first.name = 'Page 1';
  const collections = [], textStyles = [], effectStyles = [], gridStyles = [];
  const messages = [];
  const figma = {
    root: root, currentPage: first, messages: messages,
    createPage() { return newPage(); },
    async setCurrentPageAsync(p) { figma.currentPage = p; },
    async loadAllPagesAsync() {},
    async loadFontAsync(f) { if (opts.missingFonts && opts.missingFonts.indexOf(f.family) >= 0) throw new Error('missing font'); loadedFonts.add(fontKey(f)); },
    createFrame() { const f = new Frame(); figma.currentPage.appendChild(f); return f; },
    createComponent() { const c = new Component(); figma.currentPage.appendChild(c); return c; },
    createText() { const t = new Text(); figma.currentPage.appendChild(t); return t; },
    createEllipse() { const n = new Node('ELLIPSE'); figma.currentPage.appendChild(n); return n; },
    createPolygon() { const n = new Node('POLYGON'); figma.currentPage.appendChild(n); return n; },
    createRectangle() { const n = new Node('RECTANGLE'); figma.currentPage.appendChild(n); return n; },
    createNodeFromSvg(svg) { if (svg.indexOf('<svg') !== 0) throw new Error('bad svg'); const f = new Frame(); figma.currentPage.appendChild(f); const n = (svg.match(/<(path|circle|rect)/g) || []).length; for (let i = 0; i < n; i++) { const v = new Node('VECTOR'); v.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }]; f.appendChild(v); } return f; },
    flatten(nodes, parent) { const v = new Node('VECTOR'); v.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }]; nodes.slice().forEach((n) => n.remove()); parent.appendChild(v); return v; },
    combineAsVariants(nodes, parent) {
      const names = new Set();
      nodes.forEach((n) => { if (n.type !== 'COMPONENT') throw new Error('combine: not component'); if (names.has(n.name)) throw new Error('duplicate variant ' + n.name); names.add(n.name); });
      const s = new ComponentSet(); nodes.forEach((n) => s.appendChild(n)); parent.appendChild(s); return s;
    },
    createComponentFromNode(n) { if (n.findAll && n.findAll((k) => k.type === 'COMPONENT').length) throw new Error('contains components'); const c = new Component(); const p = n.parent; c.name = n.name; (n.children || []).slice().forEach((k) => c.appendChild(k)); if (p) p.appendChild(c); n.remove(); return c; },
    createTextStyle() { const s = new Style('TEXT'); textStyles.push(s); return s; },
    createEffectStyle() { const s = new Style('EFFECT'); effectStyles.push(s); return s; },
    createGridStyle() { const s = new Style('GRID'); gridStyles.push(s); return s; },
    async getLocalTextStylesAsync() { return textStyles; }, async getLocalEffectStylesAsync() { return effectStyles; }, async getLocalGridStylesAsync() { return gridStyles; },
    async getNodeByIdAsync(id) { return registry.get(id) || null; },
    async setFileThumbnailNodeAsync() {},
    notify(m) { messages.push('notify: ' + m); },
    showUI() {}, closePlugin() {},
    ui: { postMessage(m) { messages.push(m); }, onmessage: null },
    viewport: { scrollAndZoomIntoView() {} },
    variables: {
      createVariableCollection(n) { const c = new Collection(n, opts.maxModes || 4); collections.push(c); return c; },
      createVariable(n, c, t) { return new Variable(n, c, t); },
      createVariableAlias(v) { if (!v) throw new Error('alias of undefined'); return { type: 'VARIABLE_ALIAS', id: v.id }; },
      setBoundVariableForPaint(p, f, v) { if (!v) throw new Error('paint bind: undefined variable'); return Object.assign({}, p, { boundVariables: { color: { type: 'VARIABLE_ALIAS', id: v.id } } }); },
      setBoundVariableForEffect(e, f, v) { if (!v) throw new Error('effect bind: undefined'); return Object.assign({}, e, { boundVariables: { color: { type: 'VARIABLE_ALIAS', id: v.id } } }); },
      async getLocalVariableCollectionsAsync() { return collections; },
    },
  };
  return { figma, registry, newPage, pages };
}
module.exports = { createMock, Frame, Text, Node };
