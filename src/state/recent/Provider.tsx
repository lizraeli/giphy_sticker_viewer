import React, {
  FunctionComponent,
  createContext,
  useContext,
  useCallback,
  useReducer,
  useEffect
} from "react";
import { ProviderProps, GIF } from "../../types";
import { IHistoryValues } from "./types";
import { historyReducer } from "./reducer";
import { HistoryActionType } from "./actions";
import { useEffectOnUpdate } from "../../hooks/useEffectOnUpdate";

interface IRecentContext {
  values: IHistoryValues;
  addSticker(sticker: GIF): void;
  removeSticker(stickerId: string): void;
}

const RECENT_LOCAL_STORAGE_KEY = "recent";

export const RecentContext = createContext<IRecentContext>({
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
  const [recentState, recentDispatch] = useReducer(historyReducer, {
    stickers: []
  });

  const addSticker = useCallback((sticker: GIF) => {
    recentDispatch({
      type: HistoryActionType.ADD_STICKER,
      sticker
    });
  }, []);

  const removeSticker = useCallback((stickerId: string) => {
    recentDispatch({
      type: HistoryActionType.REMOVE_STICKER,
      stickerId
    });
  }, []);

  useEffect(() => {
    const storedStickers = localStorage.getItem(RECENT_LOCAL_STORAGE_KEY);
    const parsedStickers: GIF[] = storedStickers
      ? JSON.parse(storedStickers)
      : [];

    if (parsedStickers.length && Array.isArray(parsedStickers)) {
      recentDispatch({
        type: HistoryActionType.SET_STICKERS,
        stickers: parsedStickers
      });
    }
  }, []);

  const { stickers } = recentState;

  useEffectOnUpdate(() => {
    localStorage.setItem(RECENT_LOCAL_STORAGE_KEY, JSON.stringify(stickers));
  }, [stickers]);

  return (
    <RecentContext.Provider
      value={{ values: recentState, addSticker, removeSticker }}
    >
      {children}
    </RecentContext.Provider>
  );
};

export const useRecent = () => useContext<IRecentContext>(RecentContext);
