// ============================================================================
//  MAIN — UI wiring, clean-up, and the build pipeline.
// ============================================================================

async function cleanup() {
  progress('Removing previous build…');
  try { await figma.loadAllPagesAsync(); } catch (e) { /* older API */ }
  const pages = figma.root.children.filter(function (p) { return p.getPluginData(MARK) === '1'; });
  if (pages.length) {
    let keep = figma.root.children.filter(function (p) { return pages.indexOf(p) < 0; })[0];
    if (!keep) { keep = figma.createPage(); keep.name = 'Page 1'; }
    await figma.setCurrentPageAsync(keep);
    pages.forEach(function (p) { try { p.remove(); } catch (e) { warn('Could not remove page ' + p.name); } });
  }
  const cols = await figma.variables.getLocalVariableCollectionsAsync();
  cols.forEach(function (c) {
    let marked = false; try { marked = c.getPluginData(MARK) === '1'; } catch (e) { marked = ['Primitives', 'Color', 'Dimensions', 'Typography'].indexOf(c.name) >= 0; }
    if (marked) c.remove();
  });
  const styles = [].concat(await figma.getLocalTextStylesAsync(), await figma.getLocalEffectStylesAsync(), await figma.getLocalGridStylesAsync());
  styles.forEach(function (s) { if (s.getPluginData(MARK) === '1') s.remove(); });
}

async function hasExistingBuild() {
  try { await figma.loadAllPagesAsync(); } catch (e) { /* older API */ }
  return figma.root.children.some(function (p) { return p.getPluginData(MARK) === '1'; });
}

async function step(label, fn) {
  try { await fn(); } catch (e) {
    S.errors.push(label + ': ' + (e && e.message ? e.message : e));
    console.error('[Northstar] ' + label, e);
  }
}

async function generate(opts) {
  opts = opts || {};
  const t0 = Date.now();
  resetState();
  if (opts.rebuild) await cleanup();
  else if (await hasExistingBuild()) {
    figma.ui.postMessage({ type: 'done', ok: false, summary: 'A ' + DS_NAME + ' build already exists in this file. Tick “Rebuild” to replace it.' });
    return;
  }

  // 1. Source analysis (brand colour, font, palette) --------------------------
  S.source = opts.useSource ? await analyzeSource((opts.sourceId || '').trim().replace('-', ':')) : null;
  S.prims = JSON.parse(JSON.stringify(PRIMITIVES));
  const override = (opts.brandHex || '').trim();
  if (/^#?[0-9a-fA-F]{6}$/.test(override)) {
    S.prims.brand = generateRamp(override.charAt(0) === '#' ? override : '#' + override);
  } else if (S.source && S.source.brand) {
    S.prims.brand = generateRamp(S.source.brand);
    S.source.brandFromSource = true;
  }

  // 2. Tokens -------------------------------------------------------------------
  await loadFonts();
  await buildVariables();
  await buildStyles();

  // 3. Pages ----------------------------------------------------------------------
  const cover = await newPage('📘 Cover');
  buildIconComponents();
  await step('Getting started', buildGettingStarted);

  await separator();
  await step('Colour', buildColours);
  await step('Typography', buildTypography);
  await step('Spacing', buildSpacing);
  await step('Radius', buildRadius);
  await step('Elevation', buildElevation);
  await step('Grid', buildGrid);
  await step('Iconography', buildIconPage);

  await separator();
  const atoms = [buildButton, buildIconButton, buildInput, buildTextarea, buildCheckbox, buildRadio, buildToggle, buildBadge, buildTag, buildAvatar, buildTooltip, buildLink, buildDivider, buildSpinner, buildProgress];
  for (let i = 0; i < atoms.length; i++) await step(atoms[i].name, atoms[i]);

  await separator();
  const molecules = [buildMenu, buildSelect, buildFormField, buildSearch, buildTabs, buildBreadcrumb, buildPagination, buildAlert, buildToast, buildStatCard, buildNavItem, buildTable, buildCard, buildEmptyState];
  for (let i = 0; i < molecules.length; i++) await step(molecules[i].name, molecules[i]);

  await separator();
  const organisms = [buildTopNav, buildSidebar, buildPageHeader, buildKpi, buildFilterBar, buildDataTable, buildModal, buildFormSection];
  for (let i = 0; i < organisms.length; i++) await step(organisms[i].name, organisms[i]);
  if (opts.useSource) await step('Source import', buildSourceImport);

  if (opts.templates !== false) { await separator(); await step('Templates', buildTemplates); }

  await separator();
  await step('Changelog', buildChangelog);
  await step('Cover', function () { return buildCover(cover); });

  await figma.setCurrentPageAsync(cover);
  figma.viewport.scrollAndZoomIntoView(cover.children);

  const secs = Math.round((Date.now() - t0) / 1000);
  const summary = [
    DS_NAME + ' ' + DS_VERSION + ' generated in ' + secs + 's.',
    S.stats.pages + ' pages · ' + S.stats.components + ' components · ' + S.stats.variants + ' variants',
    S.stats.variables + ' variables · ' + S.stats.textStyles + ' text styles · ' + S.stats.effectStyles + ' effect styles',
    'Dark mode: ' + (S.hasDark ? 'yes' : 'no (plan limit)') + ' · Compact density: ' + (S.hasCompact ? 'yes' : 'no'),
    S.source ? (S.source.found ? 'Source “' + S.source.name + '”: ' + S.stats.imported + ' organisms imported, ' + S.stats.bindings + ' token bindings' + (S.source.brandFromSource ? ', brand ' + S.source.brand : '') : 'Source node not found in this file.') : 'Source import skipped.',
  ];
  figma.ui.postMessage({ type: 'done', ok: S.errors.length === 0, summary: summary.join('\n'), errors: S.errors, warnings: S.warnings.slice(0, 40) });
  figma.notify('✅ ' + DS_NAME + ' design system generated');
}

if (typeof figma !== 'undefined') {
  figma.showUI(__html__, { width: 400, height: 600, themeColors: true });
  figma.ui.onmessage = function (msg) {
    if (msg.type === 'generate') {
      generate(msg.options).catch(function (e) {
        figma.ui.postMessage({ type: 'done', ok: false, summary: 'Failed: ' + (e && e.message ? e.message : e), errors: S.errors, warnings: S.warnings });
      });
    }
    if (msg.type === 'close') figma.closePlugin();
  };
}
