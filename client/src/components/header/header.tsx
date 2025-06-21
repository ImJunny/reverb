import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import ProfileDropdown from "./profile-dropdown";
import SearchBar from "./search-bar";

export default function Header() {
  return (
    <nav className="bg-background sticky top-0 z-1 flex h-16 items-center gap-6 p-3">
      <h1 className="ml-3 text-xl font-semibold tracking-tight">Suggestify</h1>
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
