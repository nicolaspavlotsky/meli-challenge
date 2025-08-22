import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ListItemPrice from "../ListItemPrice";

vi.mock("../List.constants", () => ({
  Currency: {
    ARS: "ARS",
    USD: "USD",
  },
}));

vi.mock("../List.utils", () => ({
  formatPrice: (price: number) => price.toLocaleString(),
}));

vi.mock("../ListItem.module.scss", () => ({
  default: {
    price: "price-class",
    big: "big-class",
    decimals: "decimals-class",
  },
}));

describe("ListItemPrice", () => {
  const defaultProps = {
    price: 15000,
    currency: "ARS",
    decimals: 99,
  };

  it("renders the component with default props", () => {
    render(<ListItemPrice {...defaultProps} />);

    const priceElement = screen.getByText(/\$ 15.000/);
    expect(priceElement).toBeInTheDocument();
    expect(priceElement).toHaveClass("price-class");
  });

  it("renders with big class when big prop is true", () => {
    render(<ListItemPrice {...defaultProps} big={true} />);

    const priceElement = screen.getByText(/\$ 15.000/);
    expect(priceElement).toHaveClass("price-class", "big-class");
  });

  it("renders without big class when big prop is false", () => {
    render(<ListItemPrice {...defaultProps} big={false} />);

    const priceElement = screen.getByText(/\$ 15.000/);
    expect(priceElement).toHaveClass("price-class");
    expect(priceElement).not.toHaveClass("big-class");
  });

  it("renders without big class when big prop is undefined", () => {
    render(<ListItemPrice {...defaultProps} />);

    const priceElement = screen.getByText(/\$ 15.000/);
    expect(priceElement).toHaveClass("price-class");
    expect(priceElement).not.toHaveClass("big-class");
  });

  it("renders decimals when decimals is not zero", () => {
    render(<ListItemPrice {...defaultProps} />);

    const decimalsElement = screen.getByText("99");

    expect(decimalsElement).toBeInTheDocument();
    expect(decimalsElement).toHaveClass("decimals-class");
  });

  it("does not render decimals when decimals is zero", () => {
    render(<ListItemPrice {...defaultProps} decimals={0} />);

    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("handles USD currency correctly", () => {
    render(<ListItemPrice {...defaultProps} currency="USD" />);

    const priceElement = screen.getByText(/USD 15.000/);
    expect(priceElement).toBeInTheDocument();
  });

  it("handles different price amounts", () => {
    render(<ListItemPrice {...defaultProps} price={999999} />);

    const priceElement = screen.getByText(/\$ 999.999/);
    expect(priceElement).toBeInTheDocument();
  });

  it("handles zero price", () => {
    render(<ListItemPrice {...defaultProps} price={0} />);

    const priceElement = screen.getByText(/\$ 0/);
    expect(priceElement).toBeInTheDocument();
  });

  it("handles large decimals", () => {
    render(<ListItemPrice {...defaultProps} decimals={999} />);

    const decimalsElement = screen.getByText("999");

    expect(decimalsElement).toBeInTheDocument();
    expect(decimalsElement).toHaveClass("decimals-class");
  });

  it("formats price correctly using the utility function", () => {
    render(<ListItemPrice {...defaultProps} price={1234567} />);

    const priceElement = screen.getByText(/\$ 1.234.567/);
    expect(priceElement).toBeInTheDocument();
  });
});
