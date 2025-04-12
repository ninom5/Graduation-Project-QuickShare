// import { io } from "socket.io-client";

// export const connectSocket = (URL: string) => {
//   // const socket = io(URL, { autoConnect: false });
//   // socket.connect();
//   // return socket;

//   const socket = new WebSocket(URL);

//   socket.onopen = () => console.log("Connected to WebSocket Server");
//   socket.onmessage = (event) => console.log("Message from server:", event.data);
//   socket.onerror = (error) => console.error("WebSocket Error:", error);
//   socket.onclose = () => console.log("WebSocket Disconnected");

//   return socket;
// };

import { io } from "socket.io-client";

const SERVER_URL = "ws://localhost:8080/ws";

export const connectSocket = () => {
  const socket = io(SERVER_URL, {
    transports: ["websocket"],
    autoConnect: false,
  });

  socket.on("connect", () => {
    console.log("Connected to WebSocket Server");
  });

  socket.on("message", (data) => {
    console.log("Received message from server:", data);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from WebSocket Server");
  });

  return socket;
};
