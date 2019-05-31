import { ThemeValues } from "./types";
import { ThemeAction, ThemeActionType } from "./actions";
import { themeList } from "./constants";

export const themeReducer = (state: ThemeValues, action: ThemeAction) => {
  switch (action.type) {
    case ThemeActionType.SET_THEME: {
      const selectedColor = action.color.toLowerCase();
      const newTheme = themeList.find(
        theme => theme.backgroundColor === selectedColor
      );
      return newTheme || state;
    }
    default:
      return state;
  }
};
