/* eslint-disable react-refresh/only-export-components */
import { SidebarContext } from "@/lib/hooks/useSidebar";
import { useState, type ReactNode } from "react";

export const sidebarTypes = ["listening", "queue", "bookmarks"] as const;
export type SidebarType = (typeof sidebarTypes)[number];

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<SidebarType>(sidebarTypes[0]);
  const [firstOpen, setFirstOpen] = useState(true);

  return (
    <SidebarContext.Provider
      value={{ open, setOpen, type, setType, firstOpen, setFirstOpen }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
