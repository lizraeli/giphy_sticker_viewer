import React, { useCallback, useState, useEffect } from "react";
import axios, { AxiosPromise } from "axios";
import { STICKER_API_BASE_URL } from "./constants";
import { GIF } from "./types";
import { zipUniques } from "./utils";

const SEARCH_DELAY_MS = 500;

const getStickers = (
  query: string,
  numOfStickers: number = 25,
  offset: number = 0
): AxiosPromise<{ data: GIF[] }> =>
  axios.get(
    STICKER_API_BASE_URL + `&q=${query}&offset=${offset * numOfStickers}`
  );

export function useStickers(query: string, numOfStickers: number = 25) {
  const [stickers, setStickers] = useState<GIF[] | null>(null);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [prevQuery, setPrevQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    const searchStickers = async () => {
      try {
        setFetching(true);

        const stickers = await getStickers(query, numOfStickers);

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

    const fetchMoreStickers = async () => {
      try {
        setFetchingMore(true);
        const response = await getStickers(query, numOfStickers, offset);
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

    if (query === "") {
      setPrevQuery("");
      setStickers(null);
      setFetching(false);
    } else if (query !== prevQuery) {
      setPrevQuery(query);
      setFetching(true);
      setOffset(0);

      const timeoutID = setTimeout(() => {
        searchStickers();
      }, SEARCH_DELAY_MS);

      return () => {
        cancelled = true;
        clearTimeout(timeoutID);
      };
    } else {
      setPrevQuery(query);
      fetchMoreStickers();
      return () => {
        cancelled = true;
      };
    }
  }, [query, offset]);

  return { stickers, offset, setOffset, fetching, fetchingMore, error };
}
