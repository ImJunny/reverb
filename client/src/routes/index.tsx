import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

async function getPosts() {
  const res = await client.api.posts.$post();
  return res.json();
}

function Index() {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <p>{data?.message}</p>
    </div>
  );
}
