import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ListItem from "../ListItem";
import type { ListItem as ListItemType } from "@/pages/Items/ItemsPage.models";

vi.mock("../ListItemPrice", () => ({
  default: ({ price, currency, decimals }: any) => (
    <div data-testid="list-item-price">
      {currency} {price}.{decimals}
    </div>
  ),
}));

vi.mock("../ListItem.module.scss", () => ({
  default: {
    item: "item-class",
    fav_icon: "fav-icon-class",
    image: "image-class",
    info: "info-class",
    title: "title-class",
    shipping: "shipping-class",
  },
}));

vi.mock("@/routing/routes", () => ({
  APP_ROUTES: {
    items: "/items",
  },
}));

vi.mock("react-icons/ci", () => ({
  CiHeart: () => <span data-testid="heart-icon">❤️</span>,
}));

const mockItem: ListItemType = {
  id: "MLA123456789",
  title: "Test Product Title",
  price: {
    currency: "ARS",
    amount: 15000,
    decimals: 99,
  },
  picture: "https://example.com/test-image.jpg",
  free_shipping: true,
};

const mockItemWithoutFreeShipping: ListItemType = {
  id: "MLA987654321",
  title: "Test Product Without Free Shipping",
  price: {
    currency: "USD",
    amount: 50,
    decimals: 0,
  },
  picture: "https://example.com/test-image-2.jpg",
  free_shipping: false,
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("ListItem", () => {
  it("renders the component with all required elements", () => {
    renderWithRouter(<ListItem item={mockItem} />);

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/items/MLA123456789");

    const favButton = screen.getByRole("button");
    expect(favButton).toBeInTheDocument();
    expect(favButton).toHaveClass("fav-icon-class");

    expect(screen.getByTestId("heart-icon")).toBeInTheDocument();

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/test-image.jpg");
    expect(image).toHaveAttribute("alt", "Test Product Title");

    const title = screen.getByText("Test Product Title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("title-class");

    expect(screen.getByTestId("list-item-price")).toBeInTheDocument();

    const shippingMessage = screen.getByText("Llega gratis mañana");
    expect(shippingMessage).toBeInTheDocument();
    expect(shippingMessage).toHaveClass("shipping-class");
  });

  it("renders without free shipping message when free_shipping is false", () => {
    renderWithRouter(<ListItem item={mockItemWithoutFreeShipping} />);

    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(
      screen.getByText("Test Product Without Free Shipping")
    ).toBeInTheDocument();
    expect(screen.getByTestId("list-item-price")).toBeInTheDocument();

    expect(screen.queryByText("Llega gratis mañana")).not.toBeInTheDocument();
  });

  it("renders the correct navigation link", () => {
    renderWithRouter(<ListItem item={mockItem} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/items/MLA123456789");
  });

  it("renders the correct image with proper alt text", () => {
    renderWithRouter(<ListItem item={mockItem} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "https://example.com/test-image.jpg");
    expect(image).toHaveAttribute("alt", "Test Product Title");
  });

  it("renders the title with proper title attribute", () => {
    renderWithRouter(<ListItem item={mockItem} />);

    const title = screen.getByText("Test Product Title");
    expect(title).toHaveAttribute("title", "Test Product Title");
  });

  it("renders the favorite button with correct styling", () => {
    renderWithRouter(<ListItem item={mockItem} />);

    const favButton = screen.getByRole("button");
    expect(favButton).toHaveClass("fav-icon-class");
  });

  it("renders the ListItemPrice component with correct props", () => {
    renderWithRouter(<ListItem item={mockItem} />);

    const priceComponent = screen.getByTestId("list-item-price");
    expect(priceComponent).toBeInTheDocument();
    expect(priceComponent).toHaveTextContent("ARS 15000.99");
  });

  it("handles different item IDs correctly", () => {
    const differentItem: ListItemType = {
      ...mockItem,
      id: "MLA999888777",
    };

    renderWithRouter(<ListItem item={differentItem} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/items/MLA999888777");
  });

  it("handles different currencies and prices correctly", () => {
    const usdItem: ListItemType = {
      ...mockItem,
      price: {
        currency: "USD",
        amount: 25,
        decimals: 50,
      },
    };

    renderWithRouter(<ListItem item={usdItem} />);

    const priceComponent = screen.getByTestId("list-item-price");
    expect(priceComponent).toHaveTextContent("USD 25.50");
  });

  it("handles zero decimals correctly", () => {
    const zeroDecimalsItem: ListItemType = {
      ...mockItem,
      price: {
        currency: "ARS",
        amount: 1000,
        decimals: 0,
      },
    };

    renderWithRouter(<ListItem item={zeroDecimalsItem} />);

    const priceComponent = screen.getByTestId("list-item-price");
    expect(priceComponent).toHaveTextContent("ARS 1000.0");
  });

  it("applies correct CSS classes", () => {
    renderWithRouter(<ListItem item={mockItem} />);

    const link = screen.getByRole("link");
    const favButton = screen.getByRole("button");
    const image = screen.getByRole("img");
    const title = screen.getByText("Test Product Title");
    const shippingMessage = screen.getByText("Llega gratis mañana");

    expect(link).toHaveClass("item-class");
    expect(favButton).toHaveClass("fav-icon-class");
    expect(image.parentElement).toHaveClass("image-class");
    expect(title.parentElement).toHaveClass("info-class");
    expect(title).toHaveClass("title-class");
    expect(shippingMessage).toHaveClass("shipping-class");
  });
});
