import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={cn(
        "bg-accent mx-auto flex w-full max-w-lg space-x-2 rounded-full px-5 py-2 transition-all duration-200 hover:bg-white/20",
        focused && "ring-foreground ring-2",
      )}
    >
      <Search className="text-muted-foreground" />
      <input
        placeholder="Search"
        className="placeholder:text-muted-foreground flex w-full text-sm focus:outline-none"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}
