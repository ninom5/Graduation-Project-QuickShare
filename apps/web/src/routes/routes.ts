import { Routes } from "../types/routeType";

export const routes: Routes = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  CONNECT_DEVICES: "/connect",
  CONNECT_DEVICES_SOCKET: "/connect/:socketId",
  NOT_FOUND: "*",
};
