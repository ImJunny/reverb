import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/explore")({
  component: Explore,
});

function Explore() {
  return <div>Hello from Explore!</div>;
}
