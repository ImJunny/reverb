import { useBackgroundChange } from "@/lib/hooks/useBackgroundChange";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_protected/explore")({
  component: Explore,
});

function Explore() {
  useBackgroundChange({
    type: "default",
  });

  return null;
}
