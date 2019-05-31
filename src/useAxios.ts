import React, { useCallback, useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

export function useAxiosGet<T>(
  url: string,
  debounceMs?: number
): { data: T | null; error: string; fetching: boolean } {
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (url === "") {
      return;
    }

    let cancelled = false;
    setFetching(true);

    const fetch = async () => {
      try {
        const response = await axios.get<T>(url);
        if (cancelled) {
          return;
        }
        setData(response.data);
      } catch (err) {
        if (cancelled) {
          return;
        }

        setError(err);
      } finally {
        if (cancelled) {
          return;
        }
        setFetching(false);
      }
    };

    if (debounceMs) {
      const timeoutId = setTimeout(() => {
        if (!cancelled) {
          fetch();
        }
      }, debounceMs);
      return () => {
        cancelled = true;
        clearTimeout(timeoutId);
      };
    } else {
      fetch();
      return () => {
        cancelled = true;
      };
    }
  }, [url]);

  return { fetching, error, data };
}
