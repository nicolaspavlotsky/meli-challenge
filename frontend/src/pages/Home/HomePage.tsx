import { CiShoppingBasket } from "react-icons/ci";
import { useEffect } from "react";
import useStore from "@/store/store";
import Section from "@/components/common/Section/Section";
import useTitle from "@/hooks/useTitle";

const HomePage = () => {
  const setSearchQuery = useStore((state) => state.setSearchQuery);

  useEffect(() => {
    setSearchQuery("");
  }, []);

  useTitle();

  return (
    <div className="wrapper">
      <Section
        Icon={CiShoppingBasket}
        text="¡Realizá una búsqueda para encontrar miles de productos!"
      />
    </div>
  );
};

export default HomePage;
