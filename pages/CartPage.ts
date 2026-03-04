import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly botonCheckout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.botonCheckout = page.locator('[data-test="checkout"]');
  }

  async irAlCheckout() {
    await this.botonCheckout.click();
  }
}