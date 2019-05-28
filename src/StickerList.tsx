import React, { FunctionComponent, useState } from "react";
import { GIF } from "./types";
import styled from "styled-components";
import copyToClipboard from "copy-to-clipboard";
import { animateScroll as scroll } from "react-scroll";

import { Box, Button } from "grommet";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import Sticker from "./Sticker";
import Message from "./Message";

const List = styled.div`
  display: "flex";
  flex-direction: "column";
  justify-content: "space-around";
  overflow: "hidden";
  margin-top: "2em";
`;

interface StickerListProps {
  stickers: GIF[] | null;
  fetching: boolean;
  error: string;
}

const LoadingWrap = styled.div`
  margin-top: 2rem;
`;

const StickerList: FunctionComponent<StickerListProps> = ({
  stickers,
  fetching,
  error
}) => {
  if (fetching) {
    return (
      <LoadingWrap>
        <Loader type="ThreeDots" color="#00BFFF" height="100" width="100" />
      </LoadingWrap>
    );
  } else if (!stickers) {
    return <Message text={"type to search for stickers"} />;
  } else if (stickers.length === 0) {
    return <Message text={"No results found"} />;
  }

  return (
    <List>
      {stickers.map((sticker, index) => {
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

export default StickerList;
