import React, {
  FunctionComponent,
  createContext,
  useContext,
  useReducer
} from "react";
import { ProviderProps } from "../../types";
import { setTheme } from "./actions";
import { ThemeValues } from "./types";
import { themes } from "./constants";
import { themeReducer } from "./reducer";

interface IThemeContext {
  values: ThemeValues;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<IThemeContext>({
  values: themes.white,
  setTheme: () => {}
});

export const ThemeProvider: FunctionComponent<ProviderProps> = ({
  children
}) => {
  const [theme, dispatch] = useReducer(themeReducer, themes.white);
  const dispatchSetTheme = (color: string) => dispatch(setTheme(color));

  return (
    <ThemeContext.Provider
      value={{ values: theme, setTheme: dispatchSetTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext<IThemeContext>(ThemeContext);
