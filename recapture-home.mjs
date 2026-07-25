import { chromium } from 'playwright';

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, locale: 'fa-IR' });

  // Enable console logging
  page.on('console', msg => console.log('BROWSER:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log('[*] Loading homepage...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Check page height
  const height = await page.evaluate(() => document.body.scrollHeight);
  console.log('[*] Page height:', height);

  // Scroll slowly to trigger lazy content
  console.log('[*] Scrolling...');
  for (let y = 0; y < height; y += 400) {
    await page.evaluate((scrollY) => window.scrollTo({ top: scrollY, behavior: 'instant' }), y);
    await page.waitForTimeout(500);
  }
  
  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2000);

  // Take full-page screenshot
  console.log('[*] Taking screenshot...');
  await page.screenshot({ path: './screenshots/01-homepage.png', fullPage: true });
  
  const finalHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log('[*] Final page height:', finalHeight);
  console.log('[✓] Done');
  
  await browser.close();
}

capture().catch(console.error);
