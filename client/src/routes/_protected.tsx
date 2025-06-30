import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import { api } from "@/utils/client";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { BackgroundColorProvider } from "@/components/bg-provider";
import { AudioProvider } from "@/components/audio-provider";
import AudioControls from "@/components/audio-controls/audio-controls";

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
        <div className="flex h-screen flex-col">
          <Header />
          <div className="mx-2 flex flex-1 space-x-2 overflow-hidden">
            <Sidebar />
            <Outlet />
          </div>
          <AudioControls />
        </div>
      </BackgroundColorProvider>
    </AudioProvider>
  );
}
