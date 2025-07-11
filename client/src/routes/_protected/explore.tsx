import BackgroundWrapper from "@/components/page/background-wrapper";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_protected/explore")({
  component: Explore,
});

function Explore() {
  return (
    <BackgroundWrapper className="flex flex-col p-3">
      <p>Hello from Explore!</p>
    </BackgroundWrapper>
  );
}
