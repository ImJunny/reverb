import Card from "@/components/ui/card";
import BackgroundWrapper from "@/components/page/background-wrapper";
import { createFileRoute } from "@tanstack/react-router";
import { useBackground } from "@/lib/hooks/useBackground";
import { useEffect } from "react";

export const Route = createFileRoute("/_protected/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { resetColor } = useBackground();
  useEffect(() => {
    resetColor();
  }, [resetColor]);

  return (
    <BackgroundWrapper className="p-3" type="gradient">
      <div className="flex w-full max-w-2xl flex-col space-y-2">
        <Card className="h-52" transparent>
          Test
        </Card>
        <Card className="h-52" transparent>
          Test
        </Card>
        <Card className="h-52" transparent>
          Test
        </Card>
        <Card className="h-52" transparent>
          Test
        </Card>
        <Card className="h-52" transparent>
          Test
        </Card>
        <Card className="h-52" transparent>
          Test
        </Card>
      </div>
      <Card className="sticky top-3 ml-3 w-64 self-start" transparent>
        Test
      </Card>
    </BackgroundWrapper>
  );
}
