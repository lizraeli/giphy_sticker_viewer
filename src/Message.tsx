import React, { FunctionComponent } from "react";
import { Box, Text } from "grommet";
import { useTheme } from "./ThemeProvider";

interface MessageProps {
  text: string;
}

const Message: FunctionComponent<MessageProps> = ({ text }) => {
  const {
    values: { color, stickerBackgroundColor }
  } = useTheme();

  return (
    <Box pad="small" elevation="small" margin={{ top: "2rem" }}>
      <Text color={color} textAlign="center">
        {text}
      </Text>
    </Box>
  );
};

export default Message;
