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

    case HistoryActionType.REMOVE_STICKER: {
      const stickers = state.stickers.filter(
        sticker => sticker.id === action.stickerId
      );
    
      return {
        ...state,
        stickers
      };
    }

    case HistoryActionType.SET_STICKERS: {
      return {
        ...state,
        stickers: action.stickers
      }
    }

    default:
      return state;
  }
};
