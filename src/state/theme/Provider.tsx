import React, {
  FunctionComponent,
  createContext,
  useContext,
  useReducer,
  useCallback
} from "react";
import { ProviderProps } from "../../types";
import { ThemeActionType } from "./actions";
import { ThemeValues } from "./types";
import { themes } from "./constants";
import { themeReducer } from "./reducer";

interface ThemeContext {
  values: ThemeValues;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContext>({
  values: themes.white,
  setTheme: () => {}
});

export const ThemeProvider: FunctionComponent<ProviderProps> = ({
  children
}) => {
  const [theme, dispatch] = useReducer(themeReducer, themes.white);
  const dispatchSetTheme = useCallback(
    (color: string) =>
      dispatch({
        type: ThemeActionType.SET_THEME,
        color
      }),
    []
  );

  return (
    <ThemeContext.Provider
      value={{ values: theme, setTheme: dispatchSetTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext<ThemeContext>(ThemeContext);
