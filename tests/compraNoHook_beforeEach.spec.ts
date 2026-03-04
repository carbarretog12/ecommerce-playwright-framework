import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import userData from '../data/users.json';

test('Flujo E2E: El usuario debe poder comprar una mochila exitosamente', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Login
  await loginPage.navigate();
  await loginPage.login(userData.usuarioValido.username, userData.usuarioValido.password);

  // 2. Agregar al carrito e ir
  await inventoryPage.agregarBackpackAlCarrito();
  await inventoryPage.irAlCarrito(); // Clic en el icono del carrito

  // 3. Ir a pago
  await expect(page).toHaveURL(/cart.html/); // Validamos que estamos en el carrito
  await cartPage.irAlCheckout();

  // 4. Datos de cliente
  await checkoutPage.llenarDatosEnvio('Carlos', 'Barreto', '110011');
  await checkoutPage.finalizarCompra();

  // 5. Validar mensaje de acción exitosa
  await expect(checkoutPage.mensajeExito).toBeVisible();
});
//npx playwright test --project=chromium --headed ; Lanzar todos los test
//npx playwright test compraNoHook_beforeEach.spec.ts --project=chromium --headed ; Lanzar test actual