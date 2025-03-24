import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, Layout, LoginPage, ConnectDevicesPage } from "@pages/index";
import { routes } from "@routes/routes";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={routes.HOME} element={<HomePage />} />
          <Route
            path={routes.CONNECT_DEVICES}
            element={<ConnectDevicesPage />}
          />
          {/* <Rout path={routes.NOT_FOUND} element={<NotFoundPage />} /> */}
        </Route>
        <Route path={routes.LOGIN} element={<LoginPage />} />
        {/* <Route path={routes.REGISTER} element={<RegisterPage />}/> */}
      </Routes>
    </BrowserRouter>
  );
};
