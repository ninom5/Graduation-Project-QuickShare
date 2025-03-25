import { v4 as uuidv4 } from "uuid";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { connectSocket } from "connectSocket";

export const QrGenerator = () => {
  const [connectionId, setConnectionId] = useState<string | null>(null);
  const [connectionURL, setConnectionURL] = useState<string>("");
  const baseURL = "http://localhost:5173";

  useEffect(() => {
    const id = uuidv4();
    setConnectionId(id);
    setConnectionURL(`${baseURL}/connect/${connectionId}`);
    console.log("Connection URL:", connectionURL);
    console.log("Connection URL:", connectionId);
  }, []);

  useEffect(() => {
    if (!connectionURL) return;

    const socket = connectSocket();
    socket.connect();

    return () => {
      socket.disconnect();
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
