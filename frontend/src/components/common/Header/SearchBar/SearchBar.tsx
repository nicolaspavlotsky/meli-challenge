import { BiSearch } from "react-icons/bi";
import styles from "./SearchBar.module.scss";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/routing/routes";
import useStore from "@/store/store";
import { useRef } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { BREAKPOINTS } from "@/constants/app";

/* This component is only used in the header, so the search logic is included here.
   In a bigger project, we might have multiple instance where we need a search bar,
   so we can abstract the logic to a custom hook and have this be a presentational component.
*/
const SearchBar = () => {
  const searchQuery = useStore((state) => state.searchQuery);
  const setSearchQuery = useStore((state) => state.setSearchQuery);

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const trimmedSearchQuery = searchQuery.trim();

    if (!trimmedSearchQuery) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    navigate(`${APP_ROUTES.items}?search=${trimmedSearchQuery}`);

    inputRef.current?.blur();
  };

  const windowSize = useWindowSize();

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.bar}>
        <input
          ref={inputRef}
          id="search-input"
          name="search"
          type="text"
          aria-label="Buscar productos, marcas y más"
          placeholder={
            windowSize > BREAKPOINTS.sm
              ? "Buscar productos, marcas y más..."
              : "Estoy buscando..."
          }
          className={styles.input}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button
          className={styles.icon}
          type="submit"
          aria-label="Buscar productos, marcas y más"
        >
          <BiSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
