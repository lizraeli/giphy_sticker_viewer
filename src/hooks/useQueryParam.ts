import { useEffect, useState, useCallback } from "react";

const setQueryParam = (paramName: string, paramValue: string) => {
  window.history.replaceState({}, "", `?${paramName}=${paramValue}`);
};

export default function useQueryParam(paramName: string) {
  const [paramValue, setParamValue] = useState("");

  /*
   * Load query param from URL on page load
   */
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramValueFromUrl = urlParams.get(paramName);

    if (paramValueFromUrl) {
      setParamValue(paramValueFromUrl);
    }
  }, [paramName]);

  const setParam = useCallback(
    (value: string) => {
      setParamValue(value);
      setQueryParam(paramName, paramValue);
    },
    [paramName, paramValue]
  );

  return { value: paramValue, setValue: setParam };
}
