import React, {
  FunctionComponent,
  createContext,
  useContext,
  useState
} from "react";
import { ProviderProps } from "./types";

interface QueryProps {
  query: string;
  setQuery(query: string): void;
}

export const QueryContext = createContext<QueryProps>({
  query: "",
  setQuery: () => {}
});

export const QueryProvider: FunctionComponent<ProviderProps> = ({
  children
}) => {
  const [query, setQuery] = useState("");

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQuery = () => useContext(QueryContext);
