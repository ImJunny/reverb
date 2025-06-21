import Card from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-2xl flex-col space-y-2">
        <Card className="h-52">Test</Card>
        <Card className="h-52">Test</Card>
        <Card className="h-52">Test</Card>
        <Card className="h-52">Test</Card>
        <Card className="h-52">Test</Card>
        <Card className="h-52">Test</Card>
      </div>
      <Card className="sticky top-3 ml-3 w-64 self-start">Test</Card>
    </div>
  );
}
