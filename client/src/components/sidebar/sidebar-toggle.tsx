import { useSidebar } from "@/lib/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { PanelRight } from "lucide-react";

export default function SidebarToggle() {
  const { open, setOpen, firstOpen, setFirstOpen } = useSidebar();

  const handleClick = () => {
    setOpen(!open);
    if (firstOpen) {
      setFirstOpen(false);
    }
  };

  return (
    <button
      className={cn(
        "text-muted-foreground hover:text-foreground disabled:text-background-variant hidden cursor-pointer transition-colors duration-100 disabled:cursor-default lg:block",
        open && "text-foreground",
      )}
      onClick={handleClick}
    >
      <PanelRight size={20} />
    </button>
  );
}
