# 🛒 E-Commerce Playwright Framework (E2E)

En este repositorio se puede encontrar un framework de automatización de pruebas End-to-End (E2E) con arquitectura profesional, y está diseñado para validar flujo de compras de un e-commerce.

## Patrones de diseño y arquitectura

El proyecto está estructurado bajo principios sólidos de ingeniería de software para asegurar escalabilidad, estabilidad y fácil mantenimiento:

* **Page Object Model (POM):** Separación entre la lógica testeo y la capa de interacción gráfica.
* **Data-Driven Testing (DDT):** Los datos de prueba (credenciales de usuario en escenarios válidos y no válidos) están desacoplados del código fuente y se inyectan dinámicamente mediante archivo JSON.
* **Integración Continua (CI/CD):** Configurado con **GitHub Actions** para ejecutar el set de pruebas automáticamente sobre servidores en la nube por cada actualización del código, actuando como un guardián de calidad.

## Stack Tecnológico

* **Motor de Pruebas:** Playwright
* **Lenguaje:** TypeScript / Node.js
* **Control de Versiones y Pipeline:** Git, GitHub Actions

## Cómo ejecutar el proyecto localmente

### 1. Clonar el repositorio y preparar el entorno
```bash
git clone https://github.com/carbarretog12/ecommerce-playwright-framework
cd ecommerce-playwright-framework
npm install
npx playwright install --with-deps
```
### 2. Ejecutar pruebas
Ejecutar en segundo plano, sin visualizacion (servidores o máxima velocidad)
```bash
npx playwright test
```
Para ejecutar visualizando interfaz gráfica
```bash
npx playwright test --headed
```
Para obtener un test que incluye un histórico visual de la ejecución (disponible solamente para pruebas fallidas):
```bash
npx playwright test --trace on
```

### 3. Diagnóstico
El framework generara un reporte HTML de la suite de pruebas.
```bash
npx playwright show-report
```
Si se lanzó la secuencia de pruebas con el argumento "--trace on", *Trace Viewer* (ícono de imagen en minitatura en el informe), permitirá recrear las pruebas fallidas para identificar las causas de los colapsos.