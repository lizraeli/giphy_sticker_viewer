import React, { FunctionComponent } from "react";
import styled from "styled-components";
import ProgressiveImage from "react-progressive-image";
import Loader from "react-loader-spinner";
import { Box, Text } from "grommet";
import { useTheme } from "../state/theme";

const StickerBox = styled(Box)`
  :hover {
    background-color: #6fffb0;
  }
`;

interface StickerProps {
  title: string;
  url: string;
  onClick: () => void;
}

interface StickerImageProps {
  loading: boolean;
}

// const StickerImage = styled.img<StickerImageProps>`
//   opacity: ${props => props.loading ? 0.5 : 1 }
// `;

const Sticker: FunctionComponent<StickerProps> = ({ title, url, onClick }) => {
  const {
    values: { color, stickerBackgroundColor }
  } = useTheme();

  return (
    <StickerBox
      background={stickerBackgroundColor}
      border={{ color, size: "small" }}
      round="small"
      margin={{ bottom: "1rem", top: "1rem" }}
      pad={{ bottom: "1rem", top: "1rem" }}
      animation="zoomIn"
      align="center"
      direction="column"
      gap="large"
      onClick={onClick}
      style={{ width: "250px" }}
    >
      <ProgressiveImage src={url} placeholder="">
        {(src: string, loading: boolean) =>
          loading ? (
            <Loader type="Oval" color="#00BFFF" height="50" width="50" />
          ) : (
            <img src={src} alt={title} />
          )
        }
      </ProgressiveImage>
      <Text color={color} textAlign="center">
        {title}
      </Text>
    </StickerBox>
  );
};

export default Sticker;
