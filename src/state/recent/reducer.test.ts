import { historyReducer } from "./reducer";
import { HistoryValues } from "./types";
import { HistoryActionType } from "./actions";
import { gif1, gif2 } from "../../fixtures/gif";

describe("historyReducer", () => {
  test("add sticker when there are none", () => {
    const state: HistoryValues = {
      stickers: []
    };

    const newState = historyReducer(state, {
      type: HistoryActionType.ADD_STICKER,
      sticker: gif1
    });

    expect(newState).toEqual({
      ...state,
      stickers: [gif1]
    });
  });

  test("add sticker when one exists", () => {
    const state: HistoryValues = {
      stickers: [gif1]
    };

    const newState = historyReducer(state, {
      type: HistoryActionType.ADD_STICKER,
      sticker: gif2
    });

    expect(newState).toEqual({
      ...state,
      stickers: [gif1, gif2]
    });
  });

  test("add same sticker as existing one", () => {
    const state: HistoryValues = {
      stickers: [gif1]
    };

    const newState = historyReducer(state, {
      type: HistoryActionType.ADD_STICKER,
      sticker: gif1
    });

    expect(newState).toEqual({
      ...state,
      stickers: [gif1]
    });
  });
});
