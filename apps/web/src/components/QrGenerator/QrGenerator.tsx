import { v4 as uuidv4 } from "uuid";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export const QrGenerator = () => {
  const [connectionId, setConnectionId] = useState<string>("");
  const [connectionURL, setConnectionURL] = useState<string>("");

  const socketRef = useRef<WebSocket | null>(null);
  // console.log(import.meta.env);
  const baseURL = import.meta.env.VITE_CONNECTION_URL;
  // console.log(baseURL);

  useEffect(() => {
    const id = uuidv4();
    console.log(id);
    setConnectionId(id);
  }, []);

  useEffect(() => {
    setConnectionURL(`${baseURL}/connect/${connectionId}`);
    console.log("Connection URL:", `${baseURL}/connect/${connectionId}`);
  }, [connectionId]);

  useEffect(() => {
    if (!connectionURL || socketRef.current) return;

    const socket = new WebSocket("ws://localhost:8080/ws");
    socketRef.current = socket;

    const onOpen = () => {
      console.log("Connection opened");
    };

    const onClose = () => {
      console.log("Connection closed");
    };

    const onMessage = (event: MessageEvent) => {
      console.log(`Message: ${event?.data}`);
    };

    const onError = (error: Event) => {
      console.error(`Web socket error: ${error}`);
      toast.error("Web socket error");
    };

    socket.addEventListener("open", onOpen);
    socket.addEventListener("close", onClose);
    socket.addEventListener("message", onMessage);
    socket.addEventListener("error", onError);

    // return () => {
    //   setTimeout(() => {
    //     if (socket.readyState !== WebSocket.CLOSED) socket.close();
    //   }, 200);
    // };
  }, [connectionURL]);

  return (
    <div>
      <h2>QR Generator</h2>
      <p>Connect your phone scanning this qr code</p>
      {connectionURL && <QRCodeSVG value={connectionURL} />}
    </div>
  );
};
