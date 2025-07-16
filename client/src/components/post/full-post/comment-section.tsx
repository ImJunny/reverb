import CommentInput from "./comment-input";
import CommentEntry from "./comment-entry";
import { useQuery } from "@tanstack/react-query";
import { postCommentsQueryOptions } from "@/lib/api-options";

export default function CommentSection({ postId }: { postId: string }) {
  const { data: comments } = useQuery({
    ...postCommentsQueryOptions(postId),
  });

  return (
    <div className="flex flex-col space-y-3 p-3">
      <h2>Comments • {comments?.length}</h2>
      <CommentInput postId={postId} />
      {comments?.length === 0 ? (
        <div className="flex h-20 items-center justify-center">
          <p className="text-muted-foreground text-sm">No comments yet</p>
        </div>
      ) : (
        comments?.map((comment) => (
          <CommentEntry key={comment.id} comment={comment} />
        ))
      )}
    </div>
  );
}
