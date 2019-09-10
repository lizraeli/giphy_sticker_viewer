import { useEffect, useState } from "react";
import useEffectOnUpdate from "./useEffectOnUpdate";

const useQueryParam = (paramName: string) => {
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

  /*
   * Set query param to url
   */
  useEffectOnUpdate(() => {
    history.replaceState({}, "", `?${paramName}=${paramValue}`);
  }, [paramName, paramValue]);

  return { paramValue, setParamValue };
};

export default useQueryParam;
