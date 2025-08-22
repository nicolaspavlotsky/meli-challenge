import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "@/assets/logo.webp";
import logoSmall from "@/assets/logo_small.webp";
import SearchBar from "./SearchBar/SearchBar";
import { APP_TITLE, BREAKPOINTS } from "@/constants/app";

const Header = () => {
  return (
    <header className={styles.header} role="banner">
      <div className={`${styles.wrapper} wrapper`}>
        <Link to="/" aria-label={`${APP_TITLE} - Ir al inicio`}>
          <picture>
            <source
              media={`(max-width: ${BREAKPOINTS.sm}px)`}
              srcSet={logoSmall}
            />
            <img
              src={logo}
              className={styles.logo}
              alt={`${APP_TITLE} - Ir al inicio`}
            />
          </picture>
        </Link>

        <nav
          role="search"
          className={styles.search_nav}
          aria-label="Búsqueda de productos"
        >
          <SearchBar />
        </nav>
      </div>
    </header>
  );
};

export default Header;
