#!/usr/bin/env bun
import { chromium } from 'playwright';

const BASE = 'http://localhost:3030';
const arg = process.argv[2];

type Issue = { slide: number; kind: string; detail: string };

async function checkSlide(page: any, n: number): Promise<Issue[]> {
  const issues: Issue[] = [];
  const onConsole = (msg: any) => {
    if (msg.type() === 'error') {
      issues.push({ slide: n, kind: 'console.error', detail: msg.text() });
    }
  };
  const onPageError = (err: Error) => {
    issues.push({ slide: n, kind: 'pageerror', detail: err.message });
  };
  const onResponse = (resp: any) => {
    if (resp.status() >= 400) {
      issues.push({ slide: n, kind: `http ${resp.status()}`, detail: resp.url() });
    }
  };
  page.on('console', onConsole);
  page.on('pageerror', onPageError);
  page.on('response', onResponse);

  await page.goto(`${BASE}/${n}`, { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(500);

  page.off('console', onConsole);
  page.off('pageerror', onPageError);
  page.off('response', onResponse);
  return issues;
}

async function discoverTotal(page: any): Promise<number> {
  await page.goto(`${BASE}/1`, { waitUntil: 'networkidle', timeout: 15000 });
  const total = await page.evaluate(() => {
    const m = (document.body.innerText || '').match(/\/\s*(\d+)/);
    return m ? parseInt(m[1], 10) : 0;
  });
  return total || 50;
}

const browser = await chromium.launch();
const page = await browser.newPage();
const all: Issue[] = [];

try {
  if (arg) {
    const n = parseInt(arg, 10);
    all.push(...(await checkSlide(page, n)));
  } else {
    const total = await discoverTotal(page);
    for (let i = 1; i <= total; i++) {
      all.push(...(await checkSlide(page, i)));
    }
  }
} finally {
  await browser.close();
}

if (all.length === 0) {
  console.log(arg ? `PASS: slide ${arg}` : 'PASS: all slides');
  process.exit(0);
}
for (const it of all) {
  console.error(`FAIL slide ${it.slide} [${it.kind}] ${it.detail}`);
}
process.exit(1);
