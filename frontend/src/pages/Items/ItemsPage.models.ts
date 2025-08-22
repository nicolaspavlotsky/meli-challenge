export const Condition = {
  new: "new",
  used: "used",
} as const;

export type Condition = (typeof Condition)[keyof typeof Condition];

export interface ListItem {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  free_shipping: boolean;
}

export interface ItemDetail extends ListItem {
  categories: string[];
  sold_quantity: number;
  description: string;
  condition: Condition;
}
