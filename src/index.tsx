import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Helmet } from "react-helmet";
import { Grommet, Box, Button } from "grommet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import { useStickers } from "./hooks";
import SearchBar from "./SearchBar";
import StickerList from "./StickerList";
import Settings from "./Settings";
import { ThemeProvider, useTheme } from "./ThemeProvider";
import { QueryProvider, useQuery } from "./QueryProvider";

const globalTheme = {
  global: {
    font: {
      family: "Roboto"
    }
  }
};

const urlParams = new URLSearchParams(window.location.search);

const stickerCount = 25;

function Root() {
  const { query, setQuery } = useQuery();
  const [prevQuery, setPrevQuery] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [distanceFromBottom, setDistanceFromBottom] = useState(0);
  const {
    stickers,
    setOffset,
    fetching,
    fetchingMore,
    error
  } = useStickers(query, stickerCount);

  const {
    values: { backgroundColor, color }
  } = useTheme();

  const theme = {
    ...globalTheme,
    global: {
      colors: {
        text: color
      }
    }
  };

  useEffect(() => {
    const queryFromUrl = urlParams.get("q");

    if (queryFromUrl) {
      setQuery(queryFromUrl);
    }
  }, []);

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

  useEffect(() => {
    if (query === "" && prevQuery === "") {
      return;
    }

    history.replaceState({}, "", `?q=${query}`);
    setPrevQuery(query);
  }, [query]);

  useEffect(() => {
    if (distanceFromBottom <= 400 && !fetching && !fetchingMore) {
      setOffset(offset => offset + 1);
    }
  }, [distanceFromBottom]);

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
      <Grommet theme={theme}>
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
          <SearchBar  />
          <StickerList
            stickers={stickers}
            fetching={fetching}
            error={error}
          />

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
