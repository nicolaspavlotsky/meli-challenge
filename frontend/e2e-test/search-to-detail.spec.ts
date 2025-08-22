import { test, expect } from "@playwright/test";

test.describe("Search to Detail Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("should complete full user journey from search to detail view", async ({
    page,
  }) => {
    const searchInput = page.getByRole("textbox", {
      name: /Buscar productos/,
    });

    await searchInput.fill("xiaomi");
    await searchInput.press("Enter");

    await page.waitForURL("http://localhost:5173/items?search=xiaomi");

    await page.waitForSelector('[data-testid="search-results"]');

    const itemsList = page.locator('[data-testid="items-list"]');
    const productItems = itemsList.locator('[data-testid^="product-item-"]');
    await expect(productItems).toHaveCount(3);

    const productTitles = page.locator('[data-testid="product-title"]');
    const titles = await productTitles.allTextContents();
    const hasXiaomiPoco = titles.some((title) =>
      title.includes("Xiaomi Pocophone Poco X7")
    );
    expect(hasXiaomiPoco).toBeTruthy();

    const xiaomiProduct = productTitles.filter({
      hasText: /xiaomi pocophone poco x7/i,
    });
    await xiaomiProduct.click();

    await page.waitForURL("http://localhost:5173/items/MLA46532054");

    const backLink = page.getByRole("link", { name: /Volver al listado/i });
    await expect(backLink).toBeVisible();

    const productTitle = page.getByRole("heading", {
      name: /xiaomi pocophone poco x7/i,
      level: 1,
    });
    await expect(productTitle).toBeVisible();

    const productImage = page.locator('[data-testid="product-image"]').first();
    await expect(productImage).toBeVisible();

    const conditionInfo = page.getByText(/Nuevo|Usado/);
    await expect(conditionInfo).toBeVisible();

    const soldQuantity = page.getByText(/\d+ vendidos/);
    await expect(soldQuantity).toBeVisible();

    const mainPriceElement = page.locator('[data-testid="price"]').first();
    await expect(mainPriceElement).toBeVisible();

    const descriptionTitle = page.getByRole("heading", {
      name: /Descripción/i,
      level: 2,
    });
    await expect(descriptionTitle).toBeVisible();

    const purchaseSection = page.locator(
      'section[aria-labelledby="purchase-section"]'
    );
    await expect(purchaseSection).toBeVisible();

    const purchasePriceElement = purchaseSection.locator(
      '[data-testid="price"]'
    );
    await expect(purchasePriceElement).toBeVisible();

    const buyNowButton = page.getByRole("button", { name: /Comprar ahora/i });
    await expect(buyNowButton).toBeVisible();

    const addToCartButton = page.getByRole("button", {
      name: /Agregar al carrito/i,
    });
    await expect(addToCartButton).toBeVisible();

    const quantitySelector = page.getByRole("button", {
      name: /Seleccionar cantidad/i,
    });
    await expect(quantitySelector).toBeVisible();

    const sellerInfo = page.getByText(/Vendido por/i);
    await expect(sellerInfo).toBeVisible();

    const paymentMethodsLink = page.getByRole("link", {
      name: /Ver medios de pago/i,
    });
    await expect(paymentMethodsLink).toBeVisible();
  });

  test("should show no results when searching for jackets", async ({
    page,
  }) => {
    const searchInput = page.getByRole("textbox", {
      name: /Buscar productos/,
    });

    await searchInput.fill("jackets");
    await searchInput.press("Enter");

    await page.waitForURL("http://localhost:5173/items?search=jackets");

    const status = page.getByText(/No se encontraron resultados/i);
    await expect(status).toBeVisible();
  });
});
