import { FC, PropsWithChildren, useReducer } from "react";
import { SocketContext } from "./SocketContext";

const mapInitial = new Map<string, WebSocket>();

const reducer = (
  state: Map<string, WebSocket>,
  action: { type: string; payload?: { key: string; socket: WebSocket } }
) => {
  switch (action.type) {
    case "ADD_SOCKET":
      if (action.payload) {
        const newSocketMap = new Map(state);
        newSocketMap.set(action.payload.key, action.payload.socket);
        return newSocketMap;
      }
      return state;
    default:
      return state;
  }
};

export const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const [sockets, dispatch] = useReducer(reducer, mapInitial);

  return (
    <SocketContext.Provider value={{ sockets, dispatch }}>
      {children}
    </SocketContext.Provider>
  );
};
