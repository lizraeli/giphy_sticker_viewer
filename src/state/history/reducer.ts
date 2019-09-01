import { IHistoryValues } from "./types";
import { HistoryAction, HistoryActionType } from "./actions";
import StickerList from "../../components/StickerList";

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
    case HistoryActionType.REMOVE_STICKER: {
      const stickers = state.stickers.filter(
        sticker => sticker.id === action.stickerId
      );
    
      return {
        ...state,
        stickers
      };
    }
    default:
      return state;
  }
};
