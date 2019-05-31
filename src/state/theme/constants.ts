import { ThemeDict } from "./types";

export const themes: ThemeDict = {
  white: {
    backgroundColor: "#F8F8F8",
    stickerBackgroundColor: "#EDEDED",
    color: "#333333"
  },
  dark: {
    backgroundColor: "#333333",
    stickerBackgroundColor: "#777777",
    color: "#DADADA"
  }
};

export const themeList = Object.values(themes);
