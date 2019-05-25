import React, { useState } from "react";
import { render } from "react-dom";
import { Helmet } from "react-helmet";
import { Grommet, Box, Button } from "grommet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStickers } from "./hooks";
import SearchBar from "./SearchBar";
import StickerList from "./StickerList";
import Settings from "./Settings";
import { StateProvider, useTheme } from "./state";


const globalTheme = {
  global: {
    font: {
      family: "Roboto"
    }
  }
};

function App() {
  const [query, setQuery] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const { stickers, getMoreStickers, fetching, fetchingMore, error } = useStickers(query);
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

  return (
    <div className="App">
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
          <SearchBar query={query} setQuery={setQuery} />
          <StickerList
            stickers={stickers}
            fetching={fetching}
            fetchingMore={fetchingMore}
            error={error}
            getMoreStickers={getMoreStickers}
          />
        </Box>
      </Grommet>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(
  <StateProvider>
    <App />
  </StateProvider>,

  rootElement
);
