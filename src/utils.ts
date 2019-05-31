/**
 * Returns the union of the two given arrays,
 * removing duplicates from the second array
 * based on the given key
 */
export const zipUniques = <T, K extends keyof T>(
  arr1: T[],
  arr2: T[],
  key: K
): T[] => {
  // Only keep the element in arr2, where arr1 
  // has no element with the same value for the given key
  const uniqueArr2 = arr2.filter(elem2 =>
    !arr1.some(elem1 => elem1[key] === elem2[key])
  );
  return [...arr1, ...uniqueArr2];
};

export function makeDispatcher<T, ActionArgs>(
  dispatch: React.Dispatch<T>,
  actionCreator: (args: ActionArgs) => T
) {
  return function(args: ActionArgs) {
    dispatch(actionCreator(args));
  };
}