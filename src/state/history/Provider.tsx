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

interface IHistoryContext {
  values: IHistoryValues;
  addSticker(sticker: GIF): void;
}

export const HistoryContext = createContext<IHistoryContext>({
  values: {
    stickers: []
  },
  addSticker: () => {
    throw new Error("addSticker called before it was defined");
  }
});

export const HistoryProvider: FunctionComponent<ProviderProps> = ({
  children
}) => {
  const [history, historyDispatch] = useReducer(historyReducer, {
    stickers: []
  });

  const addSticker = useCallback((sticker: GIF) => {
    historyDispatch({
      type: HistoryActionType.ADD_STICKER,
      sticker
    });
  }, []);

  return (
    <HistoryContext.Provider value={{ values: history, addSticker }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext<IHistoryContext>(HistoryContext);
