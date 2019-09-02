import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Box, Button } from "grommet";
import { useTheme } from "../state/theme";

interface MenuProps {
  onShowSettings: () => void;
  setShowingRecent: (val: boolean) => void;
  distanceFromTop: number;
  showingRecent: boolean;
}

interface TopMenuProps {
  fixedToTop?: boolean;
}

const Menu = styled.div<TopMenuProps>`
  z-index: 999;
  width: 100%;
  ${({ fixedToTop }) =>
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

const TopMenu: FunctionComponent<MenuProps> = ({
  onShowSettings,
  distanceFromTop,
  setShowingRecent,
  showingRecent
}) => {
  const {
    values: { backgroundColor, color }
  } = useTheme();

  const showFloatingMenu = distanceFromTop > 200;

  if (showFloatingMenu) {
    return (
      <Menu fixedToTop>
        <Box
          align="center"
          margin={{ bottom: "large" }}
          pad={"medium"}
          fill="horizontal"
          background={{ color: backgroundColor }}
          justify="around"
          direction="row"
          animation="zoomIn"
          border={{ size: "xsmall", side: "bottom" }}
        >
          <Button label="settings" color={color} onClick={onShowSettings} />
          <Button label="↑" color={color} onClick={scrollToTop} />
        </Box>
      </Menu>
    );
  }

  return (
    <Menu>
      <Box
        align="center"
        margin={{ bottom: "large" }}
        pad={"large"}
        fill="horizontal"
        background={{ color: backgroundColor }}
        justify="evenly"
        direction="row"
      >
        <Button label="settings" color={color} onClick={onShowSettings} />
        {showingRecent ? (
          <Button
            label="search"
            color={color}
            onClick={() => setShowingRecent(false)}
          />
        ) : (
          <Button
            label="recent"
            color={color}
            onClick={() => setShowingRecent(true)}
          />
        )}
      </Box>
    </Menu>
  );
};

export default TopMenu;
