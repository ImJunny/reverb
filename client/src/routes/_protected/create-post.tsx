import { createFileRoute } from "@tanstack/react-router";
import BackgroundWrapper from "@/components/page/background-wrapper";
import CreatePostForm from "@/components/post/create-post/create-post-form";

export const Route = createFileRoute("/_protected/create-post")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <BackgroundWrapper className="p-3">
      <CreatePostForm />
    </BackgroundWrapper>
  );
}
