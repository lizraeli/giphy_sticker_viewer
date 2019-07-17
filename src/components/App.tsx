import React, { useState, useEffect } from "react";
import { Grommet, Box } from "grommet";
import Loader from "react-loader-spinner";
import { useStickers, useScroll } from "../hooks";
import SearchBar from "./SearchBar";
import StickerList from "./StickerList";
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

const urlParams = new URLSearchParams(window.location.search);

const stickerCount = 25;

export default function App() {
  const {
    values: { color }
  } = useTheme();
  const { query, setQuery } = useQuery();
  const [prevQuery, setPrevQuery] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const { distanceFromBottom, distanceFromTop } = useScroll();
  const { stickers, setOffset, fetching, fetchingMore, error } = useStickers(
    query,
    stickerCount
  );

  // Trigger fetching more when close to bottom of page
  useEffect(() => {
    if (distanceFromBottom <= 400 && !fetching && !fetchingMore) {
      setOffset(offset => offset + 1);
    }
  }, [distanceFromBottom]);

  // Load query from URL on page load
  useEffect(() => {
    const queryFromUrl = urlParams.get("q");

    if (queryFromUrl) {
      setQuery(queryFromUrl);
    }
  }, []);

  // Set query as url param
  useEffect(() => {
    if (query === prevQuery) {
      return;
    }

    history.replaceState({}, "", `?q=${query}`);
    setPrevQuery(query);
  }, [query]);

  return (
    <Grommet theme={makeGrommetTheme(color)}>
      {showSettings && <Settings hide={() => setShowSettings(false)} />}
      <TopMenu
        onShowSettings={() => setShowSettings(true)}
        distanceFromTop={distanceFromTop}
      />
      <Box direction="column" align="center">
        <SearchBar />
        <StickerList stickers={stickers} fetching={fetching} error={error} />

        <Box direction="column" align="center">
          {fetchingMore && (
            <Loader type="ThreeDots" color="#00BFFF" height="100" width="100" />
          )}
        </Box>
      </Box>
    </Grommet>
  );
}
