export enum ThemeActionType {
  SET_THEME = "SET_THEME"
}

export interface SetThemeAction {
  type: ThemeActionType.SET_THEME;
  color: string;
}

export type ThemeAction = SetThemeAction;
