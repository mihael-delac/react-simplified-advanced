import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  useEffect(() => {
    setError(false);
    setData(undefined);
    setIsLoading(true);
    const controller = new AbortController();

    fetch(url, {
      signal: controller.signal,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res);
        }
      })
      .then(setData)
      .catch((err) => {
        if (err?.name === "AbortError") return;
        setError(true);
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        setIsLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, [url]);
  return { data, isLoading, isError };
}
