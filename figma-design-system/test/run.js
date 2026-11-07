// Smoke test: runs the full plugin bundle against the strict mock.
//   node test/run.js            → with a fake source node (brand + organisms)
//   node test/run.js --free     → simulate a 1-mode (Starter) plan
const fs = require('fs');
const path = require('path');
const { createMock, Frame, Text } = require('./mock-figma');

async function run(label, opts) {
  const m = createMock(opts);
  const figma = m.figma;
  // Fake source node 6349:84202 on another page: a section-like frame with two organisms.
  const srcPage = m.newPage(); srcPage.name = 'Product screens';
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  const src = new Frame(); src.name = 'B2B screens'; src.width = 2000; srcPage.appendChild(src);
  m.registry.set('6349:84202', src); src.id = '6349:84202';
  ['Header', 'Invoice table'].forEach((n, i) => {
    const f = new Frame(); f.name = n; f.width = 900; f.fills = [{ type: 'SOLID', color: { r: 0.15, g: 0.39, b: 0.92 } }];
    const t = new Text(); t.characters = 'Hello'; t.fontSize = 14; t.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.1 } }];
    f.appendChild(t); src.appendChild(f);
  });
  global.figma = figma;
  global.__html__ = '';
  const code = fs.readFileSync(path.join(__dirname, '..', 'code.js'), 'utf8');
  // eslint-disable-next-line no-new-func
  new Function(code)();
  const done = new Promise((resolve) => {
    const orig = figma.ui.postMessage;
    figma.ui.postMessage = (msg) => { orig(msg); if (msg.type === 'done') resolve(msg); };
  });
  figma.ui.onmessage({ type: 'generate', options: { sourceId: opts.sourceId || '6349-84202', useSource: true, templates: true, rebuild: false } });
  let res = await done;
  if (opts.rebuildPass) {
    const again = new Promise((resolve) => { const o = figma.ui.postMessage; figma.ui.postMessage = (msg) => { o(msg); if (msg.type === 'done') resolve(msg); }; });
    figma.ui.onmessage({ type: 'generate', options: { sourceId: opts.sourceId || '6349-84202', useSource: true, templates: true, rebuild: true } });
    res = await again;
  }
  console.log('\n=== ' + label + ' ===');
  console.log(res.summary);
  console.log('errors:', res.errors.length); res.errors.forEach((e) => console.log('  ✖', e));
  console.log('warnings:', (res.warnings || []).length); (res.warnings || []).slice(0, 25).forEach((w) => console.log('  ⚠', w));
  console.log('pages:', figma.root.children.map((p) => p.name).join(' | '));
  return res;
}
(async () => {
  const a = await run('Professional plan', {});
  const b = await run('Starter plan (1 mode)', { maxModes: 1 });
  const c = await run('Rebuild twice + missing source node', { rebuildPass: true, sourceId: '1:999999' });
  process.exit(a.errors.length || b.errors.length || c.errors.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
