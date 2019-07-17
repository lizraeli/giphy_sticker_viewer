import React, { FunctionComponent, useEffect } from "react";
import styled from "styled-components";
import { Box, Button } from "grommet";
import { useTheme } from "../state/theme";

interface MenuProps {
  onShowSettings: () => void;
  distanceFromTop: number;
}

interface TopMenuProps {
  fixedToTop: boolean;
}

const Menu = styled.div<TopMenuProps>`
  z-index: 999;
  width: 100%;
  ${({fixedToTop}) =>
    fixedToTop &&
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

const TopMenu: FunctionComponent<MenuProps> = ({ onShowSettings, distanceFromTop }) => {
  const {
    values: { backgroundColor, color }
  } = useTheme();


 
  const showFloatingMenu = distanceFromTop > 200;

  return (
    <Menu fixedToTop={showFloatingMenu}>
      <Box
        align="center"
        margin={{ bottom: "large" }}
        pad={showFloatingMenu ? "medium" : "large"}
        fill="horizontal"
        background={{ color: backgroundColor }}
        justify="around"
        direction="row"
        {...showFloatingMenu && {
          animation: "zoomIn",
          border: { size: "xsmall", side: "bottom" }
        }}
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
