import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Detail from "../Detail";
import type { ItemDetail } from "@/pages/Items/ItemsPage.models";
import { Condition } from "@/pages/Items/ItemsPage.models";

vi.mock("../../List/ListItem/ListItemPrice", () => ({
  default: ({ price, currency, decimals, big }: any) => (
    <div data-testid="list-item-price" data-big={big || false}>
      {currency} {price}.{decimals}
    </div>
  ),
}));

vi.mock("../../common/Button/Button", () => ({
  default: ({ label, secondary }: any) => (
    <button data-testid="button" data-secondary={secondary || false}>
      {label}
    </button>
  ),
}));

vi.mock("../../common/Breadcrumbs/Breadcrumbs", () => ({
  default: ({ breadcrumbs, useLinkColor }: any) => (
    <nav data-testid="breadcrumbs" data-use-link-color={useLinkColor}>
      {breadcrumbs.map((breadcrumb: any, index: number) => (
        <a
          key={index}
          href={breadcrumb.link}
          data-testid={`breadcrumb-${index}`}
        >
          {breadcrumb.label}
        </a>
      ))}
    </nav>
  ),
}));

vi.mock("../Detail.module.scss", () => ({
  default: {
    breadcrumbs: "breadcrumbs-class",
    link: "link-class",
    separator: "separator-class",
    detail: "detail-class",
    info: "info-class",
    image: "image-class",
    info_details: "info-details-class",
    condition: "condition-class",
    title: "title-class",
    price_without_tax: "price-without-tax-class",
    payment_methods: "payment-methods-class",
    color: "color-class",
    color_image: "color-image-class",
    purchase: "purchase-class",
    purchase_tag: "purchase-tag-class",
    arrival: "arrival-class",
    stock_available: "stock-available-class",
    pick_amount: "pick-amount-class",
    pick_amount_label: "pick-amount-label-class",
    pick_amount_dropdown: "pick-amount-dropdown-class",
    pick_amount_stock: "pick-amount-stock-class",
    purchase_buttons: "purchase-buttons-class",
    sold_by: "sold-by-class",
    sold_by_number: "sold-by-number-class",
    sold_invoice: "sold-invoice-class",
    metadata: "metadata-class",
    description: "description-class",
    description_info: "description-info-class",
    description_label: "description-label-class",
    description_text: "description-text-class",
  },
}));

vi.mock("@/routing/routes", () => ({
  APP_ROUTES: {
    items: "/items",
  },
}));

vi.mock("../../List/List.utils", () => ({
  formatPrice: (price: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price),
}));

vi.mock("../../List/List.constants", () => ({
  Currency: {
    ARS: "ARS",
    USD: "USD",
  },
}));

vi.mock("react-icons/bi", () => ({
  BiChevronDown: () => <span data-testid="chevron-down-icon">▼</span>,
}));

const mockHistoryBack = vi.fn();
Object.defineProperty(window, "history", {
  value: {
    back: mockHistoryBack,
  },
  writable: true,
});

const mockItem: ItemDetail = {
  id: "MLA123456789",
  title: "Test Product Title",
  price: {
    currency: "ARS",
    amount: 15000,
    decimals: 99,
  },
  picture: "https://example.com/test-image.jpg",
  free_shipping: true,
  categories: ["Electronics", "Smartphones", "iPhone"],
  sold_quantity: 150,
  description: "This is a test product description for testing purposes.",
  condition: Condition.new,
};

const mockUsedItem: ItemDetail = {
  ...mockItem,
  condition: Condition.used,
  price: {
    currency: "USD",
    amount: 500,
    decimals: 0,
  },
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe("Detail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("DetailBreadcrumbs", () => {
    it("renders breadcrumbs with back link and categories", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const backLink = screen.getByText("Volver al listado");
      expect(backLink).toBeInTheDocument();
      expect(backLink).toHaveClass("link-class", "link");

      expect(screen.getByText("|")).toBeInTheDocument();
      expect(screen.getByText("|")).toHaveClass("separator-class");

      const breadcrumbs = screen.getByTestId("breadcrumbs");
      expect(breadcrumbs).toBeInTheDocument();
      expect(breadcrumbs).toHaveAttribute("data-use-link-color", "true");

      expect(screen.getByTestId("breadcrumb-0")).toHaveTextContent(
        "Electronics"
      );
      expect(screen.getByTestId("breadcrumb-0")).toHaveAttribute(
        "href",
        "/items?search=Electronics"
      );
      expect(screen.getByTestId("breadcrumb-1")).toHaveTextContent(
        "Smartphones"
      );
      expect(screen.getByTestId("breadcrumb-1")).toHaveAttribute(
        "href",
        "/items?search=Smartphones"
      );
      expect(screen.getByTestId("breadcrumb-2")).toHaveTextContent("iPhone");
      expect(screen.getByTestId("breadcrumb-2")).toHaveAttribute(
        "href",
        "/items?search=iPhone"
      );
    });

    it("calls window.history.back when back link is clicked", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const backLink = screen.getByText("Volver al listado");
      fireEvent.click(backLink);

      expect(mockHistoryBack).toHaveBeenCalledTimes(1);
    });
  });

  describe("DetailMetadataInfo", () => {
    it("renders product image with correct attributes", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const images = screen.getAllByRole("img");
      const mainImage = images[0];

      expect(mainImage).toBeInTheDocument();
      expect(mainImage).toHaveAttribute(
        "src",
        "https://example.com/test-image.jpg"
      );
      expect(mainImage).toHaveAttribute("alt", "Test Product Title");
    });

    it("renders condition and sold quantity for new item", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const conditionText = screen.getByText("Nuevo | 150 vendidos");
      expect(conditionText).toBeInTheDocument();
      expect(conditionText).toHaveClass("condition-class");
    });

    it("renders condition and sold quantity for used item", () => {
      renderWithRouter(<Detail item={mockUsedItem} />);

      const conditionText = screen.getByText("Usado | 150 vendidos");
      expect(conditionText).toBeInTheDocument();
      expect(conditionText).toHaveClass("condition-class");
    });

    it("renders product title", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const title = screen.getByText("Test Product Title");
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass("title-class");
    });

    it("renders ListItemPrice component with big prop", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const priceComponent = screen.getAllByTestId("list-item-price")[0];
      expect(priceComponent).toBeInTheDocument();
      expect(priceComponent).toHaveAttribute("data-big", "true");
      expect(priceComponent).toHaveTextContent("ARS 15000.99");
    });

    it("renders price without tax for ARS currency", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const priceWithoutTaxes = screen.getAllByText(
        /Precio sin impuestos nacionales:/i
      );

      const priceWithoutTax = priceWithoutTaxes[0];

      expect(priceWithoutTax).toHaveTextContent(
        /Precio sin impuestos nacionales:\s*\$\s*12.378/
      );

      expect(priceWithoutTax).toHaveClass("price-without-tax-class");
    });

    it("does not render price without tax for USD currency", () => {
      renderWithRouter(<Detail item={mockUsedItem} />);

      expect(
        screen.queryByText(/Precio sin impuestos nacionales/)
      ).not.toBeInTheDocument();
    });

    it("renders payment methods link", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const paymentMethodsLink = screen.getByText("Ver medios de pago");
      expect(paymentMethodsLink).toBeInTheDocument();
      expect(paymentMethodsLink).toHaveClass("link", "payment-methods-class");
    });

    it("renders color information", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const colorText = screen.getByText("Color:");
      expect(colorText).toBeInTheDocument();
      expect(colorText).toHaveClass("color-class");

      const uniqueText = screen.getByText("Único");
      expect(uniqueText).toBeInTheDocument();
      expect(uniqueText.tagName).toBe("B");
    });

    it("renders color image", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const images = screen.getAllByRole("img");
      const colorImage = images[1];

      expect(colorImage).toBeInTheDocument();
      expect(colorImage).toHaveAttribute(
        "src",
        "https://example.com/test-image.jpg"
      );
      expect(colorImage).toHaveAttribute(
        "alt",
        "Test Product Title - Color único"
      );
      expect(colorImage).toHaveClass("color-image-class");
    });

    it("applies correct CSS classes to info section", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const infoSection = screen.getByText("Test Product Title").closest("div");
      expect(infoSection).toHaveClass("info-details-class");
    });
  });

  describe("DetailMetadataPurchase", () => {
    it("renders purchase tag", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const purchaseTag = screen.getByText("Mejor precio");
      expect(purchaseTag).toBeInTheDocument();
      expect(purchaseTag).toHaveClass("purchase-tag-class");
    });

    it("renders ListItemPrice component without big prop", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const priceComponents = screen.getAllByTestId("list-item-price");
      const purchasePriceComponent = priceComponents[1];
      expect(purchasePriceComponent).toBeInTheDocument();
      expect(purchasePriceComponent).toHaveAttribute("data-big", "false");
      expect(purchasePriceComponent).toHaveTextContent("ARS 15000.99");
    });

    it("renders price without tax for ARS currency in purchase section", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const priceWithoutTaxElements = screen.getAllByText(
        /Precio sin impuestos nacionales/
      );
      expect(priceWithoutTaxElements).toHaveLength(2);

      const purchasePriceWithoutTax = priceWithoutTaxElements[1];
      expect(purchasePriceWithoutTax).toHaveClass("price-without-tax-class");
    });

    it("renders arrival information", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const arrivalElements = screen.getAllByText(/Llega gratis|Retirá gratis/);
      expect(arrivalElements).toHaveLength(2);

      const firstArrival = arrivalElements[0].closest("p");
      expect(firstArrival).toHaveClass("arrival-class");
      expect(firstArrival).toHaveTextContent(
        "Llega gratis entre el sábado y el lunes"
      );

      const secondArrival = arrivalElements[1].closest("p");
      expect(secondArrival).toHaveClass("arrival-class");
      expect(secondArrival).toHaveTextContent(
        "Retirá gratis entre el lunes y el martes 2/sept en correo y otros puntos"
      );
    });

    it("renders map link", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const mapLink = screen.getByText("Ver en el mapa");
      expect(mapLink).toBeInTheDocument();
      expect(mapLink).toHaveClass("link");
    });

    it("renders stock information", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const stockAvailable = screen.getByText("Stock disponible");
      expect(stockAvailable).toBeInTheDocument();
      expect(stockAvailable).toHaveClass("stock-available-class");
    });

    it("renders quantity picker", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const quantityLabel = screen.getByText("Cantidad:");
      expect(quantityLabel).toBeInTheDocument();
      expect(quantityLabel).toHaveClass("pick-amount-label-class");

      const quantityDropdown = screen.getByText("1 unidad");
      expect(quantityDropdown).toBeInTheDocument();
      expect(quantityDropdown.closest("button")).toHaveClass(
        "pick-amount-dropdown-class"
      );

      const stockInfo = screen.getByText("(3 disponibles)");
      expect(stockInfo).toBeInTheDocument();
      expect(stockInfo).toHaveClass("pick-amount-stock-class");

      expect(screen.getByTestId("chevron-down-icon")).toBeInTheDocument();
    });

    it("renders purchase buttons", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const buttons = screen.getAllByTestId("button");
      expect(buttons).toHaveLength(2);

      const buyNowButton = buttons[0];
      expect(buyNowButton).toHaveTextContent("Comprar ahora");
      expect(buyNowButton).toHaveAttribute("data-secondary", "false");

      const addToCartButton = buttons[1];
      expect(addToCartButton).toHaveTextContent("Agregar al carrito");
      expect(addToCartButton).toHaveAttribute("data-secondary", "true");
    });

    it("renders seller information", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const soldByText = screen.getByText("Vendido por");
      expect(soldByText).toBeInTheDocument();
      expect(soldByText).toHaveClass("sold-by-class");

      const sellerLink = screen.getByText("NICOPAVLOTSKYOFICIAL");
      expect(sellerLink).toBeInTheDocument();
      expect(sellerLink).toHaveClass("link");

      const salesNumber = screen.getByText("+2500 ventas");
      expect(salesNumber).toBeInTheDocument();
      expect(salesNumber).toHaveClass("sold-by-number-class");

      const invoiceInfo = screen.getByText("Hace factura A y B");
      expect(invoiceInfo).toBeInTheDocument();
      expect(invoiceInfo).toHaveClass("sold-invoice-class");
    });
  });

  describe("DetailMetadata", () => {
    it("renders both info and purchase sections", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const metadataSection = screen
        .getByText("Test Product Title")
        .closest("div")?.parentElement?.parentElement;
      expect(metadataSection).toHaveClass("metadata-class");
    });
  });

  describe("Detail description", () => {
    it("renders description section", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const descriptionLabel = screen.getByText("Descripción");
      expect(descriptionLabel).toBeInTheDocument();
      expect(descriptionLabel).toHaveClass("description-label-class");

      const descriptionText = screen.getByText(
        "This is a test product description for testing purposes."
      );
      expect(descriptionText).toBeInTheDocument();
      expect(descriptionText).toHaveClass("description-text-class");
    });

    it("applies correct CSS classes to description section", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const descriptionSection = screen
        .getByText("Descripción")
        .closest("div")?.parentElement;
      expect(descriptionSection).toHaveClass("description-class");
    });
  });

  describe("Main Detail component", () => {
    it("renders all main sections", () => {
      renderWithRouter(<Detail item={mockItem} />);

      const detailContainer = screen
        .getByText("Test Product Title")
        .closest("div")?.parentElement?.parentElement?.parentElement;
      expect(detailContainer).toHaveClass("detail-class");
    });

    it("handles different item conditions correctly", () => {
      renderWithRouter(<Detail item={mockUsedItem} />);

      expect(screen.getByText("Usado | 150 vendidos")).toBeInTheDocument();
      expect(
        screen.queryByText("Nuevo | 150 vendidos")
      ).not.toBeInTheDocument();
    });

    it("handles different currencies correctly", () => {
      renderWithRouter(<Detail item={mockUsedItem} />);

      const priceComponents = screen.getAllByTestId("list-item-price");
      expect(priceComponents[0]).toHaveTextContent("USD 500.0");
      expect(priceComponents[1]).toHaveTextContent("USD 500.0");
    });

    it("handles zero decimals correctly", () => {
      const zeroDecimalsItem: ItemDetail = {
        ...mockItem,
        price: {
          currency: "ARS",
          amount: 1000,
          decimals: 0,
        },
      };

      renderWithRouter(<Detail item={zeroDecimalsItem} />);

      const priceComponents = screen.getAllByTestId("list-item-price");
      expect(priceComponents[0]).toHaveTextContent("ARS 1000.0");
      expect(priceComponents[1]).toHaveTextContent("ARS 1000.0");
    });

    it("handles empty categories array", () => {
      const itemWithoutCategories: ItemDetail = {
        ...mockItem,
        categories: [],
      };

      renderWithRouter(<Detail item={itemWithoutCategories} />);

      expect(screen.getByText("Volver al listado")).toBeInTheDocument();
      expect(screen.getByText("|")).toBeInTheDocument();

      expect(screen.queryByTestId("breadcrumb-0")).not.toBeInTheDocument();
    });

    it("handles single category", () => {
      const singleCategoryItem: ItemDetail = {
        ...mockItem,
        categories: ["Electronics"],
      };

      renderWithRouter(<Detail item={singleCategoryItem} />);

      expect(screen.getByTestId("breadcrumb-0")).toHaveTextContent(
        "Electronics"
      );
      expect(screen.queryByTestId("breadcrumb-1")).not.toBeInTheDocument();
    });

    it("handles long description", () => {
      const longDescriptionItem: ItemDetail = {
        ...mockItem,
        description:
          "This is a very long description that contains many words and should be displayed properly in the component without any issues or truncation.",
      };

      renderWithRouter(<Detail item={longDescriptionItem} />);

      expect(
        screen.getByText(
          "This is a very long description that contains many words and should be displayed properly in the component without any issues or truncation."
        )
      ).toBeInTheDocument();
    });

    it("handles zero sold quantity", () => {
      const zeroSoldItem: ItemDetail = {
        ...mockItem,
        sold_quantity: 0,
      };

      renderWithRouter(<Detail item={zeroSoldItem} />);

      expect(screen.getByText("Nuevo | 0 vendidos")).toBeInTheDocument();
    });

    it("handles large sold quantity", () => {
      const largeSoldItem: ItemDetail = {
        ...mockItem,
        sold_quantity: 999999,
      };

      renderWithRouter(<Detail item={largeSoldItem} />);

      expect(screen.getByText("Nuevo | 999999 vendidos")).toBeInTheDocument();
    });
  });
});
