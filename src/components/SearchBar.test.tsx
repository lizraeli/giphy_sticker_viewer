import React from "react";
import { Grommet } from "grommet";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { mocked } from "ts-jest/utils";
import SearchBar from "./SearchBar";
import { themes } from "../state/theme";
import { useTheme } from "../state/theme";
import { useQueryContext } from "../state/query";

jest.mock("../state/query");
jest.mock("../state/theme");

mocked(useTheme).mockImplementation(() => {
  return {
    values: themes.white,
    setTheme: jest.fn()
  };
});

const queryContext = {
  query: "bears",
  setQuery: jest.fn()
};

mocked(useQueryContext).mockImplementation(() => queryContext);
const renderWithGrommet = (comp: React.ReactElement) => {
  return render(<Grommet>{comp}</Grommet>);
};

test("", () => {
  const { getByDisplayValue } = renderWithGrommet(<SearchBar />);
  const queryInput = getByDisplayValue(queryContext.query);
  userEvent.type(queryInput, "cats");
  expect(queryContext.setQuery).toHaveBeenCalledWith("cats");
});
