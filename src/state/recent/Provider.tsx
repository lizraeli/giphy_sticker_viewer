import React, {
  FunctionComponent,
  createContext,
  useContext,
  useCallback,
  useReducer
} from "react";
import { ProviderProps, GIF } from "../../types";
import { IHistoryValues } from "./types";
import { historyReducer } from "./reducer";
import { HistoryActionType } from "./actions";

interface IRecentContext {
  values: IHistoryValues;
  addSticker(sticker: GIF): void;
  removeSticker(stickerId: string): void;
}

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
  const [recent, recentDispatch] = useReducer(historyReducer, {
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

  return (
    <RecentContext.Provider value={{ values: recent, addSticker, removeSticker }}>
      {children}
    </RecentContext.Provider>
  );
};

export const useRecent = () => useContext<IRecentContext>(RecentContext);
