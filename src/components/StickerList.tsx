import React, { FunctionComponent } from "react";
import copyToClipboard from "copy-to-clipboard";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import { GIF } from "../types";
import Sticker from "./Sticker";
import Message from "./Message";
import { useRecent } from "../state/recent";
import { List, LoadingWrap } from "./StickerList.css";

interface StickerListProps {
  stickers: GIF[] | null;
  fetching?: boolean;
  error?: string;
}

const StickerList: FunctionComponent<StickerListProps> = ({
  stickers,
  fetching,
  error
}) => {
  const { addSticker: addToRecent } = useRecent();

  if (fetching) {
    return (
      <LoadingWrap>
        <Loader type="ThreeDots" color="#00BFFF" height="100" width="100" />
      </LoadingWrap>
    );
  }

  if (!stickers) {
    return <Message text={"type to search for stickers"} />;
  }

  if (stickers.length === 0) {
    return <Message text={"No results found"} />;
  }

  return (
    <List>
      {stickers.map(sticker => {
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
              addToRecent(sticker);
            }}
          />
        );
      })}
    </List>
  );
};

export default StickerList;
