import { ThemeDict } from "./types";

export const themes: ThemeDict = {
  white: {
    backgroundColor: "#F8F8F8",
    stickerBackgroundColor: "#EDEDED",
    settingsBackgroundColor: "#E0E0E0",
    color: "#333333"
  },
  dark: {
    backgroundColor: "#444444",
    stickerBackgroundColor: "#777777",
    settingsBackgroundColor: "#555555",
    color: "#DADADA"
  }
};

export const themeList = Object.values(themes);
