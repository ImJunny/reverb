/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useContext,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type SearchFilterContextType<T> = {
  input: string;
  setInput: (value: string) => void;
  searchKey: keyof any;
  results: any[];
  setResults: Dispatch<SetStateAction<any[]>>;
  showResults: boolean;
  setShowResults: Dispatch<SetStateAction<boolean>>;
  resultsRef: RefObject<HTMLDivElement | null>;
};

export const SearchFilterContext = createContext<
  SearchFilterContextType<unknown> | undefined
>(undefined);

export function useSearchFilter<T>() {
  const context = useContext(SearchFilterContext) as
    | SearchFilterContextType<T>
    | undefined;
  if (!context)
    throw new Error("SearchFilter subcomponent used outside of <SearchFilter>");
  return context;
}
