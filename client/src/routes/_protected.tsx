import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import Controller from "@/components/controller/controller";
import { api } from "@/utils/client";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className="flex h-screen flex-col">
      <Header />
      <div className="mx-2 flex flex-1 space-x-2 overflow-hidden">
        <Sidebar />
        <ScrollArea className="flex flex-1 overflow-hidden rounded-sm">
          <div className="from-background-variant via-background-variant absolute inset-0 -z-10 bg-gradient-to-t to-zinc-500" />
          <div className="m-3">
            <Outlet />
          </div>
        </ScrollArea>
      </div>
      <Controller />
    </div>
  );
}
