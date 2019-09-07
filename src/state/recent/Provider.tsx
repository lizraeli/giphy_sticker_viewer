import React, { FunctionComponent, createContext, useContext } from "react";
import { ProviderProps, GIF } from "../../types";
import { HistoryValues } from "./types";
import { useRecent } from "./hooks";

interface RecentContext {
  values: HistoryValues;
  addSticker(sticker: GIF): void;
  removeSticker(stickerId: string): void;
}

export const RECENT_LOCAL_STORAGE_KEY = "recent";

export const RecentContext = createContext<RecentContext>({
  values: {
    stickers: []
  },
  addSticker: () => {
    throw new Error("addSticker called before it was defined");
  },
  removeSticker: () => {
    throw new Error("removeSTicker called before it was defined");
  }
});

export const RecentStickerProvider: FunctionComponent<ProviderProps> = ({
  children
}) => {
  const { recentState, addSticker, removeSticker } = useRecent();

  return (
    <RecentContext.Provider
      value={{ values: recentState, addSticker, removeSticker }}
    >
      {children}
    </RecentContext.Provider>
  );
};

export const useRecentContext = () => useContext<RecentContext>(RecentContext);
