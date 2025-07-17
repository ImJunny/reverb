import { createReplyMutationOptions } from "@/lib/api-options";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useState } from "react";
import type { Comment } from "shared/types";
import CommentTextarea from "./comment-textarea";
import { formatTimeAgo } from "@/lib/scripts/formatTimeAgo";

export default function ReplyEntry({
  comment,
  parentComment,
  setReplies,
}: {
  comment: Comment;
  parentComment: Comment;
  setReplies: React.Dispatch<React.SetStateAction<Comment[]>>;
}) {
  const queryClient = useQueryClient();
  const [replying, setReplying] = useState(false);
  const { mutate } = useMutation(createReplyMutationOptions());

  const handleSubmit = (content: string) => {
    if (!content.trim()) return;
    mutate(
      {
        commentId: parentComment.id,
        content,
        taggedUserId: comment.user_id,
      },
      {
        onSuccess: (data: Comment) => {
          setReplying(false);
          setReplies((prev) => {
            const index = prev.findIndex((c) => c.id === comment.id);
            if (index === -1) return [data, ...prev];
            return [
              ...prev.slice(0, index + 1),
              data,
              ...prev.slice(index + 1),
            ];
          });
          queryClient.invalidateQueries({
            queryKey: ["comment-replies", parentComment.id],
          });
        },
      },
    );
  };

  return (
    <div className="flex p-3 text-xs">
      <div className="flex w-full items-start space-x-3">
        <img
          src={
            comment?.user_image_url || "https://picsum.photos/seed/123/200/300"
          }
          alt="Avatar"
          className="h-6 w-6 rounded-full object-cover"
        />
        <div className="flex w-full flex-col">
          <div className="flex">
            <p>@{comment?.user_id}</p>
            <span className="text-muted-foreground">
              &nbsp;• {formatTimeAgo(comment.created_at)}
            </span>
          </div>
          <p className="text-sm">
            <span className="text-rose-500">{comment.tagged_user_id}</span>{" "}
            {comment.text}
          </p>
          <div className="text-muted-foreground mt-2 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Heart size={14} className="text-muted-foreground" />
              <span>1</span>
            </div>

            <button
              onClick={() => setReplying(true)}
              className="cursor-pointer"
            >
              <p>Reply</p>
            </button>
          </div>
          <CommentTextarea
            show={replying}
            label="Reply"
            onSubmit={(content) => {
              handleSubmit(content);
            }}
            onCancel={() => setReplying(false)}
            className="mt-3"
          />
        </div>
      </div>
    </div>
  );
}
