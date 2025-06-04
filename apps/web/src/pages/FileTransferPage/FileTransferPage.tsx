import { MobileFileShare } from "@components/index";
import { BrowserView, MobileView } from "react-device-detect";
import { useParams } from "react-router-dom";

export const FileTransferPage = () => {
  const guid = useParams().socketId;
  console.log(guid);

  return (
    <>
      <div>bravo </div>
      <BrowserView>Pc</BrowserView>
      <MobileView>
        <MobileFileShare guid={guid} />
      </MobileView>
    </>
  );
};
