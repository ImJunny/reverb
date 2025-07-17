import { useBackgroundChange } from "@/lib/hooks/useBackgroundChange";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_protected/explore")({
  component: Explore,
});

function Explore() {
  useBackgroundChange({
    type: "default",
  });

  return (
    <div className="flex w-full max-w-6xl flex-col">
      <h1 className="text-2xl font-bold">Explore</h1>
      <p>Hello from Explore!</p>
    </div>
  );
}
