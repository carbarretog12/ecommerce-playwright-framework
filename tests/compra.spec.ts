import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import userData from '../data/users.json';

test.describe('Flujo de compras del E-Commerce', () => {
  
  // 0.1. Inicializar elementos para todos los test
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  // 0.2. HOOK
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.navigate();
    await loginPage.login(userData[0].username, userData[0].password);
  });

    // Test 1: Verificar contador de productos en el carrito.
  test('El carrito debe mostrar el número de items correctos', async () => {
    await inventoryPage.agregarBackpackAlCarrito();
    await expect(inventoryPage.contadorCarrito).toHaveText('1');
  });

  // Test 2: Agregar producto al carrito y compra
  test('El usuario debe poder comprar una mochila exitosamente', async ({ page }) => {
    await inventoryPage.agregarBackpackAlCarrito();
    await inventoryPage.irAlCarrito();

    await expect(page).toHaveURL(/cart.html/);
    await cartPage.irAlCheckout();

    await checkoutPage.llenarDatosEnvio('Carlos', 'Barreto', '110011');
    await checkoutPage.finalizarCompra();

    await expect(checkoutPage.mensajeExito).toBeVisible();
  });
});

//npx playwright test --project=chromium --headed ; Lanzar todos los test
//npx playwright test compra.spec.ts --project=chromium --headed ; Lanzar test actual
//npx playwright test compra.spec.ts --project=chromium --trace on ; trazabilidad a error en prueba colapsada