import { zipUniques } from "./utils";

describe("zipUniques", () => {
  interface Animal {
    id: string;
    name: string;
    type: string;
  }

  it("works when there is no overlap for the given key", () => {
    const arr1: Animal[] = [
      { name: "Joe", type: "dog", id: "1" },
      { name: "Ruffles", type: "cat", id: "2" }
    ];
    const arr2: Animal[] = [
      { name: "Tim", type: "dog", id: "3" },
      { name: "Joe", type: "cat", id: "4" }
    ];
    expect(zipUniques(arr1, arr2, "id")).toEqual([...arr1, ...arr2]);
  });

  it("Removes duplicates from arr2 when there is overlap", () => {
    const arr1: Animal[] = [
      { name: "Joe", type: "dog", id: "1" },
      { name: "Ruffles", type: "cat", id: "2" }
    ];
    const arr2: Animal[] = [
      { name: "Tim", type: "dog", id: "1" },
      { name: "Joe", type: "cat", id: "4" }
    ];
    expect(zipUniques(arr1, arr2, "id")).toEqual([
      ...arr1,
      { name: "Joe", type: "cat", id: "4" }
    ]);
  });
});
