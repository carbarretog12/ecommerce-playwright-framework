import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly tituloPagina: Locator;
  readonly botonAgregarBackpack: Locator;
  readonly iconoCarrito: Locator;
  readonly contadorCarrito: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tituloPagina = page.locator('.title'); 
    this.botonAgregarBackpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'); 
    this.iconoCarrito = page.locator('.shopping_cart_link');
    this.contadorCarrito = page.locator('.shopping_cart_badge');
  }

  async agregarBackpackAlCarrito() {
    await this.botonAgregarBackpack.click();
  }

  async irAlCarrito() {
    await this.iconoCarrito.click();
  }
}