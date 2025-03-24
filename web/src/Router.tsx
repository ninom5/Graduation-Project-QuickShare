import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, Layout } from "@pages/index";
import { routes } from "@routes/routes";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={routes.HOME} element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
