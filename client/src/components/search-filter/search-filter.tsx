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
  SearchFilterContext,
  useSearchFilter,
  type SearchFilterContextType,
} from "@/lib/hooks/useSearchFilter";
import { ScrollArea } from "../ui/scroll-area";

// Search Filter
export function SearchFilter<T>({
  className,
  children,
  data,
  searchKey,
}: HtmlHTMLAttributes<HTMLDivElement> & {
  data: T[] | undefined;
  searchKey: keyof T;
}) {
  const [input, setInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [results, setResults] = useState<T[]>(data ?? []);

  useEffect(() => {
    if (data) setResults(data);
  }, [data]);

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
    searchKey,
    results,
    setResults,
    showResults,
    setShowResults,
    resultsRef,
  } as SearchFilterContextType<T>;

  return (
    <SearchFilterContext.Provider value={contextValue}>
      <div className={cn("relative", className)}>{children}</div>
    </SearchFilterContext.Provider>
  );
}

// Search Filter Input
export const SearchFilterInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    hideLabel?: boolean;
  }
>(({ label, hideLabel, ...props }, ref) => {
  const { input, setInput, setShowResults } = useSearchFilter();

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

// Search Filter Results
type SearchResultsProps<T> = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  children: (result: T) => ReactNode;
};
export function SearchFilterResults<T>(props: SearchResultsProps<T>) {
  const { children, className, ...rest } = props;
  const { results, showResults, resultsRef, input, searchKey } =
    useSearchFilter<T>();

  const outerClass = className?.replace(/max-h-\S+/g, "").trim();
  const innerClass = className
    ?.split(" ")
    .filter((cls: string) => cls.startsWith("max-h-"))
    .join(" ");

  if (!showResults || !Array.isArray(results) || results.length === 0)
    return null;

  return (
    <div className="absolute z-10 w-full">
      <ScrollArea className={cn(outerClass)} ref={resultsRef}>
        <div {...rest} className={cn(innerClass)}>
          {results
            .filter((result) => {
              if (!searchKey) return true;
              const value = result[searchKey];
              return (
                typeof value === "string" &&
                value.toLowerCase().includes(input.toLowerCase())
              );
            })
            .map((result, idx) => (
              <Fragment key={idx}>{children(result)}</Fragment>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
}

// Search Filter Results Item
export function SearchFilterResultsItem({
  children,
  className,
  onClick,
  clearInput,
  ...props
}: HTMLAttributes<HTMLDivElement> & { clearInput?: boolean }) {
  const { setShowResults, setInput } = useSearchFilter();

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
