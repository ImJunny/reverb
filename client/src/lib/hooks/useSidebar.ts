import type { SidebarType } from "@/components/sidebar/sidebar-provider";

import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type SidebarContextType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  type: SidebarType;
  setType: Dispatch<SetStateAction<SidebarType>>;
  firstOpen: boolean;
  setFirstOpen: Dispatch<SetStateAction<boolean>>;
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
