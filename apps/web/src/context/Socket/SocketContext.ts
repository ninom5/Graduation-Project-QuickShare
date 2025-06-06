import { createContext } from "react";

export type SocketAction = {
  type: "ADD_SOCKET";
  payload: { key: string; socket: WebSocket };
};

export interface SocketContextType {
  sockets: Map<string, WebSocket>;
  dispatch: React.Dispatch<SocketAction>;
}

export const SocketContext = createContext<SocketContextType>({
  sockets: new Map(),
  dispatch: () => {},
});
