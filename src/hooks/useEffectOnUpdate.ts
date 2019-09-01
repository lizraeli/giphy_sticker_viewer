import { useEffect, useRef } from "react";

export function useEffectOnUpdate(
  effectCallback: (...args: any) => void,
  deps: any[] | undefined
): void {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effectCallback();
    }
  }, deps);
}
