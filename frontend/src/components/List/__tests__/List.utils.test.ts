import { describe, it, expect } from "vitest";
import { formatPrice } from "../List.utils";

describe("formatPrice", () => {
  it("should format integer prices with es-AR locale", () => {
    expect(formatPrice(1000)).toBe("1.000");
    expect(formatPrice(10000)).toBe("10.000");
    expect(formatPrice(100000)).toBe("100.000");
    expect(formatPrice(1000000)).toBe("1.000.000");
  });

  it("should handle zero price", () => {
    expect(formatPrice(0)).toBe("0");
  });

  it("should format prices with decimal values (rounded to no decimal places)", () => {
    expect(formatPrice(1000.99)).toBe("1.001");
    expect(formatPrice(1000.49)).toBe("1.000");
    expect(formatPrice(1000.5)).toBe("1.001");
  });

  it("should handle negative prices", () => {
    expect(formatPrice(-1000)).toBe("-1.000");
    expect(formatPrice(-10000)).toBe("-10.000");
  });

  it("should handle small positive numbers", () => {
    expect(formatPrice(1)).toBe("1");
    expect(formatPrice(10)).toBe("10");
    expect(formatPrice(100)).toBe("100");
    expect(formatPrice(999)).toBe("999");
  });

  it("should handle large numbers", () => {
    expect(formatPrice(12345678)).toBe("12.345.678");
    expect(formatPrice(999999999)).toBe("999.999.999");
  });

  it("should round decimal values correctly", () => {
    expect(formatPrice(1234.4)).toBe("1.234");
    expect(formatPrice(1234.5)).toBe("1.235");
    expect(formatPrice(1234.6)).toBe("1.235");
  });

  it("should handle very small decimal values", () => {
    expect(formatPrice(0.1)).toBe("0");
    expect(formatPrice(0.4)).toBe("0");
    expect(formatPrice(0.5)).toBe("1");
    expect(formatPrice(0.9)).toBe("1");
  });

  it("should handle edge cases with floating point precision", () => {
    expect(formatPrice(999.999)).toBe("1.000");
    expect(formatPrice(1000.001)).toBe("1.000");
  });
});
