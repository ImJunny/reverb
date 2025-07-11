import BackgroundWrapper from "@/components/page/background-wrapper";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_protected/explore")({
  component: Explore,
});

function Explore() {
  return (
    <BackgroundWrapper
      className="p-3"
      type="gradient"
      options={{ resetColor: true }}
    >
      <div className="flex w-full max-w-6xl flex-col">
        <h1 className="text-2xl font-bold">Explore</h1>
        <p>Hello from Explore!</p>
      </div>
    </BackgroundWrapper>
  );
}
