import { v4 as uuidv4 } from "uuid";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export const QrGenerator = () => {
  const [connectionId, setConnectionId] = useState<string>("");
  const [connectionURL, setConnectionURL] = useState<string>("");

  const socketRef = useRef<WebSocket | null>(null);
  console.log(import.meta.env);
  // const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const baseURL = "http://192.168.1.101:5173";
  console.log(baseURL);

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
    if (!connectionURL) return;

    const socket = new WebSocket("ws://localhost:8080/ws");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Connection opened");

      socket.send(JSON.stringify({ connectionId }));
    };

    socket.onclose = () => {
      console.log("Connection closed");
    };

    socket.onmessage = (event) => {
      console.log(`Message: ${event?.data}`);
    };

    socket.onerror = (error) => {
      console.error(`Web socket error: ${error}`);
      toast.error("Web socket error");
    };

    return () => {
      socket.close();
    };
  }, [connectionURL]);

  return (
    <div>
      <h2>QR Generator</h2>
      <p>Connect your phone scanning this qr code</p>
      {connectionURL && <QRCodeSVG value={connectionURL} />}
    </div>
  );
};
