import React, { createContext, useContext, useState } from "react";

interface QueryProps {
  query: string;
  setQuery(query: string): void;
}

export const QueryContext = createContext<QueryProps>({
  query: "",
  setQuery: () => {}
});

export const QueryProvider = ({ children }: { children: any }) => {
  const [query, setQuery] = useState("");

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQuery = () => useContext(QueryContext);
