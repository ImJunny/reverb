import { useDebounce } from "@/lib/hooks/useDebounce";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type HtmlHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import {
  SearchContext,
  useSearch,
  type SearchContextType,
} from "@/lib/hooks/useSearch";

// Search
type SearchProps<T> = {
  queryOptions: (query: string) => UseQueryOptions<T>;
} & HtmlHTMLAttributes<HTMLDivElement>;

export function Search<T>({
  queryOptions,
  className,
  children,
}: SearchProps<T>) {
  const [input, setInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const query = useDebounce(input, 400);
  const { data, isFetched } = useQuery<T>(queryOptions(query));

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(e.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const contextValue = {
    input,
    setInput,
    query,
    data,
    isFetched,
    showResults,
    setShowResults,
    resultsRef,
  } as SearchContextType<T>;

  return (
    <SearchContext.Provider value={contextValue}>
      <div className={cn("relative", className)}>{children}</div>
    </SearchContext.Provider>
  );
}

// Search Input
export const SearchInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    hideLabel?: boolean;
  }
>(({ label, hideLabel, ...props }, ref) => {
  const { input, setInput, setShowResults } = useSearch();

  return (
    <Input
      ref={ref}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onFocus={() => setShowResults(true)}
      label={label}
      hideLabel={hideLabel}
      {...props}
    />
  );
});

// Search Results
type SearchResultsProps<T> = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  children: (result: T) => ReactNode;
};
export function SearchResults<T>(props: SearchResultsProps<T>) {
  const { children, className, ...rest } = props;
  const { data, showResults, resultsRef } = useSearch<T>();

  if (!showResults || !Array.isArray(data) || data.length === 0) return null;

  return (
    <div
      ref={resultsRef}
      className={cn("absolute z-10 w-full", className)}
      {...rest}
    >
      {data.map((result, idx) => (
        <Fragment key={idx}>{children(result)}</Fragment>
      ))}
    </div>
  );
}

// Search Result Item
export function SearchResultsItem({
  children,
  className,
  onClick,
  clearInput,
  ...props
}: HTMLAttributes<HTMLDivElement> & { clearInput?: boolean }) {
  const { setShowResults, setInput } = useSearch();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setShowResults(false);
    onClick?.(e);
    if (clearInput) setInput("");
  };
  return (
    <div onClick={handleClick} className={className} {...props}>
      {children}
    </div>
  );
}
