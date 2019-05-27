import React, { useCallback, useState, useEffect } from "react";
import axios, { AxiosPromise } from "axios";
import { STICKER_API_BASE_URL } from "./constants";
import { GIF } from "./types";
import { zipUniques } from "./utils";

const SEARCH_DELAY_MS = 500;

const numOfStickers = 25;

const getStickers = (
  query: string,
  offset: number = 0
): AxiosPromise<{ data: GIF[] }> =>
  axios.get(
    STICKER_API_BASE_URL + `&q=${query}&offset=${offset * numOfStickers}`
  );

export function useStickers(query: string) {
  const [stickers, setStickers] = useState<GIF[] | null>(null);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);

  useEffect(() => {
    let cancelled = false;
    
    if (offset !== 0) {
      setOffset(0);
    }

    const searchStickers = async () => {
      try {
        setFetching(true);

        if (query === "") {
          setStickers(null);
          setFetching(false);
          return;
        }

        const stickers = await getStickers(query);

        if (cancelled) {
          return;
        }
        
        setStickers(stickers.data.data);
      } catch (err) {
        if (cancelled) {
          return;
        }

        setError(err.message);
      } finally {
        setFetching(false);
      }
    };

    const timeoutID = setTimeout(() => {
      searchStickers();
    }, SEARCH_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimeout(timeoutID);
    };
  }, [query]);

  useEffect(() => {
    if (offset == 0) {
      return;
    }

    const fetchMoreStickers = async () => {
      try {
        setFetchingMore(true);
        const response = await getStickers(query, offset);
        const nextStickers = response.data.data;
        if (!stickers) {
          setStickers(nextStickers);
        } else {
          const allStickers = zipUniques(stickers, nextStickers, "id");
          setStickers(allStickers);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setFetchingMore(false);
      }
    };
    fetchMoreStickers();
  }, [offset]);

  return { stickers, offset, setOffset, fetching, fetchingMore, error };
}
