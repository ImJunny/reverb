import { SidebarContext } from "@/lib/hooks/useSidebar";
import { useState, type ReactNode } from "react";

export type SidebarTypes = "stage" | null;

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<SidebarTypes>(null);

  return (
    <SidebarContext.Provider value={{ open, setOpen, type, setType }}>
      {children}
    </SidebarContext.Provider>
  );
}
