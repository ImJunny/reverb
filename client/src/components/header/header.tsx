import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import ProfileDropdown from "./profile-dropdown";
import HeaderSearch from "./header-search";
import Logo from "@/assets/logo.svg?react";
import { useRouter } from "@tanstack/react-router";
import SidebarToggle from "../sidebar/sidebar-toggle";

export default function Header() {
  const router = useRouter();
  const handleClick = () => {
    router.navigate({ to: "/" });
  };

  return (
    <nav className="bg-background sticky top-0 z-10 flex h-16 items-center gap-6 p-3">
      <div className="ml-3 hidden flex-col space-y-1 sm:flex">
        <Logo className="h-6 w-auto cursor-pointer" onClick={handleClick} />
      </div>

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

      <HeaderSearch />
      <div className="flex h-full items-center space-x-3">
        <SidebarToggle />
        <button
          className="text-muted-foreground hover:text-foreground disabled:text-background-variant cursor-pointer transition-colors duration-100 disabled:cursor-default"
          onClick={() => {
            router.navigate({ to: "/create-post" });
          }}
        >
          <Plus size={20} />
        </button>
        <ProfileDropdown />
      </div>
    </nav>
  );
}
