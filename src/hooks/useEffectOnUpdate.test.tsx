import { useState } from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import useEffectOnUpdate from "./useEffectOnUpdate";

test("no deps provided", () => {
  const callback = jest.fn();
  const useWrapper = () => {
    const [val, setVal] = useState(0);
    useEffectOnUpdate(callback);
    return {
      update: () => setVal(val + 1)
    };
  };

  const { result } = renderHook(useWrapper);
  expect(callback).toHaveBeenCalledTimes(0);

  act(() => {
    result.current.update();
  });
  expect(callback).toHaveBeenCalledTimes(1);
});

test("called only change to provided dependency", () => {
  const callback = jest.fn();
  const useWrapper = () => {
    const [val1, setVal1] = useState(0);
    const [val2, setVal2] = useState(0);

    useEffectOnUpdate(callback, [val1]);
    return {
      update1: () => setVal1(val1 + 1),
      update2: () => setVal2(val2 + 1)
    };
  };

  const { result } = renderHook(useWrapper);
  expect(callback).toHaveBeenCalledTimes(0);

  act(() => {
    result.current.update2();
  });
  expect(callback).toHaveBeenCalledTimes(0);

  act(() => {
    result.current.update1();
  });
  expect(callback).toHaveBeenCalledTimes(1);
});
