import CommentTextarea from "./comment-textarea";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentMutationOptions } from "@/lib/api-options";

export default function CommentMainInputWrapper({
  postId,
}: {
  postId: string;
}) {
  const { mutate } = useMutation(createCommentMutationOptions());
  const [commenting, setCommenting] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = (content: string) => {
    if (!content.trim()) return;
    mutate(
      { postId, content },
      {
        onSuccess: () => {
          setCommenting(false);
          queryClient.invalidateQueries({
            queryKey: ["post-comments", postId],
          });
        },
        onError: (error) => {
          console.error("Failed to create comment:", error);
        },
      },
    );
  };

  return (
    <div>
      {commenting ? (
        <CommentTextarea
          show={commenting}
          onSubmit={(content) => handleSubmit(content)}
          onCancel={() => setCommenting(false)}
        />
      ) : (
        <Input
          placeholder="Add a comment..."
          className="w-full"
          onFocus={() => setCommenting(true)}
        />
      )}
    </div>
  );
}
