import React, { useState, useEffect } from "react";
import { Grommet, Box } from "grommet";
import Loader from "react-loader-spinner";
import { useStickers, useScroll } from "../hooks";
import SearchBar from "./SearchBar";
import StickerList from "./StickerList";
import RecentStickerList from "./RecentStickerList";
import Settings from "./Settings";
import TopMenu from "./TopMenu";
import { useTheme } from "../state/theme";
import { useQuery } from "../state/query";

const makeGrommetTheme = (textColor: string) => ({
  global: {
    font: { family: "Roboto" },
    colors: {
      text: textColor
    }
  }
});

const stickerCount = 25;

export default function App() {
  const {
    values: { color }
  } = useTheme();
  const [showingSettings, setShowingSettings] = useState(false);
  const [showingRecent, setShowingRecent] = useState(false);
  const { distanceFromBottom, distanceFromTop } = useScroll();
  const { query } = useQuery();
  const {
    stickers,
    fetchMore: fetchMoreStickers,
    fetching,
    fetchingMore,
    error
  } = useStickers(query, stickerCount);

  // Trigger fetching more when close to bottom of page
  useEffect(() => {
    if (showingRecent) {
      return;
    }

    if (distanceFromBottom <= 400 && !fetching && !fetchingMore) {
      fetchMoreStickers();
    }
  }, [distanceFromBottom]);

  return (
    <Grommet theme={makeGrommetTheme(color)}>
      {showingSettings && <Settings hide={() => setShowingSettings(false)} />}
      <TopMenu
        onShowSettings={() => setShowingSettings(true)}
        setShowingRecent={setShowingRecent}
        showingRecent={showingRecent}
        distanceFromTop={distanceFromTop}
      />
      <Box direction="column" align="center">
        {showingRecent ? (
          <RecentStickerList />
        ) : (
          <>
            <SearchBar />
            <StickerList
              stickers={stickers}
              fetching={fetching}
              error={error}
            />
          </>
        )}
        <Box direction="column" align="center">
          {fetchingMore && (
            <Loader type="ThreeDots" color="#00BFFF" height="100" width="100" />
          )}
        </Box>
      </Box>
    </Grommet>
  );
}
