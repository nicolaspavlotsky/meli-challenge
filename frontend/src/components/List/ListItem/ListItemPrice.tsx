import { Currency } from "../List.constants";
import { formatPrice } from "../List.utils";
import styles from "./ListItem.module.scss";

interface ListItemPriceProps {
  price: number;
  currency: string;
  decimals: number;
  big?: boolean;
}

const ListItemPrice = ({
  price,
  currency,
  decimals,
  big,
}: ListItemPriceProps) => {
  const formatted = formatPrice(price);
  const currencySymbol = currency === Currency.ARS ? "$" : "USD";
  const priceText = `${currencySymbol} ${formatted}${
    decimals !== 0 ? `.${decimals}` : ""
  }`;

  return (
    <p
      className={`${styles.price} ${big ? styles.big : ""}`}
      data-testid="price"
      aria-label={`Precio: ${priceText}`}
    >
      {currencySymbol} {formatted}
      {decimals !== 0 && <span className={styles.decimals}>{decimals}</span>}
    </p>
  );
};

export default ListItemPrice;
