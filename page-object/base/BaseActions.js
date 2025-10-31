import { getLocator } from "../../utils/element-locator-reader.js";

export class BaseActions {
  constructor(page) {
    this.page = page;
  }

  /**
   * Private helper to get locator.
   * @param {string} element - key from JSON locator file
   */
  async #get(element) {
    return await getLocator(this.page, element);
  }

  /**
   * Private helper to wait for element to reach a given state before interacting.
   * @param {string} element
   * @param {string} [state='visible'] - 'visible', 'attached', 'detached', 'hidden'
   * @param {number} [timeout=5000]
   */
  async #waitFor(element, state = 'visible', timeout = 5000) {
    const locator = await this.#get(element);
    await locator.waitFor({ state, timeout });
    return locator;
  }

  /**
   * Click on element after waiting for visibility.
   */
  async click(element, options = {}) {
    const locator = await this.#waitFor(element, options.state || 'visible', options.timeout || 5000);
    await locator.click();
  }

  /**
   * Scroll to element after waiting for visibility.
   */
  async scroll(element, options = {}) {
    const locator = await this.#waitFor(element, options.state || 'visible', options.timeout || 5000);
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Get text content after waiting for visibility.
   */
  async getText(element, options = {}) {
    const locator = await this.#waitFor(element, options.state || 'visible', options.timeout || 5000);
    return await locator.textContent();
  }

  /**
   * Type text into field after waiting for visibility.
   */
  async inputValue(element, value, options = {}) {
    const locator = await this.#waitFor(element, options.state || 'visible', options.timeout || 5000);
    await locator.fill(value);
  }
}
