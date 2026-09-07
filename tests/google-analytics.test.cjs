const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

const source = readFileSync(path.join(__dirname, '../src/analytics/googleAnalytics.ts'), 'utf8');
// Supply Vite's build-time environment in a dependency-free mock browser.
const compiled = ts.transpileModule(source.replaceAll('import.meta.env', 'testEnvironment'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

function setup(hostname, environment = { PROD: true, MODE: 'production' }) {
  const scripts = [];
  const window = { location: { hostname } };
  const context = {
    exports: {}, window, testEnvironment: environment,
    document: {
      getElementById: (id) => scripts.find((script) => script.id === id),
      createElement: (tag) => { assert.equal(tag, 'script'); return {}; },
      head: { appendChild: (script) => scripts.push(script) },
    },
  };
  vm.runInNewContext(compiled, context);
  return { window, scripts, initialize: context.exports.initializeGoogleAnalytics };
}

for (const hostname of ['girlswhocodehunter.org', 'www.girlswhocodehunter.org']) {
  test(`initializes GA4 exactly once on ${hostname}`, () => {
    const { window, scripts, initialize } = setup(hostname);
    initialize();
    initialize();
    assert.equal(scripts.length, 1);
    assert.equal(scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-JPC9PNCJ87');
    assert.equal(scripts[0].async, true);
    assert.equal(typeof window.gtag, 'function');
    assert.equal(window.dataLayer.length, 2);
    assert.equal(Object.prototype.toString.call(window.dataLayer[0]), '[object Arguments]');
    assert.equal(window.dataLayer[0][0], 'js');
    assert.equal(Object.prototype.toString.call(window.dataLayer[0][1]), '[object Date]');
    assert.deepEqual(Array.from(window.dataLayer[1]), ['config', 'G-JPC9PNCJ87']);
  });
}

for (const hostname of [
  'localhost', '127.0.0.1', '[::1]', 'staging.girlswhocodehunter.org',
  'd123example.cloudfront.net', 'preview.example.com',
  'girlswhocodehunter.org.example.com', 'notgirlswhocodehunter.org',
  'www.girlswhocodehunter.org.example.com', 'girlswhocodehunter.org.', '',
]) {
  test(`loads no script or globals on disallowed hostname: ${hostname}`, () => {
    const { window, scripts, initialize } = setup(hostname);
    initialize();
    assert.equal(scripts.length, 0);
    assert.equal(window.dataLayer, undefined);
    assert.equal(window.gtag, undefined);
  });
}

for (const environment of [{ PROD: false, MODE: 'development' }, { PROD: true, MODE: 'test' }]) {
  test(`disables ${environment.MODE} even on the production hostname`, () => {
    const { window, scripts, initialize } = setup('girlswhocodehunter.org', environment);
    initialize();
    assert.equal(scripts.length, 0);
    assert.equal(window.dataLayer, undefined);
    assert.equal(window.gtag, undefined);
  });
}

test('preserves an existing data layer', () => {
  const { window, initialize } = setup('girlswhocodehunter.org');
  const existing = [];
  window.dataLayer = existing;
  initialize();
  assert.equal(window.dataLayer, existing);
});

test('does nothing without a browser', () => {
  const context = { exports: {}, testEnvironment: { PROD: true, MODE: 'production' } };
  vm.runInNewContext(compiled, context);
  assert.doesNotThrow(() => context.exports.initializeGoogleAnalytics());
});
