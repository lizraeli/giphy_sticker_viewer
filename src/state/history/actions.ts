import { GIF } from "../../types";

export const ADD_STICKER = "ADD_STICKER";

export enum HistoryActionType {
  ADD_STICKER = "ADD_STICKER",
  REMOVE_STICKER = "REMOVE_STICKER"
}

export interface AddSticker {
  type: HistoryActionType.ADD_STICKER;
  sticker: GIF;
}

export interface RemoveSticker {
  type: HistoryActionType.REMOVE_STICKER;
  stickerId: string;
}

export type HistoryAction = AddSticker | RemoveSticker;
