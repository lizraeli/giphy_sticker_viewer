import { GIF } from "../../types";

export const ADD_STICKER = "ADD_STICKER";

export enum HistoryActionType {
  ADD_STICKER = "ADD_STICKER",
  REMOVE_STICKER = "REMOVE_STICKER",
  SET_STICKERS = "SET_STICKERS"
}

export interface AddSticker {
  type: HistoryActionType.ADD_STICKER;
  sticker: GIF;
}

export interface RemoveSticker {
  type: HistoryActionType.REMOVE_STICKER;
  stickerId: string;
}

export interface SetStickers {
  type: HistoryActionType.SET_STICKERS;
  stickers: GIF[];
}

export type HistoryAction = AddSticker | RemoveSticker | SetStickers;
