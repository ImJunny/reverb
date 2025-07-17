import { useRef, useState, useEffect } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./scroll-area";

export function TagInput({
  options = [],
  className,
  selected = [],
  onChange,
  placeholder,
  hideLabel = false,
  label,
  ...props
}: {
  options?: { label: string; value: string }[];
  selected?: { value: string; label: string }[];
  onChange: (tags: { value: string; label: string }[]) => void;
  className?: string;
  placeholder?: string;
  hideLabel?: boolean;
  label?: string;
} & Omit<React.ComponentProps<"input">, "onChange">) {
  const [input, setInput] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(
    (opt) =>
      !selected.map((tag) => tag.value).includes(opt.value) &&
      opt.label.toLowerCase().includes(input.toLowerCase()),
  );

  const handleFocus = () => {
    setShowOptions(true);
  };

  const handleSelect = (tag: { label: string; value: string }) => {
    onChange?.([...selected, tag]);
    setInput("");
    setShowOptions(false);
  };

  const handleRemove = (tag: { label: string; value: string }) => {
    onChange?.(selected.filter((t) => t.value !== tag.value));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div
      className={cn("relative min-w-0 flex-1", className)}
      ref={containerRef}
    >
      <div
        className={cn(
          "bg-input peer flex h-9 items-center rounded-xs text-sm shadow-sm transition-colors",
          "focus-within:ring-ring/50 focus-within:bg-input/50 focus-within:ring-[1px] focus-within:outline-none",
        )}
      >
        <div
          ref={scrollContainerRef}
          className="scrollbar-none flex w-full items-center gap-2 overflow-x-auto px-3 whitespace-nowrap"
          onClick={handleFocus}
        >
          {selected.map((tag) => (
            <button
              key={tag.value}
              type="button"
              data-remove-tag
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(tag);
              }}
              className="cursor-pointer"
            >
              <Badge className="flex items-center gap-1">
                {tag.label}
                <X size={12} />
              </Badge>
            </button>
          ))}
          <input
            className={cn(
              "h-9 w-full min-w-30 flex-1 border-none bg-transparent p-0 text-sm outline-none",
            )}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            onFocus={(e) => {
              setShowOptions(true);
              if (!hideLabel) {
                e.target.placeholder = "";
              }
            }}
            onBlur={(e) => {
              e.target.placeholder = placeholder || "";
            }}
            {...props}
          />
        </div>
      </div>

      {showOptions && filteredOptions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full">
          <ScrollArea className="bg-card rounded-xxs p-1 shadow-md">
            <div className="h-full max-h-52">
              {filteredOptions.map((opt) => (
                <div
                  key={opt.value}
                  className="rounded-xxs px-2 py-1.5 text-xs hover:bg-white/10"
                  onClick={() => handleSelect(opt)}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
      <div
        className={cn(
          "text-muted-foreground pointer-events-none absolute top-0 left-3 -translate-y-1/2 transform text-xs opacity-0 transition-opacity duration-200",
          "peer-focus-within:opacity-100",
        )}
      >
        <div className="bg-input/50 absolute bottom-0 flex h-4/7 w-full" />

        <span
          className={cn(
            "relative z-1 mx-[3px]",
            selected.length > 0 && "hidden",
          )}
        >
          {label ?? placeholder}
        </span>
      </div>
    </div>
  );
}
