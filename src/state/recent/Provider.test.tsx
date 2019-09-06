import "@testing-library/jest-dom/extend-expect";
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required
import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import {
  useRecent,
  RecentStickerProvider,
  RECENT_LOCAL_STORAGE_KEY
} from "./Provider";
import { gif1, gif2 } from "../../fixtures/gif";

test("Add and remove stickers", () => {
  let storedStickers = null;
  const wrapper = ({ children }) => (
    <RecentStickerProvider>{children}</RecentStickerProvider>
  );

  const { result } = renderHook(() => useRecent(), {
    wrapper
  });
  expect(result.current.values.stickers).toHaveLength(0);
  act(() => {
    result.current.addSticker(gif1);
  });
  storedStickers = JSON.parse(localStorage.getItem(RECENT_LOCAL_STORAGE_KEY));
  expect(storedStickers).toHaveLength(1);
  expect(storedStickers[0]).toEqual(gif1);
  expect(result.current.values.stickers).toHaveLength(1);

  // Trying to add the same sticker again
  act(() => {
    result.current.addSticker(gif1);
  });

  expect(result.current.values.stickers).toHaveLength(1);
  expect(result.current.values.stickers[0]).toEqual(gif1);
  storedStickers = JSON.parse(localStorage.getItem(RECENT_LOCAL_STORAGE_KEY));
  expect(storedStickers).toHaveLength(1);
  expect(storedStickers[0]).toEqual(gif1);

  // Adding another sticker
  act(() => {
    result.current.addSticker(gif2);
  });
  expect(result.current.values.stickers).toHaveLength(2);
  expect(result.current.values.stickers[1]).toEqual(gif2);

  storedStickers = JSON.parse(localStorage.getItem(RECENT_LOCAL_STORAGE_KEY));
  expect(storedStickers).toHaveLength(2);
  expect(storedStickers[1]).toEqual(gif2);

  // Removing first sticker
  act(() => {
    result.current.removeSticker(gif1.id);
  });
  expect(result.current.values.stickers).toHaveLength(1);
  expect(result.current.values.stickers[0]).toEqual(gif2);

  storedStickers = JSON.parse(localStorage.getItem(RECENT_LOCAL_STORAGE_KEY));
  expect(storedStickers).toHaveLength(1);
  expect(storedStickers[0]).toEqual(gif2);

  // Removing second sticker
  act(() => {
    result.current.removeSticker(gif2.id);
  });
  expect(result.current.values.stickers).toHaveLength(0);

  storedStickers = JSON.parse(localStorage.getItem(RECENT_LOCAL_STORAGE_KEY));
  expect(storedStickers).toHaveLength(0);
});
