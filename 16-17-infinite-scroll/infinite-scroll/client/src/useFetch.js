import { useEffect, useState } from "react";

export function useFetch(url) {
  console.log("url", url);
  const [newData, setNewData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  useEffect(() => {
    setError(false);
    setNewData(undefined);
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
      .then(setNewData)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  console.log("newdata", newData);
  return { newData, isLoading, isError };
}
