import React, { FunctionComponent } from "react";
import { Box, Text } from "grommet";
import { useTheme } from "./state/theme";

interface MessageProps {
  text: string;
}

const Message: FunctionComponent<MessageProps> = ({ text }) => {
  const {
    values: { color }
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
