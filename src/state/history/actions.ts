import { GIF } from "../../types";

export const ADD_STICKER = "ADD_STICKER";

export enum HistoryActionType {
  ADD_STICKER = "ADD_STICKER"
}

export interface AddSticker {
  type: HistoryActionType.ADD_STICKER;
  sticker: GIF;
}

export type HistoryAction = AddSticker;
