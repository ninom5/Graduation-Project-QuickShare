import { useEffect } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const FileTransferPage = () => {
  const guid = useParams().socketId;
  console.log(guid);
  useEffect(() => {
    if (!guid) return;
    toast.success("fetching...");
    fetch(
      `http://${import.meta.env.VITE_IP}:8080/api/sessions/connect/${guid}`,
      {
        method: "POST",
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to notify server");
        console.log("Mobile connected, backend notified.");
        toast.success("Success");
      })
      .catch((err) => {
        console.error("Error notifying server:", err);
      });
  }, [guid]);

  return (
    <>
      <div>bravo </div>
      <BrowserView>Pc</BrowserView>
      <MobileView>Phone</MobileView>
    </>
  );
};
