import { SocketContext } from "context/index";
import { useContext } from "react";

export const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (!context) throw new Error("Error with socket context");

  return context;
};
