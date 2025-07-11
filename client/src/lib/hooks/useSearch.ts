import {
  createContext,
  useContext,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";

export type SearchContextType<T> = {
  input: string;
  setInput: (value: string) => void;
  query: string;
  data: T | undefined;
  isFetched: boolean;
  showResults: boolean;
  setShowResults: Dispatch<SetStateAction<boolean>>;
  resultsRef: RefObject<HTMLDivElement | null>;
};

export const SearchContext = createContext<
  SearchContextType<unknown> | undefined
>(undefined);

export function useSearch<T>() {
  const context = useContext(SearchContext) as SearchContextType<T> | undefined;
  if (!context) throw new Error("Search subcomponent used outside of <Search>");
  return context;
}
