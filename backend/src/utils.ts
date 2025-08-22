export const normalizeText = (text: string): string => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

export const containsQuery = (text: string, query: string): boolean => {
  const normalizedText = normalizeText(text);
  const normalizedQuery = normalizeText(query);
  return normalizedText.includes(normalizedQuery);
};

export const getMostCommonCategories = (products: any[]): string[] => {
  if (products.length === 0) return [];
  if (products.length === 1) return products[0].categories;

  const categoriesCount = new Map<
    string,
    { categories: string[]; count: number; matches: number }
  >();

  products.forEach((product) => {
    const categoriesKey = JSON.stringify(product.categories);
    if (categoriesCount.has(categoriesKey)) {
      categoriesCount.get(categoriesKey)!.count++;
    } else {
      categoriesCount.set(categoriesKey, {
        categories: product.categories,
        count: 1,
        matches: 0,
      });
    }
  });

  let maxCount = 0;
  let maxMatches = 0;
  let result: string[] = [];

  for (const [_, data] of categoriesCount) {
    if (
      data.count > maxCount ||
      (data.count === maxCount && data.matches > maxMatches)
    ) {
      maxCount = data.count;
      maxMatches = data.matches;
      result = data.categories;
    }
  }

  return result;
};
