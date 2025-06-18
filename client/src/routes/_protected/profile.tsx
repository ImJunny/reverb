import { profileQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useQuery(profileQueryOptions);
  console.log(data);
  return <div>Hello "/profile"!</div>;
}
