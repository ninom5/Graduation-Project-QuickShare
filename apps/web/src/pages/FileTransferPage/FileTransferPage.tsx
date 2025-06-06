import { MobileFileShare } from "@components/index";
import { useSocketContext } from "hooks";
import { BrowserView, MobileView } from "react-device-detect";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const FileTransferPage = () => {
  const guid = useParams().socketId;
  const { sockets } = useSocketContext();

  if (!guid) return;

  const socket = sockets.get(guid);
  if (!socket) {
    toast.error("Error getting socket");
    return;
  }

  return (
    <>
      <BrowserView>Pc</BrowserView>
      <MobileView>
        <MobileFileShare guid={guid} socket={socket} />
      </MobileView>
    </>
  );
};
