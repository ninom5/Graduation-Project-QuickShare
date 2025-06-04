import { v4 as uuidv4 } from "uuid";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const QrGenerator = () => {
  const [connectionId, setConnectionId] = useState<string>("");
  const [connectionURL, setConnectionURL] = useState<string>("");

  const navigate = useNavigate();

  const socketRef = useRef<WebSocket | null>(null);
  const baseURL = import.meta.env.VITE_CONNECTION_URL;

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

    const socket = new WebSocket(
      `ws://${import.meta.env.VITE_IP}:8080/ws?connectionId=${connectionId}`
    );
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Connection opened");
    };

    socket.onmessage = (event: MessageEvent) => {
      const message = event.data;
      console.log(`Message: ${message}`);

      if (message === "mobile_connected") {
        console.log(message);
        navigate(`/connect/${connectionId}`);
        toast.success("Successfully connected devices");
      }
    };

    socket.onerror = (error: Event) => {
      console.error(`Web socket error: ${error}`);
      toast.error("Web socket error");
    };

    socket.onclose = () => {
      console.log("Connection closed");
    };

    // return () => {
    //   setTimeout(() => {
    //     if (socket.readyState !== WebSocket.CLOSED) socket.close();
    //   }, 25000);
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
