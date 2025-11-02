import { ElementLocatorReader } from "./element-locator-reader.js";

export class WaitStrategy extends ElementLocatorReader {
  constructor(page, elementsPath) {
    super(page, elementsPath);
  }

  async #waitFor(element, state, timeout) {
    const locator = await this.getLocator(element);
    await locator.waitFor({ state, timeout });
    return locator;
  }

  async waitForVisible(element, timeout = 5000) {
    return this.#waitFor(element, "visible", timeout);
  }
}
