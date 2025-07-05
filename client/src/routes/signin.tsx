import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import Logo from "@/assets/logo.svg?react";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  const handleSignIn = () => {
    window.location.href = `http://localhost:3000/api/public/auth/authorize`;
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Logo className="h-16 w-auto" />
      <p className="mt-4 text-xl tracking-tight">Find and Share Music</p>
      <Button onClick={handleSignIn} className="group mt-10 w-26">
        Sign in{" "}
        <ArrowRight className="transition-all duration-100 group-hover:translate-x-2" />
      </Button>
    </div>
  );
}
