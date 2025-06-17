import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  const handleSignIn = () => {
    window.location.href = `http://localhost:3000/api/auth/authorize`;
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Suggestify</h1>
      <Button onClick={handleSignIn}>Sign in with Spotify</Button>
    </div>
  );
}
