import { createFileRoute } from "@tanstack/react-router";
import BackgroundWrapper from "@/components/page/background-wrapper";
import { CreatePostProvider } from "@/components/post/create-post/create-post-provider";
import CreatePostForm from "@/components/post/create-post/create-post-form";

export const Route = createFileRoute("/_protected/create-post")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <CreatePostProvider>
      <BackgroundWrapper className="p-3">
        <CreatePostForm />
      </BackgroundWrapper>
    </CreatePostProvider>
  );
}
