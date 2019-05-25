import React, { useCallback, useState, useEffect } from "react";
import axios, { AxiosPromise } from "axios";
import { STICKER_API_BASE_URL } from "./constants";
import { GIF } from "./types";

const SEARCH_DELAY_MS = 500;

const numOfStickers = 25;

const getStickers = (
  query: string,
  offset: number = 0
): AxiosPromise<{ data: GIF[] }> =>
  axios.get(STICKER_API_BASE_URL + `&q=${query}&offset=${offset * numOfStickers}`);

export function useStickers(query: string) {
  const [stickers, setStickers] = useState<GIF[] | null>(null);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);

  const searchStickers = useCallback(async () => {
    if (query === "") {
      setStickers(null);
      setFetching(false);
      return;
    }

    try {
      setOffset(0);
      setFetching(true);
      const stickers = await getStickers(query);
      setStickers(stickers.data.data);
      setOffset(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setFetching(false);
    }
  }, [query]);

  const getMoreStickers = async () => {
    try {
      setFetchingMore(true);
      const response = await getStickers(query, offset);
      const nextStickers = response.data.data;
      if (stickers) {
        const uniqueNextStickers = nextStickers.filter(
          nextSticker => 
            stickers.findIndex(sticker => sticker.id === nextSticker.id) === -1
        );
        setStickers([...stickers, ...uniqueNextStickers]);
      } else {
        setStickers([...nextStickers]);
      }
      // const currentStickers = stickers ||
      setOffset(offset + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setFetchingMore(false);
    }
  };

  useEffect(() => {
    setFetching(true);

    const handler = setTimeout(() => {
      searchStickers();
    }, SEARCH_DELAY_MS);

    return () => {
      clearTimeout(handler);
    };
  }, [searchStickers]);

  return { stickers, getMoreStickers, fetching, fetchingMore, error };
}
