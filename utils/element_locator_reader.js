import { readFileSync } from 'fs';

const elements = JSON.parse(readFileSync('./locators/login.elements.json', 'utf-8'));

const selectorPriority = ['id', 'dataTest', 'css', 'class', 'xpath'];

export async function getLocator(page, name) {
    console.log(elements) 
  const el = elements[name];
  if (!el) throw new Error(`Element "${name}" not found in elements.json`);

  for (const key of selectorPriority) {
  const selector = el[key];
  if (!selector) continue;

  console.log(`🔎 Trying selector type: ${key} → ${selector}`);

  const locator = page.locator(selector);

  // Check if element exists before waiting
  const count = await locator.count();
  if (count === 0) {
    console.log(`❌ No elements found for ${key}, trying next...`);
    continue; // ✅ go to next selector immediately
  }

  // If element exists, wait briefly for visibility
  try {
    await locator.first().waitFor({ state: 'visible', timeout: 1000 });
    console.log(`✅ Found visible element using ${key}`);
    return locator.first();
  } catch {
    console.log(`⚠️ Element found but not visible with ${key}, trying next...`);
    continue;
  }
}

}
