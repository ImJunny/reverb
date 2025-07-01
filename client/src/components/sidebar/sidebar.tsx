import { useSidebar } from "@/lib/hooks/useSidebar";
import StageSidebar from "../stage/stage-sidebar";

export default function RightSidebarWrapper() {
  const { open } = useSidebar();

  if (!open) return null;
  return (
    <div className="bg-muted hidden w-full max-w-80 overflow-hidden rounded-sm p-2 px-3 lg:block">
      <StageSidebar />
    </div>
  );
}
