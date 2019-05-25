import React, { createContext, useContext, useState } from "react";

interface ThemeValues {
  backgroundColor: string;
  stickerBackgroundColor: string;
  color: string;
}

interface ThemeProps {
  values: ThemeValues;
  setBackgroundColor(color: string): void;
}

interface ThemeDict {
  [key: string]: ThemeValues;
}

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

const ThemeContext = createContext<ThemeProps>({
  values: themes.white,
  setBackgroundColor: () => {}
});

export const StateProvider = ({ children }: { children: any }) => {
  const [theme, setTheme] = useState<ThemeValues>(themes.white);

  const setBackgroundColor = (color: string) => {
    const { white, dark } = themes;
    switch (color.toUpperCase()) {
      case white.backgroundColor:
        setTheme(white);
        break;
      case dark.backgroundColor:
        setTheme(dark);
        break;
      default:
        setTheme(white);
    }
  };

  return (
    <ThemeContext.Provider value={{ values: theme, setBackgroundColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext<ThemeProps>(ThemeContext);
