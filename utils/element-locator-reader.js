import { readFileSync } from "fs";

export class ElementLocatorReader {
  constructor(page, elementsPath = "./locators/login.elements.json") {
    this.page = page;
    this.elements = JSON.parse(readFileSync(elementsPath, "utf-8"));
  }

  async getLocator(name) {
    const el = this.elements[name];
    if (!el) throw new Error(`Element "${name}" not found in elements.json`);

    const selectorPriority = [ "dataTest", "id", "css", "class", "xpath"];

    for (const key of selectorPriority) {
      const selector = el[key];
      if (!selector) continue;

      console.log(`🔎 Trying selector type: ${key} → ${selector}`);

      const locator = this.page.locator(selector);
      const count = await locator.count();

      if (count === 0) {
        console.log(`❌ No elements found for ${key}, trying next...`);
        continue;
      }

      try {
        await locator.first().waitFor({ state: "visible", timeout: 1000 });
        console.log(`✅ Found visible element using ${key}`);
        return locator.first();
      } catch {
        console.log(`⚠️ Element found but not visible with ${key}, trying next...`);
      }
    }

    throw new Error(`❌ No valid locator found for element "${name}"`);
  }
}
