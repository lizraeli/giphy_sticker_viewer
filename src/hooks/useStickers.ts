import { useState, useEffect, useCallback } from "react";
import { STICKERS_LAMBDA_URL } from "../constants";
import { GIF } from "../types";
import { zipUniques } from "../utils";
import { useAxios } from "../hooks";

const SEARCH_DELAY_MS = 500;

export default function useStickers(query: string, numOfStickers = 25) {
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
    }

    if (!stickers) {
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

      setUrl(STICKERS_LAMBDA_URL + `?q=${query}`);
    } else {
      /* query === prevQuery */
      setMoreStickersUrl(
        STICKERS_LAMBDA_URL + `?q=${query}&offset=${offset * numOfStickers}`
      );
    }
  }, [query, offset]);

  const fetchMore = useCallback(() => {
    setOffset(offset => offset + 1);
  }, []);

  return {
    stickers,
    offset,
    setOffset,
    fetchMore,
    fetching,
    fetchingMore,
    error: fetchingStickersError || fetchingMoreError
  };
}
