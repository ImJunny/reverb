import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/nav-sidebar";
import { api } from "@/utils/client";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { BackgroundColorProvider } from "@/components/providers/background-provider";
import { AudioProvider } from "@/components/providers/audio-provider";
import AudioControls from "@/components/audio-controls/audio-controls";
import RightSidebarWrapper from "@/components/sidebar/sidebar";
import { SidebarProvider } from "@/components/providers/sidebar-provider";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async () => {
    const res = await api.auth.session.$get();
    const data = await res.json();
    if (data.userId === null) {
      throw redirect({
        to: "/signin",
      });
    }
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <AudioProvider>
      <BackgroundColorProvider>
        <SidebarProvider>
          <div className="flex h-screen flex-col">
            <Header />
            <div className="mx-2 mb-2 flex flex-1 gap-x-2 overflow-hidden">
              <Sidebar />
              <div className="w-full">
                <Outlet />
              </div>
              <RightSidebarWrapper />
            </div>
            <AudioControls />
          </div>
        </SidebarProvider>
      </BackgroundColorProvider>
    </AudioProvider>
  );
}
