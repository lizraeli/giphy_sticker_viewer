import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Box, Text, Layer, Button, ThemeContext } from "grommet";
import { CirclePicker } from "react-color";
import { useTheme, themeList } from "../state/theme";

const colorList = themeList.map(theme => theme.backgroundColor);

const StyledPicker = styled(CirclePicker)`
  justify-content: center;
`;

interface SettingsProps {
  hide: () => void;
}

const SettingsModal: FunctionComponent<SettingsProps> = ({ hide }) => {
  const { values, setTheme } = useTheme();
  const { backgroundColor, color, settingsBackgroundColor } = values;

  return (
    <ThemeContext.Extend
      value={{ layer: { background: { color: backgroundColor } } }}
    >
      <Layer onEsc={hide} onClickOutside={hide}>
        <Box
          align="center"
          pad="xlarge"
          animation="fadeIn"
          background={settingsBackgroundColor}
        >
          <Text size="xlarge" margin="medium" color={color}>
            Theme
          </Text>
          <Box margin={{ bottom: "large" }} align="center" justify="center">
            <StyledPicker
              circleSpacing={50}
              colors={colorList}
              color={backgroundColor}
              onChangeComplete={color => setTheme(color.hex)}
            />
          </Box>
          <Button label="close" onClick={hide} />
        </Box>
      </Layer>
    </ThemeContext.Extend>
  );
};

export default SettingsModal;
