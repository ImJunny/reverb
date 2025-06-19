import { Button } from "@/components/ui/button";
import { client } from "@/lib/client";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useRouter,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async () => {
    const res = await client.api.auth.session.$get();
    const data = await res.json();
    if (data.userId === null) {
      throw redirect({
        to: "/signin",
      });
    }
  },
  component: RootComponent,
});

function RootComponent() {
  const router = useRouter();

  const handleSignout = async () => {
    const res = await client.api.auth.signout.$post();
    if (res.ok) {
      router.navigate({
        to: "/signin",
      });
    }
  };

  return (
    <>
      <div className="flex items-center gap-6 p-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>
        <Button className="ml-auto" onClick={handleSignout}>
          Signout
        </Button>
      </div>
      <hr />
      <Outlet />
    </>
  );
}
