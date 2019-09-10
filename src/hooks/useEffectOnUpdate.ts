import { useEffect, useRef } from "react";

export default function useEffectOnUpdate(
  effectCallback: (...args: any) => void,
  deps?: any[]
): void {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effectCallback();
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
