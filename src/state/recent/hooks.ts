import { useCallback, useReducer, useEffect } from "react";
import { GIF } from "../../types";
import { historyReducer } from "./reducer";
import { HistoryActionType } from "./actions";
import { useEffectOnUpdate } from "../../hooks/useEffectOnUpdate";

export const RECENT_LOCAL_STORAGE_KEY = "recent";

export const useRecent = () => {
  const [recentState, recentDispatch] = useReducer(historyReducer, {
    stickers: []
  });

  const { stickers } = recentState;

  /**
   * Action dispatchers
   */
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

  /*
   * Load recent stickers from storage on load
   */
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

  /*
   * Save recent stickers to storage
   */
  useEffectOnUpdate(() => {
    localStorage.setItem(RECENT_LOCAL_STORAGE_KEY, JSON.stringify(stickers));
  }, [stickers]);

  return { recentState, addSticker, removeSticker };
};
