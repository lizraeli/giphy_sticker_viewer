import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Helmet } from "react-helmet";
import { Grommet, Box, Button } from "grommet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import { useStickers } from "./hooks";
import SearchBar from "./components/SearchBar";
import StickerList from "./components/StickerList";
import Settings from "./components/Settings";
import { ThemeProvider, useTheme } from "./state/theme";
import { QueryProvider, useQuery } from "./state/query";

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

function Root() {
  const {
    values: { backgroundColor, color }
  } = useTheme();
  const { query, setQuery } = useQuery();
  const [prevQuery, setPrevQuery] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [distanceFromBottom, setDistanceFromBottom] = useState(0);
  const { stickers, setOffset, fetching, fetchingMore, error } = useStickers(
    query,
    stickerCount
  );

  // Set up scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const distanceFromBottom =
        document.body.scrollHeight - window.innerHeight - window.scrollY;
      setDistanceFromBottom(distanceFromBottom);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    if (query === "" && prevQuery === "") {
      return;
    }

    history.replaceState({}, "", `?q=${query}`);
    setPrevQuery(query);
  }, [query]);

  return (
    <>
      <ToastContainer />
      <Helmet>
        <style type="text/css">{`
        body {
            background-color: ${backgroundColor};
            margin: 0;
        }
        `}</style>
      </Helmet>
      <Grommet theme={makeGrommetTheme(color)}>
        {showSettings && <Settings hide={() => setShowSettings(false)} />}
        <Box
          align="center"
          margin={{ bottom: "large" }}
          pad="large"
          border="bottom"
        >
          <Button
            label="settings"
            color={color}
            onClick={() => setShowSettings(true)}
          />
        </Box>
        <Box direction="column" align="center">
          <SearchBar />
          <StickerList stickers={stickers} fetching={fetching} error={error} />

          <Box direction="column" align="center">
            {fetchingMore && (
              <Loader
                type="ThreeDots"
                color="#00BFFF"
                height="100"
                width="100"
              />
            )}
          </Box>
        </Box>
      </Grommet>
    </>
  );
}

const rootElement = document.getElementById("root");
render(
  <ThemeProvider>
    <QueryProvider>
      <Root />
    </QueryProvider>
  </ThemeProvider>,
  rootElement
);
