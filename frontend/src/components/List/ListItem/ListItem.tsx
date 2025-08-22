import type { ListItem as ListItemType } from "@/pages/Items/ItemsPage.models";
import styles from "./ListItem.module.scss";
import { Link } from "react-router-dom";
import ListItemPrice from "./ListItemPrice";
import { CiHeart } from "react-icons/ci";
import { APP_ROUTES } from "@/routing/routes";

interface ListItemProps {
  item: ListItemType;
}

const ListItem = ({ item }: ListItemProps) => {
  const { price, picture, title, free_shipping } = item;

  return (
    <Link
      to={`${APP_ROUTES.items}/${item.id}`}
      className={styles.item}
      data-testid={`product-item-${item.id}`}
    >
      <button
        className={styles.fav_icon}
        aria-label={`Agregar ${title} a favoritos`}
      >
        <CiHeart />
      </button>
      <div className={styles.image}>
        <img src={picture} alt={title} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title} title={title} data-testid="product-title">
          {title}
        </h3>
        <ListItemPrice
          price={price.amount}
          currency={price.currency}
          decimals={price.decimals}
        />

        {free_shipping && (
          <div className={styles.shipping} aria-label="Envío gratis">
            Llega gratis mañana
          </div>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
