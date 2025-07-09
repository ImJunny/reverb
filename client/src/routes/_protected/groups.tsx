import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/groups")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="bg-slate-700"></div>;
}
