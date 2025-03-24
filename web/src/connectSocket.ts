import { io } from "socket.io-client";

export const connectSocket = (URL: string) => {
  // const socket = io(URL, { autoConnect: false });
  // socket.connect();
  // return socket;

  const socket = new WebSocket(URL);

  socket.onopen = () => console.log("Connected to WebSocket Server");
  socket.onmessage = (event) => console.log("Message from server:", event.data);
  socket.onerror = (error) => console.error("WebSocket Error:", error);
  socket.onclose = () => console.log("WebSocket Disconnected");

  return socket;
};
