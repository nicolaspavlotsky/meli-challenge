import Section from "@/components/common/Section/Section";
import { useQuery } from "@tanstack/react-query";
import { TbShoppingBagSearch } from "react-icons/tb";
import { useSearchParams } from "react-router-dom";
import styles from "./ListPage.module.scss";
import { itemsQueryKeys } from "../ItemsPage.queries";
import { api } from "@/api";
import type { ListItem as ListItemType } from "../ItemsPage.models";
import { useEffect } from "react";
import useStore from "@/store/store";
import Skeleton from "@/components/common/Skeleton/Skeleton";
import { LuSearchX } from "react-icons/lu";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import ListItem from "@/components/List/ListItem/ListItem";
import useWindowSize from "@/hooks/useWindowSize";
import { APP_ROUTES } from "@/routing/routes";
import { capitalizeWordsInSentence, delay } from "@/utils/common";
import { BREAKPOINTS } from "@/constants/app";
import useTitle from "@/hooks/useTitle";
import ErrorSection from "@/components/common/Section/ErrorSection";

interface ListResults {
  categories: string[];
  items: ListItemType[];
}

const ListPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const setSearchQuery = useStore((state) => state.setSearchQuery);

  const fetchItems = async (searchQuery: string) => {
    // Fake delay to simulate latency and see the loading state
    await delay(500);
    const response = await api<ListResults>(
      `/api/products?query=${searchQuery}`
    );

    return response;
  };

  const listQuery = useQuery({
    queryKey: itemsQueryKeys.list(searchQuery!),
    queryFn: () => fetchItems(searchQuery!),
    enabled: !!searchQuery,
  });

  useEffect(() => {
    if (!searchQuery) return;
    setSearchQuery(searchQuery);
  }, [searchQuery]);

  useTitle(capitalizeWordsInSentence(searchQuery || "Resultados"));

  const windowSize = useWindowSize();

  if (!searchQuery) {
    return (
      <Section
        Icon={TbShoppingBagSearch}
        text="La página que estás buscando no existe."
        goBackLink
      />
    );
  }

  {
    /* We could split the presentation into other component, and use early returns to avoid nested ternary operators, I'm leaving it like this for simplicity */
  }

  return (
    <div className="wrapper">
      <div className="page">
        {listQuery.isFetching ? (
          <div className={styles.skeleton}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                height={windowSize > BREAKPOINTS.sm ? 180 : 250}
                key={index}
              />
            ))}
          </div>
        ) : listQuery.data?.items.length === 0 ? (
          <Section
            Icon={LuSearchX}
            text="No se encontraron resultados para tu búsqueda."
          />
        ) : listQuery.isError ? (
          <ErrorSection refetch={listQuery.refetch} />
        ) : (
          <div className={styles.results} data-testid="search-results">
            <Breadcrumbs
              breadcrumbs={
                listQuery.data?.categories?.map((category) => ({
                  label: category,
                  link: `${APP_ROUTES.items}?search=${category}`,
                })) ?? []
              }
            />

            <div className={styles.items} data-testid="items-list">
              {listQuery.data?.items.map((item: ListItemType) => (
                <ListItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPage;
