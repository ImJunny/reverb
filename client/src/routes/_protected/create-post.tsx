import { createFileRoute } from "@tanstack/react-router";
import CreatePostForm from "@/components/post/create-post/create-post-form";

export const Route = createFileRoute("/_protected/create-post")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full w-full justify-center p-3">
      <CreatePostForm />
    </div>
  );
}
