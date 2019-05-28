import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Box, Text, Layer, Button, ThemeContext } from "grommet";
import { CirclePicker } from "react-color";
import { useTheme, themes } from "./ThemeProvider";

const colorList = Object.values(themes).map(theme => theme.backgroundColor);

const StyledPicker = styled(CirclePicker)`
  justify-content: center;
`;

interface SettingsProps {
  hide: () => void;
}

const SettingsModal: FunctionComponent<SettingsProps> = ({ hide }) => {
  const { values, setBackgroundColor } = useTheme();
  const { backgroundColor, color } = values;

  return (
    <ThemeContext.Extend
      value={{ layer: { background: { color: backgroundColor } } }}
    >
      <Layer onEsc={hide} onClickOutside={hide}>
        <Box align="center" pad="xlarge">
          <Text size="xlarge" margin="medium" color={color}>
            Theme
          </Text>
          <Box margin={{ bottom: "large" }} align="center" justify="center">
            <StyledPicker
              circleSpacing={50}
              colors={colorList}
              color={backgroundColor}
              onChangeComplete={color => setBackgroundColor(color.hex)}
            />
          </Box>
          <Button label="close" onClick={hide} />
        </Box>
      </Layer>
    </ThemeContext.Extend>
  );
};

export default SettingsModal;
