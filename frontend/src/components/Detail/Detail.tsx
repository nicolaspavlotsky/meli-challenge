import { Condition, type ItemDetail } from "@/pages/Items/ItemsPage.models";
import styles from "./Detail.module.scss";
import ListItemPrice from "../List/ListItem/ListItemPrice";
import { Currency } from "../List/List.constants";
import { formatPrice } from "../List/List.utils";
import { BiChevronDown } from "react-icons/bi";
import Button from "../common/Button/Button";
import Breadcrumbs from "../common/Breadcrumbs/Breadcrumbs";
import { APP_ROUTES } from "@/routing/routes";

interface DetailProps {
  item: ItemDetail;
}

const DetailBreadcrumbs = ({ item }: DetailProps) => {
  return (
    <nav className={styles.breadcrumbs} aria-label="Navegación del producto">
      <a
        href="#"
        onClick={() => {
          window.history.back();
        }}
        className={`${styles.link} link`}
        aria-label="Volver al listado anterior"
      >
        Volver al listado
      </a>
      <span className={styles.separator} aria-hidden="true">
        |
      </span>
      <Breadcrumbs
        useLinkColor
        breadcrumbs={item.categories.map((category) => ({
          label: category,
          link: `${APP_ROUTES.items}?search=${category}`,
        }))}
      />
    </nav>
  );
};

const DetailMetadataInfo = ({ item }: DetailProps) => {
  return (
    <section className={styles.info} aria-labelledby="product-title">
      <div className={styles.image}>
        <img src={item.picture} alt={item.title} data-testid="product-image" />
      </div>

      <div className={styles.info_details}>
        <p className={styles.condition}>
          {item.condition === Condition.new ? "Nuevo" : "Usado"} |{" "}
          {item.sold_quantity} vendidos
        </p>
        <h1 id="product-title" className={styles.title}>
          {item.title}
        </h1>

        <ListItemPrice
          big
          price={item.price.amount}
          currency={item.price.currency}
          decimals={item.price.decimals}
        />

        {item.price.currency === Currency.ARS && (
          <p className={styles.price_without_tax}>
            Precio sin impuestos nacionales: ${" "}
            {/* Simulating the tax calculation (let's go argentinian taxes! :P) */}
            {formatPrice(item.price.amount * 0.8252)}
          </p>
        )}

        <a href="#" className={`link ${styles.payment_methods}`}>
          Ver medios de pago
        </a>

        <p className={styles.color}>
          Color: <b>Único</b>
        </p>

        <img
          src={item.picture}
          alt={`${item.title} - Color único`}
          className={styles.color_image}
        />
      </div>
    </section>
  );
};

const DetailMetadataPurchase = ({ item }: DetailProps) => {
  return (
    <section className={styles.purchase} aria-labelledby="purchase-section">
      <h3 id="purchase-section" className={styles.purchase_tag}>
        Mejor precio
      </h3>

      <ListItemPrice
        price={item.price.amount}
        currency={item.price.currency}
        decimals={item.price.decimals}
      />

      {item.price.currency === Currency.ARS && (
        <p className={styles.price_without_tax}>
          Precio sin impuestos nacionales: ${" "}
          {formatPrice(item.price.amount * 0.8252)}
        </p>
      )}

      <p className={styles.arrival}>
        <span>Llega gratis</span> entre el sábado y el lunes
      </p>

      <p className={styles.arrival}>
        <span>Retirá gratis</span> entre el lunes y el martes 2/sept en correo y
        otros puntos
      </p>

      <a href="#" className="link">
        Ver en el mapa
      </a>

      <p className={styles.stock_available}>Stock disponible</p>
      <div className={styles.pick_amount}>
        <label htmlFor="quantity-selector" className={styles.pick_amount_label}>
          Cantidad:{" "}
        </label>
        <button
          id="quantity-selector"
          className={styles.pick_amount_dropdown}
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-label="Seleccionar cantidad"
        >
          <span>1 unidad</span>
          <BiChevronDown aria-hidden="true" />
        </button>
        <span className={styles.pick_amount_stock}>(3 disponibles)</span>
      </div>

      <div className={styles.purchase_buttons}>
        <Button label="Comprar ahora" />
        <Button label="Agregar al carrito" secondary />
      </div>

      <p className={styles.sold_by}>
        Vendido por{" "}
        <a href="#" className="link">
          NICOPAVLOTSKYOFICIAL
        </a>
      </p>
      <p className={styles.sold_by_number}>+2500 ventas</p>
      <p className={styles.sold_invoice}>Hace factura A y B</p>
    </section>
  );
};

const DetailMetadata = ({ item }: DetailProps) => {
  return (
    <div className={styles.metadata}>
      <DetailMetadataInfo item={item} />
      <DetailMetadataPurchase item={item} />
    </div>
  );
};

const Detail = ({ item }: DetailProps) => {
  return (
    <main>
      <DetailBreadcrumbs item={item} />

      <div className={styles.detail}>
        <DetailMetadata item={item} />
        <section
          className={styles.description}
          aria-labelledby="description-title"
        >
          <div className={styles.description_info}>
            <h2 id="description-title" className={styles.description_label}>
              Descripción
            </h2>
            <p className={styles.description_text}>{item.description}</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Detail;
