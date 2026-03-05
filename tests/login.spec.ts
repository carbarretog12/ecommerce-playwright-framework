import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Importar usuarios de prueba
import usuariosData from '../data/users.json';

test.describe('Pruebas Dinámicas de Login (Data-Driven)', () => {

  // Playwright debe ignorar el sts de autenticado para esta sección, limpiar las cookies y empezar de cero
  test.use({ storageState: { cookies: [], origins: [] } });

  //Test para usuarios de archivo ../data/users.json
  for (const usuario of usuariosData) {

    test(`Intento de login con: ${usuario.id}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();
      
      // 1. Intento autenticación
      const password = usuario.esperaExito ? process.env.STANDARD_PASSWORD as string : usuario.password;
      await loginPage.login(usuario.username, password);

      // 2. Validación test según ajuste esperado
      if (usuario.esperaExito) {
        // Usuario presuntamente válido
        await expect(page).toHaveURL(/inventory.html/);
      } else {
        // Usuario presuntamente erroneo
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(usuario.mensajeError);
      }
    });

  }
});