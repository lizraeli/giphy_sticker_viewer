import { IHistoryValues } from "./types";
import { HistoryAction, HistoryActionType } from "./actions";

export const historyReducer = (
  state: IHistoryValues,
  action: HistoryAction
) => {
  switch (action.type) {
    case HistoryActionType.ADD_STICKER: {
      const stickerExists = state.stickers.some(
        sticker => sticker.id === action.sticker.id
      );
      if (stickerExists) {
        return state;
      }
      
      return {
        ...state,
        stickers: [...state.stickers, action.sticker]
      };
    }
    default:
      return state;
  }
};
