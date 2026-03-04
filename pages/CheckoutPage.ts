import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly inputNombre: Locator;
  readonly inputApellido: Locator;
  readonly inputCodigoPostal: Locator;
  readonly botonContinuar: Locator;
  readonly botonFinalizar: Locator;
  readonly mensajeExito: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputNombre = page.locator('[data-test="firstName"]');
    this.inputApellido = page.locator('[data-test="lastName"]');
    this.inputCodigoPostal = page.locator('[data-test="postalCode"]');
    this.botonContinuar = page.locator('[data-test="continue"]');
    this.botonFinalizar = page.locator('[data-test="finish"]');
    
    // obtener mensaje de compra correcta con getByRole de Playwright
    this.mensajeExito = page.getByRole('heading', { name: 'Thank you for your order!' });
  }

  async llenarDatosEnvio(nombre: string, apellido: string, cp: string) {
    await this.inputNombre.fill(nombre);
    await this.inputApellido.fill(apellido);
    await this.inputCodigoPostal.fill(cp);
    await this.botonContinuar.click();
  }

  async finalizarCompra() {
    await this.botonFinalizar.click();
  }
}