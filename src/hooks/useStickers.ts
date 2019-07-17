import { useState, useEffect } from "react";
import { STICKER_API_BASE_URL } from "../constants";
import { GIF } from "../types";
import { zipUniques } from "../utils";
import { useAxios } from "../hooks";

const SEARCH_DELAY_MS = 500;

export default function useStickers(query: string, numOfStickers: number = 25) {
  const [stickers, setStickers] = useState<GIF[] | null>(null);
  const [offset, setOffset] = useState(0);
  const [prevQuery, setPrevQuery] = useState("");
  const [url, setUrl] = useState("");
  const [moreStickersUrl, setMoreStickersUrl] = useState("");

  const {
    data: stickersResponse,
    fetching,
    error: fetchingStickersError
  } = useAxios<{
    data: GIF[];
  }>(url, SEARCH_DELAY_MS);

  const {
    data: moreStickersResponse,
    fetching: fetchingMore,
    error: fetchingMoreError
  } = useAxios<{
    data: GIF[];
  }>(moreStickersUrl);

  useEffect(() => {
    const newStickers = stickersResponse ? stickersResponse.data : null;
    setStickers(newStickers);
  }, [stickersResponse]);

  useEffect(() => {
    const moreStickers = moreStickersResponse
      ? moreStickersResponse.data
      : null;

    if (!moreStickers) {
      return;
    } else if (!stickers) {
      setStickers(moreStickers);
    } else {
      const allStickers = zipUniques(stickers, moreStickers, "id");
      setStickers(allStickers);
    }
  }, [moreStickersResponse]);

  useEffect(() => {
    setPrevQuery(query);

    if (query === "") {
      setUrl("");
      setStickers(null);
    } else if (query !== prevQuery) {
      setOffset(0);

      setUrl(STICKER_API_BASE_URL + `&q=${query}`);
    } else {
      /* query === prevQuery */
      setMoreStickersUrl(
        STICKER_API_BASE_URL + `&q=${query}&offset=${offset * numOfStickers}`
      );
    }
  }, [query, offset]);

  return {
    stickers,
    offset,
    setOffset,
    fetching,
    fetchingMore,
    error: fetchingStickersError || fetchingMoreError
  };
}
