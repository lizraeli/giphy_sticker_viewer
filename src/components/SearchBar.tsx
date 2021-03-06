import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Box, FormField, TextInput } from "grommet";
import { useTheme } from "../state/theme";
import { useQuery } from "../state/query";

const SearchField = styled(FormField)`
  ${({ color }) =>
    color &&
    `
    color: ${color}
  `}
`;

const SearchBar: FunctionComponent = () => {
  const {
    values: { color }
  } = useTheme();
  const { query, setQuery } = useQuery();

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
