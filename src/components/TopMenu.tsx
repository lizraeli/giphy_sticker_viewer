import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Box, Button } from "grommet";
import { useTheme } from "../state/theme";

interface MenuProps {
  onShowSettings: () => void;
  distanceFromBottom: number;
}

interface TopMenuProps {
  showFloatingMenu: boolean;
}

const Menu = styled.div<TopMenuProps>`
  z-index: 999;
  width: 100%;
  ${props =>
    props.showFloatingMenu &&
    `
    position: fixed;
  `}
`;

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

const TopMenu: FunctionComponent<MenuProps> = ({ onShowSettings }) => {
  const {
    values: { backgroundColor, color }
  } = useTheme();

  const showFloatingMenu = window.scrollY > 200;
  return (
    <Menu showFloatingMenu={showFloatingMenu}>
      <Box
        align="center"
        margin={{ bottom: "large" }}
        pad={showFloatingMenu ? "medium" : "large"}
        border={showFloatingMenu && {
          "size": "xsmall",
          "side": "bottom"
        }}
        fill="horizontal"
        background={backgroundColor}
        justify="around"
        direction="row"
      >
        <Button label="settings" color={color} onClick={onShowSettings} />
        {showFloatingMenu && (
          <Button label="↑" color={color} onClick={scrollToTop} />
        )}
      </Box>
    </Menu>
  );
};

export default TopMenu;
