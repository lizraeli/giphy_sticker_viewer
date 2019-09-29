import React, { FunctionComponent, createContext, useContext } from "react";
import { ProviderProps } from "../../types";
import { useQueryParam } from "../../hooks";

interface QueryProps {
  query: string;
  setQuery(query: string): void;
}

export const QueryContext = createContext<QueryProps>({
  query: "",
  setQuery: () => {}
});

export const QueryProvider: FunctionComponent = ({ children }) => {
  const { value: query, setValue: setQuery } = useQueryParam("q");

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQueryContext = () => useContext(QueryContext);
