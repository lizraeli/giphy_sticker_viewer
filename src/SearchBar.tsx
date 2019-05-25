import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Box, FormField, TextInput } from "grommet";
import { useTheme, themes } from "./state";

interface SearchBarProps {
  query: string;
  setQuery(value: string):  any;
}

const SearchField = styled(FormField)`
  ${({ color }) =>
    color &&
    `
    color: ${color}
  `}
`;

const SearchBar: FunctionComponent<SearchBarProps> = ({ query, setQuery }) => {
  const {
    values: { color }
  } = useTheme();
  return (
    <Box
      direction="row"
      justify="center"
      pad="medium"
      margin={{ bottom: "medium" }}
      border={{ color, size: "small" }}
      round="small"
    >
      <Box pad="medium">
        <SearchField
          id="query"
          label="Search for stickers"
          autoFocus
          color={color}
        >
          <TextInput
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
          />
        </SearchField>
      </Box>
    </Box>
  );
};

export default SearchBar;
