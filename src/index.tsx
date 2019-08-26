import React from "react";
import { render } from "react-dom";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nest } from "./utils";
import App from "./components/App";
import { ThemeProvider, useTheme } from "./state/theme";
import { QueryProvider } from "./state/query";
import { HistoryProvider } from "./state/history";

function Root() {
  const {
    values: { backgroundColor }
  } = useTheme();

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
      <App />
    </>
  );
}

const rootElement = document.getElementById("root");
render(nest(ThemeProvider, QueryProvider, HistoryProvider, Root), rootElement);
