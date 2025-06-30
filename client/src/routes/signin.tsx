import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import Logo from "@/assets/logo.svg?react";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  const handleSignIn = () => {
    window.location.href = `http://localhost:3000/api/auth/authorize`;
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Logo className="h-16 w-auto" />
      <p className="mt-4 text-xl font-semibold tracking-tight">
        Find and share music with others.
      </p>
      <Button onClick={handleSignIn} className="mt-10">
        Sign in <ArrowRight />
      </Button>
    </div>
  );
}
