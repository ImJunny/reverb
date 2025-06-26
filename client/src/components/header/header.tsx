import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "../ui/button";
import ProfileDropdown from "./profile-dropdown";
import SearchBar from "./search-bar";

export default function Header() {
  return (
    <nav className="bg-background sticky top-0 z-1 flex h-16 items-center gap-6 p-3">
      <h1 className="ml-3 text-2xl font-semibold tracking-tight">reverb</h1>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => {}}
          className="text-muted-foreground hover:text-foreground disabled:text-background-variant cursor-pointer transition-colors duration-100 disabled:cursor-default"
          disabled={false}
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => {}}
          className="text-muted-foreground hover:text-foreground disabled:text-background-variant cursor-pointer transition-colors duration-100 disabled:cursor-default"
          disabled={false}
        >
          <ChevronRight />
        </button>
      </div>

      <SearchBar />
      <div className="flex h-full items-center space-x-3">
        <Button variant="ghost" className="rounded-full" asChild>
          <div>
            <Plus />
            Create
          </div>
        </Button>
        <ProfileDropdown />
      </div>
    </nav>
  );
}
