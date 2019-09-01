import React, { FunctionComponent } from "react";
import copyToClipboard from "copy-to-clipboard";
import { toast } from "react-toastify";
import { GIF } from "../types";
import Sticker from "./Sticker";
import Message from "./Message";
import { useHistory } from "../state/history";
import { List } from "./StickerList.css";

interface RecentStickerProps {}

const RecentSticker: FunctionComponent<RecentStickerProps> = () => {
  const {
    values: { stickers: historyStickers },
    removeSticker: removeFromRecent
  } = useHistory();

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
