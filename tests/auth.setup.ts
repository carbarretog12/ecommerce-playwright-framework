import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import userData from '../data/users.json';

const authFile = 'playwright/.auth/user.json';

setup('Autenticación Global', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();

  await loginPage.login(userData[0].username, process.env.STANDARD_PASSWORD as string);

  // Validar que el login fue exitoso
  await expect(page).toHaveURL(/inventory.html/);
  // guardar autenticación(Cookies, LocalStorage)
  await page.context().storageState({ path: authFile });
});