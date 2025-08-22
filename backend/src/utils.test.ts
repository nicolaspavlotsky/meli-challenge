import { normalizeText, containsQuery, getMostCommonCategories } from "./utils";

describe("utils", () => {
  describe("normalizeText", () => {
    it("should normalize text by removing accents and converting to lowercase", () => {
      expect(normalizeText("Héllò Wórld")).toBe("hello world");
      expect(normalizeText("Café")).toBe("cafe");
      expect(normalizeText("Ñoño")).toBe("nono");
    });

    it("should handle text without accents", () => {
      expect(normalizeText("Hello World")).toBe("hello world");
      expect(normalizeText("ABC")).toBe("abc");
    });

    it("should handle empty string", () => {
      expect(normalizeText("")).toBe("");
    });
  });

  describe("containsQuery", () => {
    it("should return true when query is found in text", () => {
      expect(containsQuery("Hello World", "hello")).toBe(true);
      expect(containsQuery("Café", "cafe")).toBe(true);
      expect(containsQuery("Héllò", "hello")).toBe(true);
    });

    it("should return false when query is not found", () => {
      expect(containsQuery("Hello World", "xyz")).toBe(false);
      expect(containsQuery("Café", "tea")).toBe(false);
    });

    it("should handle case insensitive search", () => {
      expect(containsQuery("Hello World", "WORLD")).toBe(true);
      expect(containsQuery("ABC", "abc")).toBe(true);
    });
  });

  describe("getMostCommonCategories", () => {
    it("should return empty array for empty products array", () => {
      expect(getMostCommonCategories([])).toEqual([]);
    });

    it("should return categories for single product", () => {
      const products = [{ categories: ["Electronics", "Computers"] }];
      expect(getMostCommonCategories(products)).toEqual([
        "Electronics",
        "Computers",
      ]);
    });

    it("should return most common categories for multiple products", () => {
      const products = [
        { categories: ["Electronics", "Computers"] },
        { categories: ["Electronics", "Computers"] },
        { categories: ["Books", "Fiction"] },
        { categories: ["Electronics", "Computers"] },
      ];
      expect(getMostCommonCategories(products)).toEqual([
        "Electronics",
        "Computers",
      ]);
    });

    it("should handle products with different category structures", () => {
      const products = [
        { categories: ["Electronics"] },
        { categories: ["Electronics", "Computers"] },
        { categories: ["Electronics"] },
      ];
      expect(getMostCommonCategories(products)).toEqual(["Electronics"]);
    });
  });
});
