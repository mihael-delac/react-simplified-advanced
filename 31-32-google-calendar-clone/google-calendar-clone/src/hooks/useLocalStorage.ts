import { useEffect, useState } from "react";
import { EventObject } from "../components/Day";

interface IUseLocalStorageProps {
  key: string;
  initialValue: EventObject[] | [];
}

export function useLocalStorage({ key, initialValue }: IUseLocalStorageProps) {
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key);
    if (localValue == null) {
      return initialValue;
    } else {
      return JSON.parse(localValue);
    }
  });

  useEffect(() => {
    if (value === undefined || value.length == 0) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key]);

  return [value, setValue];
}
