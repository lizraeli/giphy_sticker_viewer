import React, { FunctionComponent } from "react";
import copyToClipboard from "copy-to-clipboard";
import { toast } from "react-toastify";
import Sticker from "./Sticker";
import Message from "./Message";
import { useRecent } from "../state/recent";
import { List } from "./StickerList.css";

const RecentSticker: FunctionComponent<{}> = () => {
  const {
    values: { stickers: historyStickers },
    removeSticker: removeFromRecent
  } = useRecent();

  if (historyStickers.length === 0) {
    return <Message text={"No recent stickers"} />;
  }

  return (
    <List>
      {historyStickers.map(sticker => {
        const { title, slug, images } = sticker;
        const { url } = images.fixed_width_small;
        const { url: originalUrl } = images.original;

        return (
          <Sticker
            key={slug}
            title={title}
            url={url}
            onClick={() => {
              copyToClipboard(originalUrl);
              toast.success("copied to clipboard", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000
              });
            }}
          />
        );
      })}
    </List>
  );
};

export default RecentSticker;
