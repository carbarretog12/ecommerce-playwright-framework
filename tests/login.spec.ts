import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// 0. Importar usuarios de prueba
import userData from '../data/users.json';

test('Debe permitir iniciar sesión con un usuario válido', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();

  // Test 1: usuario válido. 
  await loginPage.login(userData.usuarioValido.username, userData.usuarioValido.password);
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Debe mostrar error con un usuario bloqueado', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();

  // Test 2: usuario bloqueado. 
  await loginPage.login(userData.usuarioBloqueado.username, userData.usuarioBloqueado.password);

  // Validar mensaje de error para usuario bloqueado
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out');
});

test('Debe mostrar error de usuario inválido', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();

  // Test 2: usuario no válido. 
  await loginPage.login(userData.usuarioInvalido.username, userData.usuarioInvalido.password);

  // Validar mensaje de error para usuario no válido
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
});
//npx playwright codegen https://www.saucedemo.com/ ; Inspeccionar en el sitio las propiedades data-test
//npx playwright test --project=chromium --headed ; Lanzar todas las pruebas