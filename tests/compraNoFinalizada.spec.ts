import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import userData from '../data/users.json';

test('El usuario debe poder agregar una mochila al carrito', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.navigate();
  await loginPage.login(userData.usuarioValido.username, userData.usuarioValido.password);
  await inventoryPage.agregarBackpackAlCarrito();

  // Validación: comprobar el incremento a 1 del contador de productos en carrito
  await expect(inventoryPage.contadorCarrito).toBeVisible();
  await expect(inventoryPage.contadorCarrito).toHaveText('1');
});
//npx playwright test --project=chromium --headed ; Lanzar todos los test
//npx playwright test compraNoFinalizada.spec.ts --project=chromium --headed ; Lanzar test actual