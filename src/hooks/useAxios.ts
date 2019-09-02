import { useState, useEffect } from "react";
import axios from "axios";

export default function useAxiosGet<T>(
  url: string,
  debounceMs?: number
): { data: T | null; error: string; fetching: boolean } {
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (url === "") {
      setFetching(false);
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

        setFetching(false);
        setData(response.data);
      } catch (err) {
        if (cancelled) {
          return;
        }

        setFetching(false);
        setError(err);
      }
    };

    if (debounceMs) {
      const timeoutId = setTimeout(() => {
        if (cancelled) {
          return;
        }
        fetch();
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
