import { api } from "@/api";
import useStore from "@/store/store";
import { useEffect } from "react";
import type { ItemDetail } from "../ItemsPage.models";
import { useParams } from "react-router-dom";
import { itemsQueryKeys } from "../ItemsPage.queries";
import { useQuery } from "@tanstack/react-query";
import DetailSkeleton from "@/components/Detail/DetailSkeleton/DetailSkeleton";
import Section from "@/components/common/Section/Section";
import { LuSearchX } from "react-icons/lu";
import Detail from "@/components/Detail/Detail";
import { delay } from "@/utils/common";
import useTitle from "@/hooks/useTitle";

const DetailPage = () => {
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const { id } = useParams();

  const fetchItem = async (productId: string) => {
    // Fake delay to simulate latency and see the loading state
    await delay(500);
    const response = await api<ItemDetail>(`/api/product?id=${productId}`);

    return response;
  };

  const itemQuery = useQuery({
    queryKey: itemsQueryKeys.detail(id!),
    queryFn: () => fetchItem(id!),
    enabled: !!id,
  });

  useEffect(() => {
    setSearchQuery("");
  }, []);

  useTitle(
    itemQuery.data?.title ||
      (itemQuery.isFetching ? "Cargando producto..." : "Producto")
  );

  {
    /* We could split the presentation into other component, and use early returns to avoid nested ternary operators, I'm leaving it like this for simplicity.
    
    Also, another improvement would be check error code and show different message for 404 or 500 errors.
    */
  }

  return (
    <div className="wrapper">
      <div className="page">
        {itemQuery.isFetching ? (
          <DetailSkeleton />
        ) : itemQuery.error ? (
          <Section
            Icon={LuSearchX}
            text="El producto solicitado no existe."
            goBackLink
          />
        ) : (
          <Detail item={itemQuery.data!} />
        )}
      </div>
    </div>
  );
};

export default DetailPage;
