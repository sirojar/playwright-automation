import { ElementLocatorReader } from "../../utils/element-locator-reader.js";
import { WaitStrategy } from "../../utils/wait-strategy.js";

export class BaseActions extends ElementLocatorReader {
  constructor(page, elementsPath) {
    super(page, elementsPath);
    this.waitStrategy = new WaitStrategy(page, elementsPath);
  }

  async click(element, timeout) {
    const locator = await this.waitStrategy.waitForVisible(element, timeout);
    await locator.click();
  }

  async scroll(element, timeout) {
    const locator = await this.waitStrategy.waitForVisible(element, timeout);
    await locator.scrollIntoViewIfNeeded();
  }

  async getText(element, timeout) {
    const locator = await this.waitStrategy.waitForVisible(element, timeout);
    return await locator.textContent();
  }

  async inputValue(element, value, timeout) {
    const locator = await this.waitStrategy.waitForVisible(element, timeout);
    await locator.fill(value);
  }
}
