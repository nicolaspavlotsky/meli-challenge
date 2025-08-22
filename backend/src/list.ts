import { Request, Response } from "express";
import mockedData from "./mockedData.json";
import { containsQuery, getMostCommonCategories } from "./utils";

export const getProductsList = (req: Request, res: Response) => {
  try {
    const query = req.query.query as string;

    let filteredProducts = mockedData.products;

    if (query && query.trim()) {
      filteredProducts = mockedData.products.filter(
        (product) =>
          containsQuery(product.title, query) ||
          containsQuery(product.description, query) ||
          product.categories.some((category) => containsQuery(category, query))
      );
    }

    const categories = getMostCommonCategories(filteredProducts);

    res.json({
      categories,
      items: filteredProducts.map((product) => ({
        id: product.id,
        title: product.title,
        price: {
          currency: product.price.currency,
          amount: product.price.amount,
          decimals: product.price.decimals,
        },
        picture: `${process.env.IMAGE_URL_BASE}${product.id}.webp`,
        free_shipping: product.free_shipping,
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: "Failed to fetch products list",
    });
  }
};

export const getProductById = (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        error: "Bad Request",
        message: "Product ID is required as a query parameter",
      });
    }

    const product = mockedData.products.find((p) => p.id === id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Product not found",
      });
    }

    res.json({
      id: product.id,
      title: product.title,
      price: {
        currency: product.price.currency,
        amount: product.price.amount,
        decimals: product.price.decimals,
      },
      picture: `${process.env.IMAGE_URL_BASE}${product.id}.webp`,
      free_shipping: product.free_shipping,
      condition: product.condition,
      sold_quantity: product.sold_quantity,
      description: product.description,
      categories: product.categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: "Failed to fetch product",
    });
  }
};
