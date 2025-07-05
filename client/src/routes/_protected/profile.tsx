import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <p>Hello from /profile!</p>
    </div>
  );
}
