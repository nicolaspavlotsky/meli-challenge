import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/Home/HomePage";
import Header from "@/components/common/Header/Header";
import { APP_ROUTES } from "./routes";
import ItemsPage from "@/pages/Items/ItemsPage";
import DetailPage from "@/pages/Items/Detail/DetailPage";
import ListPage from "@/pages/Items/List/ListPage";

const AppRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={APP_ROUTES.home} element={<HomePage />} />
        <Route path={APP_ROUTES.items} element={<ItemsPage />}>
          <Route index element={<ListPage />} />
          <Route path=":id" element={<DetailPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
