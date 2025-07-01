import type { SidebarTypes } from "@/components/providers/sidebar-provider";
import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type SidebarContextType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  type: SidebarTypes;
  setType: Dispatch<SetStateAction<SidebarTypes>>;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined,
);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("hooks must be used within a SidebarProvider");
  }
  return context;
}
