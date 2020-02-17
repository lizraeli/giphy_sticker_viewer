export interface ThemeValues {
  backgroundColor: string;
  stickerBackgroundColor: string;
  settingsBackgroundColor: string;
  color: string;
}

export interface ThemeDict {
  [key: string]: ThemeValues;
}
